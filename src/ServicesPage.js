import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Zap, Shield } from 'lucide-react';
import logo from './assets/logo_web_zynqz.png';
import machinery1 from './assets/machinery_1.jpeg';
import machinery2 from './assets/machinery_2.jpeg';

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('product-development');
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Services | ZynQz – Apparel Product Development & Machinery Solutions';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'ZynQz services: apparel product development using bonding, advanced sewing and molding techniques, plus expert machinery selection and process setup for manufacturers.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.zynqz.com/services');
    return () => {
      document.title = 'ZynQz | Turning Apparel Ideas Into Production-Ready Reality';
      if (metaDesc) metaDesc.setAttribute('content', 'ZynQz - Turning apparel ideas into production-ready reality. From bonding and advanced sewing to molding and scalable manufacturing.');
      if (canonical) canonical.setAttribute('href', 'https://www.zynqz.com/');
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
    const handleScroll = () => {
      const sections = ['product-development', 'machinery-solutions'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const beforeServices = [{ label: 'Home', href: '/#home' }];
  const afterServices = [
    { label: 'Our Apparel', href: '/#apparel' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#2f3a64] font-sans overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:grid lg:grid-cols-3">

            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => navigate('/')}>
              <img src={logo} alt="ZynQz Logo" className="h-10 sm:h-12 lg:h-14 w-auto transition-all duration-300 group-hover:scale-105" />
            </div>

            {/* Desktop Menu - centered */}
            <div className="hidden lg:flex justify-center items-center space-x-6">
              {beforeServices.map((item) => (
                <a key={item.label} href={item.href} className="relative text-sm font-medium tracking-wide whitespace-nowrap text-[#2f3a64]/70 hover:text-[#2f3a64] transition-colors">
                  {item.label}
                </a>
              ))}
              {/* Services Dropdown (active page) */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  className="relative text-sm font-medium tracking-wide whitespace-nowrap text-[#2f3a64] inline-flex items-center gap-1"
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#efc07f]" />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-3 w-52 bg-white shadow-xl border border-gray-100 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => { scrollToSection('product-development'); setServicesOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 hover:bg-gray-50 ${activeSection === 'product-development' ? 'text-[#2f3a64] border-[#efc07f] bg-gray-50' : 'text-[#2f3a64]/80 border-transparent hover:border-[#efc07f]'}`}
                      >
                        Product Development
                      </button>
                      <button
                        onClick={() => { scrollToSection('machinery-solutions'); setServicesOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 hover:bg-gray-50 ${activeSection === 'machinery-solutions' ? 'text-[#2f3a64] border-[#efc07f] bg-gray-50' : 'text-[#2f3a64]/80 border-transparent hover:border-[#efc07f]'}`}
                      >
                        Machinery Solutions
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {afterServices.map((item) => (
                <a key={item.label} href={item.href} className="relative text-sm font-medium tracking-wide whitespace-nowrap text-[#2f3a64]/70 hover:text-[#2f3a64] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - right */}
            <div className="flex justify-end">
              <button
                className="lg:hidden z-50 transition-transform hover:scale-110 text-[#2f3a64]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            {beforeServices.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full text-left px-3 py-3 text-base font-medium rounded text-[#2f3a64]/70 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10 transition-all">
                <span className="w-1.5 h-1.5 mr-3 flex-shrink-0" />
                {item.label}
              </a>
            ))}
            {/* Services */}
            <div>
              <div className="flex items-center justify-between w-full px-3 py-3 text-base font-medium rounded text-[#2f3a64] bg-[#2f3a64]/10">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#efc07f] mr-3 flex-shrink-0" />
                  Services
                </span>
                <ChevronDown size={14} className="rotate-180 text-[#efc07f]" />
              </div>
              <div className="ml-6 border-l-2 border-[#efc07f]/60 pl-3 space-y-1 mt-1">
                {[
                  { label: 'Product Development', id: 'product-development' },
                  { label: 'Machinery Solutions', id: 'machinery-solutions' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-all ${activeSection === item.id ? 'text-[#2f3a64] font-semibold' : 'text-[#2f3a64]/60 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Our Apparel, About Us, Contact */}
            {afterServices.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full text-left px-3 py-3 text-base font-medium rounded text-[#2f3a64]/70 hover:text-[#2f3a64] hover:bg-[#2f3a64]/10 transition-all">
                <span className="w-1.5 h-1.5 mr-3 flex-shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-block bg-[#2f3a64] text-white px-4 py-1 text-sm font-medium mb-6">What We Offer</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Our <span className="text-[#efc07f]">Services</span>
          </h1>
          <div className="w-20 h-1 bg-[#efc07f] mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-[#2f3a64]/70 leading-relaxed">
            From concept evaluation to machinery selection - we provide the expertise to take your apparel product from idea to production-ready reality.
          </p>

          {/* Section jump links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => scrollToSection('product-development')}
              className={`px-6 py-3 text-sm font-medium border-2 transition-all hover:scale-105 ${activeSection === 'product-development' ? 'bg-[#2f3a64] text-white border-[#2f3a64]' : 'border-[#2f3a64] text-[#2f3a64] hover:bg-[#2f3a64] hover:text-white'}`}
            >
              Product Development
            </button>
            <button
              onClick={() => scrollToSection('machinery-solutions')}
              className={`px-6 py-3 text-sm font-medium border-2 transition-all hover:scale-105 ${activeSection === 'machinery-solutions' ? 'bg-[#2f3a64] text-white border-[#2f3a64]' : 'border-[#2f3a64] text-[#2f3a64] hover:bg-[#2f3a64] hover:text-white'}`}
            >
              Machinery Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Product Development Section */}
      <section id="product-development" className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#efc07f] text-[#2f3a64] px-4 py-1 text-sm font-bold tracking-wider">PRODUCT DEVELOPMENT</div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">From Concept to Production</h2>
              <div className="w-16 h-1 bg-[#efc07f]"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                We help you bridge the gap between design and manufacturing.
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-[#2f3a64]">We specialize in:</p>
                {[
                  'Bonded garment development',
                  'Advanced sewing techniques',
                  'Molding and hybrid constructions',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#efc07f] flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <p className="font-semibold text-[#2f3a64]">We ensure your product is:</p>
                {['Functional', 'Scalable', 'Production-ready'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[#efc07f] font-bold">✓</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="/#contact"
                className="group bg-[#2f3a64] text-white px-8 py-4 font-medium hover:bg-[#2f3a64]/90 transition-all hover:scale-105 inline-flex items-center shadow-lg"
              >
                Get Started
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>

            <div className="relative overflow-hidden shadow-xl border border-gray-100 group">
              <img
                src={machinery2}
                alt="ZynQz apparel product development - bonding and sewing construction process"
                className="w-full h-full object-cover min-h-[420px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a64]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Machinery Solutions Section */}
      <section id="machinery-solutions" className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#efc07f] text-[#2f3a64] px-4 py-1 text-sm font-bold tracking-wider mb-4">MACHINERY SOLUTIONS</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Right Machinery for the Right Product</h2>
            <div className="w-16 h-1 bg-[#efc07f] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide guidance on selecting the right machinery and processes to support your product requirements - so you invest in exactly what you need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { title: 'Machinery Selection', desc: 'Expert guidance on which equipment fits your specific construction needs.', icon: Zap },
              { title: 'Process Setup', desc: 'Support for setting up the right production processes from the start.', icon: Shield },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-white border-2 border-gray-100 hover:border-[#2f3a64] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <item.icon className="mx-auto mb-4 text-[#2f3a64] group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-lg font-bold text-[#2f3a64] mb-2">{item.title}</h4>
                <div className="w-8 h-0.5 bg-[#efc07f] mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
              <img src={machinery1} alt="ZynQz apparel machinery solutions - industrial sewing and bonding equipment" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 bg-[#2f3a64] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white transform rotate-45"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-lg text-gray-300 mb-3">Have an idea you want to bring to life?</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">Let's make it happen.</h2>
          <a
            href="/#contact"
            className="group bg-[#efc07f] text-[#2f3a64] px-10 py-4 text-lg font-bold hover:bg-[#efc07f]/90 transition-all hover:scale-105 inline-flex items-center shadow-lg"
          >
            Contact Us
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a2332] to-[#0f1419] text-white py-12 border-t border-[#2f3a64]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="ZynQz Logo" className="h-12 w-auto" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="/#home" className="hover:text-[#efc07f] transition-colors">Home</a>
              <span className="text-[#efc07f]">Services</span>
              <a href="/#apparel" className="hover:text-[#efc07f] transition-colors">Our Apparel</a>
              <a href="/#about" className="hover:text-[#efc07f] transition-colors">About Us</a>
              <a href="/#contact" className="hover:text-[#efc07f] transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
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
            <p className="text-gray-400 text-sm">© 2026 ZynQz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
