import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { loginFormControls } from '../../config/form-index';
import { validateForm } from '../../utils/validation';
import { Lock } from 'lucide-react';

const Login = () => {
      const [formData, setFormData] = useState({
            email: '',
            password: '',
            rememberMe: false
      });
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();

      const handleSubmit = (e) => {
            e.preventDefault();
            const validation = validateForm(formData, 'login');
            
            if (validation.isValid) {
                  localStorage.setItem('isAuthenticated', 'true');
                  if (formData.rememberMe) {
                        localStorage.setItem('rememberedEmail', formData.email);
                  } else {
                        localStorage.removeItem('rememberedEmail');
                  }
                  navigate('/home');
            } else {
                  setErrors(validation.errors);
            }
      };

      const isFormValid = !formData.email || !formData.password;

      return (
            <div className="space-y-6">
                  <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
                  </div>

                  <CommonForm
                        formControls={loginFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        buttonText="Sign In"
                        isFormValid={isFormValid}
                        errors={errors}
                  />

                  <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                              <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({
                                          ...formData,
                                          rememberMe: e.target.checked
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Forgot password?
                        </Link>
                  </div>

                  <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                              Don't have an account?{' '}
                              <Link to="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign up
                              </Link>
                        </p>
                  </div>
            </div>
      );
};

export default Login;
