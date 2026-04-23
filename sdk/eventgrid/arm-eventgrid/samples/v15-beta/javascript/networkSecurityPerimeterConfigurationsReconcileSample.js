// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconcile a specific network security perimeter configuration for a given network security perimeter association with a topic or domain.
 *
 * @summary reconcile a specific network security perimeter configuration for a given network security perimeter association with a topic or domain.
 * x-ms-original-file: 2025-07-15-preview/NetworkSecurityPerimeterConfigurations_Reconcile.json
 */
async function networkSecurityPerimeterConfigurationsReconcile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.reconcile(
    "examplerg",
    "topics",
    "exampleResourceName",
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40perimeter",
    "someAssociation",
  );
  console.log(result);
}

async function main() {
  await networkSecurityPerimeterConfigurationsReconcile();
}

main().catch(console.error);
