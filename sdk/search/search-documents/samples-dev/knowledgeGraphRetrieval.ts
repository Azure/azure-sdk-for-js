// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a small edge-list knowledge graph, plan and execute a constrained
 * graph query, and inspect provenance, statistics, and structured planning errors.
 *
 * Set ENDPOINT. Authenticate with DefaultAzureCredential or AZURE_SEARCH_API_KEY.
 * Requires graph-query support on the Search service. No model deployment is needed.
 * Only the uniquely named index created by this run is removed.
 */

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
import type { GraphFieldMappings, GraphQueryError, SearchField } from "@azure/search-documents";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  assert(endpoint, "Set ENDPOINT.");
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const indexName = `sample-graph-${randomUUID()}`;
  const mappings: GraphFieldMappings = {
    assertionIdField: "id",
    factIdField: "factId",
    subjectField: "subject",
    predicateField: "predicate",
    objectField: "object",
    objectStringField: "objectString",
    objectDoubleField: "objectDouble",
    objectBoolField: "objectBool",
    objectDateTimeField: "objectDateTime",
    subjectTypeField: "subjectType",
    subjectIdField: "subjectId",
    objectTypeField: "objectType",
    objectIdField: "objectId",
    confidenceField: "confidence",
    subjectConfidenceField: "subjectConfidence",
    predicateConfidenceField: "predicateConfidence",
    objectConfidenceField: "objectConfidence",
    sourceChunkIdField: "sourceChunkId",
    sourceParentIdField: "sourceParentId",
    graphNameField: "graphName",
    subjectIdDisplayNameField: "subjectDisplayName",
    objectIdDisplayNameField: "objectDisplayName",
  };
  const numbers = new Set([
    "objectDouble",
    "confidence",
    "subjectConfidence",
    "predicateConfidence",
    "objectConfidence",
  ]);
  const fields: SearchField[] = Object.values(mappings).map((name) => ({
    name,
    type: numbers.has(name)
      ? "Edm.Double"
      : name === "objectBool"
        ? "Edm.Boolean"
        : name === "objectDateTime"
          ? "Edm.DateTimeOffset"
          : "Edm.String",
    key: name === "id",
    filterable: true,
    facetable: name !== "objectBool" && name !== "objectDateTime",
    sortable: true,
  }));
  let created = false;
  try {
    await client.createIndex({
      name: indexName,
      fields,
      graphProfile: { kind: "edgeList", fields: mappings },
    });
    created = true;
    const graph = client.getSearchClient(indexName);
    await graph.uploadDocuments(
      [
        {
          id: "assertion-1",
          factId: "fact-1",
          subject: "Ada Lovelace",
          predicate: "studied",
          object: "Computing",
          objectString: "Computing",
          subjectType: "Person",
          subjectId: "ada",
          objectType: "Topic",
          objectId: "computing",
          confidence: 1,
          subjectConfidence: 1,
          predicateConfidence: 1,
          objectConfidence: 1,
          sourceChunkId: "chunk-1",
          sourceParentId: "biography-1",
          graphName: "facts",
          subjectDisplayName: "Ada Lovelace",
          objectDisplayName: "Computing",
        },
      ],
      { throwOnAnyFailure: true },
    );
    for (let attempt = 0; ; attempt++) {
      if ((await graph.getDocumentsCount()) === 1) break;
      assert(attempt < 30, "Timed out waiting for the graph assertion.");
      await delay(1000);
    }

    // Labels and relationship types bound the query; LIMIT alone does not make an unconstrained query valid.
    const query = "MATCH (s:Person)-[r:studied]->(o:Topic) RETURN s, r, o LIMIT 5";
    const planned = await graph.graph(query, {
      executionMode: "planOnly",
      explain: ["logicalPlan"],
      includeDiagnostics: true,
    });
    console.log("Plan:", planned.explain, planned.diagnostics);
    const executed = await graph.graph(query, {
      executionMode: "execute",
      includeStatistics: true,
      includeDiagnostics: true,
      provenance: { kind: "ids" },
    });
    assert(executed.value.length, "The constrained query must find the uploaded assertion.");
    assert(executed.statistics, "Execution statistics must be returned.");
    for (const row of executed.value) {
      console.log("Graph row:", row.additionalProperties, row.provenance);
    }
    console.log("Statistics:", executed.statistics, executed.diagnostics);

    try {
      await graph.graph("MATCH (s)-[r]->(o) RETURN s, r, o LIMIT 5", { includeDiagnostics: true });
      assert.fail("An unconstrained graph query should be rejected.");
    } catch (error) {
      const failure = error as { statusCode?: number; details?: GraphQueryError };
      assert.equal(failure.statusCode, 400);
      assert(
        failure.details?.diagnostics?.some((d) => d.severity === "error" && d.phase === "planning"),
      );
      console.log("Expected planning diagnostics:", failure.details?.diagnostics);
    }
  } finally {
    if (created) await client.deleteIndex(indexName);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
