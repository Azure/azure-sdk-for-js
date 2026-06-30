// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicepreparedimagespecification");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the prepared image specifications in a resource group at the latest version.
 *
 * @summary list the prepared image specifications in a resource group at the latest version.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_ListByResourceGroup.json
 */
async function preparedImageSpecificationsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.preparedImageSpecifications.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await preparedImageSpecificationsListByResourceGroup();
}

main().catch(console.error);
