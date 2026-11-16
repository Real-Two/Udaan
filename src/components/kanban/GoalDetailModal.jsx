import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, MessageCircle, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function GoalDetailModal() {
  const { state, dispatch } = useApp();
  const goal = state.selectedGoal;

  if (!goal) return null;

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_GOAL_DETAIL', payload: null });
  };

  const isCompleted = goal.progress === 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Goal Header */}
          <div className="pr-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full">
                {isCompleted ? 'Completed Goal' : 'Milestone'}
              </span>
              {goal.isActive && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Focus
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">{goal.title}</h3>
          </div>

          {/* Tags & Due Date */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {goal.tags?.map((tag, idx) => (
              <Badge key={idx} color={tag.color}>
                {tag.label}
              </Badge>
            ))}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 ml-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>Target: {goal.dueDate}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-5 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 mb-1.5">
              <span>Overall Completion</span>
              <span>{goal.progress}%</span>
            </div>
            <ProgressBar value={goal.progress} />
          </div>

          {/* Detailed Brief */}
          <div className="mt-5 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4 text-primary-600" /> Goal Summary & Deliverables
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                {goal.description || 'Focused milestones agreed upon between mentor and mentee for skill progression and promotion readiness.'}
              </p>
            </div>

            {/* Reference Links & Resources */}
            {goal.resources && goal.resources.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ExternalLink className="w-4 h-4 text-primary-600" /> Reference Links & Docs
                </h4>
                <div className="space-y-1.5">
                  {goal.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50/30 transition-all text-xs font-medium text-gray-700 group"
                    >
                      <span className="group-hover:text-primary-700 font-semibold">{res.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Mentor Review / Feedback */}
            {goal.mentorComment && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <MessageCircle className="w-4 h-4 text-teal-600" /> Mentor Note
                </h4>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-xs text-teal-800 italic leading-relaxed">
                  "{goal.mentorComment}"
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
