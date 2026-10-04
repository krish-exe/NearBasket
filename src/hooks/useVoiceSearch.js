import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useVoiceSearch
 * Wraps the browser's SpeechRecognition API (Chrome/Edge) to provide
 * a simple start/stop voice search flow.
 *
 * Usage:
 *   const { isListening, isSupported, error, startListening, stopListening } =
 *     useVoiceSearch({ onResult: (text) => setQuery(text) });
 */
export function useVoiceSearch({ onResult, lang = "en-IN" } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    if (!isSupported) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = lang;

    recognition.onstart = () => {
      setError(null);
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript && onResult) {
        onResult(transcript);
      }
    };

    recognition.onerror = (event) => {
      setError(event.error || "unknown-error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, lang]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("not-supported");
      return;
    }
    try {
      recognitionRef.current?.start();
    } catch {
      // start() throws if already started; ignore
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { isListening, isSupported, error, startListening, stopListening };
}
