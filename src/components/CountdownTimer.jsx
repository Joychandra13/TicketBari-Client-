import React, { useEffect, useState } from "react";

const CountdownTimer = ({ departure }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(departure) - new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [departure]);

  return (
    <div className="flex gap-5 text-center auto-cols-max ">
      <div className="CountdownTimerBox flex-1">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.days } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={`${timeLeft.days} days`}
          >
            {timeLeft.days}
          </span>
        </span>
        days
      </div>
      <div className="CountdownTimerBox flex-1">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.hours } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={`${timeLeft.hours} hours`}
          >
            {timeLeft.hours}
          </span>
        </span>
        hours
      </div>
      <div className="CountdownTimerBox flex-1">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.minutes } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={`${timeLeft.minutes} minutes`}
          >
            {timeLeft.minutes}
          </span>
        </span>
        min
      </div>
      <div className="CountdownTimerBox flex-1">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.seconds } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={`${timeLeft.seconds} seconds`}
          >
            {timeLeft.seconds}
          </span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountdownTimer;
