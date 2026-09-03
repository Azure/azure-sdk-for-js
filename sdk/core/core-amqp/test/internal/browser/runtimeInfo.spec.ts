// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getPlatformInfo, getFrameworkInfo } from "../../../src/util/runtimeInfo-browser.mjs";

describe("runtimeInfo (browser)", function () {
  it("getPlatformInfo returns a string containing 'javascript-Browser'", function () {
    const info = getPlatformInfo();
    assert.include(info, "javascript-Browser");
    assert.match(info, /^\(javascript-Browser-.+\)$/);
  });

  it("getFrameworkInfo returns a string starting with 'Browser/'", function () {
    const info = getFrameworkInfo();
    assert.match(info, /^Browser\/.+/);
  });
});
