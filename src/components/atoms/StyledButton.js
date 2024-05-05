import { useCallback, useState } from "react";

export default function StyledButton({ onClick, children }) {
  const [showBubbles, setShowBubbles] = useState()
  function animateButton() {
    setShowBubbles(true)
    setTimeout(function () {
      setShowBubbles(false)
    }, 700);
  };

  const handleClick = useCallback((e) => {
    e.preventDefault();
    animateButton()
    onClick()
  }, [onClick])


  return <button className={showBubbles ? 'bubbly-button animate' : 'button'} onClick={handleClick}>{children}</button>

}