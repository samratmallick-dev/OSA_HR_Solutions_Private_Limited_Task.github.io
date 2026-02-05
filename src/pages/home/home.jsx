import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Settings, Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

const Home = () => {
      const navigate = useNavigate();
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      return (
            <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user.name || 'User'}! 👋
                  </h1>
                  <p>
                        Here's what's happening with your account today.
                  </p>
            </div>
      );
};

export default Home;