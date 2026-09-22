// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconciles the specified NSP configuration for the specified data collection endpoint.
 *
 * @summary reconciles the specified NSP configuration for the specified data collection endpoint.
 * x-ms-original-file: 2021-10-01/NSPForDataCollectionEndpoints_Reconcile.json
 */
async function reconcileNSPConfigForDataCollectionEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.dataCollectionEndpoints.reconcileNSP(
    "exampleRG",
    "someDataCollectionEndpoint",
    "somePerimeterConfiguration",
  );
}

async function main() {
  await reconcileNSPConfigForDataCollectionEndpoint();
}

main().catch(console.error);
