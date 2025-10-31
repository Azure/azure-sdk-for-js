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
import { Schema, SchemaRegistry, SchemaRegistryUpdate, SchemaVersion } from "../../src/index.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DeviceRegistry Schema Registry tests", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let resourceGroupName: string;
  let location: string;
  let blobStorageAccountUrl: string;
  let client: DeviceRegistryManagementClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    const tenantId = assertEnvironmentVariable("AZURE_TENANT_ID");
    subscriptionId = assertEnvironmentVariable("SUBSCRIPTION_ID");
    resourceGroupName = assertEnvironmentVariable("RESOURCE_GROUP_NAME");
    location = assertEnvironmentVariable("LOCATION");
    blobStorageAccountUrl = assertEnvironmentVariable("BLOB_STORAGE_ACCOUNT_URL");

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
  it("schema registry CRUD operations tests", async () => {
    const schemaRegistryName = "test-sr-js";

    // Create Schema Registry
    const srProperties: SchemaRegistry = {
      location,
      identity: { type: "SystemAssigned" },
      properties: {
        description: "Test Schema Registry",
        displayName: "TestSchemaRegistry",
        namespace: "testnamespacesr",
        storageAccountContainerUrl: blobStorageAccountUrl,
      },
    };
    const srCreateResponse = client.schemaRegistries.createOrReplace(resourceGroupName, schemaRegistryName, srProperties);
    const srCreateResult = await srCreateResponse.pollUntilDone();
    assert.equal(srCreateResult.name, schemaRegistryName);
    assert.equal(srCreateResult.properties?.namespace, srProperties.properties!.namespace);
    assert.equal(srCreateResult.properties?.description, srProperties.properties!.description);
    assert.equal(srCreateResult.properties?.displayName, srProperties.properties!.displayName);
    assert.equal(srCreateResult.properties?.storageAccountContainerUrl, srProperties.properties!.storageAccountContainerUrl);

    // Update Schema Registry
    const srUpdateProperties: SchemaRegistryUpdate = {
      properties: {
        description: "Updated Test Schema Registry",
        displayName: "UpdatedTestSchemaRegistry",
      }
    };
    const srUpdateResponse = client.schemaRegistries.update(
      resourceGroupName,
      schemaRegistryName,
      srUpdateProperties
    );
    const srUpdateResult = await srUpdateResponse.pollUntilDone();
    assert.equal(srUpdateResult.name, schemaRegistryName);
    assert.equal(srUpdateResult.properties?.description, srUpdateProperties.properties!.description);
    assert.equal(srUpdateResult.properties?.displayName, srUpdateProperties.properties!.displayName);

    // Get Schema Registry
    const srGetResult = await client.schemaRegistries.get(resourceGroupName, schemaRegistryName);
    assert.equal(srGetResult.name, schemaRegistryName);
    assert.equal(srGetResult.properties?.description, srUpdateProperties.properties!.description);
    assert.equal(srGetResult.properties?.displayName, srUpdateProperties.properties!.displayName);

    // List Schema Registries by Resource Group
    const srListResults: SchemaRegistry[] = [];
    const srListResponse = client.schemaRegistries.listByResourceGroup(resourceGroupName);
    for await (const sr of srListResponse) {
      srListResults.push(sr);
    }
    assert.ok(srListResults.length > 0);

    // await new Promise(resolve => {
    //   console.log("Pausing for 2 minutes... add role assignment to Schema Registry");
    //   setTimeout(resolve, 120000);
    // }); // Wait for 2 minutes. Uncomment during test run so you can add role assignment

    // Create Schema
    const schemaName = "testschema";
    const schemaProperties: Schema = {
      properties: {
        displayName: "TestSchema",
        description: "This is a test schema",
        format: "JsonSchema/draft-07",
        schemaType: "MessageSchema"
      }
    };
    const schemaCreateResult = await client.schemas.createOrReplace(
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaProperties
    );
    assert.equal(schemaCreateResult.name, schemaName);
    assert.equal(schemaCreateResult.properties?.displayName, schemaProperties.properties!.displayName);
    assert.equal(schemaCreateResult.properties?.description, schemaProperties.properties!.description);
    assert.equal(schemaCreateResult.properties?.format, schemaProperties.properties!.format);
    assert.equal(schemaCreateResult.properties?.schemaType, schemaProperties.properties!.schemaType);

    // Get schema
    const schemaGetResult = await client.schemas.get(
      resourceGroupName,
      schemaRegistryName,
      schemaName
    );
    assert.equal(schemaGetResult.name, schemaName);
    assert.equal(schemaGetResult.properties?.displayName, schemaProperties.properties!.displayName);
    assert.equal(schemaGetResult.properties?.description, schemaProperties.properties!.description);
    assert.equal(schemaGetResult.properties?.format, schemaProperties.properties!.format);
    assert.equal(schemaGetResult.properties?.schemaType, schemaProperties.properties!.schemaType);

    // List Schemas
    const schemaListResults: Schema[] = [];
    const schemaListResponse = client.schemas.listBySchemaRegistry(
      resourceGroupName,
      schemaRegistryName
    );
    for await (const schema of schemaListResponse) {
      schemaListResults.push(schema);
    }
    assert.ok(schemaListResults.length > 0);

    // Create Schema Version
    const schemaVersionName = "1";
    const schemaVersionProperties: SchemaVersion = {
      properties: {
        description: "This is version 1 of the test schema",
        schemaContent: "{\"$schema\": \"http://json-schema.org/draft-07/schema#\",\"type\": \"object\",\"properties\": {\"humidity\": {\"type\": \"string\"},\"temperature\": {\"type\":\"number\"}}}"
      }
    };
    const schemaVersionCreateResult = await client.schemaVersions.createOrReplace(
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName,
      schemaVersionProperties
    );
    assert.equal(schemaVersionCreateResult.properties?.description, schemaVersionProperties.properties!.description);
    assert.equal(schemaVersionCreateResult.properties?.schemaContent, schemaVersionProperties.properties!.schemaContent);

    // Get Schema Version
    const schemaVersionGetResult = await client.schemaVersions.get(
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName
    );
    assert.equal(schemaVersionGetResult.properties?.description, schemaVersionProperties.properties!.description);
    assert.equal(schemaVersionGetResult.properties?.schemaContent, schemaVersionProperties.properties!.schemaContent);

    // List Schema Versions
    const schemaVersionListResults: SchemaVersion[] = [];
    const schemaVersionListResponse = client.schemaVersions.listBySchema(
      resourceGroupName,
      schemaRegistryName,
      schemaName
    );
    for await (const schemaVersion of schemaVersionListResponse) {
      schemaVersionListResults.push(schemaVersion);
    }
    assert.ok(schemaVersionListResults.length > 0);

    // Delete Schema Version
    const svDeleteResponse = client.schemaVersions.delete(
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName
    );
    await svDeleteResponse.pollUntilDone();
    
    // Delete Schema
    const schemaDeleteResponse = client.schemas.delete(
      resourceGroupName,
      schemaRegistryName,
      schemaName
    );
    await schemaDeleteResponse.pollUntilDone();

    // Delete Schema Registry
    const srDeleteResponse = client.schemaRegistries.delete(resourceGroupName, schemaRegistryName);
    await srDeleteResponse.pollUntilDone();
  });
});
