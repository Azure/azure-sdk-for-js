// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SqlContainerCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL container
 *
 * @summary Create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlContainerCreateUpdate.json
 */
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
        dataMaskingPolicy: {
          excludedPaths: [{ path: "/id" }],
          includedPaths: [
            { path: "/" },
            {
              path: "/contact/phones",
              length: 10,
              startPosition: 3,
              strategy: "MaskSubstring",
            },
          ],
          isPolicyEnabled: true,
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
          fullTextIndexes: [
            { path: "/ftPath1" },
            { path: "/ftPath2" },
            { path: "/ftPath3" },
          ],
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

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL container
 *
 * @summary Create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlContainerRestore.json
 */
async function cosmosDbSqlContainerRestore(): Promise<void> {
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
        createMode: "Restore",
        id: "containerName",
        restoreParameters: {
          restoreSource:
            "/subscriptions/subid/providers/Microsoft.DocumentDB/locations/WestUS/restorableDatabaseAccounts/restorableDatabaseAccountId",
          restoreTimestampInUtc: new Date("2022-07-20T18:28:00Z"),
          restoreWithTtlDisabled: true,
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

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL container
 *
 * @summary Create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlMaterializedViewCreateUpdate.json
 */
async function cosmosDbSqlMaterializedViewCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "mvContainerName";
  const createUpdateSqlContainerParameters: SqlContainerCreateUpdateParameters =
    {
      location: "West US",
      options: {},
      resource: {
        id: "mvContainerName",
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
        },
        materializedViewDefinition: {
          definition: "select * from ROOT",
          sourceCollectionId: "sourceContainerName",
          throughputBucketForBuild: 1,
        },
        partitionKey: { kind: "Hash", paths: ["/mvpk"] },
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
  await cosmosDbSqlContainerRestore();
  await cosmosDbSqlMaterializedViewCreateUpdate();
}

main().catch(console.error);
