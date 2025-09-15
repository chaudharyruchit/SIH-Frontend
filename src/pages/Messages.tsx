import { useState } from 'react';
import { ArrowLeft, Send, Check, X, MessageCircle, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockContacts = [
  { id: 1, name: 'John Smith', role: 'alumni', avatar: '/placeholder-avatar.jpg', lastMessage: 'Hey! How are you doing?', unread: 2, status: 'approved' },
  { id: 2, name: 'Sarah Johnson', role: 'alumni', avatar: '/placeholder-avatar.jpg', lastMessage: 'Thanks for connecting!', unread: 0, status: 'approved' },
  { id: 3, name: 'Mike Wilson', role: 'student', avatar: '/placeholder-avatar.jpg', lastMessage: 'Would love to connect with you', unread: 1, status: 'pending' },
  { id: 4, name: 'Admin Team', role: 'admin', avatar: '/placeholder-avatar.jpg', lastMessage: 'Welcome to AlumGlobe!', unread: 0, status: 'approved' },
];

const mockMessages = [
  { id: 1, sender: 'John Smith', content: 'Hi there! How are you doing?', timestamp: '2:30 PM', isOwn: false },
  { id: 2, sender: 'You', content: 'I\'m doing great! Thanks for asking.', timestamp: '2:32 PM', isOwn: true },
  { id: 3, sender: 'John Smith', content: 'That\'s wonderful to hear! I wanted to share some career opportunities with you.', timestamp: '2:35 PM', isOwn: false },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserRole] = useState<'student' | 'alumni' | 'admin'>('student'); // Simulate current user role
  const [showApprovalDialog, setShowApprovalDialog] = useState<any>(null);
  const [contacts, setContacts] = useState(mockContacts);
  const [messages, setMessages] = useState(mockMessages);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    // Check if student is trying to message alumni without approval
    if (currentUserRole === 'student' && selectedContact.role === 'alumni' && selectedContact.status !== 'approved') {
      // Send request message
      const requestMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRequest: true,
      };
      
      setMessages([...messages, requestMessage]);
      setNewMessage('');
      
      toast({
        title: "Message request sent",
        description: "Your message has been sent as a connection request to the alumni.",
      });
      return;
    }

    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleApproveRequest = (contactId: number) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, status: 'approved' } : contact
    ));
    setShowApprovalDialog(null);
    toast({
      title: "Request approved",
      description: "You can now chat with this student.",
    });
  };

  const handleRejectRequest = (contactId: number) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, status: 'rejected' } : contact
    ));
    setShowApprovalDialog(null);
    toast({
      title: "Request rejected",
      description: "The connection request has been declined.",
    });
  };

  const canSendMessage = (contact: any) => {
    if (currentUserRole === 'admin') return true;
    if (currentUserRole === 'alumni') return true;
    if (currentUserRole === 'student' && contact.role === 'student') return true;
    if (currentUserRole === 'student' && contact.role === 'alumni' && contact.status === 'approved') return true;
    return false;
  };

  const getContactStatusBadge = (contact: any) => {
    if (contact.status === 'pending') {
      return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
    if (contact.status === 'rejected') {
      return <Badge variant="destructive" className="text-xs">Rejected</Badge>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link to={`/${currentUserRole}-dashboard`} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Messages</h1>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            {currentUserRole}
          </Badge>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] max-w-7xl mx-auto">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-lg flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Contacts</span>
            </h2>
          </div>
          <ScrollArea className="h-full">
            <div className="p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                    selectedContact?.id === contact.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (currentUserRole === 'alumni' && contact.role === 'student' && contact.status === 'pending') {
                      setShowApprovalDialog(contact);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {contact.unread > 0 && (
                        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">{contact.name}</p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {contact.role}
                        </Badge>
                        {getContactStatusBadge(contact)}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {selectedContact.role}
                      </Badge>
                      {getContactStatusBadge(selectedContact)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 h-0">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        } ${(message as any).isRequest ? 'border border-warning' : ''}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                          {message.timestamp}
                          {(message as any).isRequest && (
                            <span className="ml-2 text-warning">• Request</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                {canSendMessage(selectedContact) ? (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm">
                      {currentUserRole === 'student' && selectedContact.role === 'alumni' && selectedContact.status === 'rejected'
                        ? 'Your message request was declined.'
                        : currentUserRole === 'student' && selectedContact.role === 'alumni'
                        ? 'Send a request to start messaging this alumni.'
                        : 'You cannot message this user.'}
                    </p>
                    {currentUserRole === 'student' && selectedContact.role === 'alumni' && selectedContact.status !== 'approved' && selectedContact.status !== 'rejected' && (
                      <div className="mt-2">
                        <Input
                          placeholder="Write your connection request..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="mb-2"
                        />
                        <Button onClick={handleSendMessage} size="sm" className="btn-hero">
                          Send Request
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Contact</h3>
                <p className="text-muted-foreground">Choose someone to start a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Approval Dialog */}
      {showApprovalDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Message Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={showApprovalDialog.avatar} alt={showApprovalDialog.name} />
                  <AvatarFallback>{showApprovalDialog.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{showApprovalDialog.name}</p>
                  <Badge variant="outline" className="text-xs">Student</Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                This student wants to connect with you. Would you like to approve their message request?
              </p>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleApproveRequest(showApprovalDialog.id)}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleRejectRequest(showApprovalDialog.id)}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowApprovalDialog(null)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Messages;