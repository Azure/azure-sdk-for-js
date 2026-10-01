// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list usages in cores for all skus used by a subscription in a given location, for a specific quota type.
 *
 * @summary list usages in cores for all skus used by a subscription in a given location, for a specific quota type.
 * x-ms-original-file: 2025-05-01/GetUsagesInLocation.json
 */
async function getUsagesInLocationForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.getUsagesInLocation.list("West US")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getUsagesInLocationForSubscription();
}

main().catch(console.error);
