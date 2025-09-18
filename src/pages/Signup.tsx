import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowLeft, Phone, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import alumglobeLogo from "@/assets/alumglobe-logo.png";

const Signup = () => {
  const [role, setRole] = useState("");
  const [colleges, setColleges] = useState<{ name: string; code: string }[]>([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    college_code: "",
    roll_number: "",
    linkedin_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔹 Fetch colleges dynamically from backend instead of hardcoding
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/colleges/");
        if (!res.ok) throw new Error("Failed to load colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error(err);
        // fallback if API not ready
        setColleges([
          { name: "G.L Bajaj", code: "GLB" },
          { name: "KIET", code: "KIET" },
          { name: "ABESEC", code: "ABESEC" },
        ]);
      }
    };
    fetchColleges();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: any = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role,
        phone: formData.phone || "",
        linkedin_url: formData.linkedin_url || "",
        college_code: formData.college_code,
      };

      if (role === "student" || role === "alumni") {
        if (!formData.roll_number.trim()) {
          toast({
            title: "Roll number required",
            description: "Please enter your roll number",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        payload.roll_number = formData.roll_number;
      }

      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errors
            ? Object.values(data.errors).flat().join(", ")
            : data.error || "Registration failed";
        throw new Error(errorMessage);
      }

      toast({
        title: "Account created",
        description: "You can now log in with your credentials",
      });

      navigate("/login"); // 🔹 Always send to login after signup

    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err.message || "Server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <p className="text-muted-foreground">
              Join the AlumGlobe community and start connecting with peers
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* College */}
              <div className="space-y-2">
                <Label htmlFor="college_code">College</Label>
                <Select
                  value={formData.college_code}
                  onValueChange={(val) => handleSelectChange(val, "college_code")}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college.code} value={college.code}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Roll Number (only for student/alumni) */}
              {role && (
                <div className="space-y-2">
                  <Label htmlFor="roll_number">Roll Number</Label>
                  <Input
                    id="roll_number"
                    name="roll_number"
                    value={formData.roll_number}
                    onChange={handleInputChange}
                    placeholder="Enter roll number"
                    required
                  />
                </div>
              )}

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn (Optional)</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className="pl-10"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
