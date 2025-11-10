import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type TreeType = "personal" | "joint";

interface Props {
  onCreate: (title: string, type: TreeType) => void;
  userLevel?: number; // приходит из Garden, по умолчанию 1
}

export function CreateTreeModal({ onCreate, userLevel = 1 }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TreeType>("personal");
  const [hint, setHint] = useState<string | null>(null);

  // Лимитные подсказки (информативные, не блокирующие)
  const levelTips = useMemo(() => {
    // L1: 1 personal + 1 joint
    if (userLevel === 1) {
      return "Level 1 allows 1 Personal and 1 Joint tree.";
    }
    if (userLevel === 2) return "Level 2 allows up to 2 Personal and 1 Joint trees.";
    if (userLevel === 3) return "Level 3 allows up to 2 Personal and 2 Joint trees.";
    if (userLevel === 4) return "Level 4 allows up to 3 Personal and 3 Joint trees.";
    return "Tree Whisperer: virtually no limits.";
  }, [userLevel]);

  const normalizeType = (v: string): TreeType => {
    const t = v.toLowerCase().trim();
    return t === "joint" ? "joint" : "personal";
  };

  const handleSubmit = () => {
    const name = title.trim();
    if (!name) {
      setHint("Please enter a tree name.");
      return;
    }
    const t = normalizeType(type);
    onCreate(name, t);
    // Сброс состояния
    setOpen(false);
    setTitle("");
    setType("personal");
    setHint(null);
  };

  return (
    <>
      {/* Кнопка открытия */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        🌳 Create New Tree
      </Button>

      {/* Модалка */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card/90 p-6 rounded-xl w-80 border border-white/10 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Create a Tree
            </h2>

            <p className="text-xs text-white/60 mb-4">{levelTips}</p>

            {/* Имя */}
            <input
              type="text"
              placeholder="Tree name…"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHint(null);
              }}
              className="w-full mb-3 px-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-pink-500 transition-all"
            />

            {/* Тип */}
            <select
              value={type}
              onChange={(e) => setType(normalizeType(e.target.value))}
              className="w-full mb-5 px-3 py-2 rounded-md bg-white/10 text-white outline-none border border-white/20 focus:border-purple-500 transition-all"
            >
              <option value="personal">Personal Tree 🌱</option>
              <option value="joint">Joint Tree 🤝</option>
            </select>

            {/* Подсказка/ошибка локальная */}
            {hint && (
              <div className="mb-3 text-red-300 bg-red-900/30 p-2 rounded border border-red-700/40 text-xs">
                {hint}
              </div>
            )}

            {/* Кнопки */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setHint(null);
                }}
                className="text-white border-white/40 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
              >
                Plant
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateTreeModal;
