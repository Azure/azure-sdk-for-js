// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the endpoint to the target resource.
 *
 * @summary update the endpoint to the target resource.
 * x-ms-original-file: 2027-01-01/Endpoints_Update_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsPatchDefaultGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.update(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "rukckncxq",
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
 * This sample demonstrates how to update the endpoint to the target resource.
 *
 * @summary update the endpoint to the target resource.
 * x-ms-original-file: 2027-01-01/Endpoints_Update_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsPatchDefaultGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.update(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "xmbtuwprx",
    {},
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPatchDefaultGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsPatchDefaultGeneratedByMinimumSetRule();
}

main().catch(console.error);
