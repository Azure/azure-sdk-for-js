// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateTestSerializerOptions,
  createTestSerializer,
  registerTestSchema,
} from "./utils/mockedSerializer";
import { assert, use as chaiUse } from "chai";
import { encoder, testGroup, testSchema, testValue } from "./utils/dummies";
import { Context } from "mocha";
import { MessageContent } from "../../src";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { Recorder } from "@azure-tools/test-recorder";
import { SchemaRegistry } from "@azure/schema-registry";

chaiUse(chaiPromises);

describe("JsonSerializer", async function () {
  let noAutoRegisterOptions: CreateTestSerializerOptions<any>;
  let recorder: Recorder;
  let registry: SchemaRegistry;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    registry = createTestRegistry({ recorder });
    noAutoRegisterOptions = {
      serializerOptions: { autoRegisterSchemas: false, groupName: testGroup },
      recorder,
    };
  });

  it("serializes to the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const { contentType, data } = await serializer.serialize(testValue, testSchema);
    assert.isUndefined((data as Buffer).readBigInt64BE);
    assert.strictEqual(`application/json+${schemaId}`, contentType);
    assert.deepStrictEqual(data, encoder.encode(JSON.stringify(testValue)));
  });

  it("deserializes from the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const data = encoder.encode(JSON.stringify(testValue));
    assert.deepStrictEqual(
      await serializer.deserialize({
        data,
        contentType: `application/json+${schemaId}`,
      }),
      testValue
    );
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer({ recorder });
    let message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // again for cache hit coverage on serialize
    message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), message);
  });

  it("works with trivial example in README", async () => {
    const serializer = await createTestSerializer({ recorder });

    // Example Json schema
    const schema = JSON.stringify({
      $schema: "http://json-schema.org/draft-04/schema#",
      $id: "person",
      title: "Student",
      description: "A student in the class",
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the student",
        },
      },
      required: ["name"],
    });

    // Example value that matches the Json schema above
    const value = { name: "Bob" };

    // serialize value to a message
    const message = await serializer.serialize(value, schema);

    // Deserialize message to value
    const deserializedValue = await serializer.deserialize(message);

    assert.deepStrictEqual(deserializedValue, value);
  });
});
