// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a replica for a Container App Revision.
 *
 * @summary get a replica for a Container App Revision.
 * x-ms-original-file: 2025-10-02-preview/Replicas_Get.json
 */
async function getContainerAppRevisionReplica() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsRevisionReplicas.getReplica(
    "workerapps-rg-xj",
    "myapp",
    "myapp--0wlqy09",
    "myapp--0wlqy09-5d9774cff-5wnd8",
  );
  console.log(result);
}

async function main() {
  await getContainerAppRevisionReplica();
}

main().catch(console.error);
