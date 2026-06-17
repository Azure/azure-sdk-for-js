// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review schedule definitions
 *
 * @summary get access review schedule definitions
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewScheduleDefinitions.json
 */
async function getAccessReviews() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scopeAccessReviewScheduleDefinitions.list(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAccessReviews();
}

main().catch(console.error);
