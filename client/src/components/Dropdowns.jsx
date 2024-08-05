import React from "react";

const Dropdowns = ({ dropdown1, setDropdown1, dropdown2, setDropdown2 }) => (
  <div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Clothing Type:
        <select
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="1">Jacket</option>
          <option value="2">T-Shirt</option>
          <option value="3">Pants</option>
          <option value="4">Shoes</option>
        </select>
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Main Colour:
        <select
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="1">Red</option>
          <option value="2">Blue</option>
          <option value="3">Green</option>
          <option value="4">White</option>
        </select>
      </label>
    </div>
  </div>
);

export default Dropdowns;
