import React, { useState } from "react";
import type { KeyboardEvent } from "react";


interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = inputValue.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="text-indigo-500 hover:text-indigo-700"
            onClick={() => removeTag(index)}
          >
            ✕
          </button>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow outline-none p-1 text-sm bg-transparent"
        placeholder={placeholder || "Type and press Enter"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;

