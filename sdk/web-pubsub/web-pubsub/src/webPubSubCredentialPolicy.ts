// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

import jwt from "jsonwebtoken";

/**
 * The programmatic identifier of the webPubSubKeyCredentialPolicy.
 */
export const webPubSubKeyCredentialPolicyName = "webPubSubKeyCredentialPolicy";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Text Analytics
 * @internal
 */
export function webPubSubKeyCredentialPolicy(credential: KeyCredential): PipelinePolicy {
  return {
    name: webPubSubKeyCredentialPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const bearerToken = jwt.sign({}, credential.key, {
        audience: request.url,
        expiresIn: "1h",
        algorithm: "HS256",
      });
      request.headers.set("Authorization", `Bearer ${bearerToken}`);
      return next(request);
    },
  };
}
