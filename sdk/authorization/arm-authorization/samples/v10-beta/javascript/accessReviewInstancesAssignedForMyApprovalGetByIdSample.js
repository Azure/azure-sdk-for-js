// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get single access review instance assigned for my approval.
 *
 * @summary get single access review instance assigned for my approval.
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewInstanceAssignedForMyApproval.json
 */
async function getAccessReviews() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.accessReviewInstancesAssignedForMyApproval.getById(
    "488a6d0e-0a63-4946-86e3-1f5bbc934661",
    "4135f961-be78-4005-8101-c72a5af307a2",
  );
  console.log(result);
}

async function main() {
  await getAccessReviews();
}

main().catch(console.error);
