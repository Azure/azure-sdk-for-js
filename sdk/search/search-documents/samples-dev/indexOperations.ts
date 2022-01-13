// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the Index Operations.
 */

import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndex,
  SearchIndexStatistics,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const indexName = "example-index-sample-1";

async function createIndex(indexName: string, client: SearchIndexClient) {
  console.log(`Creating Index Operation`);
  const index: SearchIndex = {
    name: indexName,
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true,
      },
      {
        type: "Edm.Double",
        name: "awesomenessLevel",
        sortable: true,
        filterable: true,
        facetable: true,
      },
      {
        type: "Edm.String",
        name: "description",
        searchable: true,
      },
      {
        type: "Edm.ComplexType",
        name: "details",
        fields: [
          {
            type: "Collection(Edm.String)",
            name: "tags",
            searchable: true,
          },
        ],
      },
      {
        type: "Edm.Int32",
        name: "hiddenWeight",
        hidden: true,
      },
    ],
  };
  await client.createIndex(index);
}

async function getAndUpdateIndex(indexName: string, client: SearchIndexClient) {
  console.log(`Get And Update Index Operation`);
  const index: SearchIndex = await client.getIndex(indexName);
  index.fields.push({
    type: "Edm.DateTimeOffset",
    name: "lastUpdatedOn",
    filterable: true,
  });
  await client.createOrUpdateIndex(index);
}

async function getIndexStatistics(indexName: string, client: SearchIndexClient) {
  console.log(`Get Index Statistics Operation`);
  const statistics: SearchIndexStatistics = await client.getIndexStatistics(indexName);
  console.log(`Document Count: ${statistics.documentCount}`);
  console.log(`Storage Size: ${statistics.storageSize}`);
}

async function getServiceStatistics(client: SearchIndexClient) {
  console.log(`Get Service Statistics Operation`);
  const { counters, limits } = await client.getServiceStatistics();
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
  console.log(
    `\tMax Complex Collection Fields Per Index: ${limits.maxComplexCollectionFieldsPerIndex}`
  );
  console.log(
    `\tMax Complex Objects In Collections Per Document: ${limits.maxComplexObjectsInCollectionsPerDocument}`
  );
}

async function listIndexes(client: SearchIndexClient) {
  console.log(`List Indexes Operation`);
  const result = await client.listIndexes();
  let listOfIndexes = await result.next();

  console.log(`List of Indexes`);
  console.log(`***************`);
  while (!listOfIndexes.done) {
    const { similarity } = listOfIndexes.value;
    console.log(`Name: ${listOfIndexes.value.name}`);
    console.log(`Similarity Algorithm: ${similarity && similarity.odatatype}`);
    console.log();
    listOfIndexes = await result.next();
  }
}

async function deleteIndex(indexName: string, client: SearchIndexClient) {
  console.log(`Deleting Index Operation`);
  await client.deleteIndex(indexName);
}

async function main() {
  console.log(`Running Index Operations Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    await createIndex(indexName, client);
    await getAndUpdateIndex(indexName, client);
    await getIndexStatistics(indexName, client);
    await getServiceStatistics(client);
    await listIndexes(client);
  } finally {
    await deleteIndex(indexName, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
