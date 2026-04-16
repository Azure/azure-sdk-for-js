// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { getUserAgentValue, getUserAgentHeaderName } from "../../../src/util/userAgent.js";

// Access the internal getUserAgentString logic through getUserAgentValue
// by mocking setPlatformSpecificData to add an entry with an empty value

vi.mock("../../../src/util/userAgentPlatform.js", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../../src/util/userAgentPlatform.js")>();
  return {
    ...original,
    setPlatformSpecificData: vi.fn(original.setPlatformSpecificData),
  };
});

import { setPlatformSpecificData } from "../../../src/util/userAgentPlatform.js";

describe("userAgent utils - additional coverage", function () {
  it("getUserAgentHeaderName returns User-Agent", function () {
    assert.equal(getUserAgentHeaderName(), "User-Agent");
  });

  it("getUserAgentValue returns value without prefix", async function () {
    const value = await getUserAgentValue();
    assert.isDefined(value);
    assert.isTrue(value.includes("core-rest-pipeline"));
    // Should NOT have a prefix
    assert.isFalse(value.startsWith(" "));
  });

  it("getUserAgentValue returns value with prefix", async function () {
    const value = await getUserAgentValue("my-test-prefix");
    assert.isDefined(value);
    assert.isTrue(value.startsWith("my-test-prefix"));
    assert.isTrue(value.includes("core-rest-pipeline"));
  });

  it("getUserAgentValue with empty string prefix", async function () {
    const value = await getUserAgentValue("");
    assert.isDefined(value);
    // empty prefix should not add a leading space
    assert.isTrue(value.includes("core-rest-pipeline"));
  });

  it("includes key without value when platform data has empty value", async function () {
    // Mock setPlatformSpecificData to add an entry with empty string value
    // This exercises the `value ? `${key}/${value}` : key` false branch in getUserAgentString
    vi.mocked(setPlatformSpecificData).mockImplementation(async (map) => {
      map.set("EmptyRuntime", "");
    });

    const value = await getUserAgentValue();
    assert.isTrue(value.includes("EmptyRuntime"));
    // Should contain just "EmptyRuntime" without a trailing slash
    assert.isFalse(value.includes("EmptyRuntime/"));
  });
});
