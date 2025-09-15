import { Link } from 'react-router-dom';
import { ArrowRight, Users, Search, Calendar, DollarSign, Shield, Zap, Globe, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBackground from '@/assets/hero-background.jpg';
import alumglobeLogo from '@/assets/alumglobe-logo.png';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Smart Profiles',
      description: 'AI-enhanced alumni profiles with automatic skill matching and career insights.',
    },
    {
      icon: Search,
      title: 'Search & Connect',
      description: 'Advanced search filters to find alumni by industry, location, batch, and expertise.',
    },
    {
      icon: Calendar,
      title: 'Events Hub',
      description: 'Centralized platform for alumni events, reunions, and networking opportunities.',
    },
    {
      icon: DollarSign,
      title: 'Fundraising Transparency',
      description: 'Track donations, view impact reports, and support educational initiatives.',
    },
  ];

  const problems = [
    {
      icon: Users,
      title: 'Alumni Data Decay',
      description: 'Contact information becomes outdated, making it difficult to maintain connections.',
    },
    {
      icon: Target,
      title: 'Missed Mentorship',
      description: 'Students struggle to find relevant mentors while alumni want to give back.',
    },
    {
      icon: TrendingUp,
      title: 'Fragmented Networks',
      description: 'Alumni networks exist in silos across different platforms and channels.',
    },
  ];

  const solutions = [
    {
      icon: Shield,
      title: 'Verified Alumni Data',
      description: 'Centralized, regularly updated alumni database with verification systems.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Smart algorithms connect students with relevant mentors and opportunities.',
    },
    {
      icon: Globe,
      title: 'Unified Platform',
      description: 'One comprehensive platform for all alumni engagement activities.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative pt-16 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 42, 102, 0.8), rgba(212, 160, 23, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <div className="animate-fade-in">
              <img 
                src={alumglobeLogo} 
                alt="AlumGlobe" 
                className="h-24 w-24 mx-auto mb-8 animate-bounce-gentle"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                AlumGlobe
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                AI-powered Alumni Networking & Engagement
              </p>
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                Connect with fellow alumni, find mentors, explore career opportunities, 
                and give back to your alma mater through our comprehensive platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-hero text-lg px-8 py-4">
                  <Link to="/signup" className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild className="btn-outline-hero text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/50" id="problems">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Alumni Engagement Challenge
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional alumni networks face significant challenges that limit their effectiveness and impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <Card key={index} className="card-elevated group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors">
                    <problem.icon className="w-8 h-8 text-destructive" />
                  </div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20" id="solution">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Comprehensive Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AlumGlobe addresses these challenges with innovative technology and user-centric design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card key={index} className="card-elevated group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                    <solution.icon className="w-8 h-8 text-success" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits List */}
          <div className="bg-gradient-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Centralized alumni database',
                'AI-powered mentor matching',
                'Verified job opportunities',
                'Transparent fundraising',
                'Event management tools',
                'Real-time networking'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build and maintain strong alumni relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Alumni Network?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of alumni already connecting, mentoring, and growing together on AlumGlobe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg">
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                <Link to="/login">Login Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;