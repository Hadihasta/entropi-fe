import { motion } from "framer-motion";

export default function SkeletonDot() {
  const dot = {
    initial: { y: 0 },
    animate: { y: -6 },
  };

  return (
    <div className="w-full">
      <div
        className="
          w-full
          rounded-xl
          bg-glass 
          border border-[var(--glass-border)]
          p-10
          flex items-center justify-center
        "
      >
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={dot}
              initial="initial"
              animate="animate"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.4,
                delay: i * 0.15,
              }}
              className="w-3 h-3 bg-white/100 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
