import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  
  // Mock pending users data
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'Alumni',
      batch: '2020',
      company: 'Apple',
      dateApplied: '2024-12-10',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      role: 'Student',
      batch: '2025',
      company: 'N/A',
      dateApplied: '2024-12-09',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Carlos Rodriguez',
      email: 'carlos.r@email.com',
      role: 'Alumni',
      batch: '2018',
      company: 'Netflix',
      dateApplied: '2024-12-08',
      status: 'Pending'
    },
  ]);

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Career Fair',
      date: '2024-12-15',
      location: 'Virtual',
      attendees: 150,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Alumni Networking Mixer',
      date: '2024-12-20',
      location: 'San Francisco',
      attendees: 85,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      date: '2025-01-05',
      location: 'Palo Alto',
      attendees: 120,
      status: 'Planning'
    },
  ]);

  // Mock fundraising campaigns
  const campaigns = [
    {
      id: 1,
      title: 'New Computer Lab',
      target: 60000,
      raised: 45000,
      donors: 89,
      status: 'Active',
      endDate: '2025-01-31'
    },
    {
      id: 2,
      title: 'Scholarship Fund',
      target: 50000,
      raised: 28500,
      donors: 65,
      status: 'Active',
      endDate: '2025-02-28'
    },
    {
      id: 3,
      title: 'Library Renovation',
      target: 80000,
      raised: 72000,
      donors: 134,
      status: 'Completed',
      endDate: '2024-11-30'
    },
  ];

  // Analytics data
  const analytics = {
    totalAlumni: 2847,
    totalStudents: 1203,
    activeUsers: 892,
    totalFundsRaised: 145500,
    monthlyGrowth: 12.5,
    eventsThisMonth: 8
  };

  const handleVerifyUser = (userId: number) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'Verified' }
          : user
      )
    );
    toast({
      title: "User Verified",
      description: "User has been successfully verified and can now access the platform.",
    });
  };

  const handleRejectUser = (userId: number) => {
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "User Rejected",
      description: "User application has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-white/80">Manage AlumGlobe platform</p>
              </div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.totalAlumni.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Alumni</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <UserCheck className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">${analytics.totalFundsRaised.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Funds Raised</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">+{analytics.monthlyGrowth}%</div>
              <div className="text-sm text-muted-foreground">Monthly Growth</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Users */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Pending User Verifications</span>
                  <Badge variant="destructive">{pendingUsers.filter(u => u.status === 'Pending').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>Batch: {user.batch}</div>
                          <div className="text-muted-foreground">{user.company}</div>
                        </TableCell>
                        <TableCell className="text-sm">{user.dateApplied}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Verified' ? 'default' : 'secondary'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.status === 'Pending' ? (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectUser(user.id)}
                              >
                                <XCircle className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleVerifyUser(user.id)}
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Event Management */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Event Management</span>
                  </div>
                  <Button size="sm" className="btn-secondary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={event.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {event.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.attendees} registered attendees
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            {/* Fundraising Campaigns */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Active Campaigns</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.slice(0, 2).map((campaign) => (
                  <div key={campaign.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{campaign.title}</h4>
                      <Badge 
                        variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${campaign.raised.toLocaleString()} raised</span>
                        <span>{Math.round((campaign.raised / campaign.target) * 100)}% of ${campaign.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full" 
                          style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.donors} donors • Ends {campaign.endDate}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  View All Campaigns
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">New user registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">Campaign donation received</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-muted-foreground">Event registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-muted-foreground">Mentorship request</span>
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

export default AdminDashboard;