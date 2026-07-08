import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Languages,
  ShieldCheck,
  BarChart3,
  Laptop,
  Briefcase,
  GraduationCap,
  FileText,
  Award,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Download,
  Send,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Printer,
  Inbox,
  Check,
  MessageSquare,
  Search,
  BookOpen,
  Eye,
  AlertCircle
} from 'lucide-react';

import { navItems, heroData, aboutData, skillsData, experienceData, contactDetails } from './content';
import { Experience, Message, Skill } from './types';

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Inbox simulation state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      name: 'Jean-Luc Picard',
      email: 'j.picard@starfleet.org',
      message: 'Hello Joy, I reviewed your profile and your bilingual administrative coordination in university registries is exceptional. Let us arrange a consultation next week.',
      timestamp: '2026-07-08 09:15 AM',
      status: 'replied',
      reply: 'Thank you for reaching out, Jean-Luc. I would be glad to schedule a call to discuss how my bilingual administrative skills can assist your operations.'
    },
    {
      id: 'msg-2',
      name: 'Sarah Connor',
      email: 'sconnor@cyberdyne.com',
      message: 'Looking for an administrative leader who is highly organized, tech-savvy, and fluent in French to lead our European coordination. Please share your complete resume.',
      timestamp: '2026-07-08 11:30 AM',
      status: 'read'
    }
  ]);

  const [activeSection, setActiveSection] = useState('home');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [showCVModal, setShowCVModal] = useState(false);
  const [showInboxAdmin, setShowInboxAdmin] = useState(false);

  // Monitor scrolling to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon mapping helper
  const renderIcon = (iconName: string, className = "w-6 h-6 text-primary") => {
    switch (iconName) {
      case 'Languages': return <Languages className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Award': return <Award className={className} />;
      default: return <Briefcase className={className} />;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError(lang === 'en' ? 'All fields are required.' : 'Tous les champs sont obligatoires.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Just now)',
        status: 'unread'
      };

      setMessages(prev => [newMessage, ...prev]);
      setIsSubmitting(false);
      setShowSubmitSuccess(true);
      setForm({ name: '', email: '', message: '' });

      // Automatically transition unread message status to "read" after 3 seconds, mimicking Joy reviewing it
      setTimeout(() => {
        setMessages(prev =>
          prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)
        );
      }, 4000);

    }, 1200);
  };

  const filteredExperiences = selectedTag
    ? experienceData.filter(exp => exp.skills.includes(selectedTag))
    : experienceData;

  const filteredSkills = skillsData.filter(skill => {
    const term = skillSearch.toLowerCase();
    const matchesSearch = skill.title[lang].toLowerCase().includes(term) ||
      skill.desc[lang].toLowerCase().includes(term) ||
      (skill.tags && skill.tags.some(t => t.toLowerCase().includes(term)));
    return matchesSearch;
  });

  const triggerPrint = () => {
    window.print();
  };

  // Quick reply helper for the Inbox simulation
  const handleSimulateReply = (msgId: string, replyText: string) => {
    setMessages(prev =>
      prev.map(m => m.id === msgId ? { ...m, status: 'replied', reply: replyText } : m)
    );
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      
      {/* Dynamic Announcement Banner regarding Bilingual Focus */}
      <div className="bg-primary text-white text-xs py-2 px-4 text-center font-mono tracking-wider flex justify-center items-center gap-2 border-b border-white/10">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          {lang === 'en' 
            ? "ACTIVE RESUME: Bilingual French & English Workspace Integration" 
            : "PORTFOLIO ACTIF: Intégration de l'espace de travail bilingue français et anglais"}
        </span>
      </div>

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-20">
          
          {/* Logo / Name */}
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-primary">
              Joy Anurika Ozurumba
            </span>
            <span className="text-[10px] text-secondary font-mono uppercase tracking-widest hidden sm:inline">
              {lang === 'en' ? 'Bilingual Administrative Leader' : 'Leader Administrative Bilingue'}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-sans text-sm font-medium transition-colors duration-200 relative py-1 ${
                  activeSection === item.id 
                    ? 'text-secondary font-semibold' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label[lang]}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Language Switcher, Inbox Assistant & Download CV */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Interactive Inbox Notification button */}
            <button
              onClick={() => setShowInboxAdmin(true)}
              className="relative p-2 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
              title={lang === 'en' ? 'Inbox Assistant Simulation' : "Simulation d'assistant de messagerie"}
              id="inbox-simulator-btn"
            >
              <Inbox className="w-5 h-5" />
              {messages.some(m => m.status === 'unread') && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping"></span>
              )}
              {messages.some(m => m.status === 'unread') && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
              )}
            </button>

            {/* Language Switch */}
            <div className="flex items-center bg-surface-container border border-outline-variant rounded-full p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  lang === 'fr'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                FR
              </button>
            </div>

            {/* CV Button */}
            <button
              onClick={() => setShowCVModal(true)}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              id="download-cv-btn"
            >
              <Download className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Print / Save CV' : 'Imprimer / Sauver le CV'}
            </button>
          </div>

          {/* Mobile Menu & Lang toggles */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language switches for mobile */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="p-2 rounded-lg bg-surface-container border border-outline-variant text-xs font-bold text-primary flex items-center gap-1"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Simulated Inbox notification */}
            <button
              onClick={() => setShowInboxAdmin(true)}
              className="relative p-2 rounded-lg text-primary hover:bg-surface-container-low"
            >
              <Inbox className="w-5 h-5" />
              {messages.some(m => m.status === 'unread') && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary p-2"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface-container-lowest border-t border-outline-variant shadow-lg"
              id="mobile-menu-container"
            >
              <div className="p-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-sans text-base ${
                      activeSection === item.id ? 'text-secondary font-bold' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.label[lang]}
                  </a>
                ))}
                
                <hr className="border-outline-variant my-1" />

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowCVModal(true);
                  }}
                  className="w-full bg-primary text-white py-3 rounded-xl font-sans text-sm font-semibold flex items-center justify-center gap-2"
                  id="mobile-cv-btn"
                >
                  <Download className="w-4 h-4" />
                  {lang === 'en' ? 'Print / Save CV' : 'Imprimer / Sauver le CV'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-16 overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="w-full lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-1.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold shadow-xs"
            >
              <Languages className="w-4 h-4 text-secondary" />
              <span>{heroData.tag[lang]}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary tracking-tight"
            >
              {heroData.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed border-l-4 border-secondary pl-4 py-1"
            >
              {heroData.title[lang]}
            </motion.p>

            {/* Key credentials metrics overlay */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 max-w-md pt-2"
            >
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant text-center">
                <span className="block text-2xl font-bold text-primary">7+</span>
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  {lang === 'en' ? 'Years Exp' : "Années d'Exp"}
                </span>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant text-center">
                <span className="block text-2xl font-bold text-primary">100%</span>
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  {lang === 'en' ? 'Bilingual' : 'Bilingue'}
                </span>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant text-center">
                <span className="block text-2xl font-bold text-primary">4+</span>
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  {lang === 'en' ? 'Institutions' : 'Institutions'}
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#experience"
                className="bg-primary text-white px-8 py-4 rounded-xl font-sans text-sm font-semibold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-md active:scale-98"
              >
                {heroData.ctaPrimary[lang]}
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-sans text-sm font-semibold hover:bg-secondary/5 transition-all active:scale-98"
              >
                {heroData.ctaSecondary[lang]}
              </a>
            </motion.div>
          </div>

          {/* Hero portrait with modern layout */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[420px]"
            >
              {/* Background solid offset cards */}
              <div className="absolute inset-0 bg-primary-container rounded-[2.5rem] rotate-3 -z-10 translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-secondary/15 rounded-[2.5rem] -rotate-3 -z-10 -translate-x-3 -translate-y-3"></div>
              
              <img
                src={heroData.profileImg}
                alt="Joy Anurika Ozurumba professional portrait"
                className="w-full h-auto rounded-[2.5rem] object-cover card-elevation border-4 border-white aspect-[4/5] shadow-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-surface-container-low" id="about">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Header section */}
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-1 bg-secondary rounded-full"></span>
                <span className="text-sm font-bold text-secondary uppercase tracking-widest">
                  {aboutData.subtitle[lang]}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
                {aboutData.title[lang]}
              </h2>
              <p className="text-on-surface-variant font-sans text-sm mt-4 leading-relaxed">
                {lang === 'en' 
                  ? "Over 7 years navigating administrative leadership, registry protocols, policy development, and high-level student governance in prominent bilingual contexts." 
                  : "Plus de 7 ans d'expérience dans le leadership administratif, les protocoles d'inscription, le développement des politiques et la gouvernance étudiante de haut niveau."}
              </p>
            </div>

            {/* Main bio and features */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Profile Quote */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-xs">
                <p className="font-sans text-base sm:text-lg text-on-surface leading-relaxed italic border-l-4 border-primary pl-6 py-1">
                  "{aboutData.quote[lang]}"
                </p>
              </div>

              {/* Grid features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aboutData.features.map((feature) => (
                  <div key={feature.id} className="space-y-3 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant hover:border-secondary/30 transition-all card-elevation">
                    <div className="flex items-center gap-3 text-primary">
                      <div className="bg-surface-container-high p-3 rounded-xl shadow-xs">
                        {feature.id === 'admin' ? <Briefcase className="w-6 h-6 text-primary" /> : <Laptop className="w-6 h-6 text-primary" />}
                      </div>
                      <h3 className="font-display text-lg font-bold text-primary">
                        {feature.title[lang]}
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {feature.desc[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills / Professional Expertise Section */}
      <section className="py-24 bg-background" id="skills">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header block with search capabilities */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-secondary rounded-full"></span>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  {lang === 'en' ? 'Core Competencies' : 'Compétences Clés'}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
                {lang === 'en' ? 'Professional Expertise' : 'Expertise Professionnelle'}
              </h2>
            </div>

            {/* Interactive skill search bar & filters */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder={lang === 'en' ? "Search expertise..." : "Rechercher une compétence..."}
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full sm:w-64 bg-surface-container-lowest pl-9 pr-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
                {skillSearch && (
                  <button 
                    onClick={() => setSkillSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-primary"
                  >
                    Clear
                  </button>
                )}
              </div>

              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-2 rounded-xl text-xs font-semibold hover:bg-secondary-fixed/80 transition-all flex items-center gap-2"
                >
                  {lang === 'en' ? 'Reset Filter' : 'Réinitialiser'}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Core skills cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-2xl border border-surface-variant text-center space-y-4 shadow-xs hover:border-secondary transition-all flex flex-col justify-between card-elevation"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-surface-container mx-auto rounded-full flex items-center justify-center shadow-xs">
                      {renderIcon(skill.icon, "w-7 h-7 text-primary")}
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary">
                      {skill.title[lang]}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {skill.desc[lang]}
                    </p>
                  </div>

                  {/* Skills tags pills */}
                  {skill.tags && (
                    <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-surface-container-high">
                      {skill.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-bold tracking-wider transition-all uppercase ${
                            selectedTag === tag
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-secondary-fixed text-on-secondary-fixed-variant hover:opacity-90'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {filteredSkills.length === 0 && (
                <div className="col-span-full py-12 text-center text-on-surface-variant">
                  <p>{lang === 'en' ? 'No matching competencies found.' : 'Aucune compétence trouvée.'}</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter alert banner */}
          {selectedTag && (
            <div className="mt-8 p-4 bg-surface-container-high rounded-xl border border-outline-variant flex items-center justify-between">
              <span className="text-sm text-primary font-medium">
                {lang === 'en' 
                  ? `Filtering resume by skill focus: "${selectedTag}"`
                  : `Filtrage de l'expérience par compétence : "${selectedTag}"`}
              </span>
              <button 
                onClick={() => setSelectedTag(null)}
                className="text-xs text-secondary font-bold underline"
              >
                {lang === 'en' ? 'Show all experience' : 'Afficher toutes les expériences'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section / Career Journey Timeline */}
      <section className="py-24 bg-surface-container-low" id="experience">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                {lang === 'en' ? 'Professional History' : 'Historique Professionnel'}
              </span>
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              {lang === 'en' ? 'Career Journey' : 'Parcours Professionnel'}
            </h2>
            <p className="text-on-surface-variant text-sm mt-3 max-w-xl mx-auto">
              {lang === 'en'
                ? 'Highlighting leadership roles in academic governance, registry administration, and bilingual communications.'
                : 'Mise en valeur de rôles de leadership dans la gouvernance universitaire, l\'administration et les communications bilingues.'}
            </p>
          </div>

          {/* Timeline flow */}
          <div className="relative timeline-line space-y-12 max-w-4xl mx-auto">
            
            {filteredExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-center md:justify-between"
                >
                  
                  {/* Left block: Date/Period on Desktop */}
                  <div className={`hidden md:block w-[45%] text-right pr-8 ${isEven ? 'text-right' : 'md:order-3 text-left pl-8 pr-0'}`}>
                    <span className="font-sans text-xs font-bold text-secondary bg-secondary-fixed px-4 py-1.5 rounded-full shadow-xs">
                      {exp.period[lang]}
                    </span>
                  </div>

                  {/* Centered timeline node */}
                  <div className="z-10 w-10 h-10 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg md:order-2">
                    {exp.icon === 'Briefcase' && <Briefcase className="w-4 h-4 text-white" />}
                    {exp.icon === 'GraduationCap' && <GraduationCap className="w-4 h-4 text-white" />}
                    {exp.icon === 'FileText' && <FileText className="w-4 h-4 text-white" />}
                    {exp.icon === 'Award' && <Award className="w-4 h-4 text-white" />}
                  </div>

                  {/* Right block: Card Content */}
                  <div className={`w-full md:w-[45%] bg-white p-6 sm:p-8 rounded-2xl card-elevation border border-surface-variant mt-4 md:mt-0 ${
                    isEven ? 'md:order-3 pl-8' : 'md:order-1 pr-8 text-left md:text-right'
                  }`}>
                    {/* Period badge for mobile */}
                    <div className="md:hidden mb-3">
                      <span className="font-sans text-xs font-bold text-secondary bg-secondary-fixed px-3 py-1 rounded-full">
                        {exp.period[lang]}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary leading-tight">
                      {exp.role[lang]}
                    </h3>
                    
                    <p className="text-secondary font-semibold text-sm mt-1 flex items-center gap-1.5 md:justify-start justify-start md:group-hover:text-primary transition-colors">
                      <BookOpen className="w-4 h-4 inline" />
                      {exp.org[lang]}
                    </p>

                    <p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed line-clamp-3">
                      {exp.desc[lang]}
                    </p>

                    {/* Skill Tags pills */}
                    <div className={`flex flex-wrap gap-1.5 mt-5 border-t border-surface-container-high pt-4 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      {exp.skills.map(skill => (
                        <span
                          key={skill}
                          onClick={() => setSelectedTag(selectedTag === skill ? null : skill)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase cursor-pointer transition-all ${
                            selectedTag === skill
                              ? 'bg-primary text-white'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                          }`}
                          title={`Click to filter by ${skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Detail button */}
                    <div className={`mt-4 pt-2 flex ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      <button
                        onClick={() => setSelectedExperience(exp)}
                        className="text-xs font-bold text-secondary flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {lang === 'en' ? 'View Details' : 'Voir les Détails'}
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Contact Section / Let's Connect */}
      <section className="py-24 bg-surface-container-high" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact details */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-1 bg-secondary rounded-full"></span>
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    {lang === 'en' ? 'Get In Touch' : 'Prendre Contact'}
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
                  {contactDetails.title[lang]}
                </h2>
                <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
                  {contactDetails.desc[lang]}
                </p>
              </div>

              {/* Contact info list */}
              <div className="space-y-6">
                
                {/* Email address */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant shadow-xs">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="font-sans text-base text-primary font-bold hover:text-secondary transition-colors"
                    >
                      {contactDetails.email}
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant shadow-xs">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      {lang === 'en' ? 'Phone' : 'Téléphone'}
                    </p>
                    <a
                      href={`tel:${contactDetails.phone}`}
                      className="font-sans text-base text-primary font-bold hover:text-secondary transition-colors"
                    >
                      {contactDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Social LinkedIn */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant shadow-xs">
                  <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary shadow-xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Social
                    </p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-base text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1.5"
                    >
                      <Linkedin className="w-4 h-4 text-secondary" />
                      {contactDetails.linkedin}
                    </a>
                  </div>
                </div>

              </div>

              {/* Note on administrative responding */}
              <div className="bg-primary/5 p-5 rounded-2xl border border-secondary/20 flex gap-3">
                <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {lang === 'en' 
                    ? "Joy handles all incoming inquiries using systematic registry practices. When you submit a message, it goes straight to her active queue. Check the top Inbox Simulator at any time to see your message in her real-time administrative workflow!"
                    : "Joy gère toutes les demandes reçues selon des pratiques d'enregistrement rigoureuses. Votre message est envoyé directement à sa file d'attente active. Consultez le simulateur de messagerie en haut pour suivre votre demande !"}
                </p>
              </div>
            </div>

            {/* Contact Form card */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-surface-variant relative overflow-hidden">
                
                {/* Visual anchor background highlights */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -z-10"></div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {formError && (
                    <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-sans text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-wider">
                        {lang === 'en' ? 'Name' : 'Nom'}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-background p-3.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                        placeholder={lang === 'en' ? 'Your Name' : 'Votre Nom'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-sans text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-background p-3.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                        placeholder={lang === 'en' ? 'Your Email' : 'Votre Adresse Email'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-background p-3.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none resize-none"
                      placeholder={lang === 'en' ? 'How can I help you?' : 'Comment puis-je vous aider ?'}
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary/95 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <span>{isSubmitting ? (lang === 'en' ? 'Processing...' : 'Traitement...') : (lang === 'en' ? 'Send Message' : 'Envoyer le Message')}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {showSubmitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl mt-4 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="font-bold">
                            {lang === 'en' ? 'Message Logged Successfully!' : 'Message Enregistré avec Succès !'}
                          </span>
                        </div>
                        <p className="text-xs">
                          {lang === 'en' 
                            ? "Your submission has been catalogued in Joy's Administrative System. Look for the Inbox Simulator button in the top navigation to track her active response!" 
                            : "Votre message a été répertorié dans le registre de Joy. Utilisez le bouton Simulateur de Messagerie en haut pour suivre le statut de votre demande !"}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSubmitSuccess(false);
                            setShowInboxAdmin(true);
                          }}
                          className="text-xs font-bold text-emerald-900 underline block pt-1"
                        >
                          {lang === 'en' ? 'Open Inbox Simulator now →' : "Ouvrir l'assistant de messagerie →"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left space-y-2">
            <span className="font-display text-lg font-bold text-primary block">
              Joy Anurika Ozurumba
            </span>
            <p className="font-sans text-xs text-on-surface-variant">
              © {new Date().getFullYear()} Joy Anurika Ozurumba. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
            </p>
            <p className="font-sans text-[10px] text-on-surface-variant italic">
              {lang === 'en' 
                ? 'Certified French & International Studies Administrator' 
                : 'Administratrice certifiée en études françaises et internationales'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-on-surface-variant hover:text-primary font-semibold transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${contactDetails.email}`}
              className="font-sans text-xs text-on-surface-variant hover:text-primary font-semibold transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <button
              onClick={() => setShowCVModal(true)}
              className="font-sans text-xs text-on-surface-variant hover:text-primary font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              {lang === 'en' ? 'Resume Overview' : 'Aperçu du CV'}
            </button>
          </div>

        </div>
      </footer>

      {/* MODAL 1: Simulated Inbox / Administrative Console Assistant */}
      <AnimatePresence>
        {showInboxAdmin && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-surface-variant"
            >
              {/* Header */}
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <Inbox className="w-6 h-6 text-primary-fixed" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {lang === 'en' ? 'Registry Inbox Simulator' : "Simulateur de Registre d'Entrée"}
                    </h3>
                    <p className="text-xs text-on-primary-container font-mono uppercase tracking-wider">
                      {lang === 'en' ? 'Admin Leader Panel' : 'Panneau Administratif'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInboxAdmin(false)}
                  className="bg-white/10 hover:bg-white/25 text-white p-2 rounded-xl transition-all"
                  id="close-inbox-simulator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Explanatory introduction */}
              <div className="p-6 bg-surface-container-low border-b border-outline-variant">
                <h4 className="text-sm font-bold text-primary flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  {lang === 'en' ? 'Joy\'s Message Management System' : 'Système de gestion des messages'}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {lang === 'en' 
                    ? "As an Administrative Leader, Joy implements active classification protocols for all incoming inquiries. Submit a message via the website contact form, and watch it populate here in real-time. You can trigger simulated administrative quick-replies below to preview her executive coordination workflows."
                    : "En tant que leader administrative, Joy applique des protocoles de classement rigoureux. Envoyez un message via le formulaire et voyez-le s'afficher ici. Vous pouvez simuler des réponses rapides pour tester son flux de travail exécutif."}
                </p>
              </div>

              {/* Messages list container */}
              <div className="p-6 max-h-[400px] overflow-y-auto space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant space-y-3 relative shadow-xs"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      {msg.status === 'unread' && (
                        <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {lang === 'en' ? 'Unread Queue' : 'Non lu'}
                        </span>
                      )}
                      {msg.status === 'read' && (
                        <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {lang === 'en' ? 'In Review' : 'En examen'}
                        </span>
                      )}
                      {msg.status === 'replied' && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {lang === 'en' ? 'Dispatched' : 'Répondu'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-primary">{msg.name}</h4>
                      <p className="text-xs text-on-surface-variant font-mono">{msg.email}</p>
                      <p className="text-[10px] text-on-surface-variant">{msg.timestamp}</p>
                    </div>

                    <p className="text-xs text-on-surface leading-relaxed font-sans bg-background p-3.5 rounded-xl border border-outline-variant">
                      {msg.message}
                    </p>

                    {/* Replies */}
                    {msg.reply ? (
                      <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {lang === 'en' ? "Joy's Dispatched Response" : 'Réponse Envoyée par Joy'}
                        </p>
                        <p className="text-xs text-emerald-950 font-sans italic">
                          "{msg.reply}"
                        </p>
                      </div>
                    ) : (
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleSimulateReply(
                            msg.id, 
                            lang === 'en' 
                              ? "Thank you for reaching out. I have catalogued your proposal in my registry and will schedule a meeting."
                              : "Merci pour votre message. J'ai répertorié votre proposition et je vais planifier un entretien."
                          )}
                          className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-all cursor-pointer"
                        >
                          {lang === 'en' ? '🚀 Send Quick Thank-You' : '🚀 Envoyer Remerciement'}
                        </button>
                        <button
                          onClick={() => handleSimulateReply(
                            msg.id,
                            lang === 'en'
                              ? "Dear sender, I have received your request. I am happy to coordinate. Let us establish a formal video conference next week."
                              : "Cher expéditeur, j'ai bien reçu votre demande. Je suis ravie de collaborer. Planifions une visioconférence la semaine prochaine."
                          )}
                          className="bg-secondary/5 text-secondary text-[10px] font-bold px-3 py-1.5 rounded-lg border border-secondary/25 hover:bg-secondary/10 transition-all cursor-pointer"
                        >
                          {lang === 'en' ? '📅 Schedule Videoconference' : '📅 Planifier Réunion'}
                        </button>
                      </div>
                    )}

                  </div>
                ))}

                {messages.length === 0 && (
                  <p className="text-center text-sm text-on-surface-variant py-8">
                    {lang === 'en' ? 'No incoming registry items yet.' : 'Aucun message enregistré.'}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-surface-container border-t border-outline-variant flex justify-end gap-3">
                <button
                  onClick={() => {
                    const sampleMsg: Message = {
                      id: `msg-sample-${Date.now()}`,
                      name: 'Cabinet de Recrutement Paris',
                      email: 'contact@paris-talents.fr',
                      message: 'Bonjour Joy, nous recherchons une responsable de direction pour encadrer nos affaires francophones à Lagos. Votre double compétence académique et administrative est idéale.',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      status: 'unread'
                    };
                    setMessages(prev => [sampleMsg, ...prev]);
                  }}
                  className="bg-secondary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-secondary/95 transition-all cursor-pointer shadow-xs"
                >
                  {lang === 'en' ? '+ Add French Inquiry' : '+ Ajouter une demande en Français'}
                </button>
                <button
                  onClick={() => setShowInboxAdmin(false)}
                  className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/95 transition-all cursor-pointer shadow-xs"
                >
                  {lang === 'en' ? 'Close Panel' : 'Fermer le Panneau'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Printable/Shareable CV Presentation */}
      <AnimatePresence>
        {showCVModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-surface-variant my-8"
            >
              {/* Actions Header Bar */}
              <div className="bg-primary p-4 text-white flex justify-between items-center print:hidden">
                <span className="font-display text-sm font-bold flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-primary-fixed" />
                  {lang === 'en' ? 'Print-Ready Resume' : 'Aperçu du CV Optimisé Impresson'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerPrint}
                    className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {lang === 'en' ? 'Print Resume' : 'Imprimer'}
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CV Document Container */}
              <div className="p-8 sm:p-12 space-y-8 bg-white text-black" id="printable-cv-content">
                
                {/* Header block */}
                <div className="border-b-2 border-primary pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-primary">{heroData.name}</h1>
                    <p className="text-sm text-secondary font-semibold uppercase tracking-wider mt-1">
                      {aboutData.subtitle[lang]}
                    </p>
                    <p className="text-xs text-on-surface-variant max-w-lg mt-2">
                      {heroData.title[lang]}
                    </p>
                  </div>
                  <div className="text-left sm:text-right font-sans text-xs space-y-1 text-on-surface-variant">
                    <p className="flex items-center sm:justify-end gap-1"><Mail className="w-3.5 h-3.5" /> {contactDetails.email}</p>
                    <p className="flex items-center sm:justify-end gap-1"><Phone className="w-3.5 h-3.5" /> {contactDetails.phone}</p>
                    <p className="flex items-center sm:justify-end gap-1"><Globe className="w-3.5 h-3.5" /> Lagos, Nigeria</p>
                  </div>
                </div>

                {/* About Quote block */}
                <div className="space-y-2">
                  <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider">
                    {lang === 'en' ? 'Professional Statement' : 'Résumé Professionnel'}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">
                    "{aboutData.quote[lang]}"
                  </p>
                </div>

                {/* Grid layout for skills & details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Skills / Badges */}
                  <div className="md:col-span-4 space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider border-b border-outline-variant pb-1">
                        {lang === 'en' ? 'Expertise Areas' : 'Champs d\'Expertise'}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {skillsData.map(s => (
                          <div key={s.id} className="text-xs">
                            <span className="font-bold text-primary block">{s.title[lang]}</span>
                            <span className="text-[11px] text-on-surface-variant">{s.desc[lang]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider border-b border-outline-variant pb-1">
                        {lang === 'en' ? 'Credentials / Tools' : 'Outils & Langues'}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">FRENCH NATIVE</span>
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">ENGLISH PROFESSIONAL</span>
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">GOOGLE WORKSPACE</span>
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">OFFICE 365</span>
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">REGISTRY PROTOCOLS</span>
                        <span className="bg-surface-container text-primary font-bold text-[9px] px-2.5 py-1 rounded">CALENDAR MGMT</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Experience timeline */}
                  <div className="md:col-span-8 space-y-6">
                    <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider border-b border-outline-variant pb-1">
                      {lang === 'en' ? 'Professional History' : 'Historique de Carrière'}
                    </h3>
                    <div className="space-y-6">
                      {experienceData.map(exp => (
                        <div key={exp.id} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold text-primary">
                            <span>{exp.role[lang]}</span>
                            <span className="text-secondary font-sans">{exp.period[lang]}</span>
                          </div>
                          <p className="text-secondary font-semibold font-sans">{exp.org[lang]}</p>
                          <p className="text-on-surface-variant leading-relaxed text-[11px] pt-1">
                            {exp.desc[lang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer disclaimer */}
                <div className="border-t border-outline-variant pt-4 text-center">
                  <p className="text-[10px] text-on-surface-variant font-mono">
                    {lang === 'en' 
                      ? "Joy Anurika Ozurumba • References available upon request • Lagos, Nigeria" 
                      : "Joy Anurika Ozurumba • Références disponibles sur demande • Lagos, Nigéria"}
                  </p>
                </div>

              </div>

              {/* Close panel trigger */}
              <div className="bg-surface-container p-4 flex justify-end gap-2 print:hidden">
                <button
                  onClick={() => setShowCVModal(false)}
                  className="bg-primary text-white text-xs font-bold px-5 py-2 rounded-xl hover:opacity-95 cursor-pointer"
                >
                  {lang === 'en' ? 'Close Resume' : 'Fermer le CV'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Detailed Experience Description View */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-surface-variant"
            >
              {/* Header */}
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <Briefcase className="w-5 h-5 text-primary-fixed" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold">
                      {lang === 'en' ? 'Role Specifications' : 'Spécifications du Poste'}
                    </h3>
                    <p className="text-xs text-on-primary-container font-mono uppercase tracking-wider">
                      {selectedExperience.org[lang]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-6">
                <div>
                  <span className="font-sans text-xs font-bold text-secondary bg-secondary-fixed px-3 py-1 rounded-full">
                    {selectedExperience.period[lang]}
                  </span>
                  <h4 className="font-display text-xl font-bold text-primary mt-3">
                    {selectedExperience.role[lang]}
                  </h4>
                  <p className="text-secondary font-semibold text-sm mt-1">
                    {selectedExperience.org[lang]}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-display text-xs font-bold text-primary uppercase tracking-wider">
                    {lang === 'en' ? 'Executive Description' : 'Description Exécutive'}
                  </h5>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {selectedExperience.desc[lang]}
                  </p>
                </div>

                {/* Specific responsibilities simulated for high quality */}
                <div className="space-y-3">
                  <h5 className="font-display text-xs font-bold text-primary uppercase tracking-wider">
                    {lang === 'en' ? 'Core Deliverables' : 'Livrables Clés'}
                  </h5>
                  <ul className="space-y-2">
                    {selectedExperience.skills.map((skill, i) => (
                      <li key={skill} className="flex items-start gap-2.5 text-xs text-on-surface-variant">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full p-0.5 mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-700" />
                        </span>
                        <span>
                          <strong>{skill}</strong>: {
                            lang === 'en'
                              ? `Established systematic approach to improve quality and speed of ${skill.toLowerCase()} in a fast-paced environment.`
                              : `Mise en place d'une approche systématique pour améliorer la qualité et l'exécution du ${skill.toLowerCase()}.`
                          }
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-surface-container border-t border-outline-variant flex justify-end gap-3">
                <button
                  onClick={() => {
                    const skillToFilter = selectedExperience.skills[0];
                    if (skillToFilter) setSelectedTag(skillToFilter);
                    setSelectedExperience(null);
                  }}
                  className="bg-secondary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-secondary/95 transition-all cursor-pointer shadow-xs"
                >
                  {lang === 'en' ? 'Filter by these skills' : 'Filtrer par ces compétences'}
                </button>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/95 transition-all cursor-pointer shadow-xs"
                >
                  {lang === 'en' ? 'Close Specifications' : 'Fermer les Spécifications'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
