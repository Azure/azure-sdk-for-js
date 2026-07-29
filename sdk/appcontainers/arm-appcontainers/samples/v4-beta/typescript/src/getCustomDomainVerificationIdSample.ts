// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the verification id of a subscription used for verifying custom domains
 *
 * @summary get the verification id of a subscription used for verifying custom domains
 * x-ms-original-file: 2025-10-02-preview/Subscriptions_GetCustomDomainVerificationId.json
 */
async function listAllOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d27c3573-f76e-4b26-b871-0ccd2203d08c";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.getCustomDomainVerificationId();
  console.log(result);
}

async function main(): Promise<void> {
  await listAllOperations();
}

main().catch(console.error);
