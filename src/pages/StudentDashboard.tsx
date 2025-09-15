import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Edit, 
  Calendar, 
  DollarSign, 
  Users, 
  ArrowLeft,
  MapPin,
  Building,
  GraduationCap,
  MessageCircle,
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

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  // Mock student data
  const studentProfile = {
    name: 'Alex Johnson',
    batch: '2024',
    course: 'Computer Science',
    university: 'Stanford University',
    location: 'San Francisco, CA',
    interests: ['Software Engineering', 'AI/ML', 'Startups'],
    avatar: '',
  };

  // Mock alumni data
  const alumniProfiles = [
    {
      name: 'Sarah Chen',
      batch: '2018',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
      linkedinUrl: '#',
    },
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
    {
      name: 'David Kim',
      batch: '2017',
      company: 'Tesla',
      position: 'Data Scientist',
      location: 'Austin, TX',
      skills: ['Python', 'TensorFlow', 'Statistics', 'Automotive'],
      linkedinUrl: '#',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Tech Career Fair',
      date: 'Dec 15, 2024',
      location: 'Virtual',
      attendees: 150,
    },
    {
      title: 'Alumni Networking Mixer',
      date: 'Dec 20, 2024',
      location: 'San Francisco',
      attendees: 85,
    },
    {
      title: 'Startup Pitch Night',
      date: 'Jan 5, 2025',
      location: 'Palo Alto',
      attendees: 120,
    },
  ];

  const mentorshipRequests = [
    {
      mentor: 'Sarah Chen',
      status: 'Pending',
      topic: 'Software Engineering Career Path',
      date: 'Dec 10, 2024',
    },
    {
      mentor: 'Michael Rodriguez',
      status: 'Accepted',
      topic: 'Product Management Transition',
      date: 'Dec 8, 2024',
    },
  ];

  const initials = studentProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();

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
              <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-3xl font-bold">{studentProfile.name}</h1>
              <p className="text-white/80">{studentProfile.course} • Batch of {studentProfile.batch}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-white/70">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>{studentProfile.university}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{studentProfile.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {studentProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Find Alumni</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, company, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button className="btn-secondary">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select value={filterBatch} onValueChange={setFilterBatch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Batch Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterCompany} onValueChange={setFilterCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="meta">Meta</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sf">San Francisco</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="seattle">Seattle</SelectItem>
                      <SelectItem value="austin">Austin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Alumni Results */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Alumni Network</h2>
              <div className="grid grid-cols-1 gap-6">
                {alumniProfiles.map((profile, index) => (
                  <ProfileCard key={index} {...profile} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentorship Requests */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Mentorship</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipRequests.map((request, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{request.mentor}</span>
                      <Badge 
                        variant={request.status === 'Accepted' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{request.topic}</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  View All Requests
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>{event.attendees} attending</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Fundraising */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Active Campaigns</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">New Computer Lab</h4>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>$45,000 raised</span>
                      <span>75% of $60,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">Scholarship Fund</h4>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>$28,500 raised</span>
                      <span>57% of $50,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Support a Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;