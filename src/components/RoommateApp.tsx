import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';
import { Questionnaire } from './questionnaire/Questionnaire';
import { MatchCard } from './matches/MatchCard';
import { PersonalityTraits, UserProfile, MatchResult } from '@/types/personality';
import { mockUsers } from '@/data/questions';
import { findTopMatches } from '@/utils/matchingAlgorithm';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sparkles, Users, Heart, ArrowRight, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AppState = 'landing' | 'auth' | 'questionnaire' | 'matches';
type AuthMode = 'login' | 'signup';

export function RoommateApp() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate authentication
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user has completed questionnaire
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        setCurrentUser(existingUser);
        const userMatches = findTopMatches(existingUser, mockUsers);
        setMatches(userMatches);
        setAppState('matches');
        toast({
          title: "Welcome back!",
          description: "Your matches have been updated.",
        });
      } else {
        // New user - go to questionnaire
        setCurrentUser({
          id: Date.now().toString(),
          name: 'New User',
          email,
          traits: {} as PersonalityTraits,
          createdAt: new Date()
        });
        setAppState('questionnaire');
      }
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name,
        email,
        traits: {} as PersonalityTraits,
        createdAt: new Date()
      };
      
      setCurrentUser(newUser);
      setAppState('questionnaire');
      toast({
        title: "Account created!",
        description: "Let's find your perfect roommate match.",
      });
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionnaireComplete = (traits: PersonalityTraits) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, traits };
    setCurrentUser(updatedUser);
    
    // Find matches
    const userMatches = findTopMatches(updatedUser, mockUsers);
    setMatches(userMatches);
    setAppState('matches');
    
    toast({
      title: "Profile complete!",
      description: `Found ${userMatches.length} great matches for you.`,
    });
  };

  const handleContact = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    toast({
      title: "Contact request sent!",
      description: `We've notified ${user?.name} about your interest.`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMatches([]);
    setAppState('landing');
    toast({
      title: "Logged out",
      description: "Come back anytime to find your perfect roommate!",
    });
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI-Powered Roommate Matching</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Find Your Perfect
            <br />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Roommate Match
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Advanced personality analysis meets intelligent matching. 
            Answer 6 interactive questions and discover roommates who truly complement your lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              variant="hero"
              size="xl"
              onClick={() => setAppState('auth')}
              className="group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center gap-2 text-white/70">
              <Users className="w-5 h-5" />
              <span>Join 10,000+ successful matches</span>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          {[
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "AI Personality Analysis",
              description: "Advanced algorithms analyze your responses to create a unique personality profile"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Smart Compatibility",
              description: "Cosine similarity matching finds roommates with complementary traits"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Voice & Visual Input",
              description: "Express yourself through voice, images, and interactive questions"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20"
            >
              <div className="text-white/80 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  const renderAuth = () => (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => setAppState('landing')}
            className="text-white/70 hover:text-white hover:bg-white/10 mb-6"
          >
            ← Back to Home
          </Button>
        </div>
        
        <AnimatePresence mode="wait">
          {authMode === 'login' ? (
            <LoginForm
              key="login"
              onLogin={handleLogin}
              onSwitchToSignup={() => setAuthMode('signup')}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              key="signup"
              onSignup={handleSignup}
              onSwitchToLogin={() => setAuthMode('login')}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderMatches = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {currentUser?.name}!
              </h1>
              <p className="text-muted-foreground">
                Here are your top roommate matches
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAppState('questionnaire')}
              >
                Retake Quiz
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Matches */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {matches.length > 0 ? (
            <div className="grid lg:grid-cols-1 gap-8">
              {matches.map((match, index) => (
                <MatchCard
                  key={match.user.id}
                  match={match}
                  index={index}
                  onContact={handleContact}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-card text-center p-12">
              <CardContent>
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete your personality profile to find compatible roommates
                </p>
                <Button
                  variant="default"
                  onClick={() => setAppState('questionnaire')}
                >
                  Start Questionnaire
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {appState === 'landing' && renderLanding()}
      {appState === 'auth' && renderAuth()}
      {appState === 'questionnaire' && (
        <Questionnaire
          key="questionnaire"
          onComplete={handleQuestionnaireComplete}
          onBack={() => setAppState('auth')}
        />
      )}
      {appState === 'matches' && renderMatches()}
    </AnimatePresence>
  );
}