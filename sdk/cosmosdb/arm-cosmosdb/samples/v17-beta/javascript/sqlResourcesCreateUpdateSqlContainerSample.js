// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL container
 *
 * @summary create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerCreateUpdate.json
 */
async function cosmosDBSqlContainerCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlContainer(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    {
      location: "West US",
      tags: {},
      resource: {
        id: "containerName",
        indexingPolicy: {
          indexingMode: "consistent",
          automatic: true,
          includedPaths: [
            {
              path: "/*",
              indexes: [
                { kind: "Range", dataType: "String", precision: -1 },
                { kind: "Range", dataType: "Number", precision: -1 },
              ],
            },
          ],
          excludedPaths: [],
          vectorIndexes: [
            { path: "/vectorPath1", type: "flat" },
            { path: "/vectorPath2", type: "quantizedFlat" },
            { path: "/vectorPath3", type: "diskANN" },
          ],
          fullTextIndexes: [{ path: "/ftPath1" }, { path: "/ftPath2" }, { path: "/ftPath3" }],
        },
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
        fullTextPolicy: {
          defaultLanguage: "1033",
          fullTextPaths: [
            { path: "/ftPath1", language: "en-US" },
            { path: "/ftPath2", language: "fr-FR" },
            { path: "/ftPath3", language: "de-DE" },
          ],
        },
        partitionKey: { paths: ["/AccountNumber"], kind: "Hash" },
        defaultTtl: 100,
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/testPath"] }] },
        conflictResolutionPolicy: { mode: "LastWriterWins", conflictResolutionPath: "/path" },
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
        dataMaskingPolicy: {
          includedPaths: [
            { path: "/" },
            { path: "/contact/phones", strategy: "MaskSubstring", startPosition: 3, length: 10 },
          ],
          excludedPaths: [{ path: "/id" }],
          isPolicyEnabled: true,
        },
        computedProperties: [{ name: "cp_lowerName", query: "SELECT VALUE LOWER(c.name) FROM c" }],
      },
      options: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL container
 *
 * @summary create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerRestore.json
 */
async function cosmosDBSqlContainerRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlContainer(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    {
      location: "West US",
      options: {},
      resource: {
        createMode: "Restore",
        id: "containerName",
        restoreParameters: {
          restoreSource:
            "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.DocumentDB/locations/WestUS/restorableDatabaseAccounts/restorableDatabaseAccountId",
          restoreTimestampInUtc: new Date("2022-07-20T18:28:00Z"),
          restoreWithTtlDisabled: true,
        },
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL container
 *
 * @summary create or update an Azure Cosmos DB SQL container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlMaterializedViewCreateUpdate.json
 */
async function cosmosDBSqlMaterializedViewCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlContainer(
    "rg1",
    "ddb1",
    "databaseName",
    "mvContainerName",
    {
      location: "West US",
      tags: {},
      resource: {
        id: "mvContainerName",
        indexingPolicy: {
          indexingMode: "consistent",
          automatic: true,
          includedPaths: [
            {
              path: "/*",
              indexes: [
                { kind: "Range", dataType: "String", precision: -1 },
                { kind: "Range", dataType: "Number", precision: -1 },
              ],
            },
          ],
          excludedPaths: [],
        },
        partitionKey: { paths: ["/mvpk"], kind: "Hash" },
        materializedViewDefinition: {
          sourceCollectionId: "sourceContainerName",
          definition: "select * from ROOT",
          throughputBucketForBuild: 1,
        },
      },
      options: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlContainerCreateUpdate();
  await cosmosDBSqlContainerRestore();
  await cosmosDBSqlMaterializedViewCreateUpdate();
}

main().catch(console.error);
