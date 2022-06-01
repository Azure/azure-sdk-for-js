// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 8080;
const TEST_SERVER_URL = `http://localhost:${port}`;
app.use(express.json());
app.use(express.text());
app.set("etag", false); // turn off

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/redirectWithHost", (req, res) => {
  res.redirect(307, `http://${req.hostname}:${port}/sample_response`);
});

app.get("/redirectWithoutHost", (_, res) => {
  res.redirect(307, `/sample_response`);
});

let sendRetryResponse = true;

app.get("/reset_retry", (_, res) => {
  sendRetryResponse = true;
  res.send("The retry flag was reset. The next call to /retry will return a 429 status.");
});

app.get("/retry", (_, res) => {
  if (sendRetryResponse) {
    res
      .status(429)
      .header("Retry-After", new Date().toUTCString())
      .send({ error: "429 Too Many Requests" });
    sendRetryResponse = false;
  } else {
    res.send({ val: "abc" });
  }
});

app.get("/sample_response", (req, res) => {
  if (req.header("x-recording-id") !== undefined) {
    res.status(400).send({ error: "This request bypassed the proxy tool!" });
    return;
  }

  res.send({ val: "abc" });
});

app.post("/sample_response", (_, res) => {
  res.send({ val: "abc" });
});

app.get(`/sample_response/:secret_info`, (_, res) => {
  res.send({ val: "I am the answer!" });
});

app.post(`/sample_response/:secret_info`, (_, res) => {
  res.send({ val: "I am the answer!" });
});

app.get(`/subscriptions/:secret_info`, (_, res) => {
  res.send({ val: "I am the answer!" });
});

app.post("/api/sample_request_body", function (req, res) {
  res.send({ bodyProvided: req.body });
});

app.get("/api/sample_uuid_in_header", function (_, res) {
  res.header("your_uuid", uuidv4());
  res.send();
});

app.listen(port, () => {
  console.log(`server started at ${TEST_SERVER_URL}`);
});
