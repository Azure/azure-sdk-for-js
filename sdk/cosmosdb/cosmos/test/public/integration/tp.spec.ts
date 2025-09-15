// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getHeaders } from "../../../src/request/request.js";
import {
  BulkOperationType,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  OperationInput,
  PartitionKeyDefinitionVersion,
  type CosmosHeaders,
  type FeedOptions,
} from "../../../src/index.js";
import { describe, it, assert } from "vitest";
import { PartitionKeyKind } from "../../../dist/esm/index.js";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { DefaultAzureCredential } from "@azure/identity";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const endpoint2= "https://cosmosdbujjwalppaf.documents.azure.com:443/"
const endpoint = "https://sdkbugbash.documents.azure.com:443/";
const key =
  "2mo9a5cCqsayErckgi0X5zv5zw8j78fUAQslgnEsp5I4lEdrHXDgOrWl6oPvuhByEU3mCaSiL3gdACDbRkhmPA==";
const key2 = "Lrr27zgGjSCCUw5iYG8YN6gHE5uJT8T9wA6wpN8Vicb2NTk1BlG7eYIHgCe43n7fTvxBLNnjfbcjACDbyxW9xA=="
const credentials = new DefaultAzureCredential();
const client = new CosmosClient({
  endpoint: endpoint,
  key:key,
  // aadCredentials: credentials,
  connectionPolicy: {
    preferredLocations: [
      "West US 2",
      "West US 2",
      "South Central US",
      "West Central US",
      "West US 2",
    ],
    enablePartitionLevelFailover: true,
    enablePartitionLevelCircuitBreaker: true,
  },
});

async function createDatabaseAndContainer() {
  console.log("///////////////////////////////////");
  
  // const database = await client.database("db");

  const { database } = await client.databases.createIfNotExists({
    id: "bugbash",
  });
  console.log(`Database created or already exists: ${database.id}`);

  // const containerDefinition = {
  //   id: "bugbash2",
  //   partitionKey: {
  //     paths: ["/name"],
  //     kind: PartitionKeyKind.MultiHash,
  //     version: PartitionKeyDefinitionVersion.V2,
  //   },
  //   throughput: 12000,
  // };
  // const { container } = await database.containers.createIfNotExists(containerDefinition);

  // console.log(`Container created or already exists: ${container.id}`);

  const databaseAccount = await client.getDatabaseAccount();
  console.log("writableLocations : ", databaseAccount);
  //  console.log("enablePerPartitionFailoverBehavior : ", databaseAccount.resource?.enablePerPartitionFailoverBehavior);

  //  const x = await await container.readPartitionKeyRanges().fetchAll();
  //  console.log("Partition Key Ranges:", x.resources);
  // return container;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertItems(container: any) {
  const sampleData = {
    id: "id",
    customerId: "36c7cc3d-1709-45c6-819f-10e5586a6cb7",
    emailAddress: "justine@contoso.com",
    name: "sample2",
  };
  for (let i = 0; i < 10; i++) {
    const time = new Date().getTime();

    let attempt = 0;
    const maxRetries = 3;

    while (attempt <= maxRetries) {
      try {
        sampleData.id = `${time}__${i}`;
        console.log("inserting item with id:", sampleData.id);
        await container.items.create(sampleData);
        break;
      } catch (error) {
        console.error(`Error inserting item: [Code ${error.code}]`);
        if (error.code === 409) {
          console.log("Conflict error (409) – skipping this item.");
          break;
        }
        attempt++;
        if (attempt > maxRetries) {
          console.error("Max retry attempts reached. Throwing error.");
          throw error; // out of retries, rethrow
        }
        const delay = Math.pow(2, attempt - 1) * 10000;
        console.log(`Retrying in ${delay / 1000} seconds (attempt ${attempt})...`);
        await sleep(delay);
      }
    }
    await sleep(2000);
  }

  for (let i = 0; i < 10; i++) {
    const time = new Date().getTime();

    let attempt = 0;
    const maxRetries = 3;

    while (attempt <= maxRetries) {
      try {
        sampleData.id = `${time}__${i}`;
        sampleData.name = "sample1";
        console.log("inserting item with id:", sampleData.id);
        await container.items.create(sampleData);
        break;
      } catch (error) {
        console.error(`Error inserting item: [Code ${error.code}]`);
        if (error.code === 409) {
          console.log("Conflict error (409) – skipping this item.");
          break;
        }
        attempt++;
        if (attempt > maxRetries) {
          console.error("Max retry attempts reached. Throwing error.");
          throw error; // out of retries, rethrow
        }
        const delay = Math.pow(2, attempt - 1) * 10000;
        console.log(`Retrying in ${delay / 1000} seconds (attempt ${attempt})...`);
        await sleep(delay);
      }
    }
    await sleep(2000);
  }
  console.log("Inserted items");
}
async function runQueries2(container: any) {
  // Query 3: SELECT * FROM c where c.category="category-1" ORDER BY c._ts DESC
  const query = "SELECT * FROM c";

  const queryOptions: FeedOptions = {
    maxItemCount: 40, // maximum number of items to return per page
    populateIndexMetrics: true, // Enable index metrics
    forceQueryPlan: true,
    populateQueryMetrics: true,
  };
  const queryIterator = container.items.query("SELECT * from c", queryOptions); // { partitionKey: "sample1" }

  while (queryIterator.hasMoreResults()) {
    const { resources, indexMetrics, queryMetrics } = await queryIterator.fetchNext();
    if (resources) {
      console.log("Query result:", resources.length);
    }
    console.log("Index metrics:", indexMetrics);
    // console.log("Index metrics:", queryMetrics);
  }
}
async function runQueries4(container: any) {
  // Query 3: SELECT * FROM c where c.category="category-1" ORDER BY c._ts DESC
  const query = "SELECT * FROM c";

  const queryOptions: FeedOptions = {
    maxItemCount: 10, // maximum number of items to return per page
    populateIndexMetrics: false, // Enable index metrics
    //  forceQueryPlan: true,
    //  populateQueryMetrics: true,
    bufferItems: true,
    maxDegreeOfParallelism: 1000,
  };
  const queryIterator = container.items.query("SELECT * from c", queryOptions); // { partitionKey: "sample1" }
  console.log(
    "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
    queryOptions.populateIndexMetrics,
  );
  while (queryIterator.hasMoreResults()) {
    console.log("-----------------------------------------------------------------------------");
    const { resources, indexMetrics, queryMetrics } = await queryIterator.fetchNext();
    if (resources) {
      console.log("Query result:", resources.length);
    }
    console.log("Index metrics:", indexMetrics);
    console.log("------------------------------------------------------------------------------");
  }
}
async function runQueries3(container: any) {
  const requestOptions = { excludedLocations: ["South Central US", "WESTUS 3"] };
  const querySpec = {
    query: "SELECT * from c",
  };
  console.log("/////////////////////////////");
  const { resources, requestCharge, diagnostics } = await container.items
    .query(querySpec, requestOptions)
    .fetchAll();
  console.log(resources.length);
  console.log("/////////////////////////////");
}
async function insertItems2(container: any) {
  const sampleData = {
    id: "id",
    customerId: "36c7cc3d-1709-45c6-819f-10e5586a6cb7",
    emailAddress: "justine@contoso.com",
    name: "sample2",
  };

  let numberOfSuccessfulInserts = 0;
  let numberOfFailedInserts = 0;

  const startTime = Date.now();
  //  3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const runDuration = 25 * 60 * 1000; // 3 hours in milliseconds

  let i = 0;

  while (Date.now() - startTime < runDuration) {
    const time = Date.now();
    try {
      sampleData.id = `${time}__${i}`;
      console.log("Inserting item with id:", sampleData.id);
      await container.items.create(sampleData);
      numberOfSuccessfulInserts++;
    } catch (error) {
      console.error(`Error inserting item: [Code ${error.code}]`);
      numberOfFailedInserts++;
    }
    i++;
  }

  console.log(`Inserted items completed.`);
  console.log(`Successful inserts: ${numberOfSuccessfulInserts}`);
  console.log(`Failed inserts: ${numberOfFailedInserts}`);
}

describe("test", () => {
  it("test", async () => {
    try {
      await createDatabaseAndContainer();
      // await insertItems(container);
      // await runQueries3(container);
      // const x = await container.readPartitionKeyRanges().fetchAll();
      // console.log(x.resources.length);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
