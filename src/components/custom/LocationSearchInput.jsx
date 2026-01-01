// src/components/custom/LocationSearchInput.jsx
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

function LocationSearchInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    // If user selected a location, do NOT fetch again
    if (hasSelected) return;

    // Clear suggestions if input is short
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Location search error:", err);
        }
      }
    };

    const debounce = setTimeout(fetchLocations, 400);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query, hasSelected]);

  const handleSelect = (location) => {
    setQuery(location.display_name);
    setSuggestions([]);
    setHasSelected(true); // 🔥 lock suggestions
    onSelect(location);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setHasSelected(false); // 🔓 unlock when user types again
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={handleChange}
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearchInput;
