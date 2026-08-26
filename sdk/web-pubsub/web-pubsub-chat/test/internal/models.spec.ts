// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { messageContentDeserializer, messageContentSerializer } from "../../src/models/models.js";
import { assert, describe, it } from "vitest";

describe("message content serialization", () => {
  it("round-trips binary content through base64", () => {
    const binary = new Uint8Array([1, 2, 3, 255]);

    const serialized = messageContentSerializer({ binary });
    const deserialized = messageContentDeserializer(serialized);

    assert.equal(serialized.binary, "AQID/w==");
    assert.deepEqual(deserialized.binary, binary);
  });
});
