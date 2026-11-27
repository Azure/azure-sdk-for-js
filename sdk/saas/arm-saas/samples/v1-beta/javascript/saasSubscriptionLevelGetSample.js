// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a SaaS resource by its name.
 *
 * @summary gets a SaaS resource by its name.
 * x-ms-original-file: 2026-04-01/SaasGet.json
 */
async function getASaaSSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.get("myResourceGroup", "mySaasResource");
  console.log(result);
}

async function main() {
  await getASaaSSubscriptionLevelResource();
}

main().catch(console.error);
