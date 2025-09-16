import { Link } from 'react-router-dom';
import { ArrowRight, Users, Search, Calendar, DollarSign, Shield, Zap, Globe, Target, TrendingUp, Briefcase, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBackground from '@/assets/hero-background.jpg';
import alumglobeLogo from '@/assets/alumglobe-logo.png';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    { icon: Users, title: 'Verified Alumni Profiles', description: 'Comprehensive profiles with verified data to ensure authenticity and trust.' },
    { icon: Search, title: 'Search & Connect', description: 'Advanced search filters to find alumni by industry, location, batch, and expertise.' },
    { icon: Calendar, title: 'Events Hub', description: 'Centralized platform for alumni events, reunions, and networking opportunities.' },
    { icon: DollarSign, title: 'Fundraising Transparency', description: 'Track donations, view impact reports, and support educational initiatives.' },
    { icon: Shield, title: 'Safe and consent based chat', description: 'Connect with fellow alumni and students through our secure, consent-based chat system.' },
    { icon: Zap, title: 'Jobs/Hackathons/Internships', description: 'Provided by alumni and verified by us.' },
    { icon: DollarSign, title: 'Mentorship and Guidance', description: 'Guidance provided by alumni to students and freshers and other services.' },
    { icon: Globe, title: 'Overall improvement of the college ecosystem', description: 'It boosts the overall growth of the college ecosystem.' },
  ];

  const problems = [
    { icon: Users, title: 'Alumni Data Decay', description: 'Contact and career information becomes outdated, making it difficult to stay connected.' },
    { icon: Target, title: 'Missed Mentorship', description: 'Students struggle to find relevant mentors while alumni willing to help go unnoticed.' },
    { icon: TrendingUp, title: 'Fragmented Networks', description: 'Alumni communities are scattered across platforms with no central hub.' },
    { icon: Globe, title: 'Limited Global Reach', description: 'Alumni abroad often remain disconnected from their alma mater and peers.' },
    { icon: Briefcase, title: 'Career Growth Gaps', description: 'Opportunities for jobs, internships, and referrals are lost without structured alumni support.' },
    { icon: MessageCircle, title: 'Low Engagement', description: 'Events, updates, and opportunities often fail to reach the right alumni or students.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-16 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-background/60 to-yellow-600/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-28">
            <motion.div
              className="animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={alumglobeLogo}
                alt="AlumGlobe"
                className="h-28 w-28 mx-auto mb-8 rounded-full object-cover shadow-lg ring-4 ring-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-white/90 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
                AlumGlobe
              </h1>

              <p className="text-xl md:text-2xl font-semibold text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connecting Alumni, Inspiring Students, and Building Lifelong Opportunities
              </p>

              <p className="text-lg font-semibold text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                AlumGlobe brings graduates and students together to share knowledge, mentorship, career guidance,
                and unforgettable experiences, creating a thriving network that empowers everyone.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  asChild
                  className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-primary font-semibold rounded-lg flex items-center space-x-2 hover:bg-white/90"
                >
                  <Link to="/signup">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-primary font-semibold rounded-lg flex items-center space-x-2 hover:bg-white/90"
                >
                  <Link to="/login">
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gradient-to-b from-muted/40 to-background" id="problems">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              The Alumni Engagement Challenge
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Traditional alumni networks face significant challenges that limit their effectiveness and impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden backdrop-blur-lg bg-background/60 border border-border/50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-destructive/20 to-destructive/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:from-destructive/30 group-hover:to-destructive/20 transition-all duration-300">
                      <problem.icon className="w-8 h-8 text-destructive" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">{problem.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-muted/40 to-background" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Powerful Features
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to build and maintain strong alumni relationships.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ duration: 0.6 }}
              >
                <Card className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/60 to-muted/30 backdrop-blur-md shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-yellow-600 text-white relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div className="animate-fade-in" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Transform Your Alumni Network?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of alumni already connecting, mentoring, and growing together on AlumGlobe.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {[
                { label: 'Start Your Journey', to: '/signup' },
                { label: 'Login Now', to: '/login' },
              ].map((btn, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-white to-gray-100 text-primary shadow-lg hover:shadow-2xl hover:from-gray-100 hover:to-white transition-all duration-300 flex items-center gap-2"
                  >
                    <Link to={btn.to}>
                      <span>{btn.label}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
