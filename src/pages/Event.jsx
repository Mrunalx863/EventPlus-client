import React, { useEffect, useState, useCallback } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import { Search, X, Building2, BarChart3, Sparkles, RefreshCw, AlertTriangle, Target } from 'lucide-react';
import Footer from '../components/Footer';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortEvents = useCallback(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedPlatform === 'unstop') {
      filtered = filtered.filter(event => event.tags?.includes('unstop'));
    }

    if (selectedPlatform !== 'all' && selectedPlatform !== 'unstop') {
      filtered = filtered.filter(event =>
        event.hostedBy?.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }

    switch (sortBy) {
      case 'newest': {
        filtered.sort((a, b) => {
          const today = new Date();
          const aEndDate = new Date(a.endDate);
          const bEndDate = new Date(b.endDate);
          if (aEndDate >= today && bEndDate >= today) return aEndDate - bEndDate;
          if (aEndDate < today && bEndDate < today) return bEndDate - aEndDate;
          if (aEndDate >= today && bEndDate < today) return -1;
          if (bEndDate >= today && aEndDate < today) return 1;
          return 0;
        });
        break;
      }
      case 'oldest':
        filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        break;
      case 'deadline': {
        filtered.sort((a, b) => {
          const today = new Date();
          const aDeadline = new Date(a.deadline || a.endDate);
          const bDeadline = new Date(b.deadline || b.endDate);
          if (aDeadline >= today && bDeadline >= today) return aDeadline - bDeadline;
          if (aDeadline < today && bDeadline < today) return bDeadline - aDeadline;
          if (aDeadline >= today && bDeadline < today) return -1;
          if (bDeadline >= today && aDeadline < today) return 1;
          return 0;
        });
        break;
      }
      case 'alphabetical':
        filtered.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [events, searchTerm, selectedPlatform, sortBy]);

  const getPlatformCounts = () => {
    const eventArray = Array.isArray(events) ? events : [];
    
    return {
      all: eventArray.length,
      devfolio: eventArray.filter(e => e.hostedBy?.toLowerCase() === 'devfolio').length,
      unstop: eventArray.filter(e => e.tags?.includes('unstop')).length,
      devpost: eventArray.filter(e => e.hostedBy?.toLowerCase() === 'devpost').length,
    };
  };

  const platformCounts = getPlatformCounts();

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [filterAndSortEvents]);

  return (
    <>
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-5">
            Latest <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Handpicked hackathons and coding events from <span className="text-pink-600 font-bold">Devfolio, Unstop, and Devpost</span>
          </p>
        </div>

        {!loading && !error && events.length > 0 && (
          <div className="mb-12 p-8 rounded-3xl border-2 border-pink-200/50 bg-white/70 backdrop-blur-xl shadow-[0_12px_48px_rgba(199,78,111,0.12)]">
            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-600" strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Search events, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-14 py-5 rounded-2xl border-2 border-pink-300/60 bg-white text-base font-medium outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all shadow-sm"
                />
                {searchTerm && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-pink-100 text-pink-600 grid place-items-center hover:bg-pink-200 transition-all hover:scale-110"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-sm font-black text-slate-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-pink-600" strokeWidth={2.5} /> Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-pink-300/60 bg-white text-base font-bold focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23C74E6F%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276,9 12,15 18,9%27%3E%3C/polyline%3E%3C/svg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '20px' }}
                >
                  <option value="all">All Platforms ({platformCounts.all})</option>
                  <option value="devfolio">Devfolio ({platformCounts.devfolio})</option>
                  <option value="unstop">Unstop ({platformCounts.unstop})</option>
                  <option value="devpost">Devpost ({platformCounts.devpost})</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-black text-slate-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-pink-600" strokeWidth={2.5} /> Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-pink-300/60 bg-white text-base font-bold focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23C74E6F%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276,9 12,15 18,9%27%3E%3C/polyline%3E%3C/svg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '20px' }}
                >
                  <option value="newest">Ending Soon First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="deadline">By Deadline</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>

            {/* Results & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-pink-200/50">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 text-base font-bold border-2 border-pink-300/50 shadow-sm">
                <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                {filteredEvents.length} of {events.length} events
                {searchTerm && ` for "${searchTerm}"`}
              </span>

              <button
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_8px_32px_rgba(199,78,111,0.3)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.4)] disabled:opacity-50 transition-all hover:scale-105 cursor-pointer"
                onClick={fetchEvents}
                disabled={loading}
              >
                <RefreshCw className="w-5 h-5 transition-transform group-hover:rotate-180" strokeWidth={2.5} />
                Refresh Events
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto my-12 text-center p-10 rounded-3xl bg-red-50/80 border-2 border-red-200 shadow-[0_8px_32px_rgba(239,68,68,0.15)]">
            <AlertTriangle className="w-16 h-16 mx-auto mb-5 text-red-500" strokeWidth={2} />
            <h3 className="text-red-700 text-2xl font-black mb-3">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
            <button 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 border-2 border-red-300 font-bold hover:bg-red-50 transition-all hover:scale-105"
              onClick={fetchEvents}
            >
              <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
              Try Again
            </button>
          </div>
        )}

        {loading && (
          <div className="py-24 text-center">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-pink-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-600 text-xl font-bold">Loading amazing events...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
              {currentEvents.length > 0 ? (
                currentEvents.map((event, index) => <EventCard key={index} event={event} />)
              ) : events.length > 0 ? (
                <div className="text-center py-24 col-span-full">
                  <Search className="w-20 h-20 mx-auto mb-6 text-slate-400" strokeWidth={1.5} />
                  <h3 className="text-3xl font-black text-slate-800 mb-4">No events found</h3>
                  <p className="text-slate-600 mb-8 text-xl max-w-md mx-auto">No events match your current search and filter criteria.</p>
                  <button
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-pink-600 border-2 border-pink-300 font-bold hover:bg-pink-50 transition-all hover:scale-105"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedPlatform('all');
                      setSortBy('newest');
                    }}
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="text-center py-24 col-span-full">
                  <Target className="w-20 h-20 mx-auto mb-6 text-slate-400" strokeWidth={1.5} />
                  <h3 className="text-3xl font-black text-slate-800">No events available</h3>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredEvents.length > eventsPerPage && (
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl border-2 border-pink-200/50 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(199,78,111,0.12)]">
                <div className="text-slate-600 font-medium">
                  Showing <span className="font-bold text-pink-600">{indexOfFirstEvent + 1}</span> to{' '}
                  <span className="font-bold text-pink-600">{Math.min(indexOfLastEvent, filteredEvents.length)}</span> of{' '}
                  <span className="font-bold text-pink-600">{filteredEvents.length}</span> events
                </div>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl font-bold text-pink-600 border-2 border-pink-300 bg-white hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-4 py-2 text-slate-400 font-bold">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`px-4 py-2 rounded-xl font-bold border-2 transition-all hover:scale-105 cursor-pointer ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-600 shadow-[0_4px_16px_rgba(199,78,111,0.3)]'
                              : 'bg-white text-pink-600 border-pink-300 hover:bg-pink-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl font-bold text-pink-600 border-2 border-pink-300 bg-white hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
     <Footer />
     </>
  );
};

export default Event;