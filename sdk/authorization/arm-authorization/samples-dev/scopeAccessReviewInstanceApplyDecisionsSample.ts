// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to an action to apply all decisions for an access review instance.
 *
 * @summary an action to apply all decisions for an access review instance.
 * x-ms-original-file: 2021-12-01-preview/AccessReviewInstanceApplyDecisions.json
 */
async function getAccessReview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.scopeAccessReviewInstance.applyDecisions(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "d9b9e056-7004-470b-bf21-1635e98487da",
  );
}

async function main(): Promise<void> {
  await getAccessReview();
}

main().catch(console.error);
