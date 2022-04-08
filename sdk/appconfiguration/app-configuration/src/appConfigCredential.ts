// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { sha256Digest, sha256Hmac } from "./internal/cryptoHelpers";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for AppConfig.
 */
export function appConfigKeyCredentialPolicy(credential: string, secret: string): PipelinePolicy {
  return {
    name: "AppConfigKeyCredentialPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const verb = request.method;
      const utcNow = new Date().toUTCString();
      const contentHash = await sha256Digest(request.body?.toString() || "");
      const signedHeaders = "x-ms-date;host;x-ms-content-sha256";
      const url = new URL(request.url);
      const query = url.search;
      const urlPathAndQuery = query ? `${url.pathname}${query}` : url.pathname;
      const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.host};${contentHash}`;
      const signature = await sha256Hmac(secret, stringToSign);

      request.headers.set("x-ms-date", utcNow);
      request.headers.set("x-ms-content-sha256", contentHash);
      // Syntax for Authorization header
      // Reference - https://docs.microsoft.com/en-us/azure/azure-app-configuration/rest-api-authentication-hmac#syntax
      request.headers.set(
        "Authorization",
        `HMAC-SHA256 Credential=${credential}&SignedHeaders=${signedHeaders}&Signature=${signature}`
      );

      return next(request);
    },
  };
}
