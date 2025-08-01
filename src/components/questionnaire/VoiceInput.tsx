import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Volume2, Keyboard } from 'lucide-react';

interface VoiceInputProps {
  prompt: string;
  onSubmit: (answer: string) => void;
  className?: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function VoiceInput({ prompt, onSubmit, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onSubmit(transcript.trim());
    }
  };

  const speakPrompt = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(prompt);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className={className}>
        <div className="text-center p-6 bg-card rounded-lg border border-destructive/20">
          <p className="text-destructive mb-4">Voice input is not supported in your browser.</p>
          <Button
            variant="outline"
            onClick={() => setUseTextInput(true)}
          >
            <Keyboard className="w-4 h-4 mr-2" />
            Use Text Input Instead
          </Button>
        </div>
      </div>
    );
  }

  if (useTextInput) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
      >
        <div className="space-y-4">
          <div className="p-4 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground">{prompt}</p>
          </div>
          <Textarea
            placeholder="Type your answer here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!transcript.trim()}
              className="flex-1"
            >
              Submit Answer
            </Button>
            <Button
              variant="outline"
              onClick={() => setUseTextInput(false)}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="text-center space-y-6">
        {/* Prompt Display */}
        <div className="p-6 bg-gradient-card rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Voice Question</h3>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={speakPrompt}
              className="text-muted-foreground hover:text-foreground"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-foreground leading-relaxed">{prompt}</p>
        </div>

        {/* Voice Recording Interface */}
        <div className="relative">
          <motion.div
            className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isListening 
                ? 'listening voice-pulse' 
                : 'bg-gradient-primary hover:scale-110 hover:shadow-primary'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? stopListening : startListening}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="mic-off"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <MicOff className="w-8 h-8 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Mic className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Status Text */}
          <motion.p
            className="mt-4 text-sm font-medium"
            animate={{
              color: isListening ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))'
            }}
          >
            {isListening ? 'Listening... Tap to stop' : 'Tap to start speaking'}
          </motion.p>
        </div>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="bg-card border rounded-lg p-4 text-left"
            >
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Response:</h4>
              <p className="text-foreground leading-relaxed">{transcript}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => setUseTextInput(true)}
            className="flex-1 max-w-[150px]"
          >
            <Keyboard className="w-4 h-4 mr-2" />
            Type Instead
          </Button>
          
          {transcript && (
            <Button
              variant="success"
              onClick={handleSubmit}
              className="flex-1 max-w-[150px]"
            >
              Submit Answer
            </Button>
          )}
          
          {transcript && (
            <Button
              variant="ghost"
              onClick={() => setTranscript('')}
              className="flex-1 max-w-[100px]"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}