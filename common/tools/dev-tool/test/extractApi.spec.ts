// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { createApiDiff } from "../src/commands/run/extract-api.ts";

describe("extract-api", () => {
  it("removes trailing whitespace from blank diff lines", () => {
    const diff = createApiDiff("one\n\nthree\n", "one\n\n \nthree\n", "browser");

    assert.include(diff, "\n one\n\n+\n three\n");
    assert.notMatch(diff!, /[ \t]+$/m);
  });
});
