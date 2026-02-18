export type HighscoreEntry = {
  name: string;
  score: number;
  created_at: string;
};

export type GameInputProps = {
  digits: string[];
  activeIndex: number;
  success: boolean;
  invalidIndex: number | null;
  inputRefs: React.RefObject<HTMLInputElement | null>[];
  handleChange: (idx: number, value: string) => void;
  boxStyle: string;
  containerStyle: string;
};