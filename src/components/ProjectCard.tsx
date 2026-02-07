"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Project } from "@/data/types";

// Module-level counter to track open lightboxes across all ProjectCard instances
let openLightboxCount = 0;

function lockScroll() {
  openLightboxCount++;
  if (openLightboxCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

function unlockScroll() {
  openLightboxCount = Math.max(0, openLightboxCount - 1);
  if (openLightboxCount === 0) {
    document.body.style.overflow = "";
  }
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const hasLockedScrollRef = useRef(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const images = project.images.length > 0 ? project.images : ["/images/projects/placeholder.jpg"];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    if (!hasLockedScrollRef.current) {
      lockScroll();
      hasLockedScrollRef.current = true;
    }
  };

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
    if (hasLockedScrollRef.current) {
      unlockScroll();
      hasLockedScrollRef.current = false;
    }
  }, []);

  // Keyboard navigation and scroll lock cleanup
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      if (hasLockedScrollRef.current) {
        unlockScroll();
        hasLockedScrollRef.current = false;
      }
    };
  }, []);

  return (
    <>
      <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
        {/* Image Carousel */}
        <div
          className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
          onClick={openLightbox}
        >
          {project.featured && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded-md shadow-sm">
              Featured
            </span>
          )}

          {imageErrors.has(currentIndex) ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm font-medium">{project.title}</span>
            </div>
          ) : (
            <Image
              src={images[currentIndex]}
              alt={`${project.title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => handleImageError(currentIndex)}
            />
          )}

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white shadow-sm"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title with Link */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              {project.title}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={`View ${project.title} project`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={closeLightbox} />

          {/* Top toolbar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            {/* Zoom toggle */}
            <button
              onClick={toggleZoom}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label={isZoomed ? "Shrink image" : "Maximize image"}
              title={isZoomed ? "Shrink image" : "Maximize image"}
            >
              {isZoomed ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0v4m0-4h4m6 6l5 5m0 0v-4m0 4h-4" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" />
                </svg>
              )}
            </button>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image counter */}
          {hasMultipleImages && (
            <div className="absolute top-5 left-4 z-20 text-sm text-white/60 font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Content Container */}
          <div
            className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
              isZoomed
                ? "w-full h-full p-2"
                : "w-full max-w-5xl mx-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div
              className={`relative bg-black/50 overflow-hidden transition-all duration-300 ${
                isZoomed
                  ? "w-full flex-1 rounded-none"
                  : "w-full aspect-[16/10] rounded-lg"
              }`}
            >
              {imageErrors.has(currentIndex) ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-lg font-medium">{project.title}</span>
                </div>
              ) : (
                <Image
                  src={images[currentIndex]}
                  alt={`${project.title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(currentIndex)}
                  priority
                />
              )}

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-white"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Project Info - hidden when zoomed */}
            {!isZoomed && (
              <div className="mt-6 text-center max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                <p className="text-white/70 leading-relaxed">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
