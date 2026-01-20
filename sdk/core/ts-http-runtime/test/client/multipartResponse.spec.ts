// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  getBoundaryFromContentType,
  isMultipartContentType,
  parseMultipartResponse,
} from "../../src/client/multipartResponse.js";
import { stringToUint8Array, uint8ArrayToString } from "../../src/util/bytesEncoding.js";

describe("multipart response parsing", () => {
  describe("isMultipartContentType", () => {
    it("should return true for multipart/mixed", () => {
      assert.isTrue(isMultipartContentType("multipart/mixed"));
    });

    it("should return true for multipart/form-data", () => {
      assert.isTrue(isMultipartContentType("multipart/form-data"));
    });

    it("should return true for multipart with parameters", () => {
      assert.isTrue(isMultipartContentType("multipart/mixed; boundary=abc123"));
    });

    it("should be case insensitive", () => {
      assert.isTrue(isMultipartContentType("MULTIPART/mixed"));
      assert.isTrue(isMultipartContentType("Multipart/Form-Data"));
    });

    it("should return false for non-multipart types", () => {
      assert.isFalse(isMultipartContentType("application/json"));
      assert.isFalse(isMultipartContentType("text/plain"));
      assert.isFalse(isMultipartContentType("application/octet-stream"));
    });
  });

  describe("getBoundaryFromContentType", () => {
    it("should extract boundary without quotes", () => {
      const contentType = "multipart/mixed; boundary=batch_123";
      assert.equal(getBoundaryFromContentType(contentType), "batch_123");
    });

    it("should extract boundary with double quotes", () => {
      const contentType = 'multipart/mixed; boundary="batch_123"';
      assert.equal(getBoundaryFromContentType(contentType), "batch_123");
    });

    it("should extract boundary with single quotes", () => {
      const contentType = "multipart/mixed; boundary='batch_123'";
      assert.equal(getBoundaryFromContentType(contentType), "batch_123");
    });

    it("should handle boundary with special characters", () => {
      const contentType = "multipart/mixed; boundary=----AzSDKFormBoundary12345";
      assert.equal(getBoundaryFromContentType(contentType), "----AzSDKFormBoundary12345");
    });

    it("should handle multiple parameters", () => {
      const contentType = 'multipart/mixed; charset=utf-8; boundary="batch_123"';
      assert.equal(getBoundaryFromContentType(contentType), "batch_123");
    });

    it("should return undefined if no boundary", () => {
      const contentType = "multipart/mixed";
      assert.isUndefined(getBoundaryFromContentType(contentType));
    });

    it("should be case insensitive", () => {
      const contentType = "multipart/mixed; BOUNDARY=batch_123";
      assert.equal(getBoundaryFromContentType(contentType), "batch_123");
    });
  });

  describe("parseMultipartResponse", () => {
    it("should parse a single part with text body", () => {
      const body = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello World\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "Hello World");
    });

    it("should parse multiple parts", () => {
      const body =
        "--boundary\r\n" +
        "Content-Type: application/json\r\n\r\n" +
        '{"status":"ok"}\r\n' +
        "--boundary\r\n" +
        "Content-Type: text/plain\r\n\r\n" +
        "Hello\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 2);
      assert.equal(result.parts[0].headers["content-type"], "application/json");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), '{"status":"ok"}');
      assert.equal(result.parts[1].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[1].body, "utf-8"), "Hello");
    });

    it("should parse parts with multiple headers", () => {
      const body =
        "--boundary\r\n" +
        "Content-Type: application/octet-stream\r\n" +
        "Content-Disposition: attachment; filename=test.bin\r\n" +
        "Content-ID: 123\r\n\r\n" +
        "binary data\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "application/octet-stream");
      assert.equal(
        result.parts[0].headers["content-disposition"],
        "attachment; filename=test.bin",
      );
      assert.equal(result.parts[0].headers["content-id"], "123");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "binary data");
    });

    it("should handle empty parts", () => {
      const body = "--boundary\r\nContent-Type: text/plain\r\n\r\n\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "");
    });

    it("should handle Unix-style line endings (\\n)", () => {
      const body =
        "--boundary\n" + "Content-Type: text/plain\n\n" + "Hello\n" + "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "Hello");
    });

    it("should handle mixed line endings", () => {
      const body =
        "--boundary\r\n" + "Content-Type: text/plain\n\n" + "Hello\r\n" + "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "Hello");
    });

    it("should parse Uint8Array body", () => {
      const bodyString = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello\r\n--boundary--";
      const bodyBytes = stringToUint8Array(bodyString, "utf-8");
      const result = parseMultipartResponse(bodyBytes, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "Hello");
    });

    it("should handle Azure Blob Storage batch response format", () => {
      const body =
        "--batchresponse_guid\r\n" +
        "Content-Type: application/http\r\n" +
        "Content-ID: 0\r\n\r\n" +
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type: application/json\r\n\r\n" +
        '{"success":true}\r\n' +
        "--batchresponse_guid\r\n" +
        "Content-Type: application/http\r\n" +
        "Content-ID: 1\r\n\r\n" +
        "HTTP/1.1 404 Not Found\r\n" +
        "Content-Type: application/json\r\n\r\n" +
        '{"error":"not found"}\r\n' +
        "--batchresponse_guid--";

      const result = parseMultipartResponse(body, "batchresponse_guid");

      assert.equal(result.parts.length, 2);

      // First part
      assert.equal(result.parts[0].headers["content-type"], "application/http");
      assert.equal(result.parts[0].headers["content-id"], "0");
      const part0Body = uint8ArrayToString(result.parts[0].body, "utf-8");
      assert.include(part0Body, "HTTP/1.1 200 OK");
      assert.include(part0Body, '{"success":true}');

      // Second part
      assert.equal(result.parts[1].headers["content-type"], "application/http");
      assert.equal(result.parts[1].headers["content-id"], "1");
      const part1Body = uint8ArrayToString(result.parts[1].body, "utf-8");
      assert.include(part1Body, "HTTP/1.1 404 Not Found");
      assert.include(part1Body, '{"error":"not found"}');
    });

    it("should handle boundary with leading dashes in content", () => {
      const body = "--abc123\r\nContent-Type: text/plain\r\n\r\n--test--\r\n--abc123--";
      const result = parseMultipartResponse(body, "abc123");

      assert.equal(result.parts.length, 1);
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "--test--");
    });

    it("should handle parts without headers", () => {
      const body = "--boundary\r\n\r\nJust a body\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.deepEqual(result.parts[0].headers, {});
      assert.equal(uint8ArrayToString(result.parts[0].body, "utf-8"), "Just a body");
    });

    it("should handle case-insensitive header names", () => {
      const body =
        "--boundary\r\n" +
        "Content-Type: text/plain\r\n" +
        "CONTENT-DISPOSITION: inline\r\n" +
        "content-id: 456\r\n\r\n" +
        "test\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      // Headers should be normalized to lowercase
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(result.parts[0].headers["content-disposition"], "inline");
      assert.equal(result.parts[0].headers["content-id"], "456");
    });

    it("should return empty parts array for empty body", () => {
      const body = "";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 0);
    });

    it("should handle body with only boundary markers", () => {
      const body = "--boundary\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 0);
    });

    it("should handle whitespace in header values", () => {
      const body =
        "--boundary\r\n" +
        "Content-Type:   text/plain  \r\n" +
        "Content-ID:   123   \r\n\r\n" +
        "test\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(result.parts[0].headers["content-id"], "123");
    });
  });
});
