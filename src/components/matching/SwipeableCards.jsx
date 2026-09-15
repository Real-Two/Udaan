import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Heart, SkipForward } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

function DraggableCard({ card, onSwipeComplete }) {
  const [dragX, setDragX] = useState(0);
  const [exiting, setExiting] = useState(null); // 'left' | 'right' | null

  const handleDrag = (e, info) => {
    setDragX(info.offset.x);
  };

  const handleDragEnd = (e, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExiting('right');
    } else if (info.offset.x < -threshold) {
      setExiting('left');
    } else {
      setDragX(0);
    }
  };

  const overlayOpacityRight = Math.min(1, Math.max(0, dragX / 100));
  const overlayOpacityLeft = Math.min(1, Math.max(0, -dragX / 100));
  const rotation = (dragX / 200) * 15;
  const cardScale = 1 - Math.abs(dragX) / 4000;

  if (exiting) {
    return (
      <motion.div
        initial={{ x: dragX, rotate: rotation, opacity: 1 }}
        animate={{
          x: exiting === 'right' ? 600 : -600,
          rotate: exiting === 'right' ? 20 : -20,
          opacity: 0,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onAnimationComplete={() => onSwipeComplete(exiting)}
        className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 z-10"
      >
        <CardContent card={card} />
      </motion.div>
    );
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={{ x: 0, rotate: 0, scale: 1 }}
      style={{
        x: undefined,
        rotate: rotation,
        scale: cardScale,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 cursor-grab active:cursor-grabbing z-10"
    >
      {/* Swipe overlays */}
      <div
        className="absolute top-4 right-4 z-20 text-emerald-500 bg-white rounded-full shadow-lg p-2 pointer-events-none"
        style={{ opacity: overlayOpacityRight }}
      >
        <Check size={32} />
      </div>
      <div
        className="absolute top-4 left-4 z-20 text-rose-500 bg-white rounded-full shadow-lg p-2 pointer-events-none"
        style={{ opacity: overlayOpacityLeft }}
      >
        <X size={32} />
      </div>

      <CardContent card={card} />
    </motion.div>
  );
}

function CardContent({ card }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar
        initials={card.mentor.initials}
        color={card.mentor.avatarColor}
        size="xl"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">{card.mentor.name}</h3>
        <p className="text-gray-500">{card.mentor.title} at {card.mentor.company}</p>
        <p className="text-xs text-gray-400 mt-1">{card.mentor.style} · {card.mentor.timezone}</p>
      </div>

      <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
        {card.score}%
      </div>

      <div className="w-full space-y-2 px-2">
        {card.reasons.map((reason, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{reason.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    i === 0 ? 'bg-teal-500' : i === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${reason.value}%` }}
                />
              </div>
              <span className="text-gray-400 w-8 text-right">{reason.value}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mt-1">
        {card.mentor.skills?.slice(0, 3).map(skill => (
          <Badge key={skill} color="bg-gray-100 text-gray-600">{skill}</Badge>
        ))}
      </div>
    </div>
  );
}

const SwipeableCards = ({ cards, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeComplete = useCallback((direction) => {
    if (onSwipe) onSwipe(cards[currentIndex], direction);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex, cards, onSwipe]);

  const handleButtonSwipe = (direction) => {
    if (onSwipe) onSwipe(cards[currentIndex], direction);
    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl h-96 border border-gray-200 w-full max-w-sm">
        <Heart className="w-12 h-12 text-primary-300 mb-4" />
        <p className="text-gray-500 font-medium">You've seen all matches!</p>
        <p className="text-sm text-gray-400 mt-1">Continue to refine your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="relative w-full h-[420px] flex items-center justify-center">
        {/* Background cards (stacked behind) */}
        {cards.map((card, index) => {
          if (index < currentIndex || index > currentIndex + 2) return null;
          if (index === currentIndex) return null;

          const offset = index - currentIndex;
          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                scale: 1 - offset * 0.05,
                y: offset * 14,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6"
              style={{ zIndex: 5 - offset }}
            >
              <CardContent card={card} />
            </motion.div>
          );
        })}

        {/* Active draggable card — fresh key forces clean remount */}
        <AnimatePresence mode="wait">
          {currentIndex < cards.length && (
            <DraggableCard
              key={cards[currentIndex].id}
              card={cards[currentIndex]}
              onSwipeComplete={handleSwipeComplete}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Quick action buttons */}
      {currentIndex < cards.length && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleButtonSwipe('left')}
            className="w-12 h-12 rounded-full border-2 border-rose-200 text-rose-400 flex items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="text-xs text-gray-400">{currentIndex + 1} / {cards.length}</span>
          <button
            onClick={() => handleButtonSwipe('right')}
            className="w-12 h-12 rounded-full border-2 border-emerald-200 text-emerald-400 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SwipeableCards;
