import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, RotateCcw, MapPin, Phone, Globe, GithubIcon, Twitter, Instagram, Linkedin } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send the data to a server here
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  // Define social media links here
  const socialLinks = [
    { Icon: GithubIcon, name: 'Github', url: 'https://github.com/Mrunalx863' },
    { Icon: Twitter, name: 'Twitter', url: 'https://x.com/mrunalmehar863' },
    { Icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/im_yum.yumm' },
    { Icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/mrunalx863' }
  ];

  return (
    <>
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-5">
            Contact <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border-2 border-pink-200/50 bg-white/70 backdrop-blur-xl shadow-[0_12px_48px_rgba(199,78,111,0.12)]">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">
                    <User className="w-5 h-5" /> Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border-2 border-pink-300/60 bg-white text-base font-medium focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all shadow-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">
                    <Mail className="w-5 h-5" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border-2 border-pink-300/60 bg-white text-base font-medium focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all shadow-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">
                    <MessageSquare className="w-5 h-5" /> Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border-2 border-pink-300/60 bg-white text-base font-medium focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all shadow-sm resize-none"
                    placeholder="Type your message here..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="submit"
                    className="group flex-1 min-w-[200px] inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_8px_32px_rgba(199,78,111,0.3)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.4)] transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  {/* <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-pink-600 font-bold text-lg border-2 border-pink-300 hover:bg-pink-50 transition-all hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button> */}
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="p-8 rounded-3xl border-2 border-pink-200/50 bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(199,78,111,0.12)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.18)] transition-all hover:scale-105">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Visit Us</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    123 Tech Street, Innovation Hub<br />
                    Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 border-pink-200/50 bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(199,78,111,0.12)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.18)] transition-all hover:scale-105">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Email Us</h3>
                  <a href="mailto:support@eventplus.com" className="text-pink-600 font-bold hover:text-pink-700 transition-colors no-underline">
                    support@eventplus.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 border-pink-200/50 bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(199,78,111,0.12)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.18)] transition-all hover:scale-105">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Call Us</h3>
                  <a href="tel:+911234567890" className="text-pink-600 font-bold hover:text-pink-700 transition-colors no-underline">
                    +91 123 456 7890
                  </a>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Mon-Fri, 9AM-6PM IST</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 border-pink-200/50 bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(199,78,111,0.12)]">
              <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
                <Globe className="w-6 h-6" /> Follow Us
              </h3>
              <div className="flex gap-3">
                {/* Dynamically render social icons with links */}
                {socialLinks.map((social, index) => (
                  <a // Changed button to <a> tag for navigation
                    key={index}
                    href={social.url} // Added URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border-2 border-pink-300/60 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 hover:border-pink-500 hover:text-white text-pink-600 transition-all hover:scale-110 shadow-sm flex items-center justify-center group cursor-pointer"
                    title={social.name}
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;