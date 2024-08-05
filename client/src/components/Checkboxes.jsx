import React from "react";

const Checkboxes = ({ checkboxes, handleCheckboxChange }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-blue-600 mb-2">Season</h3>
    {["Summer", "Autumn", "Winter", "Spring"].map((season, index) => (
      <label key={index} className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          checked={checkboxes.seasons[index]}
          onChange={() => handleCheckboxChange("seasons", index)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2">{season}</span>
      </label>
    ))}

    <h3 className="text-lg font-semibold text-blue-600 mt-4 mb-2">Occasion</h3>
    {["Party", "Business", "Red Carpet", "Casual"].map((occasion, index) => (
      <label key={index} className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          checked={checkboxes.occasion[index]}
          onChange={() => handleCheckboxChange("occasion", index)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2">{occasion}</span>
      </label>
    ))}
  </div>
);

export default Checkboxes;
