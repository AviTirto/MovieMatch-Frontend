import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function MovieCard(props) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden w-9/12 shadow-2xl mb-10 cursor-pointer"
      onClick={() => setIsVisible(!isVisible)}
    >
      <img
        src={props.movie.posterUrl}
        alt={props.movie.title}
        className="w-full h-auto z-0"
        draggable="false"
      />

      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-10 bg-black/80 text-white p-4 overflow-y-auto"
          >
            <h1 className="text-xl font-bold">{props.movie.title}</h1>
            <p>{props.movie.rating}</p>
            <p>{props.movie.year}</p>
            {props.movie.director.map(d => <p key={d}>{d}</p>)}
            {props.movie.genres.map(g => <p key={g}>{g}</p>)}
            {props.movie.services.map(s => <p key={s}>{s}</p>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
