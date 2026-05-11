// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeAll } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { KeyCredential } from "@azure/core-auth";
import { VoiceLiveClient } from "../../src/index.js";

/**
 * Smoke test that verifies the live test pipeline is correctly wired up:
 *   - tests.yml references archetype-sdk-tests
 *   - test-resources.bicep provisions an AI Services account
 *   - bicep outputs map to VOICELIVE_ENDPOINT / VOICELIVE_API_KEY / MODEL_DEPLOYMENT_NAME
 *
 * Skipped unless TEST_MODE=live.
 */
describe.runIf(isLiveMode())("VoiceLive live smoke", () => {
  let client: VoiceLiveClient;
  let model: string;

  beforeAll(() => {
    const endpoint = process.env.VOICELIVE_ENDPOINT ?? process.env.AI_SERVICES_ENDPOINT;
    const apiKey = process.env.VOICELIVE_API_KEY ?? process.env.AI_SERVICES_KEY;
    model = process.env.MODEL_DEPLOYMENT_NAME ?? "gpt-4.1";

    if (!endpoint) {
      throw new Error(
        "Missing VOICELIVE_ENDPOINT (or AI_SERVICES_ENDPOINT) environment variable. " +
          "Live tests require a deployed test-resources.bicep.",
      );
    }

    client = apiKey
      ? new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential)
      : new VoiceLiveClient(endpoint, createTestCredential());
  });

  it("creates a VoiceLiveClient against the deployed resource", () => {
    expect(client).toBeDefined();
  });

  it("opens a session and disconnects cleanly", async () => {
    const session = await client.createSession(model);
    try {
      await session.connect();
      expect(session.isConnected).toBe(true);
    } finally {
      await session.disconnect().catch(() => {
        /* ignore cleanup errors */
      });
    }
  });
});
