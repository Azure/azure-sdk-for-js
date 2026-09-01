// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AIProjectClient } from "@azure/ai-projects";
import { describe, expect, it } from "vitest";

class BrowserTestCredential implements TokenCredential {
  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken> {
    return { token: "browser-test-token", expiresOnTimestamp: Date.now() + 60_000 };
  }
}

describe("AIProjectClient browser local file access", () => {
  it("rejects dataset uploads from local paths", async () => {
    const client = createClient();

    await expect(client.datasets.uploadFile("dataset", "1", "data.jsonl")).rejects.toThrow(
      "Local file access is not supported in the browser.",
    );
  });

  it("rejects model creation from a local path before making a request", async () => {
    const client = createClient();

    await expect(client.beta.models.create("model", "1", "model-files")).rejects.toThrow(
      "Local file access is not supported in the browser.",
    );
  });
});

function createClient(): AIProjectClient {
  return new AIProjectClient(
    "https://example.services.ai.azure.com/api/projects/browser-project",
    new BrowserTestCredential(),
  );
}
