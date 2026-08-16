"use client";

export default function Scene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">

      {/* CSS 3D Rotating Cube - behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[800px]">
        <div className="w-[180px] h-[180px] relative animate-spin-slow" style={{ transformStyle: "preserve-3d" }}>
          {/* Front */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "translateZ(90px)" }}></div>
          {/* Back */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "translateZ(-90px)" }}></div>
          {/* Left */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "rotateY(90deg) translateZ(90px)" }}></div>
          {/* Right */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "rotateY(-90deg) translateZ(90px)" }}></div>
          {/* Top */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "rotateX(90deg) translateZ(90px)" }}></div>
          {/* Bottom */}
          <div className="absolute inset-0 border-2 border-primary/20 dark:border-[#8cfaff]/15 rounded-xl" style={{ transform: "rotateX(-90deg) translateZ(90px)" }}></div>
        </div>
      </div>

      {/* Small orbiting 3D diamond */}
      <div className="absolute top-[15%] right-[10%] perspective-[400px] animate-float-delay-2">
        <div className="w-6 h-6 animate-spin-medium" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 bg-primary/30 dark:bg-[#8cfaff]/20 rounded-sm" style={{ transform: "rotateX(45deg) rotateZ(45deg)" }}></div>
          <div className="absolute inset-0 bg-primary/20 dark:bg-[#8cfaff]/15 rounded-sm" style={{ transform: "rotateY(45deg) rotateZ(45deg)" }}></div>
        </div>
      </div>

      {/* Small orbiting 3D diamond 2 */}
      <div className="absolute bottom-[20%] left-[5%] perspective-[400px] animate-float-delay-3">
        <div className="w-4 h-4 animate-spin-slow" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 bg-[#61dafb]/30 rounded-sm" style={{ transform: "rotateX(45deg) rotateZ(45deg)" }}></div>
          <div className="absolute inset-0 bg-[#61dafb]/20 rounded-sm" style={{ transform: "rotateY(45deg) rotateZ(45deg)" }}></div>
        </div>
      </div>

      {/* Floating Code Editor Card */}
      <div className="relative z-10 animate-float">
        {/* Main editor window */}
        <div className="w-[320px] md:w-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 dark:shadow-primary/10 border border-outline/10 dark:border-white/10 backdrop-blur-xl bg-white/80 dark:bg-[#0d1117]/90">
          
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface/50 dark:bg-[#161b22] border-b border-outline/10 dark:border-white/5">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
              <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
            </div>
            <span className="text-[10px] font-mono text-outline dark:text-slate-500 ml-2">portfolio.tsx</span>
          </div>

          {/* Code content */}
          <div className="px-4 py-4 font-mono text-[11px] md:text-xs leading-relaxed space-y-1">
            <div><span className="text-[#c678dd]">import</span> <span className="text-[#e5c07b]">{'{ Flutter, React }'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&quot;skills&quot;</span><span className="text-outline dark:text-slate-500">;</span></div>
            <div><span className="text-[#c678dd]">import</span> <span className="text-[#e5c07b]">{'{ Node, MongoDB }'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&quot;backend&quot;</span><span className="text-outline dark:text-slate-500">;</span></div>
            <div className="h-3"></div>
            <div><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">developer</span> <span className="text-outline dark:text-slate-500">=</span> <span className="text-outline dark:text-slate-500">{'{'}</span></div>
            <div className="pl-4"><span className="text-primary dark:text-[#8cfaff]">name</span><span className="text-outline dark:text-slate-500">:</span> <span className="text-[#98c379]">&quot;Ajosh V Abi&quot;</span><span className="text-outline dark:text-slate-500">,</span></div>
            <div className="pl-4"><span className="text-primary dark:text-[#8cfaff]">role</span><span className="text-outline dark:text-slate-500">:</span> <span className="text-[#98c379]">&quot;Full-Stack Dev&quot;</span><span className="text-outline dark:text-slate-500">,</span></div>
            <div className="pl-4"><span className="text-primary dark:text-[#8cfaff]">stack</span><span className="text-outline dark:text-slate-500">:</span> <span className="text-outline dark:text-slate-500">[</span><span className="text-[#98c379]">&quot;Flutter&quot;</span><span className="text-outline dark:text-slate-500">,</span> <span className="text-[#98c379]">&quot;React&quot;</span><span className="text-outline dark:text-slate-500">,</span> <span className="text-[#98c379]">&quot;Node&quot;</span><span className="text-outline dark:text-slate-500">],</span></div>
            <div className="pl-4"><span className="text-primary dark:text-[#8cfaff]">passion</span><span className="text-outline dark:text-slate-500">:</span> <span className="text-[#d19a66]">Infinity</span><span className="text-outline dark:text-slate-500">,</span></div>
            <div><span className="text-outline dark:text-slate-500">{'}'}</span><span className="text-outline dark:text-slate-500">;</span></div>
            <div className="h-3"></div>
            <div><span className="text-[#c678dd]">export default</span> <span className="text-[#61afef]">developer</span><span className="text-outline dark:text-slate-500">;</span> <span className="inline-block w-[2px] h-3.5 bg-primary dark:bg-[#8cfaff] animate-blink align-middle"></span></div>
          </div>
        </div>

        {/* Floating tech badges with icons */}
        {/* Flutter bird */}
        <div className="absolute -top-6 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#42a5f5]/15 border border-[#42a5f5]/30 text-[#42a5f5] text-[10px] font-bold font-mono animate-float-delay-1 shadow-lg">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M14.314 0L2.3 12 6 15.7 21.684.012h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
          </svg>
          Flutter
        </div>

        {/* Firebase */}
        <div className="absolute -top-3 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFCA28]/15 border border-[#FFCA28]/30 text-[#FFCA28] text-[10px] font-bold font-mono animate-float-delay-3 shadow-lg">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-13.999a.543.543 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/>
          </svg>
          Firebase
        </div>

        {/* React */}
        <div className="absolute -bottom-3 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#61dafb]/15 border border-[#61dafb]/30 text-[#61dafb] text-[10px] font-bold font-mono animate-float-delay-2 shadow-lg">
          <svg viewBox="-11.5 -10.232 23 20.463" className="w-4 h-4">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
          React
        </div>

        {/* Node.js */}
        <div className="absolute top-1/2 -right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#68a063]/15 border border-[#68a063]/30 text-[#68a063] text-[10px] font-bold font-mono animate-float-delay-3 shadow-lg">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.653-.228.785-.28 1.482-.677.073-.04.168-.025.243.015l2.254 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.253 6.68c-.085.05-.139.143-.139.242v10.075c0 .096.054.189.136.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v9.948c0 1.742-.949 2.743-2.604 2.743-.508 0-.909 0-2.026-.55l-2.307-1.33A1.85 1.85 0 0 1 1.5 17.0V6.921c0-.672.358-1.296.956-1.633L11.25.214a1.924 1.924 0 0 1 1.846 0l8.794 5.074c.598.337.956.961.956 1.633V17c0 .672-.358 1.296-.956 1.633l-8.794 5.076a1.83 1.83 0 0 1-.923.247z"/>
          </svg>
          Node
        </div>

        {/* JS */}
        <div className="absolute -bottom-6 right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f7df1e]/15 border border-[#f7df1e]/30 text-[#f7df1e] text-[10px] font-bold font-mono animate-float-delay-1 shadow-lg">
          <span className="font-extrabold text-xs">JS</span>
        </div>
      </div>
    </div>
  );
}
