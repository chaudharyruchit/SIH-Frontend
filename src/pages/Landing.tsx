import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Search,
  Calendar,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Target,
  TrendingUp,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background.jpg";
import alumglobeLogo from "@/assets/alumglobe-logo.png";
import { motion } from "framer-motion";

const Landing = () => {
  const features = [
    { icon: Users, title: "Verified Alumni Profiles", description: "Comprehensive profiles with verified data to ensure authenticity and trust." },
    { icon: Search, title: "Search & Connect", description: "Advanced filters to find alumni by industry, location, batch, and expertise." },
    { icon: Calendar, title: "Events Hub", description: "A central space for reunions, webinars, and networking opportunities." },
    { icon: DollarSign, title: "Fundraising Transparency", description: "Track donations, view impact, and support educational causes transparently." },
    { icon: Shield, title: "Secure Chat", description: "Consent-based alumni-student conversations with privacy-first design." },
    { icon: Zap, title: "Opportunities", description: "Hackathons, internships, and jobs — powered by alumni and verified by us." },
    { icon: DollarSign, title: "Mentorship", description: "Alumni-led guidance for students and recent graduates." },
    { icon: Globe, title: "Community Growth", description: "Strengthening college culture and global alumni presence." },
  ];

  const problems = [
    { icon: Users, title: "Data Decay", description: "Outdated alumni info causes disconnection and missed opportunities." },
    { icon: Target, title: "Missed Mentorship", description: "Students can’t find the right mentors; alumni aren’t engaged." },
    { icon: TrendingUp, title: "Fragmented Networks", description: "Communities scattered across different platforms." },
    { icon: Globe, title: "Limited Global Reach", description: "International alumni lose touch with their alma mater." },
    { icon: Briefcase, title: "Career Gaps", description: "Lost job and internship referrals due to weak connections." },
    { icon: MessageCircle, title: "Low Engagement", description: "Important updates and events fail to reach the right people." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative pt-16 pb-28 overflow-hidden text-center text-white"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-background/70 to-secondary/70 mix-blend-multiply gradient-animated" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center">
          <motion.img
            src={alumglobeLogo}
            alt="AlumGlobe"
            className="h-28 w-28 rounded-full shadow-lg ring-4 ring-white/20 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AlumGlobe
          </motion.h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Connect. Inspire. Grow. — Empowering alumni and students through a single global platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300">
              <Link to="/signup">
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300">
              <Link to="/login">
                <span>Login</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS SECTION ===== */}
      <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Alumni Engagement Challenge
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-16">
            Alumni connections often fade — we’re here to change that.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className="glass-smooth hover-lift rounded-2xl p-6">
                  <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full bg-destructive/10 mb-4 icon-glow">
                      <item.icon className="w-8 h-8 text-destructive" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Features
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-16">
            Everything you need to build and maintain lasting alumni relationships.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className="glass-smooth hover-lift rounded-2xl p-6 text-center">
                  <div className="p-4 rounded-full bg-primary/20 mb-4 icon-glow inline-flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Transform Your Network?</h2>
          <p className="text-lg text-white/90 mb-10">
            Join thousands of alumni already connecting, mentoring, and growing together on AlumGlobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="bg-white text-primary px-8 py-4 rounded-xl shadow-lg hover:bg-white/90 transition-all duration-300">
              <Link to="/signup">Start Your Journey</Link>
            </Button>
            <Button asChild className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300">
              <Link to="/login">Login Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
