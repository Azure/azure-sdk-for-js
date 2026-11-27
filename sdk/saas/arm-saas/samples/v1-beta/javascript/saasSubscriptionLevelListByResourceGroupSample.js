// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all SaaS resources within a resource group.
 *
 * @summary lists all SaaS resources within a resource group.
 * x-ms-original-file: 2026-04-01/SaasListByResourceGroup.json
 */
async function listSaaSSubscriptionLevelResourcesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.saasSubscriptionLevel.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSaaSSubscriptionLevelResourcesByResourceGroup();
}

main().catch(console.error);
