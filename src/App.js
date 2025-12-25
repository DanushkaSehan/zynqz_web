import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkles, Zap, Shield } from 'lucide-react';
import heroTexture from './assets/back_hero.jpg';
import logo from './assets/logo_web_zynqz.png';

import product1 from './assets/breif_1.png';
import product2 from './assets/breif_2.png';
import product3 from './assets/breif_3.png';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroFade, setHeroFade] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
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
    <img src={logo} alt="Company Logo" className="h-8 sm:h-10 md:h-9 lg:h-10 w-auto transition-all duration-300 group-hover:scale-105" />
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
                  className={`relative text-sm font-medium tracking-wide transition-colors hover:text-black ${
                    activeSection === item.toLowerCase() ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black animate-expand" />
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
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-black">

          
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
              <img src={logo} alt="ZynQz Logo" className="w-[clamp(160px,40vw,440px)] h-auto" />
              <span className="text-2xl justify-center font-bold tracking-[1.8em]">ZynQz</span>
            </div>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              We create exceptional products that blend innovation, quality, and design to elevate your lifestyle
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollToSection('products')}
                className="group bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-900 transition-all hover:scale-105 inline-flex items-center shadow-lg"
              >
                Explore Our Products
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="group border-2 border-black text-black px-8 py-4 text-lg font-medium hover:bg-black hover:text-white transition-all hover:scale-105 inline-flex items-center"
              >
                Learn More
              </button>
            </div>

            {/* Floating Icons */}
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
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-black text-white px-4 py-1 text-sm font-medium">
                About Us
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Crafting Excellence Through Innovation
              </h2>
              <div className="w-20 h-1 bg-black"></div>
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
                  <div className="text-4xl font-bold mb-2">2025</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="text-center z-10">
                  <div className="text-8xl mb-4 animate-pulse">🚀</div>
                  <p className="text-xl font-medium">Innovation First</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 border-4 border-black transform rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-black transform rotate-12"></div>
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
                className="group p-8 bg-white border-2 border-gray-100 hover:border-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
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
            <div className="inline-block bg-black text-white px-4 py-1 text-sm font-medium mb-4">
              Our Collection
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Featured Products</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our first premium offering - carefully designed with your comfort and lifestyle in mind
            </p>
          </div>

          {/* Product Showcase */}
          <div className="max-w-5xl mx-auto mb-20">
  <div className="group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-black">
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
                  ? 'bg-black scale-110' 
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
          <span className="inline-block bg-gray-100 text-black px-3 py-1 text-xs font-bold tracking-wider mb-4">
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
              <div className="w-2 h-2 bg-black mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all hover:scale-105 inline-flex items-center justify-center group/btn w-full sm:w-auto shadow-lg">
          Discover More
          <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
        </button>
      </div>
    </div>
  </div>
</div>

          {/* Coming Soon Teaser */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="relative p-12 border-2 border-dashed border-gray-300 hover:border-black transition-colors group">
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
      <section id="contact" className="relative py-32 bg-black text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white transform rotate-45"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white text-black px-4 py-1 text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Let's Connect</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions or want to learn more? We'd love to hear from you
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-transparent text-white border-2 border-gray-600 focus:border-white focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-transparent text-white border-2 border-gray-600 focus:border-white focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-6 py-4 bg-transparent text-white border-2 border-gray-600 focus:border-white focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 bg-transparent text-white border-2 border-gray-600 focus:border-white focus:outline-none transition-colors resize-none"
              ></textarea>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert('Thank you for your message! We will get back to you soon.');
                }}
                className="w-full bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-all hover:scale-105 shadow-lg group"
              >
                <span className="inline-flex items-center justify-center">
                  Send Message
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </button>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-8 mt-24">
            {[
              { title: 'Email', info: 'info@yourcompany.com', icon: '📧' },
              { title: 'Phone', info: '+1 (555) 123-4567', icon: '📱' },
              { title: 'Location', info: '123 Innovation Street, City', icon: '📍' }
            ].map((contact, idx) => (
              <div 
                key={idx} 
                className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h4 className="font-bold mb-2 text-lg">{contact.title}</h4>
                <p className="text-gray-400">{contact.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex-shrink-0">
              {/* Logo - Replace with your PNG */}
              <div className="w-40 h-12 bg-white flex items-center justify-center">
                <span className="text-black font-bold text-xl tracking-wider">ZynQz</span>
              </div>
              {/* <img src="/path-to-your-logo.png" alt="Company Logo" className="h-12 w-auto" /> */}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-gray-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-gray-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="hover:text-gray-400 transition-colors">
                Products
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-gray-400 transition-colors">
                Contact
              </button>
            </div>

            <p className="text-gray-400 text-sm">
              © 2025 ZynQz. All rights reserved.
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
        opacity: 0.12;
        filter: grayscale(100%);
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