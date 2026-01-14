// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for List all ResourceHealthMetadata for all sites in the subscription.
 *
 * @summary Description for List all ResourceHealthMetadata for all sites in the subscription.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/ListResourceHealthMetadataBySubscription.json
 */
async function listResourceHealthMetadataForASubscription() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceHealthMetadataOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listResourceHealthMetadataForASubscription();
}

main().catch(console.error);
