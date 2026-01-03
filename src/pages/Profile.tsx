import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockTrips } from '@/data/mockData';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    country: user?.country || '',
  });

  const handleSave = async () => {
    await updateProfile(formData);
    toast({ title: "Profile updated!", description: "Your changes have been saved." });
    setIsEditing(false);
  };

  const preplannedTrips = mockTrips.filter(t => t.status === 'upcoming').slice(0, 3);
  const previousTrips = mockTrips.filter(t => t.status === 'completed').slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card variant="elevated" className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground"><Camera className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">{user?.firstName} {user?.lastName}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                {user?.city && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{user.city}, {user.country}</span>}
              </div>
            </div>
            <Button variant={isEditing ? "hero" : "outline"} onClick={isEditing ? handleSave : () => setIsEditing(true)} className="gap-2">
              {isEditing ? <><Save className="h-4 w-4" />Save</> : 'Edit Profile'}
            </Button>
          </div>

          {isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t">
              <Input placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              <Input placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              <Input placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <Input placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              <Input placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-lg">Preplanned Trips</CardTitle></CardHeader><CardContent className="space-y-3">
          {preplannedTrips.map(trip => (<div key={trip.id} className="p-3 bg-secondary rounded-lg"><h4 className="font-medium">{trip.name}</h4><p className="text-sm text-muted-foreground">{trip.startDate.toLocaleDateString()}</p><Button variant="outline" size="sm" className="mt-2">View</Button></div>))}
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Previous Trips</CardTitle></CardHeader><CardContent className="space-y-3">
          {mockTrips.slice(0, 3).map(trip => (<div key={trip.id} className="p-3 bg-secondary rounded-lg"><h4 className="font-medium">{trip.name}</h4><p className="text-sm text-muted-foreground">{trip.startDate.toLocaleDateString()}</p><Button variant="outline" size="sm" className="mt-2">View</Button></div>))}
        </CardContent></Card>
      </div>
    </div>
  );
}
