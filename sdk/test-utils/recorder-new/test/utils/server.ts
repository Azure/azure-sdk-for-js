// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
const app = express();
const port = 8080;
const TEST_SERVER_URL = `http://localhost:${port}`;
app.use(express.json());
app.use(express.text());

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/sample_response", (_, res) => {
  res.send({ val: "abc" });
});

app.get(`/sample_response/:secret_info`, (_, res) => {
  res.send({ val: "I am the answer!" });
});

app.post("/api/sample_request_body", function(req, res) {
  res.send({ bodyProvided: req.body });
});

app.listen(port, () => {
  console.log(`server started at ${TEST_SERVER_URL}`);
});
