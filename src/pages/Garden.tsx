import { useEffect, useState } from "react";
import { TreeCanvas } from "@/components/tree/TreeCanvas";
import { AddLeafModal } from "@/components/tree/AddLeafModal";
import { useToast } from "@/hooks/use-toast";

interface Leaf {
  id: string;
  message: string;
  x: number;
  y: number;
  color: string;
  createdAt: string;
}

const prideColors = [
  "#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982",
];

const levelTitles: Record<number, string> = {
  1: "Seedling 🌱",
  2: "Sprout 🌿",
  3: "Gardener 🌸",
  4: "Bloom Master 🌼",
  5: "Tree Whisperer 🌳",
};

export function Garden() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [selectedLeaf, setSelectedLeaf] = useState<Leaf | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const mockLeaves: Leaf[] = [
      { id: "1", message: "Welcome to your Tree of Life! 🌳", x: 45, y: 35, color: prideColors[0], createdAt: new Date().toISOString() },
      { id: "2", message: "Every message makes your tree grow stronger", x: 55, y: 40, color: prideColors[1], createdAt: new Date().toISOString() },
      { id: "3", message: "Share love and watch it bloom", x: 50, y: 30, color: prideColors[2], createdAt: new Date().toISOString() },
    ];
    setLeaves(mockLeaves);
  }, []);

  const addLeaf = (message: string) => {
    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 40;
    const color = prideColors[Math.floor(Math.random() * prideColors.length)];
    const newLeaf: Leaf = { id: Date.now().toString(), message, x, y, color, createdAt: new Date().toISOString() };
    setLeaves((prev) => [...prev, newLeaf]);
    toast({ title: "🍃 Leaf Added!", description: "Your message is now growing on your tree", duration: 3000 });
    
    if (leaves.length > 0 && (leaves.length + 1) % 5 === 0 && userLevel < 5) {
      setTimeout(() => {
        setUserLevel((prev) => prev + 1);
        toast({ title: "🌳 Level Up!", description: `You've reached ${levelTitles[userLevel + 1]}`, duration: 5000 });
      }, 1000);
    }
  };

  const treeLevel = Math.min(5, Math.floor(leaves.length / 5) + 1);
  const fruitsCount = Math.floor(leaves.length / 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#1a0a2e] to-[#0f0520] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            🌳 Your Tree of Life
          </h1>
          <p className="text-lg text-white/70 mb-6">Level {userLevel}: {levelTitles[userLevel]}</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-green-400">{leaves.length}</div>
              <div className="text-sm text-white/60">🌿 Leaves</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-red-400">{fruitsCount}</div>
              <div className="text-sm text-white/60">🍎 Fruits</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-purple-400">{treeLevel}</div>
              <div className="text-sm text-white/60">🌳 Tree Level</div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <TreeCanvas leaves={leaves} onLeafClick={setSelectedLeaf} />
        </div>
        
        <div className="text-center mb-8">
          <AddLeafModal onAddLeaf={addLeaf} />
        </div>
        
        {selectedLeaf && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setSelectedLeaf(null)}>
            <div className="bg-gradient-to-br from-card/95 to-muted/95 backdrop-blur-xl p-8 rounded-2xl max-w-md border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">🍃</div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Leaf Message</h3>
              </div>
              <p className="text-white text-center mb-6 text-lg">{selectedLeaf.message}</p>
              <div className="text-center text-sm text-white/50">Created: {new Date(selectedLeaf.createdAt).toLocaleString()}</div>
            </div>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            How Your Tree Grows
          </h2>
          <div className="space-y-3 text-white/70">
            <p>🍃 <strong>Add leaves</strong> by sharing your thoughts and messages</p>
            <p>🌳 <strong>Level up</strong> your tree every 5 leaves</p>
            <p>🍎 <strong>Earn fruits</strong> as rewards for growing your tree</p>
            <p>✨ <strong>Watch</strong> your tree breathe and glow with life</p>
            <p>💚 Each leaf costs <strong>1 PRIDE token</strong> to grow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garden;
