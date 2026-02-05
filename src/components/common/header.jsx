import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { ThemeToggle } from './toggle-theme';

const Header = () => {
      const navigate = useNavigate();
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const handleLogout = () => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            navigate('/auth/login');
      };

      return (
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                  <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                          Welcome Back
                                    </h1>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                    <ThemeToggle />
                                    
                                    <div className="flex items-center space-x-3">
                                          <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                      <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="hidden sm:block">
                                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {user.name || 'User'}
                                                      </p>
                                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {user.email || 'user@example.com'}
                                                      </p>
                                                </div>
                                          </div>
                                          
                                          <button
                                                onClick={handleLogout}
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                title="Logout"
                                          >
                                                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </header>
      );
};

export { Header };
