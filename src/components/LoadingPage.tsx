import { motion } from 'framer-motion'

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-20 h-20 mx-auto mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-lavender via-brand-linen to-brand-pastel-petal rounded-full opacity-75 blur-lg" />
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="relative"
          >
            <path
              d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7.5L12 8.5L13 7.5C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
              fill="#B3A7C9"
            />
            <path
              d="M8 8C6.5 8 5.5 9 5.5 10.5C5.5 11.5 6 12.5 7 13.5L8 14.5L9 13.5C10 12.5 10.5 11.5 10.5 10.5C10.5 9 9.5 8 8 8Z"
              fill="#EDA9C9"
            />
            <path
              d="M16 8C14.5 8 13.5 9 13.5 10.5C13.5 11.5 14 12.5 15 13.5L16 14.5L17 13.5C18 12.5 18.5 11.5 18.5 10.5C18.5 9 17.5 8 16 8Z"
              fill="#FFCEC5"
            />
          </svg>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-light tracking-[0.3em] text-brand-graphite"
        >
          aidee
        </motion.h2>
      </motion.div>
    </div>
  )
}
