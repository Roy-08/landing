import Image from "next/image";

export default function Home() {
  const steps = [
    "Book a call and fill out the short application in detail",
    "We'll review your application and speak with you to see if you're a good fit",
    "Limited members will be accepted",
    "The Batch will starts this Month",
    "Serious participants apply only. Application fees is non refundable",
  ];

  const testimonials = [
    { id: 1, title: "Client Testimonial 1", videoId: "LMvgJ7QYkUQ" },
    { id: 2, title: "Client Testimonial 2", videoId: "f_0WiazKeMI" },
  ];

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-[#4a2060]">
            Happiness Holistic Clinic
          </span>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">Home</a>
            <a href="#about" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">About</a>
            <a href="#testimonials" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">Testimonials</a>
            <a href="#get-started" className="text-[#4a2060] font-medium hover:text-[#c8963e] transition-colors">Get Started</a>
          </nav>
          <Image src="/logo.png" alt="Dr. Vrushali Logo" width={40} height={40} />
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
        style={{ background: "linear-gradient(180deg, #e8dff5 0%, #fce8d5 100%)" }}
      >
        
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#c8963e] leading-tight">
            Hi, I am Dr. Vrushali Saraswat
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#4a2060]">
            Doctor by Profession, Healer by Choice!
          </h2>
          <p className="text-base md:text-lg text-[#4a2060]/80 max-w-2xl mx-auto leading-relaxed">
            I help accomplished professionals master emotional well-being, purpose, and happiness without slowing down their ambition.
          </p>
          <div className="w-24 h-px bg-[#4a2060]/20 mx-auto my-4"></div>
          <a
            href="#get-started"
            className="inline-block bg-[#c8963e] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#b5842f] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6" style={{ background: "#fdf0e4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/dr_vrushali.jpg"
                alt="Dr. Vrushali Saraswat"
                width={500}
                height={600}
                className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#c8963e]">
                About Dr. Vrushali Saraswat
              </h2>
              <h3 className="text-xl font-semibold text-[#4a2060]">
                Doctor by Profession. Healer by Choice.
              </h3>
              <div className="space-y-4 text-[#3d3d3d] leading-relaxed">
                <p>For over 25 years, I have been helping people heal not just physically, but emotionally, mentally, and spiritually.</p>
                <p>I am Dr. Vrushali Saraswat, a Homoeopathic Physician, Happiness Coach, Author, and Speaker who has impacted more than 38,000 lives across 20+ countries through consultations, workshops, seminars, and transformational programs.</p>
                <p>Over the years, I noticed a common pattern. Many people looked successful on the outside but felt disconnected, exhausted, and unfulfilled on the inside. They had achieved career milestones, built families, and earned respect yet struggled to experience genuine happiness, peace, and meaning.</p>
                <p>That realization led me to create <span className="font-semibold text-[#c8963e]">UPLIFT</span>.</p>
                <p>UPLIFT is a transformational journey designed to help high-performing individuals reconnect with themselves, overcome burnout, build emotional resilience, and create a life that feels as good on the inside as it looks on the outside.</p>
                <p>My work blends the best of medical science, psychology, neuroscience, emotional wellness, and timeless wisdom, creating practical tools that lead to lasting change not temporary motivation.</p>
                <p>Whether I am working with entrepreneurs, doctors, corporate leaders, educators, or individuals seeking a deeper sense of purpose, my mission remains the same:</p>
                <p className="font-semibold text-[#4a2060] italic">Mission: To help people stop merely surviving and start living with clarity, confidence, joy, and inner freedom.</p>
                <p>Because true success is not just about what you achieve. It&apos;s about who you become while achieving it.</p>
                <p>Through my 12-week UPLIFT Program, I help founders, doctors, CXOs, and professionals overcome burnout, regain clarity, strengthen relationships, and build a life that feels as good on the inside as it looks on the outside.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="py-20 px-6"
        style={{ background: "linear-gradient(180deg, #e8dff5 0%, #fce8d5 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a2060] text-center mb-12">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${t.videoId}`}
                    title={t.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="bg-[#4a2060] py-3 px-4">
                  <p className="text-white text-sm font-medium text-center">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED SECTION */}
      <section
        id="get-started"
        className="py-20 px-6"
        style={{ background: "linear-gradient(180deg, #fce8d5 0%, #e8dff5 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c8963e] mb-12">
            How To Get Started
          </h2>
          <div className="space-y-5 text-left max-w-xl mx-auto mb-12">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#c8963e] flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#4a2060] font-medium text-base leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:heal@drvrushali.com"
            className="inline-block bg-[#c8963e] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#b5842f] transition-all duration-300 mb-12"
          >
            BOOK CLARITY CALL
          </a>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
            <p className="text-[#4a2060] font-bold text-lg mb-2">Limited slots left!</p>
            <p className="text-[#4a2060]">
              Any Questions? Email Us To:{" "}
              <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] font-semibold hover:underline">
                heal@drvrushali.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4a2060] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-80">© 2025 Dr. Vrushali Saraswat | Happiness Holistic Clinic. All rights reserved.</p>
          <p className="text-sm opacity-60 mt-2">Contact: heal@drvrushali.com</p>
        </div>
      </footer>
    </div>
  );
}