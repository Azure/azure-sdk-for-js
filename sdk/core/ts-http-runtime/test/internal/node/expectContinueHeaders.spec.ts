// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { RequestOptions } from "node:http";
import { createHttpHeaders, createPipelineRequest } from "../../../src/index.js";
import {
  addExpectContinueFraming,
  getEffectiveHeaderValues,
  hasExpectContinue,
} from "../../../src/util/nodeExpectContinue.js";

describe("Expect header detection", () => {
  it("detects 100-continue case-insensitively", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "foo, 100-CoNtInUe" }),
    });

    expect(hasExpectContinue(request)).toBe(true);
  });

  it("uses replacement headers from request overrides", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "100-continue" }),
      requestOverrides: { headers: { "x-test": "value" } },
    });

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
    expect(hasExpectContinue(request)).toBe(false);
  });
});

describe("Expect: 100-continue framing", () => {
  it.each([
    { format: "flat", headers: ["cOnTeNt-LeNgTh", "3"] },
    { format: "flat", headers: ["tRaNsFeR-EnCoDiNg", "chunked"] },
    { format: "paired", headers: [["cOnTeNt-LeNgTh", "3"]] },
    { format: "paired", headers: [["tRaNsFeR-EnCoDiNg", "chunked"]] },
    { format: "object", headers: { "Content-Length": undefined } },
  ])("preserves existing framing in $format headers", ({ headers }) => {
    const options: RequestOptions = {};
    Object.assign(options, { headers });

    addExpectContinueFraming(options, null);

    expect(options.headers).toBe(headers);
  });

  it.each([
    {
      format: "flat",
      bodyLength: 3,
      headers: ["Expect", "100-continue"],
      expected: ["Expect", "100-continue", "Content-Length", "3"],
    },
    {
      format: "flat",
      bodyLength: null,
      headers: ["Expect", "100-continue"],
      expected: ["Expect", "100-continue", "Transfer-Encoding", "chunked"],
    },
    {
      format: "paired",
      bodyLength: 3,
      headers: [["Expect", "100-continue"]],
      expected: [
        ["Expect", "100-continue"],
        ["Content-Length", "3"],
      ],
    },
    {
      format: "paired",
      bodyLength: null,
      headers: [["Expect", "100-continue"]],
      expected: [
        ["Expect", "100-continue"],
        ["Transfer-Encoding", "chunked"],
      ],
    },
  ])(
    "adds framing without changing $format header shape (length=$bodyLength)",
    ({ headers, bodyLength, expected }) => {
      const options: RequestOptions = {};
      Object.assign(options, { headers });

      addExpectContinueFraming(options, bodyLength);

      expect(options.headers).toEqual(expected);
      expect(headers).toEqual(
        Array.isArray(headers[0]) ? [["Expect", "100-continue"]] : ["Expect", "100-continue"],
      );
    },
  );
});
