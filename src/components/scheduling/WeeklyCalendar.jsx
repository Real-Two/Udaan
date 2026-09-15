import React, { useState } from 'react';
import { Calendar, Globe } from 'lucide-react';
import { userSchedule, mentorSchedule, weekDays, hours } from '../../data/mockData';
import BookingModal from './BookingModal';

const WeeklyCalendar = ({ compact = false }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const isUserAvailable = (day, hour) => {
    return userSchedule?.some(block => block.day === day && block.startHour <= hour && hour < block.endHour);
  };

  const isMentorAvailable = (day, hour) => {
    return mentorSchedule?.some(block => block.day === day && block.startHour <= hour && hour < block.endHour);
  };

  const isOverlap = (day, hour) => {
    return isUserAvailable(day, hour) && isMentorAvailable(day, hour);
  };

  const getSlotKey = (day, hour) => `${day}-${hour}`;

  const formatHour = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h} ${ampm}`;
  };

  const formatMentorTime = (hour) => {
    const mentorHour = (hour - 13.5 + 24) % 24;
    const mentorH = Math.floor(mentorHour);
    const mentorMin = mentorHour % 1 !== 0 ? '30' : '00';
    const mAmPm = mentorH >= 12 ? 'PM' : 'AM';
    const mFormattedH = mentorH % 12 || 12;
    return `${mFormattedH}:${mentorMin} ${mAmPm}`;
  };

  const handleSlotClick = (dayIdx, hour) => {
    if (isOverlap(dayIdx, hour)) {
      const userTz = 'IST (UTC+5:30)';
      const mentorTz = 'PST (UTC-8)';
      
      setSelectedSlot({
        dayName: weekDays[dayIdx],
        hour,
        userTime: `${formatHour(hour)}`,
        userTz,
        mentorTime: formatMentorTime(hour),
        mentorTz
      });
      setShowBooking(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-900">Smart Scheduler</h2>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <span>Your Timezone: IST (UTC+5:30)</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <span>Mentor Timezone: PST (UTC-8)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mt-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded mr-2"></div>
            <span className="text-gray-600">Your Availability</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-2"></div>
            <span className="text-gray-600">Mentor Availability</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-100 border border-teal-300 rounded mr-2"></div>
            <span className="text-gray-600 font-medium">Overlap — Book Here!</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-20 p-3 bg-gray-50 border-b border-r border-gray-200 text-xs font-medium text-gray-500 text-center">
                Time
              </th>
              {weekDays.map((day, idx) => (
                <th key={idx} className="p-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td className="p-2 border-r border-b border-gray-200 text-xs text-gray-500 text-center bg-gray-50 align-top">
                  {formatHour(hour)}
                </td>
                {weekDays.map((_, dayIdx) => {
                  const key = getSlotKey(dayIdx, hour);
                  const isUser = isUserAvailable(dayIdx, hour);
                  const isMentor = isMentorAvailable(dayIdx, hour);
                  const overlap = isOverlap(dayIdx, hour);
                  
                  let cellClass = "border-b border-gray-100 h-12 relative ";
                  if (overlap) {
                    cellClass += "bg-teal-100 border-teal-300 cursor-pointer hover:bg-teal-200 transition-colors";
                  } else if (isUser) {
                    cellClass += "bg-blue-50 border-blue-200";
                  } else if (isMentor) {
                    cellClass += "bg-gray-100 border-gray-200";
                  } else {
                    cellClass += "bg-white border-gray-100";
                  }

                  return (
                    <td 
                      key={key} 
                      className={cellClass}
                      onClick={() => handleSlotClick(dayIdx, hour)}
                      onMouseEnter={() => setHoveredSlot(key)}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      {overlap && hoveredSlot === key && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded p-2 shadow-lg whitespace-nowrap pointer-events-none">
                          <div className="font-semibold mb-1">{weekDays[dayIdx]}</div>
                          <div>You: {formatHour(hour)} (IST)</div>
                          <div>Mentor: {formatMentorTime(hour)} (PST)</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)} 
        slot={selectedSlot} 
      />
    </div>
  );
};

export default WeeklyCalendar;
