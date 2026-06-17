// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review instances
 *
 * @summary get access review instances
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewInstance.json
 */
async function getAccessReviews() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewInstances.getById(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "4135f961-be78-4005-8101-c72a5af307a2",
  );
  console.log(result);
}

async function main() {
  await getAccessReviews();
}

main().catch(console.error);
