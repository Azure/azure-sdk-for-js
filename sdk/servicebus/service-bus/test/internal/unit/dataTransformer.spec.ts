// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Buffer } from "buffer";
import * as chai from "chai";
const should = chai.should();
import * as assert from "assert";
import isBuffer from "is-buffer";
import { defaultDataTransformer } from "../../../src/dataTransformer";

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

  it("should correctly encode/decode a string message body", function(done) {
    const encoded: any = transformer.encode(stringBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    decoded.should.equal(stringBody);
    done();
  });

  it("should correctly encode/decode a number message body", function(done) {
    const encoded: any = transformer.encode(numberBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    decoded.should.equal(numberBody);
    done();
  });

  it("should correctly encode/decode a boolean message body", function(done) {
    const encoded: any = transformer.encode(booleanBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    decoded.should.equal(booleanBody);
    done();
  });

  it("should correctly encode/decode a null message body", function(done) {
    const encoded: any = transformer.encode(nullBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    should.equal(decoded, nullBody);
    done();
  });

  it("should correctly encode/decode an undefined message body", function(done) {
    const encoded: any = transformer.encode(undefinedBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    should.equal(decoded, nullBody);
    done();
  });

  it("should correctly encode/decode an empty string message body", function(done) {
    const encoded: any = transformer.encode(emptyStringBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    decoded.should.equal(emptyStringBody);
    done();
  });

  it("should correctly encode/decode an array message body", function(done) {
    const encoded: any = transformer.encode(arrayBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    assert.deepEqual(decoded, arrayBody);
    done();
  });

  it("should correctly encode/decode an object message body", function(done) {
    const encoded: any = transformer.encode(objectBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    assert.deepEqual(decoded, objectBody);
    done();
  });

  it("should correctly encode/decode a buffer message body", function(done) {
    const encoded: any = transformer.encode(bufferBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    assert.deepEqual(decoded, bufferBody);
    done();
  });

  it("should correctly encode/decode a hex buffer message body", function(done) {
    const encoded: any = transformer.encode(hexBufferBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded);
    assert.deepEqual(decoded, hexBufferBody);
    done();
  });

  describe("decode", function() {
    // It is possible that we receive an AMQP value type from the messages that were sent with
    // previously shipped version of the sdk. If so then we should be able to handle those scenarios.
    it("should correctly decode a string message body", function(done) {
      const decoded: any = transformer.decode(stringBody);
      decoded.should.equal(stringBody);
      done();
    });

    it("should correctly decode a number message body", function(done) {
      const decoded: any = transformer.decode(numberBody);
      decoded.should.equal(numberBody);
      done();
    });

    it("should correctly decode a boolean message body", function(done) {
      const decoded: any = transformer.decode(booleanBody);
      decoded.should.equal(booleanBody);
      done();
    });

    it("should correctly decode a null message body", function(done) {
      const decoded: any = transformer.decode(nullBody);
      should.equal(decoded, nullBody);
      done();
    });

    it("should correctly decode an undefined message body", function(done) {
      const decoded: any = transformer.decode(undefinedBody);
      should.equal(decoded, undefined);
      done();
    });

    it("should correctly decode an empty string message body", function(done) {
      const decoded: any = transformer.decode(emptyStringBody);
      decoded.should.equal(emptyStringBody);
      done();
    });

    it("should correctly decode an array message body", function(done) {
      const decoded: any = transformer.decode(arrayBody);
      assert.deepEqual(decoded, arrayBody);
      done();
    });

    it("should correctly decode an object message body", function(done) {
      const decoded: any = transformer.decode(objectBody);
      assert.deepEqual(decoded, objectBody);
      done();
    });

    it("should correctly decode a buffer message body", function(done) {
      const decoded: any = transformer.decode(bufferBody);
      assert.deepEqual(decoded, bufferBody);
      done();
    });

    it("should correctly decode a hex buffer message body", function(done) {
      const decoded: any = transformer.decode(hexBufferBody);
      assert.deepEqual(decoded, hexBufferBody);
      done();
    });
  });
});
