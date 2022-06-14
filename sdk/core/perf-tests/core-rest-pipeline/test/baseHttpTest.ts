// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { Server } from "http";
import { AddressInfo } from "net";

let app: express.Application;
let server: Server;

export interface BaseHttpTestOptions {
  url: string;
}

export abstract class BaseHttpTest extends PerfTest<BaseHttpTestOptions> {
  url!: string;

  options: PerfOptionDictionary<BaseHttpTestOptions> = {
    url: {
      description: "URL to fetch.  If empty, fetches from express server on localhost.",
      shortName: "u",
      longName: "url",
    },
  };

  async globalSetup() {
    if (this.parsedOptions.url.value) {
      this.url = this.parsedOptions.url.value;
    } else {
      //   Use test server if URL is not specified on the command-line
      app = express();

      app.get("/", (_, res) => {
        res.send("Hello world!");
      });

      server = app.listen(0, () => {
        console.log("Listening on port:", (server.address() as AddressInfo).port);
      });

      this.url = `http://localhost:${(server.address() as AddressInfo).port}`;
    }
  }

  async globalCleanup() {
    if (!this.parsedOptions.url.value) {
      // URL is not specified on the command-line, means we created the test server, closing that now
      server.close();
    }
  }
}
