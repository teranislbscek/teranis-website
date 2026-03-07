import { useEffect } from "react";

const FlipbookEmbed = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://heyzine.com/flip-book/bac0f481a4.html";
    }, 2000); // small delay to show animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">Loading magazine...</p>
      </div>
    </div>
  );
};

export default FlipbookEmbed;
