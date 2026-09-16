import { motion } from "framer-motion";
import Countdown from "./Countdown";
import SectionReveal from "./SectionReveal";
import { EVENT_DETAILS } from "../data/eventDetails";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-beige
        px-5
        py-24
        sm:px-8
      "
    >

      {/* Pink watercolor glow */}
      <div
        className="
          absolute
          -left-32
          -top-20
          h-80
          w-80
          rounded-full
          bg-blush-200/50
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-20
          h-96
          w-96
          rounded-full
          bg-blush-100/70
          blur-3xl
        "
      />


      {/* Floral decorative corner */}
      <div
        className="
          absolute
          right-0
          top-0
          h-48
          w-48
          bg-[url('/images/floral-corner.svg')]
          bg-contain
          bg-no-repeat
          opacity-60
        "
      />


      {/* Floating petals */}
      <div className="petals">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            style={{
              "--i": index,
            }}
          />
        ))}
      </div>



      <SectionReveal
        className="
          relative
          mx-auto
          flex
          min-h-[80vh]
          w-full
          max-w-6xl
          items-center
          justify-center
        "
      >

        <div
          className="
            w-full
            text-center
          "
        >

          <motion.p
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              duration:.8
            }}
            className="
              mb-5
              text-xs
              uppercase
              tracking-[0.45em]
              text-navy-800/70
            "
          >
            Together with their families
          </motion.p>



          <motion.h1
            initial={{
              opacity:0,
              y:30
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              duration:1
            }}
            className="
              mx-auto
              max-w-5xl
              break-words
              font-display
              text-5xl
              leading-[0.9]
              text-navy-900
              sm:text-7xl
              lg:text-8xl
            "
          >

            {EVENT_DETAILS.couple.partnerOne}

            <span
              className="
                block
                my-5
                font-display
                text-3xl
                text-blush-500
                sm:text-5xl
              "
            >
              &
            </span>

            {EVENT_DETAILS.couple.partnerTwo}

          </motion.h1>



          <motion.div
            initial={{
              opacity:0
            }}
            animate={{
              opacity:1
            }}
            transition={{
              delay:.5,
              duration:.8
            }}
            className="
              mx-auto
              mt-8
              h-px
              w-32
              bg-gradient-to-r
              from-transparent
              via-gold
              to-transparent
            "
          />



          <motion.p
            initial={{
              opacity:0
            }}
            animate={{
              opacity:1
            }}
            transition={{
              delay:.7
            }}
            className="
              mt-7
              text-sm
              uppercase
              tracking-[0.35em]
              text-navy-800
            "
          >

            <span className="text-blush-500">
              {EVENT_DETAILS.displayDate}
            </span>

          </motion.p>



          <Countdown />



          <motion.div
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:1
            }}
            className="
              mx-auto
              mt-10
              flex
              justify-center
            "
          >

            <a
              href="#invitation"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-navy-900
                px-8
                py-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-navy-900
                transition
                hover:bg-navy-900
                hover:text-cream
              "
            >
              View Invitation
            </a>

          </motion.div>


        </div>

      </SectionReveal>


    </section>
  );
}