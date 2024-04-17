// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger";
import { TokenCredential, KeyCredential, isKeyCredential } from "@azure/core-auth";
import { EventGridContext } from "./clientDefinitions";

/**
 * Initialize a new instance of `EventGridContext`
 * @param endpoint - The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): EventGridContext {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-10-01-preview";
  const userAgentInfo = `azsdk-js-eventgrid-namespaces-rest/1.0.0-beta.1`;
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
      scopes: options.credentials?.scopes ?? ["https://eventgrid.azure.net/.default"],
      apiKeyHeaderName: "Authorization",
    },
  };

  const client = getClient(baseUrl, credentials, options) as EventGridContext;

  if (isKeyCredential(credentials)) {
    client.pipeline.addPolicy({
      name: "customKeyCredentialPolicy",
      async sendRequest(request, next) {
        request.headers.set("Authorization", "SharedAccessKey " + credentials.key);
        return next(request);
      },
    });
  }

  return client;
}
