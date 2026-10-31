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

  it.each([
    {
      format: "flat",
      headers: ["x-test", "unrelated", "Expect", "foo", "eXpEcT", "100-continue"],
    },
    {
      format: "paired",
      headers: [
        ["x-test", "unrelated"],
        ["Expect", "foo"],
        ["eXpEcT", "100-continue"],
      ],
    },
  ])("preserves matching values from $format header arrays in request overrides", ({ headers }) => {
    const request = createPipelineRequest({
      url: "https://localhost",
      requestOverrides: { headers },
    });

    expect(getEffectiveHeaderValues(request, "EXPECT")).toEqual(["foo", "100-continue"]);
    expect(hasExpectHeader(request)).toBe(true);
    expect(hasExpectContinue(request)).toBe(true);
  });

  it.each([
    { format: "empty", headers: [] },
    { format: "flat", headers: ["x-test", "value"] },
    { format: "paired", headers: [["x-test", "value"]] },
  ])("returns no values for $format header arrays without Expect", ({ headers }) => {
    const request = createPipelineRequest({
      url: "https://localhost",
      requestOverrides: { headers },
    });

    expect(getEffectiveHeaderValues(request, "expect")).toEqual([]);
    expect(hasExpectHeader(request)).toBe(false);
    expect(hasExpectContinue(request)).toBe(false);
  });
});
