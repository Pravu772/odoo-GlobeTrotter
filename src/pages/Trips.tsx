import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Plus, Calendar, DollarSign, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrips } from '@/data/mockData';
import { cn } from '@/lib/utils';

type TripStatus = 'all' | 'ongoing' | 'upcoming' | 'completed';

export default function Trips() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TripStatus>('all');

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ongoingTrips = filteredTrips.filter(t => t.status === 'ongoing');
  const upcomingTrips = filteredTrips.filter(t => t.status === 'upcoming');
  const completedTrips = filteredTrips.filter(t => t.status === 'completed');

  const statusColors: Record<string, string> = {
    ongoing: 'bg-success/10 text-success border-success/20',
    upcoming: 'bg-info/10 text-info border-info/20',
    completed: 'bg-muted text-muted-foreground border-muted',
  };

  const TripCard = ({ trip }: { trip: typeof mockTrips[0] }) => (
    <Link to={`/trips/${trip.id}`}>
      <Card variant="interactive" className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{trip.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{trip.description}</p>
            </div>
            <Button variant="ghost" size="iconSm" onClick={(e) => e.preventDefault()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {trip.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {trip.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            {trip.totalBudget && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>${trip.totalBudget.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <Badge variant="outline" className={cn("capitalize", statusColors[trip.status])}>
              {trip.status}
            </Badge>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const TripSection = ({ title, trips, status }: { title: string; trips: typeof mockTrips; status: string }) => {
    if (trips.length === 0) return null;
    
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            status === 'ongoing' && "bg-success",
            status === 'upcoming' && "bg-info",
            status === 'completed' && "bg-muted-foreground"
          )} />
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground">Manage and view all your travel plans</p>
        </div>
        <Link to="/trips/new">
          <Button variant="hero" className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card variant="flat" className="mb-8 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search trips..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="default" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Group by
            </Button>
            <Button variant="outline" size="default" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="ghost" size="default">
              Sort by...
            </Button>
          </div>
        </div>
        
        {/* Status Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {(['all', 'ongoing', 'upcoming', 'completed'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize whitespace-nowrap"
            >
              {status}
            </Button>
          ))}
        </div>
      </Card>

      {/* Trip Sections */}
      <div className="animate-fade-in">
        {statusFilter === 'all' || statusFilter === 'ongoing' ? (
          <TripSection title="Ongoing" trips={ongoingTrips} status="ongoing" />
        ) : null}
        
        {statusFilter === 'all' || statusFilter === 'upcoming' ? (
          <TripSection title="Upcoming" trips={upcomingTrips} status="upcoming" />
        ) : null}
        
        {statusFilter === 'all' || statusFilter === 'completed' ? (
          <TripSection title="Completed" trips={completedTrips} status="completed" />
        ) : null}

        {filteredTrips.length === 0 && (
          <Card variant="flat" className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No trips found</p>
            <Link to="/trips/new">
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Trip
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
