// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Mapper, createSerializer } from "../../src";
import { assert } from "chai";

describe("Serializer (browser specific)", function () {
  describe("serialize", function () {
    it("Should accept File objects as Blobs", function () {
      const file = new File(
        ["In ancient times, cats were worshiped as gods. They have never forgotten this."],
        "cats.txt",
        { type: "text/plain" }
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
  });
});
