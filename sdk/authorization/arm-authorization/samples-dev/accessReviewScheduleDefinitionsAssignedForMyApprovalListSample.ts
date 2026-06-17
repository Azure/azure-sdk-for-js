// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get access review instances assigned for my approval.
 *
 * @summary get access review instances assigned for my approval.
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewScheduleDefinitionsAssignedForMyApproval.json
 */
async function getAccessReviews(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.accessReviewScheduleDefinitionsAssignedForMyApproval.list({
    filter: "assignedToMeToReview()",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
