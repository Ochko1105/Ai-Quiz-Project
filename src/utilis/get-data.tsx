export const GetHistory = async (ID: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Required for server side

  const response = await fetch(`${baseUrl}/api/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ID }),
    cache: "no-store", // Optional: prevent caching
  });

  const responseData = await response.json();
  console.log({ responseData });
  return responseData;
};
