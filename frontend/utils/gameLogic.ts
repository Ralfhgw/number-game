import { saveHighscore } from "@/app/game/actions";

export async function checkNumberAndHandleHighscore({
  input,
  randomNumber,
  setTries,
  setFeedback,
  resetInput,
  setSuccess,
  name,
  tries,
  fetchHighscoreList,
}: {
  input: string;
  randomNumber: number;
  setTries: React.Dispatch<React.SetStateAction<number>>;
  setFeedback: (msg: string) => void;
  resetInput: () => void;
  setSuccess: (val: boolean) => void;
  name: string;
  tries: number;
  fetchHighscoreList: () => Promise<void>;
}) {
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
    const result = await saveHighscore(name, tries + 1);
    if (result.status === "created") {
      setFeedback("Neuer Highscore eingetragen!");
    } else if (result.status === "updated") {
      setFeedback("Highscore verbessert!");
    } else {
      setFeedback("Geschafft! (Kein neuer Highscore)");
    }
    await fetchHighscoreList();
  }
}