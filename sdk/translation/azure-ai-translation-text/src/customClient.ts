// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { TextTranslationClient } from "./generated/clientDefinitions";
import {
  TranslatorCredential,
  TranslatorAuthenticationPolicy,
  TranslatorCustomEndpoint,
  TranslatorAzureKeyAuthenticationPolicy
} from "./authentication";
import {
  AzureKeyCredential,
  TokenCredential
} from "@azure/core-auth";

const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";

/**
 * Initialize a new instance of `TextTranslationClient`
 * @param endpoint type: string, Supported Text Translation endpoints (protocol and hostname, for example:
 *     https://api.cognitive.microsofttranslator.com).
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string | TranslatorCustomEndpoint,
  credential: undefined | TranslatorCredential | AzureKeyCredential | TokenCredential = undefined,
  options: ClientOptions = {}
): TextTranslationClient {
  let serviceEndpoint: string;
  if (endpoint instanceof TranslatorCustomEndpoint) {
    serviceEndpoint = `${endpoint.endpoint}/translator/text/v3.0`;
  } else {
    serviceEndpoint = endpoint;
  }

  const baseUrl = options.baseUrl ?? `${serviceEndpoint}`;

  const userAgentInfo = `azsdk-js-azure-ai-translation-text-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, options) as TextTranslationClient;
  client.pipeline.addPolicy(apiVersionPolicy);

  if (credential instanceof TranslatorCredential) {
    const mtAuthneticationPolicy = new TranslatorAuthenticationPolicy(credential as TranslatorCredential);
    client.pipeline.addPolicy(mtAuthneticationPolicy);
  } else if (credential instanceof AzureKeyCredential) {
    const mtKeyAuthenticationPolicy = new TranslatorAzureKeyAuthenticationPolicy(credential as AzureKeyCredential);
    client.pipeline.addPolicy(mtKeyAuthenticationPolicy);
  } else if (credential) {
    client.pipeline.addPolicy(
      coreRestPipeline.bearerTokenAuthenticationPolicy({
        credential: credential as TokenCredential,
        scopes: DEFAULT_SCOPE
      })
    );
  }

  return client;
}

/** Policy that sets the api-version (or equivalent) to reflect the library version. */
const apiVersionPolicy = {
  name: "MTApiVersionPolicy",
  async sendRequest(
    request: PipelineRequest,
    next: SendRequest
  ): Promise<PipelineResponse> {
    const param = request.url.split("?");
    if (param.length > 1) {
      const newParams = param[1].split("&");
      newParams.push("api-version=3.0");
      request.url = param[0] + "?" + newParams.join("&");
    } else {
      // no query parameters in request url
      request.url = param[0] + "?api-version=3.0";
    }
    return next(request);
  }
};
