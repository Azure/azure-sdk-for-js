// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DEFAULT_SCOPE, LIB_INFO } from "./constants";
import { logger } from "./logger";

import {
  InternalPipelineOptions,
  PipelineOptions,
  ServiceClientOptions,
  TokenCredential,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

/**
 * Builds ServiceClientOptions from PipelineOptions and credentials.
 * Sets up logger and user agent prefix.
 */
export function createPipeline(
  options: PipelineOptions,
  credential: TokenCredential
): ServiceClientOptions {
  const internalOptions = convertPipelineOptions(options);
  const policy = bearerTokenAuthenticationPolicy(credential, DEFAULT_SCOPE);
  return createPipelineFromOptions(internalOptions, policy);
}

/**
 * Converts PipelineOptions to InternalPipelineOptions.
 * Adds logger and user agent prefix.
 */
function convertPipelineOptions(options: PipelineOptions): InternalPipelineOptions {
  if (!options.userAgentOptions) {
    options.userAgentOptions = {};
  }

  if (options.userAgentOptions.userAgentPrefix) {
    options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
  } else {
    options.userAgentOptions.userAgentPrefix = LIB_INFO;
  }

  return {
    ...options,
    loggingOptions: {
      logger: logger.info
    }
  };
}
