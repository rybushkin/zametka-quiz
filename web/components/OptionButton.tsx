"use client";

type Props = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionButton({ label, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`z-option ${selected ? "z-optionSelected" : ""}`}
      aria-pressed={selected}
    >
      <span className="z-optionTitle">{label}</span>
    </button>
  );
}
