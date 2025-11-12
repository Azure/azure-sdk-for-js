// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import type { OpenAIClient } from "@azure/openai";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type {
  AzureOpenAIParameters,
  RemoteSharePointKnowledgeSource,
  SearchClient,
  SearchIndexClient,
  WebKnowledgeSource,
} from "../../../src/index.js";
import { KnowledgeRetrievalClient, KnownKnowledgeRetrievalOutputMode } from "../../../src/index.js";
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
  let TEST_BASE_NAME: string;
  let knowledgeRetrievalClient: KnowledgeRetrievalClient;
  let azureOpenAIParameters: AzureOpenAIParameters;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    TEST_INDEX_NAME = createRandomIndexName();
    TEST_BASE_NAME = createRandomIndexName();
    ({
      searchClient,
      indexClient,
      openAIClient,
      knowledgeRetrievalClient,
      indexName: TEST_INDEX_NAME,
      baseName: TEST_BASE_NAME,
      azureOpenAIParameters,
    } = await createClients<Hotel>(
      defaultServiceVersion,
      recorder,
      TEST_INDEX_NAME,
      TEST_BASE_NAME,
    ));
    await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);

    await indexClient.createKnowledgeSource({
      kind: "searchIndex",
      name: "searchindex-ks",
      searchIndexParameters: {
        searchIndexName: TEST_INDEX_NAME,
        searchFields: [{ name: "hotelName" }, { name: "description" }],
        semanticConfigurationName: "semantic-configuration",
      },
    });

    await indexClient.createKnowledgeBase({
      name: TEST_BASE_NAME,
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: { ...azureOpenAIParameters, modelName: "gpt-4o" },
        },
      ],
      knowledgeSources: [{ name: "searchindex-ks" }],
    });

    await delay(WAIT_TIME);
    await populateIndex(searchClient, openAIClient);
  });

  afterEach(async () => {
    await indexClient.deleteKnowledgeBase(TEST_BASE_NAME);
    await indexClient.deleteKnowledgeSource("searchindex-ks");
    await indexClient.deleteIndex(TEST_INDEX_NAME);
    await delay(WAIT_TIME);
    await recorder?.stop();
  });

  describe("KnowledgeRetrievalClient", () => {
    it("executes queries", { timeout: 60000 }, async () => {
      const result = await knowledgeRetrievalClient.retrieveKnowledge({
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: "What is the most luxurious hotel?" }],
          },
        ],
      });

      assert.exists(result.activity);
      assert.exists(result.references);
      assert.exists(result.response);
      assert.isTrue(result.response.length > 0);
    });

    it("create webKnowledgeSource and query knowledge base", { timeout: 60000 }, async () => {
      const webKnowledgeSource: WebKnowledgeSource = {
        kind: "web",
        name: "web-ks",
      };

      await indexClient.createOrUpdateKnowledgeSource(webKnowledgeSource.name, webKnowledgeSource);

      await indexClient.createKnowledgeBase({
        name: `${TEST_BASE_NAME}-web`,
        models: [
          {
            kind: "azureOpenAI",
            azureOpenAIParameters: { ...azureOpenAIParameters, modelName: "gpt-4o" },
          },
        ],
        knowledgeSources: [{ name: "web-ks" }],
        outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
      });

      await delay(WAIT_TIME);

      const webKnowledgeRetrievalClient = new KnowledgeRetrievalClient(
        knowledgeRetrievalClient.endpoint,
        `${TEST_BASE_NAME}-web`,
        createTestCredential(),
      );

      const result = await webKnowledgeRetrievalClient.retrieveKnowledge({
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: "What is the weather in redmond today?" }],
          },
        ],
        outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
        retrievalReasoningEffort: { kind: "low" },
      });

      assert.exists(result.activity);
      assert.exists(result.references);
      assert.exists(result.response);
      assert.isTrue(result.response.length > 0);

      await indexClient.deleteKnowledgeBase(`${TEST_BASE_NAME}-web`);
      await indexClient.deleteKnowledgeSource("web-ks");
    });

    it("CRUD  remote sharepoint knowledge source", { timeout: 60000 }, async () => {
      const remoteSharePointKnowledgeSource: RemoteSharePointKnowledgeSource = {
        kind: "remoteSharePoint",
        name: "remotesharepoint-ks",
        remoteSharePointParameters: {},
      };

      await indexClient.createOrUpdateKnowledgeSource(
        remoteSharePointKnowledgeSource.name,
        remoteSharePointKnowledgeSource,
      );

      await indexClient.createKnowledgeBase({
        name: `${TEST_BASE_NAME}-remotesharepoint`,
        models: [
          {
            kind: "azureOpenAI",
            azureOpenAIParameters: { ...azureOpenAIParameters, modelName: "gpt-4o" },
          },
        ],
        knowledgeSources: [{ name: "remotesharepoint-ks" }],
        outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
      });

      await delay(WAIT_TIME);
      await indexClient.deleteKnowledgeBase(`${TEST_BASE_NAME}-remotesharepoint`);
      await indexClient.deleteKnowledgeSource("remotesharepoint-ks");
    });
  });
});
