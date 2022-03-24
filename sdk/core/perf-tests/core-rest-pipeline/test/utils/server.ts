// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";

const app = express();
const port = 8082;
export const TEST_SERVER_URL = `http://localhost:${port}`;
// app.use(express.json());
// app.use(express.text());
// app.set("etag", false); // turn off

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`server started at ${TEST_SERVER_URL}`);
});
