// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { dataSectionTypeCode, defaultDataTransformer } from "../../src/dataTransformer.js";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import { assert, should } from "../utils/chai.js";
import { describe, it } from "vitest";

describe("DataTransformer", function () {
  const objectBody = {
    id: "123-456-789",
    weight: 10,
    isBlue: true,
    siblings: [
      {
        id: "098-789-564",
        weight: 20,
        isBlue: false,
      },
    ],
  };
  const arrayBody = [
    {
      id: "098-789-564",
      weight: 20,
      isBlue: false,
    },
    10,
    20,
    "some string",
  ];
  const stringBody = "some string";
  const booleanBody = true;
  const numberBody = 10.2;
  const nullBody = null;
  const undefinedBody = undefined;
  const emptyStringBody = "";
  const bufferBody = Buffer.from("zzz", "utf8");
  const hexBufferBody = Buffer.from("7468697320697320612074c3a97374", "hex");
  const transformer = defaultDataTransformer;

  describe(`encoded bodyType: "data"`, function () {
    const bodyType = "data";

    it("should correctly encode/decode a string message body", async function () {
      const encoded = transformer.encode(stringBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as string).should.equal(stringBody);
    });

    it("should correctly encode/decode a number message body", async function () {
      const encoded = transformer.encode(numberBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as number).should.equal(numberBody);
    });

    it("should correctly encode/decode a boolean message body", async function () {
      const encoded = transformer.encode(booleanBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as boolean).should.equal(booleanBody);
    });

    it("should correctly encode/decode a null message body", async function () {
      const encoded = transformer.encode(nullBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(false);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an undefined message body", async function () {
      const encoded = transformer.encode(undefinedBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(false);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an empty string message body", async function () {
      const encoded = transformer.encode(emptyStringBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as string).should.equal(emptyStringBody);
    });

    it("should correctly encode/decode an array message body", async function () {
      const encoded = transformer.encode(arrayBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, arrayBody);
    });

    it("should correctly encode/decode an object message body", async function () {
      const encoded = transformer.encode(objectBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, objectBody);
    });

    it("should correctly encode/decode a buffer message body", async function () {
      const encoded = transformer.encode(bufferBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, bufferBody);
    });

    it("should correctly encode/decode a hex buffer message body", async function () {
      const encoded = transformer.encode(hexBufferBody, "data");
      encoded.typecode.should.equal(117);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, hexBufferBody);
    });
  });

  describe(`encoded bodyType: "value"`, function () {
    const expectedTypeCode = 0x77;
    const bodyType = "value";

    it("should correctly encode/decode a string message body", async function () {
      const encoded = transformer.encode(stringBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as string).should.equal(stringBody);
    });

    it("should correctly encode/decode a number message body", async function () {
      const encoded = transformer.encode(numberBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as number).should.equal(numberBody);
    });

    it("should correctly encode/decode a boolean message body", async function () {
      const encoded = transformer.encode(booleanBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as boolean).should.equal(booleanBody);
    });

    it("should correctly encode/decode a null message body", async function () {
      const encoded = transformer.encode(nullBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an undefined message body", async function () {
      const encoded = transformer.encode(undefinedBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an empty string message body", async function () {
      const encoded = transformer.encode(emptyStringBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      (decoded as string).should.equal(emptyStringBody);
    });

    it("should correctly encode/decode an array message body", async function () {
      const encoded = transformer.encode(arrayBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, arrayBody);
    });

    it("should correctly encode/decode an object message body", async function () {
      const encoded = transformer.encode(objectBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, objectBody);
    });

    it("should correctly encode/decode a buffer message body", async function () {
      const encoded = transformer.encode(bufferBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, bufferBody);
    });

    it("should correctly encode/decode a hex buffer message body", async function () {
      const encoded = transformer.encode(hexBufferBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      isBuffer(encoded.content).should.equal(true);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, hexBufferBody);
    });
  });

  describe(`encoded bodyType: "sequence"`, function () {
    const expectedTypeCode = 0x76;
    const bodyType = "sequence";

    it("should correctly encode/decode a null message body", async function () {
      const encoded = transformer.encode(nullBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an undefined message body", async function () {
      const encoded = transformer.encode(undefinedBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      should.equal(decoded, nullBody);
    });

    it("should correctly encode/decode an array message body", async function () {
      const encoded = transformer.encode(arrayBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, arrayBody);
    });

    it("should correctly encode/decode an object message body", async function () {
      const encoded = transformer.encode(objectBody, bodyType);
      encoded.typecode.should.equal(expectedTypeCode);
      const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
      should.equal(decodedType, bodyType);
      assert.deepStrictEqual(decoded, objectBody);
    });
  });

  describe("decode", function () {
    // It is possible that we receive an AMQP value type from the messages that were sent with
    // previously shipped version of the sdk. If so then we should be able to handle those scenarios.
    it("should correctly decode a string message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(stringBody, false);
      should.equal(decodedType, "value");
      (decoded as string).should.equal(stringBody);
    });

    it("should correctly decode a string message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(stringBody, true);
      should.equal(decodedType, "value");
      (decoded as string).should.equal(stringBody);
    });

    it("should correctly decode a number message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(numberBody, false);
      should.equal(decodedType, "value");
      (decoded as number).should.equal(numberBody);
    });

    it("should correctly decode a number message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(numberBody, true);
      should.equal(decodedType, "value");
      (decoded as number).should.equal(numberBody);
    });

    it("should correctly decode a boolean message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(booleanBody, false);
      should.equal(decodedType, "value");
      (decoded as boolean).should.equal(booleanBody);
    });

    it("should correctly decode a boolean message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(booleanBody, true);
      should.equal(decodedType, "value");
      (decoded as boolean).should.equal(booleanBody);
    });

    it("should correctly decode a null message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(nullBody, false);
      should.equal(decodedType, "value");
      should.equal(decoded, nullBody);
    });

    it("should correctly decode a null message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(nullBody, true);
      should.equal(decodedType, "value");
      should.equal(decoded, nullBody);
    });

    it("should correctly decode an undefined message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(undefinedBody, false);
      should.equal(decodedType, "value");
      should.equal(decoded, undefined);
    });

    it("should correctly decode an undefined message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(undefinedBody, true);
      should.equal(decodedType, "value");
      should.equal(decoded, undefined);
    });

    it("should correctly decode an empty string message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(emptyStringBody, false);
      should.equal(decodedType, "value");
      (decoded as string).should.equal(emptyStringBody);
    });

    it("should correctly decode an empty string message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(emptyStringBody, true);
      should.equal(decodedType, "value");
      (decoded as string).should.equal(emptyStringBody);
    });

    it("should correctly decode an array message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(arrayBody, false);
      should.equal(decodedType, "value");
      assert.deepStrictEqual(decoded, arrayBody);
    });

    it("should correctly decode an array message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(arrayBody, true);
      should.equal(decodedType, "value");
      assert.deepStrictEqual(decoded, arrayBody);
    });

    it("should correctly decode an object message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(objectBody, false);
      should.equal(decodedType, "value");
      assert.deepStrictEqual(decoded, objectBody);
    });

    it("should correctly decode an object message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(objectBody, true);
      should.equal(decodedType, "value");
      assert.deepStrictEqual(decoded, objectBody);
    });

    it("should correctly decode a buffer message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(bufferBody, false);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, bufferBody);
    });

    it("should correctly decode a buffer message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(bufferBody, true);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, bufferBody);
    });

    it("should correctly decode a hex buffer message body", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(hexBufferBody, false);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, hexBufferBody);
    });

    it("should correctly decode a hex buffer message body, setting skipParsingBodyAsJson to true", async function () {
      const { body: decoded, bodyType: decodedType } = transformer.decode(hexBufferBody, false);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, hexBufferBody);
    });

    it("should correctly decode a buffer message body and that body is a JSON string", async function () {
      const jsonBody = {
        foo: "bar",
      };
      const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
      const { body: decoded, bodyType: decodedType } = transformer.decode(
        jsonStringBufferBody,
        false,
      );
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, jsonBody);
    });

    it("should correctly decode a buffer message body and that body is a JSON string, setting skipParsingBodyAsJson to true", async function () {
      const jsonBody = {
        foo: "bar",
      };
      const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
      const { body: decoded, bodyType: decodedType } = transformer.decode(
        jsonStringBufferBody,
        true,
      );
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, jsonStringBufferBody);
    });

    it("should correctly decode a buffer message body and that body is a JSON string for a rhea AMQP section", async function () {
      const jsonBody = {
        foo: "bar",
      };
      const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
      const rheaAmqpSection = {
        typecode: dataSectionTypeCode,
        content: jsonStringBufferBody,
      };
      const { body: decoded, bodyType: decodedType } = transformer.decode(rheaAmqpSection, false);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, jsonBody);
    });

    it("should correctly decode a buffer message body and that body is a JSON string for a rhea AMQP section, setting skipParsingBodyAsJson to true", async function () {
      const jsonBody = {
        foo: "bar",
      };
      const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
      const rheaAmqpSection = {
        typecode: dataSectionTypeCode,
        content: jsonStringBufferBody,
      };
      const { body: decoded, bodyType: decodedType } = transformer.decode(rheaAmqpSection, true);
      should.equal(decodedType, "data");
      assert.deepStrictEqual(decoded, jsonStringBufferBody);
    });
  });
});
