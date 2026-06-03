// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the resiliency policies for a Dapr component.
 *
 * @summary get the resiliency policies for a Dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponentResiliencyPolicies_List.json
 */
async function listDaprComponentResiliencyPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.daprComponentResiliencyPolicies.list(
    "examplerg",
    "myenvironment",
    "mydaprcomponent",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDaprComponentResiliencyPolicies();
}

main().catch(console.error);
