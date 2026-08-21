// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

interface LocalTokenResponse {
  token?: unknown;
  expiresOnTimestamp?: unknown;
  error?: unknown;
}

/** Uses the loopback Vite server's Azure CLI credential for local development. */
export class LocalAzureCredential implements TokenCredential {
  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken> {
    let response: Response;
    try {
      response = await fetch("/api/azure-token", {
        cache: "no-store",
        headers: { accept: "application/json" },
      });
    } catch (error) {
      throw new Error(
        "The local Azure authentication bridge is unavailable. Run `npm run dev` and reload the page.",
        { cause: error },
      );
    }
    const body = (await response.json()) as LocalTokenResponse;
    if (!response.ok) {
      const details = typeof body.error === "string" ? body.error : response.statusText;
      throw new Error(`Local Azure authentication failed: ${details}`);
    }
    if (typeof body.token !== "string" || typeof body.expiresOnTimestamp !== "number") {
      throw new Error("The local Azure token endpoint returned an invalid response.");
    }
    return { token: body.token, expiresOnTimestamp: body.expiresOnTimestamp };
  }
}
