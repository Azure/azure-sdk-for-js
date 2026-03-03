// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface TranscriptionContext extends Client {
  /** The API version to use for this operation. */
  serviceVersion?: string;
}

/** Optional parameters for the client. */
export interface TranscriptionClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  serviceVersion?: string;
}

export function createTranscription(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: TranscriptionClientOptionalParams = {},
): TranscriptionContext {
  const endpointUrl = options.endpoint ?? `${endpoint}/speechtotext`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-speech-transcription/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { serviceVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const serviceVersion = options.serviceVersion;
  return { ...clientContext, serviceVersion } as TranscriptionContext;
}
