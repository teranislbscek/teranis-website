import React from "react";
import BlurText from "./BlurText";

const LoadingScreen = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black text-white">
      <BlurText
        text="Teranis 2K26"
        delay={100}
        animateBy="letters"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-4xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] mb-8"
      />
    </div>
  );
};

export default LoadingScreen;
