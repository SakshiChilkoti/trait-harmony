import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Mic, Square, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceResponseQuestionProps {
  question: string;
  description?: string;
  onAnswer: (response: string) => void;
}

export function VoiceResponseQuestion({ question, description, onAnswer }: VoiceResponseQuestionProps) {
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setIsRecording(true);
      };
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setResponse(prev => prev + finalTranscript);
        }
      };
      
      recognition.onerror = () => {
        toast({
          title: "Speech Recognition Error",
          description: "Please try again or use text input.",
          variant: "destructive"
        });
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
      recognition.start();
    } else {
      toast({
        title: "Voice Input Not Supported",
        description: "Please use text input instead.",
        variant: "destructive"
      });
      setInputMode('text');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsRecording(false);
  };

  const handleSubmit = () => {
    if (response.trim()) {
      onAnswer(response.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{question}</CardTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Mode Toggle */}
          <div className="flex justify-center gap-2">
            <Button
              variant={inputMode === 'voice' ? 'default' : 'outline'}
              onClick={() => setInputMode('voice')}
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              Voice
            </Button>
            <Button
              variant={inputMode === 'text' ? 'default' : 'outline'}
              onClick={() => setInputMode('text')}
              className="flex items-center gap-2"
            >
              <Type className="w-4 h-4" />
              Text
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {inputMode === 'voice' ? (
              <motion.div
                key="voice"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6"
              >
                {/* Voice Recording Interface */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isListening ? stopListening : startListening}
                    className={`relative w-32 h-32 rounded-full border-4 transition-all duration-300 ${
                      isListening 
                        ? 'bg-red-500 border-red-300 listening' 
                        : 'bg-primary border-primary/30 hover:border-primary/50'
                    }`}
                  >
                    {isListening ? (
                      <Square className="w-12 h-12 text-white mx-auto" />
                    ) : (
                      <Mic className="w-12 h-12 text-white mx-auto" />
                    )}
                    
                    {isRecording && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-4 border-red-300/50"
                      />
                    )}
                  </motion.button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {isListening ? 'Listening...' : 'Tap to speak'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Share your thoughts naturally
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Textarea
                  placeholder="Type your response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response Display */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Your Response:</h4>
                  <p className="text-sm">{response}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setResponse('')}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!response.trim()}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}