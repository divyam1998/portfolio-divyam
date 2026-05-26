"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Sun, GitBranch, Mail, Download, ExternalLink, ChevronRight, MapPin, Briefcase, MessageCircle, X, Send, GraduationCap } from "lucide-react";

const TICKER_ITEMS = ["☕ Fuelled by coffee","📍 Windsor, Ontario","🟢 Open to work","5+ years experience","🚀 Laravel · Django · React","🎓 Master of Applied Computing","🏗️ Backend & Full Stack","⚡ 60% faster APIs","🛡️ REST APIs · Docker · Git"];
const SKILLS = [{name:"Python",level:82,color:"#f59e0b",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},{name:"C",level:75,color:"#6366f1",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"},{name:"Laravel",level:92,color:"#ef4444",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"},{name:"PHP",level:95,color:"#8b5cf6",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg"},{name:"Java",level:72,color:"#f97316",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},{name:"Django",level:78,color:"#10b981",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"},{name:"React",level:75,color:"#3b82f6",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{name:"JavaScript",level:80,color:"#eab308",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},{name:"MySQL",level:88,color:"#06b6d4",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},{name:"Docker",level:70,color:"#8b5cf6",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"}];
const STATS = [{value:5,suffix:"+",label:"Years experience"},{value:70,suffix:"%",label:"Reduced manual tracking"},{value:60,suffix:"%",label:"Faster API response"},{value:25,suffix:"%",label:"Fewer production bugs"}];
const EXPERIENCE = [
  {role:"Software Developer",company:"UST (formerly MobileComm)",location:"Markham, ON",period:"Sep 2023 – Present",bullets:["Built Inventory Manager reducing manual tracking effort by 70%","Re-engineered backend workflows improving response times by 60%","Built scalable REST APIs enabling seamless system integration","Partnered with stakeholders to translate complex problems into solutions"],tech:["Laravel","PHP","MySQL","REST API","Docker"]},
  {role:"Software Developer",company:"Happly.ai",location:"Montreal, QC",period:"Jan 2025 – Aug 2025",bullets:["Built subscription UI with Stripe integration for SaaS platform","Designed group management with role-based access control (RBAC)","Optimized two-way communication fixing critical performance bottlenecks","Collaborated in Agile sprints driving incremental delivery"],tech:["React","TypeScript","Stripe","Laravel","PostgreSQL"]},
  {role:"Software Developer",company:"UST (formerly MobileComm)",location:"Gurgaon, India",period:"Feb 2021 – Jul 2023",bullets:["Built RF Calculator cutting computation time by 50%, accuracy +30%","Migrated MVC codebase to HMVC reducing redundancy by 70%","Wrote unit, functional & acceptance tests reducing production bugs by 25%"],tech:["PHP","CodeIgniter","MySQL","jQuery","Bootstrap"]},
];
const PROJECTS = [
  {name:"NexPulse",tagline:"AI-powered fraud protection for elderly users",problem:"Elderly users are disproportionately targeted by online scams and phishing attacks. Existing social platforms offer zero real-time protection against fraudulent content.",solution:"Built a full-stack social media platform with a real-time ML pipeline that flags fraudulent messages, phishing links, and suspicious patterns before they reach users. Designed accessible UI with large typography and plain-language warnings tailored for elderly users.",result:"Achieved sub-100ms scam detection latency. Accessible design significantly reduced user confusion and improved digital safety literacy for the target demographic.",tech:["Python","Django","React","Machine Learning","HTML5","CSS"],color:"#3b82f6"},
  {name:"Semantic Search Engine",tagline:"NLP-powered academic search using Word2Vec & Elasticsearch",problem:"Traditional keyword-based search fails to understand meaning and context, returning irrelevant results for academic queries on the CiteSeer database.",solution:"Built a semantic search system integrating Elasticsearch and NLTK to process academic papers and scholarly documents. Implemented Cosine Similarity and Word2Vec to match queries based on meaning rather than exact keywords, leveraging LLM techniques for relevance ranking.",result:"Dramatically improved search accuracy and relevance over keyword search. Word2Vec embeddings enabled the system to surface conceptually related papers even when exact terms didn't match — a capability traditional search engines lack.",tech:["Python","Elasticsearch","NLTK","Word2Vec","NLP","LLM","Cosine Similarity"],color:"#8b5cf6"},
  {name:"Green Cart",tagline:"Eco-friendly e-commerce platform with secure auth & search",problem:"Environmentally conscious consumers lacked a dedicated platform to discover and purchase eco-friendly products with a reliable, secure shopping experience.",solution:"Developed a full-stack e-commerce platform using Django and Python with secure user authentication, advanced product search, and a responsive design. Collaborated on system architecture and backend logic, managing the full project workflow with Jira in an Agile environment.",result:"Delivered a production-ready e-commerce platform with secure auth flows, REST API integration, and responsive UI — covering the complete web application lifecycle from design to deployment.",tech:["Python","Django","HTML","CSS","REST APIs","Jira","Authentication Systems"],color:"#10b981"},
  {name:"Flight Price Analysis",tagline:"Data structures-driven airfare comparison engine",problem:"Travelers struggle to compare flight prices across multiple airlines efficiently. Existing tools are slow and don't optimize for data retrieval speed at scale.",solution:"Built a backend system in Java using advanced data structures (priority queues, hash maps, graph algorithms) to crawl, validate, and compare airfare data across multiple airline websites. Implemented search optimization algorithms with Spring Boot and Selenium for accurate real-time data retrieval.",result:"Data structure optimization enabled significantly faster search and comparison than naive approaches. Priority queue-based ranking surfaced the most cost-effective options instantly, demonstrating how CS fundamentals directly improve real-world system performance.",tech:["Java","Spring Boot","Data Structures","Web Scraping","Selenium","Search Optimization"],color:"#f59e0b"},
  {name:"TCP Client Server",tagline:"High-availability distributed networking system",problem:"Production systems need fault-tolerant networking with zero single-point-of-failure. A single server crash can bring down entire services.",solution:"Engineered an asynchronous C-based TCP client-server using socket programming with a distributed active-passive high-availability clustering architecture for optimal load balancing and failover.",result:"Achieved seamless failover with zero downtime during node failure. Active-passive clustering ensured continuous availability and optimal load distribution across nodes.",tech:["C","TCP/IP","Linux","Socket Programming","Distributed Systems","High Availability"],color:"#ef4444"},
];
const LOOKING_FOR = [
  {icon:"💼",title:"Role type",value:"Full-time · Contract"},
  {icon:"🏢",title:"Company size",value:"Startup to Enterprise"},
  {icon:"📍",title:"Location",value:"Canada · Remote · Hybrid"},
  {icon:"⚡",title:"Stack preference",value:"Any — I adapt fast"},
  {icon:"🌱",title:"Culture",value:"Learning-first, collaborative"},
  {icon:"🚀",title:"Start date",value:"Available immediately"},
];

// ─── CURSOR TRAIL ─────────────────────────────────────────────────────────────
function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{x:number,y:number,alpha:number}[]>([]);
  const mouse = useRef({x:0,y:0});

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
    const onMove = (e:MouseEvent) => { mouse.current={x:e.clientX,y:e.clientY}; points.current.push({x:e.clientX,y:e.clientY,alpha:1}); };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      points.current = points.current.filter(p=>p.alpha>0.01);
      points.current.forEach((p,i)=>{
        p.alpha *= 0.88;
        ctx.beginPath();
        ctx.arc(p.x,p.y,4*(p.alpha),0,Math.PI*2);
        ctx.fillStyle = `rgba(59,130,246,${p.alpha*0.6})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return ()=>{ window.removeEventListener("resize",onResize); window.removeEventListener("mousemove",onMove); };
  },[]);

  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999}}/>;
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const onScroll=()=>{
      const el=document.documentElement;
      const scrolled=el.scrollTop;
      const total=el.scrollHeight-el.clientHeight;
      setProgress(total>0?(scrolled/total)*100:0);
    };
    window.addEventListener("scroll",onScroll);
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:9998,height:"3px",background:"var(--bg-secondary)"}}>
      <div style={{height:"100%",width:`${progress}%`,background:"var(--accent)",transition:"width 0.1s",borderRadius:"0 2px 2px 0"}}/>
    </div>
  );
}

// ─── PAGE LOAD ANIMATION ──────────────────────────────────────────────────────
function PageLoader({onDone}:{onDone:()=>void}) {
  const [step,setStep]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setStep(1),400);
    const t2=setTimeout(()=>setStep(2),900);
    const t3=setTimeout(()=>onDone(),1400);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[onDone]);
  return (
    <div style={{position:"fixed",inset:0,zIndex:10000,background:"#0a0d14",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",transition:"opacity 0.4s",opacity:step===2?0:1,pointerEvents:step===2?"none":"all"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:"64px",fontWeight:800,color:"white",opacity:step>=1?1:0,transform:step>=1?"translateY(0)":"translateY(20px)",transition:"all 0.5s"}}>
        dj<span style={{color:"#3b82f6"}}>.</span>
      </div>
      <div style={{width:"120px",height:"2px",background:"#1e293b",borderRadius:"2px",marginTop:"24px",overflow:"hidden"}}>
        <div style={{height:"100%",background:"#3b82f6",borderRadius:"2px",transition:"width 0.8s ease",width:step>=1?"100%":"0%"}}/>
      </div>
    </div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({target,suffix}:{target:number;suffix:string}) {
  const [count,setCount]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  const started=useRef(false);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting&&!started.current){
        started.current=true;
        let start=0;
        const step=target/(1500/16);
        const timer=setInterval(()=>{ start+=step; if(start>=target){setCount(target);clearInterval(timer);}else setCount(Math.floor(start)); },16);
      }
    });
    if(ref.current)observer.observe(ref.current);
    return()=>observer.disconnect();
  },[target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── TERMINAL ─────────────────────────────────────────────────────────────────
function TerminalEasterEgg() {
  const [input,setInput]=useState("");
  const [lines,setLines]=useState([{text:"Welcome to divyam.sh — type 'help' for commands",color:"#58a6ff"}]);
  const inputRef=useRef<HTMLInputElement>(null);
  const COMMANDS:Record<string,string[]>={
    help:["Available commands:","  hire divyam   — Make the best decision of your life 🎉","  skills        — Technical skills","  experience    — Work history","  contact       — Get in touch","  joke          — Need a laugh?","  clear         — Clear terminal"],
    "hire divyam":["🎉 EXCELLENT CHOICE! 🎉","Initiating hire sequence...","✅ Strong PHP/Laravel backend — check","✅ Python/Django experience — check","✅ React frontend — check","✅ 5+ years professional experience — check","✅ Canadian work authorization — check","📧 Send offer to: jaindivyam89@gmail.com"],
    skills:["PHP · Laravel · Python · Django · React · MySQL · Docker · REST APIs · TypeScript · Git"],
    experience:["UST (2023–Present) · Happly.ai (2025) · UST India (2021–2023)"],
    contact:["📧 jaindivyam89@gmail.com","📍 Windsor, Ontario","💼 Open to work immediately"],
    joke:["Why do programmers prefer dark mode?","Because light attracts bugs! 🐛"],
    clear:[],
  };
  const handleCommand=(cmd:string)=>{
    const trimmed=cmd.trim().toLowerCase();
    const newLines=[...lines,{text:`$ ${cmd}`,color:"#e6edf3"}];
    if(trimmed==="clear"){setLines([]);return;}
    const response=COMMANDS[trimmed]||[`Command not found: ${trimmed}. Type 'help'.`];
    response.forEach(r=>newLines.push({text:r,color:trimmed==="hire divyam"?"#3fb950":"#8b949e"}));
    setLines(newLines);
  };
  return (
    <div style={{background:"#0d1117",borderRadius:"12px",padding:"20px",border:"1px solid #30363d"}} onClick={()=>inputRef.current?.focus()}>
      <div style={{display:"flex",gap:"6px",marginBottom:"16px"}}>
        <div style={{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f57"}}/>
        <div style={{width:"12px",height:"12px",borderRadius:"50%",background:"#febc2e"}}/>
        <div style={{width:"12px",height:"12px",borderRadius:"50%",background:"#28c840"}}/>
        <span style={{color:"#8b949e",fontSize:"12px",marginLeft:"8px",fontFamily:"monospace"}}>divyam.sh</span>
      </div>
      <div style={{minHeight:"160px",maxHeight:"240px",overflowY:"auto",marginBottom:"12px"}}>
        {lines.map((line,i)=>(
          <div key={i} style={{color:line.color,fontSize:"13px",lineHeight:"1.8",fontFamily:"monospace"}}>{line.text}</div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{color:"#3fb950",fontSize:"13px",fontFamily:"monospace"}}>$</span>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&input.trim()){handleCommand(input);setInput("");}}}
          style={{background:"transparent",border:"none",outline:"none",color:"#e6edf3",fontSize:"13px",fontFamily:"monospace",flex:1}}
          placeholder="type 'help' to start..."/>
      </div>
    </div>
  );
}

// ─── CHATBOT ──────────────────────────────────────────────────────────────────
function ChatBot() {
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState([{role:"assistant",text:"Hi! I'm Divyam's AI assistant. Ask me anything about his experience, skills, or availability!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);
  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();
    setInput("");
    setMessages(prev=>[...prev,{role:"user",text:userMsg}]);
    setLoading(true);
    try {
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:userMsg})});
      const data=await res.json();
      setMessages(prev=>[...prev,{role:"assistant",text:data.reply}]);
    } catch {
      setMessages(prev=>[...prev,{role:"assistant",text:"Sorry! Please email me at jaindivyam89@gmail.com"}]);
    }
    setLoading(false);
  };
  return (
    <>
      <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:"24px",right:"24px",zIndex:1000,width:"56px",height:"56px",borderRadius:"50%",background:"var(--accent)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 24px rgba(37,99,235,0.4)"}}>
        {open?<X size={22} color="white"/>:<MessageCircle size={22} color="white"/>}
      </button>
      {open&&(
        <div style={{position:"fixed",bottom:"90px",right:"24px",zIndex:1000,width:"340px",borderRadius:"16px",overflow:"hidden",background:"var(--bg-card)",border:"1px solid var(--border)",boxShadow:"0 8px 40px rgba(0,0,0,0.15)"}}>
          <div style={{background:"var(--accent)",padding:"16px 20px",display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"14px"}}>🤖</span></div>
            <div><p style={{color:"white",fontWeight:600,fontSize:"14px",margin:0}}>Ask about Divyam</p><p style={{color:"rgba(255,255,255,0.7)",fontSize:"11px",margin:0}}>AI-powered · Usually instant</p></div>
          </div>
          <div style={{height:"280px",overflowY:"auto",padding:"16px"}}>
            {messages.map((msg,i)=>(
              <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",marginBottom:"10px"}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:"12px",fontSize:"13px",lineHeight:"1.5",background:msg.role==="user"?"var(--accent)":"var(--bg-secondary)",color:msg.role==="user"?"white":"var(--text)"}}>{msg.text}</div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",gap:"4px",padding:"8px"}}>{[0,1,2].map(i=><div key={i} style={{width:"6px",height:"6px",borderRadius:"50%",background:"var(--text-tertiary)",animation:`bounce 1s ${i*0.2}s infinite`}}/>)}</div>}
            <div ref={bottomRef}/>
          </div>
          <div style={{padding:"12px 16px",borderTop:"1px solid var(--border)",display:"flex",gap:"8px"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything..." style={{flex:1,background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"8px",padding:"8px 12px",fontSize:"13px",color:"var(--text)",outline:"none"}}/>
            <button onClick={send} style={{background:"var(--accent)",border:"none",borderRadius:"8px",padding:"8px 12px",cursor:"pointer"}}><Send size={14} color="white"/></button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark,setDark]=useState(true); // DEFAULT DARK
  const [loaded,setLoaded]=useState(false);
  const [activeProject,setActiveProject]=useState<number|null>(null);

  useEffect(()=>{ document.documentElement.classList.toggle("dark",dark); },[dark]);

  const handleLoaded = useCallback(()=>setLoaded(true),[]);

  const tickerItems=[...TICKER_ITEMS,...TICKER_ITEMS];

  return (
    <>
      {!loaded && <PageLoader onDone={handleLoaded}/>}
      <CursorTrail/>
      <ScrollProgress/>

      <div style={{minHeight:"100vh",background:"var(--bg)",opacity:loaded?1:0,transition:"opacity 0.4s"}}>

        {/* Nav */}
        <nav style={{position:"sticky",top:0,zIndex:100,background:"var(--bg)",borderBottom:"1px solid var(--border)",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px",backdropFilter:"blur(12px)"}}>
          <span style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"18px",color:"var(--text)"}}>dj<span style={{color:"var(--accent)"}}>.</span></span>
          <div style={{display:"flex",gap:"32px",alignItems:"center"}}>
            {["Experience","Projects","Skills","Contact"].map(item=>(
              <a key={item} href={`#${item.toLowerCase()}`} style={{fontSize:"13px",color:"var(--text-secondary)",textDecoration:"none",fontWeight:500}}>{item}</a>
            ))}
            <button onClick={()=>setDark(!dark)} style={{background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:"100px",padding:"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",color:"var(--text-secondary)",fontSize:"13px",fontWeight:500}}>
              {dark?<Sun size={13}/>:<Moon size={13}/>}{dark?"Light":"Dark"}
            </button>
          </div>
        </nav>

        <main style={{maxWidth:"1000px",margin:"0 auto",padding:"0 40px 80px"}}>

          {/* Hero */}
          <section style={{padding:"80px 0 60px",display:"grid",gridTemplateColumns:"1fr auto",gap:"40px",alignItems:"center"}}>
            <div>
              <h1 style={{fontSize:"40px",fontWeight:700,color:"var(--text)",marginBottom:"16px",lineHeight:1.2,fontFamily:"Syne,sans-serif",maxWidth:"480px"}}>
                Hi, I'm Divyam.<br/><span style={{color:"var(--accent)"}}>I turn complex problems</span><br/>into clean, fast systems.
              </h1>
              <p style={{fontSize:"16px",color:"var(--text-secondary)",maxWidth:"480px",marginBottom:"28px",lineHeight:1.7}}>
                Software developer with 5+ years of experience building backend systems and full-stack web applications. Open to roles across Canada and remote.
              </p>
              <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"20px"}}>
                <a href="#contact" style={{background:"var(--accent)",color:"white",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"8px"}}>
                  <Mail size={15}/> Get in touch
                </a>
                <a href="https://calendly.com/jaindivyam89" target="_blank" style={{background:"#10b981",color:"white",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"8px"}}>
                  📅 Book a call
                </a>
                <a href="/resume.pdf" style={{background:"var(--bg-card)",color:"var(--text)",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:"8px"}}>
                  <Download size={15}/> Download CV
                </a>
                <a href="https://github.com/divyam1998" target="_blank" style={{background:"var(--bg-card)",color:"var(--text)",padding:"12px 14px",borderRadius:"10px",textDecoration:"none",border:"1px solid var(--border)",display:"flex",alignItems:"center"}}>
                  <GitBranch size={16}/>
                </a>
                <a href="https://www.hackerrank.com/profile/jaindivyam89" target="_blank" style={{background:"var(--bg-card)",color:"#00ea64",padding:"12px 14px",borderRadius:"10px",textDecoration:"none",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:500}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.174 5.42l.44 2.659h.068l.441-2.659h1.384l.441 2.659h.068l.441-2.659h1.31l-.906 4.358h-1.384l-.441-2.592h-.068l-.441 2.592H12.09l-.906-4.358h.642zm-5.554 0h1.31v1.716h1.513V5.42h1.31v4.358h-1.31V8.45H7.582v1.328H6.272V5.42zm10.91 8.58c0 .276-.224.5-.5.5H7.318a.5.5 0 01-.5-.5v-2.5c0-.276.224-.5.5-.5h9.364c.276 0 .5.224.5.5v2.5z"/></svg>
                  HackerRank
                </a>
              </div>
            </div>
            <div style={{width:"160px",height:"160px",borderRadius:"50%",background:"var(--accent-light)",border:"4px solid var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 40px rgba(59,130,246,0.2)"}}>
              <span style={{fontFamily:"Syne,sans-serif",fontSize:"48px",fontWeight:800,color:"var(--accent)"}}>DJ</span>
            </div>
          </section>

          {/* Stats */}
          <section style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"80px"}}>
            {STATS.map((stat,i)=>(
              <div key={i} className="card" style={{padding:"24px",textAlign:"center"}}>
                <div style={{fontSize:"36px",fontWeight:800,fontFamily:"Syne,sans-serif",color:"var(--accent)"}}><AnimatedCounter target={stat.value} suffix={stat.suffix}/></div>
                <div style={{fontSize:"12px",color:"var(--text-secondary)",marginTop:"4px"}}>{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section id="experience" style={{marginBottom:"80px"}}>
            <div className="section-label">Experience</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"32px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>Where I've worked</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              {EXPERIENCE.map((job,i)=>(
                <div key={i} className="card" style={{padding:"28px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
                    <div>
                      <h3 style={{fontSize:"18px",fontWeight:700,color:"var(--text)",marginBottom:"4px",fontFamily:"Syne,sans-serif"}}>{job.role}</h3>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-secondary)",fontSize:"14px"}}>
                        <Briefcase size={13}/><span style={{fontWeight:500}}>{job.company}</span><span>·</span><MapPin size={13}/><span>{job.location}</span>
                      </div>
                    </div>
                    <span style={{fontSize:"12px",padding:"4px 12px",borderRadius:"100px",background:"var(--bg-secondary)",color:"var(--text-secondary)",fontWeight:500}}>{job.period}</span>
                  </div>
                  <ul style={{listStyle:"none"}}>
                    {job.bullets.map((b,j)=>(
                      <li key={j} style={{display:"flex",alignItems:"flex-start",gap:"8px",fontSize:"14px",color:"var(--text-secondary)",lineHeight:"1.6",marginBottom:"6px"}}>
                        <ChevronRight size={14} style={{marginTop:"4px",color:"var(--accent)",flexShrink:0}}/>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" style={{marginBottom:"80px"}}>
            <div className="section-label">Projects</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"8px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>What I've built</h2>
            <p style={{color:"var(--text-secondary)",fontSize:"14px",marginBottom:"32px"}}>Click a project to see the full case study</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
              {PROJECTS.map((project,i)=>(
                <div key={i}>
                  <div className="card" onClick={()=>setActiveProject(activeProject===i?null:i)} style={{padding:"28px",cursor:"pointer",borderTop:`3px solid ${project.color}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                      <h3 style={{fontSize:"20px",fontWeight:700,color:"var(--text)",fontFamily:"Syne,sans-serif"}}>{project.name}</h3>
                      <ExternalLink size={16} color="var(--text-tertiary)"/>
                    </div>
                    <p style={{fontSize:"14px",color:"var(--text-secondary)",marginBottom:"16px",lineHeight:1.6}}>{project.tagline}</p>
                    <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                      {project.tech.map(t=><span key={t} className="badge" style={{fontSize:"11px"}}>{t}</span>)}
                    </div>
                  </div>
                  {activeProject===i&&(
                    <div className="card" style={{padding:"24px",marginTop:"8px",borderLeft:`3px solid ${project.color}`,borderRadius:"12px"}}>
                      {[["PROBLEM",project.problem],["SOLUTION",project.solution],["RESULT",project.result]].map(([label,text])=>(
                        <div key={label} style={{marginBottom:"16px"}}>
                          <p style={{fontSize:"11px",fontWeight:700,color:"var(--text-tertiary)",letterSpacing:"1px",marginBottom:"6px"}}>{label}</p>
                          <p style={{fontSize:"14px",color:"var(--text-secondary)",lineHeight:1.6}}>{text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills with SVG logos */}
          <section id="skills" style={{marginBottom:"80px"}}>
            <div className="section-label">Skills</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"32px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>Technical toolkit</h2>
            {/* Logo grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"12px",marginBottom:"24px"}}>
              {SKILLS.map((skill,i)=>(
                <div key={i} className="card" style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}}>
                  <img src={skill.logo} alt={skill.name} style={{width:"32px",height:"32px",objectFit:"contain"}} onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
                  <span style={{fontSize:"12px",fontWeight:500,color:"var(--text)"}}>{skill.name}</span>
                </div>
              ))}
            </div>
            {/* Skill bars */}
            <div className="card" style={{padding:"32px"}}>
              {SKILLS.map((skill,i)=>(
                <div key={i} style={{marginBottom:"20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                    <span style={{fontSize:"14px",fontWeight:500,color:"var(--text)"}}>{skill.name}</span>
                    <span style={{fontSize:"13px",color:"var(--text-secondary)"}}>{skill.level}%</span>
                  </div>
                  <div style={{height:"6px",background:"var(--bg-secondary)",borderRadius:"100px",overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${skill.level}%`,background:skill.color,borderRadius:"100px",transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Terminal */}
          <section style={{marginBottom:"80px"}}>
            <div className="section-label">Easter Egg</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"8px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>Try the terminal</h2>
            <p style={{color:"var(--text-secondary)",fontSize:"14px",marginBottom:"24px"}}>Type 'help' to see commands. Or just type 'hire divyam' 😄</p>
            <TerminalEasterEgg/>
          </section>

          {/* Calendly */}
          <section style={{marginBottom:"80px"}}>
            <div className="section-label">Book a call</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"8px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>Let's talk</h2>
            <p style={{color:"var(--text-secondary)",fontSize:"14px",marginBottom:"24px"}}>Pick a time that works for you — 15 or 30 minute slots available</p>
            <div className="card" style={{padding:"32px",textAlign:"center"}}>
              <p style={{fontSize:"15px",color:"var(--text-secondary)",marginBottom:"20px"}}>
                Prefer a quick chat over a long email chain? Book directly below 👇
              </p>
              <a href="https://calendly.com/jaindivyam89" target="_blank" style={{display:"inline-flex",alignItems:"center",gap:"10px",background:"#10b981",color:"white",padding:"14px 32px",borderRadius:"10px",textDecoration:"none",fontSize:"15px",fontWeight:600}}>
                📅 Schedule a meeting
              </a>
              <p style={{fontSize:"12px",color:"var(--text-tertiary)",marginTop:"12px"}}>Free · No commitment · Cancel anytime</p>
            </div>
          </section>

          {/* Looking for */}
          <section style={{marginBottom:"80px"}}>
            <div className="section-label">Availability</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"8px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>What I'm looking for</h2>
            <p style={{color:"var(--text-secondary)",fontSize:"14px",marginBottom:"32px"}}>Being upfront saves everyone's time</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
              {LOOKING_FOR.map((item,i)=>(
                <div key={i} className="card" style={{padding:"20px"}}>
                  <span style={{fontSize:"24px",display:"block",marginBottom:"8px"}}>{item.icon}</span>
                  <p style={{fontSize:"11px",fontWeight:600,color:"var(--text-tertiary)",letterSpacing:"1px",marginBottom:"4px"}}>{item.title.toUpperCase()}</p>
                  <p style={{fontSize:"14px",fontWeight:500,color:"var(--text)"}}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section style={{marginBottom:"80px"}}>
            <div className="section-label">Education</div>
            <h2 style={{fontSize:"28px",fontWeight:700,marginBottom:"32px",color:"var(--text)",fontFamily:"Syne,sans-serif"}}>Academic background</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              {[{degree:"Master of Applied Computing",school:"University of Windsor",location:"Windsor, ON",period:"Sep 2023 – Dec 2024"},{degree:"Bachelor of Computer Science & Engineering",school:"Chitkara University",location:"Rajpura, India",period:"Aug 2016 – Jul 2020"}].map((edu,i)=>(
                <div key={i} className="card" style={{padding:"24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
                    <div style={{width:"44px",height:"44px",borderRadius:"12px",background:"var(--accent-light)",display:"flex",alignItems:"center",justifyContent:"center"}}><GraduationCap size={20} color="var(--accent)"/></div>
                    <div>
                      <h3 style={{fontSize:"15px",fontWeight:700,color:"var(--text)",marginBottom:"4px"}}>{edu.degree}</h3>
                      <p style={{fontSize:"13px",color:"var(--text-secondary)"}}>{edu.school} · {edu.location}</p>
                    </div>
                  </div>
                  <span style={{fontSize:"12px",color:"var(--text-tertiary)",fontWeight:500}}>{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <div className="card" style={{padding:"48px",textAlign:"center",background:"var(--accent)",border:"none"}}>
              <h2 style={{fontSize:"32px",fontWeight:800,color:"white",marginBottom:"12px",fontFamily:"Syne,sans-serif"}}>Let's work together</h2>
              <p style={{color:"rgba(255,255,255,0.8)",fontSize:"15px",marginBottom:"32px"}}>Canada · Open to remote</p>
              <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
                <a href="mailto:jaindivyam89@gmail.com" style={{background:"white",color:"var(--accent)",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"}}>
                  <Mail size={15}/> jaindivyam89@gmail.com
                </a>
                <a href="https://calendly.com/jaindivyam89" target="_blank" style={{background:"rgba(255,255,255,0.15)",color:"white",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"8px",border:"1px solid rgba(255,255,255,0.3)"}}>
                  📅 Book a call
                </a>
                <a href="https://www.hackerrank.com/profile/jaindivyam89" target="_blank" style={{background:"rgba(255,255,255,0.15)",color:"white",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"8px",border:"1px solid rgba(255,255,255,0.3)"}}>
                  🏆 HackerRank
                </a>
                <a href="tel:6473340208" style={{background:"rgba(255,255,255,0.15)",color:"white",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"8px",border:"1px solid rgba(255,255,255,0.3)"}}>
                  📞 647-334-0208
                </a>
              </div>
            </div>
          </section>
        </main>

        <ChatBot/>
      </div>

      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
      `}</style>
    </>
  );
}