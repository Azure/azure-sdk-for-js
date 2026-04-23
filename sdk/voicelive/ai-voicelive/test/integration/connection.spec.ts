// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { VoiceLiveSession, ErrorEventArgs } from "../../src/index.js";
import { VoiceLiveClient } from "../../src/index.js";

describe.runIf(isLiveMode())("VoiceLive Integration - Connection Tests", () => {
  let client: VoiceLiveClient;
  let session: VoiceLiveSession;

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

  beforeEach(function (this: any) {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    if (!apiKey) {
      const credential = createTestCredential();
      client = new VoiceLiveClient(endpoint, credential);
    } else {
      client = new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential);
    }
  });

  afterEach(async function () {
    if (session) {
      try {
        await session.disconnect();
      } catch (error) {
        // Ignore cleanup errors
        console.warn("Session cleanup error:", error);
      }
    }
  });

  it.skipIf(!isLiveMode())("should create a session successfully", async function () {
    session = await client.createSession("gpt-4o-mini");
    expect(session).toBeDefined();
    expect(session.isConnected).toBe(false); // Not connected yet
  });

  it.skipIf(!isLiveMode())("should establish WebSocket connection", async function () {
    session = await client.createSession("gpt-4o");

    // Connect to the WebSocket endpoint
    await session.connect();

    expect(session.isConnected).toBe(true);
  });

  it.skipIf(!isLiveMode())("should handle connection with authentication", async function () {
    session = await client.createSession("gpt-4o");

    // Test connection with proper authentication
    await session.connect();

    // Verify the session is authenticated and ready
    expect(session.isConnected).toBe(true);

    // Test that we can configure the session (requires authentication)
    await session.updateSession({
      model: "gpt-4o-mini",
      voice: "alloy",
    });

    // If we reach here, authentication was successful
    expect(true).toBe(true);
  });

  it.skipIf(!isLiveMode())("should handle connection errors gracefully", async function () {
    // Create client with invalid endpoint
    const invalidClient = new VoiceLiveClient(
      "https://invalid.endpoint.example.com",
      createTestCredential(),
    );

    try {
      const invalidSession = await invalidClient.createSession("gpt-4o-mini");
      await invalidSession.connect();

      // Should not reach here
      expect.fail("Expected connection to fail with invalid endpoint");
    } catch (error) {
      // Expected error
      expect(error).toBeDefined();
    }
  });

  it.skipIf(!isLiveMode())("should support multiple concurrent sessions", async function () {
    const session1 = await client.createSession("gpt-4o-mini");
    const session2 = await client.createSession("gpt-4o-mini");

    try {
      await Promise.all([session1.connect(), session2.connect()]);

      expect(session1.isConnected).toBe(true);
      expect(session2.isConnected).toBe(true);
    } finally {
      // Cleanup both sessions
      await Promise.all([
        session1.disconnect().catch(() => {}),
        session2.disconnect().catch(() => {}),
      ]);
    }
  });

  it.skipIf(!isLiveMode())("should handle session reconnection", async function () {
    session = await client.createSession("gpt-4o");

    // Initial connection
    await session.connect();
    expect(session.isConnected).toBe(true);

    // Simulate disconnect
    await session.disconnect();
    expect(session.isConnected).toBe(false);

    // Reconnect
    await session.connect();
    expect(session.isConnected).toBe(true);
  });

  it.skipIf(!isLiveMode())("should validate endpoint format", async function () {
    expect(endpoint).toMatch(/^https:\/\/.+/);

    // The endpoint should be a valid AI Services endpoint
    expect(endpoint).toContain("services.ai.azure.com");
  });

  it.skipIf(!isLiveMode())("should handle session lifecycle correctly", async function (this: any) {
    session = await client.createSession("gpt-4o");

    // Track session state changes
    let errorReceived = false;

    const subscription = session.subscribe({
      onConnected: async () => {
        // Connection established
      },
      onDisconnected: async () => {
        // Connection closed
      },
      onError: async (args: ErrorEventArgs) => {
        console.log("Got unexpexted error event:", args);

        errorReceived = true;
      },
      onSessionUpdated: async () => {
        // Session configuration updated
      },
    });

    try {
      // Connect and verify events
      await session.connect();

      expect(session.isConnected).toBe(true);

      // Update session to trigger events
      await session.updateSession({
        model: "gpt-4o-mini",
      });

      // Give some time for events to be processed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // End session
      await session.disconnect();

      expect(session.isConnected).toBe(false);
      expect(errorReceived).toBe(false); // No errors should have occurred
    } finally {
      subscription.close();
    }
  });
});
