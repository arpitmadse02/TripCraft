import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* Thin Black Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center sm:px-6 md:px-10 lg:px-20">
          
<h1 className="text-xl font-bold text-white sm:text-2xl md:text-5xl lg:text-5xl">
            Every Journey Deserves a Perfect Plan
          </h1>
          
<p className="max-w-4xl text-lg text-white sm:text-xl md:text-2xl">
Smart recommendations built around your preferences.          </p>
          <br />
          <Link to="/create-trip">
            <Button className="px-9 py-7 text-lg font-semibold text-white transition bg-[#43a5c0] rounded-full shadow-lg hover:bg-[#046f8d]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
<br /><br />
      {/* ================= ICON + TEXT SECTION ================= */}
      <div className="flex flex-col items-center mt-6 space-y-6 text-center font-[Righteous]">

        {/* Icons Row */}
        <div className="flex items-center justify-center gap-10">
          <img src="/earth.png" className="w-[80px] h-[80px]" />
          <img src="/hiking.png" className="w-[80px] h-[80px]" />
          <img src="/beach.png" className="w-[80px] h-[80px]" />
          <img src="/mountain.png" className="w-[80px] h-[80px]" />
        </div>
<br />
        {/* First Line */}
        <p className="text-[#454545] font-poppins font-bold mb-1 text-[32px]">
          You’re always a short detour from an
        </p>

        {/* Second Line + Underline */}
        <h2 className="text-[#454545] font-poppins font-bold leading-tight text-[52px]">
          Extraordinary Place
          <div className="w-[560px] h-[2.5px] mx-auto mt-1 bg-[#f7d76c] rounded-full"></div>
        </h2>
      </div>
<br /><br />
      {/* ================= GALLERY SECTION ================= */}
      <section className="px-4 py-8 bg-blue-50 md:px-12 lg:px-20">
        

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Varanasi', image: '/varanasi.jpg' },
            { name: 'Varkala', image: '/varkala.jpg' },
            { name: 'Manali', image: '/manali.jpg' },
            { name: 'Jaipur', image: '/jaipur.jpg' },
            { name: 'Kanyakumari', image: '/kanyakumari.jpg' },
            { name: 'Meghalaya', image: '/meghalaya.jpg' },
          ].map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-36 md:h-56 lg:h-64"
              />
              <div className="absolute bottom-0 left-0 w-full px-3 py-1 text-sm font-medium text-white bg-black/50 md:text-base md:px-4 md:py-2">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-4 mt-20 text-center sm:px-6 lg:px-8">
          <h3 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
            Ready to Plan Your Perfect Trip?
          </h3>
          <p className="max-w-xl mx-auto mb-6 text-sm text-gray-600 sm:text-base">
            Create memorable travel experiences effortlessly with TripCraft.
          </p>
          <Link to="/create-trip">
            <Button className="px-6 py-3 text-base font-semibold text-white bg-[#43a5c0] rounded-full shadow-md hover:bg-[#046f8d]">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 mt-16 text-sm text-center text-gray-500 bg-white">
        © {new Date().getFullYear()} TripCraft – Your AI Trip Planner
      </footer>
    </>
  );
}

export default Hero;
