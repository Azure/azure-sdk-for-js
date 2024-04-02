// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import { TextTranslationClient } from "../clientDefinitions";
import {
  DEFAULT_SCOPE,
  TranslatorCredential,
  TranslatorTokenCredential,
  TranslatorAuthenticationPolicy,
  TranslatorAzureKeyAuthenticationPolicy,
  TranslatorTokenCredentialAuthenticationPolicy,
} from "./authentication";
import { AzureKeyCredential, KeyCredential, TokenCredential } from "@azure/core-auth";

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

/**
 * Initialize a new instance of `TextTranslationClient`
 * @param endpoint type: string, Supported Text Translation endpoints (protocol and hostname, for example:
 *     https://api.cognitive.microsofttranslator.com).
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: undefined | string,
  credential:
    | undefined
    | TranslatorCredential
    | TranslatorTokenCredential
    | KeyCredential
    | TokenCredential = undefined,
  options: ClientOptions = {},
): TextTranslationClient {
  let serviceEndpoint: string;

  options.apiVersion = options.apiVersion ?? "3.0";

  if (!endpoint) {
    serviceEndpoint = DEFAULT_ENPOINT;
  } else if (endpoint.toLowerCase().indexOf(PLATFORM_HOST) !== -1) {
    serviceEndpoint = `${endpoint}${PLATFORM_PATH}`;
  } else {
    serviceEndpoint = endpoint;
  }

  const baseUrl = options.baseUrl ?? `${serviceEndpoint}`;

  const userAgentInfo = `azsdk-js-ai-translation-text-rest/1.0.0-beta.2`;
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
        scopes: DEFAULT_SCOPE,
      }),
    );
  } else if (isTranslatorTokenCredential(credential)) {
    client.pipeline.addPolicy(
      coreRestPipeline.bearerTokenAuthenticationPolicy({
        credential: (credential as TranslatorTokenCredential).tokenCredential,
        scopes: DEFAULT_SCOPE,
      }),
    );
    client.pipeline.addPolicy(
      new TranslatorTokenCredentialAuthenticationPolicy(credential as TranslatorTokenCredential),
    );
  }

  return client;
}
