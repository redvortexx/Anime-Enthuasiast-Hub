import React, { useEffect } from "react";
import "../styles/WelcomeAnimation.scss";

function WelcomeAnimation({ user, onAnimationEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="welcome-animation">
      <svg viewBox="0 0 600 300">
        <symbol id="s-text">
          <text text-anchor="middle" x="50%" y="50%" dy=".35em">
            Welcome {user}
          </text>
        </symbol>
        <use className="text" xlinkHref="#s-text"></use>
        <use className="text" xlinkHref="#s-text"></use>
        <use className="text" xlinkHref="#s-text"></use>
        <use className="text" xlinkHref="#s-text"></use>
        <use className="text" xlinkHref="#s-text"></use>
      </svg>
    </div>
  );
}

export default WelcomeAnimation;
