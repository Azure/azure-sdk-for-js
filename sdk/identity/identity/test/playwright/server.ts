// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from "express";
import { readFileSync } from "fs";
import { Server } from "http";

// A simple web server that allows passing configuration and behavioral parameters.
// This file should be thought as the archetypicall representation of a web server,
// whereas the test file will include the nuance specific to testing the desired behavior.

/**
 * Options to the server.
 * With the intent to make the server parametrizable!
 */
export interface ServerOptions {
  /**
   * Port number as a string
   */
  port: string;
}

/**
 * Result of the prepareServer function.
 */
export interface PepareServerResult {
  app: express.Application;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

/**
 * Sets up a parametrizable Express server.
 */
export async function prepareServer(serverOptions: ServerOptions): Promise<PepareServerResult> {
  const app = express();

  /**
   * Logging calls.
   */
  app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
    console.log("Playwright Express test server:", req.url);
    next();
  });

  /**
   * Endpoint that loads the index.js
   */
  app.get("/index.js", async (_req: express.Request, res: express.Response) => {
    const indexContent = readFileSync("./test/playwright/rollup/dist/index.js", {
      encoding: "utf8",
    });
    res.send(indexContent);
  });

  /**
   * Home URI
   */
  app.get("/", async (_req: express.Request, res: express.Response) => {
    const indexContent = readFileSync("./test/playwright/index.html", { encoding: "utf8" });
    res.send(indexContent);
  });

  let server: Server | undefined = undefined;

  return {
    app,
    async start() {
      server = app.listen(serverOptions.port, () => {
        console.log(`Authorization code redirect server listening on port ${serverOptions.port}`);
      });
    },
    async stop() {
      if (server) {
        server.close();
      }
    },
  };
}
