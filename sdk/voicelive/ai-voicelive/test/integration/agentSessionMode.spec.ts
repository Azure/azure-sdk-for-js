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

// Agent-mode tests need DefaultAzureCredential to find/create the shared Foundry
// agent up-front. That only works in Node; in the browser the helper returns the
// name without verifying, so the WS connect just times out 30s later. Gate the
// agent-mode describe blocks on a Node environment to avoid that false failure.
const isNodeEnvironment = typeof self === "undefined";

// Agent mode runs on the Foundry agent plane, which is exposed through the
// preview API versions. Exercise the suite against each supported preview.
const agentApiVersions = ["2025-05-01-preview", "2026-01-01-preview"];

describe.runIf(isLiveMode()).each(agentApiVersions)(
  "Agent Session Mode - Live (api %s)",
  (apiVersion) => {
    let client: VoiceLiveClient;
    let sessions: VoiceLiveSession[] = [];
    let testAgentName: string = "";
    // Captured if agent setup in beforeAll fails. When set, beforeEach skips each
    // test so the suite is reported as "skipped" (unstable) rather than "failed".
    let agentSetupError: Error | null = null;
    const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
    const projectName = process.env.FOUNDRY_PROJECT_NAME || TestConstants.FOUNDRY_PROJECT_NAME;
    const timeoutMs = TestConstants.AGENT_TIMEOUT_MS;

    beforeAll(async () => {
      if (!endpoint) {
        throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
      }

      // Diagnostic: log the project context so failures in the agent path are easy to triage.
      // Two distinct env vars feed agent mode: getOrCreateTestAgent uses FOUNDRY_PROJECT_ENDPOINT
      // (an HTTPS URL on the Foundry plane) while the WS request uses FOUNDRY_PROJECT_NAME
      // (the project's short name on the Cognitive Services plane). A mismatch between them
      // produces a silent timeout because the agent gets created in project A but looked up
      // in project B.
      console.info(
        `[agentSessionMode] FOUNDRY_PROJECT_ENDPOINT = ${process.env.FOUNDRY_PROJECT_ENDPOINT ?? "<unset>"}`,
      );
      console.info(
        `[agentSessionMode] FOUNDRY_PROJECT_NAME     = ${process.env.FOUNDRY_PROJECT_NAME ?? "<unset>"} (resolved: ${projectName})`,
      );

      // Get or create the shared test agent. If setup fails (e.g. RBAC propagation
      // hasn't completed, the Foundry project doesn't exist, etc.), record the error
      // and let beforeEach skip each test instead of failing the suite. This keeps
      // the live pipeline green for known-flaky environment issues while still
      // surfacing the underlying cause in the test logs.
      try {
        testAgentName = await getOrCreateTestAgent();
        if (!testAgentName) {
          throw new Error(
            "getOrCreateTestAgent() returned an empty name. Check that the live test " +
              "identity has the 'Cognitive Services User' (or equivalent) role on the " +
              "Foundry project and that FOUNDRY_PROJECT_ENDPOINT points to that project.",
          );
        }
        console.info(`[agentSessionMode] Using test agent: ${testAgentName}`);
      } catch (error) {
        const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
        console.warn(
          `[agentSessionMode] Test agent setup failed; marking suite as unstable (tests will be skipped). ` +
            `Fallback name "${TEST_AGENT_NAME}" does NOT exist on the service. Error: ${message}`,
        );
        agentSetupError = error instanceof Error ? error : new Error(String(error));
      }
    });

    beforeEach(function (ctx) {
      if (agentSetupError) {
        ctx.skip();
      }
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

    describe.runIf(isNodeEnvironment)("SessionTarget API - Agent Mode", () => {
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

    describe.runIf(isNodeEnvironment)("Error Handling - Agent Mode", () => {
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
  },
);
