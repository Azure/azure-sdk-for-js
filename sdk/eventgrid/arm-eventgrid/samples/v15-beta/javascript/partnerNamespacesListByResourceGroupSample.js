// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the partner namespaces under a resource group.
 *
 * @summary list all the partner namespaces under a resource group.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_ListByResourceGroup.json
 */
async function partnerNamespacesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.partnerNamespaces.listByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await partnerNamespacesListByResourceGroup();
}

main().catch(console.error);
