// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the verification id of a subscription used for verifying custom domains
 *
 * @summary Get the verification id of a subscription used for verifying custom domains
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Subscriptions_GetCustomDomainVerificationId.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllOperations(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "d27c3573-f76e-4b26-b871-0ccd2203d08c";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.getCustomDomainVerificationId();
  console.log(result);
}

async function main(): Promise<void> {
  await listAllOperations();
}

main().catch(console.error);
