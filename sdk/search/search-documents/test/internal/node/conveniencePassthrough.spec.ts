// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, expect, it } from "vitest";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type {
  AzureBlobKnowledgeSource,
  FileKnowledgeSource,
  IndexedOneLakeKnowledgeSource,
  IndexedSharePointKnowledgeSource,
  IndexedSqlKnowledgeSource,
  McpServerKnowledgeSource,
} from "../../../src/index.js";
import { AzureKeyCredential, KnowledgeRetrievalClient } from "../../../src/index.js";
import { SearchIndexClient } from "../../../src/searchIndexClient.js";
import { SearchIndexerClient } from "../../../src/searchIndexerClient.js";

function captureClient(
  body: unknown,
  captured: PipelineRequest[],
  status = 200,
): SearchIndexClient {
  return new SearchIndexClient("https://example.search.windows.net", new AzureKeyCredential("k"), {
    additionalPolicies: [
      {
        position: "perCall",
        policy: {
          name: "capture",
          async sendRequest(request): Promise<PipelineResponse> {
            captured.push(request);
            return {
              request,
              status,
              headers: request.headers,
              bodyAsText: JSON.stringify(body),
            } as unknown as PipelineResponse;
          },
        },
      },
    ],
  });
}

function captureIndexerClient(
  body: unknown,
  captured: PipelineRequest[],
  status = 200,
): SearchIndexerClient {
  return new SearchIndexerClient(
    "https://example.search.windows.net",
    new AzureKeyCredential("k"),
    {
      additionalPolicies: [
        {
          position: "perCall",
          policy: {
            name: "capture",
            async sendRequest(request): Promise<PipelineResponse> {
              captured.push(request);
              return {
                request,
                status,
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

describe("convenience layer carries generated fields", () => {
  it("forwards Search and Work IQ authorization separately", async () => {
    const captured: PipelineRequest[] = [];
    const client = new KnowledgeRetrievalClient(
      "https://example.search.windows.net",
      "knowledge-base",
      new AzureKeyCredential("k"),
      {
        additionalPolicies: [
          {
            position: "perCall",
            policy: {
              name: "capture",
              async sendRequest(request): Promise<PipelineResponse> {
                captured.push(request);
                return {
                  request,
                  status: 200,
                  headers: request.headers,
                  bodyAsText: JSON.stringify({ response: [] }),
                } as unknown as PipelineResponse;
              },
            },
          },
        ],
      },
    );

    await client.retrieve(
      {
        intents: [{ type: "semantic", search: "status" }],
        knowledgeSourceParams: [
          {
            kind: "searchIndex",
            knowledgeSourceName: "source",
            neverQuerySource: true,
            resultsProcessing: "none",
            queryHintOverrides: {
              filters: [{ field: "category", fieldValues: ["manual"] }],
            },
          },
        ],
      },
      {
        querySourceAuthorization: "search-assertion",
        queryWorkIQSourceAuthorization: "work-iq-assertion",
      },
    );

    assert.equal(captured[0].headers.get("x-ms-query-source-authorization"), "search-assertion");
    assert.equal(
      captured[0].headers.get("x-ms-query-work-iq-source-authorization"),
      "work-iq-assertion",
    );
    const requestBody = JSON.parse(captured[0].body as string);
    assert.equal(requestBody.knowledgeSourceParams[0].neverQuerySource, true);
    assert.equal(requestBody.knowledgeSourceParams[0].resultsProcessing, "none");
    assert.equal(
      requestBody.knowledgeSourceParams[0].queryHintOverrides.filters[0].field,
      "category",
    );
  });

  it("forwards listing parameters to the request", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient({ value: [] }, captured);

    for await (const _ of client.listIndexes({
      search: "prod",
      pageSize: 5,
      searchType: "prefix",
    })) {
      /* drain */
    }

    const url = captured[0].url;
    assert.include(url, "search=prod");
    assert.include(url, "pageSize=5");
    assert.include(url, "searchType=prefix");
    assert.include(url, "api-version=2026-08-01-preview");
  });

  it("forwards listing parameters for synonym maps, indexers, data sources, and skillsets", async () => {
    const indexRequests: PipelineRequest[] = [];
    const indexClient = captureClient({ value: [] }, indexRequests);
    const indexerRequests: PipelineRequest[] = [];
    const indexerClient = captureIndexerClient({ value: [] }, indexerRequests);
    const options = { search: "prod", pageSize: 2, searchType: "prefix" as const };

    await indexClient.listSynonymMaps(options);
    await indexerClient.listIndexers(options);
    await indexerClient.listDataSourceConnections(options);
    await indexerClient.listSkillsets(options);

    for (const request of [...indexRequests, ...indexerRequests]) {
      assert.include(request.url, "search=prod");
      assert.include(request.url, "pageSize=2");
      assert.include(request.url, "searchType=prefix");
      assert.include(request.url, "api-version=2026-08-01-preview");
    }
  });

  it("forwards data source document IDs when resetting documents", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureIndexerClient(undefined, captured, 204);

    await client.resetDocuments("hotels-indexer", {
      dataSourceDocumentIds: ["source-document-1", "source-document-2"],
      overwrite: true,
    });

    assert.deepEqual(JSON.parse(captured[0].body as string), {
      datasourceDocumentIds: ["source-document-1", "source-document-2"],
    });
    assert.include(captured[0].url, "overwrite=true");
  });

  it("forwards multipart file upload and update parameters", async () => {
    const uploadRequests: PipelineRequest[] = [];
    const uploadClient = captureClient(
      { fileId: "file-1", fileName: "updated.txt" },
      uploadRequests,
      201,
    );
    const updateRequests: PipelineRequest[] = [];
    const updateClient = captureClient(
      { fileId: "file-1", fileName: "updated.txt" },
      updateRequests,
    );
    const body = {
      metadata: { fileName: "updated.txt", metadata: { category: "docs" } },
      content: new Uint8Array([1, 2, 3]),
    };

    await uploadClient.uploadKnowledgeSourceFileMultipart("source", body);
    await updateClient.updateKnowledgeSourceFile("source", "file-1", body);

    assert.equal(uploadRequests[0].method, "POST");
    assert.include(uploadRequests[0].url, "knowledgesources('source')/files");
    assert.match(uploadRequests[0].headers.get("content-type") ?? "", /^multipart\/form-data/);
    const uploadParts = uploadRequests[0].multipartBody?.parts ?? [];
    assert.deepEqual(
      uploadParts.map(
        (part) => part.headers.get("content-disposition")?.match(/name="([^"]+)"/)?.[1],
      ),
      ["metadata", "content"],
    );
    assert.deepInclude(JSON.parse(new TextDecoder().decode(uploadParts[0].body as Uint8Array)), {
      fileName: "updated.txt",
      metadata: { category: "docs" },
    });
    assert.equal(updateRequests[0].method, "PUT");
    assert.include(updateRequests[0].url, "knowledgesources('source')/files('file-1')");
    assert.match(updateRequests[0].headers.get("content-type") ?? "", /^multipart\/form-data/);
  });

  it("rejects multipart file requests missing required metadata", async () => {
    const client = captureClient({}, [], 201);
    await expect(
      client.uploadKnowledgeSourceFileMultipart("source", {
        content: new Uint8Array([1]),
      } as never),
    ).rejects.toThrow();
  });

  it("forwards File knowledge source list filters and page size", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient({ value: [] }, captured);

    for await (const _ of client.listKnowledgeSourceFiles("source", {
      prefix: "manuals/",
      search: "manual",
      pageSize: 1,
      searchType: "prefix",
    })) {
      // Drain the iterator so the request is sent.
    }

    assert.include(captured[0].url, "prefix=manuals%2F");
    assert.include(captured[0].url, "search=manual");
    assert.include(captured[0].url, "pageSize=1");
    assert.include(captured[0].url, "searchType=prefix");
  });

  it("round-trips resultsProcessing on a knowledge source", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient(
      {
        name: "ks",
        kind: "searchIndex",
        resultsProcessing: "none",
        searchIndexParameters: { searchIndexName: "idx" },
      },
      captured,
      201,
    );

    const created = await client.createKnowledgeSource({
      name: "ks",
      kind: "searchIndex",
      resultsProcessing: "none",
      searchIndexParameters: { searchIndexName: "idx" },
    });

    assert.equal(JSON.parse(captured[0].body as string).resultsProcessing, "none");
    assert.equal(created.resultsProcessing, "none");
  });

  it("maps knowledge source ETags and forwards conditional updates", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient(
      {
        name: "ks",
        kind: "searchIndex",
        "@odata.etag": "etag-1",
        searchIndexParameters: { searchIndexName: "idx" },
      },
      captured,
    );

    const updated = await client.createOrUpdateKnowledgeSource(
      {
        name: "ks",
        kind: "searchIndex",
        etag: "etag-1",
        searchIndexParameters: { searchIndexName: "idx" },
      },
      { onlyIfUnchanged: true },
    );

    assert.equal(captured[0].headers.get("if-match"), "etag-1");
    assert.equal(updated.etag, "etag-1");
  });

  it("round-trips retrieveDefaults on a knowledge base", async () => {
    const captured: PipelineRequest[] = [];
    const retrieveDefaults = { maxOutputSizeInTokens: 4096 };
    const tags = { environment: "sample", owner: "search-team" };
    const client = captureClient(
      { name: "kb", knowledgeSources: [], retrieveDefaults, tags },
      captured,
      201,
    );

    const created = await client.createKnowledgeBase({
      name: "kb",
      knowledgeSources: [],
      retrieveDefaults,
      tags,
    });

    assert.equal(
      JSON.parse(captured[0].body as string).retrieveDefaults.maxOutputSizeInTokens,
      4096,
    );
    assert.equal(created.retrieveDefaults?.maxOutputSizeInTokens, 4096);
    assert.deepEqual(JSON.parse(captured[0].body as string).tags, tags);
    assert.deepEqual(created.tags, tags);
  });

  it("surfaces the per-index vector size service limit", async () => {
    const client = captureClient(
      {
        counters: {
          aliasesCount: { usage: 0, quota: 1 },
          documentCount: { usage: 0, quota: 1 },
          indexesCount: { usage: 0, quota: 1 },
          indexersCount: { usage: 0, quota: 1 },
          dataSourcesCount: { usage: 0, quota: 1 },
          storageSize: { usage: 0, quota: 1 },
          synonymMaps: { usage: 0, quota: 1 },
          skillsetCount: { usage: 0, quota: 1 },
          vectorIndexSize: { usage: 0, quota: 1 },
          knowledgeBasesCount: { usage: 0, quota: 1 },
          knowledgeSourcesCount: { usage: 0, quota: 1 },
        },
        limits: { maxVectorIndexSizePerIndexInBytes: 1024 },
        indexersRuntime: {
          beginningTime: "2026-08-01T00:00:00Z",
          endingTime: "2026-08-01T01:00:00Z",
          usedSeconds: 0,
        },
      },
      [],
    );

    const statistics = await client.getServiceStatistics();
    assert.equal(statistics.limits.maxVectorIndexSizePerIndexInBytes, 1024);
  });

  it("round-trips workIQParameters on a WorkIQ knowledge source", async () => {
    const captured: PipelineRequest[] = [];
    const workIQParameters = {
      entraAppAuthentication: {
        applicationId: "app",
        federatedCredentialId: "cred",
        tenantId: "tenant",
      },
    };
    const client = captureClient({ name: "wiq", kind: "workIQ", workIQParameters }, captured, 201);

    const created = await client.createKnowledgeSource({
      name: "wiq",
      kind: "workIQ",
      workIQParameters,
    });

    assert.deepEqual(JSON.parse(captured[0].body as string).workIQParameters, workIQParameters);
    assert.deepEqual(
      (created as { workIQParameters?: unknown }).workIQParameters,
      workIQParameters,
    );
  });

  it("maps MCP serverUrl to the generated serverURL property", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient(
      {
        name: "mcp",
        kind: "mcpServer",
        mcpServerParameters: { serverURL: "https://example.com/mcp", tools: [] },
      },
      captured,
      201,
    );

    const created = await client.createKnowledgeSource({
      name: "mcp",
      kind: "mcpServer",
      mcpServerParameters: { serverUrl: "https://example.com/mcp", tools: [] },
    });

    assert.equal(
      JSON.parse(captured[0].body as string).mcpServerParameters.serverURL,
      "https://example.com/mcp",
    );
    assert.equal(
      (created as McpServerKnowledgeSource).mcpServerParameters.serverUrl,
      "https://example.com/mcp",
    );
  });

  it("round-trips private Azure Blob ingestion settings", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient(
      {
        name: "blob-source",
        kind: "azureBlob",
        azureBlobParameters: {
          connectionString: "ResourceId=/subscriptions/example",
          containerName: "documents",
          ingestionParameters: { networkAccessMode: "private" },
          createdResources: { indexer: "generated-indexer" },
        },
      },
      captured,
      201,
    );

    const created = await client.createKnowledgeSource({
      name: "blob-source",
      kind: "azureBlob",
      azureBlobParameters: {
        connectionString: "ResourceId=/subscriptions/example",
        containerName: "documents",
        ingestionParameters: { networkAccessMode: "private" },
      },
    });
    const createdBlob = created as AzureBlobKnowledgeSource;

    assert.equal(
      JSON.parse(captured[0].body as string).azureBlobParameters.ingestionParameters
        .networkAccessMode,
      "private",
    );
    assert.equal(createdBlob.azureBlobParameters.ingestionParameters?.networkAccessMode, "private");
    assert.equal(createdBlob.azureBlobParameters.createdResources?.indexer, "generated-indexer");
  });

  it("preserves indexed knowledge source hints, ingestion settings, and created resources", async () => {
    const queryHints = { filters: [{ field: "category", fieldValues: ["manual"] }] };
    const ingestionParameters = { networkAccessMode: "private" as const };
    const cases = [
      {
        body: {
          name: "sharepoint",
          kind: "indexedSharePoint",
          indexedSharePointParameters: {
            connectionString: "ResourceId=/subscriptions/example",
            containerName: "defaultSiteLibrary",
            ingestionParameters,
            queryHints,
            createdResources: { indexer: "sharepoint-indexer" },
          },
        },
        input: {
          name: "sharepoint",
          kind: "indexedSharePoint" as const,
          indexedSharePointParameters: {
            connectionString: "ResourceId=/subscriptions/example",
            containerName: "defaultSiteLibrary" as const,
            ingestionParameters,
            queryHints,
          },
        },
      },
      {
        body: {
          name: "onelake",
          kind: "indexedOneLake",
          indexedOneLakeParameters: {
            fabricWorkspaceId: "workspace",
            lakehouseId: "lakehouse",
            ingestionParameters,
            queryHints,
            createdResources: { indexer: "onelake-indexer" },
          },
        },
        input: {
          name: "onelake",
          kind: "indexedOneLake" as const,
          indexedOneLakeParameters: {
            fabricWorkspaceId: "workspace",
            lakehouseId: "lakehouse",
            ingestionParameters,
            queryHints,
          },
        },
      },
      {
        body: {
          name: "sql",
          kind: "indexedSql",
          indexedSqlParameters: {
            connectionString: "ResourceId=/subscriptions/example",
            tableOrView: "dbo.Documents",
            ingestionParameters,
            queryHints,
            createdResources: { indexer: "sql-indexer" },
          },
        },
        input: {
          name: "sql",
          kind: "indexedSql" as const,
          indexedSqlParameters: {
            connectionString: "ResourceId=/subscriptions/example",
            tableOrView: "dbo.Documents",
            ingestionParameters,
            queryHints,
          },
        },
      },
      {
        body: {
          name: "file",
          kind: "file",
          fileParameters: {
            ingestionParameters,
            queryHints,
            createdResources: { indexer: "file-indexer" },
          },
        },
        input: {
          name: "file",
          kind: "file" as const,
          fileParameters: { ingestionParameters, queryHints },
        },
      },
    ];

    for (const testCase of cases) {
      const client = captureClient(testCase.body, [], 201);
      const created = await client.createKnowledgeSource(testCase.input);
      const parameters =
        created.kind === "indexedSharePoint"
          ? (created as IndexedSharePointKnowledgeSource).indexedSharePointParameters
          : created.kind === "indexedOneLake"
            ? (created as IndexedOneLakeKnowledgeSource).indexedOneLakeParameters
            : created.kind === "indexedSql"
              ? (created as IndexedSqlKnowledgeSource).indexedSqlParameters
              : (created as FileKnowledgeSource).fileParameters;

      assert.equal(parameters.ingestionParameters?.networkAccessMode, "private");
      assert.equal(parameters.queryHints?.filters?.[0]?.field, "category");
      assert.match(parameters.createdResources?.indexer ?? "", /-indexer$/);
    }
  });
});
