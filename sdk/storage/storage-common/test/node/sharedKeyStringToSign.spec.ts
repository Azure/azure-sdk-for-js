// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHmac } from "node:crypto";
import type { PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type {
  CompatResponse,
  RequestPolicy,
  RequestPolicyOptionsLike,
  WebResourceLike,
} from "@azure/core-http-compat";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { storageSharedKeyCredentialPolicy } from "../../src/policies/StorageSharedKeyCredentialPolicyV2.js";
import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential.js";

const ACCOUNT = "myaccount";
const ACCOUNT_KEY = Buffer.from("not-a-real-key", "utf8");
// The v1 credential base64-decodes its key, so both signers end up with the same bytes.
const ACCOUNT_KEY_BASE64 = ACCOUNT_KEY.toString("base64");
const PATH = "/container/blob.txt";
const BLOB_URL = `https://${ACCOUNT}.blob.core.windows.net${PATH}`;

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

interface Signed {
  signature: string;
  xMsDate: string;
}

function readSignature(authorization?: string, xMsDate?: string): Signed {
  return {
    signature: (authorization ?? "").replace(`SharedKey ${ACCOUNT}:`, ""),
    xMsDate: xMsDate ?? "",
  };
}

async function signWithV2(headers: Record<string, string>): Promise<Signed> {
  const request = createPipelineRequest({
    url: BLOB_URL,
    method: "GET",
    headers: createHttpHeaders(headers),
  });
  const next: SendRequest = async (req) =>
    ({ request: req, status: 200, headers: createHttpHeaders() }) as PipelineResponse;

  await storageSharedKeyCredentialPolicy({
    accountName: ACCOUNT,
    accountKey: ACCOUNT_KEY,
  }).sendRequest(request, next);

  return readSignature(request.headers.get("authorization"), request.headers.get("x-ms-date"));
}

async function signWithV1(headers: Record<string, string>): Promise<Signed> {
  const request = {
    url: BLOB_URL,
    method: "GET",
    headers: toHttpHeadersLike(createHttpHeaders(headers)),
  } as WebResourceLike;
  const next: RequestPolicy = {
    sendRequest: async (req) => ({ request: req, status: 200 }) as CompatResponse,
  };

  const credential = new StorageSharedKeyCredential(ACCOUNT, ACCOUNT_KEY_BASE64);
  await credential.create(next, {} as RequestPolicyOptionsLike).sendRequest(request);

  return readSignature(request.headers.get("authorization"), request.headers.get("x-ms-date"));
}

function expectedSignature(headers: Record<string, string>, xMsDate: string): string {
  const stringToSign =
    ["GET", ...FIELD_ORDER.map((field) => headers[field] ?? "")].join("\n") +
    "\n" +
    `x-ms-date:${xMsDate}\n` +
    `/${ACCOUNT}${PATH}`;

  return createHmac("sha256", ACCOUNT_KEY).update(stringToSign, "utf8").digest("base64");
}

const signers = [
  { name: "storageSharedKeyCredentialPolicy (core v2)", sign: signWithV2 },
  { name: "StorageSharedKeyCredentialPolicy (core v1)", sign: signWithV1 },
];

for (const { name, sign } of signers) {
  describe(`${name} string to sign`, () => {
    it("signs Content-Encoding before Content-Language", async () => {
      const headers = { "content-encoding": "gzip", "content-language": "en-US" };
      const { signature, xMsDate } = await sign(headers);

      assert.strictEqual(signature, expectedSignature(headers, xMsDate));
    });

    it("signs Content-Encoding on its own in the documented slot", async () => {
      const headers = { "content-encoding": "gzip" };
      const { signature, xMsDate } = await sign(headers);

      assert.strictEqual(signature, expectedSignature(headers, xMsDate));
    });

    it("signs Content-Language on its own in the documented slot", async () => {
      const headers = { "content-language": "en-US" };
      const { signature, xMsDate } = await sign(headers);

      assert.strictEqual(signature, expectedSignature(headers, xMsDate));
    });

    it("places the remaining signed fields in their documented slots", async () => {
      const headers: Record<string, string> = {
        "content-encoding": "gzip",
        "content-language": "en-US",
        "content-md5": "q2xhc3NpYw==",
        "content-type": "application/octet-stream",
        "if-modified-since": "Wed, 03 Jan 2026 00:00:00 GMT",
        "if-match": '"etag-match"',
        "if-none-match": '"etag-none"',
        "if-unmodified-since": "Thu, 04 Jan 2026 00:00:00 GMT",
        range: "bytes=0-1023",
      };
      const { signature, xMsDate } = await sign(headers);

      assert.strictEqual(signature, expectedSignature(headers, xMsDate));
    });
  });
}
