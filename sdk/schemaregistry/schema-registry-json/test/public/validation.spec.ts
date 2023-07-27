// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { DeserializeOptions, JsonSerializer } from "../../src";
import { SchemaRegistry } from "@azure/schema-registry";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer } from "./utils/mockedSerializer";
import { encoder, testGroup} from "./utils/dummies";
import { Recorder } from "@azure-tools/test-recorder";
// import { assertError } from "./utils/assertError";
import Ajv from "ajv";
import { assertError } from "./utils/assertError";

chaiUse(chaiPromises);

describe("Deserialize Validation", function () {
  let serializer: JsonSerializer;
  let registry: SchemaRegistry;
  let recorder: Recorder;
  let skipValidationOption: DeserializeOptions;
  let validateWithAjvOption: DeserializeOptions;
  let id: string;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        autoRegisterSchemas: true,
        groupName: testGroup,
      },
      recorder,
    });
    skipValidationOption = {
      validateCallback(message, schema) {
        return schema && message ? true : false;
      },
    };
    validateWithAjvOption = {
      validateCallback(message, schema) {
        const ajv = new Ajv();
        const validator = ajv.compile(JSON.parse(schema));
        const valid = validator(message);
        return valid ? valid : { isValid: valid, message: JSON.stringify(validator.errors) };
      },
    };
    ({ id } = await registry.registerSchema({
      definition: JSON.stringify({
        $id: "id",
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the student",
          },
          favoriteNumber: {
            type: "integer",
            description: "The favorite number of the student",
          },
        },
        required: ["name"],
      }),
      format: "json",
      groupName: testGroup,
      name: "test",
    }));
  });

  describe.skip("Value validation", function () {
    it("succeeds with incompatible data", async function () {
      const data = {
        favoriteNumber: "four",
      };
      const deserialedData = await serializer.deserialize(
        {
          data: encoder.encode(JSON.stringify(data)),
          contentType: `application/json+${id}`,
        },
        skipValidationOption
      );
      assert.deepEqual(data, deserialedData);
    });

    it("validation fails with missing property", async function () {
      const data = {
        favoriteNumber: 4,
      };
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: `application/json+${id}`,
          },
          validateWithAjvOption
        ),
        {
          message: /Json validation failed with schema ID/,
          causeMessage: /must have required property 'name'/,
        }
      );
    });

    it("validation fails with incompatible data", async function () {
      const data = {
        name: "Alice",
        favoriteNumber: "four",
      };
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: `application/json+${id}`,
          },
          validateWithAjvOption
        ),
        {
          message: /Json validation failed with schema ID/,
          causeMessage: /must be integer/,
        }
      );
    });

    it("succeeds with validation", async function () {
      const data = {
        name: "Alice",
      };
      assert.deepEqual(
        await serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: `application/json+${id}`,
          },
          validateWithAjvOption
        ),
        data
      );
    });
  });
});
