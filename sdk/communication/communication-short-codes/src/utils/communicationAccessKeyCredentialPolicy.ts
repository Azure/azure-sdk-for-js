// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  bearerTokenAuthenticationPolicy
} from "@azure/core-rest-pipeline";
import { URL } from "./url";
import { shaHash, shaHMAC } from "./cryptoUtils";
export const communicationAccessKeyCredentialPolicyName = "CommunicationAccessKeyCredentialPolicy";
/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 *
 * @param credential - The key credential.
 */
export const createCommunicationAccessKeyCredentialPolicy = (
  credential: KeyCredential
): PipelinePolicy => {
  return {
    name: communicationAccessKeyCredentialPolicyName,
    sendRequest: async (req, next) => {
      const signedRequest = await signRequest(credential, req);
      return next(signedRequest);
    }
  };
};

export const createCommunicationAuthPolicy = (
  credential: KeyCredential | TokenCredential
): PipelinePolicy => {
  if (isTokenCredential(credential)) {
    return bearerTokenAuthenticationPolicy({
      scopes: "https://communication.azure.com//.default",
      credential
    });
  } else {
    return createCommunicationAccessKeyCredentialPolicy(credential);
  }
};

const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

async function signRequest(
  accessKey: KeyCredential,
  request: PipelineRequest
): Promise<PipelineRequest> {
  const verb = request.method.toUpperCase();
  const utcNow = new Date().toUTCString();
  const contentHash = await shaHash(getBody(request) || "");
  const dateHeader = "x-ms-date";
  const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;

  const url = new URL(request.url);
  const query = url.searchParams;
  const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;
  const port = url.port;
  const hostAndPort = port ? `${url.host}:${port}` : url.host;

  const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${hostAndPort};${contentHash}`;
  const signature = await shaHMAC(accessKey.key, stringToSign);

  if (isNode) {
    request.headers.set("Host", hostAndPort || "");
  }

  request.headers.set(dateHeader, utcNow);
  request.headers.set("x-ms-content-sha256", contentHash);
  request.headers.set(
    "Authorization",
    `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`
  );

  return request;
}

function getBody({ body }: PipelineRequest): string {
  return body === undefined || typeof body !== "string" ? "" : body;
}
