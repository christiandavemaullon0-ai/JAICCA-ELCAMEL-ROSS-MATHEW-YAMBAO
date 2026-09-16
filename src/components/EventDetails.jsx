import {
  Clock3,
  MapPin,
  Sparkles
} from "lucide-react";

import SectionReveal from "./SectionReveal";
import { EVENT_DETAILS } from "../data/eventDetails";


function DetailCard({
  label,
  title,
  time,
  venue,
  address
}) {

  return (

    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-blush-200/50
        bg-beige-100
        p-7
        shadow-luxe
        transition-all
        duration-500
        hover:-translate-y-1
        sm:p-9
      "
    >

      {/* Pink glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-blush-200/40
          blur-3xl
          transition
          group-hover:bg-blush-200/60
        "
      />



      <div className="relative">


        {/* Icon */}

        <div
          className="
            mb-8
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-gold/40
            bg-cream
            text-gold
          "
        >

          <Sparkles size={22}/>

        </div>



        <p
          className="
            mb-3
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-navy-800/60
          "
        >
          {label}
        </p>



        <h3
          className="
            break-words
            font-display
            text-4xl
            leading-tight
            text-navy-900
          "
        >
          {title}
        </h3>




        <div
          className="
            mt-8
            space-y-5
            text-sm
            leading-7
            text-navy-800/70
          "
        >


          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <Clock3
              size={18}
              className="
                mt-1
                shrink-0
                text-gold
              "
            />

            <span>
              {time}
            </span>

          </div>



          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <MapPin
              size={18}
              className="
                mt-1
                shrink-0
                text-gold
              "
            />

            <div>

              <p>
                {venue}
              </p>


              <p
                className="
                  text-xs
                  text-navy-800/50
                "
              >
                {address}
              </p>


            </div>


          </div>


        </div>


      </div>


    </article>

  );
}



export default function EventDetails() {


  return (

    <section
      id="details"
      className="
        relative
        overflow-hidden
        bg-navy-900
        px-5
        py-24
        text-cream
        sm:px-8
        sm:py-32
      "
    >


      {/* Pink background accents */}

      <div
        className="
          absolute
          -left-32
          top-20
          h-80
          w-80
          rounded-full
          bg-blush-200/20
          blur-3xl
        "
      />


      <div
        className="
          absolute
          -bottom-20
          -right-20
          h-96
          w-96
          rounded-full
          bg-blush-100/20
          blur-3xl
        "
      />



      <SectionReveal
        className="
          relative
          mx-auto
          w-full
          max-w-6xl
        "
      >



        <div
          className="
            text-center
          "
        >

          <p
            className="
              mb-3
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-gold
            "
          >
            The Celebration
          </p>



          <h2
            className="
              font-display
              text-5xl
              leading-tight
              text-cream
              sm:text-6xl
            "
          >
            Wedding Details
          </h2>



          <div
            className="
              mx-auto
              mt-6
              h-px
              w-28
              bg-gradient-to-r
              from-transparent
              via-gold
              to-transparent
            "
          />

        </div>





        <div
          className="
            mt-14
            grid
            w-full
            gap-7
            md:grid-cols-2
          "
        >


          <DetailCard

            label={
              EVENT_DETAILS.ceremony.label
            }

            title={
              EVENT_DETAILS.ceremony.title
            }

            time={
              EVENT_DETAILS.ceremony.time
            }

            venue={
              EVENT_DETAILS.ceremony.venue
            }

            address={
              EVENT_DETAILS.ceremony.address
            }

          />




          <DetailCard

            label={
              EVENT_DETAILS.reception.label
            }

            title={
              EVENT_DETAILS.reception.title
            }

            time={
              EVENT_DETAILS.reception.time
            }

            venue={
              EVENT_DETAILS.reception.venue
            }

            address={
              EVENT_DETAILS.reception.address
            }

          />


        </div>



      </SectionReveal>



    </section>

  );

}