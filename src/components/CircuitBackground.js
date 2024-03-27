import { useEffect, useMemo, useRef, useState } from "react"

const DIRECTIONS = ['up', 'down', 'left', 'right']
const DIRECTION_OPPS = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left',
}


export default function CircuitBackground({ children }) {
    const [startingPoints, setStartingPoints] = useState([])

    const circuitCount = useRef(0)
    useInterval(() => {
        console.log(circuitCount.current)
        if (circuitCount.current < 1000) {
            circuitCount.current += 1
            // eslint-disable-next-line no-restricted-globals
            setStartingPoints([...startingPoints, { startingX: getRandomArbitrary(0, window.innerWidth), startingY: getRandomArbitrary(0, window.innerHeight) }])
            console.log(startingPoints)

        }
    }, 3000)

    return <div style={{ position: 'relative', zIndex: 1 }}>{children}{startingPoints.map(({ startingX, startingY }, i) => {
        return <Circuit key={i} startingX={startingX} startingY={startingY} />
    })}</div>
}


function Circuit({ startingX, startingY }) {
    const step = 1
    const [x, setX] = useState(startingX)
    const [y, setY] = useState(startingY)
    const [trailCoords, setTrailCoords] = useState([])
    const [direction, setDirection] = useState(initDirection())

    useInterval(() => {
        const directionIndex = getRandomArbitrary(0, 3)
        if (DIRECTIONS[directionIndex] !== DIRECTION_OPPS[direction]) {
            setDirection(DIRECTIONS[directionIndex])
        }
    }, 3000)

    useInterval(() => {
        switch (direction) {
            case 'up':
                setY(y + step)
                break;
            case 'down':
                setY(y - step)
                break;
            case 'left':
                setX(x - step)
                break;
            case 'right':
                setX(x + step)
                break;
            default:
                break;
        }

        if (trailCoords.length >= 200) setTrailCoords(trailCoords.splice(-1))

        setTrailCoords([{ x: x + 2, y: y + 2 }, ...trailCoords])


    }, 60)

    const trails = useMemo(() => {
        return trailCoords.map((coord, i) => {
            return <div key={i} className='circuitTail' style={{ right: coord.x, top: coord.y, opacity: (100 - i / 2) * 0.01 }}></div>
        })
    }, [trailCoords])

    return <>
        <div className="circuitHead" style={{ right: x, top: y }}>
        </div>
        {trails}
    </>
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function initDirection() {
    const directionIndex = getRandomArbitrary(0, 3)
    return DIRECTIONS[directionIndex]

}
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}