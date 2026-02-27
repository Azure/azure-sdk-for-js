// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Start capturing network packets for the site.
 *
 * @summary description for Start capturing network packets for the site.
 * x-ms-original-file: 2025-05-01/StartWebSiteNetworkTraceOperation.json
 */
async function startANewNetworkTraceOperationForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.startWebSiteNetworkTraceOperation("testrg123", "SampleApp", {
    durationInSeconds: 60,
  });
}

async function main() {
  await startANewNetworkTraceOperationForASite();
}

main().catch(console.error);
