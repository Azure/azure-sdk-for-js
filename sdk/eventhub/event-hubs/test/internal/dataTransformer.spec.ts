// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai, { assert } from "chai";
import { dataSectionTypeCode, defaultDataTransformer } from "../../src/dataTransformer";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";

const should = chai.should();

testWithServiceTypes(() => {
  describe("DataTransformer", function () {
    const objectBody: any = {
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
    const stringBody: string = "some string";
    const booleanBody: boolean = true;
    const numberBody: number = 10.2;
    const nullBody: null = null;
    const undefinedBody: undefined = undefined;
    const emptyStringBody: string = "";
    const bufferBody: Buffer = Buffer.from("zzz", "utf8");
    const hexBufferBody: Buffer = Buffer.from("7468697320697320612074c3a97374", "hex");
    const transformer = defaultDataTransformer;

    describe(`encoded bodyType: "data"`, () => {
      const bodyType = "data";

      it("should correctly encode/decode a string message body", (done) => {
        const encoded: any = transformer.encode(stringBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly encode/decode a number message body", (done) => {
        const encoded: any = transformer.encode(numberBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly encode/decode a boolean message body", (done) => {
        const encoded: any = transformer.encode(booleanBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly encode/decode a null message body", (done) => {
        const encoded: any = transformer.encode(nullBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(false);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", (done) => {
        const encoded: any = transformer.encode(undefinedBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(false);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an empty string message body", (done) => {
        const encoded: any = transformer.encode(emptyStringBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly encode/decode an array message body", (done) => {
        const encoded: any = transformer.encode(arrayBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", (done) => {
        const encoded: any = transformer.encode(objectBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, objectBody);
        done();
      });

      it("should correctly encode/decode a buffer message body", (done) => {
        const encoded: any = transformer.encode(bufferBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, bufferBody);
        done();
      });

      it("should correctly encode/decode a hex buffer message body", (done) => {
        const encoded: any = transformer.encode(hexBufferBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, hexBufferBody);
        done();
      });
    });

    describe(`encoded bodyType: "value"`, () => {
      const expectedTypeCode = 0x77;
      const bodyType = "value";

      it("should correctly encode/decode a string message body", (done) => {
        const encoded: any = transformer.encode(stringBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly encode/decode a number message body", (done) => {
        const encoded: any = transformer.encode(numberBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly encode/decode a boolean message body", (done) => {
        const encoded: any = transformer.encode(booleanBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly encode/decode a null message body", (done) => {
        const encoded: any = transformer.encode(nullBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", (done) => {
        const encoded: any = transformer.encode(undefinedBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an empty string message body", (done) => {
        const encoded: any = transformer.encode(emptyStringBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly encode/decode an array message body", (done) => {
        const encoded: any = transformer.encode(arrayBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", (done) => {
        const encoded: any = transformer.encode(objectBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, objectBody);
        done();
      });

      it("should correctly encode/decode a buffer message body", (done) => {
        const encoded: any = transformer.encode(bufferBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, bufferBody);
        done();
      });

      it("should correctly encode/decode a hex buffer message body", (done) => {
        const encoded: any = transformer.encode(hexBufferBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, hexBufferBody);
        done();
      });
    });

    describe(`encoded bodyType: "sequence"`, () => {
      const expectedTypeCode = 0x76;
      const bodyType = "sequence";

      it("should correctly encode/decode a null message body", (done) => {
        const encoded: any = transformer.encode(nullBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", (done) => {
        const encoded: any = transformer.encode(undefinedBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an array message body", (done) => {
        const encoded: any = transformer.encode(arrayBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", (done) => {
        const encoded: any = transformer.encode(objectBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded, false);
        should.equal(decodedType, bodyType);
        assert.deepStrictEqual(decoded, objectBody);
        done();
      });
    });

    describe("decode", () => {
      // It is possible that we receive an AMQP value type from the messages that were sent with
      // previously shipped version of the sdk. If so then we should be able to handle those scenarios.
      it("should correctly decode a string message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(stringBody, false);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly decode a string message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(stringBody, true);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly decode a number message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(numberBody, false);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly decode a number message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(numberBody, true);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly decode a boolean message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(booleanBody, false);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly decode a boolean message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(booleanBody, true);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly decode a null message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(nullBody, false);
        should.equal(decodedType, "value");
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly decode a null message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(nullBody, true);
        should.equal(decodedType, "value");
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly decode an undefined message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(undefinedBody, false);
        should.equal(decodedType, "value");
        should.equal(decoded, undefined);
        done();
      });

      it("should correctly decode an undefined message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(undefinedBody, true);
        should.equal(decodedType, "value");
        should.equal(decoded, undefined);
        done();
      });

      it("should correctly decode an empty string message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(emptyStringBody, false);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly decode an empty string message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(emptyStringBody, true);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly decode an array message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(arrayBody, false);
        should.equal(decodedType, "value");
        assert.deepStrictEqual(decoded, arrayBody);
        done();
      });

      it("should correctly decode an array message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(arrayBody, true);
        should.equal(decodedType, "value");
        assert.deepStrictEqual(decoded, arrayBody);
        done();
      });

      it("should correctly decode an object message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(objectBody, false);
        should.equal(decodedType, "value");
        assert.deepStrictEqual(decoded, objectBody);
        done();
      });

      it("should correctly decode an object message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(objectBody, true);
        should.equal(decodedType, "value");
        assert.deepStrictEqual(decoded, objectBody);
        done();
      });

      it("should correctly decode a buffer message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(bufferBody, false);
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, bufferBody);
        done();
      });

      it("should correctly decode a buffer message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(bufferBody, true);
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, bufferBody);
        done();
      });

      it("should correctly decode a hex buffer message body", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(hexBufferBody, false);
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, hexBufferBody);
        done();
      });

      it("should correctly decode a hex buffer message body, setting skipParsingBodyAsJson to true", (done) => {
        const { body: decoded, bodyType: decodedType } = transformer.decode(hexBufferBody, false);
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, hexBufferBody);
        done();
      });

      it("should correctly decode a buffer message body and that body is a JSON string", (done) => {
        const jsonBody = {
          foo: "bar",
        };
        const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
        const { body: decoded, bodyType: decodedType } = transformer.decode(
          jsonStringBufferBody,
          false
        );
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, jsonBody);
        done();
      });

      it("should correctly decode a buffer message body and that body is a JSON string, setting skipParsingBodyAsJson to true", (done) => {
        const jsonBody = {
          foo: "bar",
        };
        const jsonStringBufferBody = Buffer.from(JSON.stringify(jsonBody), "utf8");
        const { body: decoded, bodyType: decodedType } = transformer.decode(
          jsonStringBufferBody,
          true
        );
        should.equal(decodedType, "data");
        assert.deepStrictEqual(decoded, jsonStringBufferBody);
        done();
      });

      it("should correctly decode a buffer message body and that body is a JSON string for a rhea AMQP section", (done) => {
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
        done();
      });

      it("should correctly decode a buffer message body and that body is a JSON string for a rhea AMQP section, setting skipParsingBodyAsJson to true", (done) => {
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
        done();
      });
    });
  });
});
