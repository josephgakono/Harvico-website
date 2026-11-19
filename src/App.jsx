import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  ['Home', '/'],
  ['About us', '/about'],
  ['Help', '/help'],
  ['Contact', '/contact'],
]
const CONTACT_COOLDOWN_MS = 60_000
const CONTACT_LAST_REQUEST_KEY = 'harvico-contact-last-request'

function Brand({ light = false }) {
  return <a className={`brand${light ? ' brand-light' : ''}`} href="/" aria-label="Harvico home">
    <span className="brand-mark"><img src="/harvico-mark.png" alt="" /></span>
    <span>arvico<span className="brand-period">.</span></span>
  </a>
}

function DownloadLink({ className = 'button button-amber' }) {
  const [available, setAvailable] = useState(false)
  useEffect(() => {
    let active = true
    fetch('/downloads/harvico.apk', { method: 'HEAD' })
      .then((response) => {
        const type = response.headers.get('content-type') || ''
        if (active && response.ok && !type.includes('text/html')) setAvailable(true)
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  if (available) return <a className={className} href="/downloads/harvico.apk" download>Download the app <span>↓</span></a>
  return <span className={`${className} button-disabled`} aria-label="Android app coming soon">Android app coming soon <span>↗</span></span>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span />
      </button>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} className={currentPath === href ? 'nav-active' : undefined} aria-current={currentPath === href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <DownloadLink className="button button-small" />
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand"><Brand light /><p>Good food has a story.<br />We’re helping it travel further.</p></div>
      <div className="footer-col"><span className="footer-label">Explore</span>{navItems.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</div>
      <div className="footer-col"><span className="footer-label">Say hello</span><a href="mailto:info@harvico.co.ke">info@harvico.co.ke</a><a href="mailto:harvico.support@harvico.co.ke">Get support</a><a href="/help">Frequently asked questions</a></div>
      <div className="footer-download"><span className="footer-label">The harvest is better together.</span><p>Bring your market closer.</p><DownloadLink className="button button-amber" /></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Harvico. Made for a more connected harvest.</span><span>Kenya <b>•</b> Growing together</span></div>
  </footer>
}

function Layout({ children }) {
  return <><WelcomeSplash /><Header /><main>{children}</main><Footer /></>
}

function WelcomeSplash() {
  const [visible, setVisible] = useState(() => {
    try {
      const navigationType = window.performance.getEntriesByType('navigation')[0]?.type
      return navigationType === 'reload' || window.sessionStorage.getItem('harvico-welcome-seen-v3') !== 'yes'
    } catch { return true }
  })
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (!visible) return undefined
    try { window.sessionStorage.setItem('harvico-welcome-seen-v3', 'yes') } catch { /* Splash still works without storage. */ }
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2600)
    const removeTimer = window.setTimeout(() => setVisible(false), 3000)
    return () => { window.clearTimeout(leaveTimer); window.clearTimeout(removeTimer) }
  }, [visible])
  if (!visible) return null
  return <div className={`welcome-splash${leaving ? ' splash-leaving' : ''}`} role="status" aria-label="Welcome to Harvico">
    <div className="splash-grain" aria-hidden="true" />
    <div className="splash-center">
      <div className="splash-wordmark" aria-label="Harvico"><span className="splash-logo"><img src="/harvico-mark.png" alt="" /></span><span>arvico</span></div>
      <div className="splash-seedline" aria-hidden="true"><span /><i>✳</i><span /></div>
      <p>A closer market for every harvest.</p>
    </div>
    <div className="splash-bottom"><span>ROOTED IN KENYA</span><span>GROWING TOGETHER</span></div>
  </div>
}

function PhoneMockup() {
  return <div className="visual-stage" aria-label="Illustration of the Harvico marketplace app">
    <div className="sun-disc" />
    <div className="floating-note note-top"><span className="note-icon leaf">✳</span><span><b>Fresh from the farm</b><small>Closer to your table</small></span></div>
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>●●● ▰</span></div>
        <div className="phone-greeting"><small>GOOD MORNING, JOY</small><b>What’s fresh today?</b></div>
        <div className="phone-search">⌕ &nbsp; Find tomatoes, maize...</div>
        <div className="phone-section"><b>Popular near you</b><small>See all</small></div>
        <div className="produce-grid">
          <div className="produce-card produce-tomato"><img src="/phone-tomatoes.jpg" alt="Fresh tomatoes" /><b>Tomatoes</b><small>From KSh 80/kg</small></div>
          <div className="produce-card produce-maize"><img src="/phone-corn.png" alt="Fresh maize" /><b>Fresh maize</b><small>From KSh 45/pc</small></div>
        </div>
        <div className="farmer-row"><span className="farmer-avatar">👩🏾‍🌾</span><span><b>Mercy’s harvest</b><small>Kiambu · 4.8 ★</small></span><span className="verified">✓</span></div>
        <div className="phone-tabs"><span>⌂<small>Home</small></span><span>♡<small>Saved</small></span><span>▣<small>Orders</small></span><span>◉<small>Profile</small></span></div>
      </div>
    </div>
    <div className="floating-note note-bottom"><span className="note-icon amber-icon">↗</span><span><b>A fairer way to trade</b><small>Farmer ↔ buyer</small></span></div>
    <div className="stage-caption"><span className="caption-line" />The market, in your hands</div>
  </div>
}

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A MARKET THAT MEETS YOU THERE</div>
          <h1>Good food.<br /><em>Fairer journeys.</em></h1>
          <p className="hero-lede">From the hands that grow it to the people who need it. Harvico brings farmers and buyers closer, so every harvest has a better chance to thrive.</p>
          <div className="hero-actions"><a className="button button-dark" href="/about">Discover Harvico <Arrow /></a><DownloadLink /></div>
          <div className="hero-proof"><div className="avatar-stack"><i>🌿</i><i>🌽</i><i>🥬</i></div><span>Rooted in Kenya.<br /><b>Made for the people who feed us.</b></span></div>
        </div>
        <PhoneMockup />
      </div>
      <div className="hero-bottom"><span>GROWN WITH PURPOSE</span><span className="hero-bottom-line" /><span>BUILT FOR CONNECTION</span><span className="hero-bottom-location">KE <b>·</b> 01°17′S</span></div>
    </section>

    <section className="ticker" aria-label="Marketplace values"><div className="ticker-track"><span className="ticker-group">FARM TO MARKET <b>✳</b> PEOPLE BEFORE MIDDLEMEN <b>✳</b> EVERY HARVEST HAS VALUE <b>✳</b> FARM TO MARKET <b>✳</b> PEOPLE BEFORE MIDDLEMEN <b>✳</b> EVERY HARVEST HAS VALUE <b>✳</b></span><span className="ticker-group" aria-hidden="true">FARM TO MARKET <b>✳</b> PEOPLE BEFORE MIDDLEMEN <b>✳</b> EVERY HARVEST HAS VALUE <b>✳</b> FARM TO MARKET <b>✳</b> PEOPLE BEFORE MIDDLEMEN <b>✳</b> EVERY HARVEST HAS VALUE <b>✳</b></span></div></section>

    <section className="intro-section section-wrap">
      <div className="section-kicker">01 / THE OPPORTUNITY</div>
      <div className="intro-content"><h2>A better harvest<br />starts with <em>a better connection.</em></h2><div><p>Too often, the people who grow our food and the people looking to buy it are kept worlds apart. Good produce loses time, farmers lose value, and buyers lose choice.</p><p>Harvico is building a more direct way forward: one simple place to discover fresh produce, meet the people behind it, and make trade work better for everyone.</p><a href="/about" className="text-link">The story behind Harvico <Arrow /></a></div></div>
    </section>

    <section className="steps-section">
      <div className="section-wrap">
        <div className="steps-heading"><div><div className="section-kicker">02 / HOW IT WORKS</div><h2>From field to find.<br /><em>Simple as that.</em></h2></div><p>Whether you grow, source, or simply love good food, there’s a place for you here.</p></div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-no">01</span><div className="step-art art-field"><img src="/home-grow.jpg" alt="Young seedlings growing from rich soil" /><i>GROW</i></div><h3>Grow with confidence</h3><p>Farmers can showcase what’s ready, reach more buyers, and give every harvest a wider audience.</p><a href="/about" aria-label="Learn about growing with Harvico">Learn more <Arrow /></a></article>
          <article className="step-card step-middle"><span className="step-no">02</span><div className="step-art art-market"><span>↔</span><i>CONNECT</i></div><h3>Meet in the middle</h3><p>Buyers and wholesalers can discover produce directly from the people who know it best.</p><a href="/help" aria-label="Learn how to connect on Harvico">How it works <Arrow /></a></article>
          <article className="step-card"><span className="step-no">03</span><div className="step-art art-harvest"><img src="/home-thrive.jpg" alt="A healthy green leaf in soft natural light" /><i>THRIVE</i></div><h3>Make more possible</h3><p>Fewer barriers mean better choices, stronger relationships, and more value staying in the food chain.</p><a href="/about" aria-label="Learn about Harvico’s impact">Our purpose <Arrow /></a></article>
        </div>
      </div>
    </section>

    <section className="manifesto-section"><div className="manifesto-wrap"><div className="manifesto-orbit"><span>H</span><i>✳</i></div><div className="manifesto-copy"><div className="section-kicker">03 / WHY WE’RE HERE</div><h2>The future of food<br />should feel <em>closer.</em></h2><p>Closer to the farm. Closer to a fair deal. Closer to a food system where the value of a harvest reaches the people who made it possible.</p><a className="button button-light" href="/about">Meet our mission <Arrow /></a></div><div className="manifesto-stamp">ROOTED<br />IN KENYA<br /><span>✳</span></div></div></section>

    <section className="closing-cta section-wrap"><div className="cta-topline"><span>04 / YOUR NEXT STEP</span><span>THE HARVEST IS BETTER TOGETHER</span></div><div className="cta-content"><h2>Let’s bring the<br /><em>market closer.</em></h2><div><p>Harvico is growing a new way to connect. Be part of what comes next.</p><div className="cta-actions"><DownloadLink /><a className="text-link" href="/contact">Talk to our team <Arrow /></a></div></div></div><div className="cta-pattern" aria-hidden="true">✳</div></section>
  </>
}

function PageHero({ label, title, lead }) {
  return <section className="page-hero"><div className="section-wrap"><div className="eyebrow"><span className="eyebrow-dot" /> {label}</div><h1>{title}</h1><p>{lead}</p></div><div className="page-hero-mark">✳</div></section>
}

function AboutPage() {
  return <>
    <PageHero label="A LITTLE ABOUT US" title={<>The people behind<br /><em>a closer market.</em></>} lead="We believe the journey between a good harvest and a good meal can be more direct, more transparent, and fairer for everyone along the way." />
    <section className="about-story section-wrap"><div className="section-kicker">OUR STORY / 01</div><div><h2>Good food grows<br />from <em>good relationships.</em></h2><p>Harvico began with a simple thought: the people who grow our food deserve a better path to the people who need it. And buyers deserve an easier way to find fresh produce from trusted sources.</p><p>We’re creating a digital marketplace that helps those two sides meet. No complicated detours. Just a more direct connection between farms, buyers, and wholesalers across Kenya.</p></div></section>
    <section className="values-band"><div className="section-wrap values-grid"><article><span>01 — OUR VISION</span><h2>A food market<br />with room for <em>everyone.</em></h2><p>We imagine a connected food system where farmers can reach opportunity, buyers can find quality, and communities can thrive together.</p></article><article><span>02 — OUR MISSION</span><h2>Make every<br />connection <em>count.</em></h2><p>We’re building simple digital tools that connect farmers directly to buyers and wholesalers, helping produce and value move with fewer barriers.</p></article></div></section>
    <section className="about-values section-wrap"><div className="section-kicker">WHAT WE BELIEVE / 02</div><div className="beliefs-grid"><article><span className="belief-icon">✳</span><h3>Fairness grows trust</h3><p>When people can connect directly, they can build stronger relationships and make better informed choices.</p></article><article><span className="belief-icon">⌁</span><h3>Simple is powerful</h3><p>Useful technology should make everyday trade easier, clearer, and more accessible.</p></article><article><span className="belief-icon">↗</span><h3>Progress is shared</h3><p>A healthier marketplace creates more possibility for the people who grow, move, and buy our food.</p></article></div></section>
    <section className="about-cta"><h2>There’s a place for you<br />in this <em>harvest.</em></h2><a className="button button-dark" href="/contact">Get in touch <Arrow /></a></section>
  </>
}

const faqs = [
  ['What is Harvico?', 'Harvico is an agricultural marketplace designed to connect farmers directly with buyers and wholesalers, making it easier to discover produce and build direct trading relationships.'],
  ['Who can use the app?', 'Farmers can list their produce, while buyers and wholesalers can browse what is available and connect with the people growing it.'],
  ['How do I get started?', 'Download the Harvico Android app when it becomes available, create an account, and follow the steps for your role. We’ll share the APK here as soon as it is ready.'],
  ['Where is Harvico available?', 'Harvico is being built for Kenya, with local farmers, buyers, and wholesalers at the heart of the experience.'],
  ['How can I get help with my account?', 'Email harvico.support@harvico.co.ke and include a short description of what you need help with. Please avoid sending passwords or verification codes.'],
  ['How can I work with Harvico?', 'We welcome conversations with farmers, buyers, and partners who share our vision for a more connected food market. Reach us at info@harvico.co.ke.'],
]

function HelpPage() {
  const [open, setOpen] = useState(0)
  return <>
    <PageHero label="HERE TO HELP" title={<>A few answers<br />to get you <em>growing.</em></>} lead="New to Harvico? Curious how the marketplace works? Start here, and if something’s still unclear, our team is only an email away." />
    <section className="help-content section-wrap"><div className="help-sidebar"><div className="section-kicker">FREQUENTLY ASKED</div><h2>Good questions<br />make <em>good starts.</em></h2><p>We’re building Harvico with farmers and buyers in mind. Here are a few things people often want to know.</p><div className="help-contact-card"><span>Still need a hand?</span><a href="mailto:harvico.support@harvico.co.ke">harvico.support@harvico.co.ke <Arrow /></a></div></div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item${open === index ? ' faq-active' : ''}`} key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span className="faq-number">0{index + 1}</span><b>{question}</b><span className="faq-toggle">{open === index ? '−' : '+'}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></section>
    <section className="help-download"><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Bring your market<br />a little <em>closer.</em></h2></div><DownloadLink /></section>
  </>
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [topic, setTopic] = useState('General enquiry')
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  useEffect(() => {
    function updateCooldown() {
      try {
        const lastRequest = Number(window.localStorage.getItem(CONTACT_LAST_REQUEST_KEY) || 0)
        setCooldownSeconds(Math.max(0, Math.ceil((lastRequest + CONTACT_COOLDOWN_MS - Date.now()) / 1000)))
      } catch {
        setCooldownSeconds(0)
      }
    }
    updateCooldown()
    const timer = window.setInterval(updateCooldown, 1000)
    return () => window.clearInterval(timer)
  }, [])
  function handleSubmit(event) {
    event.preventDefault()
    try {
      const lastRequest = Number(window.localStorage.getItem(CONTACT_LAST_REQUEST_KEY) || 0)
      const remaining = Math.ceil((lastRequest + CONTACT_COOLDOWN_MS - Date.now()) / 1000)
      if (remaining > 0) {
        setCooldownSeconds(remaining)
        return
      }
    } catch {
      if (cooldownSeconds > 0) return
    }
    try {
      window.localStorage.setItem(CONTACT_LAST_REQUEST_KEY, String(Date.now()))
    } catch {
      // Keep the form usable if browser storage is unavailable.
    }
    const data = new FormData(event.currentTarget)
    const destination = topic === 'App support' ? 'harvico.support@harvico.co.ke' : 'info@harvico.co.ke'
    const subject = encodeURIComponent(`${topic} — ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`)
    setSubmitted(true)
    setCooldownSeconds(CONTACT_COOLDOWN_MS / 1000)
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`
  }
  return <>
    <PageHero label="LET’S TALK" title={<>Good things<br />start with <em>hello.</em></>} lead="A question, an idea, or a chance to work together? We’d love to hear what’s on your mind." />
    <section className="contact-section section-wrap"><div className="contact-info"><div className="section-kicker">REACH THE RIGHT PEOPLE</div><h2>We’re all<br /><em>ears.</em></h2><p>Choose the best inbox for your message. Our team will help you find your way.</p><div className="contact-address"><span>GENERAL ENQUIRIES</span><a href="mailto:info@harvico.co.ke">info@harvico.co.ke <Arrow /></a></div><div className="contact-address"><span>APP & ACCOUNT SUPPORT</span><a href="mailto:harvico.support@harvico.co.ke">harvico.support@harvico.co.ke <Arrow /></a></div><div className="contact-note"><span>✳</span><p>We’re building from Kenya, for the people who keep our food system moving.</p></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-intro"><span>WRITE US A NOTE</span><p>Tell us a little about what you need.</p></div><label>Your name<input required name="name" autoComplete="name" placeholder="e.g. Amina Wanjiku" /></label><label>Your email<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>What’s this about?<select value={topic} onChange={(event) => setTopic(event.target.value)}><option>General enquiry</option><option>App support</option><option>Partnership</option><option>Farmer or buyer enquiry</option></select></label><label>Your message<textarea required name="message" rows="5" placeholder="A few words about how we can help…" /></label><button className="button button-dark" type="submit" disabled={cooldownSeconds > 0}>{cooldownSeconds > 0 ? `Please wait ${cooldownSeconds}s` : <>Open email to send <Arrow /></>}</button>{cooldownSeconds > 0 && <p className="form-cooldown" role="status">To prevent repeated requests, you can open another email draft in {cooldownSeconds} seconds.</p>}{submitted && <p className="form-success" role="status">Your email app should open with the message ready to send. If it doesn’t, write to <a href={topic === 'App support' ? 'mailto:harvico.support@harvico.co.ke' : 'mailto:info@harvico.co.ke'}>{topic === 'App support' ? 'support' : 'our team'}</a> directly.</p>}<small className="form-privacy">Your message opens in your email app. It is not sent until you choose to send it there.</small></form></section>
  </>
}

const pages = { '/': HomePage, '/about': AboutPage, '/help': HelpPage, '/contact': ContactPage }

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const Page = pages[path] || HomePage
  useEffect(() => {
    const pageName = path === '/' ? 'Home' : `${path.slice(1).replace(/\b\w/g, (letter) => letter.toUpperCase())} | Harvico`
    document.title = pageName
  }, [path])
  return <Layout><Page /></Layout>
}

export default App
