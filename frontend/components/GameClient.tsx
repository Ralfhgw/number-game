"use client";
import { useEffect, useRef, useState } from "react";
import type { HighscoreEntry } from "@/types/types";
import GameInput from "@/components/GameInput";
import HighscoreList from "@/components/HighscoreList";
import { checkNumberAndHandleHighscore } from "@/utils/gameLogic";

import Image from "next/image";

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
  const [invalidIndex, setInvalidIndex] = useState<number | null>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Fetch /api/highscore
  const fetchHighscoreList = async () => {
    const res = await fetch("/api/highscore", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setLocalHighscoreList(data);
    }
  };

  useEffect(() => {
    if (activeIndex < 3) {
      inputRefs[activeIndex].current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleChange = (idx: number, value: string) => {
    if (value !== "" && !/^\d$/.test(value)) {
      setInvalidIndex(idx);
      setTimeout(() => setInvalidIndex(null), 1000);
      return;
    }

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

  const resetInput = () => {
    setDigits(["", "", ""]);
    setActiveIndex(0);
  };

  const checkNumber = async (input: string) => {
    await checkNumberAndHandleHighscore({
      input,
      randomNumber,
      setTries,
      setFeedback,
      resetInput,
      setSuccess,
      name,
      tries,
      fetchHighscoreList,
    });
  };

  // Style Box and BoxContainer
  const boxStyle = "w-18 h-20 mx-2 flex items-center justify-center text-3xl font-bold bg-white border-2 border-gray-300 rounded-lg transition-all";
  const containerStyle = "flex justify-center items-center my-8";

  return (
    <div className="flex flex-row h-screen items-center justify-center bg-linear-to-t from-gray-300 to-gray-900">
      <div className="flex flex-row justify-start gap-30">
        { /* Left Box */}
        <div className="rounded-xl flex flex-col items-start w-full">
          <HighscoreList list={localHighscoreList} />
        </div>
        { /* Right Box*/}
        <div className="h-60 flex flex-col items-start">
          <h2 className="w-full text-center text-2xl font-bold text-gray-300">
            Gib alles, {name}!
          </h2>
          { /* BoxContainer */}
          <GameInput
            digits={digits}
            activeIndex={activeIndex}
            success={success}
            invalidIndex={invalidIndex}
            inputRefs={inputRefs}
            handleChange={handleChange}
            boxStyle={boxStyle}
            containerStyle={containerStyle}
          />

          <div className="mb-4 h-3 w-full text-center text-base text-gray-300">{feedback}</div>
          <div className="w-full text-center h-3 text-gray-300 text-sm">Versuche: {tries}</div>

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

      <div
        style={{
          background: "#fff",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 50,
          height: "60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            border: "none",
            left: 0,
            bottom: 0,
            animation: "walkman 26s linear infinite",
            userSelect: "none",
            filter: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/giphy.gif"
            alt="Pixelmännchen"
            width={240}
            height={240}
            style={{ imageRendering: "pixelated", border: "none", margin: 0, padding: 0 }}
            priority
          />
        </div>
        <style>
          {`@keyframes walkman { 0% { left: 0; } 100% { left: calc(100vw - 240px); }}`}
        </style>
      </div>

    </div>
  );
}