import SectionReveal from "./SectionReveal";
import { Heart } from "lucide-react";

export default function Story() {
  return (
    <section
      id="invitation"
      className="
        relative
        overflow-hidden
        bg-cream
        px-5
        py-24
        sm:px-8
        sm:py-32
      "
    >

      {/* Pink watercolor accents */}

      <div
        className="
          absolute
          -left-32
          top-10
          h-72
          w-72
          rounded-full
          bg-blush-200/40
          blur-3xl
        "
      />


      <div
        className="
          absolute
          -right-32
          bottom-10
          h-80
          w-80
          rounded-full
          bg-blush-100/60
          blur-3xl
        "
      />



      <SectionReveal
        className="
          relative
          mx-auto
          w-full
          max-w-4xl
        "
      >

        <div
          className="
            text-center
          "
        >


          <p
            className="
              mb-4
              text-[10px]
              uppercase
              tracking-[0.45em]
              text-gold
            "
          >
            Our Story
          </p>



          <h2
            className="
              font-display
              text-5xl
              leading-tight
              text-navy-900
              sm:text-6xl
            "
          >
            A Love Worth Celebrating
          </h2>




          {/* Pink + gold divider */}

          <div
            className="
              mx-auto
              my-8
              flex
              items-center
              justify-center
              gap-4
            "
          >

            <span
              className="
                h-px
                w-20
                bg-gradient-to-r
                from-transparent
                to-blush-200
              "
            />


            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-gold/40
                bg-beige-100
                text-blush-500
              "
            >

              <Heart
                size={18}
                fill="currentColor"
              />

            </div>


            <span
              className="
                h-px
                w-20
                bg-gradient-to-l
                from-transparent
                to-blush-200
              "
            />


          </div>






          <p
            className="
              mx-auto
              max-w-3xl
              text-base
              leading-8
              text-navy-800/70
              sm:text-lg
            "
          >

            With hearts full of love and gratitude,
            we invite you to join us as we begin a
            beautiful new chapter together.

            <br />
            <br />

            Your presence will make our wedding day
            even more meaningful as we celebrate
            love, family, and the memories we will
            cherish forever.

          </p>





          {/* Signature */}

          <div
            className="
              mt-10
              flex
              flex-col
              items-center
            "
          >

            <div
              className="
                h-px
                w-24
                bg-gold/50
              "
            />


            <p
              className="
                mt-5
                font-display
                text-3xl
                text-navy-900
              "
            >
              Jaicca & Ross
            </p>


          </div>



        </div>


      </SectionReveal>


    </section>
  );
}