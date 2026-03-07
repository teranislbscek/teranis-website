import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import eventsData from "../utils/constants";

const EventCard = ({ event, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 pb-6 shadow-xl rounded-2xl text-center flex flex-col items-center hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-shadow duration-300"
  >
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-[28rem] object-cover rounded-xl mb-8"
    />
    <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{event.title}</h4>

    <button
      onClick={() => onSelect(event)}
      className="mt-6 w-9/12 px-4 py-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 backdrop-blur-sm transition-all duration-300"
    >
      More Details
    </button>
    <a
      href={event.formLink}
      className="mt-4 w-9/12 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 block"
    >
      REGISTER NOW
    </a>
  </motion.div>
);

const Events = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleExpand = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="h-auto bg-gray-900 py-16 bg-opacity-80 text-white flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl w-full mt-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center"
        >
          Upcoming Events
        </motion.h2>

        {Object.entries(eventsData).map(([category, events], index) => {
          const isExpanded = expandedCategories[category] || false;
          const visibleEvents = useMemo(
            () => (isExpanded ? events : events.slice(0, 3)),
            [isExpanded, events]
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="my-12"
            >
              <h3 className="text-2xl flex items-center justify-center md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                {category}
              </h3>

              <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event, i) => (
                  <EventCard
                    key={i}
                    event={event}
                    onSelect={setSelectedEvent}
                  />
                ))}
              </div>

              {events.length > 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-center mt-6"
                >
                  <button
                    onClick={() => toggleExpand(category)}
                    className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-white rounded-full hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gray-900 bg-opacity-90 fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-gray-950 bg-opacity-90 text-white w-11/12 max-w-2xl p-8 rounded-lg shadow-2xl relative max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold transition duration-300 ease-in-out"
              >
                &times;
              </button>

              <h3 className="text-2xl font-light text-indigo-400 mb-4">
                {selectedEvent.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Overview</h3>
                  <p className="text-gray-200 leading-relaxed text-lg font-light">
                    {selectedEvent.description.overview}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Guidelines
                  </h3>
                  <ul className="list-disc pl-5 text-gray-200 text-lg font-light space-y-2">
                    {selectedEvent.description.guidelines.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Contact</h3>
                  <ul className="list-none space-y-2">
                    {selectedEvent.contact.map((data, index) => (
                      <li
                        key={index}
                        className="text-gray-200 text-lg font-light"
                      >
                        📞 {data.name} - {data.phno}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
