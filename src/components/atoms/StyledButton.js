import { useCallback, useState } from "react";

export default function StyledButton({ onClick, children, type, preventDefault = true, disabled = false  }) {
  const [showBubbles, setShowBubbles] = useState()
  function animateButton() {
    setShowBubbles(true)
    setTimeout(function () {
      setShowBubbles(false)
    }, 700);
  };

  const handleClick = useCallback((e) => {
    if(preventDefault) e.preventDefault();
    animateButton()
    if(onClick) onClick()
  }, [onClick, preventDefault])


  return <button type={type} className={showBubbles ? 'bubbly-button animate' : 'button'} onClick={handleClick} disabled={disabled}>{children}</button>

}