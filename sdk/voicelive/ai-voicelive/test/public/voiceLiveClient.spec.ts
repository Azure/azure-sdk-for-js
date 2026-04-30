// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { VoiceLiveClient } from "../../src/index.js";
import { MockTokenCredential } from "../infrastructure/index.js";

describe("VoiceLiveClient", () => {
  it("should create a client instance", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
      { apiVersion: "2025-10-01" },
    );

    expect(client).toBeInstanceOf(VoiceLiveClient);
    expect(client.endpoint).toBe("https://test.voicelive.azure.com");
    expect(client.apiVersion).toBe("2025-10-01");
  });

  it("should normalize endpoint URLs correctly", () => {
    // Test without protocol
    const client1 = new VoiceLiveClient("test.voicelive.azure.com", new MockTokenCredential());
    expect(client1.endpoint).toBe("https://test.voicelive.azure.com");

    // Test with trailing slash
    const client2 = new VoiceLiveClient(
      "https://test.voicelive.azure.com/",
      new MockTokenCredential(),
    );
    expect(client2.endpoint).toBe("https://test.voicelive.azure.com");
  });

  it("should use default API version when none provided", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
    );
    expect(client.apiVersion).toBe("2025-10-01");
  });

  it("should create sessions with model string", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
    );
    const session = client.createSession("gpt-4o-realtime-preview");

    expect(session).toBeDefined();
  });

  it("should create sessions with session config", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
    );
    const sessionConfig = {
      model: "gpt-4o-realtime-preview",
      voice: "alloy",
    };
    const session = client.createSession(sessionConfig);

    expect(session).toBeDefined();
  });

  it("should throw error when creating session without model", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
    );

    expect(() => {
      client.createSession({} as any);
    }).toThrow("Model name is required");
  });

  it("should have startSession method for creating and connecting", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
    );

    expect(typeof client.startSession).toBe("function");
  });

  it("should apply custom API version from options", () => {
    const client = new VoiceLiveClient(
      "https://test.voicelive.azure.com",
      new MockTokenCredential(),
      { apiVersion: "2024-10-01" },
    );

    expect(client.apiVersion).toBe("2024-10-01");
  });
});
