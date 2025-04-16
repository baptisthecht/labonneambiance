import { Squircle } from "@squircle-js/react";
import { JSX, ReactNode, useEffect, useRef, useState } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

const GlassmorphismCard = ({ children }: GlassmorphismCardProps): JSX.Element => {
  // For tracking current and target mouse positions
  const [haloPosition, setHaloPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const targetPosition = useRef<Position>({ x: 0, y: 0 });
  const requestRef = useRef<number | undefined>(undefined);
  
  // Smooth animation function using requestAnimationFrame
  const animateHalo = (): void => {
    // Implement easing for smooth trailing effect
    setHaloPosition((prev: Position) => ({
      x: prev.x + (targetPosition.current.x - prev.x) * 0.15,
      y: prev.y + (targetPosition.current.y - prev.y) * 0.15
    }));
    
    requestRef.current = requestAnimationFrame(animateHalo);
  };
  
  // Start and stop the animation loop
  useEffect((): (() => void) => {
    if (isHovering) {
      requestRef.current = requestAnimationFrame(animateHalo);
    }
    
    return (): void => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);
  
  // Handle mouse movement - updates the target position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect: DOMRect = e.currentTarget.getBoundingClientRect();
    targetPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Initialize halo position on first move
    if (!isHovering) {
      setHaloPosition(targetPosition.current);
    }
  };

  return (
    <Squircle
      cornerRadius={24}
      cornerSmoothing={0.5}
      className="relative p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-black/5 overflow-hidden cursor-none"
      onMouseEnter={(): void => setIsHovering(true)}
      onMouseLeave={(): void => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {isHovering && (
        <>
          <div
            className="absolute w-32 h-32 rounded-full bg-white/20 blur-2xl pointer-events-none mix-blend-overlay"
            style={{
              left: `${haloPosition.x - 64}px`,
              top: `${haloPosition.y - 64}px`,
            }}
          />
        </>
      )}
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </Squircle>
  );
};

export default GlassmorphismCard;