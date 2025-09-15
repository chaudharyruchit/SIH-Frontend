import { ExternalLink, MapPin, Building, Calendar, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileCardProps {
  name: string;
  batch: string;
  company: string;
  position: string;
  location: string;
  skills: string[];
  avatar?: string;
  linkedinUrl?: string;
  isCurrentUser?: boolean;
}

const ProfileCard = ({ 
  name, 
  batch, 
  company, 
  position, 
  location, 
  skills, 
  avatar, 
  linkedinUrl,
  isCurrentUser = false 
}: ProfileCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="profile-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground">{position}</p>
              </div>
              {linkedinUrl && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Details */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Building className="h-3 w-3 mr-1" />
                <span>{company}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Batch of {batch}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            {!isCurrentUser && (
              <div className="mt-4 flex space-x-2">
                <Button size="sm" className="flex-1">
                  Connect
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;