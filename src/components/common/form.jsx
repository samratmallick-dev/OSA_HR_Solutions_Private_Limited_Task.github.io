import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

const CommonForm = ({
      formControls,
      formData,
      setFormData,
      onSubmit,
      buttonText,
      isFormValid,
      errors = {},
      showPasswordStrength = false
}) => {
      const [showPasswords, setShowPasswords] = useState({});

      const togglePasswordVisibility = (fieldName) => {
            setShowPasswords(prev => ({
                  ...prev,
                  [fieldName]: !prev[fieldName]
            }));
      };

      const renderInputsByComponentsType = (getControlItems) => {
            let element = null;
            const value = formData[getControlItems.name];
            const error = errors[getControlItems.name];

            switch (getControlItems.componentType) {
                  case 'input':
                        element = (
                              <div className="relative">
                                    <Input
                                          type={getControlItems.type === 'password' && showPasswords[getControlItems.name] ? 'text' : getControlItems.type}
                                          name={getControlItems.name}
                                          placeholder={getControlItems.placeholder}
                                          id={getControlItems.name}
                                          value={value || ''}
                                          onChange={(e) => setFormData({
                                                ...formData, [getControlItems.name]: e.target.value
                                          })}
                                          className={error ? 'border-red-500 pr-10' : 'pr-10'}
                                    />
                                    {getControlItems.type === 'password' && (
                                          <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility(getControlItems.name)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                          >
                                                {showPasswords[getControlItems.name] ? (
                                                      <EyeOff className="w-4 h-4" />
                                                ) : (
                                                      <Eye className="w-4 h-4" />
                                                )}
                                          </button>
                                    )}
                                    {error && (
                                          <p className="text-red-500 text-sm mt-1">{error}</p>
                                    )}
                                    {showPasswordStrength && getControlItems.name === 'password' && value && (
                                          <PasswordStrengthIndicator password={value} />
                                    )}
                              </div>
                        )
                        break;
                  default:
                        element = (
                              <div className="relative">
                                    <Input
                                          type={getControlItems.type === 'password' && showPasswords[getControlItems.name] ? 'text' : getControlItems.type}
                                          name={getControlItems.name}
                                          placeholder={getControlItems.placeholder}
                                          id={getControlItems.name}
                                          value={value || ''}
                                          onChange={(e) => setFormData({
                                                ...formData, [getControlItems.name]: e.target.value
                                          })}
                                          className={error ? 'border-red-500 pr-10' : 'pr-10'}
                                    />
                                    {getControlItems.type === 'password' && (
                                          <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility(getControlItems.name)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                          >
                                                {showPasswords[getControlItems.name] ? (
                                                      <EyeOff className="w-4 h-4" />
                                                ) : (
                                                      <Eye className="w-4 h-4" />
                                                )}
                                          </button>
                                    )}
                                    {error && (
                                          <p className="text-red-500 text-sm mt-1">{error}</p>
                                    )}
                              </div>
                        );
                        break;
            }
            return element;
      };

      return (
            <form onSubmit={onSubmit}>
                  <div className='flex flex-col gap-3'>
                        {
                              formControls.map((controlItems) => (
                                    <div
                                          key={controlItems.name}
                                          className='grid w-full gap-1.5'
                                    >
                                          <Label className='mb-1'>{controlItems.label} :</Label>
                                          {
                                                renderInputsByComponentsType(controlItems)
                                          }
                                    </div>
                              ))
                        }
                  </div>
                  {buttonText &&
                        <Button
                              type='submit'
                              className='w-full mt-3 cursor-pointer'
                              disabled={isFormValid}
                        >
                              {buttonText ? buttonText : 'Submit'}
                        </Button>
                  }
            </form>
      );
};

const PasswordStrengthIndicator = ({ password }) => {
      const { checks, strength } = validatePasswordStrength(password);
      
      const getStrengthColor = () => {
            if (strength <= 2) return 'bg-red-500';
            if (strength <= 3) return 'bg-yellow-500';
            if (strength <= 4) return 'bg-blue-500';
            return 'bg-green-500';
      };
      
      const getStrengthText = () => {
            if (strength <= 2) return 'Weak';
            if (strength <= 3) return 'Fair';
            if (strength <= 4) return 'Good';
            return 'Strong';
      };
      
      return (
            <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength</span>
                        <span className={`text-xs font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                              {getStrengthText()}
                        </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                              style={{ width: `${(strength / 5) * 100}%` }}
                        />
                  </div>
                  <div className="mt-2 space-y-1">
                        <div className={`text-xs ${checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                              ✓ At least 8 characters
                        </div>
                        <div className={`text-xs ${checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                              ✓ One uppercase letter
                        </div>
                        <div className={`text-xs ${checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                              ✓ One lowercase letter
                        </div>
                        <div className={`text-xs ${checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                              ✓ One number
                        </div>
                        <div className={`text-xs ${checks.special ? 'text-green-600' : 'text-gray-400'}`}>
                              ✓ One special character
                        </div>
                  </div>
            </div>
      );
};

const validatePasswordStrength = (password) => {
      const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };
      
      const strength = Object.values(checks).filter(Boolean).length;
      return { checks, strength };
};

export default CommonForm;
