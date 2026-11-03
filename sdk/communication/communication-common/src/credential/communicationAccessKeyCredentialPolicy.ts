// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { KeyCredential } from "@azure/core-auth";
import { computeSha256Hash, computeSha256Hmac } from "@azure/core-util";

/**
 * CommunicationKeyCredentialPolicy provides a means of signing requests made through
 * the SmsClient.
 */
const communicationAccessKeyCredentialPolicy = "CommunicationAccessKeyCredentialPolicy";

/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
export function createCommunicationAccessKeyCredentialPolicy(
  credential: KeyCredential,
): PipelinePolicy {
  return {
    name: communicationAccessKeyCredentialPolicy,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const verb = request.method.toUpperCase();
      const utcNow = new Date().toUTCString();
      const contentHash = await computeSha256Hash(request.body?.toString() || "", "base64");
      const dateHeader = "x-ms-date";
      const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;

      const url = new URL(request.url);
      const query = url.searchParams.toString();
      const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;

      const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.host};${contentHash}`;
      const signature = await computeSha256Hmac(credential.key, stringToSign, "base64");

      // Host is a forbidden header in browsers (silently ignored), but needed in Node.js
      request.headers.set("Host", url.host);
      request.headers.set(dateHeader, utcNow);
      request.headers.set("x-ms-content-sha256", contentHash);
      request.headers.set(
        "Authorization",
        `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`,
      );
      return next(request);
    },
  };
}
