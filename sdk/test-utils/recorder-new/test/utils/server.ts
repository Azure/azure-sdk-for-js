// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
const app = express();
const port = 8080;
const TEST_SERVER_URL = `http://localhost:${port}`;

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/sample_response", (_, res) => {
  res.send({ abc: "def" });
});

app.listen(port, () => {
  console.log(`server started at ${TEST_SERVER_URL}`);
});
