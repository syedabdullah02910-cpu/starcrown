import Link from "next/link";
import { FiStar, FiClock, FiArrowRight, FiMapPin } from "react-icons/fi";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const delayClass = `delay-${Math.min(index * 100, 500)}`;

  return (
    <div
      className={`group relative bg-card-gradient border border-dark-border rounded-2xl overflow-hidden hover:border-gold/50 hover:shadow-gold transition-all duration-500 animate-slide-up ${delayClass}`}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-10 bg-gold-gradient text-dark text-xs font-bold px-3 py-1 rounded-full">
          Popular
        </div>
      )}

      {/* Image Placeholder */}
      <div className="relative h-48 overflow-hidden bg-dark-hover">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-dark flex items-center justify-center">
          <span className="text-6xl animate-float">
            {service.category === "luxury" ? "✈️" :
             service.category === "adventure" ? "🏔️" :
             service.category === "honeymoon" ? "💑" :
             service.category === "corporate" ? "🏢" : "🌍"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <FiMapPin className="text-gold text-xs" />
          <span className="text-silver text-xs">{service.destinations[0]}</span>
          {service.destinations.length > 1 && (
            <span className="text-silver-dark text-xs">
              +{service.destinations.length - 1} more
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Tag */}
        <span className="inline-block text-gold/80 text-xs font-medium uppercase tracking-wider border border-gold/20 rounded-full px-3 py-0.5 mb-3 capitalize">
          {service.category}
        </span>

        <h3 className="text-white font-serif text-xl font-semibold mb-2 group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-silver-dark text-sm leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm">
            <FiStar className="text-gold fill-gold" />
            <span className="text-white font-medium">{service.rating}</span>
            <span className="text-silver-dark">({service.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-silver-dark">
            <FiClock className="text-gold" />
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="text-xs text-silver-dark bg-dark-hover border border-dark-border px-2 py-0.5 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-border">
          <div>
            <span className="text-silver-dark text-xs">Starting from</span>
            <div className="text-gold font-bold text-xl">
              $200
              <span className="text-silver-dark text-sm font-normal">/person</span>
            </div>
          </div>
          <Link
            href={`/services/${service.id}`}
            className="flex items-center gap-2 bg-gold-gradient text-dark text-sm font-semibold px-4 py-2.5 rounded-full hover:opacity-90 hover:shadow-gold hover:gap-3 transition-all duration-300"
          >
            Explore
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
