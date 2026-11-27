// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SaaS resource.
 *
 * @summary deletes a SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasDelete.json
 */
async function deleteASaaSSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  await client.saasSubscriptionLevel.delete("myResourceGroup", "mySaasResource");
}

async function main() {
  await deleteASaaSSubscriptionLevelResource();
}

main().catch(console.error);
