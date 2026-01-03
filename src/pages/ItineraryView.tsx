import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Calendar, DollarSign, Plus, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrips } from '@/data/mockData';

interface ItineraryItem {
  id: string;
  activity: string;
  expense: number;
}

interface DayPlan {
  day: number;
  items: ItineraryItem[];
}

export default function ItineraryView() {
  const { id } = useParams();
  const trip = mockTrips.find(t => t.id === id) || mockTrips[0];
  
  const [dayPlans] = useState<DayPlan[]>([
    {
      day: 1,
      items: [
        { id: '1', activity: 'Arrival and hotel check-in', expense: 150 },
        { id: '2', activity: 'Eiffel Tower visit', expense: 30 },
        { id: '3', activity: 'Dinner at local restaurant', expense: 80 },
      ],
    },
    {
      day: 2,
      items: [
        { id: '4', activity: 'Louvre Museum tour', expense: 20 },
        { id: '5', activity: 'Seine River cruise', expense: 45 },
        { id: '6', activity: 'Shopping at Champs-Élysées', expense: 200 },
        { id: '7', activity: 'Evening show at Moulin Rouge', expense: 120 },
      ],
    },
  ]);

  const totalExpense = dayPlans.reduce((total, day) => 
    total + day.items.reduce((dayTotal, item) => dayTotal + item.expense, 0), 0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/trips" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Trips
        </Link>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{trip.name}</h1>
            <p className="text-muted-foreground">{trip.description}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Trip
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card variant="flat" className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search activities..." 
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
      </Card>

      {/* Itinerary Title */}
      <Card variant="elevated" className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center text-foreground mb-2">
            Itinerary for {trip.name}
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Total: ${totalExpense}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Day Plans */}
      <div className="space-y-6">
        {dayPlans.map((dayPlan) => (
          <Card key={dayPlan.day} variant="default" className="overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge variant="default" className="gradient-primary">Day {dayPlan.day}</Badge>
                <span className="text-muted-foreground font-normal">
                  {dayPlan.items.length} activities
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-3 bg-secondary/50 text-sm font-medium text-muted-foreground">
                  <span>Physical Activity</span>
                  <span>Expense</span>
                </div>
                {dayPlan.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground">{item.activity}</span>
                    </div>
                    <span className="text-muted-foreground">${item.expense}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Day Button */}
      <Button 
        variant="outline" 
        className="w-full mt-6 h-14 border-dashed gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Another Day
      </Button>
    </div>
  );
}
