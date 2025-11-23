import React, { useState } from 'react';
import { 
  Menu, X, Mail, Phone, MapPin, Linkedin, 
  ChevronRight, Database, Ruler, FileText, Layout, Award, Briefcase, GraduationCap, User, Upload
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import BlueprintBackground from './components/BlueprintBackground';
import AiAssistant from './components/AiAssistant';
import { PORTFOLIO_DATA } from './constants';
import { SkillCategory } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [imageError, setImageError] = useState(false);

  const radarData = PORTFOLIO_DATA.skills.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100
  }));

  const categories = ['All', ...Object.values(SkillCategory)];
  
  const filteredSkills = activeCategory === 'All' 
    ? PORTFOLIO_DATA.skills 
    : PORTFOLIO_DATA.skills.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen relative text-slate-300 bg-[#050A18] overflow-x-hidden">
      <BlueprintBackground />
      <AiAssistant />

      {/* Main Content Wrapper with z-index to ensure visibility above background */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#050A18]/90 backdrop-blur-md border-b border-blue-900/30 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/40 border border-blue-800">
                  {PORTFOLIO_DATA.name.charAt(0)}
                </div>
                <span className="font-bold text-xl text-white tracking-tight">{PORTFOLIO_DATA.name}</span>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {['About', 'Skills', 'Services', 'Experience', 'Education', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="text-slate-400 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-950/30 rounded-md"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-white p-2">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#0A1628] border-b border-blue-900/30 absolute w-full shadow-2xl">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['About', 'Skills', 'Services', 'Experience', 'Education', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block px-3 py-4 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-blue-900/20 border-b border-blue-900/20 last:border-0"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="about" className="pt-32 pb-12 md:pt-44 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="lg:flex items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8 order-2 lg:order-1">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 font-medium text-sm mb-6 tracking-wider shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {PORTFOLIO_DATA.contact.location}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  {PORTFOLIO_DATA.title.split('/').map((part, i) => (
                    <span key={i} className="block">{part.trim()}</span>
                  ))}
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl border-l-4 border-blue-700 pl-4 bg-gradient-to-r from-blue-950/20 to-transparent py-2">
                  {PORTFOLIO_DATA.tagline}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-blue-700 hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80 hover:-translate-y-1">
                  Contact Me
                </a>
                <a href="#experience" className="inline-flex items-center justify-center px-8 py-4 border border-blue-800/50 text-base font-medium rounded-lg text-blue-100 bg-[#0A1628] hover:bg-[#112240] transition-all hover:text-white hover:border-blue-600/50">
                  View Work
                </a>
              </div>
            </div>

            {/* Image & Stats */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative order-1 lg:order-2">
              <div className="relative aspect-[3/4] max-w-md mx-auto md:max-w-lg">
                {/* Photo Container */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)] bg-[#0A1628] group">
                  {/* Profile Photo Handling */}
                  {!imageError ? (
                    <img 
                        src="./profile.jpg" 
                        onError={() => setImageError(true)}
                        alt="Muhamed Fiham" 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#080E20] text-center p-6 border-4 border-[#0A1628] dashed border-slate-700">
                        <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                          <Upload size={32} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Add Your Photo</h3>
                        <p className="text-slate-400 text-sm max-w-xs mx-auto mb-4 leading-relaxed">
                          Save your photo as <span className="text-blue-300 font-mono">profile.jpg</span><br/>
                          and drop it in the project folder.
                        </p>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  {!imageError && (
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050A18] to-transparent opacity-60"></div>
                  )}
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-[#0A1628]/90 p-5 rounded-xl shadow-2xl border border-blue-600/30 hidden sm:block backdrop-blur-xl z-20">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400 border border-blue-800/30">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Experience</p>
                      <p className="font-bold text-2xl text-white">6+ Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Summary Box */}
          <div className="mt-20 bg-[#0A1628]/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-900/30 shadow-2xl max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Professional Summary
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg relative z-10 whitespace-pre-line">
              {PORTFOLIO_DATA.about}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-[#080E20] relative overflow-hidden border-t border-blue-900/20">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-blue-900/5 blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Proficiency</h2>
              <div className="w-20 h-1 bg-blue-700 mx-auto rounded-full mb-6"></div>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Combining engineering precision with data-driven analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 bg-[#0A1628] rounded-2xl border border-blue-900/30 p-6 shadow-xl flex flex-col items-center justify-center">
                <h3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase text-slate-400">Skill Distribution</h3>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#1e3a8a" strokeOpacity={0.3} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar
                          name="Skill Level"
                          dataKey="A"
                          stroke="#2563eb"
                          strokeWidth={2}
                          fill="#1d4ed8"
                          fillOpacity={0.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                        activeCategory === cat
                          ? 'bg-blue-700 border-blue-600 text-white shadow-lg shadow-blue-900/50'
                          : 'bg-[#0A1628] border-blue-900/20 text-slate-400 hover:bg-[#112240] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredSkills.map((skill, index) => (
                    <div key={index} className="bg-[#0A1628] p-5 rounded-xl border border-blue-900/20 hover:border-blue-600/50 transition-all group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded border border-blue-800/30">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[#050A18] rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-500 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.6)]" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-blue-700 pl-4">Software Ecosystem</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {PORTFOLIO_DATA.tools.map((tool, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-6 bg-[#0A1628] border border-blue-900/20 rounded-xl hover:bg-[#112240] hover:border-blue-700/30 transition-all group hover:-translate-y-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mb-3 group-hover:scale-150 transition-transform"></div>
                    <span className="text-slate-400 font-medium text-sm text-center group-hover:text-white transition-colors">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-[#050A18] border-t border-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Value Proposition</h2>
              <div className="w-20 h-1 bg-blue-700 mx-auto rounded-full mb-6"></div>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Specialized services tailored for the modern construction industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PORTFOLIO_DATA.services.map((service, idx) => {
                const Icon = service.icon === 'Calculator' ? Ruler : 
                            service.icon === 'LayoutTemplate' ? Layout :
                            service.icon === 'BarChart3' ? Database : FileText;
                
                return (
                  <div key={idx} className="bg-[#0A1628] p-8 rounded-2xl border border-blue-900/20 hover:border-blue-600/50 hover:bg-[#0c1b31] transition-all group shadow-lg">
                    <div className="w-14 h-14 bg-[#050A18] border border-blue-900/30 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6 border-b border-blue-900/20 pb-6 group-hover:border-blue-900/40">{service.description}</p>
                    <div className="flex items-center text-sm font-semibold text-blue-500 tracking-wide uppercase group-hover:text-blue-400">
                      Expert Level <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-[#080E20] border-t border-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
              <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional History</h2>
                  <div className="w-20 h-1 bg-blue-700 rounded-full"></div>
              </div>
              <div className="mt-4 md:mt-0 text-slate-500 font-medium">
                6+ Years across GCC & Sri Lanka
              </div>
            </div>

            <div className="space-y-12">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-blue-900/30 transform -translate-x-1/2"></div>
                  
                  <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-[-5px] md:left-[50%] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-[#080E20] shadow-[0_0_0_4px_rgba(30,58,138,0.3)] transform md:-translate-x-1/2 mt-6 z-10"></div>

                    <div className="flex-1 w-full">
                      <div className="bg-[#0A1628] p-8 rounded-2xl border border-blue-900/20 hover:border-blue-700/40 transition-all shadow-lg hover:shadow-2xl group">
                        <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                          <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{exp.role}</h3>
                              <p className="text-blue-500 font-medium">{exp.client}</p>
                          </div>
                          <span className="text-xs font-bold text-slate-400 bg-[#050A18] px-3 py-1.5 rounded-full border border-blue-900/30 whitespace-nowrap">
                              {exp.period}
                          </span>
                        </div>
                        
                        <h4 className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-4 border-b border-blue-900/20 pb-2">{exp.title}</h4>
                        
                        <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="text-xs font-semibold text-slate-300 bg-[#112240] px-3 py-1 rounded-full border border-blue-900/30 hover:border-blue-500/50 hover:text-white transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-[#050A18] border-t border-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education & Certifications</h2>
              <div className="w-20 h-1 bg-blue-700 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTFOLIO_DATA.education?.map((edu, idx) => (
                <div key={idx} className="bg-[#0A1628] p-6 rounded-xl border border-blue-900/20 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg group">
                  <div className="w-16 h-16 bg-[#050A18] rounded-full flex items-center justify-center text-blue-500 mb-4 border border-blue-900/30 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                    {idx === 2 ? <Award size={32} /> : <GraduationCap size={32} />}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{edu.degree}</h3>
                  <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-[#02040a] border-t border-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Discuss Your Project</h2>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                  I am currently in the <span className="text-white font-semibold">UAE</span> and available for immediate joining. 
                  Ready to contribute my expertise in Quantity Surveying and Contract Administration to your team.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-[#0A1628] rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg border border-blue-900/30">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wide mb-1">Email</p>
                      <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">{PORTFOLIO_DATA.contact.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-[#0A1628] rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg border border-blue-900/30">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wide mb-1">Phone / WhatsApp</p>
                      <div className="flex flex-col">
                        {PORTFOLIO_DATA.contact.phone.split('|').map((num, idx) => {
                          const cleanNum = num.replace(/\D/g, '');
                          return (
                            <a 
                              key={idx}
                              href={`https://wa.me/${cleanNum}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
                            >
                              {num.trim()}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-[#0A1628] rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg border border-blue-900/30">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wide mb-1">Location</p>
                      <p className="text-xl font-semibold text-white">{PORTFOLIO_DATA.contact.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-[#0A1628] rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg border border-blue-900/30">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wide mb-1">LinkedIn</p>
                      <a href={`https://${PORTFOLIO_DATA.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1628] rounded-2xl p-8 md:p-10 border border-blue-900/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input type="text" className="w-full p-4 bg-[#050A18] border border-blue-900/20 rounded-lg focus:outline-none focus:border-blue-600 text-white transition-colors" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email</label>
                      <input type="email" className="w-full p-4 bg-[#050A18] border border-blue-900/20 rounded-lg focus:outline-none focus:border-blue-600 text-white transition-colors" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Subject</label>
                    <input type="text" className="w-full p-4 bg-[#050A18] border border-blue-900/20 rounded-lg focus:outline-none focus:border-blue-600 text-white transition-colors" placeholder="Project Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Message</label>
                    <textarea rows={4} className="w-full p-4 bg-[#050A18] border border-blue-900/20 rounded-lg focus:outline-none focus:border-blue-600 text-white transition-colors" placeholder="How can I help you?"></textarea>
                  </div>
                  <button className="w-full py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80 transform hover:-translate-y-1">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#02040a] text-slate-500 py-10 text-center text-sm border-t border-blue-900/20">
          <p className="mb-2">&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</p>
          <p className="opacity-50">Built with React, Tailwind & Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;