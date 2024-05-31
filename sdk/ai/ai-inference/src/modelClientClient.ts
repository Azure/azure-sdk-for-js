// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import {
  TokenCredential,
  KeyCredential,
  isKeyCredential,
} from "@azure/core-auth";
import { ModelClientContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `ModelClientContext`
 * @param endpointParam - The parameter endpointParam
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): ModelClientContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  options.apiVersion = options.apiVersion ?? "2024-05-01-preview";
  const userAgentInfo = `azsdk-js-ai-inference-rest/1.0.0-beta.1`;
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
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ml.azure.com/.default"],
    },
  };

  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as ModelClientContext;

  if (isKeyCredential(credentials)) {
    client.pipeline.addPolicy({
      name: "customKeyCredentialPolicy",
      async sendRequest(request, next) {
        request.headers.set("Authorization", "bearer " + credentials.key);
        return next(request);
      },
    });
  }

  return client;
}
