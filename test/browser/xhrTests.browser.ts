// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { parseHeaders } from "../../lib/xhrHttpClient";

describe("XhrHttpClient", function() {
  it("parses headers", function() {
    const xhr = {
      getAllResponseHeaders: () =>
        "Content-Length: 42\r\n" +
        "value: hello\r\n"
    } as XMLHttpRequest;
    const headers = parseHeaders(xhr);
    assert.strictEqual(headers.get("content-length"), "42");
    assert.strictEqual(headers.get("value"), "hello");
  });

  it("parses empty string headers", function() {
    const xhr = {
      getAllResponseHeaders: () =>
        "Content-Type: \r\n" + // preserve trailing whitespace in test case
        "value:\r\n"
    } as XMLHttpRequest;
    const headers = parseHeaders(xhr);
    assert.strictEqual(headers.get("content-type"), "");
    assert.strictEqual(headers.get("value"), "");
  });
});
