
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (option: string) => void;
  showFeedback: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption, 
  onSelect, 
  showFeedback 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full transform transition-all duration-300">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
          {question.text}
        </h2>
        
        <div className="grid gap-4">
          {question.options.map((option, index) => {
            let bgColor = "bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-blue-50";
            let textColor = "text-gray-700";
            
            if (showFeedback) {
              if (option === question.correctAnswer) {
                bgColor = "bg-green-100 border-green-500 ring-2 ring-green-500 ring-opacity-50";
                textColor = "text-green-800";
              } else if (option === selectedOption) {
                bgColor = "bg-red-100 border-red-500";
                textColor = "text-red-800";
              } else {
                bgColor = "bg-gray-50 border-gray-200 opacity-50";
              }
            } else if (option === selectedOption) {
              bgColor = "bg-blue-100 border-blue-500";
              textColor = "text-blue-800";
            }

            return (
              <button
                key={index}
                disabled={showFeedback}
                onClick={() => onSelect(option)}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 flex items-center justify-between group ${bgColor} ${textColor}`}
              >
                <span className="font-semibold text-lg">{option}</span>
                {showFeedback && option === question.correctAnswer && (
                  <i className="fa-solid fa-circle-check text-green-600 text-xl"></i>
                )}
                {showFeedback && option === selectedOption && option !== question.correctAnswer && (
                  <i className="fa-solid fa-circle-xmark text-red-600 text-xl"></i>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-fadeIn">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb"></i> ¿Sabías que?
            </h4>
            <p className="text-blue-800 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
