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

  // Get student name from localStorage
  const studentName =
    localStorage.getItem("user_name") ||
    localStorage.getItem("student_name") ||
    "Student";

  // 🔒 Protect route
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "student") {
      toast({
        title: "Unauthorized",
        description: "Please log in as a student to continue.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  // Load profile photo
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profile_photo");
    if (savedPhoto) setProfilePhoto(savedPhoto);
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

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target?.result as string;
      setProfilePhoto(base64String);
      localStorage.setItem("profile_photo", base64String);

      await saveProfilePhotoToBackend(base64String);

      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated!",
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
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      if (!userId || !token) return;

      await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile_photo: photoData }),
      });
    } catch (error) {
      console.error("Failed to save photo:", error);
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
    localStorage.clear();
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate("/login");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Portal
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link to="/student/profile">Profile</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/student/careers">Careers</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/student/hackathons">Hackathons</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/student/explore">Explore</Link>
              </Button>
            </nav>

            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{studentName}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>

              {/* Profile Photo */}
              <div className="relative group">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition"
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
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Settings + Logout */}
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">
          Welcome back, {studentName}! 👋
        </h2>
        {/* Add your content here */}
      </main>
    </div>
  );
};

export default StudentDashboard;
