// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Cancel an existing run.
 *
 * @summary Cancel an existing run.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/RunsCancel.json
 */
async function runsCancel(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const runId = "0accec26-d6de-4757-8e74-d080f38eaaab";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.runs.beginCancelAndWait(
    resourceGroupName,
    registryName,
    runId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runsCancel();
}

main().catch(console.error);
