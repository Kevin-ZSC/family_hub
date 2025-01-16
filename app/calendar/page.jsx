"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

const Page = () => {
  const [value, onChange] = useState(new Date()); // Selected date from calendar
  const [events, setEvents] = useState([]); // Store events
  const [form, setForm] = useState({
    type: "plan",
    description: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [selectDateEvent, setSelectDateEvent] = useState(false); // Show events for selected date

  // Handle form submission to add an event
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents((prev) => [...prev, { ...form, date: value }]); // Add the new event
    setForm({ type: "plan", description: "" }); // Reset form
    setShowForm(false); // Hide the form after adding event
  };

  // Filter events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(
      (event) => new Date(event.date).toDateString() === new Date(date).toDateString()
    );
  };

  // Handle calendar date click
  const handleDateClick = (date) => {
    onChange(date); // Update selected date
    setSelectDateEvent(true); // Show events for the selected date
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to our Calendar !</h1>

      {/* Button to show the event form */}
      <button
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        {showForm ? "Cancel" : "Add More..."}
      </button>

      {/* If showForm is true, display the event form */}
      {showForm && (
        <form
          onSubmit={handleAddEvent}
          className="mt-6 w-full max-w-lg p-6 bg-white shadow-lg rounded-xl border border-gray-300"
        >
          <h3 className="font-semibold text-xl mb-4">
            Add New Plan, Event, or Task on {value.toDateString()}
          </h3>

          {/* Event Type */}
          <label className="block text-gray-700 mb-2">Type:</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="block w-full border-gray-300 rounded-md p-2 mb-4"
          >
            <option value="plan">Plan</option>
            <option value="event">Event</option>
            <option value="task">Task</option>
          </select>

          {/* Event Description */}
          <label className="block text-gray-700 mb-2">Description:</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="block w-full border-gray-300 rounded-md p-2 mb-6"
            placeholder="Enter description"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add Event
          </button>
        </form>
      )}

      {/* Main Layout (Calendar on left, Event details on right for large screens) */}
      <div className="mt-8 w-full flex flex-col lg:flex-row space-x-8 justify-center">
        {/* Calendar Section */}
        <div className="md:max-w-[1000px] rounded-lg border-2 border-gray-300 shadow-lg p-4 bg-white">
          <Calendar
            onChange={onChange} // Update selected date
            value={value} // Highlight the selected date
            tileContent={({ date }) => {
              const dayEvents = getEventsForDate(date);
              return (
                <div className="p-1">
                  {dayEvents.map((event, index) => (
                    <span
                      key={index}
                      className={`block text-xs p-1 rounded-md ${
                        event.type === "plan"
                          ? "bg-blue-200 text-blue-600"
                          : event.type === "event"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {event.type}
                    </span>
                  ))}
                </div>
              );
            }}
            onClickDay={handleDateClick}
          />
        </div>

        {/* Event Details Section (Right Side) */}
        {selectDateEvent && getEventsForDate(value).length > 0 ? (
  <div className="md:w-1/2 mt-6 md:mt-0 w-full max-w-lg bg-white shadow-xl p-6 rounded-2xl border border-gray-200">
    <h3 className="font-semibold text-2xl mb-4 text-gray-800">Events for {value.toDateString()}:</h3>
    {getEventsForDate(value).map((event, index) => (
      <div key={index} className="mt-4 space-y-3">
        <div
          className={`p-4 rounded-lg shadow-md ${
            event.type === "plan"
              ? "bg-blue-50 text-blue-700"
              : event.type === "event"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <p className="font-medium text-lg">
            <span className="uppercase">{event.type}:</span> {event.description}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  // <p className="mt-4 text-gray-500 text-lg">There are no events on this day!</p>
  ""
)}

      </div>
    </div>
  );
};

export default Page;
