// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const agentName = "bing-custom-search-agent";
const agentInstructions =
  "You are a helpful agent that can use Bing Custom Search tools to assist users. Use the available Bing Custom Search tools to answer questions and perform tasks.";

// These would typically come from environment variables in live mode
const bingCustomSearchProjectConnectionId =
  process.env["BING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID"] ||
  "<bing custom search project connection id>";
const bingCustomSearchInstanceName =
  process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "<bing custom search instance name>";

/**
 * Define Bing Custom Search tool configuration
 */
const bingCustomSearchTool = {
  type: "bing_custom_search_preview" as const,
  bing_custom_search_preview: {
    search_configurations: [
      {
        project_connection_id: bingCustomSearchProjectConnectionId,
        instance_name: bingCustomSearchInstanceName,
      },
    ],
  },
};

describe("agents - bing custom search - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skipIf(!isLiveMode())("should create agent with Bing Custom Search tool", async () => {
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [bingCustomSearchTool],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, agentName);
    console.log(`Created agent with Bing Custom Search tool, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});

describe("agents - bing custom search - execution flow", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skipIf(!isLiveMode())(
    "should execute Bing Custom Search query and return result",
    async function () {
      // Create agent with Bing Custom Search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [bingCustomSearchTool],
      });
      assert.isNotNull(agent);
      assert.isNotNull(agent.id);
      assert.isNotNull(agent.name);
      assert.isNotNull(agent.version);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Send a query that should trigger Bing Custom Search
      const response = await openAIClient.responses.create(
        {
          input: [
            {
              type: "message",
              role: "user",
              content: "What is the history of Kubernetes? Give a summary.",
            },
          ],
        },
        {
          body: {
            agent: { name: agent.name, type: "agent_reference" },
            tool_choice: "required",
          },
        },
      );

      assert.isNotNull(response);
      assert.isNotNull(response.output_text);
      console.log(`Response output: ${response.output_text}`);

      // Clean up
      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );

  it.skipIf(!isLiveMode())(
    "should handle Bing Custom Search query with streaming response",
    async function () {
      // Create agent with Bing Custom Search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [bingCustomSearchTool],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Send a streaming query
      const streamResponse = await openAIClient.responses.create(
        {
          input: "What is the history of Kubernetes? Give a summary.",
          stream: true,
        },
        {
          body: {
            agent: { name: agent.name, type: "agent_reference" },
            tool_choice: "required",
          },
        },
      );

      let responseText = "";
      let responseCreated = false;
      let responseCompleted = false;
      const urlCitations: Array<{ url: string; start_index: number; end_index: number }> = [];

      // Process the streaming response
      for await (const event of streamResponse) {
        if (event.type === "response.created") {
          responseCreated = true;
          console.log(`Response created with ID: ${event.response.id}`);
        } else if (event.type === "response.output_text.delta") {
          responseText += event.delta;
        } else if (event.type === "response.output_item.done") {
          if (event.item.type === "message") {
            const item = event.item;
            if (item.content && item.content.length > 0) {
              const lastContent = item.content[item.content.length - 1];
              if (lastContent.type === "output_text" && lastContent.annotations) {
                for (const annotation of lastContent.annotations) {
                  if (annotation.type === "url_citation") {
                    urlCitations.push({
                      url: annotation.url,
                      start_index: annotation.start_index,
                      end_index: annotation.end_index,
                    });
                    console.log(
                      `URL Citation: ${annotation.url}, Start index: ${annotation.start_index}, End index: ${annotation.end_index}`,
                    );
                  }
                }
              }
            }
          }
        } else if (event.type === "response.completed") {
          responseCompleted = true;
          console.log("Response completed!");
        }
      }

      assert.isTrue(responseCreated, "Expected response.created event");
      assert.isTrue(responseCompleted, "Expected response.completed event");
      assert.isNotEmpty(responseText, "Expected response text from streaming");
      console.log(`Streaming response text: ${responseText}`);

      // Verify URL citations are present
      assert.isNotEmpty(urlCitations, "Expected URL citations from Bing Custom Search");
      for (const citation of urlCitations) {
        assert.isNotEmpty(citation.url, "Expected citation URL to be non-empty");
        assert.match(citation.url, /^https?:\/\//, "Expected citation URL to be a valid URL");
        console.log(`Verified URL citation: ${citation.url}`);
      }

      // Clean up
      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );

  it.skipIf(!isLiveMode())(
    "should handle Bing Custom Search query in conversation context",
    async function () {
      // Create agent with Bing Custom Search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [bingCustomSearchTool],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Create conversation with initial user message
      const conversation = await openAIClient.conversations.create({
        items: [
          {
            type: "message",
            role: "user",
            content: "What is the history of Kubernetes? Give a summary.",
          },
        ],
      });
      assert.isNotNull(conversation);
      assert.isNotNull(conversation.id);
      console.log(`Created conversation (id: ${conversation.id})`);

      // Generate response using the agent
      const response = await openAIClient.responses.create(
        {
          conversation: conversation.id,
        },
        {
          body: {
            agent: { name: agent.name, type: "agent_reference" },
            tool_choice: "required",
          },
        },
      );

      assert.isNotNull(response);
      assert.isNotNull(response.output_text);
      console.log(`Response output: ${response.output_text}`);

      // Clean up
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");

      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );
});
