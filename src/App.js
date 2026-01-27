import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Menu, X, ChevronRight, Sparkles, Zap, Shield } from 'lucide-react';
import heroTexture from './assets/back_hero.png';
import logo from './assets/logo_web_zynqz.png';

import product1 from './assets/breif_1.png';
import product2 from './assets/breif_2.png';
import product3 from './assets/breif_3.png';
import companyDoc from './assets/company_registration.png'; // replace with your actual file name

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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
    
      const sections = ['home', 'about', 'products', 'contact'];
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
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Replace with your PNG */}
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="relative">
                {/* Placeholder for your logo - Replace this div with <img> */}
                <div className="relative">
    {/* Replace placeholder with your image */}
    <img src={logo} alt="Company Logo" className="h-10 sm:h-12 md:h-12 lg:h-14 w-auto transition-all duration-300 group-hover:scale-105" />
  </div>
                {/* Uncomment below and add your logo path */}
                {/* <img src="/path-to-your-logo.png" alt="Company Logo" className="h-12 w-auto transition-all duration-300 group-hover:scale-105" /> */}
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Products', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-sm font-medium tracking-wide transition-colors hover:text-[#2f3a64] ${
                    activeSection === item.toLowerCase() ? 'text-[#2f3a64]' : 'text-[#2f3a64]/70'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#efc07f] animate-expand" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden z-50 transition-transform hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white/98 backdrop-blur-md border-t transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-4">
            {['Home', 'About', 'Products', 'Contact'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-lg font-medium hover:text-gray-600 transition-all"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

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

          
          <div className="space-y-8">
            {/* Animated Badge */}
            {/* <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 text-sm animate-slide-down">
              <Sparkles size={16} />
              <span>Innovative Solutions for Modern Living</span>
            </div> */}

            {/* Main Heading with Staggered Animation */}
                {/* <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="block animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        Transform Your
      </span>
      <span className="block mt-3 animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        <span className="relative inline-block">
          <span className="relative z-10">Everyday Life</span>
          <span className="absolute inset-0 bg-black transform -skew-x-12 translate-y-1" style={{ zIndex: -1 }}></span>
        </span>
      </span>
    </h1> */}

            {/* Brand logo + wordmark */}
            <div
              className="mt-7 flex flex-col items-center gap-8 animate-fade-in-up opacity-0"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <img src={logo} alt="ZynQz Logo" className="w-[clamp(200px,45vw,520px)] h-auto" />
              {/* <span className="text-2xl justify-center font-bold tracking-[1.8em]">ZynQz</span> */}
            </div>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              We create exceptional products that blend innovation, quality, and design to elevate your lifestyle
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollToSection('products')}
                className="group bg-[#2f3a64] text-white px-8 py-4 text-lg font-medium hover:bg-[#2f3a64]/90 transition-all hover:scale-105 inline-flex items-center shadow-lg"
              >
                Explore Our Products
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="group border-2 border-[#2f3a64] text-[#2f3a64] px-8 py-4 text-lg font-medium hover:bg-[#2f3a64] hover:text-white transition-all hover:scale-105 inline-flex items-center"
              >
                Learn More
              </button>
            </div>

            {/* Floating Icons - commented out as requested */}
            {false && (
            <div className="flex justify-center gap-16 mt-28 animate-fade-in opacity-0" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              {[
                { icon: Sparkles, label: 'Innovation' },
                { icon: Shield, label: 'Quality' },
                { icon: Zap, label: 'Performance' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center group cursor-pointer"
                  style={{ animation: `float 3s ease-in-out infinite ${idx * 0.3}s` }}
                >
                  <div className="p-4 border-2 border-gray-200 rounded-full group-hover:border-black transition-all group-hover:scale-110">
                    <item.icon size={24} />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#efc07f] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#efc07f] rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium">
                About Us
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Crafting Excellence Through Innovation
              </h2>
              <div className="w-20 h-1 bg-[#efc07f]"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are pioneers in creating products that make a difference. Our journey began with a simple vision: to develop solutions that seamlessly integrate into modern lifestyles while maintaining the highest standards of quality and design.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every product we launch represents our commitment to innovation, functionality, and user satisfaction. We don't just follow trends - we set them.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm text-gray-600">Quality Assured</div>
                </div>
                <div className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold mb-2">2026</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
              </div>
            </div>

            {/* Company Registration Document Image */}
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-md aspect-[3/4] bg-white border border-gray-200 shadow-lg overflow-hidden">
                <img
                  src={companyDoc}
                  alt="Company registration document"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-3 gap-8 mt-24">
            {[
              { 
                title: 'Premium Quality', 
                desc: 'Every product undergoes rigorous testing to ensure it meets our exacting standards',
                icon: Shield
              },
              { 
                title: 'Innovation Driven', 
                desc: 'Constantly pushing boundaries with cutting-edge design and technology',
                icon: Zap
              },
              { 
                title: 'Customer Focused', 
                desc: 'Your satisfaction and feedback drive our continuous improvement',
                icon: Sparkles
              }
            ].map((value, idx) => (
              <div 
                key={idx} 
                className="group p-8 bg-white border-2 border-gray-100 hover:border-[#2f3a64] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <value.icon className="mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium mb-4">
              Our Collection
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Featured Products</h2>
            <div className="w-20 h-1 bg-[#efc07f] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our first premium offering - carefully designed with your comfort and lifestyle in mind
            </p>
          </div>

          {/* Product Showcase */}
          <div className="max-w-5xl mx-auto mb-20">
  <div className="group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#2f3a64]">
    <div className="grid md:grid-cols-2">
      {/* Product Image Carousel */}
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-50">
        {/* Images */}
        {productImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Product ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {productImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-[#2f3a64] scale-110' 
                  : 'bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-xl font-bold"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % productImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-xl font-bold"
        >
          ›
        </button>
      </div>

      {/* Product Details */}
      <div className="p-10 flex flex-col justify-center space-y-6">
        <div>
          <span className="inline-block bg-gray-100 text-[#2f3a64] px-3 py-1 text-xs font-bold tracking-wider mb-4">
            PREMIUM COLLECTION
          </span>
          <h3 className="text-3xl lg:text-4xl font-bold mb-3">Women's Essentials</h3>
          <p className="text-gray-600 leading-relaxed">
            Our inaugural product line featuring premium women's underwear. Designed with meticulous attention to detail, combining luxury materials with exceptional comfort for the modern woman.
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          {[
            'Ultra-soft premium fabric',
            'Breathable & moisture-wicking',
            'All-day comfort design',
            'Sophisticated aesthetics',
            'Eco-friendly materials'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start group/item">
              <div className="w-2 h-2 bg-[#2f3a64] mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="bg-[#2f3a64] text-white px-8 py-4 font-medium hover:bg-[#2f3a64]/90 transition-all hover:scale-105 inline-flex items-center justify-center group/btn w-full sm:w-auto shadow-lg">
          Discover More
          <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
        </button>
      </div>
    </div>
  </div>
</div>

          {/* Coming Soon Teaser */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="relative p-12 border-2 border-dashed border-gray-300 hover:border-[#2f3a64] transition-colors group">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4">
                <Sparkles className="inline animate-pulse" size={20} />
              </div>
              <h4 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">
                More Innovation Coming Soon
              </h4>
              <p className="text-gray-600 mb-4">
                We're working on exciting new products that will redefine quality and design
              </p>
              <p className="text-sm text-gray-500">Stay tuned for upcoming launches</p>
            </div>
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
                  className="w-full px-6 py-4 bg-transparent text-white border-2 border-white/40 focus:border-[#efc07f] focus:outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-transparent text-white border-2 border-white/40 focus:border-[#efc07f] focus:outline-none transition-colors"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-6 py-4 bg-transparent text-white border-2 border-white/40 focus:border-[#efc07f] focus:outline-none transition-colors"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 bg-transparent text-white border-2 border-white/40 focus:border-[#efc07f] focus:outline-none transition-colors resize-none"
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
              <button onClick={() => scrollToSection('home')} className="hover:text-[#efc07f] transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-[#efc07f] transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="hover:text-[#efc07f] transition-colors">
                Products
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-[#efc07f] transition-colors">
                Contact
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <a href="https://www.linkedin.com/company/zynqz-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#efc07f] rounded-full transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/zynqz-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#efc07f] rounded-full transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
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