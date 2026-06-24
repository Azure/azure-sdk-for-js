// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review instance contacted reviewers
 *
 * @summary get access review instance contacted reviewers
 * x-ms-original-file: 2021-12-01-preview/TenantLevelGetAccessReviewInstanceContactedReviewers.json
 */
async function getAccessReviews() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.tenantLevelAccessReviewInstanceContactedReviewers.list(
    "265785a7-a81f-4201-8a18-bb0db95982b7",
    "f25ed880-9c31-4101-bc57-825d8df3b58c",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAccessReviews();
}

main().catch(console.error);
