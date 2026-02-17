import { NextResponse } from "next/server";
import sql from "@/components/db";

export async function GET() {
  const result = await sql`
    SELECT name, score, TO_CHAR(created_at, 'DD-MM-YYYY HH24:MI') AS created_at
    FROM highscore
    ORDER BY score ASC
  `;
  return NextResponse.json(Array.from(result));
}