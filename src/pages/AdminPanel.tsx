import { Search, Filter, SlidersHorizontal, Users, MapPin, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminStats } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['hsl(168, 84%, 32%)', 'hsl(24, 95%, 53%)', 'hsl(199, 89%, 48%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)'];

export default function AdminPanel() {
  const pieData = adminStats.popularCities.map(c => ({ name: c.city, value: c.count }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card variant="flat" className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2"><SlidersHorizontal className="h-4 w-4" />Group by</Button>
            <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Filter</Button>
            <Button variant="ghost">Sort by...</Button>
          </div>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button variant="default" size="sm">Manage Users</Button>
          <Button variant="ghost" size="sm">Popular cities</Button>
          <Button variant="ghost" size="sm">Popular Activities</Button>
          <Button variant="ghost" size="sm">User Trends and Analytics</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="elevated"><CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10"><Users className="h-6 w-6 text-primary" /></div>
          <div><p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Users</p></div>
        </CardContent></Card>
        <Card variant="elevated"><CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/10"><MapPin className="h-6 w-6 text-accent" /></div>
          <div><p className="text-2xl font-bold">{adminStats.totalTrips.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Trips</p></div>
        </CardContent></Card>
        <Card variant="elevated"><CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-success/10"><TrendingUp className="h-6 w-6 text-success" /></div>
          <div><p className="text-2xl font-bold">{adminStats.activeTrips.toLocaleString()}</p><p className="text-sm text-muted-foreground">Active Trips</p></div>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated"><CardHeader><CardTitle>Popular Cities</CardTitle></CardHeader><CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent></Card>
        <Card variant="elevated"><CardHeader><CardTitle>User Trends</CardTitle></CardHeader><CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adminStats.userTrends}><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="users" stroke="hsl(168, 84%, 32%)" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </CardContent></Card>
        <Card variant="elevated" className="lg:col-span-2"><CardHeader><CardTitle>Popular Activities</CardTitle></CardHeader><CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminStats.popularActivities}><XAxis dataKey="activity" /><YAxis /><Tooltip /><Bar dataKey="count" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </CardContent></Card>
      </div>
    </div>
  );
}
