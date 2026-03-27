import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Menu, X, ChevronRight, Sparkles, Zap, Shield, ChevronDown } from 'lucide-react';
import heroTexture from './assets/back_hero.png';
import logo from './assets/logo_web_zynqz.png';
import product1 from './assets/breif_1.png';
import product2 from './assets/breif_2.png';
import product3 from './assets/breif_3.png';
import ServicesPage from './ServicesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroFade, setHeroFade] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const productImages = [product1, product2, product3];
  const productAlts = [
    "ZynQz Women's Essentials - advanced bonding construction apparel",
    "ZynQz Women's Essentials - precision-engineered garment detail",
    "ZynQz Women's Essentials - production-ready apparel design",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const heroHeight = window.innerHeight;
    const scrollY = window.scrollY;
      const fadeValue = Math.max(0, 1 - scrollY / (heroHeight * 0.9));

    setHeroFade(fadeValue);
    
      const sections = ['home', 'apparel', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setFormError('Please fill in all the fields before sending.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        'service_319hkhr',
        'template_deyxx3d',
        {
          from_name: name,
          reply_to: email,
          subject,
          message,
          to_email: 'zynqzhelp@gmail.com',
        },
        'PlCwr07WeOQd9lvUW'
      );

      setFormSuccess('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormError('Something went wrong while sending your message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    document.title = 'ZynQz | Turning Apparel Ideas Into Production-Ready Reality';
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2f3a64] font-sans overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%',
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            right: '10%',
            bottom: '20%',
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/70 backdrop-blur-md lg:bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:grid lg:grid-cols-3">
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <img src={logo} alt="ZynQz Logo" className="h-10 sm:h-12 lg:h-14 w-auto transition-all duration-300 group-hover:scale-105" />
            </div>

            {/* Desktop Menu - centered */}
            <div className="hidden lg:flex justify-center items-center space-x-6">
              {/* Home */}
              {[{ label: 'Home', id: 'home' }].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-wide whitespace-nowrap transition-colors hover:text-[#2f3a64] ${
                    activeSection === item.id ? 'text-[#2f3a64]' : 'text-[#2f3a64]/70'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#efc07f] animate-expand" />
                  )}
                </button>
              ))}
              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  className="relative text-sm font-medium tracking-wide whitespace-nowrap text-[#2f3a64]/70 hover:text-[#2f3a64] transition-colors inline-flex items-center gap-1"
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-3 w-52 bg-white shadow-xl border border-gray-100 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => { navigate('/services#product-development'); setServicesOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-[#2f3a64]/80 hover:text-[#2f3a64] hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-[#efc07f]"
                      >
                        Product Development
                      </button>
                      <button
                        onClick={() => { navigate('/services#machinery-solutions'); setServicesOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-[#2f3a64]/80 hover:text-[#2f3a64] hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-[#efc07f]"
                      >
                        Machinery Solutions
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Our Apparel, About Us, Contact */}
              {[
                { label: 'Our Apparel', id: 'apparel' },
                { label: 'About Us', id: 'about' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-wide whitespace-nowrap transition-colors hover:text-[#2f3a64] ${
                    activeSection === item.id ? 'text-[#2f3a64]' : 'text-[#2f3a64]/70'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#efc07f] animate-expand" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button - right column */}
            <div className="flex justify-end">
              <button
                className="lg:hidden z-50 transition-transform hover:scale-110 text-[#2f3a64]"
                onClick={() => { setIsMenuOpen(!isMenuOpen); setMobileServicesOpen(false); }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute w-full bg-white/90 backdrop-blur-md border-t border-[#2f3a64]/10 shadow-lg transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-1">
            {/* Home */}
            {[{ label: 'Home', id: 'home' }].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full text-left px-3 py-3 text-base font-medium rounded transition-all ${
                  activeSection === item.id
                    ? 'text-[#2f3a64] bg-[#2f3a64]/10'
                    : 'text-[#2f3a64]/70 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10'
                }`}
              >
                {activeSection === item.id
                  ? <span className="w-1.5 h-1.5 rounded-full bg-[#efc07f] mr-3 flex-shrink-0" />
                  : <span className="w-1.5 h-1.5 mr-3 flex-shrink-0" />
                }
                {item.label}
              </button>
            ))}
            {/* Services dropdown */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className="flex items-center justify-between w-full text-left px-3 py-3 text-base font-medium rounded text-[#2f3a64]/70 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10 transition-all"
              >
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 mr-3 flex-shrink-0" />
                  Services
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 text-[#efc07f] ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-6 border-l-2 border-[#efc07f]/60 pl-3 space-y-1">
                  <button
                    onClick={() => { navigate('/services#product-development'); setIsMenuOpen(false); setMobileServicesOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-sm text-[#2f3a64]/60 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10 rounded transition-all"
                  >
                    Product Development
                  </button>
                  <button
                    onClick={() => { navigate('/services#machinery-solutions'); setIsMenuOpen(false); setMobileServicesOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-sm text-[#2f3a64]/60 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10 rounded transition-all"
                  >
                    Machinery Solutions
                  </button>
                </div>
              )}
            </div>
            {/* Our Apparel, About Us, Contact */}
            {[
              { label: 'Our Apparel', id: 'apparel' },
              { label: 'About Us', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full text-left px-3 py-3 text-base font-medium rounded transition-all ${
                  activeSection === item.id
                    ? 'text-[#2f3a64] bg-[#2f3a64]/10'
                    : 'text-[#2f3a64]/70 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10'
                }`}
              >
                {activeSection === item.id
                  ? <span className="w-1.5 h-1.5 rounded-full bg-[#efc07f] mr-3 flex-shrink-0" />
                  : <span className="w-1.5 h-1.5 mr-3 flex-shrink-0" />
                }
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
     <section
  id="home"
  className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
>
  {/* Background image */}
  <div
    className="absolute inset-0 hero-bg-image"
    style={{
      backgroundImage: `url(${heroTexture})`,
      opacity: heroFade * 0.12, 
    }}
  />

  {/* Shape layer */}
  <div className="absolute inset-0 hero-bg-shape" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-[#2f3a64]">

          
          <div className="space-y-4 sm:space-y-8">
            {/* Logo */}
            <div
              className="mt-2 sm:mt-7 flex flex-col items-center animate-fade-in-up opacity-0"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <img src={logo} alt="ZynQz Logo" className="w-[clamp(80px,15vw,200px)] h-auto mb-2 sm:mb-8" />
            </div>

            {/* Headline */}
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fade-in-up opacity-0"
              style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
            >
              Turning Apparel Ideas Into{' '}
              <span className="text-[#efc07f]">Production-Ready Reality</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-base sm:text-xl text-[#2f3a64]/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0"
              style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}
            >
              From bonding and advanced sewing to molding and scalable manufacturing - we help bring your concepts to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-[#2f3a64] text-white px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:bg-[#2f3a64]/90 transition-all hover:scale-105 inline-flex items-center shadow-lg"
              >
                Work With Us
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('apparel')}
                className="group border-2 border-[#2f3a64] text-[#2f3a64] px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:bg-[#2f3a64] hover:text-white transition-all hover:scale-105 inline-flex items-center"
              >
                View Our Work
              </button>
            </div>

            {/* Hook line */}
            <p
              className="hidden sm:block text-sm text-[#2f3a64]/50 italic animate-fade-in-up opacity-0"
              style={{ animationDelay: '850ms', animationFillMode: 'forwards' }}
            >
              #BondingExcellence isn't bought with machines - it's built with know-how.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 transition-opacity duration-300 cursor-pointer hover:scale-110 active:scale-95 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={() => scrollToSection('apparel')}
          aria-label="Scroll to next section"
        >
          <div className="w-6 h-10 border-2 border-[#efc07f] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#efc07f] rounded-full mt-2 animate-scroll"></div>
          </div>
        </button>
      </section>

      {/* What We Do Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium mb-4">What We Do</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">From Idea to Manufacturable Product</h2>
            <div className="w-20 h-1 bg-[#efc07f] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work with brands and manufacturers to transform ideas into manufacturable, scalable apparel products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Bonded Garments', icon: Zap },
              { label: 'Advanced Sewing Constructions', icon: Sparkles },
              { label: 'Molding Techniques', icon: Shield },
              { label: 'Hybrid Product Designs', icon: ChevronRight },
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-white border-2 border-gray-100 hover:border-[#2f3a64] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <item.icon className="mx-auto mb-3 text-[#2f3a64] group-hover:scale-110 transition-transform" size={28} />
                <p className="font-semibold text-[#2f3a64]">{item.label}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-lg">We support you from <span className="font-semibold text-[#2f3a64]">concept</span> to <span className="font-semibold text-[#2f3a64]">production readiness</span>.</p>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium mb-4">Our Process</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How We Work</h2>
            <div className="w-20 h-1 bg-[#efc07f] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">A structured approach to turn ideas into scalable products.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Idea / Concept', desc: 'We evaluate your concept and understand your product vision and goals.' },
              { step: '02', title: 'Development & Engineering', desc: 'Construction development using bonding, sewing, and molding techniques.' },
              { step: '03', title: 'Prototyping & Refinement', desc: 'Prototype support with iterative refinement until the product is right.' },
              { step: '04', title: 'Production Readiness', desc: 'Final checks to ensure your product is functional, scalable, and manufacturable.' },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="p-8 bg-white border-2 border-gray-100 hover:border-[#2f3a64] transition-all duration-300 hover:shadow-xl h-full">
                  <div className="text-5xl font-bold text-[#efc07f]/30 mb-4 group-hover:text-[#efc07f]/50 transition-colors">{item.step}</div>
                  <h3 className="text-lg font-bold text-[#2f3a64] mb-3">{item.title}</h3>
                  <div className="w-8 h-0.5 bg-[#efc07f] mb-3"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#efc07f] z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium">Why Us</div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Because Execution Matters More Than Intention
              </h2>
              <div className="w-20 h-1 bg-[#efc07f]"></div>
              <div className="space-y-4">
                {[
                  'Strong background in manufacturing & automation',
                  'Deep understanding of bonding & advanced construction',
                  'Focus on making products production-ready, not just prototypes',
                  'Practical, hands-on approach',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#efc07f] mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: 'Production-Ready', desc: 'Not just prototypes - we take you all the way to manufacturing.' },
                { title: 'Expert Know-How', desc: '#BondingExcellence isn\'t bought with machines - it\'s built with knowledge.' },
                { title: 'Scalable Solutions', desc: 'Every development decision is made with scale in mind.' },
                { title: 'End-to-End Support', desc: 'From concept evaluation to production readiness.' },
              ].map((card, idx) => (
                <div key={idx} className="p-6 bg-white shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-[#efc07f] transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-[#2f3a64] mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Home Bottom CTA */}
      <section className="relative py-20 bg-[#2f3a64] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white transform rotate-45"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-lg text-gray-300 mb-3">Have an idea you want to bring to life?</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">Let's make it happen.</h2>
          <button
            onClick={() => scrollToSection('contact')}
            className="group bg-[#efc07f] text-[#2f3a64] px-10 py-4 text-lg font-bold hover:bg-[#efc07f]/90 transition-all hover:scale-105 inline-flex items-center shadow-lg"
          >
            Contact Us
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </section>

      {/* Our Apparel Section */}
      <section id="apparel" className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium mb-4">Our Apparel</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Built by Us. Backed by Experience.</h2>
            <div className="w-20 h-1 bg-[#efc07f] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our apparel line represents our capability in action - combining design, engineering, and advanced construction techniques.
            </p>
          </div>

          {/* Product Showcase with Carousel */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#2f3a64]">
              <div className="grid md:grid-cols-2">
                {/* Product Image Carousel */}
                <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-50">
                  {productImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={productAlts[idx]}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        idx === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {productImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'bg-[#2f3a64] scale-110' : 'bg-white/70 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-xl font-bold"
                  >‹</button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % productImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-xl font-bold"
                  >›</button>
                </div>

                {/* Product Details */}
                <div className="p-10 flex flex-col justify-center space-y-6">
                  <div>
                    <span className="inline-block bg-[#2f3a64] text-white px-3 py-1 text-xs font-bold tracking-wider mb-4">
                      PREMIUM COLLECTION
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-3">Women's Essentials</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our inaugural apparel line - built using advanced bonding and construction techniques. Designed to showcase what's possible when engineering meets design.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Advanced bonding construction',
                      'Precision-engineered comfort',
                      'Production-ready design',
                      'Innovative hybrid techniques',
                      'Scalable manufacturing approach',
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center group/item">
                        <div className="w-2 h-2 rounded-full bg-[#efc07f] mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-[#2f3a64] text-white px-8 py-4 font-medium hover:bg-[#2f3a64]/90 transition-all hover:scale-105 inline-flex items-center justify-center group/btn w-full sm:w-auto shadow-lg"
                  >
                    Enquire Now
                    <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="relative p-12 border-2 border-dashed border-gray-300 hover:border-[#2f3a64] transition-colors duration-300 group">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4">
                <Sparkles className="inline animate-pulse text-[#efc07f]" size={20} />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-[#2f3a64]">More Pieces Coming Soon</h4>
              <div className="w-12 h-0.5 bg-[#efc07f] mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">New additions to our apparel line - each built to demonstrate the possibilities of advanced construction.</p>
              <p className="text-sm text-gray-400">Stay tuned for upcoming launches</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="space-y-6">
              <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium">About Us</div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Built on Experience.<br />Driven by Innovation.
              </h2>
              <div className="w-20 h-1 bg-[#efc07f]"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a background in manufacturing, automation, and apparel engineering, we understand what it takes to move from concept to production.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our focus is simple - helping brands and manufacturers develop products that are not only innovative, but also practical to produce at scale.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow border-b-4 border-[#efc07f]">
                  <div className="text-4xl font-bold mb-2 text-[#efc07f]">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Production-Ready Focus</div>
                </div>
                <div className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow border-b-4 border-[#efc07f]">
                  <div className="text-4xl font-bold mb-2 text-[#efc07f]">2026</div>
                  <div className="text-sm text-gray-600 font-medium">Established</div>
                </div>
              </div>
            </div>

          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-8 mt-24">
            {[
              {
                title: 'Manufacturing Expertise',
                desc: 'Deep roots in manufacturing and automation - we know what it takes to build at scale.',
                icon: Shield,
              },
              {
                title: 'Advanced Construction',
                desc: 'Specialists in bonding, advanced sewing, molding, and hybrid construction methods.',
                icon: Zap,
              },
              {
                title: 'Hands-On Approach',
                desc: 'We work closely with every client - practical, direct, and results-focused.',
                icon: Sparkles,
              },
            ].map((value, idx) => (
              <div key={idx} className="group p-8 bg-white border-2 border-gray-100 hover:border-[#2f3a64] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <value.icon className="mb-4 group-hover:scale-110 transition-transform text-[#2f3a64]" size={32} />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <div className="w-8 h-0.5 bg-[#efc07f] mb-3"></div>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 bg-[#2f3a64] text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white transform rotate-45"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#efc07f] text-[#2f3a64] px-4 py-1 text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Let's Connect</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions or want to learn more? We'd love to hear from you
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-white/5 text-white placeholder-white/50 border-2 border-white/30 focus:border-[#efc07f] focus:bg-white/10 focus:outline-none transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-white/5 text-white placeholder-white/50 border-2 border-white/30 focus:border-[#efc07f] focus:bg-white/10 focus:outline-none transition-all"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-6 py-4 bg-white/5 text-white placeholder-white/50 border-2 border-white/30 focus:border-[#efc07f] focus:bg-white/10 focus:outline-none transition-all"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 bg-white/5 text-white placeholder-white/50 border-2 border-white/30 focus:border-[#efc07f] focus:bg-white/10 focus:outline-none transition-all resize-none"
                required
              ></textarea>

              {formError && (
                <p className="text-sm text-red-300">{formError}</p>
              )}
              {formSuccess && (
                <p className="text-sm text-emerald-200">{formSuccess}</p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`w-full px-8 py-4 font-medium transition-all hover:scale-105 shadow-lg group inline-flex items-center justify-center ${
                  isSending
                    ? 'bg-[#efc07f]/60 text-[#2f3a64]/70 cursor-not-allowed'
                    : 'bg-[#efc07f] text-[#2f3a64] hover:bg-[#efc07f]/90'
                }`}
              >
                <span className="inline-flex items-center justify-center">
                  {isSending ? 'Sending...' : 'Send Message'}
                  {!isSending && (
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-24">
            {[
              { title: 'Email', info: 'zynqz@zynqz.com', icon: '✉', link: 'mailto:zynqz@zynqz.com' },
              { title: 'Phone', info: '+94 70 200 9 444', icon: '☎', link: 'tel:+94702009444' },
              { title: 'Location', info: 'Colombo, Sri Lanka', icon: '📍', link: '#' }
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.link}
                className="group relative overflow-hidden bg-gradient-to-br from-[#efc07f] to-[#d4a868] text-[#2f3a64] p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-[#efc07f]/50"
              >
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2f3a64]/5 rounded-tr-full transition-all group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3 filter drop-shadow-sm">{contact.icon}</div>
                  <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-[#2f3a64]/80">{contact.title}</h4>
                  <p className="font-semibold text-[#2f3a64]">{contact.info}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a2332] to-[#0f1419] text-white py-12 border-t border-[#2f3a64]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex-shrink-0">
              {/* Logo Image */}
              <img src={logo} alt="ZynQz Logo" className="h-12 w-auto" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-[#efc07f] transition-colors">Home</button>
              <button onClick={() => navigate('/services')} className="hover:text-[#efc07f] transition-colors">Services</button>
              <button onClick={() => scrollToSection('apparel')} className="hover:text-[#efc07f] transition-colors">Our Apparel</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-[#efc07f] transition-colors">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-[#efc07f] transition-colors">Contact</button>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <a href="https://www.linkedin.com/company/zynqz-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#efc07f] rounded-full transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/zynqz/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#efc07f] rounded-full transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/94702009444" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#efc07f] rounded-full transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © 2026 ZynQz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </main>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }

       .hero-bg-image {
        background-repeat: no-repeat;
        background-size: cover;   
        background-position: center;
        opacity: 0.16;
        background-color: rgba(47, 58, 100, 0.7); /* #2f3a64 overlay */
        mix-blend-mode: multiply;
      }


        

        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-expand {
          animation: expand 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}