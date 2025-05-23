// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getHeaders } from "../../../src/request/request.js";
import { CosmosClient, type CosmosHeaders, type FeedOptions } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

import { DefaultAzureCredential } from "@azure/identity";
import { RequestOptions } from "https";
const endpoint = "https://cosmosdbujjwal.documents.azure.com:443/";
const key =
  "BF1a8DO0tApwnxTZiuA09alTnDFioNb9QNT3MXmlpviNriynSOKCbooI91pI7hsdq30YkRuJFVQiACDbtJj9JQ==";
// const endpoint = "https://127.0.0.1:8081/";
// const key =
//   "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

const cd = new DefaultAzureCredential();

const client = new CosmosClient({
  endpoint,
  aadCredentials: cd,
  // diagnosticLevel: CosmosDbDiagnosticLevel.debug,
  connectionPolicy: {
    useMultipleWriteLocations: false,
    preferredLocations: ["South Central US", "West US 3"],
  },
});

async function createDatabaseAndContainer() {
  // Create Database

  const database = await client.database("merge");

  // Create Container
  const containerDefinition = {
    id: "c26",
    partitionKey: {
      paths: ["/customerId"],
    },
    throughput: 600,
  };
  const { container: c, diagnostics } =
    await database.containers.createIfNotExists(containerDefinition);
  // @ts-preserve-whitespace
  console.log(`Container created or already exists: ${c.id}`);
  // containerDefinition.throughput = 1000;
  // // @ts-ignore
  // const { container: d } = await c.replace(containerDefinition);
  // console.log(`Container replaced:`, d);
  // const x = await container.readPartitionKeyRanges().fetchAll();
  // console.log(x.resources);

  // const r = await client
  //   .database("merge")
  //   .container("dd2d")
  //   .read({ populateQuotaInfo: true });
  //  console.log(r);

  const x = await client.getDatabaseAccount();
  console.log("x", x.resource?.writableLocations);
  console.log("x", x);

  return c;
}

async function insertItems(container: any) {
  const sampleData = {
    id: "1",
    customerId: "36c7cc3d-1709-45c6-819f-10e5586a6cb7",
    emailAddress: "justine@contoso.com",
    name: "Justine",
  };
  const sampleData1 = {
    id: "2",
    customerId: "36c7cc3d-1709-45c6-desfs",
    emailAddress: "ujjwal@contoso.com",
    name: "Ujjwal",
  };
  const sampleData2 = {
    id: "877778",
    customerId: "1",
    emailAddress: "Harsh@contoso.com",
    name: "Harsh",
  };
  await container.items.create(sampleData2);
  // const resp = await container.item("3", null).read();
  // console.log("resp", resp.resource);

  console.log("Inserted items");
}

describe("Test x-ms-documentdb-query-parallelizecrosspartitionquery header value", () => {
  it("If maxDegreeOfParallelism > 1 then x-ms-documentdb-query-parallelizecrosspartitionquery header should be true", async () => {
    try {
      const container = await createDatabaseAndContainer();
      await insertItems(container);
      // await runQueries3(container);
      // const x = await container.readPartitionKeyRanges().fetchAll();
      // console.log(x.resources.length);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
