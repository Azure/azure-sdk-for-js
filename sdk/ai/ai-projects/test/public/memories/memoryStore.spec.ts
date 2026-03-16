// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { assert, afterEach, beforeEach, it, describe } from "vitest";
import type { AIProjectClient, MemoryStoreDefaultDefinition } from "../../../src/index.js";

describe("memoryStores", () => {
  let projectsClient: AIProjectClient;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and delete a memory store", async function () {
    const memoryStoreName = "test_memory_store_create_1";
    const chatModel = assertEnvironmentVariable("AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME");
    const embeddingModel = assertEnvironmentVariable("AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME");

    const definition: MemoryStoreDefaultDefinition = {
      kind: "default",
      chat_model: chatModel,
      embedding_model: embeddingModel,
    };

    const memoryStore = await projectsClient.beta.memoryStores.create(memoryStoreName, definition, {
      description: "Test memory store",
    });

    assert.isNotNull(memoryStore);
    assert.equal(memoryStore.name, memoryStoreName);
    assert.isNotNull(memoryStore.id);
    console.log(`Created memory store: ${memoryStore.name} (${memoryStore.id})`);

    await projectsClient.beta.memoryStores.delete(memoryStoreName);
    console.log(`Deleted memory store: ${memoryStoreName}`);
  }, 30000);

  it.skipIf(!isLiveMode())(
    "should create memory store, update memories and search",
    async function () {
      const memoryStoreName = "test_memory_store_update_1";
      const scope = "test_user_001";
      const chatModel = assertEnvironmentVariable("AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME");
      const embeddingModel = assertEnvironmentVariable("AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME");

      const definition: MemoryStoreDefaultDefinition = {
        kind: "default",
        chat_model: chatModel,
        embedding_model: embeddingModel,
        options: {
          user_profile_enabled: true,
          chat_summary_enabled: true,
        },
      };

      const memoryStore = await projectsClient.beta.memoryStores.create(
        memoryStoreName,
        definition,
        {
          description: "Test memory store for update and search",
        },
      );

      assert.isNotNull(memoryStore);
      assert.equal(memoryStore.name, memoryStoreName);
      console.log(`Created memory store: ${memoryStore.name} (${memoryStore.id})`);

      try {
        // Add memories via update
        const userMessage: Record<string, unknown> = {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: "I prefer dark roast coffee and usually drink it in the morning",
            },
          ],
        };

        console.log("Submitting memory update...");
        const updateResult = await projectsClient.beta.memoryStores
          .updateMemories(memoryStoreName, scope, {
            items: [userMessage],
            updateDelayInSecs: 0,
          })
          .pollUntilDone();

        assert.isNotNull(updateResult);
        assert.isNotNull(updateResult.memory_operations);
        assert.isTrue(updateResult.memory_operations.length > 0);
        console.log(`Updated with ${updateResult.memory_operations.length} memory operation(s)`);

        for (const operation of updateResult.memory_operations) {
          assert.isNotNull(operation.kind);
          assert.isNotNull(operation.memory_item);
          assert.isNotNull(operation.memory_item.memory_id);
          console.log(
            `  - Operation: ${operation.kind}, Memory ID: ${operation.memory_item.memory_id}`,
          );
        }

        // Search memories
        const queryMessage: Record<string, unknown> = {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "What are my coffee preferences?" }],
        };

        console.log("Searching memories...");
        const searchResponse = await projectsClient.beta.memoryStores.searchMemories(
          memoryStoreName,
          scope,
          {
            items: [queryMessage],
            options: { max_memories: 5 },
          },
        );

        assert.isNotNull(searchResponse);
        assert.isNotNull(searchResponse.memories);
        console.log(`Found ${searchResponse.memories.length} memory item(s)`);

        // Clean up scope
        await projectsClient.beta.memoryStores.deleteScope(memoryStoreName, scope);
        console.log(`Deleted scope '${scope}'`);
      } finally {
        await projectsClient.beta.memoryStores.delete(memoryStoreName);
        console.log(`Deleted memory store: ${memoryStoreName}`);
      }
    },
    120000,
  );
});
