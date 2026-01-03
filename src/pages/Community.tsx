import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { communityPosts } from '@/data/mockData';

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card variant="flat" className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search community posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2"><SlidersHorizontal className="h-4 w-4" />Group by</Button>
            <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Filter</Button>
            <Button variant="ghost">Sort by...</Button>
          </div>
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-6 text-center">Community Tab</h2>

      <div className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.id} variant="interactive">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">{post.userName[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{post.userName}</span>
                    <span className="text-sm text-muted-foreground">{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  {post.tripName && <p className="text-sm text-primary mb-2">📍 {post.tripName}</p>}
                  <p className="text-foreground mb-4">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors"><Heart className="h-4 w-4" />{post.likes}</button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-4 w-4" />{post.comments}</button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-4 w-4" />Share</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
