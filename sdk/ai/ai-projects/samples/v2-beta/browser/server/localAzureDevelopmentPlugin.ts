// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureCliCredential } from "@azure/identity";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const credentialScope = "https://ai.azure.com/.default";

function isLoopbackHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function validateLocalRequest(request: IncomingMessage): void {
  const remoteAddress = request.socket.remoteAddress;
  if (
    remoteAddress &&
    remoteAddress !== "127.0.0.1" &&
    remoteAddress !== "::1" &&
    remoteAddress !== "::ffff:127.0.0.1"
  ) {
    throw new Error("Local Azure development routes accept loopback requests only.");
  }

  const origin = request.headers.origin;
  if (!origin) {
    return;
  }
  const originUrl = new URL(origin);
  if (!isLoopbackHost(originUrl.hostname) || originUrl.host !== request.headers.host) {
    throw new Error("Local Azure development requests must use this Vite server's origin.");
  }
}

/** Local-only Azure CLI authentication endpoint. */
export function localAzureDevelopmentPlugin(): Plugin {
  const credential = new AzureCliCredential();

  const tokenEndpoint = (request: IncomingMessage, response: ServerResponse, next: () => void) => {
    if (request.url?.split("?")[0] !== "/api/azure-token") {
      next();
      return;
    }

    void (async () => {
      response.setHeader("Cache-Control", "no-store");
      response.setHeader("Content-Type", "application/json");
      response.setHeader("X-Content-Type-Options", "nosniff");
      try {
        validateLocalRequest(request);
        if (request.method !== "GET") {
          response.statusCode = 405;
          response.setHeader("Allow", "GET");
          response.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        const token = await credential.getToken(credentialScope);
        if (!token) {
          throw new Error("AzureCliCredential returned no access token.");
        }
        response.end(
          JSON.stringify({
            token: token.token,
            expiresOnTimestamp: token.expiresOnTimestamp,
          }),
        );
      } catch (error) {
        console.error("Failed to acquire a local Azure token:", error);
        response.statusCode = 500;
        response.end(
          JSON.stringify({
            error: 'Unable to acquire an Azure CLI access token. Run "az login" and restart Vite.',
          }),
        );
      }
    })();
  };

  return {
    name: "local-azure-development",
    configureServer(server) {
      server.middlewares.use(tokenEndpoint);
    },
    configurePreviewServer(server) {
      server.middlewares.use(tokenEndpoint);
    },
  };
}
