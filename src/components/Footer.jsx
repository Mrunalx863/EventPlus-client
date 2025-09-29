import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-6 bg-white/80 backdrop-blur-xl border-t border-pink-200/50 shadow-[0_-4px_16px_rgba(199,78,111,0.05)]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-medium text-slate-600">
          Copyright &copy; {currentYear} Mrunal Mehar. Built with <span className="text-red-500">❤️</span> by{' '}
          <a
            href="https://github.com/Mrunalx863" // Assuming this is your GitHub/portfolio link
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 font-bold hover:text-rose-600 transition-colors no-underline"
          >
            MrunalMehar
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;