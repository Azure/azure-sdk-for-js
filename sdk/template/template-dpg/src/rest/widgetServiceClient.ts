// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ClientOptions, addCredentialPipelinePolicy, getClient } from "@azure-rest/core-client";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { logger } from "../logger.js";
import { WidgetServiceContext } from "./clientDefinitions.js";

/**
 * This customization adds credential support to the client. And overloads for when it is optional
 */
export default function createClient(
  endpoint: string,
  credential: TokenCredential,
  options?: ClientOptions
): WidgetServiceContext;
export default function createClient(
  endpoint: string,
  options?: ClientOptions
): WidgetServiceContext;
export default function createClient(
  endpoint: string,
  credentialOrOptions?: TokenCredential | ClientOptions,
  options: ClientOptions = {}
): WidgetServiceContext {
  let credential: TokenCredential | undefined;
  if (isTokenCredential(credentialOrOptions)) {
    credential = credentialOrOptions;
  } else {
    options = credentialOrOptions ?? {};
  }

  const client = _createClient(endpoint, options);
  addCredentialPipelinePolicy(client.pipeline, endpoint, { credential, clientOptions: options });
  return client;
}

/**
 * Initialize a new instance of `WidgetServiceContext`
 * @param endpoint - The parameter endpoint
 * @param options - the parameter for all optional parameters
 */
function _createClient(endpoint: string, options: ClientOptions = {}): WidgetServiceContext {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "1.0.0";
  const userAgentInfo = `azsdk-js-widget-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
  };
  const client = getClient(baseUrl, options) as WidgetServiceContext;
  return client;
}
