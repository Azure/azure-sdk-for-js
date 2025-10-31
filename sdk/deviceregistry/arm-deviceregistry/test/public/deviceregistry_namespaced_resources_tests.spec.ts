/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { DeviceRegistryManagementClient } from "../../src/deviceRegistryManagementClient.js";
import { 
  AssetEndpointProfile,
  Namespace, 
  NamespaceAsset, 
  NamespaceDevice, 
  NamespaceUpdate,
  NamespaceAssetUpdate,
  NamespaceDeviceUpdate,
  NamespaceDiscoveredAsset,
  NamespaceDiscoveredDevice,
  NamespaceDiscoveredAssetUpdate,
  NamespaceDiscoveredDeviceUpdate,
  Asset,
  NamespaceMigrateRequest,
} from "../../src/index.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DeviceRegistry Namespaced Resources tests", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let resourceGroupName: string;
  let location: string;
  let extendedLocationName: string;
  let client: DeviceRegistryManagementClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    const tenantId = assertEnvironmentVariable("AZURE_TENANT_ID");
    subscriptionId = assertEnvironmentVariable("SUBSCRIPTION_ID");
    resourceGroupName = assertEnvironmentVariable("RESOURCE_GROUP_NAME");
    location = assertEnvironmentVariable("LOCATION");
    extendedLocationName = assertEnvironmentVariable("EXTENDED_LOCATION");

    // This is an example of how the environment variables are used
    const credential = createTestCredential({ tenantId });
    client = new DeviceRegistryManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });
  it("Namespace Resources CRUD operations tests", async () => {
    const namespaceName = "test-namespace-js";

    // Create Namespace
    console.log("Creating namespace resource...");
    const nsProperties: Namespace = {
      location,
      identity: { type: "None" },
      properties: {
        messaging: {
          endpoints: {
            "myendpoint1": {
              address: "https://myendpoint1.westeurope-1.iothub.azure.net",
              endpointType: "azure-iot-edge",
              resourceId: `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.IotHub/namespaces/contoso-hub-namespace1`,
            },
          }
        }
      }
    };
    const nsCreateResponse = client.namespaces.createOrReplace(resourceGroupName, namespaceName, nsProperties);
    const nsCreateResult = await nsCreateResponse.pollUntilDone();
    assert.equal(nsCreateResult.name, namespaceName);
    assert.equal(nsCreateResult.properties?.messaging?.endpoints?.["myendpoint1"].address, nsProperties.properties!.messaging!.endpoints!["myendpoint1"].address);

    // Update Namespace
    console.log("Updating namespace...")
    const nsUpdateProperties: NamespaceUpdate = {
      properties: {
        messaging: {
          endpoints: {
            "myendpoint2": {
              address: "https://myendpoint2.westeurope-1.iothub.azure.net",
              endpointType: "azure-iot-edge",
              resourceId: `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.IotHub/namespaces/contoso-hub-namespace2`,
            },
          }
        }
      }
    };
    const nsUpdateResponse =client.namespaces.update(resourceGroupName, namespaceName, nsUpdateProperties);
    const nsUpdateResult = await nsUpdateResponse.pollUntilDone();
    assert.equal(nsUpdateResult.name, namespaceName);
    assert.equal(nsCreateResult.properties?.messaging?.endpoints?.["myendpoint1"].address, nsProperties.properties!.messaging!.endpoints!["myendpoint1"].address);
    assert.equal(nsUpdateResult.properties?.messaging?.endpoints?.["myendpoint2"].address, nsUpdateProperties.properties!.messaging!.endpoints!["myendpoint2"].address);

    // Get Namespace
    console.log("Getting namespace resource...");
    const nsGetResult = await client.namespaces.get(resourceGroupName, namespaceName);
    assert.equal(nsGetResult.name, namespaceName);
    assert.equal(nsGetResult.properties?.messaging?.endpoints?.["myendpoint1"].address, nsProperties.properties!.messaging!.endpoints!["myendpoint1"].address);
    assert.equal(nsGetResult.properties?.messaging?.endpoints?.["myendpoint2"].address, nsUpdateProperties.properties!.messaging!.endpoints!["myendpoint2"].address);

    // List Namespaces by Resource Group
    console.log("Listing namespace resources...");
    const nsListResults: Namespace[] = [];
    const nsListResponse = client.namespaces.listByResourceGroup(resourceGroupName);
    for await (const ns of nsListResponse) {
      nsListResults.push(ns);
    }
    assert.ok(nsListResults.length > 0);

    // Create Namespace Device
    console.log("Creating namespace device...");
    const nsDeviceName = "test-namespace-device-js";
    const nsDeviceProperties: NamespaceDevice = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        manufacturer: "Contoso",
        model: "Model X",
        operatingSystem: "Linux",
        operatingSystemVersion: "18.04",
        endpoints: {
          inbound: {
            "myendpoint1": {
              address: "https://myendpoint1.westeurope-1.iothub.azure.net",
              endpointType: "azure-iot-edge",
            }
          }
        }
      }
    };
    const nsDeviceCreateResponse = client.namespaceDevices.createOrReplace(resourceGroupName, namespaceName, nsDeviceName, nsDeviceProperties);
    const nsDeviceCreateResult = await nsDeviceCreateResponse.pollUntilDone();
    assert.equal(nsDeviceCreateResult.name, nsDeviceName);
    assert.equal(nsDeviceCreateResult.properties?.manufacturer, nsDeviceProperties.properties!.manufacturer);
    assert.equal(nsDeviceCreateResult.properties?.model, nsDeviceProperties.properties!.model);
    assert.equal(nsDeviceCreateResult.properties?.operatingSystem, nsDeviceProperties.properties!.operatingSystem);
    assert.equal(nsDeviceCreateResult.properties?.operatingSystemVersion, nsDeviceProperties.properties!.operatingSystemVersion);
    assert.equal(nsDeviceCreateResult.properties?.endpoints?.inbound?.["myendpoint1"].address, nsDeviceProperties.properties!.endpoints!.inbound!["myendpoint1"].address);

    // Update Namespace Device
    console.log("Updating namespace device...");
    const nsDeviceUpdateProperties: NamespaceDeviceUpdate = {
      properties: {
        operatingSystemVersion: "20.04",
        enabled: false,
      }
    };
    const nsDeviceUpdateResponse = client.namespaceDevices.update(resourceGroupName, namespaceName, nsDeviceName, nsDeviceUpdateProperties);
    const nsDeviceUpdateResult = await nsDeviceUpdateResponse.pollUntilDone();
    assert.equal(nsDeviceUpdateResult.name, nsDeviceName);
    assert.equal(nsDeviceUpdateResult.properties?.operatingSystemVersion, nsDeviceUpdateProperties.properties!.operatingSystemVersion);
    assert.equal(nsDeviceUpdateResult.properties?.enabled, nsDeviceUpdateProperties.properties!.enabled);

    // Get Namespace Device
    console.log("Getting namespace device...");
    const nsDeviceGetResult = await client.namespaceDevices.get(resourceGroupName, namespaceName, nsDeviceName);
    assert.equal(nsDeviceGetResult.name, nsDeviceName);
    assert.equal(nsDeviceGetResult.properties?.operatingSystemVersion, nsDeviceUpdateProperties.properties!.operatingSystemVersion);
    assert.equal(nsDeviceGetResult.properties?.enabled, nsDeviceUpdateProperties.properties!.enabled);

    // List Namespace Devices by Resource Group
    console.log("Listing namespace devices...");
    const nsDeviceListResults: NamespaceDevice[] = [];
    const nsDeviceListResponse = client.namespaceDevices.listByResourceGroup(resourceGroupName, namespaceName);
    for await (const nsDevice of nsDeviceListResponse) {
      nsDeviceListResults.push(nsDevice);
    }
    assert.ok(nsDeviceListResults.length > 0);

    // Create Namespace Asset
    console.log("Creating namespace asset...");
    const nsAssetName = "test-namespace-asset-js";
    const nsAssetProperties: NamespaceAsset = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        deviceRef: {
          deviceName: nsDeviceName,
          endpointName: "myendpoint1"
        },
        description: "Test Namespace Asset",
        displayName: "TestNamespaceAsset",
      },
    };
    const nsAssetCreateResponse = client.namespaceAssets.createOrReplace(resourceGroupName, namespaceName, nsAssetName, nsAssetProperties);
    const nsAssetCreateResult = await nsAssetCreateResponse.pollUntilDone();
    assert.equal(nsAssetCreateResult.name, nsAssetName);
    assert.equal(nsAssetCreateResult.properties?.deviceRef?.deviceName, nsAssetProperties.properties!.deviceRef!.deviceName);
    assert.equal(nsAssetCreateResult.properties?.deviceRef?.endpointName, nsAssetProperties.properties!.deviceRef!.endpointName);
    assert.equal(nsAssetCreateResult.properties?.description, nsAssetProperties.properties!.description);
    assert.equal(nsAssetCreateResult.properties?.displayName, nsAssetProperties.properties!.displayName);

    // Update Namespace Asset
    console.log("Updating namespace asset...");
    const nsAssetUpdateProperties: NamespaceAssetUpdate = {
      properties: {
        description: "Updated Test Namespace Asset",
        displayName: "UpdatedTestNamespaceAsset",
      }
    };
    const nsAssetUpdateResponse = client.namespaceAssets.update(resourceGroupName, namespaceName, nsAssetName, nsAssetUpdateProperties);
    const nsAssetUpdateResult = await nsAssetUpdateResponse.pollUntilDone();
    assert.equal(nsAssetUpdateResult.name, nsAssetName);
    assert.equal(nsAssetUpdateResult.properties?.description, nsAssetUpdateProperties.properties!.description);
    assert.equal(nsAssetUpdateResult.properties?.displayName, nsAssetUpdateProperties.properties!.displayName);

    // Get Namespace Asset
    console.log("Getting namespace asset...");
    const nsAssetGetResult = await client.namespaceAssets.get(resourceGroupName, namespaceName, nsAssetName);
    assert.equal(nsAssetGetResult.name, nsAssetName);
    assert.equal(nsAssetGetResult.properties?.description, nsAssetUpdateProperties.properties!.description);
    assert.equal(nsAssetGetResult.properties?.displayName, nsAssetUpdateProperties.properties!.displayName);

    // List Namespace Assets by Resource Group
    console.log("Listing namespace assets...");
    const nsAssetListResults: NamespaceAsset[] = [];
    const nsAssetListResponse = client.namespaceAssets.listByResourceGroup(resourceGroupName, namespaceName);
    for await (const nsAsset of nsAssetListResponse) {
      nsAssetListResults.push(nsAsset);
    }
    assert.ok(nsAssetListResults.length > 0);

    // Create Namespace Discovered Device
    console.log("Creating namespace discovered device...");
    const nsDiscoveredDeviceName = "test-namespace-discovered-device-js";
    const nsDiscoveredDeviceProperties: NamespaceDiscoveredDevice = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        manufacturer: "Discovered Contoso",
        model: "Discovered Model Y",
        operatingSystem: "Windows",
        operatingSystemVersion: "10",
        discoveryId: "myDiscoveryId",
        version: 1,
        endpoints: {
          inbound: {
            "myendpoint1": {
              address: "https://myendpoint1.westeurope-1.iothub.azure.net",
              endpointType: "azure-iot-edge",
            }
          }
        }
      }
    };
    const nsDiscoveredDeviceCreateResponse = client.namespaceDiscoveredDevices.createOrReplace(resourceGroupName, namespaceName, nsDiscoveredDeviceName, nsDiscoveredDeviceProperties);
    const nsDiscoveredDeviceCreateResult = await nsDiscoveredDeviceCreateResponse.pollUntilDone();
    assert.equal(nsDiscoveredDeviceCreateResult.name, nsDiscoveredDeviceName);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.manufacturer, nsDiscoveredDeviceProperties.properties!.manufacturer);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.model, nsDiscoveredDeviceProperties.properties!.model);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.operatingSystem, nsDiscoveredDeviceProperties.properties!.operatingSystem);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.operatingSystemVersion, nsDiscoveredDeviceProperties.properties!.operatingSystemVersion);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.discoveryId, nsDiscoveredDeviceProperties.properties!.discoveryId);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.endpoints?.inbound?.["myendpoint1"].address, nsDiscoveredDeviceProperties.properties!.endpoints!.inbound!["myendpoint1"].address);
    assert.equal(nsDiscoveredDeviceCreateResult.properties?.endpoints?.inbound?.["myendpoint1"].endpointType, nsDiscoveredDeviceProperties.properties!.endpoints!.inbound!["myendpoint1"].endpointType);

    // Update Namespace Discovered Device
    console.log("Updating namespace discovered device...");
    const nsDiscoveredDeviceUpdateProperties: NamespaceDiscoveredDeviceUpdate = {
      properties: {
        operatingSystemVersion: "11",
      }
    };
    const nsDiscoveredDeviceUpdateResponse = client.namespaceDiscoveredDevices.update(resourceGroupName, namespaceName, nsDiscoveredDeviceName, nsDiscoveredDeviceUpdateProperties);
    const nsDiscoveredDeviceUpdateResult = await nsDiscoveredDeviceUpdateResponse.pollUntilDone();
    assert.equal(nsDiscoveredDeviceUpdateResult.name, nsDiscoveredDeviceName);
    assert.equal(nsDiscoveredDeviceUpdateResult.properties?.operatingSystemVersion, nsDiscoveredDeviceUpdateProperties.properties!.operatingSystemVersion);

    // Get Namespace Discovered Device
    console.log("Getting namespace discovered device...");
    const nsDiscoveredDeviceGetResult = await client.namespaceDiscoveredDevices.get(resourceGroupName, namespaceName, nsDiscoveredDeviceName);
    assert.equal(nsDiscoveredDeviceGetResult.name, nsDiscoveredDeviceName);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.operatingSystemVersion, nsDiscoveredDeviceUpdateProperties.properties!.operatingSystemVersion);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.manufacturer, nsDiscoveredDeviceProperties.properties!.manufacturer);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.model, nsDiscoveredDeviceProperties.properties!.model);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.operatingSystem, nsDiscoveredDeviceProperties.properties!.operatingSystem);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.discoveryId, nsDiscoveredDeviceProperties.properties!.discoveryId);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.endpoints?.inbound?.["myendpoint1"].address, nsDiscoveredDeviceProperties.properties!.endpoints!.inbound!["myendpoint1"].address);
    assert.equal(nsDiscoveredDeviceGetResult.properties?.endpoints?.inbound?.["myendpoint1"].endpointType, nsDiscoveredDeviceProperties.properties!.endpoints!.inbound!["myendpoint1"].endpointType);

    // List Namespace Discovered Devices by Resource Group
    console.log("Listing namespace discovered devices...");
    const nsDiscoveredDeviceListResults: NamespaceDiscoveredDevice[] = [];
    const nsDiscoveredDeviceListResponse = client.namespaceDiscoveredDevices.listByResourceGroup(resourceGroupName, namespaceName);
    for await (const nsDiscoveredDevice of nsDiscoveredDeviceListResponse) {
      nsDiscoveredDeviceListResults.push(nsDiscoveredDevice);
    }
    assert.ok(nsDiscoveredDeviceListResults.length > 0);

    // Create Namespace Discovered Asset
    console.log("Creating namespace discovered asset...");
    const nsDiscoveredAssetName = "test-namespace-discovered-asset-js";
    const nsDiscoveredAssetProperties: NamespaceDiscoveredAsset = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        deviceRef: {
          deviceName: nsDiscoveredDeviceName,
          endpointName: "discoveredEndpoint1"
        },
        description: "Test Namespace Discovered Asset",
        displayName: "TestNamespaceDiscoveredAsset",
        discoveryId: "discovered-asset-001",
        version: 1,
      },
    };
    const nsDiscoveredAssetCreateResponse = client.namespaceDiscoveredAssets.createOrReplace(resourceGroupName, namespaceName, nsDiscoveredAssetName, nsDiscoveredAssetProperties);
    const nsDiscoveredAssetCreateResult = await nsDiscoveredAssetCreateResponse.pollUntilDone();
    assert.equal(nsDiscoveredAssetCreateResult.name, nsDiscoveredAssetName);
    assert.equal(nsDiscoveredAssetCreateResult.properties?.deviceRef?.deviceName, nsDiscoveredAssetProperties.properties!.deviceRef!.deviceName);
    assert.equal(nsDiscoveredAssetCreateResult.properties?.deviceRef?.endpointName, nsDiscoveredAssetProperties.properties!.deviceRef!.endpointName);
    assert.equal(nsDiscoveredAssetCreateResult.properties?.description, nsDiscoveredAssetProperties.properties!.description);
    assert.equal(nsDiscoveredAssetCreateResult.properties?.displayName, nsDiscoveredAssetProperties.properties!.displayName);

    // Update Namespace Discovered Asset
    console.log("Updating namespace discovered asset...");
    const nsDiscoveredAssetUpdateProperties: NamespaceDiscoveredAssetUpdate = {
      properties: {
        description: "Updated Test Namespace Discovered Asset",
        displayName: "UpdatedTestNamespaceDiscoveredAsset",
      }
    };
    const nsDiscoveredAssetUpdateResponse = client.namespaceDiscoveredAssets.update(resourceGroupName, namespaceName, nsDiscoveredAssetName, nsDiscoveredAssetUpdateProperties);
    const nsDiscoveredAssetUpdateResult = await nsDiscoveredAssetUpdateResponse.pollUntilDone();
    assert.equal(nsDiscoveredAssetUpdateResult.name, nsDiscoveredAssetName);
    assert.equal(nsDiscoveredAssetUpdateResult.properties?.description, nsDiscoveredAssetUpdateProperties.properties!.description);
    assert.equal(nsDiscoveredAssetUpdateResult.properties?.displayName, nsDiscoveredAssetUpdateProperties.properties!.displayName);
    assert.equal(nsDiscoveredAssetUpdateResult.properties?.discoveryId, nsDiscoveredAssetProperties.properties!.discoveryId);

    // Get Namespace Discovered Asset
    console.log("Getting namespace discovered asset...");
    const nsDiscoveredAssetGetResult = await client.namespaceDiscoveredAssets.get(resourceGroupName, namespaceName, nsDiscoveredAssetName);
    assert.equal(nsDiscoveredAssetGetResult.name, nsDiscoveredAssetName);
    assert.equal(nsDiscoveredAssetGetResult.properties?.description, nsDiscoveredAssetUpdateProperties.properties!.description);
    assert.equal(nsDiscoveredAssetGetResult.properties?.displayName, nsDiscoveredAssetUpdateProperties.properties!.displayName);
    assert.equal(nsDiscoveredAssetGetResult.properties?.discoveryId, nsDiscoveredAssetProperties.properties!.discoveryId);

    // List Namespace Discovered Assets by Resource Group
    console.log("Listing namespace discovered assets...");
    const nsDiscoveredAssetListResults: NamespaceDiscoveredAsset[] = [];
    const nsDiscoveredAssetListResponse = client.namespaceDiscoveredAssets.listByResourceGroup(resourceGroupName, namespaceName);
    for await (const nsDiscoveredAsset of nsDiscoveredAssetListResponse) {
      nsDiscoveredAssetListResults.push(nsDiscoveredAsset);
    }
    assert.ok(nsDiscoveredAssetListResults.length > 0);

    // Delete all resources in reverse order

    // Delete Namespace Discovered Asset
    console.log("Deleting namespace discovered asset...");
    const nsDiscoveredAssetDeleteResponse = client.namespaceDiscoveredAssets.delete(resourceGroupName, namespaceName, nsDiscoveredAssetName);
    await nsDiscoveredAssetDeleteResponse.pollUntilDone();

    // Delete Namespace Discovered Device
    console.log("Deleting namespace discovered device...");
    const nsDiscoveredDeviceDeleteResponse = client.namespaceDiscoveredDevices.delete(resourceGroupName, namespaceName, nsDiscoveredDeviceName);
    await nsDiscoveredDeviceDeleteResponse.pollUntilDone();

    // Delete Namespace Asset
    console.log("Deleting namespace asset...");
    const nsAssetDeleteResponse = client.namespaceAssets.delete(resourceGroupName, namespaceName, nsAssetName);
    await nsAssetDeleteResponse.pollUntilDone();

    // Delete Namespace Device
    console.log("Deleting namespace device...");
    const nsDeviceDeleteResponse = client.namespaceDevices.delete(resourceGroupName, namespaceName, nsDeviceName);
    await nsDeviceDeleteResponse.pollUntilDone();

    // Delete Namespace
    console.log("Deleting namespace...");
    const nsDeleteResponse = client.namespaces.delete(resourceGroupName, namespaceName);
    await nsDeleteResponse.pollUntilDone();
  });

  it("Namespace migration", async () => {
    // Create a new namespace
    const namespaceName = "test-namespace-migration-js";
    console.log("Creating namespace...");
    const nsCreateResponse = client.namespaces.createOrReplace(resourceGroupName, namespaceName, {
      location: "eastus",
      properties: {
        messaging: {
          endpoints: {
            "myendpoint1": {
              address: "https://myendpoint1.westeurope-1.iothub.azure.net",
              endpointType: "azure-iot-edge",
              resourceId: `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.IotHub/namespaces/contoso-hub-namespace1`,
            },
          }
        }
      }
    });
    const nsCreateResult = await nsCreateResponse.pollUntilDone();
    assert.equal(nsCreateResult.name, namespaceName);

    // Create root asset and asset endpoint profiles
    console.log("Creating root level AssetEndpointProfile...");
    const aepName = "test-aep-migration-js";
    const aepProperties: AssetEndpointProfile = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        targetAddress: "opc.tcp://aep-uri",
        endpointProfileType: "Microsoft.OpcUa",
        authentication: {
          method: "Anonymous",
        },
      }
    };
    const aepCreateResponse = client.assetEndpointProfiles.createOrReplace(resourceGroupName, aepName, aepProperties);
    const aepCreateResult = await aepCreateResponse.pollUntilDone();
    assert.equal(aepCreateResult.name, aepName);

    // Create root asset
    console.log("Creating root level Asset...");
    const assetName = "test-asset-migration-js";
    const assetProperties: Asset = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation"
      },
      properties: {
        assetEndpointProfileRef: aepName
      }
    };
    const assetCreateResponse = client.assets.createOrReplace(resourceGroupName, assetName, assetProperties);
    const assetCreateResult = await assetCreateResponse.pollUntilDone();
    assert.equal(assetCreateResult.name, assetName);

    // Migrate the namespace
    console.log("Migrating namespace...");
    const nsMigrateRequest: NamespaceMigrateRequest = {
      resourceIds: [assetCreateResult.id!]
    };
    const nsMigrateResponse = client.namespaces.migrate(resourceGroupName, namespaceName, nsMigrateRequest);
    await nsMigrateResponse.pollUntilDone();

    // Verify new resources now in the namespace
    console.log("Verifying migrated Asset and AssetEndpointProfile in namespace...");
    const migratedAsset = await client.namespaceAssets.get(resourceGroupName, namespaceName, assetName);
    assert.equal(migratedAsset.name, assetName);
    const migratedDevice = await client.namespaceDevices.get(resourceGroupName, namespaceName, aepName);
    assert.equal(migratedDevice.name, aepName);

    // Delete migrated Asset
    console.log("Deleting migrated Asset...");
    const migratedAssetDeleteResponse = client.namespaceAssets.delete(resourceGroupName, namespaceName, assetName);
    await migratedAssetDeleteResponse.pollUntilDone();

    // Delete migrated Device
    console.log("Deleting migrated Device...");
    try {
      await client.namespaceDevices.delete(resourceGroupName, namespaceName, aepName);
    } catch (error) {
      // Delete temporary returns 200 since async operation is defined for the resource but not implemented in RP
      if ((error as any).statusCode !== 200) {
        console.log("Error deleting migrated Device:", error);
        throw error;
      }
    }

    // Delete the namespace
    console.log("Deleting namespace...");
    const nsDeleteResponse = client.namespaces.delete(resourceGroupName, namespaceName);
    await nsDeleteResponse.pollUntilDone();
  });

});
