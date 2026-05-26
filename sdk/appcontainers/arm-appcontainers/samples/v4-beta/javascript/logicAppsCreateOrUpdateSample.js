// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Logic App extension resource
 *
 * @summary create or update a Logic App extension resource
 * x-ms-original-file: 2025-10-02-preview/LogicApps_Create.json
 */
async function createLogicAppExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.createOrUpdate(
    "examplerg",
    "testcontainerApp0",
    "testcontainerApp0",
    {},
  );
  console.log(result);
}

async function main() {
  await createLogicAppExtension();
}

main().catch(console.error);
