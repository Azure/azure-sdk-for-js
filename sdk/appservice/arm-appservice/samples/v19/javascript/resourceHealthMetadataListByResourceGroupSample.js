// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for List all ResourceHealthMetadata for all sites in the resource group in the subscription.
 *
 * @summary description for List all ResourceHealthMetadata for all sites in the resource group in the subscription.
 * x-ms-original-file: 2025-05-01/ListResourceHealthMetadataByResourceGroup.json
 */
async function listResourceHealthMetadataForAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceHealthMetadata.listByResourceGroup(
    "Default-Web-NorthCentralUS",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResourceHealthMetadataForAResourceGroup();
}

main().catch(console.error);
