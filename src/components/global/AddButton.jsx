export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary text-dark w-14 h-14 rounded-full text-3xl shadow-xl"
    >
      +
    </button>
  );
}
