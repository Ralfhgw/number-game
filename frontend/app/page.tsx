"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-orange-500">Zahlenratespiel</h1>
        <p className="mb-6 text-gray-700">
          Errate die geheime Zahl! Gib eine Zahl ein und erfahre, ob sie zu klein, zu groß oder genau richtig ist.
          Die Anzahl deiner Versuche wird gezählt. Bei einem Treffer kommst du in die Highscoreliste!
        </p>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Dein Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-400 text-black rounded px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <Link
            href={name.trim() ? `/game?name=${encodeURIComponent(name)}` : "#"}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded transition w-full max-w-xs text-center ${!name.trim() ? "opacity-50 pointer-events-none" : ""}`}
          >
            Zum Spiel
          </Link>
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm">
        © 2026 Zahlenratespiel
      </footer>
    </main>
  );
}