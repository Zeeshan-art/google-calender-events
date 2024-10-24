import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginWithGoogle = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            window.location.href = "http://localhost:5000/api/google";
        } catch (error) {
            setError('Failed to connect with Google. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Connect with your Google Calendar to manage your events
                    </p>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg 
                                className="h-5 w-5 text-blue-500 group-hover:text-blue-400" 
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </span>
                        <span className="ml-4">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connecting...
                                </>
                            ) : 'Connect with Google'}
                        </span>
                    </button>
                </div>
                {error && (
                    <div className="mt-4 text-center bg-red-50 text-red-600 py-3 px-4 rounded-lg text-sm animate-pulse">
                        {error}
                    </div>
                )}
                <div className="mt-6">
                    <p className="text-xs text-center text-gray-500">
                        By connecting, you agree to share your Google Calendar information 
                        with our application to manage your events.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginWithGoogle;