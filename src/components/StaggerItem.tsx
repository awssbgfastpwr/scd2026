import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
      {children}
    </motion.div>
  );
}
