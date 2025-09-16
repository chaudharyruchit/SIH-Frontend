import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import alumglobeLogo from '@/assets/alumglobe-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to a section smoothly
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <img
              src={alumglobeLogo}
              alt="AlumGlobe"
              className="h-8 w-8 rounded-full object-cover shadow-sm"
            />
            <span className="text-xl font-bold text-black">AlumGlobe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Contact
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild className="text-sm border-gray-800 text-black hover:bg-gray-100">
                <Link to="/login" className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button asChild className="btn-primary text-sm">
                <Link to="/signup" className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => { scrollToSection('features'); setIsOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary w-full text-left"
              >
                Features
              </button>
              <button
                onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary w-full text-left"
              >
                Contact
              </button>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                <Button variant="outline" asChild className="w-full justify-start border-gray-800 text-black hover:bg-gray-100">
                  <Link to="/login" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild className="btn-primary w-full justify-start">
                  <Link to="/signup" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <UserPlus className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;