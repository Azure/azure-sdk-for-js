// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { SearchIndex, SearchIndexClient } from "../../../../src/index.js";
import { KnownQueryLanguage, KnownQuerySpeller, SearchClient } from "../../../../src/index.js";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { createIndex, createRandomIndexName, populateIndex, WAIT_TIME } from "../../utils/setup.js";

describe("search scenarios (preview)", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;
  let TEST_INDEX_NAME: string;
  let indexDefinition: SearchIndex;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    TEST_INDEX_NAME = createRandomIndexName();
    ({
      searchClient,
      indexClient,
      indexName: TEST_INDEX_NAME,
    } = await createClients<Hotel>(defaultServiceVersion, recorder, TEST_INDEX_NAME));
    indexDefinition = await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);
    await delay(WAIT_TIME);
    await populateIndex(searchClient);
  });

  afterEach(async () => {
    await indexClient.deleteIndex(TEST_INDEX_NAME);
    await delay(WAIT_TIME);
    await recorder?.stop();
  });

  const baseSemanticOptions = () =>
    ({
      queryLanguage: KnownQueryLanguage.EnUs,
      queryType: "semantic",
      semanticSearchOptions: {
        configurationName:
          indexDefinition.semanticSearch?.configurations?.[0].name ??
          assert.fail("No semantic configuration in index."),
      },
    }) as const;

  it("search with speller (preview)", async () => {
    const searchResults = await searchClient.search("budjet", {
      skip: 0,
      top: 5,
      includeTotalCount: true,
      queryLanguage: KnownQueryLanguage.EnUs,
      speller: KnownQuerySpeller.Lexicon,
    });
    assert.equal(searchResults.count, 6);
  });

  it("search with document debug info", async () => {
    const baseOptions = baseSemanticOptions();
    const options = {
      ...baseOptions,
      semanticSearchOptions: {
        ...baseOptions.semanticSearchOptions,
        errorMode: "fail",
        debugMode: "semantic",
      },
    } as const;
    const searchResults = await searchClient.search("luxury", options);
    for await (const result of searchResults.results) {
      assert.deepEqual(
        {
          contentFields: [
            {
              name: "description",
              state: "used",
            },
          ],
          keywordFields: [
            {
              name: "tags",
              state: "used",
            },
          ],
          rerankerInput: {
            content:
              "Best hotel in town if you like luxury hotels. They have an amazing infinity pool, a spa, and a really helpful concierge. The location is perfect -- right downtown, close to all the tourist attractions. We highly recommend this hotel.",
            keywords: "pool\r\nview\r\nwifi\r\nconcierge",
            title: "Fancy Stay",
          },
          titleField: {
            name: "hotelName",
            state: "used",
          },
        },
        result.documentDebugInfo?.semantic,
      );
    }
  });
});

describe("content security (preview)", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let indexClient: SearchIndexClient;
  let index: SearchIndex;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    ({ indexClient } = await createClients<Hotel>(defaultServiceVersion, recorder, ""));
    index = {
      name: "content-security-test",
      purviewEnabled: true,
      fields: [
        {
          type: "Edm.String",
          name: "id",
          key: true,
        },
        {
          name: "sensitivityLabel",
          type: "Edm.String",
          filterable: false,
          sortable: false,
          facetable: true,
          sensitivityLabel: true,
        },
      ],
    };
    await indexClient.createOrUpdateIndex(index);
    await delay(WAIT_TIME);
  });

  afterEach(async () => {
    await indexClient.deleteIndex(index.name);
    await recorder?.stop();
  });

  it("verify content security indexes", async () => {
    const documents = [
      { id: "1", sensitivityLabel: "87867195-f2b8-4ac2-b0b6-6bb73cb33afc" },
      { id: "2", sensitivityLabel: "9fbde396-1a24-4c79-8edf-9254a0f35055" },
      { id: "3", sensitivityLabel: "1a19d03a-48bc-4359-8038-5b5f6d5847c3" },
      { id: "4", sensitivityLabel: "1a19d03a-48bc-4359-0000-5b5f6d5847c4" },
    ];

    const searchClient = new SearchClient<{ id: string; sensitivityLabel: string }>(
      indexClient.endpoint,
      index.name,
      createTestCredential(),
      recorder.configureClientOptions({}),
    );

    await searchClient.uploadDocuments(documents);
    await delay(WAIT_TIME);

    // Test that search with invalid authorization token throws an error
    let errorThrown = false;
    try {
      await searchClient.search("*", {
        xMsQuerySourceAuthorization: "Invalid token",
        xMsEnableElevatedRead: true,
      });
    } catch (ex: any) {
      errorThrown = true;
      // Verify it's an auth related error
      assert.isTrue(ex.message.includes("Invalid header"));
    }
    assert.isTrue(errorThrown, "Expected search with invalid header to throw an error");
  });
});
