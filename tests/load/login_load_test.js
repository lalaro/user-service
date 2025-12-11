import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
  { duration: "10s", target: 10 },
  { duration: "10s", target: 50 },
  { duration: "10s", target: 100 },
  { duration: "10s", target: 150 },
  { duration: "10s", target: 200 },
  { duration: "10s", target: 250 },
  { duration: "10s", target: 300 },
  { duration: "10s", target: 350 },
  { duration: "10s", target: 400 },
  { duration: "10s", target: 450 },
  { duration: "10s", target: 500 },
  { duration: "10s", target: 550 },
  { duration: "10s", target: 800},
  { duration: "10s", target: 2000 },
  { duration: "10s", target: 4000 },
  { duration: "10s", target: 6000 },
  { duration: "10s", target: 8000 },
  { duration: "10s", target: 10000 },
  { duration: "10s", target: 0 },
]
,
};

export default function () {
  const payload = JSON.stringify({
    email: "santi@gmail.com",
    password: "123456",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("http://localhost:3000/api/auth/login", payload, params);

  const success = check(res, {
    "status 200": (r) => r.status === 200,
  });

  if (!success) {
    console.log(`Error ${res.status}: ${res.body}`);
  }

  sleep(1);
}
