export default function resetPasswordCode(email) {
  const result = fetch(
    "https://log-in-server-qd74.onrender.com/users/reset-password-code",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  )
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      return data;
    })
    .catch((err) => {
      return { error: true, err };
    });

  return result;
}
