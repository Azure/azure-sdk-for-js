// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "../../src/index.js";
import { SearchIndexClient } from "../../src/searchIndexClient.js";
import { SearchIndexerClient } from "../../src/searchIndexerClient.js";

/**
 * Serves a canned two-page response so that continuation is exercised without a
 * live service. The second page is only ever requested if the paging helper
 * reads the continuation link off the deserialized body under the right name.
 */
function twoPageClient(
  bodies: Record<string, unknown>[],
  requestedUrls: string[],
): SearchIndexClient {
  let page = 0;
  return new SearchIndexClient("https://example.search.windows.net", new AzureKeyCredential("k"), {
    additionalPolicies: [
      {
        position: "perCall",
        policy: {
          name: "canned-pages",
          async sendRequest(request): Promise<PipelineResponse> {
            requestedUrls.push(request.url);
            const body = bodies[Math.min(page, bodies.length - 1)];
            page++;
            return {
              request,
              status: 200,
              headers: request.headers,
              bodyAsText: JSON.stringify(body),
            } as unknown as PipelineResponse;
          },
        },
      },
    ],
  });
}

function twoPageIndexerClient(
  bodies: Record<string, unknown>[],
  requestedUrls: string[],
): SearchIndexerClient {
  let page = 0;
  return new SearchIndexerClient(
    "https://example.search.windows.net",
    new AzureKeyCredential("k"),
    {
      additionalPolicies: [
        {
          position: "perCall",
          policy: {
            name: "canned-indexer-pages",
            async sendRequest(request): Promise<PipelineResponse> {
              requestedUrls.push(request.url);
              const body = bodies[Math.min(page, bodies.length - 1)];
              page++;
              return {
                request,
                status: 200,
                headers: request.headers,
                bodyAsText: JSON.stringify(body),
              } as unknown as PipelineResponse;
            },
          },
        },
      ],
    },
  );
}

const NEXT_PAGE = "https://example.search.windows.net/indexes?$skiptoken=page2";

describe("generated paging continuation", () => {
  it("follows the continuation link across pages for listIndexes", async () => {
    const urls: string[] = [];
    const client = twoPageClient(
      [
        {
          value: [{ name: "index-1", fields: [] }],
          "@odata.nextLink": NEXT_PAGE,
        },
        { value: [{ name: "index-2", fields: [] }] },
      ],
      urls,
    );

    const names: string[] = [];
    for await (const index of client.listIndexes()) {
      names.push(index.name);
    }

    assert.deepEqual(names, ["index-1", "index-2"]);
    assert.equal(urls.length, 2);
    assert.include(urls[1], "skiptoken=page2");
  });

  it("follows the continuation link across pages for listKnowledgeBases", async () => {
    const urls: string[] = [];
    const client = twoPageClient(
      [
        {
          value: [{ name: "kb-1", knowledgeSources: [] }],
          "@odata.nextLink": NEXT_PAGE,
        },
        { value: [{ name: "kb-2", knowledgeSources: [] }] },
      ],
      urls,
    );

    const names: string[] = [];
    for await (const base of client.listKnowledgeBases()) {
      names.push(base.name);
    }

    assert.deepEqual(names, ["kb-1", "kb-2"]);
    assert.equal(urls.length, 2);
  });

  it("follows the continuation link across pages for listSynonymMaps", async () => {
    const urls: string[] = [];
    const client = twoPageClient(
      [
        { value: [{ name: "map-1", synonyms: "a,b" }], "@odata.nextLink": NEXT_PAGE },
        { value: [{ name: "map-2", synonyms: "c,d" }] },
      ],
      urls,
    );

    const maps = await client.listSynonymMaps();

    assert.deepEqual(
      maps.map((map) => map.name),
      ["map-1", "map-2"],
    );
    assert.equal(urls.length, 2);
  });

  it("follows the continuation link across pages for listIndexers", async () => {
    const urls: string[] = [];
    const client = twoPageIndexerClient(
      [
        { value: [{ name: "indexer-1" }], "@odata.nextLink": NEXT_PAGE },
        { value: [{ name: "indexer-2" }] },
      ],
      urls,
    );

    const indexers = await client.listIndexers();

    assert.deepEqual(
      indexers.map((indexer) => indexer.name),
      ["indexer-1", "indexer-2"],
    );
    assert.equal(urls.length, 2);
  });

  it("follows the continuation link across pages for data sources and skillsets", async () => {
    const dataSourceUrls: string[] = [];
    const dataSourceClient = twoPageIndexerClient(
      [
        {
          value: [
            {
              name: "source-1",
              type: "azureblob",
              credentials: { connectionString: "<redacted>" },
              container: { name: "container" },
            },
          ],
          "@odata.nextLink": NEXT_PAGE,
        },
        {
          value: [
            {
              name: "source-2",
              type: "azureblob",
              credentials: { connectionString: "<redacted>" },
              container: { name: "container" },
            },
          ],
        },
      ],
      dataSourceUrls,
    );
    const skillsetUrls: string[] = [];
    const skillsetClient = twoPageIndexerClient(
      [
        { value: [{ name: "skillset-1", skills: [] }], "@odata.nextLink": NEXT_PAGE },
        { value: [{ name: "skillset-2", skills: [] }] },
      ],
      skillsetUrls,
    );

    const dataSources = await dataSourceClient.listDataSourceConnections();
    const skillsets = await skillsetClient.listSkillsets();

    assert.deepEqual(
      dataSources.map((dataSource) => dataSource.name),
      ["source-1", "source-2"],
    );
    assert.deepEqual(
      skillsets.map((skillset) => skillset.name),
      ["skillset-1", "skillset-2"],
    );
    assert.equal(dataSourceUrls.length, 2);
    assert.equal(skillsetUrls.length, 2);
  });

  it("stops after a single page when no continuation link is returned", async () => {
    const urls: string[] = [];
    const client = twoPageClient([{ value: [{ name: "only", fields: [] }] }], urls);

    const names: string[] = [];
    for await (const index of client.listIndexes()) {
      names.push(index.name);
    }

    assert.deepEqual(names, ["only"]);
    assert.equal(urls.length, 1);
  });
});
