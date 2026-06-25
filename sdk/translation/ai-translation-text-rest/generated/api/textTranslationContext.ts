// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownAPIVersion } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

/** Azure Translator is a cloud-based, multilingual, neural machine translation service. The Text Translation API enables robust and scalable translation capabilities suitable for diverse applications. */
export interface TextTranslationContext extends Client {
  /** Mandatory API version parameter */
  /** Known values of {@link KnownAPIVersion} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface TextTranslationClientOptionalParams extends ClientOptions {
  /** Mandatory API version parameter */
  /** Known values of {@link KnownAPIVersion} that the service accepts. */
  apiVersion?: string;
}

/** Azure Translator is a cloud-based, multilingual, neural machine translation service. The Text Translation API enables robust and scalable translation capabilities suitable for diverse applications. */
export function createTextTranslation(
  endpointParam: string,
  credential: any | KeyCredential | TokenCredential,
  options: TextTranslationClientOptionalParams = {},
): TextTranslationContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-translation-text/1.0.0-beta.1`;
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
  return { ...clientContext, apiVersion } as TextTranslationContext;
}
