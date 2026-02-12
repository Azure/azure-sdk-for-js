// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable, env, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import type {
  SearchClient,
  SearchIndexClient,
  WebKnowledgeSource,
  RemoteSharePointKnowledgeSource,
} from "@azure/search-documents";
import {
  KnowledgeRetrievalClient,
  KnownKnowledgeRetrievalOutputMode,
} from "@azure/search-documents";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { createRandomIndexName, createIndex, WAIT_TIME, populateIndex } from "../../utils/setup.js";

interface PreviewClients {
  baseName: string;
  knowledgeRetrievalClient: KnowledgeRetrievalClient;
}

function createPreviewClients(recorder: Recorder, baseName: string): PreviewClients {
  baseName = recorder.variable("TEST_BASE_NAME", baseName);

  const credential = createTestCredential();
  const endPoint: string = assertEnvironmentVariable("ENDPOINT");

  const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
    endPoint,
    baseName,
    credential,
    recorder.configureClientOptions({}),
  );

  return {
    knowledgeRetrievalClient,
    baseName,
  };
}

describe("Knowledge", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;
  let TEST_INDEX_NAME: string;
  let TEST_BASE_NAME: string;
  let TEST_KS_NAME: string;
  let knowledgeRetrievalClient: KnowledgeRetrievalClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    TEST_INDEX_NAME = createRandomIndexName();
    TEST_BASE_NAME = createRandomIndexName();
    ({
      searchClient,
      indexClient,
      indexName: TEST_INDEX_NAME,
    } = await createClients<Hotel>(defaultServiceVersion, recorder, TEST_INDEX_NAME));
    ({ knowledgeRetrievalClient, baseName: TEST_BASE_NAME } = createPreviewClients(
      recorder,
      TEST_BASE_NAME,
    ));
    TEST_KS_NAME = `searchindex-ks-${TEST_INDEX_NAME}`;
    await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);

    await indexClient.createKnowledgeSource({
      kind: "searchIndex",
      name: TEST_KS_NAME,
      searchIndexParameters: {
        searchIndexName: TEST_INDEX_NAME,
        searchFields: [{ name: "hotelName" }, { name: "description" }],
        semanticConfigurationName: "semantic-configuration",
      },
    });

    await indexClient.createKnowledgeBase({
      name: TEST_BASE_NAME,
      knowledgeSources: [{ name: TEST_KS_NAME }],
    } as any);

    await delay(WAIT_TIME);
    await populateIndex(searchClient);
  });

  afterEach(async () => {
    await indexClient.deleteKnowledgeBase(TEST_BASE_NAME);
    await indexClient.deleteKnowledgeSource(TEST_KS_NAME);
    await indexClient.deleteIndex(TEST_INDEX_NAME);
    await delay(WAIT_TIME);
    await recorder?.stop();
  });

  describe("KnowledgeRetrievalClient", () => {
    it("executes queries", { timeout: 60000 }, async () => {
      const result = await knowledgeRetrievalClient.retrieveKnowledge({
        intents: [
          {
            type: "semantic",
            search: "What is the most luxurious hotel?",
          },
        ],
        retrievalReasoningEffort: { kind: "minimal" },
      });

      assert.exists(result.activity);
      assert.exists(result.references);
      assert.exists(result.response);
      assert.isTrue(result.response.length > 0);
    });
  });

  // Unskip and test locally with valid AOAI resource. Cannot enable in the pipeline due to resource constraints.
  describe.skip("KnowledgeRetrievalClient with models", () => {
    const chatAzureOpenAIParameters = {
      deploymentId: env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME,
      resourceUrl: env.AZURE_OPENAI_ENDPOINT,
      modelName: "gpt-4o",
    };

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
            azureOpenAIParameters: chatAzureOpenAIParameters,
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

    it("CRUD remote sharepoint knowledge source", { timeout: 60000 }, async () => {
      const spKsName = `remotesharepoint-ks-${TEST_INDEX_NAME}`;
      const remoteSharePointKnowledgeSource: RemoteSharePointKnowledgeSource = {
        kind: "remoteSharePoint",
        name: spKsName,
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
            azureOpenAIParameters: chatAzureOpenAIParameters,
          },
        ],
        knowledgeSources: [{ name: spKsName }],
        outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
      });

      await delay(WAIT_TIME);
      await indexClient.deleteKnowledgeBase(`${TEST_BASE_NAME}-remotesharepoint`);
      await indexClient.deleteKnowledgeSource(spKsName);
    });
  });
});
