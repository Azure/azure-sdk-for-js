// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import { defaultDataTransformer } from "$internal/dataTransformer.js";
import { describe, it } from "vitest";
import { assert, should } from "../../public/utils/chai.js";

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
  const uint8ArrayBody = new Uint8Array([0x1, 0x2, 0x3, 0x4]);
  const transformer = defaultDataTransformer;

  it("should correctly encode/decode a string message body", function () {
    const encoded: any = transformer.encode(stringBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    decoded.should.equal(stringBody);
  });

  it("should not decode a message body when skipParsingBodyAsJson is specified", function () {
    const encoded: any = transformer.encode(stringBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, true);
    decoded.should.equal(encoded.content);
  });

  it("should correctly encode/decode a number message body", function () {
    const encoded: any = transformer.encode(numberBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    decoded.should.equal(numberBody);
  });

  it("should correctly encode/decode a boolean message body", function () {
    const encoded: any = transformer.encode(booleanBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    decoded.should.equal(booleanBody);
  });

  it("should correctly encode/decode a null message body", function () {
    const encoded: any = transformer.encode(nullBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    should.equal(decoded, nullBody);
  });

  it("should correctly encode/decode an undefined message body", function () {
    const encoded: any = transformer.encode(undefinedBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    should.equal(decoded, nullBody);
  });

  it("should correctly encode/decode an empty string message body", function () {
    const encoded: any = transformer.encode(emptyStringBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    decoded.should.equal(emptyStringBody);
  });

  it("should correctly encode/decode an array message body", function () {
    const encoded: any = transformer.encode(arrayBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    assert.deepEqual(decoded, arrayBody);
  });

  it("should correctly encode/decode an object message body", function () {
    const encoded: any = transformer.encode(objectBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    assert.deepEqual(decoded, objectBody);
  });

  it("should correctly encode/decode a buffer message body", function () {
    const encoded: any = transformer.encode(bufferBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    assert.deepEqual(decoded, bufferBody);
  });

  it("should correctly encode/decode a Uint8Array message body", function () {
    const encoded: any = transformer.encode(uint8ArrayBody, "data");
    encoded.typecode.should.equal(117);
    console.dir({ encoded });
    (encoded.content instanceof Uint8Array).should.equal(true);
    (encoded.content as Uint8Array).length.should.equal(4);
    const decoded: any = transformer.decode(encoded, false);
    assert.deepEqual(decoded, uint8ArrayBody);
  });

  it("should correctly encode/decode a hex buffer message body", function () {
    const encoded: any = transformer.encode(hexBufferBody, "data");
    encoded.typecode.should.equal(117);
    isBuffer(encoded.content).should.equal(true);
    const decoded: any = transformer.decode(encoded, false);
    assert.deepEqual(decoded, hexBufferBody);
  });

  describe("decode", function () {
    // It is possible that we receive an AMQP value type from the messages that were sent with
    // previously shipped version of the sdk. If so then we should be able to handle those scenarios.
    it("should correctly decode a string message body", function () {
      const decoded: any = transformer.decode(stringBody, false);
      decoded.should.equal(stringBody);
    });

    it("should correctly decode a number message body", function () {
      const decoded: any = transformer.decode(numberBody, false);
      decoded.should.equal(numberBody);
    });

    it("should correctly decode a boolean message body", function () {
      const decoded: any = transformer.decode(booleanBody, false);
      decoded.should.equal(booleanBody);
    });

    it("should correctly decode a null message body", function () {
      const decoded: any = transformer.decode(nullBody, false);
      should.equal(decoded, nullBody);
    });

    it("should correctly decode an undefined message body", function () {
      const decoded: any = transformer.decode(undefinedBody, false);
      should.equal(decoded, undefined);
    });

    it("should correctly decode an empty string message body", function () {
      const decoded: any = transformer.decode(emptyStringBody, false);
      decoded.should.equal(emptyStringBody);
    });

    it("should correctly decode an array message body", function () {
      const decoded: any = transformer.decode(arrayBody, false);
      assert.deepEqual(decoded, arrayBody);
    });

    it("should correctly decode an object message body", function () {
      const decoded: any = transformer.decode(objectBody, false);
      assert.deepEqual(decoded, objectBody);
    });

    it("should correctly decode a buffer message body", function () {
      const decoded: any = transformer.decode(bufferBody, false);
      assert.deepEqual(decoded, bufferBody);
    });

    it("should correctly decode a hex buffer message body", function () {
      const decoded: any = transformer.decode(hexBufferBody, false);
      assert.deepEqual(decoded, hexBufferBody);
    });
  });
});
