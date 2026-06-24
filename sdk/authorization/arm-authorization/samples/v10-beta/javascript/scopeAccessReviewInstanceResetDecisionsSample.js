// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to an action to reset all decisions for an access review instance.
 *
 * @summary an action to reset all decisions for an access review instance.
 * x-ms-original-file: 2021-12-01-preview/AccessReviewInstanceResetDecisions.json
 */
async function getAccessReview() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.scopeAccessReviewInstance.resetDecisions(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "d9b9e056-7004-470b-bf21-1635e98487da",
  );
}

async function main() {
  await getAccessReview();
}

main().catch(console.error);
