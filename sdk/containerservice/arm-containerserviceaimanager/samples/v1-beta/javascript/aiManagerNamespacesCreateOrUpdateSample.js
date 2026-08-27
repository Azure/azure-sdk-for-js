// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AIManagerNamespace
 *
 * @summary create a AIManagerNamespace
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_CreateOrUpdate.json
 */
async function createsOrUpdatesAnAIManagerNamespaceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagerNamespaces.createOrUpdate(
    "rg1",
    "aimanager1",
    "namespace1",
    { properties: { labels: { app: "myapp" }, annotations: { note: "example" } } },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAnAIManagerNamespaceResource();
}

main().catch(console.error);
