// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger";
import { TokenCredential, KeyCredential, isKeyCredential } from "@azure/core-auth";
import { EventGridContext } from "./clientDefinitions";

/**
 * Initialize a new instance of `EventGridContext`
 * @param endpointParam - The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): EventGridContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  options.apiVersion = options.apiVersion ?? "2024-06-01";
  const userAgentInfo = `azsdk-js-eventgrid-namespaces-rest/1.0.0`;
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

  const client = getClient(endpointUrl, credentials, options) as EventGridContext;

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
