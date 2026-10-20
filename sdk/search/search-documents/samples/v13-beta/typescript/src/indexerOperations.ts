// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates indexer operations, including automatic permission refresh
 * for ADLS Gen2 data sources in the `2026-10-01` GA API.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { SearchIndexer, SearchIndexerStatus } from "@azure/search-documents";
import { SearchIndexerClient } from "@azure/search-documents";
import "dotenv/config";

const endpoint = process.env.ENDPOINT || "";
const dataSourceName = process.env.DATA_SOURCE_NAME || "";
const targetIndexName = process.env.TARGET_INDEX_NAME || "";

const TEST_INDEXER_NAME = "example-indexer-sample-1";

async function createIndexer(indexerName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Creating Indexer Operation`);
  const dataSource = await client.getDataSourceConnection(dataSourceName);
  const indexer: SearchIndexer = {
    name: indexerName,
    description: "Description for Sample Indexer",
    dataSourceName,
    targetIndexName,
    isDisabled: false,
    parameters:
      dataSource.type === "adlsgen2" ? { configuration: { refreshAllAcls: true } } : undefined,
  };
  await client.createIndexer(indexer);
}

async function getAndUpdateIndexer(
  indexerName: string,
  client: SearchIndexerClient,
): Promise<void> {
  console.log(`Get And Update Indexer Operation`);
  const indexer: SearchIndexer = await client.getIndexer(indexerName);
  indexer.isDisabled = true;
  await client.createOrUpdateIndexer(indexer);
  indexer.isDisabled = false;
  await client.createOrUpdateIndexer(indexer);
}

async function getIndexerStatus(indexerName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Get Indexer Status Operation`);
  const indexerStatus: SearchIndexerStatus = await client.getIndexerStatus(indexerName);
  console.log(`Status: ${indexerStatus.status}`);
  console.log(`Limits`);
  console.log(`******`);
  console.log(
    `MaxDocumentContentCharactersToExtract: ${indexerStatus.limits.maxDocumentContentCharactersToExtract}`,
  );
  console.log(`MaxDocumentExtractionSize: ${indexerStatus.limits.maxDocumentExtractionSize}`);
  console.log(`MaxRunTime: ${indexerStatus.limits.maxRunTime}`);
  if (indexerStatus.runtime) {
    console.log(`Indexer runtime used: ${indexerStatus.runtime.usedSeconds} seconds`);
    console.log(`Indexer runtime remaining: ${indexerStatus.runtime.remainingSeconds} seconds`);
  }
  const indexer = await client.getIndexer(indexerName);
  console.log(
    `Refresh unchanged ADLS permissions: ${indexer.parameters?.configuration?.refreshAllAcls}`,
  );
}

async function listIndexers(client: SearchIndexerClient): Promise<void> {
  console.log(`List Indexers Operation`);
  const listOfIndexers: Array<SearchIndexer> = await client.listIndexers();

  console.log(`\tList of Indexers`);
  console.log(`\t****************`);
  for (const indexer of listOfIndexers) {
    const { schedule, parameters } = indexer;
    console.log(`Name: ${indexer.name}`);
    console.log(`Description: ${indexer.description}`);
    console.log(`Data Source Name: ${indexer.dataSourceName}`);
    console.log(`Skillset Name: ${indexer.skillsetName}`);
    console.log(`Target Index Name: ${indexer.targetIndexName}`);
    console.log(`Indexing Schedule`);
    console.log(`\tInterval: ${schedule && schedule.interval}`);
    console.log(`\tStart Time: ${schedule && schedule.startTime}`);
    console.log(`Is Disabled: ${indexer.isDisabled}`);
    console.log(`ETag: ${indexer.etag}`);
    console.log(`Parameters`);
    console.log(`\tBatch Size: ${parameters && parameters.batchSize}`);
    console.log(`\tMax Failed Items: ${parameters && parameters.maxFailedItems}`);
    console.log(`\tMax Failed Items Per Batch: ${parameters && parameters.maxFailedItemsPerBatch}`);
    console.log();
  }
}

async function resetIndexer(indexerName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Reset Indexer Operation`);
  await client.resetIndexer(indexerName);
}

async function deleteIndexer(indexerName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Deleting Indexer Operation`);
  await client.deleteIndexer(indexerName);
}

async function runIndexer(indexerName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Run Indexer Operation`);
  await client.runIndexer(indexerName);
}

async function main(): Promise<void> {
  console.log(`Running Indexer Operations Sample....`);
  if (!endpoint || !dataSourceName || !targetIndexName) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new DefaultAzureCredential());
  try {
    await createIndexer(TEST_INDEXER_NAME, client);
    await getAndUpdateIndexer(TEST_INDEXER_NAME, client);
    await getIndexerStatus(TEST_INDEXER_NAME, client);
    await listIndexers(client);
    await resetIndexer(TEST_INDEXER_NAME, client);
    await runIndexer(TEST_INDEXER_NAME, client);
  } finally {
    await deleteIndexer(TEST_INDEXER_NAME, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
