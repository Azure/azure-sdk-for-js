// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { PartDescriptor, buildBodyPart } from "../../src/client/multipart.js";
import { stringToUint8Array } from "../../src/util/bytesEncoding.js";

describe("multipart buildBodyPart", () => {
  describe("content-type calculation", () => {
    it.each([
      {
        description: "content type header set to null results in header being unset",
        descriptor: {
          contentType: null,
          body: "even though the body is a string, the content type should still not be set",
        },
        expected: undefined,
      },
      {
        description: "content-type header set in part headers takes precedence over contentType",
        descriptor: {
          contentType: "dont-pick-me",
          headers: {
            "content-type": "pick-me-instead",
          },
        },
        expected: "pick-me-instead",
      },
      {
        description: "contentType value takes precedence over natural content type",
        descriptor: {
          contentType: "application/json",
          body: `{ "aaa": "bbb" }`, // would otherwise expect this to give text/plain; charset=UTF-8
        },
        expected: "application/json",
      },
      {
        description: "content type is taken from Blob if available",
        descriptor: {
          body: new Blob([], { type: "content-type-from-blob" }),
        },
        expected: "content-type-from-blob",
      },
      {
        description: "contentType value takes precedence over Blob content type",
        descriptor: {
          contentType: "pick-me",
          body: new Blob([], { type: "content-type-from-blob" }),
        },
        expected: "pick-me",
      },
      {
        description: "content type for Blob defaults to application/octet-stream",
        descriptor: {
          body: new Blob([]),
        },
        expected: "application/octet-stream",
      },
      {
        description: `content type for Uint8Array defaults to application/octet-stream`,
        descriptor: {
          body: new Uint8Array([]),
        },
        expected: "application/octet-stream",
      },
    ])("$description", ({ descriptor, expected }) => {
      const result = buildBodyPart(descriptor);
      assert.equal(result.headers.get("content-type"), expected);
    });
  });

  describe("content-disposition calculation", () => {
    it.each([
      {
        description: "explicitly setting header value in headers bag takes precedence",
        descriptor: {
          dispositionType: "ignore-me",
          name: "ignore-me-too",
          filename: "also-ignore-me",
          headers: {
            "content-disposition": "pick-me",
          },
        },
        expected: "pick-me",
      },
      {
        description: "sets disposition correctly without name or filename",
        descriptor: {
          dispositionType: "disposition-type",
        },
        expected: "disposition-type",
      },
      {
        description: "does not set header if unset",
        descriptor: {},
        expected: undefined,
      },
      {
        description: "sets name without filename",
        descriptor: {
          dispositionType: "form-data",
          name: "fieldName",
        },
        expected: `form-data; name="fieldName"`,
      },
      {
        description: "escapes wacky characters in name and filename",
        descriptor: {
          dispositionType: "form-data",
          name: 'hello"\r\nworld',
          filename: 'aaa\r\n".txt',
        },
        expected: `form-data; name="hello\\"\\r\\nworld"; filename="aaa\\r\\n\\".txt"`,
      },
      {
        description: "correctly sets both name and filename",
        descriptor: {
          dispositionType: "form-data",
          filename: "file.txt",
          name: "fieldName",
        },
        expected: `form-data; name="fieldName"; filename="file.txt"`,
      },
      {
        description: "disposition type defaults to form-data",
        descriptor: {
          filename: "file.txt",
          name: "fieldName",
        },
        expected: `form-data; name="fieldName"; filename="file.txt"`,
      },
      {
        description: "content-disposition header takes precedence",
        descriptor: {
          filename: "aaa.txt",
          name: "bbb",
          headers: {
            "content-disposition": "pick-me",
          },
        },
        expected: "pick-me",
      },
      {
        description: "disposition type can be customized",
        descriptor: {
          filename: "file.txt",
          name: "fieldName",
          dispositionType: "disposition",
        },
        expected: `disposition; name="fieldName"; filename="file.txt"`,
      },
    ])("$description", ({ descriptor, expected }) => {
      const result = buildBodyPart(descriptor);
      assert.equal(result.headers.get("content-disposition"), expected);
    });

    it.skipIf(typeof File === "undefined")("sets filename from file object", () => {
      const result = buildBodyPart({
        name: "aaa",
        body: new File([], "aaa.txt"),
      });

      assert.equal(
        result.headers.get("content-disposition"),
        `form-data; name="aaa"; filename="aaa.txt"`,
      );
    });

    it.skipIf(typeof File === "undefined")(
      "filename parameter overrides File object filename",
      () => {
        const result = buildBodyPart({
          name: "aaa",
          filename: "override",
          body: new File([], "aaa.txt"),
        });

        assert.equal(
          result.headers.get("content-disposition"),
          `form-data; name="aaa"; filename="override"`,
        );
      },
    );
  });

  describe("body normalization", () => {
    it.each([
      {
        description: "empty body gives empty uint8array",
        descriptor: {
          contentType: "application/vnd.unknown.contenttype",
        },
        expected: new Uint8Array([]),
      },
      {
        description: "binary content gets passed through, regardless of content type",
        descriptor: {
          contentType: "application/json; charset=UTF-8",
          body: new Uint8Array([1, 2, 3]),
        },
        expected: new Uint8Array([1, 2, 3]),
      },
      {
        description: "stringifies JSON",
        descriptor: {
          body: { key: "value" },
        },
        expected: stringToUint8Array(JSON.stringify({ key: "value" }), "utf-8"),
      },
      {
        description: "stringifies more complicated JSON content type",
        descriptor: {
          body: { key: "value" },
          contentType: "application/merge-patch+JSON",
        },
        expected: stringToUint8Array(JSON.stringify({ key: "value" }), "utf-8"),
      },
      {
        description: "is case-insensitive when checking JSON content type",
        descriptor: {
          body: { key: "value" },
          contentType: "application/merge-patch+JSON",
        },
        expected: stringToUint8Array(JSON.stringify({ key: "value" }), "utf-8"),
      },
      {
        description: "strings are passed though",
        descriptor: {
          body: "invalidJson",
          contentType: "application/json",
        },
        expected: stringToUint8Array("invalidJson", "utf-8"),
      },
    ])("$description", ({ descriptor, expected }) => {
      const result = buildBodyPart(descriptor);
      assert.deepEqual(result.body, expected);
    });

    it("throws when passing an object when specifying a non-JSON content-type", () => {
      const descriptor: PartDescriptor = {
        body: { a: "b" },
        contentType: "application/xml",
      };
      assert.throws(
        () => buildBodyPart(descriptor),
        /Unsupported body\/content-type combination.*/,
      );
    });
  });
});
