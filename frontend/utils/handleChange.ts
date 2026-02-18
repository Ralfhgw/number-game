export function handleChangeUtil({
  idx,
  value,
  digits,
  setDigits,
  setActiveIndex,
  setInvalidIndex,
  checkNumber,
}: {
  idx: number;
  value: string;
  digits: string[];
  setDigits: (digits: string[]) => void;
  setActiveIndex: (idx: number) => void;
  setInvalidIndex: (idx: number | null) => void;
  checkNumber: (input: string) => void;
}) {
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
}