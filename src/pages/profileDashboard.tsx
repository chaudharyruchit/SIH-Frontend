import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, getProfile } from '@/api/api';

const ProfileDashboard = () => {
  const { toast } = useToast();

  const [profile, setProfile] = useState<any>({
    name: '',
    email: '',
    college: '',
    batch: '',
    additionalInfo: {
      skills: [] as string[],
      linkedin: '',
      github: '',
      photo: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) setProfile(JSON.parse(storedProfile));
    else fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      localStorage.setItem('profile', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      additionalInfo: { ...profile.additionalInfo, [e.target.name]: e.target.value },
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.additionalInfo.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        additionalInfo: {
          ...profile.additionalInfo,
          skills: [...profile.additionalInfo.skills, newSkill.trim()],
        },
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      additionalInfo: {
        ...profile.additionalInfo,
        skills: profile.additionalInfo.skills.filter((s: string) => s !== skill),
      },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({
          ...profile,
          additionalInfo: { ...profile.additionalInfo, photo: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await updateProfile(profile);
      setProfile(data);
      localStorage.setItem('profile', JSON.stringify(data));
      toast({ title: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      toast({ title: 'Failed to update profile', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Profile Dashboard</h1>

      {/* Basic Info */}
      <Card className="p-6 rounded-2xl shadow-md bg-background/60">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              <Label>College</Label>
              <Input
                name="college"
                value={profile.college}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Batch</Label>
              <Input
                name="batch"
                value={profile.batch}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing ? (
            <div className="flex justify-end space-x-2">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Edit Basic Info</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="p-6 rounded-2xl shadow-md bg-background/60">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/50">
              {profile.additionalInfo.photo ? (
                <img src={profile.additionalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Photo</div>
              )}
            </div>
            {isEditing && (
              <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
            )}
          </div>

          {/* LinkedIn & GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>LinkedIn</Label>
              <Input
                name="linkedin"
                value={profile.additionalInfo.linkedin}
                onChange={handleAdditionalChange}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input
                name="github"
                value={profile.additionalInfo.github}
                onChange={handleAdditionalChange}
                disabled={!isEditing}
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.additionalInfo.skills.map((skill: string) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <Button onClick={handleAddSkill}>Add</Button>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : 'Save All'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDashboard;
