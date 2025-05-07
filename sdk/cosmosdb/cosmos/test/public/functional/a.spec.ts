// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getHeaders } from "../../../src/request/request.js";
import {
  CosmosClient,
  CosmosDbDiagnosticLevel,
  type CosmosHeaders,
  type FeedOptions,
} from "../../../src/index.js";
import { describe, it, assert } from "vitest";

// import { setLogLevel, AzureLogger } from "@azure/logger";

// setLogLevel("verbose");

// // AzureLogger.log = (level, message, context) => {
// //   if (context && typeof context === "object") {
// //     // If the context is an object, stringify it for better readability
// //     console.log("//////////////");
// //     console.log(level);
// //     console.log(message);
// //     console.log(context);
// //     console.log("????????????????");
// //     console.log(`${level}: ${message} - ${JSON.stringify(message, null, 2)}`);
// //   } else {
// //     // If it's not an object, just log as usual
// //     console.log(`${level}: ${message}`);
// //   }
// // };

// AzureLogger.log = (...args) => {
//   let i = 0;
//   for (const arg of args) {
//     console.log("arg", i, typeof arg);
//     console.log("yo ", i++, arg);
//   }
// };

import { title } from "process";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
  diagnosticLevel: CosmosDbDiagnosticLevel.debug,
});

async function createDatabaseAndContainer() {
  // Create Database

  const database = await client.database("merge");

  // Create Container
  const containerDefinition = {
    id: "uc8",
    partitionKey: {
      paths: ["/customerId"],
    },
    throughput: 600,
  };
  const { container: c, diagnostics } =
    await database.containers.createIfNotExists(containerDefinition);
  // @ts-preserve-whitespace
  // console.log("diagnostics", diagnostics);
  // containerDefinition.throughput = 1000;
  // // @ts-ignore
  // const { container: d } = await c.replace(containerDefinition);
  // console.log(`Container replaced:`, d);
  // const x = await container.readPartitionKeyRanges().fetchAll();
  // console.log(x.resources);

  // const r = await client.database("merge").container("dd2d").read({ populateQuotaInfo: true });
  //  console.log(r);
  // await client.getDatabaseAccount();

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
    id: "52",
    customerId: "36c7cc3d-1709-45c6-desfs",
    emailAddress: "Harsh@contoso.com",
    name: "Harsh",
  };
  const { diagnostics } = await container.items.create(sampleData2);
  console.log("diagnostics", diagnostics);
  console.log("Inserted items");
}

describe("Test", () => {
  it("test", async () => {
    try {
      const container = await createDatabaseAndContainer();
      // await insertItems(container);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
