// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger.js";
import { TokenCredential } from "@azure/core-auth";
import { HealthDataAIServicesContext } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface HealthDataAIServicesContextOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `HealthDataAIServicesContext`
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  credentials: TokenCredential,
  { apiVersion = "2024-02-28-preview", ...options }: HealthDataAIServicesContextOptions = {},
): HealthDataAIServicesContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `https://management.azure.com`;
  const userAgentInfo = `azsdk-js-arm-healthdataaiservices/1.0.0-beta.2`;
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
      scopes: options.credentials?.scopes ?? [`${endpointUrl}/.default`],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as HealthDataAIServicesContext;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });
  return client;
}
