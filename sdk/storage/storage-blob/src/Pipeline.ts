// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  RequestPolicyFactory,
  ServiceClientOptions,
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
import { RetryPolicyFactory, RetryOptions } from "./RetryPolicyFactory";

/**
 * Option interface for newPipeline() method.
 *
 * @export
 * @interface StoragePipelineOptions
 */
export interface StoragePipelineOptions extends PipelineOptions {
  /**
   * Configures the built-in retry policy behavior.
   *
   * @type {RetryOptions}
   * @memberof StoragePipelineOptions
   */
  retryOptions?: RetryOptions;
}

/**
 * Creates a ServiceClientOptions object with Credential provided.
 *
 * @export
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity.
 * @param {StoragePipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {ServiceClientOptions} ServiceClientOptions for use with @azure/core-http
 */
export function newPipeline(
  credential: SharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
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
    },
    updatePipelinePolicies: (requestPolicyFactories) => {
      // Currently, the only way to remove the retry policies provided by createPipelineFromOptions is
      // by removing the last 3 factories.
      // https://github.com/Azure/azure-sdk-for-js/issues/5804
      let result = requestPolicyFactories.slice(0, -3);
      result.push(new RetryPolicyFactory(pipelineOptions.retryOptions));

      if (pipelineOptions.updatePipelinePolicies) {
        result = pipelineOptions.updatePipelinePolicies(result);
      }
      return result;
    }
  };

  const authPolicyFactory: RequestPolicyFactory = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes)
    : credential;

  return createPipelineFromOptions(fullPipelineOptions, authPolicyFactory);
}
