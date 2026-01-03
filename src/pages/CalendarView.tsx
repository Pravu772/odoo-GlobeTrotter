import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrips } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const weekDays = ['SUN', 'MON', 'MON', 'THU', 'THU', 'SAT', 'SUN'];
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Get trips that fall within the current month
  const getTripsForDay = (day: number) => {
    const date = new Date(year, month, day);
    return mockTrips.filter(trip => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      return date >= start && date <= end;
    });
  };

  const tripColors: Record<string, string> = {
    '1': 'bg-primary/20 text-primary border-primary/30',
    '2': 'bg-accent/20 text-accent border-accent/30',
    '3': 'bg-info/20 text-info border-info/30',
    '4': 'bg-success/20 text-success border-success/30',
    '5': 'bg-warning/20 text-warning border-warning/30',
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <Card variant="flat" className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search trips..." className="pl-10" />
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

      <Card variant="elevated">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-center">Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-foreground">{monthName}</h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const tripsForDay = day ? getTripsForDay(day) : [];
              const isToday = day === new Date().getDate() && 
                              month === new Date().getMonth() && 
                              year === new Date().getFullYear();
              
              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-[100px] p-2 border border-border/50 rounded-lg transition-colors",
                    day ? "bg-card hover:bg-secondary/30 cursor-pointer" : "bg-secondary/20",
                    isToday && "ring-2 ring-primary"
                  )}
                >
                  {day && (
                    <>
                      <span className={cn(
                        "text-sm font-medium",
                        isToday ? "text-primary" : "text-foreground"
                      )}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {tripsForDay.slice(0, 2).map((trip) => (
                          <div 
                            key={trip.id}
                            className={cn(
                              "text-xs px-1.5 py-0.5 rounded truncate border",
                              tripColors[trip.id] || tripColors['1']
                            )}
                          >
                            {trip.name}
                          </div>
                        ))}
                        {tripsForDay.length > 2 && (
                          <div className="text-xs text-muted-foreground px-1">
                            +{tripsForDay.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Trips this month:</h3>
            <div className="flex flex-wrap gap-2">
              {mockTrips.slice(0, 5).map((trip) => (
                <Badge 
                  key={trip.id} 
                  variant="outline"
                  className={cn(tripColors[trip.id] || tripColors['1'])}
                >
                  {trip.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
