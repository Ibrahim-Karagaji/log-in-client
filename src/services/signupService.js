export default async function signupService({ name, email, password }) {
  try {
    const response = await fetch(
      "https://log-in-server-qd74.onrender.com/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
