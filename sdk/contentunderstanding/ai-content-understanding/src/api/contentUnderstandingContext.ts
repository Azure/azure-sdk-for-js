// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface ContentUnderstandingContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface ContentUnderstandingClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

// CUSTOMIZATION: EMITTER-FIX: Renamed 'endpointParam' to 'endpoint' for clarity and consistency.
// The emitter generates 'endpointParam' but 'endpoint' is the standard name.
export function createContentUnderstanding(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: ContentUnderstandingClientOptionalParams = {},
): ContentUnderstandingContext {
  const endpointUrl = options.endpoint ?? `${endpoint}/contentunderstanding`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-content-understanding/1.0.0`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion } as ContentUnderstandingContext;
}
