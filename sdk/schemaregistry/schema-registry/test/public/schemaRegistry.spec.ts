// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";

import { SchemaRegistryClient, SchemaDescription, SchemaProperties, Schema } from "../../src";

const options = {
  onResponse: (rawResponse: { status: number }) => {
    assert.equal(rawResponse.status, 204);
  }
};

function assertIsValidSchemaProperties(
  schemaProperties: SchemaProperties,
  expectedSerializationType = "Avro"
): asserts schemaProperties {
  assert.isNotEmpty(schemaProperties.id);
  assert.equal(schemaProperties.format, expectedSerializationType);
}

function assertIsValidSchema(schema: Schema, expectedSerializationType = "Avro"): asserts schema {
  assert.isNotEmpty(schema.definition);
  assertIsValidSchemaProperties(schema.properties, expectedSerializationType);
}

async function isRejected<T>(
  promise: Promise<T>,
  expectedStatusCode: number | undefined,
  expectedMessage: RegExp
): Promise<void> {
  try {
    await promise;
  } catch (e) {
    assert.equal(e.statusCode, expectedStatusCode);
    assert.match(e.message, expectedMessage);
    /**
     * The SDK does not currently parse the error response body because it
     * does not have a compliant error codes yet. The SDK will start to parse
     * them once the codes become compliant text that follows:
     *
     * "Unlocalized string which can be used to programmatically identify the
     * error.The code should be Pascal-cased, and should serve to uniquely
     * identify a particular class of error, for example "BadArgument"."
     *
     * Right now, the service returns the response status code in the Code field.
     */
    assert.isUndefined(e.code);
    assert.isUndefined(e.Code);
    if (expectedStatusCode !== undefined) {
      assert.equal(JSON.parse(e.message).Code, e.statusCode);
    }
  }
}

describe("SchemaRegistryClient", function() {
  let recorder: Recorder;
  let client: SchemaRegistryClient;
  let schema: SchemaDescription;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
    schema = {
      name: "azsdk_js_test",
      groupName: env.SCHEMA_REGISTRY_GROUP,
      format: "Avro",
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
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sets fully qualified name space in constructor", () => {
    const fullyQualifiedNamespace = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    const customClient = new SchemaRegistryClient(fullyQualifiedNamespace, credential);
    assert.equal(customClient.fullyQualifiedNamespace, fullyQualifiedNamespace);
  });

  it("rejects schema registration with invalid args", async () => {
    await isRejected(client.registerSchema({ ...schema, name: null! }), undefined, /null/);
    await isRejected(client.registerSchema({ ...schema, groupName: null! }), undefined, /null/);
    await isRejected(client.registerSchema({ ...schema, definition: null! }), undefined, /null/);
    await isRejected(client.registerSchema({ ...schema, format: null! }), 415, /null/);
    await isRejected(client.registerSchema({ ...schema, format: "not-valid" }), 415, /not-valid/);
  });

  it("registers schema", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await isRejected(client.getSchemaProperties({ ...schema, name: null! }), undefined, /null/);
    await isRejected(
      client.getSchemaProperties({ ...schema, groupName: null! }),
      undefined,
      /null/
    );
    await isRejected(
      client.getSchemaProperties({ ...schema, definition: null! }),
      undefined,
      /null/
    );
    await isRejected(client.getSchemaProperties({ ...schema, format: null! }), 415, /null/);
    await isRejected(
      client.getSchemaProperties({ ...schema, format: "not-valid" }),
      415,
      /not-valid/
    );
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    await isRejected(
      client.getSchemaProperties({ ...schema, name: "never-registered" }),
      404,
      /does not exist/
    );
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);

    const found = await client.getSchemaProperties(schema, options);
    assertIsValidSchemaProperties(found);

    // NOTE: IDs may differ here as we could get a different version with same definition.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await isRejected(client.getSchema(null!), undefined, /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    await isRejected(client.getSchema("ffffffffffffffffffffffffffffffff"), 404, /does not exist/);
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);
    const found = await client.getSchema(registered.id, {
      onResponse: (rawResponse: { status: number }) => {
        assert.equal(rawResponse.status, 200);
      }
    });
    assertIsValidSchema(found);
    assert.equal(found.definition, schema.definition);
  });

  it("schema with whitespace", async () => {
    const schema2: SchemaDescription = {
      name: "azsdk_js_test2",
      groupName: env.SCHEMA_REGISTRY_GROUP,
      format: "Avro",
      definition:
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n"
    };
    // definition that is going to the service has whitespaces
    const registered = await client.registerSchema(schema2, options);
    assertIsValidSchemaProperties(registered);

    const foundSchema = await client.getSchema(registered.id);
    assertIsValidSchema(foundSchema);
    // the schema comes from the service normalized
    assert.equal(foundSchema.definition, schema2.definition.replace(/\s/g, ""));

    const foundId = await client.getSchemaProperties({
      // definition that comes from the service does not have whitespaces
      definition: foundSchema.definition,
      groupName: schema2.groupName,
      name: schema2.name,
      format: foundSchema.properties.format
    });
    assertIsValidSchemaProperties(foundId);
  });

  it("Allows schema names with dots in them", async () => {
    const schemaProperties = await client.registerSchema({
      ...schema,
      name: "com.azure.schemaregistry.samples.User"
    });
    assertIsValidSchemaProperties(schemaProperties);
  });
});
