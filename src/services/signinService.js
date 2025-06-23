export default async function signinServices({ email, password }) {
  try {
    const response = await fetch(
      "https://log-in-server-qd74.onrender.com/users/log-in",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    return { error: true, err };
  }
}
