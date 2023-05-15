import { useState, useEffect, useRef } from "react";
import "./LocationFilter.css";

export default function LocationFilter(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const locationsArray = [
    { value: "", displayText: "All Locations" },
    { value: "African", displayText: "African" },
    { value: "American", displayText: "American" },
    { value: "Chinese", displayText: "Chinese" },
    { value: "European", displayText: "European" },
    { value: "Greek", displayText: "Greek" },
    { value: "Japanese", displayText: "Japanese" },
    { value: "Mexican", displayText: "Mexican" },
    { value: "Middle Eastern", displayText: "Middle Eastern" },
    { value: "Thai", displayText: "Thai" },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coordinates = { latitude, longitude };
          props.setLocation(coordinates);
          setSelectedLocation("My Location");
          return coordinates; // Returnera koordinaterna
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (location) => {
    props.setLocation(location.value);
    setSelectedLocation(location.displayText);
    setIsOpen(false);
  };

  return (
    <>
      <section className="dropdown-section mt-2 mr-12 justify-self-start text-sm border-2 border-solid dropdown-container dropdown-wrapper" ref={dropdownRef}>
        <div className="dropdown-select" onClick={handleClick}>
          {selectedLocation}
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            <li key="my-location" className="checkbox-item">
              <button className="btnRegion" type="button" onClick={handleLocationClick}>
                Use My Location
              </button>
            </li>
            {locationsArray.map((location) => (
              <li key={location.value} className="checkbox-item">
                <button className="btnRegion" type="button" onClick={() => handleChange(location)}>
                  {location.displayText}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
