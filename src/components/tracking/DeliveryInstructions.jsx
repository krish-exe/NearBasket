import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const INSTRUCTION_PRESETS = ["Leave at door", "Call on arrival", "Leave with security", "Ring the bell"];
const MAX_NOTE_LENGTH = 200;

// Bottom sheet on mobile, centred dialog on larger screens. Remount it (key) to reset the draft.
export default function DeliveryInstructions({ initial, onCancel, onSave }) {
  const [preset, setPreset] = useState(initial?.preset ?? null);
  const [note, setNote] = useState(initial?.note ?? "");
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    dialog.querySelector("input, textarea, button")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll("input, textarea, button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onCancel]);

  const trimmed = note.trim();
  const canSave = preset !== null || trimmed.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) onSave({ preset, note: trimmed });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 animate-in" onClick={onCancel} />
      <form
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-instructions-title"
        onSubmit={handleSubmit}
        className="animate-in slide-in-from-bottom relative w-full max-w-md bg-surface-container-lowest rounded-t-[24px] md:rounded-xl shadow-lift p-lg space-y-md max-h-[90dvh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h2 id="delivery-instructions-title" className="font-display text-headline-sm font-bold text-on-surface">
            Delivery Instructions
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close delivery instructions"
            className="w-9 h-9 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <fieldset className="space-y-2">
          <legend className="sr-only">Choose an instruction</legend>
          {INSTRUCTION_PRESETS.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-md py-3 rounded-md border cursor-pointer font-body text-body-md transition-colors ${
                preset === option ? "border-primary bg-primary/5 text-on-surface" : "border-outline-variant/60 text-on-surface"
              }`}
            >
              <input
                type="radio"
                name="delivery-instruction"
                value={option}
                checked={preset === option}
                onChange={() => setPreset(option)}
                className="accent-primary w-4 h-4"
              />
              {option}
            </label>
          ))}
        </fieldset>

        <div className="space-y-1">
          <label htmlFor="delivery-note" className="font-label text-label-md text-on-surface">
            Custom instructions
          </label>
          <textarea
            id="delivery-note"
            value={note}
            maxLength={MAX_NOTE_LENGTH}
            rows={3}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Please leave the order with the security guard."
            className="w-full rounded-md border border-outline-variant/60 bg-surface px-md py-2 font-body text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
          />
          <p className="font-label text-label-sm text-on-surface-variant text-right">
            {note.length}/{MAX_NOTE_LENGTH}
          </p>
        </div>

        <div className="flex gap-md">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full border border-primary text-primary font-label text-label-md hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSave}
            className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Save Instructions
          </button>
        </div>
      </form>
    </div>
  );
}
