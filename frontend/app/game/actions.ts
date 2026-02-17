"use server";
import sql from "@/components/db";

export async function saveHighscore(name: string, score: number) {
  // Prüfe, ob der Name existiert
  const result = await sql`
    SELECT score FROM highscore WHERE name = ${name}
  `;
  if (result.length === 0) {
    // Neuer Eintrag
    await sql`
      INSERT INTO highscore (userid, name, score)
      VALUES (gen_random_uuid(), ${name}, ${score})
    `;
    return { status: "created" };
  } else if (score < result[0].score) {
    // Besserer Score: Update
    await sql`
      UPDATE highscore SET score = ${score} WHERE name = ${name}
    `;
    return { status: "updated" };
  }
  return { status: "nochange" };
}