import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Target, Circle, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import GoalCard from './GoalCard';
import GoalDetailModal from './GoalDetailModal';

const COLUMNS = [
  { id: 'todo', title: 'To-Do', icon: Circle },
  { id: 'in-progress', title: 'In Progress', icon: Clock },
  { id: 'completed', title: 'Completed', icon: CheckCircle2 }
];

const KanbanBoard = () => {
  const { state, dispatch } = useApp();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // Dropped in same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    dispatch({
      type: 'MOVE_GOAL',
      payload: {
        goalId: draggableId,
        sourceCol: source.droppableId,
        destCol: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="text-teal-600" size={24} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Goal Tracker</h2>
            <p className="text-xs text-gray-500">Drag cards to update progress or reorder priority. Click any card for full details & resources.</p>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => {
            const ColumnIcon = column.icon;
            const goals = state.goals[column.id] || [];

            return (
              <div key={column.id} className="flex-1 min-w-[280px] bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ColumnIcon size={18} className="text-gray-500" />
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  </div>
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                    {goals.length}
                  </span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 min-h-[300px] flex flex-col gap-3 rounded-xl transition-colors ${
                        snapshot.isDraggingOver ? 'bg-teal-50 border-2 border-dashed border-teal-300' : ''
                      }`}
                    >
                      {goals.map((goal, index) => (
                        <Draggable key={goal.id} draggableId={goal.id} index={index}>
                          {(provided, snapshot) => (
                            <GoalCard goal={goal} provided={provided} snapshot={snapshot} />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Goal Detail Modal */}
      {state.selectedGoal && <GoalDetailModal />}
    </div>
  );
};

export default KanbanBoard;
