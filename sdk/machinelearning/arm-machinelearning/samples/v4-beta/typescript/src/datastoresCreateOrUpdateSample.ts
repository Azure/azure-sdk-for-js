// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update datastore.
 *
 * @summary create or update datastore.
 * x-ms-original-file: 2025-12-01/Datastore/AzureBlobWAccountKey/createOrUpdate.json
 */
async function createOrUpdateDatastoreAzureBlobWOrAccountKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      properties: {
        description: "string",
        accountName: "string",
        containerName: "string",
        credentials: {
          credentialsType: "AccountKey",
          secrets: { key: "string", secretsType: "AccountKey" },
        },
        datastoreType: "AzureBlob",
        endpoint: "core.windows.net",
        properties: {},
        tags: { string: "string" },
        protocol: "https",
      },
    },
    { skipValidation: false },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update datastore.
 *
 * @summary create or update datastore.
 * x-ms-original-file: 2025-12-01/Datastore/AzureDataLakeGen1WServicePrincipal/createOrUpdate.json
 */
async function createOrUpdateDatastoreAzureDataLakeGen1WOrServicePrincipal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      properties: {
        description: "string",
        credentials: {
          authorityUrl: "string",
          clientId: "00000000-1111-2222-3333-444444444444",
          credentialsType: "ServicePrincipal",
          resourceUrl: "string",
          secrets: { clientSecret: "string", secretsType: "ServicePrincipal" },
          tenantId: "00000000-1111-2222-3333-444444444444",
        },
        datastoreType: "AzureDataLakeGen1",
        properties: {},
        storeName: "string",
        tags: { string: "string" },
      },
    },
    { skipValidation: false },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update datastore.
 *
 * @summary create or update datastore.
 * x-ms-original-file: 2025-12-01/Datastore/AzureDataLakeGen2WServicePrincipal/createOrUpdate.json
 */
async function createOrUpdateDatastoreAzureDataLakeGen2WOrServicePrincipal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      properties: {
        description: "string",
        accountName: "string",
        credentials: {
          authorityUrl: "string",
          clientId: "00000000-1111-2222-3333-444444444444",
          credentialsType: "ServicePrincipal",
          resourceUrl: "string",
          secrets: { clientSecret: "string", secretsType: "ServicePrincipal" },
          tenantId: "00000000-1111-2222-3333-444444444444",
        },
        datastoreType: "AzureDataLakeGen2",
        endpoint: "string",
        filesystem: "string",
        properties: {},
        tags: { string: "string" },
        protocol: "string",
      },
    },
    { skipValidation: false },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update datastore.
 *
 * @summary create or update datastore.
 * x-ms-original-file: 2025-12-01/Datastore/AzureFileWAccountKey/createOrUpdate.json
 */
async function createOrUpdateDatastoreAzureFileStoreWOrAccountKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      properties: {
        description: "string",
        accountName: "string",
        credentials: {
          credentialsType: "AccountKey",
          secrets: { key: "string", secretsType: "AccountKey" },
        },
        datastoreType: "AzureFile",
        endpoint: "string",
        fileShareName: "string",
        properties: {},
        tags: { string: "string" },
        protocol: "string",
      },
    },
    { skipValidation: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDatastoreAzureBlobWOrAccountKey();
  await createOrUpdateDatastoreAzureDataLakeGen1WOrServicePrincipal();
  await createOrUpdateDatastoreAzureDataLakeGen2WOrServicePrincipal();
  await createOrUpdateDatastoreAzureFileStoreWOrAccountKey();
}

main().catch(console.error);
