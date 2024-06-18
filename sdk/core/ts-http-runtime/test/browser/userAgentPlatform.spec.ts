// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { setPlatformSpecificData } from "../../src/util/userAgentPlatform.js";

describe("userAgentPlatform", () => {
  it("should set OS", async () => {
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.ok(map.has("OS"));
  });

  it("should set the Browser Type", async () => {
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    // Switch if we're using a different browser runner
    assert.ok(map.has("Chromium"));
  });
});
