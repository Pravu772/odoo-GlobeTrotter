import { Link, useLocation } from 'react-router-dom';
import { 
  Globe, 
  Home, 
  Map, 
  Calendar, 
  Users, 
  User, 
  Search, 
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'My Trips', path: '/trips', icon: Map },
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Community', path: '/community', icon: Users },
  { label: 'Profile', path: '/profile', icon: User },
];

const adminItems = [
  { label: 'Admin Panel', path: '/admin', icon: LayoutDashboard },
];

export function Navbar() {
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allNavItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl gradient-primary shadow-md group-hover:shadow-lg transition-all duration-300">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">GlobalTrotter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/trips/new">
              <Button variant="hero" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Plan a Trip
              </Button>
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                {user?.firstName?.[0] || 'U'}
              </div>
              <span className="text-sm font-medium">{user?.firstName || 'User'}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border">
              <Link to="/trips/new" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Plan a Trip
                </Button>
              </Link>
            </div>
            <Button variant="outline" className="w-full gap-2 mt-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
