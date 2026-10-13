// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes API deployment.
 *
 * @summary deletes API deployment.
 * x-ms-original-file: 2024-06-01-preview/Deployments_Delete.json
 */
async function deploymentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.deployments.delete(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "production",
  );
}

async function main(): Promise<void> {
  await deploymentsDelete();
}

main().catch(console.error);
