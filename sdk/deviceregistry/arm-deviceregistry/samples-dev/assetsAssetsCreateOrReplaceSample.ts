// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Asset
 *
 * @summary create a Asset
 * x-ms-original-file: 2024-11-01/Create_Asset_With_DiscoveredAssetRef.json
 */
async function createAssetWithDiscoveredAssetRefs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_createOrReplace("myResourceGroup", "my-asset", {
    location: "West Europe",
    extendedLocation: {
      type: "CustomLocation",
      name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
    },
    tags: { site: "building-1" },
    properties: {
      enabled: true,
      externalAssetId: "8ZBA6LRHU0A458969",
      displayName: "AssetDisplayName",
      description: "This is a sample Asset",
      assetEndpointProfileRef: "myAssetEndpointProfile",
      manufacturer: "Contoso",
      manufacturerUri: "https://www.contoso.com/manufacturerUri",
      model: "ContosoModel",
      productCode: "SA34VDG",
      hardwareRevision: "1.0",
      softwareRevision: "2.0",
      documentationUri: "https://www.example.com/manual",
      serialNumber: "64-103816-519918-8",
      discoveredAssetRefs: ["discoveredAsset1", "discoveredAsset2"],
      defaultDatasetsConfiguration:
        '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
      defaultEventsConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
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
              observabilityMode: "Counter",
              dataPointConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            },
            {
              name: "dataPoint2",
              dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt2",
              observabilityMode: "None",
              dataPointConfiguration: '{"publishingInterval":4,"samplingInterval":4,"queueSize":7}',
            },
          ],
        },
      ],
      events: [
        {
          name: "event1",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
          observabilityMode: "None",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
          topic: { path: "/path/event1", retain: "Keep" },
        },
        {
          name: "event2",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
          observabilityMode: "Log",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":8,"queueSize":4}',
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Asset
 *
 * @summary create a Asset
 * x-ms-original-file: 2024-11-01/Create_Asset_With_ExternalAssetId.json
 */
async function createAssetWithExternalAssetId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_createOrReplace("myResourceGroup", "my-asset", {
    location: "West Europe",
    extendedLocation: {
      type: "CustomLocation",
      name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
    },
    tags: { site: "building-1" },
    properties: {
      enabled: true,
      externalAssetId: "8ZBA6LRHU0A458969",
      displayName: "AssetDisplayName",
      description: "This is a sample Asset",
      assetEndpointProfileRef: "myAssetEndpointProfile",
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
      defaultEventsConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
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
              observabilityMode: "Counter",
              dataPointConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            },
            {
              name: "dataPoint2",
              dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt2",
              observabilityMode: "None",
              dataPointConfiguration: '{"publishingInterval":4,"samplingInterval":4,"queueSize":7}',
            },
          ],
        },
      ],
      events: [
        {
          name: "event1",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
          observabilityMode: "None",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
          topic: { path: "/path/event1", retain: "Keep" },
        },
        {
          name: "event2",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
          observabilityMode: "Log",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":8,"queueSize":4}',
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Asset
 *
 * @summary create a Asset
 * x-ms-original-file: 2024-11-01/Create_Asset_Without_DisplayName.json
 */
async function createAssetWithoutDisplayName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_createOrReplace("myResourceGroup", "my-asset", {
    location: "West Europe",
    extendedLocation: {
      type: "CustomLocation",
      name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
    },
    tags: { site: "building-1" },
    properties: {
      enabled: true,
      externalAssetId: "8ZBA6LRHU0A458969",
      description: "This is a sample Asset",
      assetEndpointProfileRef: "myAssetEndpointProfile",
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
      defaultEventsConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
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
              observabilityMode: "Counter",
              dataPointConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            },
            {
              name: "dataPoint2",
              dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt2",
              observabilityMode: "None",
              dataPointConfiguration: '{"publishingInterval":4,"samplingInterval":4,"queueSize":7}',
            },
          ],
        },
      ],
      events: [
        {
          name: "event1",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
          observabilityMode: "None",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
          topic: { path: "/path/event1", retain: "Keep" },
        },
        {
          name: "event2",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
          observabilityMode: "Log",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":8,"queueSize":4}',
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Asset
 *
 * @summary create a Asset
 * x-ms-original-file: 2024-11-01/Create_Asset_Without_ExternalAssetId.json
 */
async function createAssetWithoutExternalAssetId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assets.Assets_createOrReplace("myResourceGroup", "my-asset", {
    location: "West Europe",
    extendedLocation: {
      type: "CustomLocation",
      name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
    },
    tags: { site: "building-1" },
    properties: {
      enabled: true,
      displayName: "AssetDisplayName",
      description: "This is a sample Asset",
      assetEndpointProfileRef: "myAssetEndpointProfile",
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
      defaultEventsConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
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
              observabilityMode: "Counter",
              dataPointConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            },
            {
              name: "dataPoint2",
              dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt2",
              observabilityMode: "None",
              dataPointConfiguration: '{"publishingInterval":4,"samplingInterval":4,"queueSize":7}',
            },
          ],
        },
      ],
      events: [
        {
          name: "event1",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
          observabilityMode: "None",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
          topic: { path: "/path/event1", retain: "Keep" },
        },
        {
          name: "event2",
          eventNotifier: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
          observabilityMode: "Log",
          eventConfiguration: '{"publishingInterval":7,"samplingInterval":8,"queueSize":4}',
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAssetWithDiscoveredAssetRefs();
  createAssetWithExternalAssetId();
  createAssetWithoutDisplayName();
  createAssetWithoutExternalAssetId();
}

main().catch(console.error);
