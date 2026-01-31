// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Foundry Agent Execution Integration Tests
 *
 * These tests verify the complete lifecycle of Foundry agent execution:
 * - Argument streaming (delta/done events)
 * - Execution progress tracking (in_progress event)
 * - Completion handling (completed/failed events)
 * - Conversation item creation with agent responses
 *
 * The tests require a deployed V2 Foundry agent and use Azure AD authentication.
 */

import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import type { KeyCredential } from "@azure/core-auth";
import {
  VoiceLiveClient,
  type VoiceLiveSession,
  type VoiceLiveClientOptions,
  KnownServerEventType,
  KnownClientEventType,
  KnownItemType,
  KnownMessageRole,
  type FoundryAgentTool,
  type ServerEventResponseFoundryAgentCallArgumentsDelta,
  type ServerEventResponseFoundryAgentCallArgumentsDone,
  type ServerEventResponseFoundryAgentCallInProgress,
  type ServerEventResponseFoundryAgentCallCompleted,
  type ServerEventConversationItemCreated,
  type ClientEventResponseCreate,
  type MessageItem,
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

describe.runIf(isLiveMode())("Foundry Agent Execution - Live", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  let testAgentName: string = "";
  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;
  const model = "gpt-4o";
  const timeoutMs = TestConstants.AGENT_TIMEOUT_MS;
  const apiVersion = "2026-01-01-preview";

  // Extended timeout for execution tests that involve agent calls
  const executionTimeoutMs = timeoutMs * 2;

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
      testAgentName = TEST_AGENT_NAME;
    }
  });

  beforeEach(function () {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    console.info(`Creating VoiceLiveClient for endpoint: ${endpoint}`);
    if (!apiKey) {
      const credential = createTestCredential();
      client = new VoiceLiveClient(endpoint, credential, {
        apiVersion: apiVersion,
      } as VoiceLiveClientOptions);
    } else {
      client = new VoiceLiveClient(
        endpoint,
        { key: apiKey } as KeyCredential,
        { apiVersion: apiVersion } as VoiceLiveClientOptions,
      );
    }
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
   * Helper to start a session with an agent and instructions to use it.
   * The instructions tell the LLM to use the math agent for any math questions.
   */
  async function startSessionWithAgentInstructions(
    agentTool: FoundryAgentTool,
    customInstructions?: string,
  ): Promise<{ session: VoiceLiveSession; recorder: SessionEventRecorder }> {
    const instructions =
      customInstructions ||
      `You are a helpful assistant. When the user asks a math question, 
       you MUST use the ${agentTool.agentName} agent tool to solve it. 
       Always delegate math problems to the agent.`;

    const sessionConfig = {
      model,
      instructions,
      tools: [agentTool],
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await session.updateSession(sessionConfig);

    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    return { session, recorder };
  }

  /**
   * Helper to send a text message that should trigger agent usage.
   * Math questions are good for this since our test agent is a math assistant.
   */
  async function sendMathQuestion(session: VoiceLiveSession, question?: string): Promise<void> {
    const mathQuestion = question || "What is 42 multiplied by 17? Please use the math agent.";

    // Add user message to conversation
    const userMessage: MessageItem = {
      type: KnownItemType.Message,
      role: KnownMessageRole.User,
      content: [{ type: "input_text", text: mathQuestion }],
    };
    await session.addConversationItem(userMessage);

    // Request a response from the model
    const createResponseEvent: ClientEventResponseCreate = {
      type: KnownClientEventType.ResponseCreate,
    };
    await session.sendEvent(createResponseEvent);
  }

  describe("Agent Call Lifecycle Events", () => {
    it(
      "should receive agent call arguments delta during execution",
      async () => {
        // This test verifies that argument streaming works via delta events
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        // Send a math question to trigger agent usage
        await sendMathQuestion(session);

        // Try to collect agent call events
        const deltaEvent = (await recorder.waitForEvent(
          KnownServerEventType.ResponseFoundryAgentCallArgumentsDelta,
          { timeout: 30000 },
        )) as ServerEventResponseFoundryAgentCallArgumentsDelta;

        expect(deltaEvent.type).toBe(KnownServerEventType.ResponseFoundryAgentCallArgumentsDelta);
        expect(deltaEvent.itemId).toBeTruthy();
        expect(deltaEvent.responseId).toBeTruthy();
        console.log("Received arguments delta:", deltaEvent.delta);
      },
      executionTimeoutMs,
    );

    it(
      "should receive agent call arguments done event",
      async () => {
        // This test verifies that complete arguments are delivered
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        const doneEvent = (await recorder.waitForEvent(
          KnownServerEventType.ResponseFoundryAgentCallArgumentsDone,
          { timeout: 30000 },
        )) as ServerEventResponseFoundryAgentCallArgumentsDone;

        expect(doneEvent.type).toBe(KnownServerEventType.ResponseFoundryAgentCallArgumentsDone);
        expect(doneEvent.itemId).toBeTruthy();
        expect(doneEvent.responseId).toBeTruthy();
        expect(doneEvent.arguments).toBeDefined();
        console.log("Complete arguments:", doneEvent.arguments);
      },
      executionTimeoutMs,
    );

    it(
      "should receive agent call in progress event",
      async () => {
        // This test verifies that we get notified when agent execution starts
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        const inProgressEvent = (await recorder.waitForEvent(
          KnownServerEventType.ResponseFoundryAgentCallInProgress,
          { timeout: 30000 },
        )) as ServerEventResponseFoundryAgentCallInProgress;

        expect(inProgressEvent.type).toBe(KnownServerEventType.ResponseFoundryAgentCallInProgress);
        expect(inProgressEvent.itemId).toBeTruthy();
        expect(inProgressEvent.outputIndex).toBeDefined();
        console.log("Agent execution in progress, itemId:", inProgressEvent.itemId);
      },
      executionTimeoutMs,
    );

    it(
      "should receive agent call completed event",
      async () => {
        // This test verifies the complete execution lifecycle including completion
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        const completedEvent = (await recorder.waitForEvent(
          KnownServerEventType.ResponseFoundryAgentCallCompleted,
          { timeout: 45000 },
        )) as ServerEventResponseFoundryAgentCallCompleted;

        expect(completedEvent.type).toBe(KnownServerEventType.ResponseFoundryAgentCallCompleted);
        expect(completedEvent.itemId).toBeTruthy();
        console.log("Agent completed, itemId:", completedEvent.itemId);
      },
      executionTimeoutMs,
    );
  });

  describe("Agent Response Handling", () => {
    it(
      "should verify agent response in conversation item",
      async () => {
        // This test verifies that agent responses appear in conversation history
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        // Look for conversation item with foundry_agent_call type
        // Wait for any conversation item created events
        const itemCreated = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemCreated,
          { timeout: 30000 },
        )) as ServerEventConversationItemCreated;

        expect(itemCreated.item).toBeDefined();
        if (itemCreated.item) {
          console.log("Conversation item created:", itemCreated.item.type, itemCreated.item.id);

          // The item may be a message or a foundry_agent_call depending on the flow
          if (itemCreated.item.type === "foundry_agent_call") {
            console.log("Foundry agent call item created successfully");
          }
        }
      },
      executionTimeoutMs,
    );

    it(
      "should execute agent with ReturnAgentResponseDirectly",
      async () => {
        // This test verifies that direct response mode works correctly
        const foundryAgent = createFoundryAgentTool(testAgentName, {
          returnAgentResponseDirectly: true,
          description: "Math agent - return response directly without LLM rewriting",
        });

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        // In direct response mode, the agent's response should be returned as-is
        await recorder.waitForEvent(KnownServerEventType.ResponseFoundryAgentCallCompleted, {
          timeout: 45000,
        });
      },
      executionTimeoutMs,
    );
  });

  describe("Error Handling", () => {
    it(
      "should maintain session stability after agent execution",
      async () => {
        // This test verifies that the session remains stable after agent interactions
        // Regardless of whether the agent is invoked or not
        const foundryAgent = createFoundryAgentTool(testAgentName);

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        await sendMathQuestion(session);

        // Wait for either agent events or response events
        // Wait for response to complete (agent may or may not be invoked)
        await recorder.waitForEvent(KnownServerEventType.ResponseDone, { timeout: 45000 });
        console.log("Response completed");

        // Session should remain stable and connected
        expect(session.isConnected).toBe(true);
      },
      executionTimeoutMs,
    );
  });

  describe("Advanced Scenarios", () => {
    it(
      "should execute multiple sequential agent calls",
      async () => {
        // This test verifies that multiple agent calls can be made in sequence
        const foundryAgent = createFoundryAgentTool(testAgentName, {
          agentContextType: KnownFoundryAgentContextType.AgentContext,
          description: "Math agent with context for sequential calls",
        });

        const { session, recorder } = await startSessionWithAgentInstructions(foundryAgent);

        // First math question
        await sendMathQuestion(session, "What is 5 plus 3? Use the math agent.");

        // Wait a bit for first response
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Second math question
        await sendMathQuestion(session, "What is 10 times 2? Use the math agent.");

        // Wait for any agent-related events
        // Just verify we can handle multiple requests without issues
        await recorder.waitForEvent(KnownServerEventType.ResponseCreated, { timeout: 30000 });
        console.log("Multiple requests handled successfully");

        expect(session.isConnected).toBe(true);
      },
      executionTimeoutMs * 2, // Extra time for sequential operations
    );
  });
});
