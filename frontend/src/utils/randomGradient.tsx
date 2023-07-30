const gradients = [
  "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-br from-green-300 via-blue-500 to-purple-600",
  "bg-gradient-to-br from-green-200 via-green-400 to-purple-700",
  "bg-gradient-to-br from-indigo-300 to-purple-400",
  "bg-gradient-to-br from-green-200 to-green-500",
  "bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-400",
  "bg-gradient-to-br from-rose-200 to-teal-200",
  "bg-gradient-to-br from-rose-700 to-pink-600",
  "bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500",
];
export const gradient = gradients[Math.floor(Math.random() * gradients.length)];
