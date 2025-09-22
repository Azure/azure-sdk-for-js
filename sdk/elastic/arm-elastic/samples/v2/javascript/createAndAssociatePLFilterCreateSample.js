// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create and associate a PL filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary create and associate a PL filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: 2025-06-01/PrivateLinkTrafficFilters_Create.json
 */
async function createAndAssociatePLFilterCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.createAndAssociatePLFilter.create("myResourceGroup", "myMonitor", {
    privateEndpointGuid: "fdb54d3b-e85e-4d08-8958-0d2f7g523df9",
    privateEndpointName: "myPrivateEndpoint",
  });
}

async function main() {
  await createAndAssociatePLFilterCreate();
}

main().catch(console.error);
