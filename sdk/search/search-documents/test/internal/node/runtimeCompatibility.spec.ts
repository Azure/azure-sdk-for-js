// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  AzureKeyCredential,
  IndexDocumentsBatch,
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
} from "../../../src/index.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("key");
function transport(
  bodies: unknown[],
  status = 200,
): { requests: PipelineRequest[]; httpClient: HttpClient } {
  const requests: PipelineRequest[] = [];
  return {
    requests,
    httpClient: {
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        requests.push(request);
        return {
          request,
          status: request.method === "DELETE" ? 204 : status,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(bodies[Math.min(requests.length - 1, bodies.length - 1)]),
        };
      },
    },
  };
}
const body = (request: PipelineRequest): ReturnType<typeof JSON.parse> =>
  JSON.parse(String(request.body));
const index = { name: "idx", fields: [] };

describe("runtime compatibility", () => {
  it("preserves request headers, callbacks, cancellation, and generated serialization", async () => {
    const t = transport([{ value: [], "@odata.count": 0 }], 206);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    const controller = new AbortController();
    let responses = 0;
    const result = await client.search("hotel", {
      abortSignal: controller.signal,
      onResponse: () => {
        responses++;
      },
      requestOptions: { headers: { "x-test": "present" } },
      querySourceAuthorization: "assertion",
      enableElevatedRead: true,
      includeTotalCount: true,
      searchFields: ["description", "name"],
      select: ["id", "name"],
      orderBy: ["name asc"],
      highlightFields: "description,name",
      queryType: "semantic",
      semanticSearchOptions: {
        configurationName: "semantic",
        captions: { captionType: "extractive", highlight: false },
      },
    });
    assert.equal(responses, 1);
    assert.equal(result.count, 0);
    assert.equal(t.requests[0].abortSignal, controller.signal);
    assert.equal(t.requests[0].headers.get("x-test"), "present");
    assert.equal(t.requests[0].headers.get("api-key"), "key");
    assert.equal(t.requests[0].headers.get("x-ms-query-source-authorization"), "assertion");
    assert.equal(t.requests[0].headers.get("x-ms-enable-elevated-read"), "true");
    assert.deepEqual(body(t.requests[0]), {
      search: "hotel",
      count: true,
      searchFields: "description,name",
      select: "id,name",
      orderby: "name asc",
      highlight: "description,name",
      queryType: "semantic",
      semanticConfiguration: "semantic",
      captions: "extractive|highlight-false",
    });
  });

  it("does not mix options between concurrent searches", async () => {
    const t = transport([{ value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await Promise.all(
      ["first", "second"].map((filterOverride) =>
        client.search(undefined, {
          vectorSearchOptions: { queries: [{ kind: "vector", vector: [1, 2], filterOverride }] },
        }),
      ),
    );
    assert.deepEqual(
      t.requests.map((request) => body(request).vectorQueries[0].filterOverride).sort(),
      ["first", "second"],
    );
  });

  it("preserves vector and semantic compatibility options in continuation tokens", async () => {
    const next = {
      search: "hotel",
      skip: 1,
      semanticFields: "description",
      vectorQueries: [
        {
          kind: "text",
          text: "hotel",
          fields: "embedding",
          filterOverride: "tenant eq 'a'",
          perDocumentVectorLimit: 0,
        },
      ],
    };
    const continuation = {
      value: [],
      "@odata.nextLink": `${endpoint}/indexes('idx')/docs/search.post.search?api-version=2026-10-01`,
      "@search.nextPageParameters": next,
    };
    const t = transport([continuation, continuation, { value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    const result = await client.search("hotel");
    const firstPage = await result.results.byPage().next();
    const resumed = await client.search("different");
    await resumed.results.byPage({ continuationToken: firstPage.value.continuationToken }).next();
    assert.deepEqual(body(t.requests[3]), { ...next, select: "*" });
  });

  it("retains service errors in search and suggestion operations", async () => {
    const t = transport(
      [{ error: { code: "InvalidRequest", message: "Invalid search request" } }],
      400,
    );
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await expect(client.search("hotel")).rejects.toMatchObject({ statusCode: 400 });
    await expect(client.suggest("hotel", "sg")).rejects.toMatchObject({ statusCode: 400 });
  });

  for (const serviceVersion of ["2026-04-01", "2026-10-01"]) {
    it.each(["vector", "text"] as const)(
      `preserves explicit vector options on ${serviceVersion} (%s)`,
      async (kind) => {
        const t = transport([{ value: [] }]);
        const client = new SearchClient(endpoint, "idx", credential, {
          httpClient: t.httpClient,
          serviceVersion,
        });
        const query =
          kind === "vector"
            ? {
                kind,
                vector: [1, 2],
                fields: ["embedding"],
                filterOverride: "tenant eq 'a'",
                perDocumentVectorLimit: 0,
              }
            : {
                kind,
                text: "query",
                fields: ["embedding"],
                filterOverride: "tenant eq 'a'",
                perDocumentVectorLimit: 0,
              };
        await client.search("query", { vectorSearchOptions: { queries: [query] } });
        assert.equal(body(t.requests[0]).vectorQueries[0].filterOverride, "tenant eq 'a'");
        assert.equal(body(t.requests[0]).vectorQueries[0].perDocumentVectorLimit, 0);
        assert.include(t.requests[0].url, `api-version=${serviceVersion}`);
      },
    );
  }

  it("does not add unspecified compatibility options", async () => {
    const t = transport([{ value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await client.search("query", {
      vectorSearchOptions: { queries: [{ kind: "text", text: "query", fields: ["embedding"] }] },
    });
    assert.notProperty(body(t.requests[0]), "semanticFields");
    assert.notProperty(body(t.requests[0]).vectorQueries[0], "filterOverride");
    assert.notProperty(body(t.requests[0]).vectorQueries[0], "perDocumentVectorLimit");
  });

  it("preserves suggestion document fields and separates metadata", async () => {
    const t = transport([
      { value: [{ "@search.text": "suggestion", text: "document text", id: "1" }] },
    ]);
    const client = new SearchClient<{ id: string; text: string }>(endpoint, "idx", credential, {
      httpClient: t.httpClient,
    });
    const result = await client.suggest("sug", "sg");
    assert.equal(result.results[0].text, "suggestion");
    assert.deepEqual(result.results[0].document, { id: "1", text: "document text" });
  });

  it("maps index ETags and enforces conditional updates and deletes", async () => {
    const t = transport([{ ...index, "@odata.etag": '"index-etag"' }]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndex("idx");
    await client.createOrUpdateIndex(result, { onlyIfUnchanged: true });
    await client.deleteIndex(result, { onlyIfUnchanged: true });
    assert.equal(result.etag, '"index-etag"');
    assert.equal(t.requests[1].headers.get("if-match"), '"index-etag"');
    assert.equal(t.requests[2].headers.get("if-match"), '"index-etag"');
  });

  it("maps indexer ETags and enforces conditional updates and deletes", async () => {
    const t = transport([
      {
        name: "ixr",
        dataSourceName: "ds",
        targetIndexName: "idx",
        "@odata.etag": '"indexer-etag"',
      },
    ]);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndexer("ixr");
    await client.createOrUpdateIndexer(result, { onlyIfUnchanged: true });
    await client.deleteIndexer(result, { onlyIfUnchanged: true });
    assert.equal(result.etag, '"indexer-etag"');
    assert.equal(t.requests[1].headers.get("if-match"), '"indexer-etag"');
    assert.equal(t.requests[2].headers.get("if-match"), '"indexer-etag"');
  });

  it("maps skillset ETags and enforces conditional updates and deletes", async () => {
    const t = transport([{ name: "skills", skills: [], "@odata.etag": '"skillset-etag"' }]);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getSkillset("skills");
    await client.createOrUpdateSkillset(result, { onlyIfUnchanged: true });
    await client.deleteSkillset(result, { onlyIfUnchanged: true });
    assert.equal(result.etag, '"skillset-etag"');
    assert.equal(t.requests[1].headers.get("if-match"), '"skillset-etag"');
    assert.equal(t.requests[2].headers.get("if-match"), '"skillset-etag"');
  });

  it("round-trips custom analyzer tokenizer names", async () => {
    const t = transport([
      {
        ...index,
        analyzers: [
          {
            "@odata.type": "#Microsoft.Azure.Search.CustomAnalyzer",
            name: "custom",
            tokenizer: "standard_v2",
          },
        ],
      },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndex("idx");
    assert.equal(result.analyzers?.[0].odatatype, "#Microsoft.Azure.Search.CustomAnalyzer");
    await client.createOrUpdateIndex(result);
    assert.equal(body(t.requests[1]).analyzers[0].tokenizer, "standard_v2");
  });

  it("round-trips custom Web API vectorizer parameters", async () => {
    const t = transport([
      {
        ...index,
        vectorSearch: {
          vectorizers: [
            {
              kind: "customWebApi",
              name: "custom",
              customWebApiParameters: { uri: "https://example.com/vectorize", httpMethod: "POST" },
            },
          ],
        },
      },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndex("idx");
    await client.createOrUpdateIndex(result);
    assert.equal(
      body(t.requests[1]).vectorSearch.vectorizers[0].customWebApiParameters.uri,
      "https://example.com/vectorize",
    );
  });

  it("serializes vectorizer parameters from a newly constructed public model", async () => {
    const t = transport([index], 201);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    await client.createIndex({
      ...index,
      vectorSearch: {
        vectorizers: [
          {
            kind: "customWebApi",
            vectorizerName: "custom",
            parameters: {
              uri: "https://example.com/vectorize",
              httpMethod: "POST",
              timeout: "PT10S",
              httpHeaders: { "x-test": "value" },
              authResourceId: "resource",
              authIdentity: {
                odatatype: "#Microsoft.Azure.Search.DataUserAssignedIdentity",
                resourceId:
                  "/subscriptions/sub/resourceGroups/group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id",
              },
            },
          },
        ],
      },
    });
    const parameters = body(t.requests[0]).vectorSearch.vectorizers[0].customWebApiParameters;
    assert.equal(parameters.uri, "https://example.com/vectorize");
    assert.equal(parameters.timeout, "PT10S");
    assert.equal(parameters.httpHeaders["x-test"], "value");
    assert.equal(parameters.authResourceId, "resource");
    assert.equal(
      parameters.authIdentity["@odata.type"],
      "#Microsoft.Azure.Search.DataUserAssignedIdentity",
    );
  });

  it("serializes PII and Split aliases from newly constructed public models", async () => {
    const t = transport([{ name: "skills", skills: [] }], 201);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    await client.createSkillset({
      name: "skills",
      skills: [
        {
          odatatype: "#Microsoft.Skills.Text.PIIDetectionSkill",
          inputs: [],
          outputs: [],
          maskingMode: "replace",
          maskingCharacter: "#",
          categories: ["Person"],
        },
        {
          odatatype: "#Microsoft.Skills.Text.SplitSkill",
          inputs: [],
          outputs: [],
          maxPageLength: 1000,
        },
      ],
    });
    assert.equal(body(t.requests[0]).skills[0].maskingCharacter, "#");
    assert.deepEqual(body(t.requests[0]).skills[0].piiCategories, ["Person"]);
    assert.equal(body(t.requests[0]).skills[1].maximumPageLength, 1000);
  });

  it("round-trips PII and Split skill convenience aliases", async () => {
    const t = transport([
      {
        name: "skills",
        skills: [
          {
            "@odata.type": "#Microsoft.Skills.Text.PIIDetectionSkill",
            inputs: [],
            outputs: [],
            maskingMode: "replace",
            maskingCharacter: "#",
            piiCategories: ["Person"],
          },
          {
            "@odata.type": "#Microsoft.Skills.Text.SplitSkill",
            inputs: [],
            outputs: [],
            maximumPageLength: 1000,
          },
        ],
      },
    ]);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getSkillset("skills");
    const pii = result.skills[0];
    const split = result.skills[1];
    assert.equal(pii.odatatype, "#Microsoft.Skills.Text.PIIDetectionSkill");
    if (pii.odatatype === "#Microsoft.Skills.Text.PIIDetectionSkill") {
      assert.equal(pii.maskingCharacter, "#");
      assert.deepEqual(pii.categories, ["Person"]);
    }
    if (split.odatatype === "#Microsoft.Skills.Text.SplitSkill") {
      assert.equal(split.maxPageLength, 1000);
    }
    await client.createOrUpdateSkillset(result);
    assert.equal(body(t.requests[1]).skills[0].maskingCharacter, "#");
    assert.deepEqual(body(t.requests[1]).skills[0].piiCategories, ["Person"]);
    assert.equal(body(t.requests[1]).skills[1].maximumPageLength, 1000);
  });

  it("preserves continuation tokens on mapped resource pages", async () => {
    const next = `${endpoint}/indexes?$skiptoken=second`;
    const t = transport([
      { value: [index], "@odata.nextLink": next },
      { value: [{ name: "second", fields: [] }] },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const first = await client.listIndexes().byPage().next();
    assert.equal(first.value.continuationToken, next);
    const second = await client
      .listIndexes()
      .byPage({ continuationToken: first.value.continuationToken })
      .next();
    assert.equal(second.value[0].name, "second");
    assert.isUndefined(second.value.continuationToken);
    assert.include(t.requests[1].url, "$skiptoken=second");
  });

  it.each(["documents", "keys"])(
    "forwards deleteDocuments %s overload options",
    async (overload) => {
      const t = transport([{ value: [] }]);
      const client = new SearchClient<{ id: string }>(endpoint, "idx", credential, {
        httpClient: t.httpClient,
      });
      const controller = new AbortController();
      const options = {
        abortSignal: controller.signal,
        requestOptions: { headers: { "x-test": "present" } },
      };
      if (overload === "documents") await client.deleteDocuments([{ id: "1" }], options);
      else await client.deleteDocuments("id", ["1"], options);
      assert.equal(t.requests[0].abortSignal, controller.signal);
      assert.equal(t.requests[0].headers.get("x-test"), "present");
    },
  );

  it("round-trips dynamic and known indexer configuration properties", async () => {
    const configuration = { customSetting: "enabled", parsingMode: "json", refreshAllAcls: true };
    const t = transport([
      { name: "ixr", dataSourceName: "ds", targetIndexName: "idx", parameters: { configuration } },
    ]);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndexer("ixr");
    assert.equal(result.parameters?.configuration?.customSetting, "enabled");
    await client.createOrUpdateIndexer(result);
    assert.deepEqual(body(t.requests[1]).parameters.configuration, configuration);
  });

  it("preserves full search continuation parameters when resuming", async () => {
    const next = `${endpoint}/indexes('idx')/docs/search.post.search?api-version=2026-10-01`;
    const continuation = {
      value: [],
      "@odata.nextLink": next,
      "@search.nextPageParameters": {
        search: "hotel",
        select: "id",
        searchFields: "description",
        count: true,
        skip: 1,
        top: 1,
      },
    };
    const t = transport([continuation, continuation, { value: [] }]);
    const client = new SearchClient<{ id: string; description: string }>(
      endpoint,
      "idx",
      credential,
      { httpClient: t.httpClient },
    );
    const result = await client.search("hotel", {
      select: ["id"],
      searchFields: ["description"],
      includeTotalCount: true,
    });
    const firstPage = await result.results.byPage().next();
    assert.exists(firstPage.value.continuationToken);
    const resumed = await client.search("different");
    await resumed.results.byPage({ continuationToken: firstPage.value.continuationToken }).next();
    assert.deepEqual(body(t.requests[3]), continuation["@search.nextPageParameters"]);
  });

  it("preserves explicitly supplied semanticFields", async () => {
    const t = transport([{ value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await client.search("hotel", {
      queryType: "semantic",
      semanticSearchOptions: { semanticFields: ["description"] },
    });
    assert.equal(body(t.requests[0]).semanticFields, "description");
  });

  it("preserves a zero semantic answer threshold", async () => {
    const t = transport([{ value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await client.search("hotel", {
      queryType: "semantic",
      semanticSearchOptions: { answers: { answerType: "extractive", threshold: 0 } },
    });
    assert.equal(body(t.requests[0]).answers, "extractive|threshold-0");
  });

  it("forwards partial indexing failure handling through the deletion overload", async () => {
    const t = transport(
      [{ value: [{ key: "1", status: false, statusCode: 400, errorMessage: "bad document" }] }],
      207,
    );
    const client = new SearchClient<{ id: string }>(endpoint, "idx", credential, {
      httpClient: t.httpClient,
    });
    await expect(
      client.deleteDocuments([{ id: "1" }], { throwOnAnyFailure: true }),
    ).rejects.toMatchObject({ results: [{ succeeded: false }] });
    const batch = new IndexDocumentsBatch<{ id: string }>();
    batch.upload([{ id: "1" }]);
    await expect(client.indexDocuments(batch, { throwOnAnyFailure: true })).rejects.toMatchObject({
      results: [{ succeeded: false }],
    });
  });
});
