import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Main pages
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Student pages
import StudentProfile from "./pages/Student/Profile";
import Careers from "./pages/Student/Careers";
import Hackathons from "./pages/Student/Hackathons";
import StudentExplore from "./pages/Student/Explore";

// Alumni pages
import AlumniProfile from "./pages/Alumni/Profile";
import Mentorship from "./pages/Alumni/Mentorship";
import Donate from "./pages/Alumni/Donate";
import AlumniExplore from "./pages/Alumni/Explore";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const RoleDashboard = () => {
  const role = localStorage.getItem("user_role");
  
  if (role === "student") {
    return <StudentDashboard />;
  }
  if (role === "alumni") {
    return <AlumniDashboard />;
  }
  if (role === "admin") {
    return <AdminDashboard />;
  }
  
  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard redirect by role */}
            <Route
              path="/profile-dashboard"
              element={
                <PrivateRoute>
                  <RoleDashboard />
                </PrivateRoute>
              }
            />

            {/* Main dashboards */}
            <Route 
              path="/student-dashboard" 
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/alumni-dashboard" 
              element={
                <PrivateRoute>
                  <AlumniDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />

            {/* Student sub-pages */}
            <Route 
              path="/student/profile" 
              element={
                <PrivateRoute>
                  <StudentProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student/careers" 
              element={
                <PrivateRoute>
                  <Careers />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student/hackathons" 
              element={
                <PrivateRoute>
                  <Hackathons />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student/explore" 
              element={
                <PrivateRoute>
                  <StudentExplore />
                </PrivateRoute>
              } 
            />

            {/* Alumni sub-pages */}
            <Route 
              path="/alumni/profile" 
              element={
                <PrivateRoute>
                  <AlumniProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/alumni/mentorship" 
              element={
                <PrivateRoute>
                  <Mentorship />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/alumni/donate" 
              element={
                <PrivateRoute>
                  <Donate />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/alumni/explore" 
              element={
                <PrivateRoute>
                  <AlumniExplore />
                </PrivateRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;