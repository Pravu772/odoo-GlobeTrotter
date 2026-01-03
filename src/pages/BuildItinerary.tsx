import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, DollarSign, Trash2, GripVertical, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ItinerarySection } from '@/types';

interface Section {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
}

export default function BuildItinerary() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Section 1:',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel, or any other activity.',
      dateRange: '',
      budget: '',
    },
    {
      id: '2',
      title: 'Section 2:',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel, or any other activity.',
      dateRange: '',
      budget: '',
    },
    {
      id: '3',
      title: 'Section 3:',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel, or any other activity.',
      dateRange: '',
      budget: '',
    },
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}:`,
      description: 'All the necessary information about this section.',
      dateRange: '',
      budget: '',
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Itinerary saved!",
      description: "Your trip itinerary has been saved successfully.",
    });
    
    navigate('/trips');
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Build Itinerary</h1>
          <p className="text-muted-foreground">Create your day-by-day travel plan</p>
        </div>
        <Button variant="hero" className="gap-2" onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Itinerary'}
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={section.id} variant="elevated" className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div>
                  <Input 
                    value={section.title}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    className="text-lg font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    placeholder="Section Title"
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="iconSm"
                onClick={() => removeSection(section.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={section.description}
                onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                placeholder="Add description for this section..."
                rows={2}
                className="resize-none"
              />
              
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm text-muted-foreground mb-1.5 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </label>
                  <Input
                    value={section.dateRange}
                    onChange={(e) => updateSection(section.id, 'dateRange', e.target.value)}
                    placeholder="xxx to yyy"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm text-muted-foreground mb-1.5 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget of this section
                  </label>
                  <Input
                    value={section.budget}
                    onChange={(e) => updateSection(section.id, 'budget', e.target.value)}
                    placeholder="Enter budget"
                    type="number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          variant="outline" 
          className="w-full h-16 border-dashed gap-2 text-muted-foreground hover:text-foreground"
          onClick={addSection}
        >
          <Plus className="h-5 w-5" />
          Add another Section
        </Button>
      </div>
    </div>
  );
}
