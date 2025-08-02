import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background3D } from './Background3D';
import { Navigation } from './Navigation';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileCreationPage } from './pages/ProfileCreationPage';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';
import { useToast } from '@/hooks/use-toast';

type AppState = 'home' | 'get-started' | 'login' | 'profile-creation' | 'questions' | 'results' | 'profile';
type AuthMode = 'login' | 'signup';

interface ProfileData {
  name: string;
  age: number;
  location: string;
  language: string;
  profilePicture?: string;
  traits?: Record<string, number>;
  joinDate: Date;
}

export function EmotionalApp() {
  const [appState, setAppState] = useState<AppState>('home');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setAppState('profile-creation');
    toast({
      title: "Welcome!",
      description: "Let's create your emotional profile.",
    });
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setAppState('profile-creation');
    toast({
      title: "Account created!",
      description: "Welcome to EmotiMatch!",
    });
  };

  const handleProfileCreation = (data: ProfileData) => {
    setProfileData({ ...data, joinDate: new Date() });
    toast({
      title: "Profile created!",
      description: "Ready to explore your emotional intelligence?",
    });
    setAppState('home');
  };

  const handleNavigation = (page: string) => {
    if (page === 'get-started' && !isLoggedIn) {
      setAppState('login');
    } else {
      setAppState(page as AppState);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Background3D />
      
      <Navigation 
        currentPage={appState}
        onNavigate={handleNavigation}
        isLoggedIn={isLoggedIn}
      />

      <AnimatePresence mode="wait">
        {appState === 'home' && (
          <HomePage 
            key="home"
            onGetStarted={() => handleNavigation('get-started')}
          />
        )}

        {appState === 'login' && (
          <div key="auth" className="min-h-screen pt-24 pb-12 flex items-center justify-center">
            <div className="w-full max-w-md px-4">
              {authMode === 'login' ? (
                <LoginForm
                  onLogin={handleLogin}
                  onSwitchToSignup={() => setAuthMode('signup')}
                  isLoading={false}
                />
              ) : (
                <SignupForm
                  onSignup={handleSignup}
                  onSwitchToLogin={() => setAuthMode('login')}
                  isLoading={false}
                />
              )}
            </div>
          </div>
        )}

        {appState === 'profile-creation' && (
          <ProfileCreationPage
            key="profile-creation"
            onComplete={handleProfileCreation}
            onBack={() => setAppState('login')}
          />
        )}

        {appState === 'profile' && (
          <ProfilePage
            key="profile"
            profileData={profileData}
            onEdit={() => setAppState('profile-creation')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}