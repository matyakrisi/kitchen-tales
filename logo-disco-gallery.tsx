import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const kitchenTales = [
  { id: 1, title: "Pasta Perfection", date: "2023-05-15", thumbnail: "/placeholder.svg?height=180&width=320", description: "Mastering the art of al dente", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 2, title: "Sushi Adventure", date: "2023-06-02", thumbnail: "/placeholder.svg?height=180&width=320", description: "Rolling like a pro", youtubeUrl: "https://www.youtube.com/watch?v=rzUoy59w6YM" },
  { id: 3, title: "Baking Bonanza", date: "2023-04-20", thumbnail: "/placeholder.svg?height=180&width=320", description: "Sweet treats and rising feats" },
  { id: 4, title: "Spice Journey", date: "2023-07-10", thumbnail: "/placeholder.svg?height=180&width=320", description: "Exploring flavors from around the world" },
  { id: 5, title: "Veggie Delight", date: "2023-03-30", thumbnail: "/placeholder.svg?height=180&width=320", description: "Green goodness on a plate" },
  { id: 6, title: "Grilling Mastery", date: "2023-06-25", thumbnail: "/placeholder.svg?height=180&width=320", description: "Fire up the flavor" },
  { id: 7, title: "Soup Sensation", date: "2023-05-05", thumbnail: "/placeholder.svg?height=180&width=320", description: "Comfort in a bowl" },
  { id: 8, title: "Dessert Dreams", date: "2023-07-01", thumbnail: "/placeholder.svg?height=180&width=320", description: "Sweet endings to every meal" },
]

const WavesBackground = ({ isHovered }) => {
  return (
    <div className="waves-container absolute inset-0 overflow-hidden z-0">
      <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={`parallax ${isHovered ? 'hovered' : ''}`}>
          <use xlinkHref="#gentle-wave" x="48" y="0" />
          <use xlinkHref="#gentle-wave" x="48" y="3" />
          <use xlinkHref="#gentle-wave" x="48" y="5" />
          <use xlinkHref="#gentle-wave" x="48" y="7" />
        </g>
      </svg>
      <div className={`copyright absolute bottom-0 left-0 right-0 text-center text-xs ${isHovered ? 'text-white opacity-50' : 'text-black'} pb-2 z-10`}>
        🖤 Made this from the heart, inspired by family, crafted with love just for my twins & broskis 🖤
      </div>
    </div>
  )
}

const RainDrop = ({ style }) => (
  <div
    className="absolute w-1 bg-purple-500 opacity-70 rain-drop"
    style={style}
  ></div>
)

const RainEffect = () => {
  const raindrops = Array.from({ length: 50 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 2}px`,
    animationDuration: `${Math.random() * 0.5 + 0.75}s`,
    animationDelay: `${Math.random() * 2}s`,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {raindrops.map((style, index) => (
        <RainDrop key={index} style={style} />
      ))}
    </div>
  )
}

const YouTubeEmbed = ({ url }) => {
  const [showVideo, setShowVideo] = useState(false)
  const videoId = url.split('v=')[1]
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`

  const handleClick = () => {
    setShowVideo(true)
  }

  if (showVideo) {
    return (
      <iframe
        width="100%"
        height="180"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    )
  }

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <Image
        src={thumbnailUrl}
        alt="YouTube video thumbnail"
        width={320}
        height={180}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

export default function LogoDiscoGallery() {
  const [hoveredId, setHoveredId] = useState(null)
  const [layout, setLayout] = useState([])
  const [isRaining, setIsRaining] = useState(false)
  const [title, setTitle] = useState("LogoDisco")
  const [subtitle, setSubtitle] = useState("by El Chico")
  const containerRef = useRef(null)

  const alternativeTitles = [
    "this one is either an L or W",
    "idk first try",
    "sound is sounding"
  ]

  useEffect(() => {
    const gridSize = 4
    const cellSize = 100 / gridSize
    const newLayout = kitchenTales.map((tale, index) => {
      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      return {
        ...tale,
        originalTop: `${row * cellSize + Math.random() * (cellSize / 2)}%`,
        originalLeft: `${col * cellSize + Math.random() * (cellSize / 2)}%`,
        top: `${row * cellSize + Math.random() * (cellSize / 2)}%`,
        left: `${col * cellSize + Math.random() * (cellSize / 2)}%`,
        rotate: Math.random() * 10 - 5,
      }
    })
    setLayout(newLayout)
  }, [])

  const handleMouseEnter = (id) => {
    setHoveredId(id)
    setIsRaining(true)
    setTitle(alternativeTitles[Math.floor(Math.random() * alternativeTitles.length)])
    setSubtitle("")
    setLayout(prevLayout => 
      prevLayout.map(item => {
        if (item.id === id) {
          return item
        }
        const containerHeight = containerRef.current.clientHeight
        const maxBottomPosition = containerHeight - 200 // Ensure it stays within viewport
        const bottomPosition = Math.min(Math.random() * containerHeight, maxBottomPosition)
        return {
          ...item,
          top: `${bottomPosition}px`,
          left: `${Math.random() * 80}%`,
          rotate: Math.random() * 20 - 10,
          opacity: 0.5 // Add opacity
        }
      })
    )
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
    setIsRaining(false)
    setTitle("LogoDisco")
    setSubtitle("by El Chico")
    setLayout(prevLayout => 
      prevLayout.map(item => ({
        ...item,
        top: item.originalTop,
        left: item.originalLeft,
        rotate: Math.random() * 10 - 5,
        opacity: 1 // Restore full opacity
      }))
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-900">
      <WavesBackground isHovered={isRaining} />
      {isRaining && <RainEffect />}
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-300 pulsating-title">
          <div className="text-5xl mb-2">🪩 {title} 🪩</div>
          {subtitle && <div className="font-sans text-3xl text-blue-300">{subtitle}</div>}
        </h1>
        <div ref={containerRef} className="relative w-full h-[calc(100vh-100px)]">
          {layout.map((tale) => (
            <div
              key={tale.id}
              className="absolute w-64 transition-all duration-700 ease-in-out hover:z-20"
              style={{
                top: tale.top,
                left: tale.left,
                transform: `rotate(${tale.rotate}deg)`,
                opacity: tale.opacity || 1,
              }}
              onMouseEnter={() => handleMouseEnter(tale.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`bg-gray-400 rounded-lg shadow-lg overflow-hidden border-2 border-purple-500 relative ${hoveredId === tale.id ? 'pulsating-border' : ''}`}>
                <div className="relative">
                  {tale.youtubeUrl ? (
                    <YouTubeEmbed url={tale.youtubeUrl} />
                  ) : (
                    <Image
                      src={tale.thumbnail}
                      alt={tale.title}
                      width={320}
                      height={180}
                      className="w-full h-auto"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-30"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-700 bg-opacity-80">
                    <p className="text-sm text-purple-300">{tale.description}</p>
                  </div>
                  {hoveredId === tale.id && !tale.youtubeUrl && (
                    <div className="absolute inset-0 bg-purple-800 bg-opacity-70 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="text-lg font-semibold mb-1 text-gray-800">{tale.title}</h2>
                  <p className="text-sm text-gray-600">{tale.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          height: 100%;
        }
        body {
          position: relative;
        }
        .waves-container {
          position: absolute;
          width: 100%;
          height: 100vh;
          bottom: 0;
          left: 0;
          background: #000000;
        }

        .waves {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 200px;
          min-height: 200px;
          max-height: 300px;
        }

        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }

        .parallax > use {
          fill: rgba(255, 255, 255, 0.7);
        }

        .parallax.hovered > use:nth-child(1) {
          fill: rgba(128, 0, 128, 0.7);
        }
        .parallax.hovered > use:nth-child(2) {
          fill: rgba(128, 0, 128, 0.5);
        }
        .parallax.hovered > use:nth-child(3) {
          fill: rgba(169, 169, 169, 0.3);
        }
        .parallax.hovered > use:nth-child(4) {
          fill: rgba(169, 169, 169, 0.1);
        }

        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          50% {
            transform: translate3d(85px, 0, 0);
          }
          100% {
            transform: translate3d(-90px, 0, 0);
          }
        }

        .container {
          position: relative;
          z-index: 10;
        }

        .bg-gray-900 {
          background-color: #111827;
        }

        .rain-drop {
          animation: rain-fall linear infinite;
        }

        @keyframes rain-fall {
          0% {
            transform: translateY(-100vh);
            height: 40px;
            opacity: 0;
          }
          50% 
          {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            height: 80px;
            opacity: 0;
          }
        }

        .pulsating-border {
          animation: pulsate 2s ease-out infinite;
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(128, 0, 128, 0.7);
        }

        @keyframes pulsate {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(128, 0, 128, 0.7);
          }
          70% {
            box-shadow: 0 0 0 50px rgba(255, 255, 255, 0), 0 0 0 25px rgba(128, 0, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 0 rgba(128, 0, 128, 0);
          }
        }

        .pulsating-title {
          animation: pulsate-title 2s ease-out infinite;
          text-shadow: 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 rgba(128, 0, 128, 0.7);
        }

        @keyframes pulsate-title {
          0% {
            text-shadow: 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 rgba(128, 0, 128, 0.7);
          }
          70% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.7), 0 0 10px rgba(128, 0, 128, 0.7);
          }
          100% {
            text-shadow: 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(128, 0, 128, 0);
          }
        }
        .waves-container .copyright {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.75rem;
          z-index: 10;
          animation: float-text 3s ease-in-out infinite;
          transition: color 0.3s ease, opacity 0.3s ease;
        }

        .waves-container .copyright.text-white {
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }

        @keyframes float-text {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  )
}