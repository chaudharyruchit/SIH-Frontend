import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Edit, 
  Calendar, 
  DollarSign, 
  MessageCircle, 
  ArrowLeft,
  MapPin,
  Building,
  Users,
  TrendingUp,
  Award,
  Heart,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProfileCard from '@/components/ProfileCard';

const AlumniDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock alumni profile data
  const alumniProfile = {
    name: 'Sarah Chen',
    batch: '2018',
    company: 'Google',
    position: 'Senior Software Engineer',
    university: 'Stanford University',
    location: 'Mountain View, CA',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'Leadership'],
    yearsOfExperience: 6,
    avatar: '',
    linkedinUrl: '#',
  };

  // Mock mentorship requests
  const mentorshipRequests = [
    {
      student: 'Alex Johnson',
      batch: '2024',
      topic: 'Software Engineering Career Path',
      date: 'Dec 10, 2024',
      status: 'Pending',
      message: 'Hi Sarah, I\'m interested in learning more about transitioning from university to tech industry...',
    },
    {
      student: 'Maria Garcia',
      batch: '2025',
      topic: 'Machine Learning Projects',
      date: 'Dec 8, 2024',
      status: 'Accepted',
      message: 'Would love to discuss ML project ideas and career opportunities in AI...',
    },
    {
      student: 'David Park',
      batch: '2024',
      topic: 'Google Interview Preparation',
      date: 'Dec 5, 2024',
      status: 'Completed',
      message: 'Thank you for the interview tips! I got the offer at Google!',
    },
  ];

  // Mock alumni connections
  const alumniConnections = [
    {
      name: 'Michael Rodriguez',
      batch: '2016',
      company: 'Microsoft',
      position: 'Product Manager',
      location: 'Seattle, WA',
      skills: ['Product Strategy', 'Agile', 'Data Analysis'],
      linkedinUrl: '#',
    },
    {
      name: 'Emily Davis',
      batch: '2019',
      company: 'Stripe',
      position: 'Engineering Manager',
      location: 'San Francisco, CA',
      skills: ['Leadership', 'Full Stack', 'Fintech'],
      linkedinUrl: '#',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Bay Area Alumni Mixer',
      date: 'Dec 18, 2024',
      location: 'San Francisco',
      attendees: 120,
      role: 'Organizer',
    },
    {
      title: 'Tech Mentorship Panel',
      date: 'Jan 10, 2025',
      location: 'Virtual',
      attendees: 200,
      role: 'Speaker',
    },
  ];

  const givingImpact = {
    totalDonated: 5000,
    campaignsSupported: 3,
    studentsHelped: 12,
    lastDonation: 'New Computer Lab - $500',
  };

  const initials = alumniProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarImage src={alumniProfile.avatar} alt={alumniProfile.name} />
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-3xl font-bold">{alumniProfile.name}</h1>
              <p className="text-white/80">{alumniProfile.position} at {alumniProfile.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-white/70">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>Batch of {alumniProfile.batch}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{alumniProfile.location}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{alumniProfile.yearsOfExperience} years exp</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {alumniProfile.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {skill}
                  </Badge>
                ))}
                {alumniProfile.skills.length > 4 && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    +{alumniProfile.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="card-elevated text-center p-4">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{mentorshipRequests.length}</div>
                <div className="text-xs text-muted-foreground">Mentorship Requests</div>
              </Card>
              <Card className="card-elevated text-center p-4">
                <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">{givingImpact.studentsHelped}</div>
                <div className="text-xs text-muted-foreground">Students Helped</div>
              </Card>
              <Card className="card-elevated text-center p-4">
                <Heart className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold">${givingImpact.totalDonated.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Donated</div>
              </Card>
              <Card className="card-elevated text-center p-4">
                <Calendar className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <div className="text-xs text-muted-foreground">Upcoming Events</div>
              </Card>
            </div>

            {/* Mentorship Requests */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Mentorship Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipRequests.map((request, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{request.student}</h4>
                        <p className="text-sm text-muted-foreground">Batch of {request.batch} • {request.topic}</p>
                      </div>
                      <Badge 
                        variant={
                          request.status === 'Accepted' ? 'default' : 
                          request.status === 'Completed' ? 'secondary' : 'outline'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{request.date}</span>
                      {request.status === 'Pending' && (
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Decline</Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      )}
                      {request.status === 'Accepted' && (
                        <Button size="sm" variant="outline">Schedule Meeting</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alumni Network */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Your Alumni Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Search alumni..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {alumniConnections.map((profile, index) => (
                    <ProfileCard key={index} {...profile} />
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Alumni
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Your Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.role}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>{event.date} • {event.location}</p>
                      <p>{event.attendees} registered</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Events
                </Button>
              </CardContent>
            </Card>

            {/* Giving Impact */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Your Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">${givingImpact.totalDonated.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Donated</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-secondary">{givingImpact.campaignsSupported}</div>
                    <div className="text-xs text-muted-foreground">Campaigns</div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Latest Contribution</h4>
                  <p className="text-xs text-muted-foreground">{givingImpact.lastDonation}</p>
                </div>
                
                <Button variant="outline" className="w-full text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Campaigns
                </Button>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Add portfolio projects</span>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Complete skills section</span>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;