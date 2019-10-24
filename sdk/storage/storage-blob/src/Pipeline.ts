// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  HttpClient as IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpPipelineLogger as IHttpPipelineLogger,
  HttpPipelineLogLevel,
  HttpRequestBody,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  ServiceClientOptions,
  WebResource,
  TokenCredential,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  PipelineOptions,
  InternalPipelineOptions,
  isNode
} from "@azure/core-http";

import { logger } from "./log";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  StorageOAuthScopes,
  StorageBlobLoggingAllowedHeaderNames,
  StorageBlobLoggingAllowedQueryParameters,
  SDK_VERSION
} from "./utils/constants";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  BaseRequestPolicy,
  StorageOAuthScopes,
  deserializationPolicy,
  IHttpClient,
  IHttpPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
  HttpRequestBody,
  HttpOperationResponse,
  WebResource,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
};

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @export
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity.
 * @param {PipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 */
export function newPipeline(
  credential: SharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: PipelineOptions = {}
): ServiceClientOptions {
  const userAgentParts: string[] = [];
  if (isNode) {
    if (pipelineOptions.userAgentOptions && pipelineOptions.userAgentOptions.userAgentPrefix) {
      userAgentParts.push(pipelineOptions.userAgentOptions.userAgentPrefix);
    }
    userAgentParts.push(`azsdk-js-storageblob/${SDK_VERSION}`);
  }
  const userAgentPrefix = userAgentParts.join(" ");

  const fullPipelineOptions: InternalPipelineOptions = {
    ...pipelineOptions,
    userAgentOptions: {
      userAgentPrefix
    },
    loggingOptions: {
      logger: logger.info,
      allowedHeaderNames: StorageBlobLoggingAllowedHeaderNames,
      allowedQueryParameters: StorageBlobLoggingAllowedQueryParameters
    }
  };

  const authPolicyFactory: RequestPolicyFactory = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes)
    : credential;

  return createPipelineFromOptions(fullPipelineOptions, authPolicyFactory);
}
