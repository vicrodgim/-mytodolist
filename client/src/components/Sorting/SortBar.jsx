import React from "react";
import "./SortBar.css";

export const SortBar = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-bar-container">
      <label htmlFor="sort" className="sort-label">
        SORT BY
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="deadline">Deadline</option>
        <option value="priority">Piority</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};
