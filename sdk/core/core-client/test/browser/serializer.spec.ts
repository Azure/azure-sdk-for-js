// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { Mapper, createSerializer } from "../../src/index.js";

describe("Serializer (browser specific)", function () {
  describe("serialize", function () {
    it("Should accept File objects as Blobs", function () {
      const file = new File(
        ["In ancient times, cats were worshiped as gods. They have never forgotten this."],
        "cats.txt",
        { type: "text/plain" },
      );

      const serializer = createSerializer();

      const mapper: Mapper = {
        type: { name: "Stream" },
        required: true,
        serializedName: "File",
      };

      const result = serializer.serialize(mapper, file);
      assert.strictEqual(result, file, "Expect file streams to be left intact");
    });

    it("Should accept ReadableStream", function () {
      const stream = new ReadableStream();

      const serializer = createSerializer();

      const mapper: Mapper = {
        type: { name: "Stream" },
        required: true,
        serializedName: "Stream",
      };

      const result = serializer.serialize(mapper, stream);
      assert.strictEqual(result, stream, "Expect stream to be left intact");
    });
  });
});
