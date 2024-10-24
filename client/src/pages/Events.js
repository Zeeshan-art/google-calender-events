import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Info, RefreshCw, AlertCircle } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/events");
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch calendar events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const formatDateTime = (dateString) => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'Invalid date';
        }
    };

    const LoadingCard = () => (
        <div className="bg-white p-6 border rounded-lg shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto p-4 max-w-4xl">
                <header className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">Calendar Events</h1>
                    <p className="text-gray-600">Stay organized with your schedule</p>
                </header>

                <div className="mb-6 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        {events.length} {events.length === 1 ? 'event' : 'events'} found
                    </p>
                    <button
                        onClick={fetchEvents}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 
                                 disabled:text-gray-400 transition-colors duration-200 flex items-center"
                    >
                        <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Events
                    </button>
                </div>
                
                {loading && (
                    <div className="space-y-4">
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={fetchEvents}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                )}
                
                {!loading && !error && events.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No events found</h2>
                        <p className="text-gray-500 mb-6">Your calendar is clear. Time to plan something exciting!</p>
                        <button 
                            onClick={fetchEvents} 
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Refresh Events
                        </button>
                    </div>
                )}
                
                {events.length > 0 && !loading && (
                    <div className="space-y-6">
                        {events.map((event) => (
                            <div 
                                key={event.event_id} 
                                className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md 
                                         transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                    {event.summary}
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                                    <p className="flex items-center">
                                        <Calendar size={18} className="mr-2 text-blue-500 flex-shrink-0" />
                                        <span>Starts: {formatDateTime(event.start_time)}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <Clock size={18} className="mr-2 text-blue-500 flex-shrink-0" />
                                        <span>Ends: {formatDateTime(event.end_time)}</span>
                                    </p>
                                </div>
                                
                                {event.location && (
                                    <p className="flex items-start mt-4 text-gray-600">
                                        <MapPin size={18} className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </p>
                                )}
                                
                                {event.description && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;