// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the workflows for a logic app.
 *
 * @summary list the workflows for a logic app.
 * x-ms-original-file: 2025-10-02-preview/LogicApps_ListWorkflows.json
 */
async function listTheWorkflows() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logicApps.listWorkflows(
    "examplerg",
    "testcontainerApp0",
    "testcontainerApp0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheWorkflows();
}

main().catch(console.error);
