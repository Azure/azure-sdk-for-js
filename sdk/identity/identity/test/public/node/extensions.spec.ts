// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeCredential } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

describe("Plugin API", function () {
  it("Setting persistence options throws if not initialized", function () {
    assert.throws(() => {
      new DeviceCodeCredential({
        tokenCachePersistenceOptions: {
          enabled: true,
        },
      });
    }, /no persistence provider.*@azure\/identity-cache-persistence/);
  });
});
