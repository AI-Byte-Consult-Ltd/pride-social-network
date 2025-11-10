import { useEffect, useRef } from "react";

interface Leaf {
  id: string;
  message: string;
  x: number;
  y: number;
  color: string;
  createdAt: string;
}

interface Props {
  leaves: Leaf[];
  onLeafClick: (leaf: Leaf) => void;
}

export function TreeCanvas({ leaves, onLeafClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const baseY = canvas.height * 0.9;
      const trunkHeight = canvas.height * 0.3;

      // Breathing animation
      const breath = Math.sin(time * 0.001) * 3;

      // Draw trunk
      ctx.strokeStyle = "#4a2511";
      ctx.lineWidth = 20 + breath;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(centerX, baseY);
      ctx.lineTo(centerX, baseY - trunkHeight);
      ctx.stroke();

      // Draw branches recursively
      const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
        if (depth === 0 || length < 5) return;

        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;

        const gradient = ctx.createLinearGradient(x, y, endX, endY);
        gradient.addColorStop(0, "#4a2511");
        gradient.addColorStop(1, "#6b4423");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = depth * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        const newLength = length * 0.7;
        const angleOffset = 0.3 + Math.sin(time * 0.002 + depth) * 0.05;

        drawBranch(endX, endY, newLength, angle - angleOffset, depth - 1);
        drawBranch(endX, endY, newLength, angle + angleOffset, depth - 1);
      };

      // Main branches
      drawBranch(centerX, baseY - trunkHeight, canvas.height * 0.15, -Math.PI / 2 - 0.3, 6);
      drawBranch(centerX, baseY - trunkHeight, canvas.height * 0.15, -Math.PI / 2 + 0.3, 6);

      time += 16;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
      
      {/* Render leaves over canvas */}
      <div className="absolute inset-0">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            onClick={() => onLeafClick(leaf)}
            className="absolute cursor-pointer transition-transform hover:scale-125 animate-fade-in"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, ${leaf.color}, transparent)`,
                boxShadow: `0 0 20px ${leaf.color}`,
              }}
            >
              🍃
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TreeCanvas;
