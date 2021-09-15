// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Buffer } from "buffer";
import * as chai from "chai";
const should = chai.should();
import * as assert from "assert";
import isBuffer from "is-buffer";
import { defaultDataTransformer } from "../../src/dataTransformer";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";

testWithServiceTypes(() => {
  describe("DataTransformer", function() {
    const objectBody: any = {
      id: "123-456-789",
      weight: 10,
      isBlue: true,
      siblings: [
        {
          id: "098-789-564",
          weight: 20,
          isBlue: false
        }
      ]
    };
    const arrayBody = [
      {
        id: "098-789-564",
        weight: 20,
        isBlue: false
      },
      10,
      20,
      "some string"
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

      it("should correctly encode/decode a string message body", function(done) {
        const encoded: any = transformer.encode(stringBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly encode/decode a number message body", function(done) {
        const encoded: any = transformer.encode(numberBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly encode/decode a boolean message body", function(done) {
        const encoded: any = transformer.encode(booleanBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly encode/decode a null message body", function(done) {
        const encoded: any = transformer.encode(nullBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(false);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", function(done) {
        const encoded: any = transformer.encode(undefinedBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(false);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an empty string message body", function(done) {
        const encoded: any = transformer.encode(emptyStringBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly encode/decode an array message body", function(done) {
        const encoded: any = transformer.encode(arrayBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", function(done) {
        const encoded: any = transformer.encode(objectBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, objectBody);
        done();
      });

      it("should correctly encode/decode a buffer message body", function(done) {
        const encoded: any = transformer.encode(bufferBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, bufferBody);
        done();
      });

      it("should correctly encode/decode a hex buffer message body", function(done) {
        const encoded: any = transformer.encode(hexBufferBody, "data");
        encoded.typecode.should.equal(117);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, hexBufferBody);
        done();
      });
    });

    describe(`encoded bodyType: "value"`, () => {
      const expectedTypeCode = 0x77;
      const bodyType = "value";

      it("should correctly encode/decode a string message body", function(done) {
        const encoded: any = transformer.encode(stringBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly encode/decode a number message body", function(done) {
        const encoded: any = transformer.encode(numberBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly encode/decode a boolean message body", function(done) {
        const encoded: any = transformer.encode(booleanBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly encode/decode a null message body", function(done) {
        const encoded: any = transformer.encode(nullBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", function(done) {
        const encoded: any = transformer.encode(undefinedBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an empty string message body", function(done) {
        const encoded: any = transformer.encode(emptyStringBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly encode/decode an array message body", function(done) {
        const encoded: any = transformer.encode(arrayBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", function(done) {
        const encoded: any = transformer.encode(objectBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, objectBody);
        done();
      });

      it("should correctly encode/decode a buffer message body", function(done) {
        const encoded: any = transformer.encode(bufferBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, bufferBody);
        done();
      });

      it("should correctly encode/decode a hex buffer message body", function(done) {
        const encoded: any = transformer.encode(hexBufferBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        isBuffer(encoded.content).should.equal(true);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, hexBufferBody);
        done();
      });
    });

    describe(`encoded bodyType: "sequence"`, () => {
      const expectedTypeCode = 0x76;
      const bodyType = "sequence";

      it("should correctly encode/decode a null message body", function(done) {
        const encoded: any = transformer.encode(nullBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an undefined message body", function(done) {
        const encoded: any = transformer.encode(undefinedBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly encode/decode an array message body", function(done) {
        const encoded: any = transformer.encode(arrayBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, arrayBody);
        done();
      });

      it("should correctly encode/decode an object message body", function(done) {
        const encoded: any = transformer.encode(objectBody, bodyType);
        encoded.typecode.should.equal(expectedTypeCode);
        const { body: decoded, bodyType: decodedType } = transformer.decode(encoded);
        should.equal(decodedType, bodyType);
        assert.deepEqual(decoded, objectBody);
        done();
      });
    });

    describe("decode", function() {
      // It is possible that we receive an AMQP value type from the messages that were sent with
      // previously shipped version of the sdk. If so then we should be able to handle those scenarios.
      it("should correctly decode a string message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(stringBody);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(stringBody);
        done();
      });

      it("should correctly decode a number message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(numberBody);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(numberBody);
        done();
      });

      it("should correctly decode a boolean message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(booleanBody);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(booleanBody);
        done();
      });

      it("should correctly decode a null message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(nullBody);
        should.equal(decodedType, "value");
        should.equal(decoded, nullBody);
        done();
      });

      it("should correctly decode an undefined message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(undefinedBody);
        should.equal(decodedType, "value");
        should.equal(decoded, undefined);
        done();
      });

      it("should correctly decode an empty string message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(emptyStringBody);
        should.equal(decodedType, "value");
        (decoded as any).should.equal(emptyStringBody);
        done();
      });

      it("should correctly decode an array message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(arrayBody);
        should.equal(decodedType, "value");
        assert.deepEqual(decoded, arrayBody);
        done();
      });

      it("should correctly decode an object message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(objectBody);
        should.equal(decodedType, "value");
        assert.deepEqual(decoded, objectBody);
        done();
      });

      it("should correctly decode a buffer message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(bufferBody);
        should.equal(decodedType, "data");
        assert.deepEqual(decoded, bufferBody);
        done();
      });

      it("should correctly decode a hex buffer message body", function(done) {
        const { body: decoded, bodyType: decodedType } = transformer.decode(hexBufferBody);
        should.equal(decodedType, "data");
        assert.deepEqual(decoded, hexBufferBody);
        done();
      });
    });
  });
});
