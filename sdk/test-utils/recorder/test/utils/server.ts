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

app.get("/sample_response", (_, res) => {
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
