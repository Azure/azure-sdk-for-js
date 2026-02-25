// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { setPlatformSpecificData } from "../../src/util/userAgentPlatform.js";

describe("userAgentPlatform", () => {
  it("should set the Browser Type", async () => {
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    // Switch if we're using a different browser runner
    assert.isTrue(map.has("Chromium"));
  });
});
