export default function checkCodeSevice(code) {
  const result = fetch(
    "https://log-in-server-qd74.onrender.com/users/check-reset-password-code",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("resetPasswordToken"),
      },
      body: JSON.stringify({ code }),
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
