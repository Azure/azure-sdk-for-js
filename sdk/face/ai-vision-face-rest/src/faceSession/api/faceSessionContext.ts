// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../../logger.js";
import { Versions } from "../../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface FaceSessionContext extends Client {
  /** API Version */
  apiVersion?: Versions;
}

/** Optional parameters for the client. */
export interface FaceSessionClientOptionalParams extends ClientOptions {
  /** API Version */
  apiVersion?: string;
}

export function createFaceSession(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: FaceSessionClientOptionalParams = {},
): FaceSessionContext {
  const apiVersion = options.apiVersion ?? "v1.3-preview.1";
  const endpointUrl = options.endpoint ?? `${endpointParam}/face/${apiVersion}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-vision-face/1.0.0-beta.1`;
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
  return { ...clientContext, apiVersion } as FaceSessionContext;
}
