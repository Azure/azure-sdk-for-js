// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Subscription keys.
 *
 * @summary gets the specified Subscription keys.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementSubscriptionListSecrets.json
 */
async function apiManagementSubscriptionListSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.subscription.listSecrets(
    "rg1",
    "apimService1",
    "5931a769d8d14f0ad8ce13b8",
  );
  console.log(result);
}

async function main() {
  await apiManagementSubscriptionListSecrets();
}

main().catch(console.error);
