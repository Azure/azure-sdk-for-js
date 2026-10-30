// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import {
  getEffectiveHeaderValues,
  hasExpectContinue,
  hasExpectHeader,
} from "../../src/util/expectContinueHeaders.js";

describe("Expect header detection", () => {
  it("detects 100-continue case-insensitively", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "foo, 100-CoNtInUe" }),
    });

    expect(hasExpectHeader(request)).toBe(true);
    expect(hasExpectContinue(request)).toBe(true);
  });

  it("uses replacement headers from request overrides", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "100-continue" }),
      requestOverrides: { headers: { "x-test": "value" } },
    });

    expect(hasExpectHeader(request)).toBe(false);
    expect(hasExpectContinue(request)).toBe(false);
  });

  it("supports raw header arrays in request overrides", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      requestOverrides: { headers: ["Expect", "100-continue"] },
    });

    expect(getEffectiveHeaderValues(request, "expect")).toEqual(["100-continue"]);
    expect(hasExpectContinue(request)).toBe(true);
  });
});
