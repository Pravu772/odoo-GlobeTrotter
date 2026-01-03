import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Plus, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { cities, mockTrips } from '@/data/mockData';
import heroBanner from '@/assets/hero-banner.jpg';
import parisImg from '@/assets/destinations/paris.jpg';
import tokyoImg from '@/assets/destinations/tokyo.jpg';
import newyorkImg from '@/assets/destinations/newyork.jpg';
import baliImg from '@/assets/destinations/bali.jpg';

const destinationImages: Record<string, string> = {
  paris: parisImg,
  tokyo: tokyoImg,
  newyork: newyorkImg,
  bali: baliImg,
};

export default function Dashboard() {
  const { user } = useAuth();
  
  const previousTrips = mockTrips.filter(t => t.status === 'completed').slice(0, 4);
  const topDestinations = cities.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={heroBanner} 
          alt="Explore the world" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-slide-up">
            Explore the World
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-up stagger-1">
            Plan your next adventure with GlobalTrotter
          </p>
          <div className="w-full max-w-2xl animate-slide-up stagger-2">
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-lg rounded-2xl p-2 shadow-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search destinations, activities..." 
                  className="pl-12 border-0 bg-transparent h-12 text-lg focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="default" className="hidden sm:flex gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Group by
                </Button>
                <Button variant="secondary" size="default" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="ghost" size="default">
                  Sort by...
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Top Regional Selections */}
        <section className="animate-slide-up stagger-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Top Regional Selections</h2>
            <Link to="/search">
              <Button variant="ghost" className="text-primary">
                View all
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {topDestinations.map((city) => {
              const imgKey = city.name.toLowerCase().replace(/\s+/g, '');
              const imgSrc = destinationImages[imgKey] || parisImg;
              
              return (
                <Link to={`/search?city=${city.id}`} key={city.id}>
                  <Card variant="destination" className="h-48 md:h-56 relative overflow-hidden">
                    <img 
                      src={imgSrc} 
                      alt={city.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                      <h3 className="font-semibold text-lg">{city.name}</h3>
                      <p className="text-sm opacity-80">{city.country}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Previous Trips */}
        <section className="animate-slide-up stagger-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Previous Trips</h2>
            <Link to="/trips">
              <Button variant="ghost" className="text-primary">
                View all
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mockTrips.slice(0, 4).map((trip) => (
              <Link to={`/trips/${trip.id}`} key={trip.id}>
                <Card variant="interactive" className="h-40 md:h-48 overflow-hidden">
                  <CardContent className="h-full flex flex-col justify-between p-4">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2">{trip.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{trip.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {trip.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {trip.totalBudget && (
                        <>
                          <span className="mx-1">•</span>
                          <DollarSign className="h-3 w-3" />
                          <span>{trip.totalBudget}</span>
                        </>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Plan a Trip CTA */}
        <section className="animate-slide-up stagger-5">
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Ready for your next adventure?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Start planning your dream trip today. Add destinations, activities, and create the perfect itinerary.
                  </p>
                  <Link to="/trips/new">
                    <Button variant="hero" size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Plan a Trip
                    </Button>
                  </Link>
                </div>
                <div className="w-full md:w-80 h-48 md:h-64 relative">
                  <div className="absolute inset-0 gradient-hero opacity-20" />
                  <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-primary/30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
