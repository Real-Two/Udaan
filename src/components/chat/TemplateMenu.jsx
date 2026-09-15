import React from 'react';
import { chatTemplates } from '../../data/mockData';

const TemplateMenu = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 w-80 z-50 overflow-hidden transform transition-all opacity-100 scale-100">
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-500">Quick Templates</h3>
      </div>
      <div className="p-2 max-h-64 overflow-y-auto">
        {chatTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              onSelect(template.text);
              onClose();
            }}
            className="w-full text-left flex items-start gap-3 hover:bg-gray-50 rounded-lg p-3 transition-colors"
          >
            <span className="text-lg">{template.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">{template.label}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{template.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateMenu;
