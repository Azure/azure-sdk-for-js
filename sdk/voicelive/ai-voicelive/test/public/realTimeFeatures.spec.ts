// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { VoiceLiveClient } from "../../src/index.js";
import { MockTokenCredential } from "../infrastructure/index.js";

describe("VoiceLiveClient Real-time Capabilities", () => {
  let client: VoiceLiveClient;
  let credential: MockTokenCredential;

  beforeEach(() => {
    credential = new MockTokenCredential();
    client = new VoiceLiveClient("https://test.voice-live.com", credential);
  });

  it("should create client for real-time voice communication", () => {
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(VoiceLiveClient);
  });

  it("should support creating sessions for real-time interaction", () => {
    // VoiceLiveClient creates sessions, which handle the real-time features
    const session = client.createSession("gpt-realtime");
    expect(session).toBeDefined();
  });

  it("should support creating sessions with real-time configuration", () => {
    const realtimeConfig = {
      model: "gpt-realtime",
      voice: "alloy",
      // Note: audio format properties would be part of session options, not the RequestSession
    };

    const session = client.createSession(realtimeConfig);
    expect(session).toBeDefined();
  });

  it("should support startSession for immediate connection", () => {
    // startSession creates and connects a session
    expect(typeof client.startSession).toBe("function");
  });

  it("should handle various model configurations", () => {
    const models = ["gpt-realtime", "gpt-realtime"];

    models.forEach((model) => {
      const session = client.createSession(model);
      expect(session).toBeDefined();
    });
  });

  it("should support voice configuration options", () => {
    const voiceOptions = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

    voiceOptions.forEach((voice) => {
      const session = client.createSession({
        model: "gpt-realtime",
        voice: voice,
      });
      expect(session).toBeDefined();
    });
  });

  it("should support audio format configurations", () => {
    const session = client.createSession("gpt-realtime");
    expect(session).toBeDefined();
    // Audio format configuration would be handled through session options
  });

  it("should validate required model parameter", () => {
    expect(() => {
      client.createSession(""); // Empty model
    }).toThrow();

    expect(() => {
      client.createSession({} as any); // No model
    }).toThrow("Model name is required");
  });

  it("should support session creation with tools for function calling", () => {
    const sessionWithTools = {
      model: "gpt-realtime",
      tools: [
        {
          type: "function",
          name: "get_weather",
          description: "Get current weather",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string" },
            },
          },
        },
      ],
    };

    const session = client.createSession(sessionWithTools);
    expect(session).toBeDefined();
  });

  it("should support session creation with temperature and other parameters", () => {
    const sessionConfig = {
      model: "gpt-realtime",
      temperature: 0.7,
      max_tokens: 1000,
      voice: "alloy",
    };

    const session = client.createSession(sessionConfig);
    expect(session).toBeDefined();
  });
});
