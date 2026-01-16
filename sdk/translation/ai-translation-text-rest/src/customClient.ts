// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import type { TextTranslationClient } from "./clientDefinitions.js";
import type {
  TranslatorCredential,
  TranslatorTokenCredential,
} from "./authenticationCustomized.js";
import {
  DEFAULT_SCOPE,
  TranslatorAuthenticationPolicy,
  TranslatorAzureKeyAuthenticationPolicy,
  TranslatorTokenCredentialAuthenticationPolicy,
} from "./authenticationCustomized.js";
import type { AzureKeyCredential, KeyCredential, TokenCredential } from "@azure/core-auth";

const DEFAULT_ENPOINT = "https://api.cognitive.microsofttranslator.com";
const PLATFORM_HOST = "cognitiveservices";
const PLATFORM_PATH = "/translator/text/v3.0";

function isKeyCredential(credential: any): credential is KeyCredential {
  return (credential as KeyCredential)?.key !== undefined;
}

function isTranslatorKeyCredential(credential: any): credential is TranslatorCredential {
  return (credential as TranslatorCredential)?.key !== undefined;
}

function isTokenCredential(credential: any): credential is TokenCredential {
  return (credential as TokenCredential)?.getToken !== undefined;
}

function isTranslatorTokenCredential(credential: any): credential is TranslatorTokenCredential {
  return (
    (credential as TranslatorTokenCredential)?.tokenCredential !== undefined &&
    (credential as TranslatorTokenCredential)?.azureResourceId !== undefined
  );
}

function isCredentials(credential: any): boolean {
  return (
    isKeyCredential(credential) ||
    isTranslatorKeyCredential(credential) ||
    isTokenCredential(credential) ||
    isTranslatorTokenCredential(credential)
  );
}

/**
 * Initialize a new instance of `TextTranslationClient`
 * @param credential - type: TranslatorCredential | TranslatorTokenCredential | KeyCredential |TokenCredential, credentials
 *      used to authenticate the service with.
 * @param options - type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  credential: TranslatorCredential | TranslatorTokenCredential | KeyCredential | TokenCredential,
  options?: ClientOptions,
): TextTranslationClient;

/**
 * Initialize a new instance of `TextTranslationClient`
 * @param endpoint - type: string, Supported Text Translation endpoints (protocol and hostname, for example:
 *     https://api.cognitive.microsofttranslator.com).
 * @param options - type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  options?: ClientOptions,
): TextTranslationClient;

/**
 * Initialize a new instance of `TextTranslationClient`
 * @param endpoint - type: string, Supported Text Translation endpoints (protocol and hostname, for example:
 *     https://api.cognitive.microsofttranslator.com).
 * @param credential - type: TranslatorCredential | TranslatorTokenCredential | KeyCredential |TokenCredential, credentials
 *      used to authenticate the service with.
 * @param options - type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credential: TranslatorCredential | TranslatorTokenCredential | KeyCredential | TokenCredential,
  options?: ClientOptions,
): TextTranslationClient;

// Implementation
export default function createClient(
  arg1?:
    | string
    | (TranslatorCredential | TranslatorTokenCredential | KeyCredential | TokenCredential),
  arg2?:
    | (TranslatorCredential | TranslatorTokenCredential | KeyCredential | TokenCredential)
    | ClientOptions,
  arg3?: ClientOptions,
): TextTranslationClient {
  let serviceEndpoint: string;

  let endpoint: string | undefined;
  let options: ClientOptions | undefined;
  let credential:
    | TranslatorCredential
    | TranslatorTokenCredential
    | KeyCredential
    | TokenCredential
    | undefined;

  if (typeof arg1 === "string") {
    endpoint = arg1;
  }

  if (typeof arg1 !== "string" && isCredentials(arg1)) {
    credential = arg1;
    options = arg2 as ClientOptions;
  } else if (isCredentials(arg2)) {
    credential = arg2 as
      | TranslatorCredential
      | TranslatorTokenCredential
      | KeyCredential
      | TokenCredential;
    options = arg3;
  }

  if (!options) {
    options = {};
  }

  options.apiVersion = options.apiVersion ?? "2025-10-01-preview";

  if (!endpoint) {
    serviceEndpoint = DEFAULT_ENPOINT;
  } else if (endpoint.toLowerCase().indexOf(PLATFORM_HOST) !== -1) {
    serviceEndpoint = `${endpoint}${PLATFORM_PATH}`;
  } else {
    serviceEndpoint = endpoint;
  }

  const baseUrl = options.baseUrl ?? `${serviceEndpoint}`;

  const userAgentInfo = `azsdk-js-ai-translation-text-rest/2.0.0-beta.1`;
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

  const client = getClient(baseUrl, options) as TextTranslationClient;

  if (isTranslatorKeyCredential(credential)) {
    const mtAuthneticationPolicy = new TranslatorAuthenticationPolicy(
      credential as TranslatorCredential,
    );
    client.pipeline.addPolicy(mtAuthneticationPolicy);
  } else if (isKeyCredential(credential)) {
    const mtKeyAuthenticationPolicy = new TranslatorAzureKeyAuthenticationPolicy(
      credential as AzureKeyCredential,
    );
    client.pipeline.addPolicy(mtKeyAuthenticationPolicy);
  } else if (isTokenCredential(credential)) {
    client.pipeline.addPolicy(
      coreRestPipeline.bearerTokenAuthenticationPolicy({
        credential: credential as TokenCredential,
        scopes: options?.credentials?.scopes ?? DEFAULT_SCOPE,
      }),
    );
  } else if (isTranslatorTokenCredential(credential)) {
    client.pipeline.addPolicy(
      coreRestPipeline.bearerTokenAuthenticationPolicy({
        credential: (credential as TranslatorTokenCredential).tokenCredential,
        scopes: options?.credentials?.scopes ?? DEFAULT_SCOPE,
      }),
    );
    client.pipeline.addPolicy(
      new TranslatorTokenCredentialAuthenticationPolicy(credential as TranslatorTokenCredential),
    );
  }

  return client;
}
