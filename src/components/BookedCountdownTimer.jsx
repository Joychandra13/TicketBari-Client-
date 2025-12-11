import React, { useEffect, useState } from "react";

const BookedCountdownTimer = ({ departure }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const departureDate = new Date(departure);
      const diff = departureDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [departure]);

  return (
    <div className="flex gap-5 justify-center items-center">
      <div >
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.days }} aria-live="polite">{timeLeft.days}</span>
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.hours }} aria-live="polite">{timeLeft.hours}</span>
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.minutes }} aria-live="polite">{timeLeft.minutes}</span>
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.seconds }} aria-live="polite">{timeLeft.seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default BookedCountdownTimer;
