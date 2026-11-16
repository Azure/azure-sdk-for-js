// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Dapr Component in a connected environment.
 *
 * @summary creates or updates a Dapr Component in a connected environment.
 * x-ms-original-file: 2026-07-01/ConnectedEnvironmentsDaprComponents_CreateOrUpdate.json
 */
async function createOrUpdateDaprComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsDaprComponents.createOrUpdate(
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

async function main() {
  await createOrUpdateDaprComponent();
}

main().catch(console.error);
