// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NamespaceAsset
 *
 * @summary create a NamespaceAsset
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceAsset.json
 */
async function createOrReplaceNamespaceAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceAssets.createOrReplace(
    "myResourceGroup",
    "my-namespace-1",
    "my-asset-1",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        deviceRef: { deviceName: "device1", endpointName: "opcuaendpointname" },
        assetTypeRefs: ["myAssetTypeRef1", "myAssetTypeRef2"],
        enabled: true,
        externalAssetId: "8ZBA6LRHU0A458969",
        displayName: "AssetDisplayName",
        description: "This is a sample Asset",
        manufacturer: "Contoso",
        manufacturerUri: "https://www.contoso.com/manufacturerUri",
        model: "ContosoModel",
        productCode: "SA34VDG",
        hardwareRevision: "1.0",
        softwareRevision: "2.0",
        documentationUri: "https://www.example.com/manual",
        serialNumber: "64-103816-519918-8",
        attributes: { floor: "1" },
        discoveredAssetRefs: ["discoveredAsset1"],
        defaultDatasetsConfiguration:
          '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
        defaultEventsConfiguration:
          '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
        defaultStreamsConfiguration:
          '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
        defaultManagementGroupsConfiguration: '{"retryCount":10,"retryBackoffInterval":15}',
        defaultDatasetsDestinations: [
          {
            target: "BrokerStateStore",
            configuration: { key: "defaultValue" },
          },
        ],
        defaultEventsDestinations: [{ target: "Storage", configuration: { path: "/tmp" } }],
        defaultStreamsDestinations: [
          {
            target: "Mqtt",
            configuration: {
              topic: "/contoso/test",
              retain: "Never",
              qos: "Qos0",
              ttl: 3600,
            },
          },
        ],
        datasets: [
          {
            name: "dataset1",
            dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/Oven;i=5",
            typeRef: "dataset1TypeRef",
            datasetConfiguration: '{"publishingInterval":10,"samplingInterval":15,"queueSize":20}',
            destinations: [
              {
                target: "BrokerStateStore",
                configuration: { key: "dataset1" },
              },
            ],
            dataPoints: [
              {
                name: "dataset1DataPoint1",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt3",
                dataPointConfiguration:
                  '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
                typeRef: "dataset1DataPoint1TypeRef",
              },
              {
                name: "dataset1DataPoint2",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt4",
                dataPointConfiguration:
                  '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
                typeRef: "dataset1DataPoint2TypeRef",
              },
            ],
          },
        ],
        eventGroups: [
          {
            name: "default",
            events: [
              {
                name: "event1",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt5",
                eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
                destinations: [
                  {
                    target: "Mqtt",
                    configuration: {
                      topic: "/contoso/testEvent1",
                      retain: "Keep",
                      qos: "Qos0",
                      ttl: 7200,
                    },
                  },
                ],
                typeRef: "event1Ref",
              },
              {
                name: "event2",
                dataSource: "nsu=http://microsoft.com/Opc/OpcPlc/;s=FastUInt8",
                eventConfiguration: '{"publishingInterval":7,"samplingInterval":1,"queueSize":8}',
                destinations: [{ target: "Storage", configuration: { path: "/tmp/event2" } }],
                typeRef: "event2Ref",
              },
            ],
          },
        ],
        streams: [
          {
            name: "stream1",
            streamConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            typeRef: "stream1TypeRef",
            destinations: [{ target: "Storage", configuration: { path: "/tmp/stream1" } }],
          },
          {
            name: "stream2",
            streamConfiguration: '{"publishingInterval":8,"samplingInterval":8,"queueSize":4}',
            typeRef: "stream2TypeRef",
            destinations: [
              {
                target: "Mqtt",
                configuration: {
                  topic: "/contoso/testStream2",
                  retain: "Never",
                  qos: "Qos0",
                  ttl: 7200,
                },
              },
            ],
          },
        ],
        managementGroups: [
          {
            name: "managementGroup1",
            managementGroupConfiguration: '{"retryCount":10,"retryBackoffInterval":15}',
            typeRef: "managementGroup1TypeRef",
            defaultTopic: "/contoso/managementGroup1",
            defaultTimeoutInSeconds: 100,
            actions: [
              {
                name: "action1",
                actionConfiguration: '{"retryCount":5,"retryBackoffInterval":5}',
                targetUri: "/onvif/device_service?ONVIFProfile=Profile1",
                topic: "/contoso/managementGroup1/action1",
                typeRef: "action1TypeRef",
                actionType: "Call",
                timeoutInSeconds: 60,
              },
              {
                name: "action2",
                actionConfiguration: '{"retryCount":5,"retryBackoffInterval":5}',
                targetUri: "/onvif/device_service?ONVIFProfile=Profile2",
                topic: "/contoso/managementGroup1/action2",
                typeRef: "action2TypeRef",
                actionType: "Call",
                timeoutInSeconds: 60,
              },
            ],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceNamespaceAsset();
}

main().catch(console.error);
