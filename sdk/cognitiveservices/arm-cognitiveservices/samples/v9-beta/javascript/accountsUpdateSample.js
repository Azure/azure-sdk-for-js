// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Cognitive Services account
 *
 * @summary updates a Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/UpdateAccount.json
 */
async function updateAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("bvttest", "bingSearch", {
    location: "global",
    sku: { name: "S2" },
  });
  console.log(result);
}

async function main() {
  await updateAccount();
}

main().catch(console.error);
