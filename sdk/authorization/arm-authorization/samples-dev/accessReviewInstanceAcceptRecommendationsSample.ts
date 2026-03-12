// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to An action to accept recommendations for decision in an access review instance.
 *
 * @summary An action to accept recommendations for decision in an access review instance.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/AccessReviewInstanceAcceptRecommendations.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAccessReview(): Promise<void> {
  const scheduleDefinitionId = "488a6d0e-0a63-4946-86e3-1f5bbc934661";
  const id = "d9b9e056-7004-470b-bf21-1635e98487da";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.accessReviewInstanceOperations.acceptRecommendations(
    scheduleDefinitionId,
    id,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReview();
}

main().catch(console.error);
