import React from "react";
import { motion } from "framer-motion";

const MotionCard = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;