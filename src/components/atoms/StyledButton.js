import { useState } from "react";

export default function StyledButton({onClick, children}) {
    const [showBubbles, setShowBubbles] = useState()
    function animateButton(e) {

        e.preventDefault();

        setShowBubbles(true)
        setTimeout(function(){
    
          setShowBubbles(false)
        },700);
    };
      

    return <button className={showBubbles ? 'bubbly-button animate': 'button'} onClick={animateButton}>{children}</button>
    
}