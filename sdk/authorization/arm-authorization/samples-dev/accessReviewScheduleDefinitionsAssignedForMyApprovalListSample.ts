// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get access review instances assigned for my approval.
 *
 * @summary Get access review instances assigned for my approval.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/GetAccessReviewScheduleDefinitionsAssignedForMyApproval.json
 */

import type { AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAccessReviews(): Promise<void> {
  const filter = "assignedToMeToReview()";
  const options: AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.accessReviewScheduleDefinitionsAssignedForMyApproval.list(
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
