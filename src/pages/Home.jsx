import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  MessageSquare,
  BarChart,
  X,
  Twitter,
  Linkedin,
  UserCheck,
  CheckCircle,
  MessageCircle,
  Menu,
  Facebook,
  Sun,
  Moon,
} from "lucide-react";
import Button from "../components/Button";
import NavLink from "../components/NavLink";
import MotionCard from "../components/MotionCard";

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      return newMode;
    });
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-xl sm:text-2xl font-bold">🛠️ HelpDesk</h1>
        <nav className="hidden md:flex space-x-4">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <div className="hidden md:flex space-x-2">
            <Button onClick={handleSignIn} className="cursor-pointer">Sign In</Button>
            <Button onClick={handleSignUp} className="cursor-pointer">Sign Up</Button>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-600 text-white flex flex-col items-center justify-center space-y-4 z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>
            Features
          </NavLink>
          <NavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
            How It Works
          </NavLink>
          <NavLink href="#testimonials" onClick={() => setIsMenuOpen(false)}>
            Testimonials
          </NavLink>
          <NavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </NavLink>
          <NavLink href="#faq" onClick={() => setIsMenuOpen(false)}>
            FAQ
          </NavLink>
          <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </NavLink>
          <Button onClick={handleSignIn} className="w-full max-w-xs">Sign In</Button>
          <Button onClick={handleSignUp} className="w-full max-w-xs">Sign Up</Button>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative flex-grow flex flex-col items-center justify-center text-center p-6 md:p-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1557804506-669a67965ba0)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Elevate Support, Amplify Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Empowered team with tools to resolve issues faster and keep customers happy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button onClick={handleSignUp}>Start Your Free Trial</Button>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Why Choose HelpDesk?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <Ticket
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Easy Ticketing
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Manage support tickets efficiently with a user-friendly interface.
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <MessageSquare
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Real-Time Support
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Instantly respond to customer queries with live chat.
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <BarChart
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Analytics & Reports
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Gain insights with powerful analytics and performance tracking.
            </p>
          </MotionCard>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <Ticket
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Submit a Ticket
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Customers submit support requests via our portal.
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <UserCheck
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Assign to Agent
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Tickets are assigned to the right support agent.
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <CheckCircle
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Resolve Issue
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Agents resolve issues quickly and efficiently.
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <MessageCircle
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
              style={{ color: "var(--text-primary)" }}
            />
            <h4
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Customer Feedback
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Collect feedback to improve service quality.
            </p>
          </MotionCard>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          What Our Users Say
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
              alt="Alex Johnson"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4"
            />
            <p style={{ color: "var(--text-secondary)" }} className="italic">
              "HelpDesk transformed our support process. Highly recommended!"
            </p>
            <p
              className="mt-4 font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              - Alex Johnson, CEO
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
              alt="Sarah Lee"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4"
            />
            <p style={{ color: "var(--text-secondary)" }} className="italic">
              "Real-time support is a game-changer for us."
            </p>
            <p
              className="mt-4 font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              - Sarah Lee, Manager
            </p>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-secondary)" }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
              alt="Mark Evans"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4"
            />
            <p style={{ color: "var(--text-secondary)" }} className="italic">
              "Analytics optimized our support strategy."
            </p>
            <p
              className="mt-4 font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              - Mark Evans, Lead
            </p>
          </MotionCard>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Pricing Plans
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <h4
              className="text-lg sm:text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Basic
            </h4>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600 mb-4">
              Rs. 500<span className="text-base sm:text-lg">/mo</span>
            </p>
            <ul
              className="mb-6 space-y-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Up to 5 agents</li>
              <li>Basic ticketing</li>
              <li>Email support</li>
            </ul>
            <Button>Choose Plan</Button>
          </MotionCard>
          <MotionCard
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="border-2 border-blue-600"
          >
            <h4
              className="text-lg sm:text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Pro
            </h4>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600 mb-4">
              Rs. 1000<span className="text-base sm:text-lg">/mo</span>
            </p>
            <ul
              className="mb-6 space-y-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Up to 20 agents</li>
              <li>Real-time support</li>
              <li>Basic analytics</li>
            </ul>
            <Button>Choose Plan</Button>
          </MotionCard>
          <MotionCard style={{ backgroundColor: "var(--bg-primary)" }}>
            <h4
              className="text-lg sm:text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Enterprise
            </h4>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600 mb-4">
              Rs. 2000<span className="text-base sm:text-lg">/mo</span>
            </p>
            <ul
              className="mb-6 space-y-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Unlimited agents</li>
              <li>Advanced analytics</li>
              <li>24/7 support</li>
            </ul>
            <Button>Choose Plan</Button>
          </MotionCard>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Frequently Asked Questions
        </h3>
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <div>
            <h4
              className="text-lg sm:text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              What is HelpDesk?
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              A platform to streamline ticket management and customer satisfaction.
            </p>
          </div>
          <div>
            <h4
              className="text-lg sm:text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              How do I get started?
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Sign up for a free trial and follow our onboarding guide.
            </p>
          </div>
          <div>
            <h4
              className="text-lg sm:text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Can I integrate with other tools?
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Yes, it supports Slack, Zendesk, and more.
            </p>
          </div>
          <div>
            <h4
              className="text-lg sm:text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              What support do you offer?
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Email for Basic, 24/7 priority for Enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="p-6 md:p-12 text-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <h3
          className="text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Get in Touch
        </h3>
        <p
          className="mb-6 max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Have questions? We're here to help!
        </p>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Support agent"
          className="w-full max-w-xs sm:max-w-md mx-auto rounded-lg mb-6 shadow-lg"
        />
        <Button>Contact Us</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6">
        <div className="mb-6">
          <h4 className="text-lg sm:text-xl font-bold mb-2">
            Subscribe to Our Newsletter
          </h4>
          <form className="flex justify-center max-w-md mx-auto w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-l-md bg-white text-gray-800 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: isDarkMode ? "#4b5563" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#1f2937",
                borderColor: isDarkMode ? "#6b7280" : "#d1d5db",
              }}
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        </div>
        <p>© 2025 HelpDesk. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4 sm:space-x-6">
          <NavLink href="#" className="text-white hover:underline">
            Privacy
          </NavLink>
          <NavLink href="#" className="text-white hover:underline">
            Terms
          </NavLink>
          <NavLink href="#" className="text-white hover:underline">
            Support
          </NavLink>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 transition-all duration-300" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 transition-all duration-300" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 transition-all duration-300" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;