// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLoopbackAddress } from "../src/util/utils";
import { assert } from "@azure/test-utils";

describe("isLoopbackAddress", () => {
  it("returns true for localhost", () => {
    assert.isTrue(isLoopbackAddress("localhost"));
  });

  it("returns true for 127-prefix addresses", () => {
    assert.isTrue(isLoopbackAddress("127.0.0.1"));
    assert.isTrue(isLoopbackAddress("127.0.0.2"));
  });

  it("returns true for 0:0:0:0:0:1", () => {
    assert.isTrue(isLoopbackAddress("0:0:0:0:0:1"));
  });

  it("returns true for ::1", () => {
    assert.isTrue(isLoopbackAddress("::1"));
  });

  it("returns false for other addresses", () => {
    assert.isFalse(isLoopbackAddress("test.servicebus.windows.net"));
  });
});
