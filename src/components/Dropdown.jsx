import React, { useState } from 'react';
import ArrowIcons from './icons/ArrowIcons';

const Dropdown = ({ dropdown, options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option) => {
    if (Array.isArray(selectedOption)) {
      setSelectedOption(prevOptions => {
        if (prevOptions.includes(option)) {
          return prevOptions.filter(opt => opt !== option);
        } else {
          return [...prevOptions, option];
        }
      });
    } else {
      setSelectedOption(option);
    }
    setIsOpen(false);
  };

  const displaySelectedOption = () => {
    if (Array.isArray(selectedOption)) {
      const selectedCount = selectedOption.length;
      if (selectedCount === 0) return "Select";
      if (selectedCount === 1) return selectedOption[0];
      return `${selectedOption[0]} (${selectedCount - 1})`;
    } else {
      return selectedOption || "Select";
    }
  };

  const isSelected = (option) => {
    return Array.isArray(selectedOption) 
      ? selectedOption.includes(option) 
      : selectedOption === option;
  };

  const isAnySelected = () => {
    return Array.isArray(selectedOption) 
      ? selectedOption.length > 0 
      : !!selectedOption;
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`dropdown-toggle flex gap-1 items-center justify-center ${isAnySelected() ? 'bg-gray-200' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>
          {dropdown}: {displaySelectedOption()}
        </span>
         <ArrowIcons/>
      </button>
      {isOpen && (
        <ul className="dropdown-menu absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10" role="listbox">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item px-4 py-2 hover:bg-gray-100 cursor-pointer ${isSelected(option) ? 'bg-black' : ''}`}
              role="option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
