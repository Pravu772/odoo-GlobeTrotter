import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Star, DollarSign, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cities, activities } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'cities' | 'activities'>('cities');
  const { toast } = useToast();

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTrip = (name: string) => {
    toast({
      title: "Added to trip!",
      description: `${name} has been added to your current trip.`,
    });
  };

  const costIndexColors = ['', 'text-success', 'text-success', 'text-warning', 'text-accent', 'text-destructive'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Search</h1>
        <p className="text-muted-foreground">Find cities and activities for your trip</p>
      </div>

      {/* Search Bar */}
      <Card variant="flat" className="mb-8 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder={`Search ${searchType}...`}
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
        
        {/* Type Tabs */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant={searchType === 'cities' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSearchType('cities')}
          >
            Cities
          </Button>
          <Button
            variant={searchType === 'activities' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSearchType('activities')}
          >
            Activities
          </Button>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Results ({searchType === 'cities' ? filteredCities.length : filteredActivities.length})
        </h2>

        {searchType === 'cities' ? (
          <div className="space-y-3">
            {filteredCities.map((city) => (
              <Card key={city.id} variant="interactive">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{city.name}</h3>
                        <Badge variant="secondary">{city.country}</Badge>
                        <Badge variant="outline">{city.region}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{city.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <DollarSign className={`h-4 w-4 ${costIndexColors[city.costIndex]}`} />
                          <span className="text-muted-foreground">
                            Cost Index: {'$'.repeat(city.costIndex)}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning" />
                          <span className="text-muted-foreground">
                            Popularity: {city.popularity}%
                          </span>
                        </span>
                      </div>
                    </div>
                    <Button variant="hero" size="sm" className="gap-2" onClick={() => handleAddToTrip(city.name)}>
                      <Plus className="h-4 w-4" />
                      Add to Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} variant="interactive">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{activity.name}</h3>
                        <Badge variant="secondary" className="capitalize">{activity.type}</Badge>
                        {activity.rating && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-warning fill-warning" />
                            {activity.rating}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-info" />
                          <span className="text-muted-foreground">{activity.duration}h</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-success" />
                          <span className="text-muted-foreground">${activity.cost}</span>
                        </span>
                      </div>
                    </div>
                    <Button variant="hero" size="sm" className="gap-2" onClick={() => handleAddToTrip(activity.name)}>
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {((searchType === 'cities' && filteredCities.length === 0) || 
          (searchType === 'activities' && filteredActivities.length === 0)) && (
          <Card variant="flat" className="p-12 text-center">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
          </Card>
        )}
      </div>
    </div>
  );
}
