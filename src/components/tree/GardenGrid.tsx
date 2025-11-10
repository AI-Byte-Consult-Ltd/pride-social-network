import { Link } from "react-router-dom";

interface Tree {
  id: string;
  title: string;
  type: "personal" | "shared";
  level: number;
  leavesCount: number;
  fruitsCount: number;
}

export function GardenGrid({ trees }: { trees: Tree[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {trees.map((t) => (
        <Link
          key={t.id}
          to={`/tree/${t.id}`}
          className="bg-white/10 hover:bg-white/20 backdrop-blur p-5 rounded-xl transition transform hover:scale-[1.03]"
        >
          <h2 className="text-xl font-bold mb-2">{t.title}</h2>
          <div className="text-sm text-white/70 mb-2">
            {t.type === "personal" ? "Personal Tree" : "Shared Tree"}
          </div>
          <div className="flex justify-between text-sm text-white/80">
            <span>Level: {t.level}</span>
            <span>🍃 {t.leavesCount}</span>
            <span>🍎 {t.fruitsCount}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
