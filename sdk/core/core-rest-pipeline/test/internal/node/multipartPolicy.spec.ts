// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHttpHeaders } from "../../../src/httpHeaders.js";
import { stringToUint8Array } from "@azure/core-util";
import { assertBodyMatches } from "../../util.js";
import { createFileFromStream } from "../../../src/util/file.js";
import { performRequest } from "../multipartPolicy.spec.js";

describe("multipartPolicy (ReadableStream body)", function () {
  it("Supports web ReadableStream body", async function () {
    const encoded = stringToUint8Array("part1", "utf-8");
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoded);
        controller.close();
      },
    });

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
      "Content-Length value should not be inferred from a stream",
    );
  });

  it("Supports createFileFromStream body", async function () {
    const body = () =>
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(stringToUint8Array("part1", "utf-8"));
          controller.close();
        },
      });

    const request = await performRequest({
      multipartBody: {
        boundary: "blah",
        parts: [
          {
            body: createFileFromStream(body, "hello.txt"),
            headers: createHttpHeaders(),
          },
        ],
      },
    });

    const expectedBody = stringToUint8Array("--blah\r\n\r\npart1\r\n--blah--\r\n\r\n", "utf-8");
    await assertBodyMatches(request.body, expectedBody);
    assert.isUndefined(
      request.headers.get("Content-Length"),
      "Content-Length value should not be inferred from a stream",
    );
  });
});
