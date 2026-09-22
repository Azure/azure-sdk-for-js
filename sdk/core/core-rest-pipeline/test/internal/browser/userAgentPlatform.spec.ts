// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getHeaderName, setPlatformSpecificData } from "#platform/userAgent";

describe("userAgentPlatform", () => {
  it("should return 'x-ms-useragent' as the header name", () => {
    assert.equal(getHeaderName(), "x-ms-useragent");
  });

  it("should set the Browser Type", async () => {
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    // Switch if we're using a different browser runner
    assert.isTrue(map.has("Chromium"));
  });
});
