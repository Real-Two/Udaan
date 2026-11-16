import React from 'react';
import { Calendar, MessageCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { useApp } from '../../context/AppContext';

const GoalCard = ({ goal, provided, snapshot }) => {
  const { dispatch } = useApp();
  const isCompleted = goal.progress === 100;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => dispatch({ type: 'TOGGLE_GOAL_DETAIL', payload: goal })}
      className={`bg-white rounded-xl p-4 border shadow-sm transition-all relative cursor-pointer group hover:border-primary-400 hover:shadow-md ${
        snapshot.isDragging ? 'shadow-xl bg-white border-primary-500 scale-[1.02]' : 'border-gray-200'
      } ${goal.isActive ? 'border-l-4 border-l-primary-600' : ''}`}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      {isCompleted ? (
        <div className="absolute top-3 right-3 text-emerald-500">
          <CheckCircle2 size={18} />
        </div>
      ) : (
        <div className="absolute top-3 right-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={16} />
        </div>
      )}

      <div className={`flex flex-col gap-2.5 ${isCompleted ? 'opacity-85' : ''}`}>
        <h3 className="font-semibold text-gray-900 pr-6 text-sm group-hover:text-primary-700 transition-colors">
          {goal.title}
        </h3>

        {goal.tags && goal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {goal.tags.map((tag, idx) => (
              <Badge key={idx} color={tag.color}>
                {tag.label}
              </Badge>
            ))}
          </div>
        )}

        {goal.progress > 0 && (
          <div className="mt-1">
            <ProgressBar value={goal.progress} label={`${goal.progress}%`} />
          </div>
        )}

        {goal.mentorComment && (
          <div className="bg-teal-50 rounded-lg p-2 flex items-start gap-1.5 text-teal-800 mt-1">
            <MessageCircle size={13} className="mt-0.5 shrink-0 text-teal-600" />
            <p className="text-xs italic leading-tight line-clamp-2">{goal.mentorComment}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1 pt-1 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <span>{goal.dueDate}</span>
          </div>
          <span className="text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
            Click for details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
