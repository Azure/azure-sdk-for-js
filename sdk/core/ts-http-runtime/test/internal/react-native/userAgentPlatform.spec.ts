// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { setPlatformSpecificData } from "../../../src/util/userAgent.js";

describe("userAgentPlatform (react-native)", () => {
  it("should set react-native platform data from Platform.constants", async () => {
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    // The stub provides Platform = { OS: "test", Version: "0.0.0", constants: { reactNativeVersion: { major: 0, minor: 0, patch: 0 } } }
    assert.strictEqual(map.get("react-native"), "0.0.0 (test 0.0.0)");
  });
});
