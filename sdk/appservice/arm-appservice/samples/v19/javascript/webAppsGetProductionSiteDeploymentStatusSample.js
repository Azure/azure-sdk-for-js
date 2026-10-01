// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the deployment status for an app (or deployment slot, if specified).
 *
 * @summary gets the deployment status for an app (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/GetSiteDeploymentStatus.json
 */
async function getDeploymentStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getProductionSiteDeploymentStatus(
    "rg",
    "testSite",
    "eacfd68b-3bbd-4ad9-99c5-98614d89c8e5",
  );
  console.log(result);
}

async function main() {
  await getDeploymentStatus();
}

main().catch(console.error);
