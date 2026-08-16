import React from "react";

export function Contact() {
  return (
    <section className="py-24 px-6 lg:px-24 relative" id="contact">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-card rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 md:p-24 overflow-hidden relative border border-outline/20 dark:border-white/10">
          
          <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] -top-64 -right-64"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -bottom-64 -left-64"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Ready to build the <span className="text-primary">future?</span>
              </h2>
              <p className="text-outline text-lg mb-12">
                Whether you have a fully-formed idea or just a spark of inspiration, let's collaborate and build something extraordinary together.
              </p>
              
              <div className="space-y-6 mb-12">
                <a href="mailto:ajoshvabi17@gmail.com" className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-outline">EMAIL ME</div>
                    <div className="text-lg font-medium text-on-surface">ajoshvabi17@gmail.com</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-outline">BOOK A CALL</div>
                    <div className="text-lg font-medium text-on-surface">Available for new projects</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 sm:p-8 md:p-12 rounded-3xl bg-surface/50 border border-outline/10 dark:border-white/5 flex flex-col justify-center items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 animate-pulse">
                <span className="material-symbols-outlined text-4xl">mail</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Let's start a project together</h3>
              <p className="text-outline text-sm max-w-sm">
                Have an inquiry or want to collaborate? Get in touch directly via email and I will get back to you as soon as possible.
              </p>
              <a
                href="mailto:ajoshvabi17@gmail.com?subject=Project%20Inquiry"
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold uppercase text-xs glow-button flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform duration-300"
              >
                Send Email <span className="material-symbols-outlined text-[16px]">send</span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
