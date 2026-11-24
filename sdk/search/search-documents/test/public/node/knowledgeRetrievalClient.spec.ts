// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import type { SearchClient, SearchIndexClient, WebKnowledgeSource } from "../../../src/index.js";
import {
  KnowledgeRetrievalClient,
  KnownKnowledgeBaseRetrievalStatusCode,
  KnownKnowledgeRetrievalOutputMode,
} from "../../../src/index.js";
import { defaultServiceVersion } from "../../../src/serviceUtils.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { Hotel } from "../utils/interfaces.js";
import { createClients } from "../utils/recordedClient.js";
import { createRandomIndexName, createIndex, WAIT_TIME, populateIndex } from "../utils/setup.js";

interface PreviewClients {
  baseName: string;
  knowledgeRetrievalClient: KnowledgeRetrievalClient;
}

function createPreviewClients(recorder: Recorder, baseName: string): PreviewClients {
  const recordedBaseName = recorder.variable("TEST_BASE_NAME", baseName);

  const credential = createTestCredential();
  const endPoint: string = assertEnvironmentVariable("ENDPOINT");

  const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
    endPoint,
    recordedBaseName,
    credential,
    recorder.configureClientOptions({}),
  );

  return {
    knowledgeRetrievalClient,
    baseName: recordedBaseName,
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
    try {
      await indexClient.deleteKnowledgeBase(TEST_BASE_NAME).catch(() => {});
      await indexClient.deleteKnowledgeSource(TEST_KS_NAME).catch(() => {});
      await indexClient.deleteIndex(TEST_INDEX_NAME).catch(() => {});
      await delay(WAIT_TIME);
    } finally {
      await recorder?.stop();
    }
  });

  describe("KnowledgeRetrievalClient", () => {
    it("executes queries", { timeout: 60000 }, async () => {
      const result = await knowledgeRetrievalClient.retrieve({
        intents: [
          {
            type: "semantic",
            search: "What is the most luxurious hotel?",
          },
        ],
        retrievalReasoningEffort: {
          kind: "minimal",
        },
      });

      assert.exists(result.activity);
      assert.exists(result.references);
      assert.exists(result.response);
      assert.isTrue(result.response.length > 0);
    });

    it.runIf(isLiveMode())(
      "streams typed retrieval events (live only)",
      { timeout: 60000 },
      async () => {
        let started = false;
        let completed = false;
        const activities = new Set<number>();

        for await (const event of await knowledgeRetrievalClient.retrieveStream({
          intents: [{ type: "semantic", search: "What is the most luxurious hotel?" }],
          includeActivity: true,
          retrievalReasoningEffort: { kind: "minimal" },
        })) {
          if (event.event === "retrieval.started") {
            started = true;
          } else if (event.event === "activity.started") {
            activities.add(event.data.id);
          } else if (event.event === "activity.completed") {
            assert.isTrue(activities.delete(event.data.id));
          } else if (event.event === "response.completed") {
            assert.include(
              [
                KnownKnowledgeBaseRetrievalStatusCode.OK,
                KnownKnowledgeBaseRetrievalStatusCode.PartialContent,
              ],
              event.data.statusCode,
            );
            completed = true;
          } else if (event.event === "error") {
            throw new Error(event.data.error.message ?? "Streaming retrieval failed");
          }
        }

        assert.isTrue(started);
        assert.isTrue(completed);
        assert.equal(activities.size, 0);
      },
    );

    it.runIf(isLiveMode())(
      "create webKnowledgeSource and query knowledge base",
      { timeout: 60000 },
      async () => {
        const webKnowledgeSource: WebKnowledgeSource = {
          kind: "web",
          name: `web-ks-${TEST_INDEX_NAME}`,
        };
        const webBaseName = `${TEST_BASE_NAME}-web`;
        const chatAzureOpenAIParameters = {
          deploymentId: assertEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
          resourceUrl: assertEnvironmentVariable("AZURE_OPENAI_ENDPOINT"),
          modelName: "gpt-4o",
        };

        try {
          await indexClient.createOrUpdateKnowledgeSource(webKnowledgeSource);
          await indexClient.createKnowledgeBase({
            name: webBaseName,
            models: [
              {
                kind: "azureOpenAI",
                azureOpenAIParameters: chatAzureOpenAIParameters,
              },
            ],
            knowledgeSources: [{ name: webKnowledgeSource.name }],
            outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
          });
          await delay(WAIT_TIME);

          const webKnowledgeRetrievalClient = new KnowledgeRetrievalClient(
            knowledgeRetrievalClient.endpoint,
            webBaseName,
            createTestCredential(),
            recorder.configureClientOptions({ serviceVersion: defaultServiceVersion }),
          );
          const result = await webKnowledgeRetrievalClient.retrieve({
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
        } finally {
          await indexClient.deleteKnowledgeBase(webBaseName).catch(() => {});
          await indexClient.deleteKnowledgeSource(webKnowledgeSource.name).catch(() => {});
        }
      },
    );
  });
});
