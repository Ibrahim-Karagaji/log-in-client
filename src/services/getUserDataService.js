export default async function getUserDataService(authorization) {
  try {
    const response = await fetch(
      "https://log-in-server-qd74.onrender.com/users/get-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || response.status);
    }
    return data;
  } catch (err) {
    return { error: true, err };
  }
}
