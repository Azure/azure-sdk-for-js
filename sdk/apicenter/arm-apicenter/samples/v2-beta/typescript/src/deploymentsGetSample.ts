// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the API deployment.
 *
 * @summary returns details of the API deployment.
 * x-ms-original-file: 2024-06-01-preview/Deployments_Get.json
 */
async function deploymentsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.deployments.get(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "production",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentsGet();
}

main().catch(console.error);
