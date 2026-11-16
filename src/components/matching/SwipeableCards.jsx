import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Heart, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function SwipeableCards({ cards = [], onSwipe }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(null); // 'left' | 'right' | null

  const handleSwipe = (direction) => {
    if (currentIndex >= cards.length) return;
    const card = cards[currentIndex];
    if (onSwipe) onSwipe(card, direction);
    setDragDirection(null);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl h-[460px] border border-gray-200 shadow-sm w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 text-primary-600">
          <Sparkles className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">You're All Caught Up!</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
          You've reviewed all suggested mentors. Click below to continue setup or view your curated matches.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="mt-6 text-xs text-primary-600 font-semibold hover:underline"
        >
          Review Cards Again
        </button>
      </div>
    );
  }

  // Slice visible cards (active + up to 2 cards behind)
  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="flex flex-col items-center w-full max-w-sm select-none">
      {/* 3D Directional markers banner */}
      <div className="w-full flex items-center justify-between text-xs font-semibold px-2 mb-3">
        <span className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 shadow-xs">
          <ArrowLeft className="w-3.5 h-3.5" /> Drag Left to Pass
        </span>
        <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-xs">
          Drag Right to Connect <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* 3D Stack Deck */}
      <div
        className="relative w-full h-[470px] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence>
          {visibleCards.map((card, i) => {
            const isFront = i === 0;
            const offset = i;

            if (isFront) {
              return (
                <motion.div
                  key={card.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDrag={(e, info) => {
                    if (info.offset.x > 50) setDragDirection('right');
                    else if (info.offset.x < -50) setDragDirection('left');
                    else setDragDirection(null);
                  }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 100) {
                      handleSwipe('right');
                    } else if (info.offset.x < -100) {
                      handleSwipe('left');
                    } else {
                      setDragDirection(null);
                    }
                  }}
                  exit={(custom) => ({
                    x: custom === 'left' ? -500 : 500,
                    opacity: 0,
                    rotate: custom === 'left' ? -25 : 25,
                    transition: { duration: 0.3 },
                  })}
                  custom={dragDirection}
                  whileTap={{ cursor: 'grabbing' }}
                  className="absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col justify-between cursor-grab z-30"
                  style={{
                    transformOrigin: '50% 100%',
                  }}
                >
                  {/* Dynamic Overlays on Drag */}
                  {dragDirection === 'right' && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-40 animate-pulse">
                      <Check className="w-4 h-4" /> Connect
                    </div>
                  )}
                  {dragDirection === 'left' && (
                    <div className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-40 animate-pulse">
                      <X className="w-4 h-4" /> Pass
                    </div>
                  )}

                  <CardDetails card={card} />
                </motion.div>
              );
            }

            // Cards layered in 3D behind the front card
            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  scale: 1 - offset * 0.06,
                  y: offset * 18,
                  opacity: 1 - offset * 0.35,
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-md p-6 pointer-events-none flex flex-col justify-between"
                style={{
                  zIndex: 20 - offset,
                  transformOrigin: '50% 100%',
                }}
              >
                <CardDetails card={card} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Button Controls with Labels & Counter */}
      <div className="flex items-center justify-between w-full px-6 mt-5">
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full border-2 border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-50 hover:border-rose-400 active:scale-95 transition-all shadow-sm"
            title="Pass"
          >
            <X className="w-7 h-7" />
          </button>
          <span className="text-xs font-semibold text-rose-500">Pass</span>
        </div>

        <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500">
          {currentIndex + 1} of {cards.length}
        </div>

        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 rounded-full border-2 border-emerald-300 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 hover:border-emerald-500 active:scale-95 transition-all shadow-sm"
            title="Connect"
          >
            <Heart className="w-7 h-7 fill-emerald-500 text-emerald-500" />
          </button>
          <span className="text-xs font-semibold text-emerald-600">Connect</span>
        </div>
      </div>
    </div>
  );
}

function CardDetails({ card }) {
  const mentor = card.mentor || card;
  const score = card.score || 88;
  const reasons = card.reasons || [
    { label: 'Complementary Skills', value: 35 },
    { label: 'Timezone Overlap', value: 28 },
    { label: 'Industry Match', value: 27 },
  ];

  return (
    <div className="flex flex-col items-center h-full justify-between">
      {/* Top Header */}
      <div className="flex flex-col items-center text-center">
        <Avatar initials={mentor.initials} color={mentor.avatarColor} size="xl" />
        <h3 className="text-lg font-bold text-gray-900 mt-2">{mentor.name}</h3>
        <p className="text-xs text-gray-500 font-medium">
          {mentor.title} at <span className="text-gray-700 font-semibold">{mentor.company}</span>
        </p>
        <span className="text-xs text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full mt-1.5 font-medium">
          {mentor.style} · {mentor.timezone?.split(' ')[0] || 'IST'}
        </span>
      </div>

      {/* Match Score Badge */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 px-4 py-2 rounded-xl my-2">
        <div className="w-9 h-9 rounded-full bg-primary-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
          {score}%
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-gray-800">Match Compatibility</p>
          <p className="text-[10px] text-gray-500">Explained by AI heuristics</p>
        </div>
      </div>

      {/* AI Reasoning Bars */}
      <div className="w-full space-y-1.5 px-1">
        {reasons.slice(0, 3).map((reason, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">{reason.label}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    i === 0 ? 'bg-teal-500' : i === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (reason.value / 35) * 100)}%` }}
                />
              </div>
              <span className="text-gray-400 w-6 text-right font-semibold">{reason.value}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {mentor.skills?.slice(0, 3).map((skill) => (
          <Badge key={skill} color="bg-gray-100 text-gray-700 text-[10px] font-medium">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
