// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of operations.
 *
 * @summary Returns list of operations.
 * x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Operation_List.json
 */

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAvailableOperationsForTheContainerServiceResourceProvider(): Promise<void> {
  const subscriptionId =
    process.env["DEVHUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await listAvailableOperationsForTheContainerServiceResourceProvider();
}

main().catch(console.error);
