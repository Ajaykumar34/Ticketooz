
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import HomepageCarousel from '@/components/HomepageCarousel';
import CategoryList from '@/components/CategoryList';
import CitySelector from '@/components/CitySelector';
import PublicEventCard from '@/components/PublicEventCard';
import { usePopularEvents, useRegularEvents, useUpcomingEvents, useNonRecurringEvents, isEventSaleEnded, isEventPast } from '@/hooks/usePublicEvents';
import { useCategories } from '@/hooks/useCategories';
import { useAuth } from '@/hooks/useAuth';

const PublicHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCitySelector, setShowCitySelector] = useState(false);
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || '';
  });

  const { user, loading: authLoading } = useAuth();

  const { events: popularEvents, loading: popularLoading } = usePopularEvents();
  const { events: regularEvents, loading: regularLoading } = useRegularEvents();
  const { events: upcomingEvents, loading: upcomingLoading } = useUpcomingEvents();
  const { events: nonRecurringEvents, loading: nonRecurringLoading } = useNonRecurringEvents();
  const { categories } = useCategories();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };

  const handleCitySelect = (city: string) => {
    if (city === 'all_cities') {
      setSelectedCity('');
      localStorage.setItem('selectedCity', '');
    } else {
      setSelectedCity(city);
      localStorage.setItem('selectedCity', city);
    }
    setShowCitySelector(false);
  };

  const handleShowCitySelector = () => {
    setShowCitySelector(true);
  };

  const handleGetStartedClick = () => {
    // Navigate directly to event request form without login requirement
    navigate('/event-request');
  };

  if (showCitySelector) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onSearch={setSearchTerm} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCitySelector(false)}
              className="mb-4"
            >
              ← Back
            </Button>
          </div>
          <CitySelector 
            onCityChange={handleCitySelect} 
            selectedCity={selectedCity} 
          />
        </div>
      </div>
    );
  }

  if (popularLoading && regularLoading && upcomingLoading && nonRecurringLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onSearch={setSearchTerm} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter events by city and exclude expired events, but include events with sales not started
  const filterEventsByCity = (events: any[]) => {
    return events.filter(event => {
      const matchesCity = event.city === selectedCity || !selectedCity;
      const notExpired = !isEventPast(event);
      return matchesCity && notExpired;
    });
  };

  const filterEventsByCategory = (events: any[]) => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredPopularEvents = filterEventsByCategory(filterEventsByCity(popularEvents));
  const filteredRegularEvents = filterEventsByCategory(filterEventsByCity(regularEvents));
  const filteredUpcomingEvents = filterEventsByCategory(filterEventsByCity(upcomingEvents));
  const filteredNonRecurringEvents = filterEventsByCategory(filterEventsByCity(nonRecurringEvents));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchTerm} />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-semibold">
              Events in {selectedCity || 'All Cities'}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-600 bg-white hover:bg-gray-100"
              onClick={handleShowCitySelector}
            >
              Change City
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-600 bg-white hover:bg-gray-100"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      <CategoryList 
        onCategorySelect={handleCategorySelect} 
        selectedCategory={selectedCategory}
        categories={categories}
      />
      
      {/* Carousel Section */}
      <div className="mb-8">
        <HomepageCarousel />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {searchTerm && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...filteredPopularEvents, ...filteredRegularEvents, ...filteredUpcomingEvents, ...filteredNonRecurringEvents].map((event) => (
                <PublicEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {!searchTerm && (
          <>
            {filteredPopularEvents.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Popular Events</h3>
                  <Button variant="outline" onClick={() => navigate('/events')}>
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPopularEvents.map((event) => (
                    <PublicEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {filteredRegularEvents.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Regular Events</h3>
                  <Button variant="outline" onClick={() => navigate('/events')}>
                    View All Events
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRegularEvents.map((event) => (
                    <PublicEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {filteredUpcomingEvents.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
                  <Button variant="outline" onClick={() => navigate('/events')}>
                    View All Events
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredUpcomingEvents.map((event) => (
                    <PublicEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {filteredNonRecurringEvents.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">General Events</h3>
                  <Button variant="outline" onClick={() => navigate('/events')}>
                    View All Events
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredNonRecurringEvents.map((event) => (
                    <PublicEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {filteredPopularEvents.length === 0 && filteredRegularEvents.length === 0 && filteredUpcomingEvents.length === 0 && filteredNonRecurringEvents.length === 0 && (
              <section className="mb-12 text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">No Events Available</h3>
                <p className="text-gray-500 mb-6">
                  {selectedCategory 
                    ? `No events found in ${selectedCategory} category for ${selectedCity || 'your area'}.`
                    : `No events available in ${selectedCity || 'your area'} right now.`
                  }
                </p>
                <div className="space-x-4">
                  {selectedCategory && (
                    <Button variant="outline" onClick={() => setSelectedCategory('')}>
                      Clear Category Filter
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleShowCitySelector}>
                    Change City
                  </Button>
                </div>
              </section>
            )}
          </>
        )}

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle>List Your Event</CardTitle>
                <CardDescription className="text-green-100">
                  Promote your event to thousands of users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="secondary" 
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription className="text-pink-100">
                  Get in touch for any queries or support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/contact">
                  <Button variant="secondary">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/">
                <img 
                  src="/lovable-uploads/749dfa90-a1d6-4cd0-87ad-4fec3daeb6d2.png" 
                  alt="Ticketooz" 
                  className="h-12 w-auto mb-4 brightness-0 invert cursor-pointer"
                />
              </Link>
              <p className="text-gray-400">Book amazing events in your city</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/event-request" className="hover:text-white">List Your Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/events" className="hover:text-white">All Events</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Ticketooz Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
