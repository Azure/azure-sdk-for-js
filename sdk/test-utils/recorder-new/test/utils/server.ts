import express from "express";
const app = express();
const port = 8080;
const TEST_SERVER_URL = `http://localhost:${port}`;

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/secret/ultimate_secret", (_, res) => {
  res.send({ abc: "def" });
});

app.listen(port, () => {
  console.log(`server started at ${TEST_SERVER_URL}`);
});
