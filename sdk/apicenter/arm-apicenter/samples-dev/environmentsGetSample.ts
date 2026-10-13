// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the environment.
 *
 * @summary returns details of the environment.
 * x-ms-original-file: 2024-06-01-preview/Environments_Get.json
 */
async function environmentsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.environments.get("contoso-resources", "contoso", "default", "public");
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsGet();
}

main().catch(console.error);
