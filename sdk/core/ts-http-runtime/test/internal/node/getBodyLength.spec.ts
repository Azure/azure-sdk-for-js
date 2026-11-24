// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getBodyLength } from "../../../src/nodeHttpClient.js";

describe("Get Body Length", function () {
  it("Gets the length of the ASCII string correctly", function () {
    const str: string = "true";
    assert.equal(getBodyLength(str), 4);
  });

  it("Gets the length of the non-ASCII string correctly", function () {
    const str: string =
      "啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€";
    assert.equal(getBodyLength(str), 194);
  });

  it.each([
    { kind: "empty", body: "", expected: 0 },
    { kind: "multibyte", body: "\u00e9", expected: 2 },
    { kind: "surrogate pair", body: "A\uD83D\uDE00B", expected: 6 },
    { kind: "unpaired high surrogate", body: "\uD800", expected: 3 },
    { kind: "unpaired low surrogate", body: "\uDC00", expected: 3 },
  ])("sizes a $kind string using UTF-8 bytes", ({ body, expected }) => {
    assert.equal(getBodyLength(body), expected);
  });
});
