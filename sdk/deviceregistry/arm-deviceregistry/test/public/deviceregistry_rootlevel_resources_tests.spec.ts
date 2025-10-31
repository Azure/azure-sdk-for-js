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
  Asset,
  AssetEndpointProfileUpdate,
  AssetUpdate,
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

  it("AssetEndpointProfile CRUD operations", async () => {
    // Create AssetEndpointProfile
    console.log("Creating root level AssetEndpointProfile...");
    const aepName = "test-aep-js";
    const aepProperties: AssetEndpointProfile = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation",
      },
      properties: {
        targetAddress: "opc.tcp://aep-uri",
        endpointProfileType: "Microsoft.OpcUa",
        authentication: {
          method: "Certificate",
          x509Credentials: {
            certificateSecretName: "cert-secret",
          },
        },
      },
    };
    const aepCreateResponse = client.assetEndpointProfiles.createOrReplace(
      resourceGroupName,
      aepName,
      aepProperties,
    );
    const aepCreateResult = await aepCreateResponse.pollUntilDone();
    assert.equal(aepCreateResult.name, aepName);
    assert.equal(
      aepCreateResult.properties?.targetAddress,
      aepProperties.properties!.targetAddress,
    );
    assert.equal(
      aepCreateResult.properties?.endpointProfileType,
      aepProperties.properties!.endpointProfileType,
    );
    assert.equal(
      aepCreateResult.properties?.authentication?.method,
      aepProperties.properties!.authentication!.method,
    );
    assert.equal(
      aepCreateResult.properties?.authentication?.x509Credentials?.certificateSecretName,
      aepProperties.properties!.authentication!.x509Credentials!.certificateSecretName,
    );

    // Update AssetEndpointProfile
    console.log("Updating root level AssetEndpointProfile...");
    const aepUpdateProperties: AssetEndpointProfileUpdate = {
      properties: {
        authentication: {
          method: "UsernamePassword",
          usernamePasswordCredentials: {
            usernameSecretName: "username-secret",
            passwordSecretName: "password-secret",
          },
        },
      },
    };
    const aepUpdateResponse = client.assetEndpointProfiles.update(
      resourceGroupName,
      aepName,
      aepUpdateProperties,
    );
    const aepUpdateResult = await aepUpdateResponse.pollUntilDone();
    assert.equal(aepUpdateResult.name, aepName);
    assert.equal(
      aepUpdateResult.properties?.targetAddress,
      aepProperties.properties!.targetAddress,
    );
    assert.equal(
      aepUpdateResult.properties?.endpointProfileType,
      aepProperties.properties!.endpointProfileType,
    );
    assert.equal(
      aepUpdateResult.properties?.authentication?.method,
      aepUpdateProperties.properties!.authentication!.method,
    );
    assert.equal(
      aepUpdateResult.properties?.authentication?.usernamePasswordCredentials?.usernameSecretName,
      aepUpdateProperties.properties!.authentication!.usernamePasswordCredentials!
        .usernameSecretName,
    );
    assert.equal(
      aepUpdateResult.properties?.authentication?.usernamePasswordCredentials?.passwordSecretName,
      aepUpdateProperties.properties!.authentication!.usernamePasswordCredentials!
        .passwordSecretName,
    );

    // GET AssetEndpointProfile
    console.log("Getting root level AssetEndpointProfile...");
    const aepGetResponse = await client.assetEndpointProfiles.get(resourceGroupName, aepName);
    assert.equal(aepGetResponse.name, aepName);
    assert.equal(aepGetResponse.properties?.targetAddress, aepProperties.properties!.targetAddress);
    assert.equal(
      aepGetResponse.properties?.endpointProfileType,
      aepProperties.properties!.endpointProfileType,
    );
    assert.equal(
      aepGetResponse.properties?.authentication?.method,
      aepUpdateProperties.properties!.authentication!.method,
    );
    assert.equal(
      aepGetResponse.properties?.authentication?.usernamePasswordCredentials?.usernameSecretName,
      aepUpdateProperties.properties!.authentication!.usernamePasswordCredentials!
        .usernameSecretName,
    );
    assert.equal(
      aepGetResponse.properties?.authentication?.usernamePasswordCredentials?.passwordSecretName,
      aepUpdateProperties.properties!.authentication!.usernamePasswordCredentials!
        .passwordSecretName,
    );

    // LIST AssetEndpointProfiles
    console.log("Listing root level AssetEndpointProfiles...");
    const aepListResponse = client.assetEndpointProfiles.listByResourceGroup(resourceGroupName);
    const aepList = [];
    for await (const item of aepListResponse) {
      aepList.push(item);
    }
    assert.ok(aepList.length >= 1);

    // Delete AssetEndpointProfile
    console.log("Deleting root level AssetEndpointProfile...");
    const aepDeleteResponse = client.assetEndpointProfiles.delete(resourceGroupName, aepName);
    await aepDeleteResponse.pollUntilDone();
  });

  it("Asset CRUD operations", async () => {
    // Create root asset
    console.log("Creating root level Asset...");
    const assetName = "test-asset-migration-js";
    const assetProperties: Asset = {
      location,
      extendedLocation: {
        name: extendedLocationName,
        type: "CustomLocation",
      },
      properties: {
        assetEndpointProfileRef: "my-aep-ref",
        description: "Test asset description",
        displayName: "Test Asset",
      },
    };
    const assetCreateResponse = client.assets.createOrReplace(
      resourceGroupName,
      assetName,
      assetProperties,
    );
    const assetCreateResult = await assetCreateResponse.pollUntilDone();
    assert.equal(assetCreateResult.name, assetName);
    assert.equal(
      assetCreateResult.properties?.assetEndpointProfileRef,
      assetProperties.properties!.assetEndpointProfileRef,
    );
    assert.equal(
      assetCreateResult.properties?.description,
      assetProperties.properties!.description,
    );
    assert.equal(
      assetCreateResult.properties?.displayName,
      assetProperties.properties!.displayName,
    );

    // Update root asset
    console.log("Updating root level Asset...");
    const assetUpdateProperties: AssetUpdate = {
      properties: {
        description: "Updated test asset description",
        displayName: "Updated Test Asset",
      },
    };
    const assetUpdateResponse = client.assets.update(
      resourceGroupName,
      assetName,
      assetUpdateProperties,
    );
    const assetUpdateResult = await assetUpdateResponse.pollUntilDone();
    assert.equal(assetUpdateResult.name, assetName);
    assert.equal(
      assetUpdateResult.properties?.assetEndpointProfileRef,
      assetProperties.properties!.assetEndpointProfileRef,
    );
    assert.equal(
      assetUpdateResult.properties?.description,
      assetUpdateProperties.properties!.description,
    );
    assert.equal(
      assetUpdateResult.properties?.displayName,
      assetUpdateProperties.properties!.displayName,
    );

    // GET root asset
    console.log("Getting root level Asset...");
    const assetGetResponse = await client.assets.get(resourceGroupName, assetName);
    assert.equal(assetGetResponse.name, assetName);
    assert.equal(
      assetGetResponse.properties?.assetEndpointProfileRef,
      assetProperties.properties!.assetEndpointProfileRef,
    );
    assert.equal(
      assetGetResponse.properties?.description,
      assetUpdateProperties.properties!.description,
    );
    assert.equal(
      assetGetResponse.properties?.displayName,
      assetUpdateProperties.properties!.displayName,
    );

    // LIST root assets
    console.log("Listing root level Assets...");
    const assetListResponse = client.assets.listByResourceGroup(resourceGroupName);
    const assetList = [];
    for await (const item of assetListResponse) {
      assetList.push(item);
    }
    assert.ok(assetList.length >= 1);

    // Delete root asset
    console.log("Deleting root level Asset...");
    const assetDeleteResponse = client.assets.delete(resourceGroupName, assetName);
    await assetDeleteResponse.pollUntilDone();
  });
});
