// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { HttpMethods, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  buildStorageSharedKeyStringToSign,
  prepareSharedKeyHeaders,
} from "../../src/policies/SharedKeySigning.js";

const ACCOUNT = "myaccount";
const BLOB_URL = `https://${ACCOUNT}.blob.core.windows.net/container/blob.txt`;
const DATE = "Mon, 01 Jan 2026 00:00:00 GMT";

/**
 * The signed fields, in the order the Shared Key scheme requires. Transcribed from the REST
 * docs rather than from the implementation, so a reordering fails loudly instead of silently
 * producing 403s.
 *
 * @see https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key
 */
const FIELD_ORDER = [
  "content-encoding",
  "content-language",
  "content-length",
  "content-md5",
  "content-type",
  "date",
  "if-modified-since",
  "if-match",
  "if-none-match",
  "if-unmodified-since",
  "range",
] as const;

type SignedField = (typeof FIELD_ORDER)[number];

function expectedPrefix(method: string, fields: Partial<Record<SignedField, string>> = {}): string {
  return [method, ...FIELD_ORDER.map((field) => fields[field] ?? "")].join("\n") + "\n";
}

function makeRequest(options: {
  url?: string;
  method?: HttpMethods;
  headers?: Record<string, string>;
  body?: string;
}): PipelineRequest {
  return createPipelineRequest({
    url: options.url ?? BLOB_URL,
    method: options.method ?? "GET",
    headers: createHttpHeaders({ "x-ms-date": DATE, ...options.headers }),
    body: options.body,
  });
}

function sign(options: Parameters<typeof makeRequest>[0], accountName = ACCOUNT): string {
  return buildStorageSharedKeyStringToSign(makeRequest(options), accountName);
}

describe("buildStorageSharedKeyStringToSign", () => {
  it("builds the canonical form for a simple download", () => {
    assert.strictEqual(
      sign({}),
      expectedPrefix("GET") + `x-ms-date:${DATE}\n` + `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("uppercases the HTTP verb", () => {
    for (const method of ["GET", "PUT", "HEAD", "DELETE"] as HttpMethods[]) {
      const result = sign({ method: method.toLowerCase() as HttpMethods });
      assert.isTrue(result.startsWith(`${method}\n`), result.split("\n")[0]);
    }
  });

  it("omits a zero Content-Length, per the 2015-02-21 rule", () => {
    assert.strictEqual(
      sign({ method: "PUT", headers: { "content-length": "0" } }),
      expectedPrefix("PUT") + `x-ms-date:${DATE}\n` + `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("includes a non-zero Content-Length", () => {
    assert.strictEqual(
      sign({ method: "PUT", headers: { "content-length": "1024" } }),
      expectedPrefix("PUT", { "content-length": "1024" }) +
        `x-ms-date:${DATE}\n` +
        `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("signs Content-Encoding before Content-Language", () => {
    const lines = sign({
      headers: { "content-encoding": "gzip", "content-language": "en-US" },
    }).split("\n");

    assert.strictEqual(lines[1], "gzip", "Content-Encoding is the 2nd signed field");
    assert.strictEqual(lines[2], "en-US", "Content-Language is the 3rd signed field");
  });

  it("places every signed field in its required slot", () => {
    const fields: Record<SignedField, string> = {
      "content-encoding": "gzip",
      "content-language": "en-US",
      "content-length": "512",
      "content-md5": "q2xhc3NpYw==",
      "content-type": "application/octet-stream",
      date: "Tue, 02 Jan 2026 00:00:00 GMT",
      "if-modified-since": "Wed, 03 Jan 2026 00:00:00 GMT",
      "if-match": '"etag-match"',
      "if-none-match": '"etag-none"',
      "if-unmodified-since": "Thu, 04 Jan 2026 00:00:00 GMT",
      range: "bytes=0-1023",
    };

    assert.strictEqual(
      sign({ method: "PUT", headers: fields }),
      expectedPrefix("PUT", fields) + `x-ms-date:${DATE}\n` + `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("lowercases and sorts the x-ms headers", () => {
    const result = sign({
      headers: {
        "X-MS-Version": "2026-12-06",
        "x-ms-client-request-id": "abc",
        "X-Ms-Lease-Id": "lease",
      },
    });

    assert.strictEqual(
      result,
      expectedPrefix("GET") +
        "x-ms-client-request-id:abc\n" +
        `x-ms-date:${DATE}\n` +
        "x-ms-lease-id:lease\n" +
        "x-ms-version:2026-12-06\n" +
        `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("ignores headers outside the x-ms prefix", () => {
    assert.strictEqual(
      sign({ headers: { "user-agent": "test-agent", authorization: "Bearer token" } }),
      expectedPrefix("GET") + `x-ms-date:${DATE}\n` + `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("signs header values without surrounding whitespace", () => {
    assert.strictEqual(
      sign({ headers: { "x-ms-meta-name": "   spaced   " } }),
      expectedPrefix("GET") +
        `x-ms-date:${DATE}\n` +
        "x-ms-meta-name:spaced\n" +
        `/${ACCOUNT}/container/blob.txt`,
    );
  });

  it("orders metadata headers by the storage comparator, not plain lexicographic order", () => {
    const result = sign({
      headers: {
        "x-ms-meta-ab": "3",
        "x-ms-meta-a-b": "1",
        "x-ms-meta-a_b": "2",
        "x-ms-meta-a": "0",
      },
    });

    const order = result
      .split("\n")
      .filter((line) => line.startsWith("x-ms-meta-"))
      .map((line) => line.split(":")[0]);

    // Deliberately not lexicographic: the comparator mirrors the service, which sorts "-" last.
    assert.deepStrictEqual(order, [
      "x-ms-meta-a",
      "x-ms-meta-a_b",
      "x-ms-meta-ab",
      "x-ms-meta-a-b",
    ]);
  });

  it("lowercases, sorts, and decodes query parameters", () => {
    const result = sign({
      url: `${BLOB_URL}?SnapShot=2026-01-01&comp=metadata&Timeout=30`,
    });

    assert.strictEqual(
      result,
      expectedPrefix("GET") +
        `x-ms-date:${DATE}\n` +
        `/${ACCOUNT}/container/blob.txt\n` +
        "comp:metadata\n" +
        "snapshot:2026-01-01\n" +
        "timeout:30",
    );
  });

  it("url-decodes query values", () => {
    const result = sign({ url: `${BLOB_URL}?prefix=a%20b%2Fc` });

    assert.isTrue(result.endsWith("prefix:a b/c"), result);
  });

  it("leaves the resource path percent-encoded, unlike query values", () => {
    const result = sign({
      url: `https://${ACCOUNT}.blob.core.windows.net/container/with spaces and %2Bplus.txt`,
    });

    assert.isTrue(result.endsWith("/container/with%20spaces%20and%20%2Bplus.txt"), result);
  });

  it("uses a bare slash for an account-level request", () => {
    assert.strictEqual(
      sign({ url: `https://${ACCOUNT}.blob.core.windows.net` }),
      expectedPrefix("GET") + `x-ms-date:${DATE}\n` + `/${ACCOUNT}/`,
    );
  });

  it("prefixes the account name for an IP-style endpoint", () => {
    const result = sign(
      { url: "http://127.0.0.1:10000/devstoreaccount1/container/blob.txt" },
      "devstoreaccount1",
    );

    assert.isTrue(result.endsWith("/devstoreaccount1/devstoreaccount1/container/blob.txt"), result);
  });
});

describe("prepareSharedKeyHeaders", () => {
  it("stamps x-ms-date", () => {
    const request = createPipelineRequest({ url: BLOB_URL, method: "GET" });

    prepareSharedKeyHeaders(request);

    const stamped = request.headers.get("x-ms-date");
    assert.isDefined(stamped);
    assert.isFalse(Number.isNaN(new Date(stamped!).getTime()), stamped);
  });

  it("sets Content-Length from a string body", () => {
    const request = createPipelineRequest({ url: BLOB_URL, method: "PUT", body: "hello" });

    prepareSharedKeyHeaders(request);

    assert.strictEqual(request.headers.get("content-length"), "5");
  });

  it("measures a string body in bytes, not characters", () => {
    const request = createPipelineRequest({ url: BLOB_URL, method: "PUT", body: "héllo" });

    prepareSharedKeyHeaders(request);

    assert.strictEqual(request.headers.get("content-length"), "6");
  });

  it("sets Content-Length from a Buffer body", () => {
    const request = createPipelineRequest({
      url: BLOB_URL,
      method: "PUT",
      body: Buffer.from("abcdef"),
    });

    prepareSharedKeyHeaders(request);

    assert.strictEqual(request.headers.get("content-length"), "6");
  });

  it("leaves Content-Length alone for an empty body", () => {
    const request = createPipelineRequest({ url: BLOB_URL, method: "PUT", body: "" });

    prepareSharedKeyHeaders(request);

    assert.isUndefined(request.headers.get("content-length"));
  });

  it("feeds Content-Length into the string to sign", () => {
    const request = createPipelineRequest({ url: BLOB_URL, method: "PUT", body: "hello" });

    prepareSharedKeyHeaders(request);
    const result = buildStorageSharedKeyStringToSign(request, ACCOUNT);

    assert.strictEqual(result.split("\n")[3], "5", "Content-Length is the 4th signed field");
  });
});
