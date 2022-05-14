// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { port, TEST_SERVER_URL } from "./utils/serverUrl";
import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { Server } from "http";

let app: express.Application;
let server: Server;

export interface BaseHttpTestOptions {
  url: string;
}

export abstract class BaseHttpTest extends PerfTest<BaseHttpTestOptions> {
  url: string;

  options: PerfOptionDictionary<BaseHttpTestOptions> = {
    url: {
      description: "URL to fetch.  If empty, fetches from express server on localhost.",
      shortName: "u",
      longName: "url",
    },
  };

  constructor() {
    super();
    if (this.parsedOptions.url.value) {
      this.url = this.parsedOptions.url.value;
    }
    else {
      // Use test server if URL is not specified on the command-line
      this.url = TEST_SERVER_URL;
    }
  }

  async globalSetup() {
    if (this.url == TEST_SERVER_URL) {
      app = express();

      app.get("/", (_, res) => {
        res.send("Hello world!");
      });

      server = app.listen(port, () => {
        console.log(`server started at ${TEST_SERVER_URL}`);
      });
    }
  }

  async globalCleanup() {
    if (this.url == TEST_SERVER_URL) {
      server.close(function () { console.log('Closing :)'); });
    }
  }
}
