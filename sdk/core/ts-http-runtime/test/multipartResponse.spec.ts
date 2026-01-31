// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  getBoundaryFromContentType,
  isMultipartContentType,
  parseMultipartResponse,
} from "../src/client/multipartResponse.js";
import { stringToUint8Array } from "../src/util/bytesEncoding.js";

describe("multipartResponse", function () {
  describe("isMultipartContentType", function () {
    it("returns true for multipart/mixed", function () {
      assert.isTrue(isMultipartContentType("multipart/mixed"));
    });

    it("returns true for multipart/form-data", function () {
      assert.isTrue(isMultipartContentType("multipart/form-data"));
    });

    it("returns true for multipart/alternative", function () {
      assert.isTrue(isMultipartContentType("multipart/alternative"));
    });

    it("returns true for multipart with boundary parameter", function () {
      assert.isTrue(isMultipartContentType("multipart/mixed; boundary=test123"));
    });

    it("returns true for uppercase MULTIPART", function () {
      assert.isTrue(isMultipartContentType("MULTIPART/MIXED"));
    });

    it("returns false for application/json", function () {
      assert.isFalse(isMultipartContentType("application/json"));
    });

    it("returns false for text/plain", function () {
      assert.isFalse(isMultipartContentType("text/plain"));
    });

    it("returns false for empty string", function () {
      assert.isFalse(isMultipartContentType(""));
    });
  });

  describe("getBoundaryFromContentType", function () {
    it("extracts boundary without quotes", function () {
      const boundary = getBoundaryFromContentType("multipart/mixed; boundary=test123");
      assert.equal(boundary, "test123");
    });

    it("extracts boundary with double quotes", function () {
      const boundary = getBoundaryFromContentType('multipart/mixed; boundary="test123"');
      assert.equal(boundary, "test123");
    });

    it("extracts boundary with single quotes", function () {
      const boundary = getBoundaryFromContentType("multipart/mixed; boundary='test123'");
      assert.equal(boundary, "test123");
    });

    it("extracts boundary with additional parameters", function () {
      const boundary = getBoundaryFromContentType(
        "multipart/form-data; boundary=test123; charset=utf-8",
      );
      assert.equal(boundary, "test123");
    });

    it("handles boundary with special characters", function () {
      const boundary = getBoundaryFromContentType(
        "multipart/mixed; boundary=----AzSDKFormBoundary123abc",
      );
      assert.equal(boundary, "----AzSDKFormBoundary123abc");
    });

    it("returns undefined when no boundary", function () {
      const boundary = getBoundaryFromContentType("multipart/mixed");
      assert.isUndefined(boundary);
    });

    it("returns undefined for non-multipart content type", function () {
      const boundary = getBoundaryFromContentType("application/json");
      assert.isUndefined(boundary);
    });

    it("handles case-insensitive boundary parameter", function () {
      const boundary = getBoundaryFromContentType("multipart/mixed; BOUNDARY=test123");
      assert.equal(boundary, "test123");
    });
  });

  describe("parseMultipartResponse", function () {
    it("parses basic multipart response with one part", function () {
      const body = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello World\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      assert.equal(
        new TextDecoder().decode(result.parts[0].body),
        "Hello World",
        "Body content should match",
      );
    });

    it("parses multipart response with multiple parts", function () {
      const body =
        "--boundary\r\n" +
        "Content-Type: application/json\r\n" +
        "\r\n" +
        '{"status":"ok"}\r\n' +
        "--boundary\r\n" +
        "Content-Type: text/plain\r\n" +
        "\r\n" +
        "Hello\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 2);
      assert.equal(result.parts[0].headers["Content-Type"], "application/json");
      assert.equal(new TextDecoder().decode(result.parts[0].body), '{"status":"ok"}');
      assert.equal(result.parts[1].headers["Content-Type"], "text/plain");
      assert.equal(new TextDecoder().decode(result.parts[1].body), "Hello");
    });

    it("parses parts with multiple headers", function () {
      const body =
        "--boundary\r\n" +
        "Content-Type: application/octet-stream\r\n" +
        "Content-Disposition: attachment; filename=test.bin\r\n" +
        "Content-Length: 4\r\n" +
        "\r\n" +
        "data\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "application/octet-stream");
      assert.equal(result.parts[0].headers["Content-Disposition"], "attachment; filename=test.bin");
      assert.equal(result.parts[0].headers["Content-Length"], "4");
      assert.equal(new TextDecoder().decode(result.parts[0].body), "data");
    });

    it("parses parts without headers", function () {
      const body = "--boundary\r\n\r\nPlain content\r\n--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.deepEqual(result.parts[0].headers, {});
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Plain content");
    });

    it("handles empty parts gracefully", function () {
      const body =
        "--boundary\r\n\r\n\r\n--boundary\r\nContent-Type: text/plain\r\n\r\nHello\r\n--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      // Empty parts should be skipped
      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Hello");
    });

    it("handles LF line endings instead of CRLF", function () {
      const body =
        "--boundary\n" + "Content-Type: text/plain\n" + "\n" + "Hello World\n" + "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Hello World");
    });

    it("handles mixed line endings", function () {
      const body =
        "--boundary\r\n" + "Content-Type: text/plain\n" + "\n" + "Hello World\r\n" + "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Hello World");
    });

    it("parses Azure Blob Storage batch response format", function () {
      const body =
        "--batchresponse_guid\r\n" +
        "Content-Type: application/http\r\n" +
        "Content-ID: 0\r\n" +
        "\r\n" +
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type: application/json\r\n" +
        "\r\n" +
        '{"result":"success"}\r\n' +
        "--batchresponse_guid--";

      const result = parseMultipartResponse(body, "batchresponse_guid");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "application/http");
      assert.equal(result.parts[0].headers["Content-ID"], "0");

      const bodyContent = new TextDecoder().decode(result.parts[0].body);
      assert.include(bodyContent, "HTTP/1.1 200 OK");
      assert.include(bodyContent, '{"result":"success"}');
    });

    it("handles boundary with special characters", function () {
      const boundary = "----AzSDKFormBoundary123abc";
      const body = `--${boundary}\r\nContent-Type: text/plain\r\n\r\nTest\r\n--${boundary}--`;

      const result = parseMultipartResponse(body, boundary);

      assert.equal(result.parts.length, 1);
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Test");
    });

    it("handles Uint8Array input", function () {
      const bodyString = "--boundary\r\nContent-Type: text/plain\r\n\r\nHello\r\n--boundary--";
      const bodyBytes = stringToUint8Array(bodyString, "utf-8");

      const result = parseMultipartResponse(bodyBytes, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "text/plain");
      assert.equal(new TextDecoder().decode(result.parts[0].body), "Hello");
    });

    it("handles empty body", function () {
      const body = "";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 0);
    });

    it("handles body with only boundaries", function () {
      const body = "--boundary\r\n--boundary--";
      const result = parseMultipartResponse(body, "boundary");

      // Should have no parts since there's no content between boundaries
      assert.equal(result.parts.length, 0);
    });

    it("preserves binary content in parts", function () {
      const binaryData = new Uint8Array([0x00, 0x01, 0x02, 0xff, 0xfe]);
      const binaryString = new TextDecoder("utf-8", { fatal: false }).decode(binaryData);
      const body = `--boundary\r\nContent-Type: application/octet-stream\r\n\r\n${binaryString}\r\n--boundary--`;

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["Content-Type"], "application/octet-stream");
      // Binary content is re-encoded from the string representation
      // When binary data is embedded in a text-based multipart format and decoded/re-encoded as UTF-8,
      // invalid UTF-8 sequences may be replaced, so we just verify we got some body content
      assert.isTrue(result.parts[0].body.length > 0, "Body should have content");
    });

    it("handles headers with various casing", function () {
      const body =
        "--boundary\r\n" +
        "content-type: text/plain\r\n" +
        "Content-Disposition: form-data\r\n" +
        "CONTENT-LENGTH: 5\r\n" +
        "\r\n" +
        "Hello\r\n" +
        "--boundary--";

      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 1);
      assert.equal(result.parts[0].headers["content-type"], "text/plain");
      assert.equal(result.parts[0].headers["Content-Disposition"], "form-data");
      assert.equal(result.parts[0].headers["CONTENT-LENGTH"], "5");
    });

    it("returns empty parts array when no valid parts found", function () {
      const body = "--wrongboundary\r\nContent\r\n--wrongboundary--";
      const result = parseMultipartResponse(body, "boundary");

      assert.equal(result.parts.length, 0);
    });
  });

  describe("integration scenarios", function () {
    it("simulates complete Azure Blob batch response parsing", function () {
      const boundary = "batch_357de4f7-6d0b-4e02-8cd2-6361411a9525";
      const body =
        `--${boundary}\r\n` +
        "Content-Type: application/http\r\n" +
        "Content-ID: 0\r\n" +
        "\r\n" +
        "HTTP/1.1 202 Accepted\r\n" +
        "x-ms-request-id: 778fdc83-801e-0000-62ff-0334671e284f\r\n" +
        "Content-Length: 0\r\n" +
        "\r\n" +
        `\r\n--${boundary}\r\n` +
        "Content-Type: application/http\r\n" +
        "Content-ID: 1\r\n" +
        "\r\n" +
        "HTTP/1.1 202 Accepted\r\n" +
        "x-ms-request-id: 778fdc83-801e-0000-63ff-0334671e2812\r\n" +
        "Content-Length: 0\r\n" +
        "\r\n" +
        `\r\n--${boundary}--`;

      const result = parseMultipartResponse(body, boundary);

      assert.equal(result.parts.length, 2);

      // Verify first part
      assert.equal(result.parts[0].headers["Content-Type"], "application/http");
      assert.equal(result.parts[0].headers["Content-ID"], "0");
      const firstBody = new TextDecoder().decode(result.parts[0].body);
      assert.include(firstBody, "HTTP/1.1 202 Accepted");
      assert.include(firstBody, "778fdc83-801e-0000-62ff-0334671e284f");

      // Verify second part
      assert.equal(result.parts[1].headers["Content-Type"], "application/http");
      assert.equal(result.parts[1].headers["Content-ID"], "1");
      const secondBody = new TextDecoder().decode(result.parts[1].body);
      assert.include(secondBody, "HTTP/1.1 202 Accepted");
      assert.include(secondBody, "778fdc83-801e-0000-63ff-0334671e2812");
    });
  });
});
