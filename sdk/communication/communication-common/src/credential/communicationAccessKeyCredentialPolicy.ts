// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { shaHMAC, shaHash } from "./cryptoUtils";
import { KeyCredential } from "@azure/core-auth";
import { isNode } from "./isNode";

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
  credential: KeyCredential
): PipelinePolicy {
  return {
    name: communicationAccessKeyCredentialPolicy,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const verb = request.method.toUpperCase();
      const utcNow = new Date().toUTCString();
      const contentHash = await shaHash(request.body?.toString() || "");
      const dateHeader = "x-ms-date";
      const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;

      const url = new URL(request.url);
      const query = url.searchParams;
      const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;
      const port = url.port;
      const hostAndPort = port ? `${url.host}:${port}` : url.host;

      const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${hostAndPort};${contentHash}`;
      const signature = await shaHMAC(credential.key, stringToSign);

      if (isNode) {
        request.headers.set("Host", hostAndPort || "");
      }

      request.headers.set(dateHeader, utcNow);
      request.headers.set("x-ms-content-sha256", contentHash);
      request.headers.set(
        "Authorization",
        `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`
      );
      return next(request);
    },
  };
}
