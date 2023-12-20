// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders } from "../../src/httpHeaders";
import { isNode, stringToUint8Array } from "@azure/core-util";
import { Readable } from "stream";
import { assert, describe, it } from "vitest";
import { performRequest } from "../multipartPolicy.spec";
import { assertBodyMatches } from "../util";

describe("multipartPolicy (node-only)", function () {
  it.skipIf(!isNode)("supports Node ReadableStream body", async function () {
    const body = Readable.from(Buffer.from("part1", "utf-8"));

    const request = await performRequest({
      multipartBody: {
        boundary: "blah",
        parts: [
          {
            body,
            headers: createHttpHeaders(),
          },
        ],
      },
    });

    const expectedBody = stringToUint8Array("--blah\r\n\r\npart1\r\n--blah--\r\n\r\n", "utf-8");
    await assertBodyMatches(request.body, expectedBody);
    assert.isUndefined(
      request.headers.get("Content-Length"),
      "Content-Length value should not be inferred from a stream"
    );
  });
});
