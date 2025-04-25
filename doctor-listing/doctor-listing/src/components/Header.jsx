
import { useState, useEffect } from "react";

function Header({ doctors, onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = doctors
      .filter((doc) => doc.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 3);
    setSuggestions(filtered);
  }, [input, doctors]);

  const handleSelect = (name) => {
    setInput(name);
    onSearch(name);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setSuggestions([]);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="autocomplete-input"
          className="border p-2 w-full rounded"
          placeholder="Search doctors..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      {suggestions.length > 0 && (
        <div className="border mt-2 bg-white rounded shadow">
          {suggestions.map((doc) => (
            <div
              key={doc.id}
              data-testid="suggestion-item"
              onClick={() => handleSelect(doc.name)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
