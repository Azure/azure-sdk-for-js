// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list deployment statuses for an app (or deployment slot, if specified).
 *
 * @summary list deployment statuses for an app (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/ListSiteDeploymentStatus.json
 */
async function listDeploymentStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listProductionSiteDeploymentStatuses("rg", "testSite")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeploymentStatus();
}

main().catch(console.error);
