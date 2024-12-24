// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DiscoveredAsset
 *
 * @summary create a DiscoveredAsset
 * x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAsset.json
 */
async function createDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssets.createOrReplace(
    "myResourceGroup",
    "my-discoveredasset",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        assetEndpointProfileRef: "myAssetEndpointProfile",
        discoveryId: "11111111-1111-1111-1111-111111111111",
        version: 73766,
        manufacturer: "Contoso",
        manufacturerUri: "https://www.contoso.com/manufacturerUri",
        model: "ContosoModel",
        productCode: "SA34VDG",
        hardwareRevision: "1.0",
        softwareRevision: "2.0",
        documentationUri: "https://www.example.com/manual",
        serialNumber: "64-103816-519918-8",
        defaultDatasetsConfiguration:
          '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
        defaultEventsConfiguration:
          '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
        defaultTopic: { path: "/path/defaultTopic", retain: "Keep" },
        datasets: [
          {
            name: "dataset1",
            datasetConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
            topic: { path: "/path/dataset1", retain: "Keep" },
            dataPoints: [
              {
                name: "dataPoint1",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt1",
                dataPointConfiguration:
                  '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
              },
              {
                name: "dataPoint2",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt2",
                dataPointConfiguration:
                  '{"publishingInterval":4,"samplingInterval":4,"queueSize":7}',
              },
            ],
          },
        ],
        events: [
          {
            name: "event1",
            eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
            eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
            topic: { path: "/path/event1", retain: "Keep" },
          },
          {
            name: "event2",
            eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
            eventConfiguration: '{"publishingInterval":7,"samplingInterval":8,"queueSize":4}',
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  createDiscoveredAsset();
}

main().catch(console.error);
