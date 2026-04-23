function Button({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-500 px-4 py-2 rounded-xl font-medium ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;