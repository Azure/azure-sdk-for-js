// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "@azure/core-auth";
import * as jwt from "jsonwebtoken";

const WEB_PUB_SUB_CHAT_CREDENTIAL_POLICY_NAME = "webPubSubChatCredentialPolicy";

/**
 * Creates a pipeline policy that signs requests using a Web PubSub access key
 * by generating a short-lived JWT token in the Authorization header.
 */
export function webPubSubChatCredentialPolicy(credential: AzureKeyCredential): PipelinePolicy {
  return {
    name: WEB_PUB_SUB_CHAT_CREDENTIAL_POLICY_NAME,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const token = jwt.sign({}, credential.key, {
        audience: request.url,
        expiresIn: "1h",
        algorithm: "HS256",
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    },
  };
}
