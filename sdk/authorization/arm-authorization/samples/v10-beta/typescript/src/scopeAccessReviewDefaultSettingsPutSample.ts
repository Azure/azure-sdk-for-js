// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get access review default settings for the subscription
 *
 * @summary get access review default settings for the subscription
 * x-ms-original-file: 2021-12-01-preview/PutAccessReviewDefaultSettings.json
 */
async function getAccessReviewDefaultSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewDefaultSettings.put(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReviewDefaultSettings();
}

main().catch(console.error);
