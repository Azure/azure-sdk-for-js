// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Professional Service resources within a resource group.
 *
 * @summary lists all Professional Service resources within a resource group.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceListByResourceGroup.json
 */
async function listProfessionalServiceSubscriptionLevelResourcesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.professionalServiceSubscriptionLevel.listByResourceGroup(
    "myResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProfessionalServiceSubscriptionLevelResourcesByResourceGroup();
}

main().catch(console.error);
