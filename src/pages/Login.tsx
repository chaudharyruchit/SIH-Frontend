import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import alumglobeLogo from '@/assets/alumglobe-logo.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store tokens
      if (data.tokens) {
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
      }

      // Store user info (both as JSON and individual items for compatibility)
      const user = data.user || {};
      localStorage.setItem('user_data', JSON.stringify(user));
      
      // Store individual user details for easy access
      localStorage.setItem('user_id', user.id || '');
      localStorage.setItem('user_name', user.username || user.first_name || user.name || 'User');
      localStorage.setItem('user_email', user.email || '');
      localStorage.setItem('user_role', user.role || '');
      
      // Store additional name variations based on role
      if (user.role === 'student') {
        localStorage.setItem('student_name', user.username || user.first_name || user.name || 'Student');
      } else if (user.role === 'alumni') {
        localStorage.setItem('alumni_name', user.username || user.first_name || user.name || 'Alumni');
      }

      // Load user's saved profile data from backend/server
      await loadUserProfileData(user.id);

      // Success toast with actual name
      const displayName = user.username || user.first_name || user.name || 'User';
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${displayName}!`,
      });

      // Redirect based on user role
      const userRole = user.role;
      switch (userRole) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'alumni':
          navigate('/alumni-dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err: any) {
      console.error('Login error:', err);
      toast({
        title: 'Login Failed',
        description: err.message || 'Server error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load user profile data after login
  const loadUserProfileData = async (userId: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        
        // Store profile data in localStorage for this session
        localStorage.setItem('user_phone', profileData.phone || '');
        localStorage.setItem('user_location', profileData.location || '');
        localStorage.setItem('user_bio', profileData.bio || '');
        localStorage.setItem('user_university', profileData.university || '');
        localStorage.setItem('user_major', profileData.major || '');
        localStorage.setItem('user_graduation_year', profileData.graduation_year || '');
        localStorage.setItem('profile_photo', profileData.profile_photo || '');
      }
    } catch (error) {
      console.log('Profile data not found, will use defaults');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        <Card className="card-elevated animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={alumglobeLogo} alt="AlumGlobe" className="h-12 w-12 rounded-full" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your AlumGlobe account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;