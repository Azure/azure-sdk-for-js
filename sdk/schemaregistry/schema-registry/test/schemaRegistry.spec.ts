// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient, testEnv } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";

import { SchemaRegistryClient, SchemaDescription, SchemaProperties } from "../src/index";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { convertSchemaIdResponse } from "../src/conversions";

const options: OperationOptions = {
  onResponse: (rawResponse: FullOperationResponse) => {
    assert.equal(rawResponse.status, 200);
  }
};

const schema: SchemaDescription = {
  name: "azsdk_js_test",
  groupName: testEnv.SCHEMA_REGISTRY_GROUP,
  format: "avro",
  definition: JSON.stringify({
    type: "record",
    name: "User",
    namespace: "com.azure.schemaregistry.samples",
    fields: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "favoriteNumber",
        type: "int"
      }
    ]
  })
};

function assertIsNotNullUndefinedOrEmpty(
  x: SchemaProperties | string | null | undefined
): asserts x {
  assert.isTrue(x !== undefined, "should not be undefined");
  assert.isNotNull(x);
  assert.isNotEmpty(x);
}

function assertIsValidSchemaId(
  schemaId: SchemaProperties | undefined,
  expectedSerializationType = "avro"
): asserts schemaId {
  assertIsNotNullUndefinedOrEmpty(schemaId);
  assertIsNotNullUndefinedOrEmpty(schemaId.id);
  assertIsNotNullUndefinedOrEmpty(schemaId.format);
  assert.isNotNull(schemaId.version);
  assert.equal(schemaId.format.toLowerCase(), expectedSerializationType.toLowerCase());
}

describe("SchemaRegistryClient", function() {
  let recorder: Recorder;
  let client: SchemaRegistryClient;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sets endpoint in constructor", () => {
    const endpoint = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    const customClient = new SchemaRegistryClient(endpoint, credential);
    assert.equal(customClient.endpoint, endpoint);
  });

  it("rejects schema registration with invalid args", async () => {
    await assert.isRejected(client.registerSchema({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, definition: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, format: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, format: "not-valid" }), /not-valid/);
  });

  it("registers schema", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await assert.isRejected(client.getSchemaProperties({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, definition: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, format: null! }), /null/);
    await assert.isRejected(
      client.getSchemaProperties({ ...schema, format: "not-valid" }),
      /not-valid/
    );
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    assert.isRejected(client.getSchemaProperties({ ...schema, name: "never-registered" }));
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaProperties(schema, options);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same definition.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchema(null!), /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    assert.isRejected(client.getSchema("ffffffffffffffffffffffffffffffff"));
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchema(registered.id, options);
    assertIsValidSchemaId(found);
    assert.equal(found.definition, schema.definition);
  });

  it("cache schema and ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const foundSchema = await client.getSchema(registered.id, {
      onResponse: () => {
        assert.fail("Unexpected call to the service");
      }
    });
    assertIsValidSchemaId(foundSchema);
    assert.equal(foundSchema.definition, schema.definition);

    const foundId = await client.getSchemaProperties(schema, {
      onResponse: () => {
        assert.fail("Unexpected call to the service");
      }
    });
    assertIsValidSchemaId(foundId);
    assert.equal(foundId?.id, registered.id);
  });

  it("cache schema and ID if not registered by the current client instance", async () => {
    // register a schema without caching.
    const registered = await client["client"]["schema"]
      .register(schema.groupName, schema.name, schema.format, schema.definition, options)
      .then(convertSchemaIdResponse);
    assertIsValidSchemaId(registered);

    let firstCall = false;
    // first call sends a request to the service and then cache the response
    const foundSchemaFirstCall = await client.getSchema(registered.id, {
      onResponse: () => {
        firstCall = true;
      }
    });
    assert.isTrue(firstCall, "Expected call to the service did not happen");
    assertIsValidSchemaId(foundSchemaFirstCall);
    assert.equal(foundSchemaFirstCall.definition, schema.definition);
    // second call returns the result from the cache
    const foundSchemaSecondCall = await client.getSchema(registered.id, {
      onResponse: () => {
        assert.fail("Unexpected call to the service");
      }
    });
    assert.isTrue(firstCall, "Expected call to the service did not happen");
    assertIsValidSchemaId(foundSchemaSecondCall);
    assert.equal(foundSchemaSecondCall.definition, schema.definition);

    firstCall = false;
    // first call sends a request to the service and then cache the response
    const foundIdFirstCall = await client.getSchemaProperties(schema, {
      onResponse: () => {
        firstCall = true;
      }
    });
    assert.isTrue(firstCall, "Expected call to the service did not happen");
    assertIsValidSchemaId(foundIdFirstCall);
    assert.equal(foundIdFirstCall?.id, registered.id);

    // second call returns the result from the cache
    const foundIdSecondCall = await client.getSchemaProperties(schema, {
      onResponse: () => {
        assert.fail("Unexpected call to the service");
      }
    });
    assert.isTrue(firstCall, "Expected call to the service did not happen");
    assertIsValidSchemaId(foundIdSecondCall);
    assert.equal(foundIdSecondCall?.id, registered.id);
  });

  it("schema with whitespace", async () => {
    const schema2: SchemaDescription = {
      name: "azsdk_js_test2",
      groupName: testEnv.SCHEMA_REGISTRY_GROUP,
      format: "avro",
      definition:
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n"
    };
    // definition that is going to the service has whitespaces
    const registered = await client.registerSchema(schema2, options);
    assertIsValidSchemaId(registered);

    const foundSchema = await client.getSchema(registered.id, {
      onResponse: () => {
        assert.fail("Unexpected call to the service");
      }
    });
    assertIsValidSchemaId(foundSchema);
    assert.equal(foundSchema.definition, schema2.definition);

    let ran = false;
    const foundId = await client.getSchemaProperties(
      {
        // definition that comes from the service does not have whitespaces
        definition: foundSchema.definition,
        groupName: schema2.groupName,
        name: schema2.name,
        format: foundSchema.format
      },
      {
        onResponse: () => {
          ran = true;
        }
      }
    );
    // the schema comes from the service normalized so that its definition has no whitespace
    // which is different from the original schema that was registered first and lives
    // in the cache. There is a trade-off between the perf hit for doing client-side
    // normalization and the perf hit for doing an extra call to the service for the
    // normalized one.
    assert.isTrue(ran, "Expected call to the service did not happen");
    assertIsValidSchemaId(foundId);
  });
});
