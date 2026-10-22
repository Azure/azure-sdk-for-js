// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import {
  hasExpectContinueHeader,
  headerValues,
  removeBodyHeaders,
} from "../../src/util/expectContinueHeaders.js";

describe("effective Expect headers", () => {
  it.each([
    [{ Expect: "100-continue" }, true],
    [{ eXpEcT: "other, 100-CoNtInUe" }, true],
    [{ Expect: ["other", "100-continue"] }, true],
    [{ Expect: "100-continue", expect: "other" }, false],
    [{ Expect: "other", expect: "100-continue" }, true],
    [["Expect", "other", "expect", "100-continue"], true],
    [
      [
        ["Expect", "other"],
        ["expect", "100-continue"],
      ],
      true,
    ],
    [{ Expect: "x100-continue" }, false],
    [{ Expect: "100-continue-more" }, false],
    [{ Expect: 100 }, false],
    [{}, false],
    [undefined, false],
    [null, false],
  ])("matches effective tokens in %s", (headers, expected) => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "100-continue" }),
      requestOverrides: { headers },
    });
    expect(hasExpectContinueHeader(request)).toBe(expected);
  });

  it.each(["object", "flat", "pairs"])(
    "removes only negotiation and framing from %s replacements",
    (shape) => {
      const pairs = [
        ["Expect", "other, 100-continue"],
        ["Content-Length", "4"],
        ["Transfer-Encoding", "chunked"],
        ["X-Preserved", "yes"],
      ];
      const headers =
        shape === "flat" ? pairs.flat() : shape === "pairs" ? pairs : Object.fromEntries(pairs);
      const before = JSON.stringify(headers);
      const request = createPipelineRequest({
        url: "https://localhost",
        method: "POST",
        headers: createHttpHeaders({ Expect: "100-continue", "Content-Length": "4" }),
        requestOverrides: { headers, method: "POST" },
      });
      removeBodyHeaders(request);
      expect(request.requestOverrides?.method).toBe("POST");
      expect(headerValues(request.requestOverrides?.headers, "expect")).toEqual(["other"]);
      expect(headerValues(request.requestOverrides?.headers, "content-length")).toEqual([]);
      expect(headerValues(request.requestOverrides?.headers, "transfer-encoding")).toEqual([]);
      expect(headerValues(request.requestOverrides?.headers, "x-preserved")).toEqual(["yes"]);
      expect(request.headers.has("Expect")).toBe(false);
      expect(JSON.stringify(headers)).toBe(before);
    },
  );

  it("drops an Expect header whose array values contain only 100-continue", () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      method: "POST",
      requestOverrides: { headers: { Expect: ["100-continue"] }, method: "POST" },
    });

    removeBodyHeaders(request);

    expect(request.requestOverrides?.headers).toEqual({});
  });
});
