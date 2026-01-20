// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  getBoundaryFromContentType,
  isMultipartContentType,
  parseMultipartResponse,
  type MultipartResponseBody,
} from "../../src/client/multipartResponse.js";

describe("multipartResponse", () => {
  describe("isMultipartContentType", () => {
    it("should return true for multipart/mixed", () => {
      assert.isTrue(isMultipartContentType("multipart/mixed"));
    });

    it("should return true for multipart/form-data", () => {
      assert.isTrue(isMultipartContentType("multipart/form-data"));
    });

    it("should return true for multipart/mixed with parameters", () => {
      assert.isTrue(isMultipartContentType("multipart/mixed; boundary=test123"));
    });

    it("should return true for uppercase MULTIPART", () => {
      assert.isTrue(isMultipartContentType("MULTIPART/mixed"));
    });

    it("should return false for application/json", () => {
      assert.isFalse(isMultipartContentType("application/json"));
    });

    it("should return false for text/plain", () => {
      assert.isFalse(isMultipartContentType("text/plain"));
    });

    it("should return false for empty string", () => {
      assert.isFalse(isMultipartContentType(""));
    });
  });

  describe("getBoundaryFromContentType", () => {
    it("should extract boundary without quotes", () => {
      const result = getBoundaryFromContentType("multipart/mixed; boundary=test123");
      assert.equal(result, "test123");
    });

    it("should extract boundary with double quotes", () => {
      const result = getBoundaryFromContentType('multipart/mixed; boundary="test123"');
      assert.equal(result, "test123");
    });

    it("should extract boundary with single quotes", () => {
      const result = getBoundaryFromContentType("multipart/mixed; boundary='test123'");
      assert.equal(result, "test123");
    });

    it("should extract boundary with additional parameters", () => {
      const result = getBoundaryFromContentType("multipart/mixed; boundary=test123; charset=utf-8");
      assert.equal(result, "test123");
    });

    it("should handle boundary with special characters", () => {
      const result = getBoundaryFromContentType(
        "multipart/mixed; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      );
      assert.equal(result, "----WebKitFormBoundary7MA4YWxkTrZu0gW");
    });

    it("should be case-insensitive for boundary parameter", () => {
      const result = getBoundaryFromContentType("multipart/mixed; BOUNDARY=test123");
      assert.equal(result, "test123");
    });

    it("should return undefined if no boundary present", () => {
      const result = getBoundaryFromContentType("multipart/mixed");
      assert.isUndefined(result);
    });

    it("should return undefined for empty string", () => {
      const result = getBoundaryFromContentType("");
      assert.isUndefined(result);
    });
  });

  describe("parseMultipartResponse", () => {
    it("should parse a basic multipart response with one part", () => {
      const body = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello\r\n--boundary--";
      const result: MultipartResponseBody = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");

      const bodyText = new TextDecoder().decode(result.parts[0].body);
      assert.equal(bodyText, "Hello");
    });

    it("should parse multipart response with multiple parts", () => {
      const body = `--boundary\r
Content-Type: application/json\r
\r
{"status":"ok"}\r
--boundary\r
Content-Type: text/plain\r
\r
Hello World\r
--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 2);

      // First part
      assert.equal(result.parts[0].headers["Content-Type"], "application/json");
      const part1Text = new TextDecoder().decode(result.parts[0].body);
      assert.equal(part1Text, '{"status":"ok"}');

      // Second part
      assert.equal(result.parts[1].headers["Content-Type"], "text/plain");
      const part2Text = new TextDecoder().decode(result.parts[1].body);
      assert.equal(part2Text, "Hello World");
    });

    it("should parse parts with multiple headers", () => {
      const body = `--boundary\r
Content-Type: application/octet-stream\r
Content-Disposition: attachment; filename="file.bin"\r
Content-ID: part1\r
\r
Binary data here\r
--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "application/octet-stream");
      assert.equal(
        result.parts[0].headers["Content-Disposition"],
        'attachment; filename="file.bin"',
      );
      assert.equal(result.parts[0].headers["Content-ID"], "part1");
    });

    it("should handle empty body parts", () => {
      const body = `--boundary\r
Content-Type: text/plain\r
\r
\r
--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].body.length, 0);
    });

    it("should handle Azure Blob Storage batch response format", () => {
      const body = `--batchresponse_guid\r
Content-Type: application/http\r
Content-ID: 0\r
\r
HTTP/1.1 200 OK\r
Content-Type: application/json\r
\r
{"value":"response1"}\r
--batchresponse_guid\r
Content-Type: application/http\r
Content-ID: 1\r
\r
HTTP/1.1 201 Created\r
Content-Type: application/json\r
\r
{"value":"response2"}\r
--batchresponse_guid--`;

      const result = parseMultipartResponse(body, "batchresponse_guid");

      assert.equal(result.parts.length, 2);

      // First part
      assert.equal(result.parts[0].headers["Content-Type"], "application/http");
      assert.equal(result.parts[0].headers["Content-ID"], "0");
      const part1Text = new TextDecoder().decode(result.parts[0].body);
      assert.include(part1Text, "HTTP/1.1 200 OK");
      assert.include(part1Text, '{"value":"response1"}');

      // Second part
      assert.equal(result.parts[1].headers["Content-Type"], "application/http");
      assert.equal(result.parts[1].headers["Content-ID"], "1");
      const part2Text = new TextDecoder().decode(result.parts[1].body);
      assert.include(part2Text, "HTTP/1.1 201 Created");
      assert.include(part2Text, '{"value":"response2"}');
    });

    it("should handle parts with Unix line endings (LF only)", () => {
      const body = "--boundary\nContent-Type: text/plain\n\nHello\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      const bodyText = new TextDecoder().decode(result.parts[0].body);
      assert.equal(bodyText, "Hello");
    });

    it("should handle Uint8Array input", () => {
      const bodyString = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello\r\n--boundary--";
      const bodyBytes = new TextEncoder().encode(bodyString);
      const result = parseMultipartResponse(bodyBytes, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      const bodyText = new TextDecoder().decode(result.parts[0].body);
      assert.equal(bodyText, "Hello");
    });

    it("should handle boundary with dashes", () => {
      const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
      const body = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r
Content-Type: text/plain\r
\r
Test\r
------WebKitFormBoundary7MA4YWxkTrZu0gW--`;

      const result = parseMultipartResponse(body, boundary);

      assert.equal(result.parts.length, 1);
      const bodyText = new TextDecoder().decode(result.parts[0].body);
      assert.equal(bodyText, "Test");
    });

    it("should handle headers with various casings", () => {
      const body = `--boundary\r
content-type: text/plain\r
Content-Disposition: form-data; name="field1"\r
CONTENT-ID: 123\r
\r
Data\r
--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(result.parts[0].headers["Content-Disposition"], 'form-data; name="field1"');
      assert.equal(result.parts[0].headers["CONTENT-ID"], "123");
    });

    it("should return empty parts array for empty body", () => {
      const result = parseMultipartResponse("", "boundary");
      assert.equal(result.parts.length, 0);
    });

    it("should handle body with only boundary markers", () => {
      const body = "--boundary\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      // Should have no parts (only boundary markers, no actual parts)
      assert.equal(result.parts.length, 0);
    });

    it("should handle parts with binary-like content", () => {
      const body = `--boundary\r
Content-Type: application/octet-stream\r
\r
\x00\x01\x02\x03\xFF\r
--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "application/octet-stream");
      // Body should contain the binary-like data
      assert.isTrue(result.parts[0].body.length > 0);
    });

    it("should handle parts without trailing newline before boundary", () => {
      const body = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      const bodyText = new TextDecoder().decode(result.parts[0].body);
      assert.equal(bodyText, "Hello");
    });
  });
});
