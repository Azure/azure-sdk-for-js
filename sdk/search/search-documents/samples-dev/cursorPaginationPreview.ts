// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates August preview cursor pagination for the public list
 * surface that exposes a pager. `listIndexes` follows opaque continuation links
 * internally; callers provide initial search/page-size options once and consume
 * pages without parsing or reusing continuation state.
 *
 * The convenience methods for data sources, indexers, and skillsets return
 * complete arrays, so this sample intentionally does not claim cursor access
 * for those methods.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { KnownListingSearchType, SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const indexPrefix = "cursor-sample-";

function assertSample(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function main(): Promise<void> {
  if (!endpoint) {
    console.log("Set ENDPOINT before running this sample.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());
  const createdNames = [`${indexPrefix}one`, `${indexPrefix}two`];

  try {
    for (const name of createdNames) {
      await client.createIndex({
        name,
        fields: [{ name: "id", type: "Edm.String", key: true }],
      });
    }

    const seen = new Set<string>();
    const iterator = client.listIndexes({
      search: indexPrefix,
      searchType: KnownListingSearchType.Prefix,
      pageSize: 1,
    });

    // The next link is deliberately opaque and remains inside the SDK. Reusing
    // initial search/pageSize parameters with a continuation URL is unsupported.
    for await (const page of iterator.byPage()) {
      assertSample(page.length <= 1, "pageSize=1 should return at most one index per page");
      for (const index of page) {
        assertSample(!seen.has(index.name), `duplicate index ${index.name}`);
        seen.add(index.name);
        console.log(`Index page item: ${index.name}`);
      }
    }

    assertSample(
      createdNames.every((name) => seen.has(name)),
      "cursor iteration should complete without omissions",
    );
  } finally {
    for (const name of createdNames) {
      await client.deleteIndex(name).catch(() => {});
    }
  }
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
});
