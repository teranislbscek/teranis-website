import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SCRIPT_BASE_URL =
  "https://script.google.com/macros/s/AKfycbyGCdU9D2b8oILQ4Kc5tDFBqVddodzDROR2PW6D0NnwBEIT2kynM8rBus7qNiX7j9Q/exec";

const EventCard = ({ event, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative bg-white/[0.03] border border-white/[0.07] p-6 pb-6 shadow-xl rounded-2xl flex flex-col hover:-translate-y-1 transition-all duration-300"
  >
    {/* top accent line */}
    <div className="absolute top-0 left-6 right-6 h-px bg-cyan-400/30 group-hover:bg-cyan-400/60 transition-colors duration-300" />

    <div className="relative w-full h-[24rem] sm:h-[28rem] rounded-xl overflow-hidden mb-6">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    
    <h4 className="text-2xl font-bold text-cyan-400 mb-6 text-center">{event.title}</h4>

    <div className="flex flex-col gap-3 mt-auto w-full items-center">
      <button
        onClick={() => onSelect(event)}
        className="w-full sm:w-9/12 px-4 py-2.5 bg-white/[0.05] text-white border border-white/10 rounded-full hover:bg-white/[0.1] transition-all duration-300 font-medium"
      >
        More Details
      </button>

      {event.formLink && (
        <a
          href={event.formLink}
          className="w-full sm:w-9/12 px-4 py-2.5 text-center bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-500 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-800/40 transition-all duration-300"
        >
          REGISTER NOW
        </a>
      )}
    </div>
  </motion.div>
);

const EventCardSkeleton = () => (
  <div className="group relative bg-white/[0.03] border border-white/[0.07] p-6 pb-6 shadow-xl rounded-2xl flex flex-col">
    <div className="absolute top-0 left-6 right-6 h-px bg-cyan-400/30" />

    <div className="relative w-full h-[24rem] sm:h-[28rem] rounded-xl overflow-hidden mb-6 bg-white/5 animate-pulse" />

    <div className="mx-auto mb-6 h-7 w-3/5 rounded-full bg-white/10 animate-pulse" />

    <div className="flex flex-col gap-3 mt-auto w-full items-center">
      <div className="w-full sm:w-9/12 h-11 rounded-full bg-white/10 animate-pulse" />
      <div className="w-full sm:w-9/12 h-11 rounded-full bg-cyan-500/20 animate-pulse" />
    </div>
  </div>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    formLink: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const Events = () => {
  const [eventsData, setEventsData] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${SCRIPT_BASE_URL}?type=events`);
        const json = await res.json();

        if (json.status === "success" && json.data) {
          const groupedEvents = {};

          json.data.forEach(item => {
            const eventInfo = {
              title: item.name,
              image: item.image_url,
              formLink: item.registration_link,
              description: {
                overview: item.more_details
              }
            };

            const categoriesString = item.Category || "";
            const categoriesList = categoriesString.split(',').map(c => c.trim());

            categoriesList.forEach(cat => {
              if (!groupedEvents[cat]) {
                groupedEvents[cat] = [];
              }
              groupedEvents[cat].push(eventInfo);
            });
          });

          setEventsData(groupedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent]);

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
      className="relative min-h-screen bg-gray-950 py-20 md:py-28 text-white overflow-hidden"
    >
      {/* subtle grid pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
            Our Events
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
            Explore <span className="text-cyan-400">Events</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="w-full mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-white/10 flex-grow"></div>
              <div className="h-8 w-48 rounded-full bg-white/10 animate-pulse px-4" />
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          </div>
        ) : (
          Object.entries(eventsData).map(([category, events], index) => {
            const isExpanded = expandedCategories[category] || false;
            const visibleEvents = isExpanded ? events : events.slice(0, 3);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full mb-20"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px bg-white/10 flex-grow"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase px-4 text-center">
                    {category}
                  </h3>
                  <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="flex justify-center mt-12"
                  >
                    <button
                      onClick={() => toggleExpand(category)}
                      className="px-8 py-3 bg-white/[0.05] border border-white/10 text-cyan-400 font-semibold rounded-full hover:bg-white/[0.1] hover:border-cyan-400/50 transition-all duration-300"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/10 text-white w-full max-w-2xl p-6 md:p-10 rounded-2xl shadow-2xl relative max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-300"
              >
                &times;
              </button>

              <div className="overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-3xl font-bold text-cyan-400 mb-6 pr-8">
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-4">
                  <div
                    className="text-gray-300 leading-relaxed text-base md:text-lg rendered-html-content prose prose-invert prose-cyan max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedEvent.description.overview }}
                  />
                </div>
              </div>
              
              {selectedEvent.formLink && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={selectedEvent.formLink}
                    className="block w-full text-center px-6 py-3.5 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-500 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-800/40 transition-all duration-300"
                  >
                    Register for {selectedEvent.title}
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
