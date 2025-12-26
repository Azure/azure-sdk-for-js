// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a EdgeDevice
 *
 * @summary create a EdgeDevice
 * x-ms-original-file: 2025-12-01-preview/CreateHciEdgeDevice.json
 */
async function createHCIEdgeDevice() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDevices.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "default",
    {
      kind: "HCI",
      properties: {
        deviceConfiguration: {
          deviceMetadata: "",
          nicDetails: [
            {
              adapterName: "ethernet",
              componentId: "VMBUS{f8615163-df3e-46c5-913f-f2d2f965ed0g} ",
              defaultGateway: "10.10.10.1",
              defaultIsolationId: "0",
              dnsServers: ["100.10.10.1"],
              driverVersion: "10.0.20348.1547 ",
              interfaceDescription: "NDIS 6.70 ",
              ip4Address: "10.10.10.10",
              subnetMask: "255.255.255.0",
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createHCIEdgeDevice();
}

main().catch(console.error);
