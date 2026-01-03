export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  country?: string;
  avatar?: string;
  additionalInfo?: string;
  createdAt: Date;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImage?: string;
  startDate: Date;
  endDate: Date;
  status: 'ongoing' | 'upcoming' | 'completed';
  destinations: TripDestination[];
  totalBudget?: number;
  createdAt: Date;
  isPublic?: boolean;
}

export interface TripDestination {
  id: string;
  tripId: string;
  cityId: string;
  cityName: string;
  country: string;
  startDate: Date;
  endDate: Date;
  order: number;
  activities: Activity[];
  accommodationBudget?: number;
  transportBudget?: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  description?: string;
  costIndex: number; // 1-5 scale
  popularity: number;
  region: string;
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  image?: string;
  type: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'shopping' | 'relaxation';
  duration: number; // in hours
  cost: number;
  cityId: string;
  rating?: number;
}

export interface ItinerarySection {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  order: number;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  sectionId: string;
  activityId?: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  cost: number;
  day: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  tripId?: string;
  tripName?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalTrips: number;
  activeTrips: number;
  popularCities: { city: string; count: number }[];
  popularActivities: { activity: string; count: number }[];
  userTrends: { date: string; users: number }[];
}
