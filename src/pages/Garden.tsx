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

// Лимиты по уровням: Level 1 → 1 personal + 1 joint
const levelLimits: Record<number, { personal: number; joint: number }> = {
  1: { personal: 1, joint: 1 },
  2: { personal: 2, joint: 1 },
  3: { personal: 2, joint: 2 },
  4: { personal: 3, joint: 3 },
  5: { personal: 999, joint: 999 },
};

// Требования для апгрейда
const upgradeRequirements: Record<number, { personal: number; joint: number } | null> = {
  1: { personal: 1, joint: 1 },
  2: { personal: 2, joint: 1 },
  3: { personal: 2, joint: 2 },
  4: { personal: 3, joint: 3 },
  5: null,
};

export function Garden() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Подсчёт деревьев
  const counts = useMemo(() => {
    const personal = trees.filter((t) => t.type === "personal").length;
    const joint = trees.filter((t) => t.type === "joint").length;
    return { personal, joint };
  }, [trees]);

  useEffect(() => {
    loadTrees();
  }, []);

  const loadTrees = async () => {
    setError(null);
    try {
      const res = await fetch("https://n8n.nics.space/webhook/trees/mine");
      const data = await res.json();
      setTrees(Array.isArray(data?.trees) ? data.trees : []);
    } catch (err) {
      console.error("Failed to load trees:", err);
      setError("Failed to load your garden. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createTree = async (title: string, type: string) => {
    setError(null);
    setInfo(null);

    // --- Проверка лимита на фронте ---
    const limit = levelLimits[userLevel];
    const current = counts[type as "personal" | "joint"];
    if (current >= limit[type as "personal" | "joint"]) {
      setError(
        `You reached the limit for ${type === "joint" ? "Joint" : "Personal"} trees at Level ${userLevel}. Upgrade to unlock more.`
      );
      return;
    }

    try {
      const res = await fetch("https://n8n.nics.space/webhook/trees/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type,
          userLevel,
          counts, // отправляем текущие количества
        }),
      });

      const data = await res.json();

      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.tree) {
        setTrees((prev) => [...prev, data.tree]);
        setInfo(`${data.tree.type === "joint" ? "Joint" : "Personal"} tree “${data.tree.title}” planted successfully!`);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error creating tree:", err);
      setError("Something went wrong while creating your tree.");
    }
  };

  // Проверка, можно ли апгрейдиться
  const canUpgrade = () => {
    const req = upgradeRequirements[userLevel];
    if (!req) return false;
    return counts.personal >= req.personal && counts.joint >= req.joint;
  };

  const upgradeLevel = () => {
    setError(null);
    setInfo(null);

    if (userLevel >= 5) {
      setError("You have reached the maximum level (Tree Whisperer).");
      return;
    }

    if (!canUpgrade()) {
      const req = upgradeRequirements[userLevel]!;
      setError(
        `To upgrade to Level ${userLevel + 1}, you need at least ${req.personal} personal and ${req.joint} joint tree(s). 
         You currently have ${counts.personal} personal and ${counts.joint} joint.`
      );
      return;
    }

    setUserLevel((prev) => prev + 1);
    setInfo(`Congrats! You've reached Level ${userLevel + 1}: ${levelTitles[userLevel + 1]}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your garden...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🌈 Your Garden
        </h1>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-1">
            Level {userLevel}: {levelTitles[userLevel]}
          </h2>
          <p className="text-white/70">
            {userLevel < 5
              ? `Unlock more trees as you grow — reach ${levelTitles[userLevel + 1]} to expand your garden.`
              : "You’ve reached the ultimate rank — Tree Whisperer!"}
          </p>
          <Button
            variant="outline"
            onClick={upgradeLevel}
            className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none hover:scale-105 transition-transform"
          >
            Upgrade Level
          </Button>
        </div>

        {/* MESSAGES */}
        {error && (
          <div className="mb-4 text-center text-red-300 bg-red-900/30 p-3 rounded-md border border-red-700/40">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 text-center text-green-300 bg-green-900/30 p-3 rounded-md border border-green-700/40">
            {info}
          </div>
        )}

        {/* COUNTERS */}
        <div className="mb-6 text-center text-white/70">
          <span className="mx-2">Personal: {counts.personal}</span>
          <span className="mx-2">Joint: {counts.joint}</span>
        </div>

        {/* TREE CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {trees.length > 0 ? (
            trees.map((tree) => (
              <div
                key={tree.id}
                className="p-5 rounded-xl border border-white/10 bg-card hover:bg-white/5 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold mb-1">{tree.title}</h3>
                <p className="text-sm text-white/60 mb-2">
                  {tree.type === "joint" ? "Joint Tree 🤝" : "Personal Tree 🌱"}
                </p>
                <div className="flex gap-4 text-sm text-white/70">
                  <span>🌿 {tree.leavesCount}</span>
                  <span>🍎 {tree.fruitsCount}</span>
                  <span>Lvl {tree.level}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white/50">No trees yet. Plant your first one!</p>
          )}
        </div>

        {/* CREATE BUTTON */}
        <div className="text-center">
          <CreateTreeModal onCreate={createTree} userLevel={userLevel} />
        </div>
      </div>
    </div>
  );
}

export default Garden;
