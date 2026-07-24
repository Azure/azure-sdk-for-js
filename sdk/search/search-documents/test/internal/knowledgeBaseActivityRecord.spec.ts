// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import {
  knowledgeBaseActivityRecordUnionDeserializer,
  type KnowledgeBaseSearchIndexActivityRecord,
  type KnowledgeBaseAzureBlobActivityRecord,
  type KnowledgeBaseIndexedOneLakeActivityRecord,
  type KnowledgeBaseWebActivityRecord,
} from "../../src/models/azure/search/documents/knowledgeBases/models.js";

describe("knowledgeBaseActivityRecordUnionDeserializer", () => {
  it("deserializes a searchIndex activity record", () => {
    const record = knowledgeBaseActivityRecordUnionDeserializer({
      id: 1,
      type: "searchIndex",
      elapsedMs: 42,
      knowledgeSourceName: "my-source",
      queryTime: "2026-04-01T00:00:00Z",
      count: 3,
      searchIndexArguments: {
        search: "luxury hotels",
        filter: "rating gt 4",
        semanticConfigurationName: "default",
        sourceDataFields: [{ name: "content" }],
        searchFields: [{ name: "content" }],
      },
    }) as KnowledgeBaseSearchIndexActivityRecord;

    assert.strictEqual(record.type, "searchIndex");
    assert.strictEqual(record.id, 1);
    assert.strictEqual(record.elapsedMs, 42);
    assert.strictEqual(record.knowledgeSourceName, "my-source");
    assert.instanceOf(record.queryTime, Date);
    assert.strictEqual(record.count, 3);
    assert.strictEqual(record.searchIndexArguments?.search, "luxury hotels");
    assert.strictEqual(record.searchIndexArguments?.semanticConfigurationName, "default");
    assert.strictEqual(record.searchIndexArguments?.sourceDataFields?.[0]?.name, "content");
  });

  it("deserializes an azureBlob activity record", () => {
    const record = knowledgeBaseActivityRecordUnionDeserializer({
      id: 2,
      type: "azureBlob",
      elapsedMs: 10,
      knowledgeSourceName: "blob-source",
      count: 1,
      azureBlobArguments: { search: "invoices" },
    }) as KnowledgeBaseAzureBlobActivityRecord;

    assert.strictEqual(record.type, "azureBlob");
    assert.strictEqual(record.elapsedMs, 10);
    assert.strictEqual(record.azureBlobArguments?.search, "invoices");
  });

  it("deserializes an indexedOneLake activity record", () => {
    const record = knowledgeBaseActivityRecordUnionDeserializer({
      id: 3,
      type: "indexedOneLake",
      elapsedMs: 5,
      indexedOneLakeArguments: { search: "reports" },
    }) as KnowledgeBaseIndexedOneLakeActivityRecord;

    assert.strictEqual(record.type, "indexedOneLake");
    assert.strictEqual(record.indexedOneLakeArguments?.search, "reports");
  });

  it("deserializes a web activity record", () => {
    const record = knowledgeBaseActivityRecordUnionDeserializer({
      id: 4,
      type: "web",
      elapsedMs: 7,
      webArguments: {
        search: "weather",
        language: "en",
        market: "en-US",
        count: 5,
        freshness: "Day",
      },
    }) as KnowledgeBaseWebActivityRecord;

    assert.strictEqual(record.type, "web");
    assert.strictEqual(record.webArguments?.language, "en");
    assert.strictEqual(record.webArguments?.market, "en-US");
    assert.strictEqual(record.webArguments?.count, 5);
  });
});
