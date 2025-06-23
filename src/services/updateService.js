export default function updateService(userInfo) {
  const data = {};
  Object.entries(userInfo).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      data[key] = value;
    }
  });

  const response = fetch("https://log-in-server-qd74.onrender.com/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        window.localStorage.getItem("token") ||
        window.localStorage.getItem("resetPasswordToken"),
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || response.status);
      return data;
    })
    .catch((err) => {
      return { error: true, message: err };
    });

  return response;
}
