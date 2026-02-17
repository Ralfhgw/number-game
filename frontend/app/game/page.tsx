import GameClient from "@/components/GameClient";
import sql from "@/components/db"; 
import { HighscoreEntry } from "@/types/types"


async function getHighscoreList() {
  const result = await sql`
    SELECT name, score, TO_CHAR(created_at, 'DD-MM-YYYY HH24:MI') AS created_at
    FROM highscore
    ORDER BY score ASC
  `;
  return result as unknown as HighscoreEntry[];
}

export default async function GamePage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const params = await searchParams;
  const name = params?.name || "Spieler";
  const highscoreList = await getHighscoreList();

  return <GameClient name={name} highscoreList={highscoreList} />;
}