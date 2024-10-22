export const fetchUserById = async (userId: string) => {
  const registerUrl = process.env.NEXT_PUBLIC_USER;
  console.log(registerUrl);

  if (!registerUrl) {
    throw new Error("The USER environment variable is not defined.");
  }
  const response = await fetch(registerUrl + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something wrog please try login again"
    );
  }

  return await response.json();
};
