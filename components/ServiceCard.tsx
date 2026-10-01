"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiStar, FiClock, FiArrowRight, FiMapPin } from "react-icons/fi";
import { Service } from "@/types";
import { serviceCardImages } from "@/lib/tourMedia";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const delayClass = `delay-${Math.min(index * 100, 500)}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const imageSrc =
    service.image && !service.image.includes("placeholder")
      ? service.image
      : serviceCardImages[service.category] || serviceCardImages.tourism;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientY - rect.top - centerY) / 12;
    const y = (e.clientX - rect.left - centerX) / 12;
    setRotate({ x: -x, y });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div className="perspective-1000 h-full" style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full transition-transform duration-300 ease-out animate-slide-up ${delayClass}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-gold/50 shadow-sm hover:shadow-card transition-all duration-500 h-full flex flex-col">
          {service.popular && (
            <div className="absolute top-4 right-4 z-10 bg-gold-gradient text-dark text-xs font-bold px-3 py-1 rounded-full animate-glow-pulse">
              Popular
            </div>
          )}

          <div className="relative h-56 overflow-hidden bg-neutral-100">
            <Image
              src={imageSrc}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 z-10">
              <FiMapPin className="text-gold text-sm drop-shadow-md" />
              <span className="text-white text-xs font-medium drop-shadow-md tracking-wide">{service.destinations[0]}</span>
              {service.destinations.length > 1 && (
                <span className="text-neutral-200 text-xs font-medium drop-shadow-md">
                  +{service.destinations.length - 1} more
                </span>
              )}
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <span className="inline-block text-primary text-xs font-semibold uppercase tracking-wider bg-primary/5 border border-primary/10 rounded-full px-3 py-1 mb-4 capitalize w-fit">
              {service.category.replace("_", " ")}
            </span>

            <h3 className="text-neutral-900 font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
              {service.shortDescription}
            </p>

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1.5 text-sm">
                <FiStar className="text-gold fill-gold" />
                <span className="text-neutral-700 font-bold">{service.rating}</span>
                <span className="text-neutral-400">({service.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-500">
                <FiClock className="text-gold" />
                <span>{service.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {service.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="text-xs text-neutral-600 font-medium bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-neutral-100 mt-auto">
              <div>
                <span className="text-neutral-500 text-xs font-medium">Starting from</span>
                <div className="text-primary font-bold text-xl">
                  PKR {service.price.toLocaleString()}
                  <span className="text-neutral-400 text-sm font-normal">/person</span>
                </div>
              </div>
              <Link
                href={`/services/${service.id}`}
                className="flex items-center gap-2 bg-gold-gradient text-primary text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-gold hover:scale-105 hover:gap-3 transition-all duration-300"
              >
                Explore
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
