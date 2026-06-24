// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update access review schedule definition.
 *
 * @summary create or Update access review schedule definition.
 * x-ms-original-file: 2021-12-01-preview/PutAccessReviewScheduleDefinition.json
 */
async function putAccessReview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewScheduleDefinitions.createOrUpdateById(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putAccessReview();
}

main().catch(console.error);
