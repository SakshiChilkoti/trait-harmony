import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { User, MapPin, Globe, Calendar, Edit } from 'lucide-react';

interface ProfileData {
  name: string;
  age: number;
  location: string;
  language: string;
  profilePicture?: string;
  traits?: Record<string, number>;
  joinDate: Date;
}

interface ProfilePageProps {
  profileData: ProfileData | null;
  onEdit: () => void;
}

export function ProfilePage({ profileData, onEdit }: ProfilePageProps) {
  if (!profileData) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Profile Found</h3>
              <p className="text-muted-foreground mb-6">
                Please complete your profile setup first.
              </p>
              <Button onClick={onEdit}>
                Create Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const traitColors = {
    peaceful: "bg-blue-100 text-blue-800",
    energetic: "bg-yellow-100 text-yellow-800", 
    social: "bg-pink-100 text-pink-800",
    introspective: "bg-purple-100 text-purple-800",
    creative: "bg-green-100 text-green-800",
    analytical: "bg-indigo-100 text-indigo-800"
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Button onClick={onEdit} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-card">
                <CardContent className="p-8 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={profileData.profilePicture} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{profileData.age} years old</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{profileData.language}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Full Name</label>
                        <p className="font-medium">{profileData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Age</label>
                        <p className="font-medium">{profileData.age}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Location</label>
                        <p className="font-medium">{profileData.location}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Language</label>
                        <p className="font-medium">{profileData.language}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emotional Traits */}
              {profileData.traits && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Emotional Compatibility Traits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(profileData.traits).map(([trait, score]) => (
                          <Badge 
                            key={trait}
                            variant="secondary"
                            className="justify-center py-2"
                          >
                            {trait}: {Math.round(score * 100)}%
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Account Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <label className="text-sm text-muted-foreground">Member Since</label>
                      <p className="font-medium">
                        {profileData.joinDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}