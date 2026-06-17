// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stop access review definition
 *
 * @summary stop access review definition
 * x-ms-original-file: 2021-12-01-preview/StopAccessReviewScheduleDefinition.json
 */
async function getAccessReview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.scopeAccessReviewScheduleDefinitions.stop(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
  );
}

async function main(): Promise<void> {
  await getAccessReview();
}

main().catch(console.error);
