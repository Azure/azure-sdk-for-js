// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to record a decision.
 *
 * @summary record a decision.
 * x-ms-original-file: 2021-12-01-preview/PatchAccessReviewInstanceMyDecisionById.json
 */
async function getAccessReviews(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.accessReviewInstanceMyDecisions.patch(
    "488a6d0e-0a63-4946-86e3-1f5bbc934661",
    "4135f961-be78-4005-8101-c72a5af307a2",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
