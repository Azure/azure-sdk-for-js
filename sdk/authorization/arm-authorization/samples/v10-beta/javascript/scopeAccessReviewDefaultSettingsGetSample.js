// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review default settings for the subscription
 *
 * @summary get access review default settings for the subscription
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewDefaultSettings.json
 */
async function getAccessReviewDefaultSettings() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewDefaultSettings.get(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
  );
  console.log(result);
}

async function main() {
  await getAccessReviewDefaultSettings();
}

main().catch(console.error);
