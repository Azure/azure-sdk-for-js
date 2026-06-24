// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to an action to accept recommendations for decision in an access review instance.
 *
 * @summary an action to accept recommendations for decision in an access review instance.
 * x-ms-original-file: 2021-12-01-preview/AccessReviewInstanceAcceptRecommendations.json
 */
async function getAccessReview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.accessReviewInstance.acceptRecommendations(
    "488a6d0e-0a63-4946-86e3-1f5bbc934661",
    "d9b9e056-7004-470b-bf21-1635e98487da",
  );
}

async function main(): Promise<void> {
  await getAccessReview();
}

main().catch(console.error);
