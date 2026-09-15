import React from 'react';
import { Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

const GoalCard = ({ goal, provided, snapshot }) => {
  const isCompleted = goal.progress === 100;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-white rounded-xl p-4 border shadow-sm transition-all relative ${
        snapshot.isDragging ? 'shadow-lg bg-white border-teal-500' : 'border-gray-200'
      } ${goal.isActive ? 'border-l-4 border-l-teal-600' : ''}`}
      style={{
        ...provided.draggableProps.style,
        ...(snapshot.isDragging ? { transform: `${provided.draggableProps.style?.transform || ''} scale(1.02)` } : {}),
      }}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 text-emerald-500">
          <CheckCircle2 size={20} />
        </div>
      )}
      <div className={`flex flex-col gap-3 ${isCompleted ? 'opacity-80' : ''}`}>
        <h3 className="font-semibold text-gray-900 pr-6">{goal.title}</h3>
        
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
          <div className="bg-teal-50 rounded-lg p-2 flex items-start gap-2 text-teal-700 mt-1">
            <MessageCircle size={14} className="mt-0.5 shrink-0" />
            <p className="text-xs italic leading-tight">{goal.mentorComment}</p>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
          <Calendar size={14} />
          <span>{goal.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
