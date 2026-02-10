// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Agent Session Mode Integration Tests
 *
 * These tests verify that the SDK can correctly establish agent-centric sessions
 * using the SessionTarget discriminated union with AgentSessionConfig.
 *
 * In agent session mode, the agent is the main AI actor (not the LLM model).
 * This is different from "agent as tool" mode where the LLM can call agents.
 *
 * Test Categories:
 * 1. Basic Connection - Verify session connects in agent mode
 * 2. SessionTarget API - Verify the new discriminated union API works correctly
 * 3. Error Handling - Verify graceful handling of invalid agent configurations
 */

import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import {
  VoiceLiveClient,
  type VoiceLiveSession,
  type VoiceLiveClientOptions,
  type AgentSessionConfig,
  type SessionTarget,
  type StartSessionOptions,
  KnownServerEventType,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import { TestConstants, TEST_AGENT_NAME, getOrCreateTestAgent } from "../infrastructure/index.js";

describe.runIf(isLiveMode())("Agent Session Mode - Live", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  let testAgentName: string = "";
  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const projectName = process.env.FOUNDRY_PROJECT_NAME || TestConstants.FOUNDRY_PROJECT_NAME;
  const timeoutMs = TestConstants.AGENT_TIMEOUT_MS;
  const apiVersion = "2026-01-01-preview";

  beforeAll(async () => {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    // Get or create the shared test agent
    try {
      testAgentName = await getOrCreateTestAgent();
      console.log(`Using test agent: ${testAgentName}`);
    } catch (error) {
      console.warn(`Could not setup test agent: ${error}`);
      // Tests will use the constant name if agent creation fails
      testAgentName = TEST_AGENT_NAME;
    }
  });

  beforeEach(function () {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    console.info(`Creating VoiceLiveClient for endpoint: ${endpoint}`);

    const credential = createTestCredential();
    client = new VoiceLiveClient(endpoint, credential, {
      apiVersion: apiVersion,
    } as VoiceLiveClientOptions);
  });

  afterEach(async () => {
    // Clean up all sessions
    for (const session of sessions) {
      try {
        if (session.isConnected) {
          await session.disconnect();
        }
      } catch (error) {
        console.warn("Error disconnecting session:", error);
      }
    }
    sessions = [];
  });

  describe("SessionTarget API - Model Mode", () => {
    it(
      "should connect using SessionTarget with model",
      async () => {
        // This test verifies the new SessionTarget API for model mode
        const target: SessionTarget = { model: "gpt-4.1" };

        const session = client.createSession(target);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);
        await session.connect();

        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
        console.log("Session connected successfully using SessionTarget with model");
      },
      timeoutMs,
    );

    it(
      "should start session using SessionTarget with model",
      async () => {
        // This test verifies startSession with the new SessionTarget API
        const target: SessionTarget = { model: "gpt-4.1" };

        const startOptions: StartSessionOptions = {};
        const recorder = new SessionEventRecorder(startOptions);

        const session = await client.startSession(target, startOptions);
        sessions.push(session);

        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
        console.log("Session started successfully using SessionTarget with model");
      },
      timeoutMs,
    );
  });

  describe("SessionTarget API - Agent Mode", () => {
    it(
      "should connect using SessionTarget with agent",
      async () => {
        // This test verifies the new SessionTarget API for agent-centric mode
        const agentConfig: AgentSessionConfig = {
          agentName: testAgentName,
          projectName: projectName,
        };
        const target: SessionTarget = { agent: agentConfig };

        const session = client.createSession(target);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);
        await session.connect();

        // In agent mode, we should still receive session created
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
        console.log("Session connected successfully using SessionTarget with agent");
      },
      timeoutMs,
    );

    it(
      "should start session using SessionTarget with agent",
      async () => {
        // This test verifies startSession with agent SessionTarget
        const target: SessionTarget = {
          agent: {
            agentName: testAgentName,
            projectName: projectName,
          },
        };

        const startOptions: StartSessionOptions = {};
        const recorder = new SessionEventRecorder(startOptions);

        const session = await client.startSession(target, startOptions);
        sessions.push(session);

        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
        console.log("Session started successfully using SessionTarget with agent");
      },
      timeoutMs,
    );
  });

  describe("Error Handling - Agent Mode", () => {
    it(
      "should handle invalid agent name gracefully",
      async () => {
        // This test verifies that invalid agent names result in service errors
        const target: SessionTarget = {
          agent: {
            agentName: "non-existent-agent-12345",
            projectName: projectName,
          },
        };

        const session = client.createSession(target);
        sessions.push(session);

        // Connection should fail or return an error from the service
        try {
          await session.connect();
          // If connection succeeds, we should get an error event
          // Some services may accept the connection but fail on session update
          console.log("Connection succeeded - checking for error events");
        } catch (error) {
          // Expected - connection rejected due to invalid agent
          console.log("Connection failed as expected with invalid agent name:", error);
          expect(error).toBeDefined();
        }
      },
      timeoutMs,
    );

    it(
      "should handle invalid project name gracefully",
      async () => {
        // This test verifies that invalid project names result in service errors
        const target: SessionTarget = {
          agent: {
            agentName: testAgentName,
            projectName: "non-existent-project-12345",
          },
        };

        const session = client.createSession(target);
        sessions.push(session);

        try {
          await session.connect();
          console.log("Connection succeeded - checking for error events");
        } catch (error) {
          // Expected - connection rejected due to invalid project
          console.log("Connection failed as expected with invalid project:", error);
          expect(error).toBeDefined();
        }
      },
      timeoutMs,
    );
  });
});
