// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import type { Express } from "express-serve-static-core";
import {
  AzureCliCredential,
  AzureDeveloperCliCredential,
  AzurePipelinesCredential,
  AzurePowerShellCredential,
  ChainedTokenCredential,
  EnvironmentCredential,
  type TokenCredential,
} from "@azure/identity";
import { randomUUID } from "node:crypto";
import { createPrinter } from "./printer";

const printer = createPrinter("browser-relay");

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
    res.set("Access-Control-Allow-Headers", "*");
    next();
  });

  app.get("/health", (_req, res) => {
    res.status(204).send();
  });

  // Endpoint for creating a new credential
  app.put("/credential", (req, res) => {
    const id = randomUUID();
    let cred: TokenCredential;
    try {
      const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
      // If we have a system access token, we are in Azure Pipelines
      if (systemAccessToken) {
        const serviceConnectionID = process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
        const clientID = process.env.AZURESUBSCRIPTION_CLIENT_ID;
        const tenantID = process.env.AZURESUBSCRIPTION_TENANT_ID;
        if (serviceConnectionID && clientID && tenantID) {
          cred = new AzurePipelinesCredential(
            tenantID,
            clientID,
            serviceConnectionID,
            systemAccessToken,
            req.body,
          );
        }
        throw new Error(`Running in Azure Pipelines environment. Missing environment variables: 
          serviceConnectionID: ${serviceConnectionID}, tenantID: ${tenantID}, clientID: ${clientID}`);
      } else {
        cred = new ChainedTokenCredential(
          new AzurePowerShellCredential(req.body),
          new AzureCliCredential(req.body),
          new AzureDeveloperCliCredential(req.body),
          // Keep Environment Credential for packages that have not migrated to Federated Authentication
          // See the migration guide for more information
          // https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/1080/Secret-auth-migration
          new EnvironmentCredential(req.body),
        );
      }
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

async function isRelayAlive(options: TestCredentialServerOptions = {}): Promise<boolean> {
  try {
    const res = await fetch(
      `http://${options.listenHost ?? "localhost"}:${options.port ?? 4895}/health`,
    );

    if (res.ok) {
      printer("Browser relay is already alive");
      return true;
    } else {
      throw new Error(`Browser relay responded with an error: ${await res.text()}`);
    }
  } catch (e) {
    printer("Browser relay is not yet alive");
    return false;
  }
}

export async function shouldStartRelay(
  options: TestCredentialServerOptions = {},
): Promise<boolean> {
  const testMode = (process.env.TEST_MODE ?? "playback").toLowerCase();
  if (testMode !== "record" && testMode !== "live") {
    printer("Not in record or live mode; not starting relay");
    return false;
  }

  return !(await isRelayAlive(options));
}

/**
 * Create and start the relay server used by test credential to provide credentials to the browser tests.
 * @param options Options for the relay server.
 * @returns A callback which, when called, will stop the server.
 */
export function startRelayServer(options: TestCredentialServerOptions = {}): () => void {
  const app = express();
  buildServer(app);

  const { listenHost = "localhost", port = 4895 } = options;

  printer(`Starting browser relay on http://${listenHost}:${port}/`);
  const server = app.listen(port, listenHost);
  return () => server.close();
}
