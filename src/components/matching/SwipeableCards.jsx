import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Check, X, Heart, Sparkles, ArrowLeft, ArrowRight, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function SwipeableCards({ cards = [], onSwipe }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hintActive, setHintActive] = useState(true);

  // Auto-dismiss the hint after initial interaction
  const dismissHint = () => {
    if (hintActive) setHintActive(false);
  };

  const handleSwipe = (direction) => {
    dismissHint();
    if (currentIndex >= cards.length) return;
    const currentCard = cards[currentIndex];
    if (onSwipe) onSwipe(currentCard, direction);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl h-[480px] border border-gray-200 shadow-xl w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 text-primary-600 shadow-xs">
          <Sparkles className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">You've Met All Mentors!</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
          Great job reviewing your potential advisors. You can reset to review them again or continue to skills setup.
        </p>
        <button
          type="button"
          onClick={() => setCurrentIndex(0)}
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-xs font-bold hover:bg-primary-100 transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Start Over
        </button>
      </div>
    );
  }

  // Cards to render: up to 3 cards in stack
  const frontCard = cards[currentIndex];
  const secondCard = cards[currentIndex + 1];
  const thirdCard = cards[currentIndex + 2];

  return (
    <div className="flex flex-col items-center w-full max-w-sm select-none">
      {/* Tinder-like Animated Action Cue Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center justify-center mb-3"
      >
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs font-semibold">
          <span className="flex items-center gap-1 text-rose-500">
            <ArrowLeft className="w-3.5 h-3.5 animate-pulse" /> Swipe Left (Pass)
          </span>
          <span className="text-gray-300 font-normal">|</span>
          <span className="flex items-center gap-1 text-emerald-600">
            Swipe Right (Connect) <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </span>
        </div>
      </motion.div>

      {/* Card Stack Area */}
      <div className="relative w-full h-[470px] flex items-center justify-center">
        {/* Third Card in Stack */}
        {thirdCard && (
          <div
            key={thirdCard.id}
            className="absolute inset-0 bg-white border border-gray-200/90 rounded-3xl shadow-sm p-6 pointer-events-none flex flex-col justify-between"
            style={{
              transform: 'translateY(24px) scale(0.90)',
              opacity: 0.5,
              zIndex: 10,
            }}
          >
            <CardDetails card={thirdCard} />
          </div>
        )}

        {/* Second Card in Stack */}
        {secondCard && (
          <div
            key={secondCard.id}
            className="absolute inset-0 bg-white border border-gray-200 rounded-3xl shadow-md p-6 pointer-events-none flex flex-col justify-between"
            style={{
              transform: 'translateY(12px) scale(0.95)',
              opacity: 0.85,
              zIndex: 20,
            }}
          >
            <CardDetails card={secondCard} />
          </div>
        )}

        {/* Front Active Swipable Card */}
        <AnimatePresence mode="wait">
          {frontCard && (
            <FrontDraggableCard
              key={frontCard.id}
              card={frontCard}
              onSwipe={handleSwipe}
              onDragStart={dismissHint}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tinder Controls Bar */}
      <div className="flex items-center justify-between w-full px-8 mt-6">
        {/* Pass Button */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full bg-white border-2 border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-50 hover:border-rose-400 active:scale-90 transition-all shadow-md shadow-rose-100"
            title="Pass (Swipe Left)"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Pass</span>
        </div>

        {/* Card Counter Indicator */}
        <div className="px-3.5 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 shadow-xs">
          {currentIndex + 1} / {cards.length}
        </div>

        {/* Connect Button */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-50 to-teal-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 hover:border-emerald-500 active:scale-90 transition-all shadow-md shadow-emerald-100"
            title="Connect (Swipe Right)"
          >
            <Heart className="w-7 h-7 fill-emerald-500 text-emerald-500" />
          </button>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Connect</span>
        </div>
      </div>
    </div>
  );
}

function FrontDraggableCard({ card, onSwipe, onDragStart }) {
  const x = useMotionValue(0);
  const [exitDirection, setExitDirection] = useState(null);

  // Smooth rotation linked to drag distance
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  // Tinder Stamp Opacities
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      setExitDirection('right');
      setTimeout(() => onSwipe('right'), 150);
    } else if (info.offset.x < -100) {
      setExitDirection('left');
      setTimeout(() => onSwipe('left'), 150);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        zIndex: 30,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0.8, y: 12 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        x: exitDirection === 'right' ? 600 : exitDirection === 'left' ? -600 : 0,
        transition: { type: 'spring', stiffness: 450, damping: 30 },
      }}
      exit={{
        x: exitDirection === 'right' ? 600 : -600,
        opacity: 0,
        rotate: exitDirection === 'right' ? 25 : -25,
        transition: { duration: 0.25 },
      }}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute inset-0 bg-white border border-gray-200/90 rounded-3xl shadow-xl p-6 flex flex-col justify-between cursor-grab overflow-hidden"
    >
      {/* Tinder-style Angled LIKE / CONNECT Stamp */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 left-6 border-4 border-emerald-500 text-emerald-500 font-black text-xl uppercase tracking-widest px-3 py-1 rounded-xl rotate-[-15deg] pointer-events-none z-40 bg-white/90 shadow-md"
      >
        CONNECT
      </motion.div>

      {/* Tinder-style Angled NOPE / PASS Stamp */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-6 right-6 border-4 border-rose-500 text-rose-500 font-black text-xl uppercase tracking-widest px-3 py-1 rounded-xl rotate-[15deg] pointer-events-none z-40 bg-white/90 shadow-md"
      >
        PASS
      </motion.div>

      <CardDetails card={card} />
    </motion.div>
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
    <div className="flex flex-col items-center h-full justify-between pointer-events-none">
      {/* Mentor Profile Header */}
      <div className="flex flex-col items-center text-center mt-1">
        <Avatar initials={mentor.initials} color={mentor.avatarColor} size="xl" />
        <h3 className="text-xl font-extrabold text-gray-900 mt-2.5 tracking-tight">{mentor.name}</h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          {mentor.title} at <span className="text-gray-800 font-bold">{mentor.company}</span>
        </p>
        <span className="text-[11px] text-primary-700 bg-primary-50 px-3 py-0.5 rounded-full mt-2 font-bold border border-primary-100/80">
          {mentor.style} · {mentor.timezone?.split(' ')[0] || 'IST'}
        </span>
      </div>

      {/* Compatibility Score Banner */}
      <div className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-50/80 via-emerald-50/80 to-teal-50/80 border border-teal-100 p-2.5 rounded-2xl my-2">
        <div className="w-10 h-10 rounded-xl bg-primary-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
          {score}%
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-900">AI Compatibility Score</p>
          <p className="text-[10px] text-gray-500 truncate">Deep skill alignment & overlap</p>
        </div>
      </div>

      {/* Breakdown Heuristics */}
      <div className="w-full space-y-1.5 px-0.5">
        {reasons.slice(0, 3).map((reason, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">{reason.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    i === 0 ? 'bg-teal-500' : i === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (reason.value / 35) * 100)}%` }}
                />
              </div>
              <span className="text-gray-500 font-bold w-6 text-right text-[10px]">{reason.value}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Badges */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-2">
        {mentor.skills?.slice(0, 3).map((skill) => (
          <Badge key={skill} color="bg-gray-100 text-gray-700 text-[10px] font-semibold">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
