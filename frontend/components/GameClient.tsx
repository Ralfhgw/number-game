"use client";
import { useEffect, useRef, useState } from "react";
import { saveHighscore } from "@/app/game/actions";
import type { HighscoreEntry } from "@/types/types";

export default function GameClient({
  name,
  highscoreList,
}: {
  name: string;
  highscoreList: HighscoreEntry[];
}) {
  const [digits, setDigits] = useState(["", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  const [localHighscoreList, setLocalHighscoreList] = useState<HighscoreEntry[]>(highscoreList);
  const [randomNumber, setRandomNumber] = useState(() => Math.floor(100 + Math.random() * 900));

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (activeIndex < 3) {
      inputRefs[activeIndex].current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[idx] = value;
    setDigits(newDigits);

    if (value && idx < 2) {
      setActiveIndex(idx + 1);
    }
    if (idx === 2 && value) {
      checkNumber([...newDigits.slice(0, 2), value].join(""));
    }
  };

  const checkNumber = async (input: string) => {
    if (input.length !== 3) return;
    const guess = parseInt(input, 10);
    setTries(t => t + 1);

    if (guess < randomNumber) {
      setFeedback("Zu klein!");
      resetInput();
    } else if (guess > randomNumber) {
      setFeedback("Zu groß!");
      resetInput();
    } else {
      setFeedback("Richtig! Highscore wird geprüft...");
      setSuccess(true);
      await handleHighscore();
    }
  };

  const resetInput = () => {
    setDigits(["", "", ""]);
    setActiveIndex(0);
  };

  // Server Action für Highscore
  const now = new Date();
  const created_at = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const handleHighscore = async () => {
    const result = await saveHighscore(name, tries + 1);
    if (result.status === "created") {
      setFeedback("Neuer Highscore eingetragen!");
      setLocalHighscoreList(
        localHighscoreList.map(entry =>
          entry.name === name
            ? { ...entry, score: tries + 1, created_at }
            : entry
        )
      );
    } else if (result.status === "updated") {
      setFeedback("Highscore verbessert!");
      setLocalHighscoreList(
        localHighscoreList.map(entry =>
          entry.name === name ? { ...entry, score: tries + 1 } : entry
        )
      );
    } else {
      setFeedback("Geschafft! (Kein neuer Highscore)");
    }
  };

  // Style Box and BoxContainer
  const boxStyle = "w-16 h-20 mx-2 flex items-center justify-center text-3xl font-bold bg-white border-2 border-gray-300 rounded-lg shadow-2xl transform transition-all perspective-500";
  const containerStyle = "flex justify-center items-center my-8";

  return (
    <div className="flex flex-col items-center justify-start h-300 bg-linear-to-br from-gray-100 to-gray-300">
      <div className="mt-40 flex flex-col items-start">
        <h2 className="w-full text-center text-2xl font-bold mb-4 text-gray-500">
          Hallo, {name}!
        </h2>505
        { /* BoxContainer */}
        <div className={containerStyle}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={success}
              onChange={e => handleChange(idx, e.target.value.replace(/\D/, ""))}
              className={`${boxStyle} ${activeIndex === idx ? "border-gray-900 ring-2" : ""} 
              focus:outline-none text-gray-500 text-center select-none`}
              style={{
                boxShadow: "0 4px 16px rgba(0,0,0,0.15), 0 1.5px 0 #ccc",
                perspective: "500px",
                transform: "rotateX(10deg) rotateY(5deg)",
              }}
            />
          ))}
        </div>

        <div className="mb-4 h-3 text-lg text-gray-700">{feedback}</div>
        <div className=" h-3 text-gray-500 text-sm">Versuche: {tries}</div>
        <div className="h-30 mt-8 flex flex-col items-start w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Highscoreliste</h3>
          <ul className="w-full bg-gray-300 rounded shadow p-4">
            {localHighscoreList.length === 0 && <li className="text-black">Noch keine Einträge</li>}
            {localHighscoreList
              .sort((a, b) => a.score - b.score)
              .map((entry, idx) => (
                <li key={entry.name} className="flex justify-between py-1 text-gray-700 border-b last:border-b-0">
                  <span>
                    {idx + 1}. {entry.name}
                  </span>
                  <span>{entry.score}</span>
                  <span className="ml-4 text-xs text-gray-500">{entry.created_at}</span>
                </li>
              ))}
          </ul>
        </div>
        {success && (
          <button
            className="self-center mt-6 h-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow"
            onClick={() => {
              setRandomNumber(Math.floor(100 + Math.random() * 900));
              setTries(0);
              setSuccess(false);
              setFeedback("");
              resetInput();
            }}
          >
            Nochmal spielen
          </button>
        )}
      </div>
    </div>
  );
}