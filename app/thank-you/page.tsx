'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaPhone, FaEnvelope, FaCopy, FaCheck, FaChartBar } from 'react-icons/fa';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [requestId, setRequestId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    const localId = typeof window !== 'undefined' ? localStorage.getItem('last_request_id') : null;
    
    if (id) {
      setRequestId(id);
    } else if (localId) {
      setRequestId(localId);
    } else {
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      setRequestId(`SR-${randomDigits}`);
    }
  }, [searchParams]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-4 right-4 bg-[#22c55e] text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300">
          Copied to clipboard!
        </div>
      )}

      {/* Hero Section */}
      <section className="h-[60vh] flex flex-col justify-center items-center text-center px-4" style={{ background: 'linear-gradient(135deg, #D4AF37, #1a1a1a)' }}>
        <FaCheckCircle className="text-[#22c55e] text-[80px] mb-6 animate-bounce" />
        <h1 className="text-4xl md:text-[48px] font-bold text-white mb-4">Consultation Request Submitted!</h1>
        <p className="text-xl md:text-[24px] text-gray-200">Thank you for choosing Star Crown Tour</p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-16 sm:-mt-24 relative z-10">
        
        {/* Request ID Box */}
        <div className="text-center mb-16">
          <h2 className="text-2xl text-gray-300 mb-2">Your Request ID</h2>
          <div className="border-[3px] border-[#D4AF37] bg-[#2d2d2d] p-8 rounded-xl max-w-[500px] mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-4xl md:text-[48px] text-[#D4AF37] font-bold">{requestId}</span>
              <button 
                onClick={handleCopy}
                className="bg-[#D4AF37] p-3 rounded hover:bg-[#D4AF37]/90 transition-colors"
                title="Copy Request ID"
              >
                {copied ? <FaCheck className="text-[#1a1a1a] text-xl" /> : <FaCopy className="text-[#1a1a1a] text-xl" />}
              </button>
            </div>
            <p className="text-[#A0A0A0]">Save this ID for your records</p>
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="mb-16">
          <h2 className="text-[32px] font-bold text-[#D4AF37] text-center mb-8">What&apos;s Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300">
              <FaPhone className="text-[#A0A0A0] text-[32px] mb-4" />
              <h3 className="text-xl font-bold mb-2">We&apos;ll Contact You Soon</h3>
              <p className="text-[#A0A0A0]">Our team will reach out within 24 hours via phone or email</p>
            </div>
            <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300">
              <FaEnvelope className="text-[#A0A0A0] text-[32px] mb-4" />
              <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
              <p className="text-[#A0A0A0]">We&apos;ve sent a confirmation email with your request details</p>
            </div>
            <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-all duration-300">
              <FaChartBar className="text-[#A0A0A0] text-[32px] mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Your Quote</h3>
              <p className="text-[#A0A0A0]">Use your Request ID to track quote status anytime</p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-[#2d2d2d] rounded-lg p-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#444]">
          <div className="flex flex-col md:pr-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FaPhone className="text-[#D4AF37]" /> Call Us</h3>
            <a href="tel:03099961987" className="text-lg text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-2">03099961987</a>
            <p className="text-[#A0A0A0]">418-B, Khurram Plaza, Chandni Chowk, Rawalpindi</p>
          </div>
          <div className="flex flex-col md:pl-8 pt-8 md:pt-0">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FaEnvelope className="text-[#D4AF37]" /> Email & Hours</h3>
            <a href="mailto:info@starcrowntoursofficial.com" className="text-lg text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-2">info@starcrowntoursofficial.com</a>
            <p className="text-[#A0A0A0]">Mon-Fri 9:00 AM - 6:00 PM</p>
            <p className="text-[#A0A0A0]">Sat 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => router.push('/services')}
            className="bg-[#D4AF37] text-[#1a1a1a] px-8 py-3 rounded font-bold hover:bg-[#D4AF37]/90 transition-colors"
          >
            Explore More Services
          </button>
          <button 
            onClick={() => router.push('/')}
            className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded font-bold hover:bg-[#D4AF37]/10 transition-colors"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
