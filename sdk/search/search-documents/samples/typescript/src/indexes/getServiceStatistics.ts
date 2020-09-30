// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexClient,
  AzureKeyCredential
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

export async function main() {
  console.log(`Running Get Service Statistics Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const {counters, limits} = await client.getServiceStatistics();
  console.log(`Counters`);
  console.log(`========`);
  console.log(`\tDocument Counter`);
  console.log(`\t\tUsage: ${counters.documentCounter.usage}`);
  console.log(`\t\tQuota: ${counters.documentCounter.quota}`);
  console.log(`\tIndex Counter`);
  console.log(`\t\tUsage: ${counters.indexCounter.usage}`);
  console.log(`\t\tQuota: ${counters.indexCounter.quota}`);
  console.log(`\tIndexer Counter`);
  console.log(`\t\tUsage: ${counters.indexerCounter.usage}`);
  console.log(`\t\tQuota: ${counters.indexerCounter.quota}`);
  console.log(`\tData Source Counter`);
  console.log(`\t\tUsage: ${counters.dataSourceCounter.usage}`);
  console.log(`\t\tQuota: ${counters.dataSourceCounter.quota}`);
  console.log(`\tStorage Size Counter`);
  console.log(`\t\tUsage: ${counters.storageSizeCounter.usage}`);
  console.log(`\t\tQuota: ${counters.storageSizeCounter.quota}`);
  console.log(`\tSynonym Map Counter`);
  console.log(`\t\tUsage: ${counters.synonymMapCounter.usage}`);
  console.log(`\t\tQuota: ${counters.synonymMapCounter.quota}`);
  console.log();
  console.log(`Limits`);
  console.log(`======`);
  console.log(`\tMax Fields Per Index: ${limits.maxFieldsPerIndex}`);
  console.log(`\tMax Field Nesting Depth Per Index: ${limits.maxFieldNestingDepthPerIndex}`);
  console.log(`\tMax Complex Collection Fields Per Index: ${limits.maxComplexCollectionFieldsPerIndex}`);
  console.log(`\tMax Complex Objects In Collections Per Document: ${limits.maxComplexObjectsInCollectionsPerDocument}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
