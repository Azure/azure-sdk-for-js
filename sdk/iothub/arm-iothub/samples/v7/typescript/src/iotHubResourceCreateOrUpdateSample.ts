// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 *
 * @summary create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 * x-ms-original-file: 2026-11-01/CreateOrReplace_IotHub.json
 */
async function createOrReplaceIotHub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createOrUpdate("myResourceGroup", "testHub", {
    location: "centraluseuap",
    tags: {},
    etag: "AAAAAAFD6M4=",
    properties: {
      ipFilterRules: [],
      networkRuleSets: {
        defaultAction: "Deny",
        applyToBuiltInEventHubEndpoint: true,
        ipRules: [
          { filterName: "rule1", action: "Allow", ipMask: "131.117.159.53" },
          { filterName: "rule2", action: "Allow", ipMask: "157.55.59.128/25" },
        ],
      },
      eventHubEndpoints: { events: { retentionTimeInDays: 1, partitionCount: 2 } },
      routing: {
        endpoints: {
          serviceBusQueues: [],
          serviceBusTopics: [],
          eventHubs: [],
          storageContainers: [],
        },
        routes: [
          {
            name: "Routeid",
            source: "DeviceMessages",
            condition: "true",
            endpointNames: ["events"],
            isEnabled: true,
          },
        ],
        fallbackRoute: {
          name: "$fallback",
          source: "DeviceMessages",
          condition: "true",
          endpointNames: ["events"],
          isEnabled: true,
        },
      },
      storageEndpoints: {
        $default: { sasTtlAsIso8601: "PT1H", connectionString: "", containerName: "" },
      },
      messagingEndpoints: {
        fileNotifications: {
          lockDurationAsIso8601: "PT1M",
          ttlAsIso8601: "PT1H",
          maxDeliveryCount: 10,
        },
      },
      enableFileUploadNotifications: false,
      cloudToDevice: {
        maxDeliveryCount: 10,
        defaultTtlAsIso8601: "PT1H",
        feedback: { lockDurationAsIso8601: "PT1M", ttlAsIso8601: "PT1H", maxDeliveryCount: 10 },
      },
      features: "None",
      minTlsVersion: "1.2",
      enableDataResidency: true,
    },
    sku: { name: "S1", capacity: 1 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 *
 * @summary create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub.
 * x-ms-original-file: 2026-11-01/iothub_createOrUpdate.json
 */
async function iotHubResourceCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createOrUpdate("myResourceGroup", "testHub", {
    etag: "AAAAAAFD6M4=",
    location: "centraluseuap",
    identity: { type: "SystemAssigned" },
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
      routing: {
        endpoints: {
          eventHubs: [],
          serviceBusQueues: [],
          serviceBusTopics: [],
          storageContainers: [],
          eventStreams: [
            {
              name: "eventstreamendpoint1",
              endpointUri: "sb://eventstreamcustomsourceehns.azure.servicebus.net",
              entityPath: "eventstreamcustomsourceeh",
              authenticationType: "identityBased",
              workspaceId: "11111111-1111-1111-1111-111111111111",
              eventStreamId: "22222222-2222-2222-2222-222222222222",
              sourceId: "33333333-3333-3333-3333-333333333333",
            },
          ],
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
  await createOrReplaceIotHub();
  await iotHubResourceCreateOrUpdate();
}

main().catch(console.error);
