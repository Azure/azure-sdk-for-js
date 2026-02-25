// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import fs from "fs";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const agentName = "file-search-agent";
const agentInstructions =
  "You are a helpful assistant that can search through product information.";

describe("agents - file search - basic", () => {
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

  it.skipIf(!isLiveMode())("should create agent with File Search tool", async () => {
    // Create vector store for file search
    const vectorStore = await openAIClient.vectorStores.create({
      name: "TestProductInfoStore",
    });
    assert.isNotNull(vectorStore);
    assert.isNotNull(vectorStore.id);
    console.log(`Vector store created (id: ${vectorStore.id})`);

    // Upload file to vector store
    const dataUrl = new URL("./data/product_info.md", import.meta.url);
    const file = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fs.createReadStream(dataUrl),
    );
    assert.isNotNull(file);
    assert.isNotNull(file.id);
    console.log(`File uploaded to vector store (id: ${file.id})`);

    // Create agent with file search tool
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStore.id],
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, agentName);
    console.log(`Created agent with File Search tool, agent ID: ${agent.id}`);

    // Clean up
    await agents.delete(agent.name);
    console.log(`Deleted agent, agent name: ${agent.name}`);

    await openAIClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, id: ${vectorStore.id}`);
  });
});

describe("agents - file search - execution flow", () => {
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

  it.skipIf(!isLiveMode())("should execute File Search query and return result", async function () {
    // Create vector store for file search
    const vectorStore = await openAIClient.vectorStores.create({
      name: "TestProductInfoStore",
    });
    assert.isNotNull(vectorStore);
    console.log(`Vector store created (id: ${vectorStore.id})`);

    // Upload file to vector store
    const dataUrl = new URL("./data/product_info.md", import.meta.url);
    const file = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fs.createReadStream(dataUrl),
    );
    assert.isNotNull(file);
    console.log(`File uploaded to vector store (id: ${file.id})`);

    // Create agent with file search tool
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStore.id],
        },
      ],
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotNull(agent.name);
    assert.isNotNull(agent.version);
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Send a query that should trigger File Search
    const response = await openAIClient.responses.create(
      {
        input: [
          {
            type: "message",
            role: "user",
            content: "Tell me about Contoso products",
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

    await openAIClient.vectorStores.delete(vectorStore.id);
    console.log("Vector store deleted");
  });

  it.skipIf(!isLiveMode())(
    "should handle File Search query with streaming response",
    async function () {
      // Create vector store for file search
      const vectorStore = await openAIClient.vectorStores.create({
        name: "TestProductInfoStore",
      });
      assert.isNotNull(vectorStore);
      console.log(`Vector store created (id: ${vectorStore.id})`);

      // Upload file to vector store
      const dataUrl = new URL("./data/product_info.md", import.meta.url);
      const file = await openAIClient.vectorStores.files.uploadAndPoll(
        vectorStore.id,
        fs.createReadStream(dataUrl),
      );
      assert.isNotNull(file);
      console.log(`File uploaded to vector store (id: ${file.id})`);

      // Create agent with file search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [
          {
            type: "file_search",
            vector_store_ids: [vectorStore.id],
          },
        ],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Send a streaming query
      const streamResponse = await openAIClient.responses.create(
        {
          input: "What is the price of the Contoso Laptop Pro 15?",
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

      // Process the streaming response
      for await (const event of streamResponse) {
        if (event.type === "response.created") {
          responseCreated = true;
          console.log(`Response created with ID: ${event.response.id}`);
        } else if (event.type === "response.output_text.delta") {
          responseText += event.delta;
        } else if (event.type === "response.completed") {
          responseCompleted = true;
          console.log("Response completed!");
        }
      }

      assert.isTrue(responseCreated, "Expected response.created event");
      assert.isTrue(responseCompleted, "Expected response.completed event");
      assert.isNotEmpty(responseText, "Expected response text from streaming");
      console.log(`Streaming response text: ${responseText}`);

      // Clean up
      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");

      await openAIClient.vectorStores.delete(vectorStore.id);
      console.log("Vector store deleted");
    },
  );

  it.skipIf(!isLiveMode())(
    "should handle File Search query in conversation context",
    async function () {
      // Create vector store for file search
      const vectorStore = await openAIClient.vectorStores.create({
        name: "TestProductInfoStore",
      });
      assert.isNotNull(vectorStore);
      console.log(`Vector store created (id: ${vectorStore.id})`);

      // Upload file to vector store
      const dataUrl = new URL("./data/product_info.md", import.meta.url);
      const file = await openAIClient.vectorStores.files.uploadAndPoll(
        vectorStore.id,
        fs.createReadStream(dataUrl),
      );
      assert.isNotNull(file);
      console.log(`File uploaded to vector store (id: ${file.id})`);

      // Create agent with file search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [
          {
            type: "file_search",
            vector_store_ids: [vectorStore.id],
          },
        ],
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
            content: "What products does Contoso offer?",
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

      await openAIClient.vectorStores.delete(vectorStore.id);
      console.log("Vector store deleted");
    },
  );
});
