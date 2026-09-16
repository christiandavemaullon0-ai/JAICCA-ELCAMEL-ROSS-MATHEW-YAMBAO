import SectionReveal from './SectionReveal';

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=82',
    alt: 'Romantic wedding moment',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=82',
    alt: 'Elegant wedding celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=82',
    alt: 'Elegant wedding tablescape',
  },
  {
    src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=82',
    alt: 'Romantic floral detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=82',
    alt: 'Wedding stationery detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82',
    alt: 'Wedding couple celebrating',
  },
];

export default function Gallery() {
  return (
    <section className="bg-beige-200 px-5 py-24 sm:px-8 sm:py-32">
      <SectionReveal className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="section-kicker">A little glimpse</p>
          <h2 className="section-title">Moments & Memories</h2>
        </div>

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-5 lg:grid-cols-3">
          {PHOTOS.map((photo, index) => (
            <figure
              key={`${photo.src}-${index}`}
              className={`overflow-hidden rounded-[1.4rem] shadow-sm ${
                index === 0 || index === 5 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
