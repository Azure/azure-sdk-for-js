// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Dapr Component in a Managed Environment.
 *
 * @summary creates or updates a Dapr Component in a Managed Environment.
 * x-ms-original-file: 2026-07-01/DaprComponents_CreateOrUpdate_SecretStoreComponent.json
 */
async function createOrUpdateDaprComponentWithSecretStoreComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.createOrUpdate(
    "examplerg",
    "myenvironment",
    "reddog",
    {
      componentType: "state.azure.cosmosdb",
      ignoreErrors: false,
      initTimeout: "50s",
      metadata: [
        { name: "url", value: "<COSMOS-URL>" },
        { name: "database", value: "itemsDB" },
        { name: "collection", value: "items" },
        { name: "masterkey", secretRef: "masterkey" },
      ],
      scopes: ["container-app-1", "container-app-2"],
      secretStoreComponent: "my-secret-store",
      version: "v1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Dapr Component in a Managed Environment.
 *
 * @summary creates or updates a Dapr Component in a Managed Environment.
 * x-ms-original-file: 2026-07-01/DaprComponents_CreateOrUpdate_Secrets.json
 */
async function createOrUpdateDaprComponentWithSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.createOrUpdate(
    "examplerg",
    "myenvironment",
    "reddog",
    {
      componentType: "state.azure.cosmosdb",
      ignoreErrors: false,
      initTimeout: "50s",
      metadata: [
        { name: "url", value: "<COSMOS-URL>" },
        { name: "database", value: "itemsDB" },
        { name: "collection", value: "items" },
        { name: "masterkey", secretRef: "masterkey" },
      ],
      scopes: ["container-app-1", "container-app-2"],
      secrets: [{ name: "masterkey", value: "keyvalue" }],
      version: "v1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDaprComponentWithSecretStoreComponent();
  await createOrUpdateDaprComponentWithSecrets();
}

main().catch(console.error);
