import type { HighscoreEntry } from "@/types/types";

export default function HighscoreList({ list }: { list: HighscoreEntry[] }) {
  return (
    <div className="w-full rounded p-4 bg-gray-300" style={{ boxShadow: "0 0 32px 8px rgba(0,0,0,0.35)" }}>
      {list.length === 0 ? (
        <div className="text-black">Noch keine Einträge</div>
      ) : (
        <table className="w-full text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="text-left font-bold w-10">#</th>
              <th className="text-left font-bold w-40">Name</th>
              <th className="text-left font-bold w-20">Score</th>
              <th className="text-left font-bold w-30">Datum</th>
            </tr>
          </thead>
          <tbody>
            {list
              .sort((a, b) => a.score - b.score)
              .map((entry, idx) => (
                <tr key={entry.name} className="border-b last:border-b-0">
                  <td className="py-1">{idx + 1}.</td>
                  <td className="py-1">{entry.name}</td>
                  <td className="py-1 text-right p-14">{entry.score}</td>
                  <td className="py-1 text-xs text-gray-500">{entry.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}