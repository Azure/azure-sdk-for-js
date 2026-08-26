// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type { WebResourceLike } from "@azure/core-http-compat";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

export const ACCOUNT = "https://myaccount.blob.core.windows.net";
export const SESSION_KEY = "a2V5";

export const fakeTokenCredential: TokenCredential = {
  getToken: async (): Promise<AccessToken> => ({
    token: "fake-bearer-token",
    expiresOnTimestamp: Date.now() + 3600 * 1000,
  }),
};

export interface FakeResponse {
  status: number;
  headers?: Record<string, string>;
  body?: string;
}

/** A request as the transport saw it, captured before any later mutation of the same object. */
export interface SeenRequest {
  url: string;
  method: string;
  authorization?: string;
}

/** The XML the service returns from Create Session. */
export function createSessionBody(
  expiration: Date,
  sessionToken: string,
  sessionKey: string = SESSION_KEY,
): string {
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<CreateSessionResult>`,
    `<Id>session-id</Id>`,
    `<Expiration>${expiration.toUTCString()}</Expiration>`,
    `<AuthenticationType>HMAC</AuthenticationType>`,
    `<Credentials>`,
    `<SessionToken>${sessionToken}</SessionToken>`,
    `<SessionKey>${sessionKey}</SessionKey>`,
    `</Credentials>`,
    `</CreateSessionResult>`,
  ].join("");
}

/**
 * A core-v1 style client, which is the shape `StoragePipelineOptions.httpClient` expects.
 * `seen` snapshots each request because `toWebResourceLike` proxies the live request object,
 * which the policy may still mutate after the response comes back.
 */
export function fakeHttpClient(respond: (request: WebResourceLike) => FakeResponse): {
  httpClient: any;
  requests: WebResourceLike[];
  seen: SeenRequest[];
} {
  const requests: WebResourceLike[] = [];
  const seen: SeenRequest[] = [];
  const httpClient = {
    sendRequest: async (request: WebResourceLike): Promise<any> => {
      requests.push(request);
      seen.push({
        url: request.url,
        method: request.method,
        authorization: request.headers.get("authorization"),
      });
      const { status, headers = {}, body = "" } = respond(request);
      return {
        request,
        status,
        headers: toHttpHeadersLike(
          createHttpHeaders({ "content-type": "application/xml", ...headers }),
        ),
        bodyAsText: body,
        parsedBody: body,
      };
    },
  };
  return { httpClient, requests, seen };
}

/** Issues sessions that expire in five minutes, with a distinct token per call. */
export function sessionIssuer(): (request: WebResourceLike) => FakeResponse {
  let issued = 0;
  return () => ({
    status: 201,
    body: createSessionBody(new Date(Date.now() + 5 * 60 * 1000), `session-token-${++issued}`),
  });
}
