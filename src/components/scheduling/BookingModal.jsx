import React from 'react';
import { Calendar } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, slot }) => {
  if (!isOpen || !slot) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-teal-600" />
          <h2 className="font-semibold text-lg text-gray-900">Book Session</h2>
        </div>

        <div className="bg-teal-50 rounded-lg p-4 text-center mb-6">
          <div className="animate-pulse-slow">
            <p className="font-medium text-teal-800 text-lg">{slot.dayName}</p>
            <div className="text-sm text-teal-700 mt-2 space-y-1">
              <p>Your Time: {slot.userTime} ({slot.userTz})</p>
              <p>Mentor Time: {slot.mentorTime} ({slot.mentorTz})</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Code Review"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              placeholder="Any specific topics you want to discuss?"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="border border-gray-200 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 font-medium"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
