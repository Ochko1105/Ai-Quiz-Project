export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return "";
  }
  // Server-side
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};
