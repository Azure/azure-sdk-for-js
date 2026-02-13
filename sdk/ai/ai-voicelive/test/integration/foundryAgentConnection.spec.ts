// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Foundry Agent Connection Integration Tests
 *
 * These tests verify that the SDK can correctly configure Foundry agents
 * and establish connections with the VoiceLive service.
 *
 * Foundry agents are AI agents deployed in Azure AI Foundry that can be
 * integrated into VoiceLive conversations to provide specialized capabilities.
 *
 * Test Categories:
 * 1. Basic Connection - Verify session connects with agent configured
 * 2. Configuration Options - Verify all agent configuration properties work
 * 3. Error Handling - Verify graceful handling of invalid configurations
 * 4. Multi-Agent Support - Verify multiple agents can be configured
 */

import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import {
  VoiceLiveClient,
  type VoiceLiveSession,
  type VoiceLiveClientOptions,
  KnownServerEventType,
  type ServerEventSessionUpdated,
  type FoundryAgentTool,
  KnownFoundryAgentContextType,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import {
  TestConstants,
  TEST_AGENT_NAME,
  createFoundryAgentTool,
  getOrCreateTestAgent,
} from "../infrastructure/index.js";
// import "dotenv/config";

describe.runIf(isLiveMode())("Foundry Agent Connection - Live", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  let testAgentName: string = "";
  let testAgentName2: string = "";
  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const model = "gpt-4.1";
  const timeoutMs = TestConstants.AGENT_TIMEOUT_MS;
  const apiVersion = "2026-01-01-preview";

  beforeAll(async () => {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    // Get or create the shared test agent
    try {
      testAgentName = await getOrCreateTestAgent();
      testAgentName2 = await getOrCreateTestAgent(TEST_AGENT_NAME + "-2");
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

  /**
   * Helper function to start a session with an agent and wait for connection events.
   */
  async function startSessionWithAgent(
    agentTool: FoundryAgentTool,
  ): Promise<{ session: VoiceLiveSession; recorder: SessionEventRecorder }> {
    const sessionConfig = {
      model,
      tools: [agentTool],
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await session.updateSession(sessionConfig);

    // Wait for session created and updated events
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);

    return { session, recorder };
  }

  describe("Basic Connection", () => {
    it(
      "should connect with Foundry agent configured",
      async () => {
        // This test verifies that a session can be established with a Foundry agent configured
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgent(foundryAgent);

        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Verify session is connected
        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
        console.log("Session connected successfully with Foundry agent configured");
      },
      timeoutMs,
    );

    it(
      "should receive session updated with Foundry agent in tools",
      async () => {
        // This test verifies that the session updated event includes the Foundry agent
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { recorder } = await startSessionWithAgent(foundryAgent);

        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // Verify the agent is present in the session tools
        expect(sessionUpdated.session).toBeDefined();
        expect(sessionUpdated.session?.tools).toBeDefined();
        expect(sessionUpdated.session?.tools?.length).toBeGreaterThanOrEqual(1);

        // Find the foundry agent tool in the tools list
        const agentTool = sessionUpdated.session?.tools?.find(
          (t: { type: string }) => t.type === "foundry_agent",
        ) as FoundryAgentTool | undefined;
        expect(agentTool).toBeDefined();
        expect(agentTool?.agentName).toBe(testAgentName);

        console.log("Session updated event contains Foundry agent tool");
      },
      timeoutMs,
    );
  });

  describe("Configuration Options", () => {
    it(
      "should verify agent configuration with all options",
      async () => {
        // This test verifies that all agent configuration options are properly set
        // Note: clientId is omitted as it can cause issues if not valid
        const foundryAgent = createFoundryAgentTool(testAgentName, {
          agentVersion: "1",
          description: "Test agent for VoiceLive integration testing",
          agentContextType: KnownFoundryAgentContextType.AgentContext,
          returnAgentResponseDirectly: true,
        });

        const { recorder } = await startSessionWithAgent(foundryAgent);

        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // Find the foundry agent tool
        const agentTool = sessionUpdated.session?.tools?.find(
          (t: { type: string }) => t.type === "foundry_agent",
        ) as FoundryAgentTool | undefined;

        expect(agentTool).toBeDefined();
        expect(agentTool?.agentName).toBe(testAgentName);
        // Note: Not all properties may be echoed back in session.updated; verify what is returned
        console.log("Agent configuration verified:", JSON.stringify(agentTool, null, 2));
      },
      timeoutMs,
    );

    it(
      "should verify NoContext agent context type",
      async () => {
        // This test verifies that NoContext mode can be configured
        const foundryAgent = createFoundryAgentTool(testAgentName, {
          agentContextType: KnownFoundryAgentContextType.NoContext,
          description: "Test agent with no context",
        });

        const { session, recorder } = await startSessionWithAgent(foundryAgent);

        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        expect(session.isConnected).toBe(true);
        console.log("NoContext mode configured successfully");
      },
      timeoutMs,
    );

    it(
      "should verify AgentContext agent context type",
      async () => {
        // This test verifies that AgentContext mode can be configured (agent maintains its own context)
        const foundryAgent = createFoundryAgentTool(testAgentName, {
          agentContextType: KnownFoundryAgentContextType.AgentContext,
          description: "Test agent with agent context",
        });

        const { session, recorder } = await startSessionWithAgent(foundryAgent);

        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        expect(session.isConnected).toBe(true);
        console.log("AgentContext mode configured successfully");
      },
      timeoutMs,
    );
  });

  describe("Error Handling", () => {
    it(
      "should handle invalid agent name gracefully",
      async () => {
        // This test verifies that an invalid agent name doesn't crash the session
        // The session should connect but agent calls may fail
        const invalidAgent = createFoundryAgentTool("nonexistent-agent-name-12345", {
          description: "Invalid agent that should not exist",
        });

        const sessionConfig = {
          model,
          tools: [invalidAgent],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await session.updateSession(sessionConfig);

        // Session should still be created
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        // Session may or may not receive updated event depending on service behavior
        // but the session should remain stable
        expect(session.isConnected).toBe(true);
        console.log("Session remains stable with invalid agent name");
      },
      timeoutMs,
    );
  });

  describe("Multi-Agent Support", () => {
    it(
      "should support configuring agent with different context types",
      async () => {
        // This test verifies that the same agent can be configured with different context types
        // Note: Using the same agent but with different descriptions to show multi-config capability
        const agent1 = createFoundryAgentTool(testAgentName, {
          description: "Math helper agent - use for calculations",
          agentContextType: KnownFoundryAgentContextType.AgentContext,
        });

        const agent2 = createFoundryAgentTool(testAgentName2, {
          description: "Math helper agent - use for cooking",
          agentContextType: KnownFoundryAgentContextType.AgentContext,
        });
        const sessionConfig = {
          model,
          tools: [agent1, agent2],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await session.updateSession(sessionConfig);

        console.info("Session created & updated with multiple agents configured");

        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // Verify agent appears in tools
        const foundryAgents = sessionUpdated.session?.tools?.filter(
          (t: { type: string }) => t.type === "foundry_agent",
        );

        expect(foundryAgents).toBeDefined();
        expect(foundryAgents?.length).toBeGreaterThanOrEqual(1);
        console.log(`Session configured with ${foundryAgents?.length} agent(s)`);
      },
      timeoutMs,
    );
  });
});
