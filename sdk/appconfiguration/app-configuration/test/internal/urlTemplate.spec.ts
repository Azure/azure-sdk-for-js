// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { expandUrlTemplate } from "../../src/generated/static-helpers/urlTemplate.js";

describe("URL template encoding", () => {
  it.each([
    { description: "scalar", value: "name", expected: "name" },
    { description: "list", value: ["name", "label"], expected: "name,label" },
    { description: "record", value: { name: "value" }, expected: "name,value" },
  ])("preserves encoded query names for $description values", ({ value, expected }) => {
    const url = expandUrlTemplate("/labels{?%24Select}", { "%24Select": value });

    assert.equal(url, `/labels?%24Select=${expected}`);
  });

  it("preserves encoded query names for exploded lists", () => {
    const url = expandUrlTemplate("/labels{?%24Select*}", {
      "%24Select": ["name", "label"],
    });

    assert.equal(url, "/labels?%24Select=name&%24Select=label");
  });

  it("encodes path and query values without decoding literal percent escapes", () => {
    const url = expandUrlTemplate("/kv/{key}{?label,%24Select}", {
      key: "key?/#%",
      label: "%24value&other=value",
      "%24Select": ["key", "value"],
    });

    assert.equal(url, "/kv/key%3F%2F%23%25?label=%2524value%26other%3Dvalue&%24Select=key,value");
  });
});
