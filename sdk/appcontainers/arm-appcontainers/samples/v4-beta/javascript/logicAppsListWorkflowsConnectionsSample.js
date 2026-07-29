// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets logic app's connections.
 *
 * @summary gets logic app's connections.
 * x-ms-original-file: 2025-10-02-preview/LogicApps_ListConnections.json
 */
async function listTheWorkflowsConfigurationConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.listWorkflowsConnections(
    "testrg123",
    "testapp2",
    "testapp2",
  );
  console.log(result);
}

async function main() {
  await listTheWorkflowsConfigurationConnections();
}

main().catch(console.error);
