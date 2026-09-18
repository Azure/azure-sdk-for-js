// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a private link resource supported by a managed environment.
 *
 * @summary gets the details of a private link resource supported by a managed environment.
 * x-ms-original-file: 2026-07-01/ManagedEnvironmentPrivateLinkResources_Get.json
 */
async function getAPrivateLinkResourceByManagedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentPrivateLinkResources.get(
    "examplerg",
    "managedEnv",
    "managedEnvironments",
  );
  console.log(result);
}

async function main() {
  await getAPrivateLinkResourceByManagedEnvironment();
}

main().catch(console.error);
