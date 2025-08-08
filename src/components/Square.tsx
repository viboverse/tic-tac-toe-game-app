type SquareProps = {
  mark: "X" | "O" | null;
  onClick: () => void;
};

export default function Square({ mark, onClick }: SquareProps) {
  return (
    <button
      className={`flex h-16 w-16 items-center justify-center rounded-sm border-2 border-gray-400 text-6xl font-bold md:h-24 md:w-24 ${mark === "X" ? "text-[#405ef5]" : mark === "O" ? "text-[#ff7f0a]" : ""}`}
      onClick={onClick}
    >
      {mark}
    </button>
  );
}
