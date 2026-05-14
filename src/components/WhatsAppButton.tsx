import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "923303093773";
  const message = encodeURIComponent("Hello, I'm interested in your digital services. Can we discuss?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        Quick Chat on WhatsApp
        <div className="absolute top-full right-5 w-2 h-2 bg-white rotate-45" />
      </div>
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  );
}
