// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { computeSha256Hash, computeSha256Hmac } from "@azure/core-util";

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
      const contentHash = await computeSha256Hash(request.body?.toString() || "", "base64");
      const signedHeaders = "x-ms-date;host;x-ms-content-sha256";
      const url = new URL(request.url);
      const query = url.search;
      const urlPathAndQuery = query ? `${url.pathname}${query}` : url.pathname;
      const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.host};${contentHash}`;
      const signature = await computeSha256Hmac(secret, stringToSign, "base64");

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
