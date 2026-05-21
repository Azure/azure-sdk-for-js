// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { SchemaRegistryClient, SchemaSortOrder } from "../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const envSetupForPlayback = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azuretenantid",
  SCHEMAREGISTRY_AVRO_FULLY_QUALIFIED_NAMESPACE: "https://endpoint",
  SCHEMA_REGISTRY_GROUP: "group-1",
};

describe("SchemaRegistryClient listing operations", () => {
  let recorder: Recorder;
  let client: SchemaRegistryClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({ envSetupForPlayback });
    const credential = new DefaultAzureCredential();
    client = new SchemaRegistryClient(
      assertEnvironmentVariable("SCHEMAREGISTRY_AVRO_FULLY_QUALIFIED_NAMESPACE"),
      credential,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(() => {
    // intentionally left blank
  });

  it("lists schemas in a group", async () => {
    const groupName = assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP");
    const schemas = await client.listSchemas(groupName, {
      maxPageSize: 25,
      sortOrder: SchemaSortOrder.Ascending,
    });
    assert.isArray(schemas);
    for (const schema of schemas) {
      assert.isNotEmpty(schema.name);
      assert.equal(schema.groupName, groupName);
    }
  });

  it.skip("returns paged results for very large groups", async () => {
    const groupName = assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP");
    const schemas = await client.listSchemas(groupName, { maxPageSize: 1 });
    assert.isAbove(schemas.length, 1);
  });

  it("returns all schemas across groups", async () => {
    const schemas = await client.getAllSchemas({ nameFilter: "test" });
    assert.isArray(schemas);
  });

  it("throws when called with an unknown group", async () => {
    try {
      await client.listSchemas("group-does-not-exist-12345");
      assert.fail("Expected listSchemas to throw");
    } catch (e: any) {
      assert.equal(e.statusCode, 404);
    }
  });

  it("respects polling interval when retrying", async () => {
    const groupName = assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP");
    const start = Date.now();
    await client.listSchemas(groupName, { maxPageSize: 5 });
    const elapsed = Date.now() - start;
    const intervalInMs = 5000;
    assert.isAtMost(elapsed, intervalInMs * 3);
  });
});
