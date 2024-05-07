// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import type { Express } from "express-serve-static-core";
import { DefaultAzureCredential, type TokenCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

export interface TestCredentialServerOptions {
  /**
   * Port to listen on. Defaults to 4895.
   */
  port?: number;

  /**
   * Host to listen on. Defaults to `localhost`. Caution: do not expose this server to the network.
   */
  listenHost?: string;
}

function isValidScopes(scopes: unknown): scopes is string | string[] {
  return (
    typeof scopes === "string" ||
    (Array.isArray(scopes) && scopes.every((s) => typeof s === "string"))
  );
}

function buildServer(app: Express) {
  const credentials: Record<string, TokenCredential> = {};

  app.use(express.json());
  app.use((_req, res, next) => {
    res.set("Access-Control-Allow-Methods", "GET, PUT");
    res.set("Access-Control-Allow-Origin", "*");
    next();
  });

  // Endpoint for creating a new credential
  app.put("/credential", (req, res) => {
    const id = randomUUID();
    try {
      const cred = new DefaultAzureCredential(req.body);
      credentials[id] = cred;
      res.status(201).send({ id });
    } catch (error: unknown) {
      res.status(400).send({ error });
      return;
    }
  });

  // Endpoint for getting a token using a pre-created credential
  app.get("/credential/:id/token", async (req, res) => {
    const credential = credentials[req.params.id];
    if (!credential) {
      res.status(404).send({ error: "Credential not found, create a credential first" });
      return;
    }

    const scopes = req.query["scopes"];

    if (!isValidScopes(scopes)) {
      res.status(400).send({ error: "Scopes must be provided" });
      return;
    }

    const options = JSON.parse(req.query["options"]?.toString() ?? "{}");

    try {
      const token = await credential.getToken(scopes, options);
      res.status(200).send(token);
    } catch (error: unknown) {
      res.status(400).send({ error });
    }
  });
}

/**
 * Create and start the relay server used by test credential to provide credentials to the browser tests.
 * @param options Options for the relay server.
 * @returns A callback which, when called, will stop the server.
 */
export function startRelayServer(options: TestCredentialServerOptions = {}): () => void {
  const app = express();
  buildServer(app);

  const server = app.listen(options.port ?? 4895);
  return () => server.close();
}
