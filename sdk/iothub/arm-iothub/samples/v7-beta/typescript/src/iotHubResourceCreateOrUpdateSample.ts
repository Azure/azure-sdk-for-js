// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 *
 * @summary create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_IoTHub_With_DeviceRegistry.json
 */
async function createOrReplaceIoTHubWithDeviceRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createOrUpdate("myResourceGroup", "testHub", {
    etag: "AAAAAAFD6M4=",
    location: "centraluseuap",
    properties: {
      cloudToDevice: {
        defaultTtlAsIso8601: "PT1H",
        feedback: { lockDurationAsIso8601: "PT1M", maxDeliveryCount: 10, ttlAsIso8601: "PT1H" },
        maxDeliveryCount: 10,
      },
      deviceRegistry: {
        identityResourceId:
          "/subscriptions/ae24ff83-d2ca-4fc8-9717-05dae4bba489/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testIdentity",
        namespaceResourceId:
          "/subscriptions/ae24ff83-d2ca-4fc8-9717-05dae4bba489/resourceGroups/myResourceGroup/providers/Microsoft.DeviceRegistry/namespaces/testNamespace",
      },
      enableDataResidency: true,
      enableFileUploadNotifications: false,
      eventHubEndpoints: { events: { partitionCount: 2, retentionTimeInDays: 1 } },
      features: "None",
      ipFilterRules: [],
      ipVersion: "ipv4ipv6",
      messagingEndpoints: {
        fileNotifications: {
          lockDurationAsIso8601: "PT1M",
          maxDeliveryCount: 10,
          ttlAsIso8601: "PT1H",
        },
      },
      minTlsVersion: "1.2",
      networkRuleSets: {
        applyToBuiltInEventHubEndpoint: true,
        defaultAction: "Deny",
        ipRules: [
          { action: "Allow", filterName: "rule1", ipMask: "131.117.159.53" },
          { action: "Allow", filterName: "rule2", ipMask: "157.55.59.128/25" },
        ],
      },
      rootCertificate: { enableRootCertificateV2: true },
      routing: {
        endpoints: {
          eventHubs: [],
          serviceBusQueues: [],
          serviceBusTopics: [],
          storageContainers: [],
        },
        fallbackRoute: {
          name: "$fallback",
          condition: "true",
          endpointNames: ["events"],
          isEnabled: true,
          source: "DeviceMessages",
        },
        routes: [],
      },
      storageEndpoints: {
        $default: { connectionString: "", containerName: "", sasTtlAsIso8601: "PT1H" },
      },
    },
    sku: { name: "GEN2", capacity: 1 },
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 *
 * @summary create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_createOrUpdate.json
 */
async function iotHubResourceCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createOrUpdate("myResourceGroup", "testHub", {
    etag: "AAAAAAFD6M4=",
    location: "centraluseuap",
    properties: {
      cloudToDevice: {
        defaultTtlAsIso8601: "PT1H",
        feedback: { lockDurationAsIso8601: "PT1M", maxDeliveryCount: 10, ttlAsIso8601: "PT1H" },
        maxDeliveryCount: 10,
      },
      enableDataResidency: true,
      enableFileUploadNotifications: false,
      eventHubEndpoints: { events: { partitionCount: 2, retentionTimeInDays: 1 } },
      features: "None",
      ipFilterRules: [],
      ipVersion: "ipv4ipv6",
      messagingEndpoints: {
        fileNotifications: {
          lockDurationAsIso8601: "PT1M",
          maxDeliveryCount: 10,
          ttlAsIso8601: "PT1H",
        },
      },
      minTlsVersion: "1.2",
      networkRuleSets: {
        applyToBuiltInEventHubEndpoint: true,
        defaultAction: "Deny",
        ipRules: [
          { action: "Allow", filterName: "rule1", ipMask: "131.117.159.53" },
          { action: "Allow", filterName: "rule2", ipMask: "157.55.59.128/25" },
        ],
      },
      rootCertificate: { enableRootCertificateV2: true },
      routing: {
        endpoints: {
          eventHubs: [],
          serviceBusQueues: [],
          serviceBusTopics: [],
          storageContainers: [],
        },
        fallbackRoute: {
          name: "$fallback",
          condition: "true",
          endpointNames: ["events"],
          isEnabled: true,
          source: "DeviceMessages",
        },
        routes: [],
      },
      storageEndpoints: {
        $default: { connectionString: "", containerName: "", sasTtlAsIso8601: "PT1H" },
      },
    },
    sku: { name: "S1", capacity: 1 },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceIoTHubWithDeviceRegistry();
  await iotHubResourceCreateOrUpdate();
}

main().catch(console.error);
