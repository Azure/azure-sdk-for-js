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
  WebResource,
  isNode,
  TokenCredential,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  PipelineOptions,
  InternalPipelineOptions,
  ServiceClientOptions
} from "@azure/core-http";

import { logger } from "./log";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  StorageOAuthScopes,
  StorageQueueLoggingAllowedHeaderNames,
  StorageQueueLoggingAllowedQueryParameters,
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
  HttpOperationResponse,
  HttpRequestBody,
  WebResource,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
};

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @static
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity. If not specified,
 *                                                  AnonymousCredential is used.
 * @param {PipelineOptions} [pipelineOptions] Options.
 * @returns {ServiceClientOptions} A new Pipeline object.
 * @memberof Pipeline
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
    userAgentParts.push(`azsdk-js-storagequeue/${SDK_VERSION}`);
  }

  const userAgentPrefix = userAgentParts.join(" ");

  const fullPipelineOptions: InternalPipelineOptions = {
    ...pipelineOptions,
    userAgentOptions: {
      userAgentPrefix
    },
    loggingOptions: {
      logger: logger.info,
      allowedHeaderNames: StorageQueueLoggingAllowedHeaderNames,
      allowedQueryParameters: StorageQueueLoggingAllowedQueryParameters
    }
  };

  const authPolicyFactory: RequestPolicyFactory = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes)
    : credential;

  return createPipelineFromOptions(fullPipelineOptions, authPolicyFactory);
}
