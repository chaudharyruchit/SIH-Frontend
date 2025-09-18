import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Upload, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Try multiple possible keys for the user name
  const studentName = 
    localStorage.getItem("user_name") || 
    localStorage.getItem("student_name") || 
    localStorage.getItem("name") ||
    "Student";

  // Load profile photo on component mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profile_photo");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Convert to base64 and store
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target?.result as string;
      setProfilePhoto(base64String);
      localStorage.setItem("profile_photo", base64String);
      
      // Save to backend
      await saveProfilePhotoToBackend(base64String);
      
      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated successfully!",
      });
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const saveProfilePhotoToBackend = async (photoData: string) => {
    try {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('access_token');
      
      if (!userId || !token) return;

      await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile_photo: photoData
        })
      });
    } catch (error) {
      console.error('Failed to save photo to backend:', error);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem("profile_photo");
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    });
  };

  const handleLogout = () => {
    // Only clear session data, not permanent profile data
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    localStorage.removeItem("student_name");
    localStorage.removeItem("alumni_name");
    
    // Clear session-based profile data (will be reloaded on next login)
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_location");
    localStorage.removeItem("user_bio");
    localStorage.removeItem("user_university");
    localStorage.removeItem("user_major");
    localStorage.removeItem("user_graduation_year");
    localStorage.removeItem("profile_photo");

    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });

    // Redirect to login page
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Modern Header with Profile */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Portal
              </h1>
            </div>

            {/* Right side - Profile Section */}
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1">
                <Button asChild variant="ghost" className="hover:bg-blue-50 transition-colors">
                  <Link to="/student/profile" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="hover:bg-blue-50 transition-colors">
                  <Link to="/student/careers">Careers</Link>
                </Button>
                <Button asChild variant="ghost" className="hover:bg-blue-50 transition-colors">
                  <Link to="/student/hackathons">Hackathons</Link>
                </Button>
                <Button asChild variant="ghost" className="hover:bg-blue-50 transition-colors">
                  <Link to="/student/explore">Explore</Link>
                </Button>
              </nav>

              {/* Profile Photo Section */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{studentName}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                
                {/* Profile Photo */}
                <div className="relative group">
                  <div 
                    className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg cursor-pointer transition-transform hover:scale-105"
                    onClick={handlePhotoClick}
                  >
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {getInitials(studentName)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Camera Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Settings and Logout Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </Button>
                  
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm" 
                    className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Welcome Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome back, {studentName}! 👋
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Ready to explore new opportunities and advance your career?
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                  <Link to="/student/careers" className="flex items-center space-x-2">
                    <span>Browse Jobs</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 hover:bg-gray-50">
                  <Link to="/student/hackathons">Join Hackathons</Link>
                </Button>
              </div>
            </div>

            {/* Large Profile Display */}
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl cursor-pointer transition-transform hover:scale-105"
                onClick={handlePhotoClick}
              >
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">
                      {getInitials(studentName)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Upload Button */}
              <button
                onClick={handlePhotoClick}
                className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors flex items-center justify-center group"
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </button>

              {/* Remove Photo Button (if photo exists) */}
              {profilePhoto && (
                <button
                  onClick={removePhoto}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors flex items-center justify-center text-xs"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats or Additional Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/student/profile" 
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 text-center hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Profile Completion</h3>
            <p className="text-gray-600 text-sm">Complete your profile to get better recommendations</p>
          </Link>

          <Link 
            to="/student/careers" 
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 text-center hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <span className="text-2xl group-hover:scale-110 transition-transform">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Career Goals</h3>
            <p className="text-gray-600 text-sm">Set and track your career objectives</p>
          </Link>

          <Link 
            to="/student/hackathons" 
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 text-center hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Opportunities</h3>
            <p className="text-gray-600 text-sm">Discover internships and job openings</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;