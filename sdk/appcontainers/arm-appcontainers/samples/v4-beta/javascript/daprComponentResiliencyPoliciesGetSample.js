// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Dapr component resiliency policy.
 *
 * @summary get a Dapr component resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/DaprComponentResiliencyPolicies_Get.json
 */
async function getDaprComponentResiliencyPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.get(
    "examplerg",
    "myenvironment",
    "mydaprcomponent",
    "myresiliencypolicy",
  );
  console.log(result);
}

async function main() {
  await getDaprComponentResiliencyPolicy();
}

main().catch(console.error);
