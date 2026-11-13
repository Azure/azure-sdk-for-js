// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { AzureKeyCredential, SearchIndexClient } from "../../../src/index.js";
import { createSynonymMaps, deleteSynonymMaps } from "../../public/utils/setup.js";

function synonymMapService(
  existingNames: string[],
  failedDeletes: string[] = [],
): {
  client: SearchIndexClient;
  maps: Map<string, Record<string, unknown>>;
  requests: PipelineRequest[];
} {
  const maps = new Map(
    existingNames.map((name) => [name, { name, synonyms: "original", format: "solr" }]),
  );
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request): Promise<PipelineResponse> {
      requests.push(request);
      const path = new URL(request.url).pathname;
      let status: number;
      let response: Record<string, unknown>;
      if (request.method === "POST" && path === "/synonymmaps") {
        const definition = JSON.parse(String(request.body));
        if (maps.has(definition.name)) {
          status = 409;
          response = { error: { code: "AlreadyExists", message: "Map already exists" } };
        } else {
          maps.set(definition.name, definition);
          status = 201;
          response = definition;
        }
      } else if (request.method === "DELETE") {
        const name = /^\/synonymmaps\('([^']+)'\)$/.exec(path)?.[1];
        assert.isDefined(name);
        status = failedDeletes.includes(name!) ? 503 : 204;
        if (status === 204) maps.delete(name!);
        response = { error: { code: "Unavailable", message: "Cleanup unavailable" } };
      } else {
        throw new Error(`Unexpected fixture request: ${request.method} ${path}`);
      }
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: status === 204 ? undefined : JSON.stringify(response),
      };
    },
  };
  const client = new SearchIndexClient(
    "https://example.search.windows.net",
    new AzureKeyCredential("key"),
    { httpClient, retryOptions: { maxRetries: 0 } },
  );
  return { client, maps, requests };
}

describe("Search fixture ownership", () => {
  it("isolates concurrent synonym-map fixtures and preserves other callers' maps", async () => {
    const existing = ["python-map", "my-azure-synonymmap-1", "my-azure-synonymmap-2"];
    const { client, maps } = synonymMapService(existing);
    const [first, second] = await Promise.all([
      createSynonymMaps(client, ["js-first-1", "js-first-2"]),
      createSynonymMaps(client, ["js-second-1", "js-second-2"]),
    ]);

    await deleteSynonymMaps(client, first);
    assert.sameMembers([...maps.keys()], [...existing, ...second]);
    assert.equal(maps.get("python-map")?.synonyms, "original");

    await deleteSynonymMaps(client, second);
    assert.sameMembers([...maps.keys()], existing);
  });

  it("rolls back only successful creations when a later map collides", async () => {
    const { client, maps, requests } = synonymMapService(["collision", "python-map"]);

    await expect(createSynonymMaps(client, ["js-created", "collision"])).rejects.toMatchObject({
      statusCode: 409,
    });

    assert.sameMembers([...maps.keys()], ["collision", "python-map"]);
    assert.equal(maps.get("collision")?.synonyms, "original");
    const deleted = requests.filter((request) => request.method === "DELETE");
    assert.lengthOf(deleted, 1);
    assert.equal(new URL(deleted[0].url).pathname, "/synonymmaps('js-created')");
  });

  it("does not delete a resource when the first create fails", async () => {
    const { client, maps, requests } = synonymMapService(["collision"]);

    await expect(createSynonymMaps(client, ["collision"])).rejects.toMatchObject({
      statusCode: 409,
    });

    assert.equal(maps.get("collision")?.synonyms, "original");
    assert.isFalse(requests.some((request) => request.method === "DELETE"));
  });

  it("attempts every owned deletion even when one fails", async () => {
    const { client, maps } = synonymMapService(
      ["js-first", "js-second", "python-map"],
      ["js-first"],
    );

    await expect(deleteSynonymMaps(client, ["js-first", "js-second"])).rejects.toMatchObject({
      statusCode: 503,
    });

    assert.sameMembers([...maps.keys()], ["js-first", "python-map"]);
  });
});
