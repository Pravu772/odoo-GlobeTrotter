import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cities } from '@/data/mockData';
import parisImg from '@/assets/destinations/paris.jpg';
import tokyoImg from '@/assets/destinations/tokyo.jpg';
import newyorkImg from '@/assets/destinations/newyork.jpg';
import baliImg from '@/assets/destinations/bali.jpg';

const destinationImages: Record<string, string> = {
  '1': parisImg,
  '2': tokyoImg,
  '3': newyorkImg,
  '4': baliImg,
};

export default function CreateTrip() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    selectedPlace: '',
  });
  
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSuggestion = (cityId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Trip created!",
      description: "Your new trip has been created successfully.",
    });
    
    navigate('/trips/new/itinerary');
  };

  const suggestedPlaces = cities.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card variant="flat" className="animate-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">Plan a New Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium text-foreground">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium text-foreground">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="selectedPlace" className="text-sm font-medium text-foreground">
                Select a Place
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="selectedPlace"
                  name="selectedPlace"
                  placeholder="Enter destination..."
                  value={formData.selectedPlace}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Suggestions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Suggestion for Places to Visit / Activities to Perform
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedPlaces.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => toggleSuggestion(city.id)}
                    className={`relative h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedSuggestions.includes(city.id)
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    {destinationImages[city.id] ? (
                      <img 
                        src={destinationImages[city.id]} 
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-primary-foreground text-sm font-medium">
                      {city.name}
                    </div>
                    {selectedSuggestions.includes(city.id) && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                        <svg className="h-3 w-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Second Row of Suggestions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cities.slice(0, 6).map((_, index) => (
                <div 
                  key={`placeholder-${index}`}
                  className="h-32 rounded-xl border border-dashed border-border bg-secondary/30 flex items-center justify-center"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" variant="hero" size="lg" className="gap-2" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Continue to Itinerary'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
