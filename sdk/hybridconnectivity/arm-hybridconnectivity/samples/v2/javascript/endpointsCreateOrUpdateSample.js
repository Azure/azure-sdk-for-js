// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the endpoint to the target resource.
 *
 * @summary create or update the endpoint to the target resource.
 * x-ms-original-file: 2027-01-01/Endpoints_CreateOrUpdate_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsPutCustomGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.createOrUpdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "qlgk",
    {
      properties: {
        type: "custom",
        resourceId:
          "/subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.Relay/namespaces/custom-relay-namespace",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the endpoint to the target resource.
 *
 * @summary create or update the endpoint to the target resource.
 * x-ms-original-file: 2027-01-01/Endpoints_CreateOrUpdate_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsPutCustomGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.createOrUpdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "brvzkuhspeph",
    {},
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPutCustomGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsPutCustomGeneratedByMinimumSetRule();
}

main().catch(console.error);
