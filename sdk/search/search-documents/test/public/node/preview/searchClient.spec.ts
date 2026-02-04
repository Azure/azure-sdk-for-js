// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { SearchIndex, SearchIndexClient } from "../../../../src/index.js";
import { KnownQueryLanguage, KnownQuerySpeller, type SearchClient } from "../../../../src/index.js";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { createIndex, createRandomIndexName, populateIndex, WAIT_TIME } from "../../utils/setup.js";

describe("search scenarios", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;
  let TEST_INDEX_NAME: string;
  let TEST_BASE_NAME: string;
  let indexDefinition: SearchIndex;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    TEST_INDEX_NAME = createRandomIndexName();
    TEST_BASE_NAME = createRandomIndexName();
    ({
      searchClient,
      indexClient,
      indexName: TEST_INDEX_NAME,
      baseName: TEST_BASE_NAME,
    } = await createClients<Hotel>(
      defaultServiceVersion,
      recorder,
      TEST_INDEX_NAME,
      TEST_BASE_NAME,
    ));
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
