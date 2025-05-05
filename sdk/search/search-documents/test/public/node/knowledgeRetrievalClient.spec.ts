// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import type { OpenAIClient } from "@azure/openai";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type {
  AzureOpenAIParameters,
  KnowledgeRetrievalClient,
  SearchClient,
  SearchIndexClient,
} from "../../../src/index.js";
import { defaultServiceVersion } from "../../../src/serviceUtils.js";
import type { Hotel } from "../utils/interfaces.js";
import { createClients } from "../utils/recordedClient.js";
import { createIndex, createRandomIndexName, populateIndex, WAIT_TIME } from "../utils/setup.js";
describe("KnowledgeRetrievalClient", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;
  let openAIClient: OpenAIClient;
  let TEST_INDEX_NAME: string;
  let TEST_AGENT_NAME: string;
  let knowledgeRetrievalClient: KnowledgeRetrievalClient;
  let azureOpenAIParameters: AzureOpenAIParameters;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    TEST_INDEX_NAME = createRandomIndexName();
    TEST_AGENT_NAME = createRandomIndexName();
    ({
      searchClient,
      indexClient,
      openAIClient,
      knowledgeRetrievalClient,
      indexName: TEST_INDEX_NAME,
      agentName: TEST_AGENT_NAME,
      azureOpenAIParameters,
    } = await createClients<Hotel>(
      defaultServiceVersion,
      recorder,
      TEST_INDEX_NAME,
      TEST_AGENT_NAME,
    ));
    await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);

    await indexClient.createKnowledgeAgent({
      name: TEST_AGENT_NAME,
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: { ...azureOpenAIParameters, modelName: "gpt-4o" },
        },
      ],
      targetIndexes: [{ indexName: TEST_INDEX_NAME }],
    });

    await delay(WAIT_TIME);
    await populateIndex(searchClient, openAIClient);
  });

  afterEach(async () => {
    await indexClient.deleteKnowledgeAgent(TEST_AGENT_NAME);
    await indexClient.deleteIndex(TEST_INDEX_NAME);
    await delay(WAIT_TIME);
    await recorder?.stop();
  });

  describe("KnowledgeRetrievalClient", () => {
    it("executes queries", async () => {
      const result = await knowledgeRetrievalClient.retrieveKnowledge({
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: "What is the most luxurious hotel?" }],
          },
        ],
      });
      assert.deepEqual(result, {});
    });
  });
});
