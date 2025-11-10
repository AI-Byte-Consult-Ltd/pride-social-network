interface LeafProps {
  x: number;
  y: number;
  message: string;
  color: string;
  onClick: () => void;
}

export function Leaf({ x, y, message, color, onClick }: LeafProps) {
  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-150 animate-fade-in"
        style={{
          background: `radial-gradient(circle, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}`,
        }}
      >
        🍃
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-card/95 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap shadow-xl max-w-[200px] truncate">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Leaf;
