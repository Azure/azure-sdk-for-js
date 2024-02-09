// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getBodyLength } from "../../src/nodeHttpClient";

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
});
