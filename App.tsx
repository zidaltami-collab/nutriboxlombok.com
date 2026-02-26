import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ChefHat, 
  Clock, 
  Flame, 
  Leaf, 
  MapPin, 
  Menu,
  X,
  ChevronRight,
  Star,
  Calculator,
  Check,
  ArrowRight,
  Utensils,
  Calendar,
  Truck,
  Heart,
  Zap,
  Users,
  Phone,
  MessageCircle,
  Navigation,
  Mail,
  MapPinned,
  Activity,
  Droplets
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Company Info
const COMPANY_ADDRESS = "Gubuk Kebon, Gang Lingkok Ratu, Aik-Anyar, Sukamulia, Lombok Timur, NTB"
const COMPANY_COORDS = "-8.6500, 116.5500"
const WHATSAPP_NUMBER = "+62881027056659"
const EMAIL = "lomboknutricare@gmail.com"

// Calorie Calculator Component
function CalorieCalculator() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState('1.2')
  const [result, setResult] = useState<null | { tdee: number; diet: number; bulking: number }>(null)

  const calculateCalories = () => {
    const a = parseInt(age)
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const act = parseFloat(activity)

    if (!a || !w || !h) return

    let bmr
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }

    const tdee = Math.round(bmr * act)
    setResult({
      tdee,
      diet: Math.round(tdee - 300),
      bulking: Math.round(tdee + 300)
    })
  }

  return (
    <div className="bg-[#0F2A27]/60 backdrop-blur-xl rounded-[28px] p-8 border border-[#F7F7F5]/[0.08]">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-[#D4A03A]" />
        <h3 className="text-xl font-bold text-[#F7F7F5]">Kalkulator Kalori</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Jenis Kelamin</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          >
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Umur (tahun)</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Berat (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Tinggi (cm)</label>
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Aktivitas</label>
          <select 
            value={activity} 
            onChange={(e) => setActivity(e.target.value)}
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          >
            <option value="1.2">Jarang Bergerak</option>
            <option value="1.375">Ringan</option>
            <option value="1.55">Sedang</option>
            <option value="1.725">Berat</option>
          </select>
        </div>
      </div>
      
      <button 
        onClick={calculateCalories}
        className="btn-primary mt-6 w-full md:w-auto"
      >
        Hitung Kalori
      </button>
      
      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0B1E1C] rounded-xl p-4 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-1">Pemeliharaan</p>
            <p className="text-2xl font-bold text-[#D4A03A]">{result.tdee} <span className="text-sm text-[#B7C1BE]">kcal</span></p>
          </div>
          <div className="bg-[#0B1E1C] rounded-xl p-4 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-1">Turun Berat</p>
            <p className="text-2xl font-bold text-[#F7F7F5]">{result.diet} <span className="text-sm text-[#B7C1BE]">kcal</span></p>
          </div>
          <div className="bg-[#0B1E1C] rounded-xl p-4 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-1">Naik Massa Otot</p>
            <p className="text-2xl font-bold text-[#F7F7F5]">{result.bulking} <span className="text-sm text-[#B7C1BE]">kcal</span></p>
          </div>
        </div>
      )}
    </div>
  )
}

// Floating WhatsApp Button
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}

// Navigation Component
function NavigationComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Menu', href: '#menu' },
    { label: 'Harga', href: '#pricing' },
    { label: 'Tanya Jawab', href: '#faq' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B1E1C]/90 backdrop-blur-xl py-4' : 'py-6'}`}>
      <div className="section-padding flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-[#F7F7F5] tracking-tight">
          Nutri<span className="text-[#D4A03A]">Box</span>
          <span className="text-xs block font-normal text-[#B7C1BE] -mt-1">Lombok</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm text-[#B7C1BE] hover:text-[#F7F7F5] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-outline py-3 px-6 text-xs">
            Mulai Sekarang
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#F7F7F5]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B1E1C]/98 backdrop-blur-xl border-t border-[#F7F7F5]/[0.08]">
          <div className="section-padding py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-[#B7C1BE] hover:text-[#F7F7F5] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary text-center mt-4" onClick={() => setIsOpen(false)}>
              Mulai Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    if (!section || !headline || !card) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headline.children, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      )
      
      gsap.fromTo(card,
        { x: 100, opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
      )

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      })

      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      )
      
      scrollTl.fromTo(card,
        { x: 0, opacity: 1, rotate: 0 },
        { x: '18vw', opacity: 0.25, rotate: 4, ease: 'power2.in' },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0B1E1C]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero_lombok.jpg" 
          alt="Makanan tradisional Lombok" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E1C]/90 via-[#0B1E1C]/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full section-padding flex items-center">
        <div ref={headlineRef} className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Dari Lombok Untuk Indonesia
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#F7F7F5] leading-[0.95] tracking-tight mb-6">
            MAKANAN<br />
            SEHAT<br />
            <span className="text-gradient">LOMBOK</span>
          </h1>
          <p className="text-lg text-[#B7C1BE] max-w-md mb-8 leading-relaxed">
            NutriBox Lombok menyajikan hidangan sehat dengan sentuhan tradisi. 
            Bahan lokal segar, cita rasa autentik Lombok.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#pricing" className="btn-primary">
              Pesan Sekarang
            </a>
            <a href="#menu" className="flex items-center gap-2 text-[#F7F7F5] hover:text-[#D4A03A] transition-colors py-4">
              Lihat Menu <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Feature Card */}
        <div 
          ref={cardRef}
          className="hidden lg:block absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-[28px] overflow-hidden shadow-2xl"
        >
          <img 
            src="/images/menu_lombok2.jpg" 
            alt="Ikan bakar Lombok" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-[#0B1E1C]/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4A03A] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#0B1E1C]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F7F7F5]">Bahan Lokal Segar</p>
              <p className="text-xs text-[#B7C1BE]">Dari Petani Lombok</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Label */}
      <div className="absolute bottom-10 right-[8vw] font-mono text-xs uppercase tracking-[0.2em] text-[#B7C1BE]">
        Tradisi Lombok • Fresh from Lombok
      </div>
    </section>
  )
}

// Problem Section
function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const problems = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Sibuk Kerja',
      desc: 'Kerja, perjalanan, hidup sehat—makanan bergizi sering tidak sempat dimasak.'
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'Bingung Porsi',
      desc: 'Sulit menyeimbangkan nutrisi tanpa perencanaan yang tepat.'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Lelah Mikir',
      desc: 'Setiap hari harus memikirkan "mau makan apa hari ini?"'
    }
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F7F7F5] leading-tight mb-6">
            MAKAN SEHAT ITU <span className="text-gradient">SUSAH?</span>
          </h2>
          <p className="text-lg text-[#B7C1BE]">
            Jika Anda merasa demikian, Anda tidak sendiri.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, idx) => (
            <div key={idx} className="card-dark p-8 lg:p-10 hover:border-[#D4A03A]/30 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-[#D4A03A]/10 flex items-center justify-center text-[#D4A03A] mb-6 group-hover:bg-[#D4A03A]/20 transition-colors">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-[#F7F7F5] mb-3">{problem.title}</h3>
              <p className="text-[#B7C1BE] leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Solution Section
function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    if (!section || !image || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(image,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo(content.children,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const features = ['Bahan Lokal Segar', 'Tanpa Ribet', 'Nutrisi Seimbang']

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="rounded-[28px] overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src="/images/menu_lombok1.jpg" 
                alt="Ayam Taliwang Lombok" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stat Card */}
            <div className="absolute -bottom-6 -right-6 lg:right-8 bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-bold text-[#D4A03A]">450</p>
              <p className="text-sm text-[#B7C1BE]">kcal rata-rata per porsi</p>
            </div>
          </div>
          
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight mb-6">
              SOLUSI SEDERHANA UNTUK <span className="text-gradient">HIDUP SEHAT</span>
            </h2>
            <p className="text-lg text-[#B7C1BE] leading-relaxed mb-8">
              Kami yang merencanakan, memasak, dan mengantar. Anda tinggal makan dan lanjutkan hari—tanpa mengorbankan nutrisi.
              Rasa Lombok autentik dalam setiap gigitan.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {features.map((feature, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A03A]/10 border border-[#D4A03A]/20 rounded-full text-sm text-[#D4A03A]"
                >
                  <Check className="w-4 h-4" /> {feature}
                </span>
              ))}
            </div>
            
            <a href="#how-it-works" className="btn-primary inline-flex items-center gap-2">
              Lihat Cara Kerja <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const steps = stepsRef.current
    const image = imageRef.current
    if (!section || !steps || !image) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      })

      scrollTl.fromTo(steps.children,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
        0
      )
      
      scrollTl.fromTo(image,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      )

      scrollTl.fromTo(steps.children,
        { x: 0, opacity: 1 },
        { x: 80, opacity: 0.25, stagger: 0.06, ease: 'power2.in' },
        0.7
      )
      
      scrollTl.fromTo(image,
        { y: 0, opacity: 1 },
        { y: 60, opacity: 0.3, ease: 'power2.in' },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Pilih Paket',
      desc: 'Pilih menu atau biarkan kami yang menyusun menu terbaik untuk Anda.'
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: 'Kami Masak & Kemas',
      desc: 'Dimasak segar setiap hari dengan bahan-bahan pilihan dari Lombok.'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Diantar ke Rumah',
      desc: 'Pengantaran harian yang terpercaya langsung ke depan pintu Anda.'
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="how-it-works" 
      className="relative w-full h-screen overflow-hidden bg-[#F4F1EA]"
    >
      <div className="section-padding h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Proses Sederhana
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1E1C] leading-tight mb-6">
              CARA KERJA <span className="text-[#D4A03A]">NUTRIBOX</span>
            </h2>
            <p className="text-lg text-[#5A6B66] leading-relaxed mb-10">
              Tiga langkah menuju hidup lebih sehat—tanpa belanja, tanpa potong-potong, tanpa bersih-bersih.
            </p>
            
            <div ref={stepsRef} className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A03A] flex items-center justify-center text-[#0B1E1C] flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1E1C] mb-1">{step.title}</h3>
                    <p className="text-[#5A6B66]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#menu" className="inline-flex items-center gap-2 mt-8 text-[#0B1E1C] font-semibold hover:text-[#D4A03A] transition-colors">
              Lihat Menu <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          {/* Right Image */}
          <div ref={imageRef} className="rounded-[28px] overflow-hidden shadow-2xl">
            <img 
              src="/images/howitworks_lombok.jpg" 
              alt="Desa tradisional Lombok" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Menu Preview Section
function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 80, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const menuItems = [
    {
      image: '/images/menu_lombok1.jpg',
      title: 'Ayam Taliwang Box',
      calories: 420,
      tag: 'Protein Tinggi',
      tagColor: 'bg-green-500/20 text-green-400'
    },
    {
      image: '/images/menu_lombok2.jpg',
      title: 'Ikan Bakar Plecing',
      calories: 380,
      tag: 'Omega-3',
      tagColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      image: '/images/menu_lombok3.jpg',
      title: 'Urap Sayur Tempe',
      calories: 350,
      tag: 'Sayuran Segar',
      tagColor: 'bg-emerald-500/20 text-emerald-400'
    }
  ]

  return (
    <section ref={sectionRef} id="menu" className="relative w-full min-h-screen bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Menu Minggu Ini
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight">
              RASA <span className="text-gradient">LOMBOK</span> AUTENTIK
            </h2>
          </div>
          <p className="text-lg text-[#B7C1BE] max-w-md">
            Menu berputar yang dirancang ahli gizi—tidak pernah membosankan, selalu seimbang.
            Cita rasa khas Lombok.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item, idx) => (
            <div key={idx} className="group">
              <div className="card-dark overflow-hidden mb-4">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[#B7C1BE]">
                      <Flame className="w-4 h-4 text-[#D4A03A]" /> {item.calories} kkal
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F7F7F5]">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Nutrition Value Section
function NutritionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bars = barsRef.current
    if (!section || !bars) return

    const ctx = gsap.context(() => {
      gsap.fromTo(bars.querySelectorAll('.progress-bar'),
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const macros = [
    { name: 'Protein', value: 28, unit: 'g', color: 'bg-[#D4A03A]' },
    { name: 'Karbohidrat', value: 42, unit: 'g', color: 'bg-emerald-500' },
    { name: 'Lemak Sehat', value: 16, unit: 'g', color: 'bg-blue-500' }
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left - Macros */}
          <div className="card-dark p-8 lg:p-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Transparansi Gizi
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight mb-4">
              APA YANG <span className="text-gradient">ADA DI DALAM</span>
            </h2>
            <p className="text-[#B7C1BE] mb-10">
              Rata-rata makro per hidangan—dirancang untuk menjaga energi tetap stabil sepanjang hari.
            </p>
            
            <div ref={barsRef} className="space-y-8">
              {macros.map((macro, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#F7F7F5] font-medium">{macro.name}</span>
                    <span className="text-[#D4A03A] font-bold">{macro.value}{macro.unit}</span>
                  </div>
                  <div className="h-3 bg-[#0B1E1C] rounded-full overflow-hidden">
                    <div 
                      className={`progress-bar h-full ${macro.color} rounded-full origin-left`}
                      style={{ width: `${(macro.value / 50) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex items-center gap-3 p-4 bg-[#D4A03A]/10 rounded-xl border border-[#D4A03A]/20">
              <Check className="w-5 h-5 text-[#D4A03A]" />
              <span className="text-sm text-[#F7F7F5]">Tanpa pengawet buatan</span>
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="rounded-[28px] overflow-hidden shadow-2xl">
            <img 
              src="/images/nutrition_lombok.jpg" 
              alt="Bahan lokal Lombok" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Target Market Section
function TargetMarketSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const targets = [
    { icon: <Zap className="w-6 h-6" />, title: 'Profesional Sibuk', desc: 'Untuk yang tidak punya waktu memasak' },
    { icon: <Heart className="w-6 h-6" />, title: 'Program Diet Sehat', desc: 'Mendukung goals kesehatan Anda' },
    { icon: <Users className="w-6 h-6" />, title: 'Fitness & Gym', desc: 'Nutrisi tepat untuk latihan optimal' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Ibu Rumah Tangga', desc: 'Praktis untuk keluarga sibuk' }
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B1E1C] py-20 lg:py-28">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Untuk Siapa
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight">
            COCOK UNTUK <span className="text-gradient">ANDA</span>
          </h2>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {targets.map((target, idx) => (
            <div key={idx} className="card-dark p-6 text-center hover:border-[#D4A03A]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/10 flex items-center justify-center text-[#D4A03A] mx-auto mb-4">
                {target.icon}
              </div>
              <h3 className="text-sm font-bold text-[#F7F7F5] mb-1">{target.title}</h3>
              <p className="text-xs text-[#B7C1BE]">{target.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const testimonials = [
    {
      image: '/images/testi_budi.jpg',
      quote: 'Saya lebih terkontrol makannya sejak pakai NutriBox. Porsinya pas dan rasanya enak banget!',
      name: 'Budi Santoso',
      age: '32',
      role: 'Karyawan Swasta'
    },
    {
      image: '/images/testi_sari.jpg',
      quote: 'Praktis banget buat orang sibuk kayak saya. NutriBox menyelamatkan waktu saya setiap minggu.',
      name: 'Sari Wulandari',
      age: '28',
      role: 'Marketing'
    },
    {
      image: '/images/testi_ahmad.jpg',
      quote: 'Makanan segar setiap hari tanpa repot. Nutrisi terjaga dengan sempurna. Recommended!',
      name: 'Ahmad Hidayat',
      age: '41',
      role: 'Pengusaha'
    }
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Testimoni
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight">
            ORANG NYATA, <span className="text-gradient">HASIL NYATA</span>
          </h2>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="card-dark p-8">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A03A] text-[#D4A03A]" />
                ))}
              </div>
              <p className="text-[#F7F7F5] leading-relaxed mb-8">
                &ldquo;{testi.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testi.image} 
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#F7F7F5]">{testi.name}</p>
                  <p className="text-sm text-[#B7C1BE]">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Founder Section
function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B1E1C] py-20 lg:py-28">
      <div className="section-padding">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Di Balik NutriBox
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight">
              KENALI <span className="text-gradient">FOUNDER</span> KAMI
            </h2>
          </div>
          
          <div className="card-dark p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Founder Photo */}
              <div className="lg:col-span-1">
                <div className="aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl">
                  <img 
                    src="/images/faq_person.jpg" 
                    alt="Founder NutriBox" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Founder Info */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#F7F7F5] mb-2">
                  Founder sekaligus Chef
                </h3>
                <p className="text-[#D4A03A] font-medium mb-6">NutriBox Lombok</p>
                
                <p className="text-[#B7C1BE] leading-relaxed mb-8">
                  &ldquo;Visi saya adalah membawa makanan sehat berkualitas ke setiap rumah di Lombok. 
                  Dengan bahan lokal segar dan tim yang berdedikasi, kami berkomitmen untuk 
                  meningkatkan gaya hidup sehat masyarakat Indonesia, khususnya warga Lombok tercinta.&rdquo;
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold text-sm hover:bg-[#128C7E] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat WhatsApp
                  </a>
                  <div className="inline-flex items-center gap-2 px-6 py-3 border border-[#F7F7F5]/20 rounded-full text-[#B7C1BE]">
                    <Phone className="w-4 h-4" />
                    {WHATSAPP_NUMBER}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Why Lombok Section
function WhyLombokSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const reasons = [
    { icon: <Leaf className="w-6 h-6" />, title: 'Bahan Lokal Segar', desc: 'Dari petani Lombok langsung ke dapur kami' },
    { icon: <Users className="w-6 h-6" />, title: 'Dukung Petani Lokal', desc: 'Kolaborasi untuk kesejahteraan bersama' },
    { icon: <Clock className="w-6 h-6" />, title: 'Produksi Harian', desc: 'Dibuat fresh setiap hari tanpa pengawet' }
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B1E1C] py-20 lg:py-28">
      <div className="section-padding">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Akar Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight mb-6">
            MENGAPA <span className="text-gradient">NUTRIBOX LOMBOK</span>?
          </h2>
          <p className="text-lg text-[#B7C1BE] mb-12 max-w-2xl mx-auto">
            Kami bangga menggunakan bahan-bahan lokal dari Lombok untuk mendukung komunitas dan menyajikan makanan terbaik.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, idx) => (
              <div key={idx} className="card-dark p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-[#D4A03A]/10 flex items-center justify-center text-[#D4A03A] mx-auto mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-[#F7F7F5] mb-2">{reason.title}</h3>
                <p className="text-sm text-[#B7C1BE]">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Pricing Section - Regular Plans
function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const plans = [
    {
      name: 'Paket Basic',
      meals: '5 Hari / Minggu',
      price: 'Rp 350.000',
      period: '/ minggu',
      features: ['5 makanan sehat', 'Gratis ongkir', 'Menu mingguan berputar'],
      highlighted: false
    },
    {
      name: 'Paket Active',
      meals: '10 Hari',
      price: 'Rp 650.000',
      period: '/ minggu',
      features: ['10 makanan sehat', 'Pengantaran prioritas', 'Menu bisa custom', 'Konsultasi gizi'],
      highlighted: true,
      badge: 'Paling Populer'
    },
    {
      name: 'Paket Bulanan',
      meals: '20 Hari',
      price: 'Rp 1.200.000',
      period: '/ bulan',
      features: ['20 makanan sehat', 'Pengantaran VIP', 'Full custom', 'Nutritionist pribadi'],
      highlighted: false
    }
  ]

  return (
    <section ref={sectionRef} id="pricing" className="relative w-full bg-[#0B1E1C] py-24 lg:py-32">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Harga
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight mb-4">
            PILIH PAKET <span className="text-gradient">ANDA</span>
          </h2>
          <p className="text-lg text-[#B7C1BE]">
            Langganan fleksibel. Bisa dijeda kapan saja.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-[28px] p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-[#D4A03A]/20 to-[#0F2A27] border-2 border-[#D4A03A]' 
                  : 'card-dark'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4A03A] text-[#0B1E1C] text-xs font-bold rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-[#F7F7F5] mb-1">{plan.name}</h3>
              <p className="text-sm text-[#B7C1BE] mb-4">{plan.meals}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#F7F7F5]">{plan.price}</span>
                <span className="text-[#B7C1BE]">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-[#B7C1BE]">
                    <Check className="w-4 h-4 text-[#D4A03A]" /> {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted 
                    ? 'bg-[#D4A03A] text-[#0B1E1C] hover:bg-[#E5B14B]' 
                    : 'border border-[#F7F7F5]/20 text-[#F7F7F5] hover:border-[#D4A03A] hover:text-[#D4A03A]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Pesan Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Special Dietary Needs Section
function SpecialDietarySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards.children,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const specialPlans = [
    {
      name: 'Paket Diabetes',
      icon: <Droplets className="w-8 h-8" />,
      desc: 'Menu rendah gula dengan indeks glikemik rendah',
      price: 'Rp 450.000',
      period: '/ minggu',
      features: ['5 makanan sehat', 'Rendah gula (GI rendah)', 'Konsultasi ahli gizi', 'Monitoring gula darah'],
      highlighted: false
    },
    {
      name: 'Paket Hipertensi',
      icon: <Activity className="w-8 h-8" />,
      desc: 'Menu rendah sodium untuk tekanan darah stabil',
      price: 'Rp 450.000',
      period: '/ minggu',
      features: ['5 makanan sehat', 'Rendah garam', 'Kaya kalium', 'Konsultasi ahli gizi'],
      highlighted: false
    },
    {
      name: 'Paket Jantung Sehat',
      icon: <Heart className="w-8 h-8" />,
      desc: 'Menu sehat jantung dengan lemak baik',
      price: 'Rp 500.000',
      period: '/ minggu',
      features: ['5 makanan sehat', 'Omega-3 tinggi', 'Rendah lemak jahat', 'Konsultasi ahli gizi'],
      highlighted: true,
      badge: 'Rekomendasi'
    }
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B1E1C] py-24 lg:py-32 border-t border-[#F7F7F5]/[0.08]">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
            Kebutuhan Khusus
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight mb-4">
            PAKET <span className="text-gradient">KEBUTUHAN KHUSUS</span>
          </h2>
          <p className="text-lg text-[#B7C1BE]">
            Menu khusus untuk Anda dengan kondisi kesehatan tertentu. 
            Dibuat dengan arahan ahli gizi profesional.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {specialPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-[28px] p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-[#D4A03A]/20 to-[#0F2A27] border-2 border-[#D4A03A]' 
                  : 'card-dark'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4A03A] text-[#0B1E1C] text-xs font-bold rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="w-16 h-16 rounded-2xl bg-[#D4A03A]/10 flex items-center justify-center text-[#D4A03A] mb-4">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-[#F7F7F5] mb-2">{plan.name}</h3>
              <p className="text-sm text-[#B7C1BE] mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#F7F7F5]">{plan.price}</span>
                <span className="text-[#B7C1BE]">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-[#B7C1BE]">
                    <Check className="w-4 h-4 text-[#D4A03A]" /> {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted 
                    ? 'bg-[#D4A03A] text-[#0B1E1C] hover:bg-[#E5B14B]' 
                    : 'border border-[#F7F7F5]/20 text-[#F7F7F5] hover:border-[#D4A03A] hover:text-[#D4A03A]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasi Gratis
              </a>
            </div>
          ))}
        </div>
        
        {/* Calorie Calculator */}
        <div className="max-w-4xl mx-auto">
          <CalorieCalculator />
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Apakah menu bisa custom?',
      answer: 'Ya! Anda dapat memilih dari berbagai menu kami atau memberitahu kami preferensi diet Anda. Kami akan sesuaikan dengan kebutuhan Anda.'
    },
    {
      question: 'Apakah bisa untuk diet tertentu?',
      answer: 'Tentu saja. Kami mendukung berbagai diet termasuk keto, vegan, gluten-free, dan lainnya. Silakan hubungi kami untuk konsultasi.'
    },
    {
      question: 'Bagaimana sistem pengiriman?',
      answer: 'Kami mengantar setiap pagi ke lokasi Anda. Anda bisa memilih slot waktu pengiriman yang paling nyaman.'
    },
    {
      question: 'Apakah makanan fresh setiap hari?',
      answer: 'Absolut! Semua makanan dibuat fresh setiap hari tanpa pengawet. Kami prioritaskan kualitas dan kesegaran.'
    }
  ]

  return (
    <section ref={sectionRef} id="faq" className="relative w-full bg-[#0B1E1C] py-20 lg:py-28">
      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Tanya Jawab
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F7F5] leading-tight">
              PERTANYAAN <span className="text-gradient">UMUM</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="card-dark overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[#F7F7F5]">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-[#D4A03A] transition-transform ${openIndex === idx ? 'rotate-90' : ''}`} />
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-[#B7C1BE] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Form Component - Sends to WhatsApp/Email
function ContactForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    paket: 'Paket Basic - 5 Hari/Minggu',
    pesan: ''
  })
  const [submitMethod, setSubmitMethod] = useState<'whatsapp' | 'email'>('whatsapp')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format message
    const message = `*Pesanan NutriBox Lombok*

*Nama:* ${formData.nama}
*Email:* ${formData.email}
*Telepon:* ${formData.telepon}
*Paket:* ${formData.paket}
*Pesan:* ${formData.pesan || '-'}

Mohon konfirmasi pesanan saya. Terima kasih!`

    if (submitMethod === 'whatsapp') {
      const encodedMessage = encodeURIComponent(message)
      window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank')
    } else {
      const subject = encodeURIComponent(`Pesanan NutriBox - ${formData.nama}`)
      const body = encodeURIComponent(message)
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-dark p-8 lg:p-10">
      <h3 className="text-2xl font-bold text-[#F7F7F5] mb-6">Dapatkan Paket Saya</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Nama</label>
          <input 
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama lengkap"
            required
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Email</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Telepon</label>
          <input 
            type="tel"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            placeholder="+62 xxx xxxx xxxx"
            required
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Pilih Paket</label>
          <select 
            name="paket"
            value={formData.paket}
            onChange={handleChange}
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors"
          >
            <option>Paket Basic - 5 Hari/Minggu</option>
            <option>Paket Active - 10 Hari</option>
            <option>Paket Bulanan - 20 Hari</option>
            <option>Paket Diabetes</option>
            <option>Paket Hipertensi</option>
            <option>Paket Jantung Sehat</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#B7C1BE] mb-2">Pesan</label>
          <textarea 
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            rows={3}
            placeholder="Tulis pesan atau permintaan khusus..."
            className="w-full bg-[#0B1E1C] border border-[#F7F7F5]/10 rounded-xl px-4 py-3 text-[#F7F7F5] focus:border-[#D4A03A] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Method Selection */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => setSubmitMethod('whatsapp')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              submitMethod === 'whatsapp' 
                ? 'bg-[#25D366] text-white' 
                : 'bg-[#0B1E1C] border border-[#F7F7F5]/20 text-[#B7C1BE] hover:border-[#25D366]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setSubmitMethod('email')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              submitMethod === 'email' 
                ? 'bg-[#D4A03A] text-[#0B1E1C]' 
                : 'bg-[#0B1E1C] border border-[#F7F7F5]/20 text-[#B7C1BE] hover:border-[#D4A03A]'
            }`}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          {submitMethod === 'whatsapp' ? (
            <><MessageCircle className="w-5 h-5" /> Kirim ke WhatsApp</>
          ) : (
            <><Mail className="w-5 h-5" /> Kirim ke Email</>
          )}
        </button>
      </div>
    </form>
  )
}

// Final CTA Section
function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const form = formRef.current
    if (!section || !form) return

    const ctx = gsap.context(() => {
      gsap.fromTo(form,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative w-full min-h-screen bg-[#0B1E1C]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/cta_lombok.jpg" 
          alt="Pemandangan Lombok" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E1C]/95 via-[#0B1E1C]/70 to-[#0B1E1C]/40" />
      </div>
      
      <div className="relative h-full section-padding py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto min-h-[80vh]">
          {/* Left Content */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A] mb-4 block">
              Mulai Sekarang
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F7F7F5] leading-tight mb-6">
              MULAI HIDUP <span className="text-gradient">LEBIH SEHAT</span> HARI INI
            </h2>
            <p className="text-lg text-[#B7C1BE] leading-relaxed mb-8">
              NutriBox Lombok siap membantu Anda menjaga keseimbangan nutrisi setiap hari. 
              Hubungi kami untuk mendapatkan rencana makan yang sesuai.
            </p>
            
            {/* Address with Coordinates */}
            <div className="card-dark p-6 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#F7F7F5] mb-1">Alamat Kami</h4>
                  <p className="text-sm text-[#B7C1BE] leading-relaxed">{COMPANY_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#B7C1BE] pl-14">
                <MapPinned className="w-4 h-4 text-[#D4A03A]" />
                <span>Koordinat: {COMPANY_COORDS}</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>
              <a 
                href={`mailto:${EMAIL}`}
                className="btn-outline inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Kami
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-[#B7C1BE]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A03A]" />
                {WHATSAPP_NUMBER}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A03A]" />
                {EMAIL}
              </div>
            </div>
          </div>
          
          {/* Right Form */}
          <div ref={formRef}>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative border-t border-[#F7F7F5]/[0.08] py-8">
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            {/* Logo & Tagline */}
            <div>
              <a href="#" className="text-2xl font-bold text-[#F7F7F5] tracking-tight">
                Nutri<span className="text-[#D4A03A]">Box</span>
              </a>
              <p className="text-xs text-[#B7C1BE] mt-1">Fresh from Lombok</p>
              <p className="text-sm text-[#B7C1BE] mt-2">Makanan sehat bergizi, rasa Lombok autentik.</p>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#F7F7F5] mb-3">Kontak</h4>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#B7C1BE] hover:text-[#D4A03A] transition-colors mb-2"
              >
                <MessageCircle className="w-4 h-4" />
                {WHATSAPP_NUMBER}
              </a>
              <a 
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-[#B7C1BE] hover:text-[#D4A03A] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {EMAIL}
              </a>
            </div>
            
            {/* Address */}
            <div>
              <h4 className="font-semibold text-[#F7F7F5] mb-3">Alamat</h4>
              <p className="text-sm text-[#B7C1BE] leading-relaxed">{COMPANY_ADDRESS}</p>
              <p className="text-xs text-[#B7C1BE] mt-1">Koordinat: {COMPANY_COORDS}</p>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-[#F7F7F5]/[0.08]">
            <p className="text-sm text-[#B7C1BE]">
              © {new Date().getFullYear()} NutriBox Lombok. Fresh from Lombok.
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}

// Main App Component
function App() {
  useEffect(() => {
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)
      
      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02)
            if (!inPinned) return value

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      })
    }

    const timer = setTimeout(setupSnap, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <NavigationComponent />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <MenuSection />
        <NutritionSection />
        <TargetMarketSection />
        <TestimonialsSection />
        <FounderSection />
        <WhyLombokSection />
        <PricingSection />
        <SpecialDietarySection />
        <FAQSection />
        <FinalCTASection />
      </main>
    </div>
  )
}

export default App
