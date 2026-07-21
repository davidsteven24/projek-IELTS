import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F2F2F2]/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center select-none">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-neutral-200" />
        <motion.div 
          variants={spinnerVariants}
          animate="animate"
          className="absolute inset-0 rounded-full border-4 border-t-[#FF9233] border-r-transparent border-b-transparent border-l-transparent"
        />
      </div>
    </div>
  );
}