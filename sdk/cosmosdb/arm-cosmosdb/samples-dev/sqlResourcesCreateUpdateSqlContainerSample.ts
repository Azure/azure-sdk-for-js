// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL container
 *
 * @summary Create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBSqlContainerCreateUpdate.json
 */

import {
  SqlContainerCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbSqlContainerCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters =
    {
      location: "West US",
      options: {},
      resource: {
        clientEncryptionPolicy: {
          includedPaths: [
            {
              path: "/path",
              clientEncryptionKeyId: "keyId",
              encryptionAlgorithm: "AEAD_AES_256_CBC_HMAC_SHA256",
              encryptionType: "Deterministic",
            },
          ],
          policyFormatVersion: 2,
        },
        computedProperties: [
          { name: "cp_lowerName", query: "SELECT VALUE LOWER(c.name) FROM c" },
        ],
        conflictResolutionPolicy: {
          conflictResolutionPath: "/path",
          mode: "LastWriterWins",
        },
        defaultTtl: 100,
        fullTextPolicy: {
          defaultLanguage: "1033",
          fullTextPaths: [
            { path: "/ftPath1", language: "en-US" },
            { path: "/ftPath2", language: "fr-FR" },
            { path: "/ftPath3", language: "de-DE" },
          ],
        },
        id: "containerName",
        indexingPolicy: {
          automatic: true,
          excludedPaths: [],
          includedPaths: [
            {
              path: "/*",
              indexes: [
                { dataType: "String", kind: "Range", precision: -1 },
                { dataType: "Number", kind: "Range", precision: -1 },
              ],
            },
          ],
          indexingMode: "consistent",
          vectorIndexes: [
            { type: "flat", path: "/vectorPath1" },
            { type: "quantizedFlat", path: "/vectorPath2" },
            { type: "diskANN", path: "/vectorPath3" },
          ],
        },
        partitionKey: { kind: "Hash", paths: ["/AccountNumber"] },
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/testPath"] }] },
        vectorEmbeddingPolicy: {
          vectorEmbeddings: [
            {
              path: "/vectorPath1",
              dataType: "float32",
              dimensions: 400,
              distanceFunction: "euclidean",
            },
            {
              path: "/vectorPath2",
              dataType: "uint8",
              dimensions: 512,
              distanceFunction: "cosine",
            },
            {
              path: "/vectorPath3",
              dataType: "int8",
              dimensions: 512,
              distanceFunction: "dotproduct",
            },
          ],
        },
      },
      tags: {},
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.beginCreateUpdateSqlContainerAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    createUpdateSqlContainerParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlContainerCreateUpdate();
}

main().catch(console.error);
