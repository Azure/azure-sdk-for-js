// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { port, TEST_SERVER_URL } from "./utils/serverUrl";
import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { Server } from "http";

let app: express.Application;
let server: Server;

export abstract class BaseHttpTest extends PerfTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  constructor() {
    super();
  }

  async globalSetup() {
    app = express();

    app.get("/", (_, res) => {
      res.send("Hello world!");
    });

    server = app.listen(port, () => {
      console.log(`server started at ${TEST_SERVER_URL}`);
    });
  }

  async globalCleanup() {
    server.close(function () { console.log('Closing :)'); });
  }
}
