// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { buildBodyPart } from "../../../src/client/multipart.js";

describe("multipart buildBodyPart (browser)", () => {
  describe("content-type calculation", () => {
    it("content type is taken from Blob if available", () => {
      const result = buildBodyPart({
        body: new Blob([], { type: "content-type-from-blob" }),
      });
      assert.equal(result.headers.get("content-type"), "content-type-from-blob");
    });

    it("contentType value takes precedence over Blob content type", () => {
      const result = buildBodyPart({
        contentType: "pick-me",
        body: new Blob([], { type: "content-type-from-blob" }),
      });
      assert.equal(result.headers.get("content-type"), "pick-me");
    });

    it("content type for Blob defaults to application/octet-stream", () => {
      const result = buildBodyPart({
        body: new Blob([]),
      });
      assert.equal(result.headers.get("content-type"), "application/octet-stream");
    });
  });

  describe("content-disposition", () => {
    it("sets filename from File object", () => {
      const result = buildBodyPart({
        name: "aaa",
        body: new File([], "aaa.txt"),
      });

      assert.equal(
        result.headers.get("content-disposition"),
        `form-data; name="aaa"; filename="aaa.txt"`,
      );
    });

    it("filename parameter overrides File object filename", () => {
      const result = buildBodyPart({
        name: "aaa",
        filename: "override",
        body: new File([], "aaa.txt"),
      });

      assert.equal(
        result.headers.get("content-disposition"),
        `form-data; name="aaa"; filename="override"`,
      );
    });
  });
});
