// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review instances assigned for my approval.
 *
 * @summary get access review instances assigned for my approval.
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewInstancesAssignedForMyApproval.json
 */
async function getAccessReviews() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.accessReviewInstancesAssignedForMyApproval.list(
    "488a6d0e-0a63-4946-86e3-1f5bbc934661",
    { filter: "assignedToMeToReview()" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAccessReviews();
}

main().catch(console.error);
