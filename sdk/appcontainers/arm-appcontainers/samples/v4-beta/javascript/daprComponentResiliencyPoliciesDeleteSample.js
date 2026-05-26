// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a resiliency policy for a Dapr component.
 *
 * @summary delete a resiliency policy for a Dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponentResiliencyPolicies_Delete.json
 */
async function deleteDaprComponentResiliencyPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.daprComponentResiliencyPolicies.delete(
    "examplerg",
    "myenvironment",
    "mydaprcomponent",
    "myresiliencypolicy",
  );
}

async function main() {
  await deleteDaprComponentResiliencyPolicy();
}

main().catch(console.error);
