// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { env, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import type {
  SearchClient,
  SearchIndexClient,
  WebKnowledgeSource,
  RemoteSharePointKnowledgeSource,
  WebKnowledgeSourceParameters,
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
    TEST_KS_NAME = `searchindex-ks-${TEST_INDEX_NAME}`;
    ({
      searchClient,
      indexClient,
      knowledgeRetrievalClient,
      indexName: TEST_INDEX_NAME,
      baseName: TEST_BASE_NAME,
    } = await createClients<Hotel>(
      defaultServiceVersion,
      recorder,
      TEST_INDEX_NAME,
      TEST_BASE_NAME,
    ));
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
    });

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

  describe("KnowledgeBase CRUD", () => {
    it("creates and retrieves webKnowledgeSource", { timeout: 60000 }, async () => {
      const webKsName = `web-ks-${TEST_INDEX_NAME}`;
      const webParameters: WebKnowledgeSourceParameters = {
        domains: {
          allowedDomains: [
            {
              address: "https://learn.microsoft.com",
              includeSubpages: true,
            },
          ],
        },
      };
      const webKnowledgeSource: WebKnowledgeSource = {
        kind: "web",
        name: webKsName,
        description: "web knowledge source for testing",
        webParameters,
      };

      await indexClient.createOrUpdateKnowledgeSource(webKnowledgeSource.name, webKnowledgeSource);

      const fetchedSource = await indexClient.getKnowledgeSource(webKsName);
      assert.equal(fetchedSource.name, webKsName);
      assert.equal(fetchedSource.kind, "web");
      assert.equal(fetchedSource.description, "web knowledge source for testing");

      await indexClient.deleteKnowledgeSource(webKsName);
    });
    it("creates knowledge base with correct properties", async () => {
      const createdBase = await indexClient.getKnowledgeBase(TEST_BASE_NAME);

      assert.equal(createdBase.name, TEST_BASE_NAME);
      assert.exists(createdBase.knowledgeSources);
      assert.isTrue(createdBase.knowledgeSources!.length > 0);
      assert.equal(createdBase.knowledgeSources![0].name, TEST_KS_NAME);
    });

    it("updates knowledge base", async () => {
      const updatedBase = await indexClient.createOrUpdateKnowledgeBase(TEST_BASE_NAME, {
        name: TEST_BASE_NAME,
        description: "updated knowledge base description",
        knowledgeSources: [{ name: TEST_KS_NAME }],
      });

      assert.equal(updatedBase.description, "updated knowledge base description");

      const fetchedBase = await indexClient.getKnowledgeBase(TEST_BASE_NAME);
      assert.equal(fetchedBase.description, "updated knowledge base description");
    });

    it("gets knowledge base", async () => {
      const fetchedBase = await indexClient.getKnowledgeBase(TEST_BASE_NAME);

      assert.equal(fetchedBase.name, TEST_BASE_NAME);
      assert.exists(fetchedBase.knowledgeSources);
      assert.equal(fetchedBase.knowledgeSources![0].name, TEST_KS_NAME);
    });

    it("lists knowledge bases", async () => {
      const knowledgeBases: string[] = [];
      for await (const kb of indexClient.listKnowledgeBases()) {
        knowledgeBases.push(kb.name!);
      }

      assert.isTrue(knowledgeBases.includes(TEST_BASE_NAME));
    });
  });

  describe("KnowledgeSource CRUD", () => {
    it("creates knowledge source with correct properties", async () => {
      const createdSource = await indexClient.getKnowledgeSource(TEST_KS_NAME);

      assert.equal(createdSource.name, TEST_KS_NAME);
      assert.equal(createdSource.kind, "searchIndex");
    });

    it("updates knowledge source", async () => {
      await indexClient.createOrUpdateKnowledgeSource(TEST_KS_NAME, {
        kind: "searchIndex",
        name: TEST_KS_NAME,
        description: "updated knowledge source description",
        searchIndexParameters: {
          searchIndexName: TEST_INDEX_NAME,
          searchFields: [{ name: "hotelName" }, { name: "description" }],
          semanticConfigurationName: "semantic-configuration",
        },
      });

      const fetchedSource = await indexClient.getKnowledgeSource(TEST_KS_NAME);
      assert.equal(fetchedSource.description, "updated knowledge source description");
    });

    it("gets knowledge source", async () => {
      const fetchedSource = await indexClient.getKnowledgeSource(TEST_KS_NAME);

      assert.equal(fetchedSource.name, TEST_KS_NAME);
      assert.equal(fetchedSource.kind, "searchIndex");
    });

    it("lists knowledge sources", async () => {
      const knowledgeSources: string[] = [];
      for await (const ks of indexClient.listKnowledgeSources()) {
        knowledgeSources.push(ks.name!);
      }

      assert.isTrue(knowledgeSources.includes(TEST_KS_NAME));
    });
  });
});
