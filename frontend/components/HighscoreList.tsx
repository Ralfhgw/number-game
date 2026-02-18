import type { HighscoreEntry } from "@/types/types";

export default function HighscoreList({ list }: { list: HighscoreEntry[] }) {
  return (
    <ul className="w-full rounded p-4 bg-gray-300" style={{ boxShadow: "0 0 32px 8px rgba(0,0,0,0.35)" }}>
      {list.length === 0 && <li className="text-black">Noch keine Einträge</li>}
      {list
        .sort((a, b) => a.score - b.score)
        .map((entry, idx) => (
          <li key={entry.name} className="flex flex-row items-center justify-between gap-16 py-1 text-gray-700 border-b last:border-b-0">
            <span>
              {idx + 1}. {entry.name}
            </span>
            <span>{entry.score}</span>
            <span className="text-xs text-gray-500">{entry.created_at}</span>
          </li>
        ))}
    </ul>
  );
}