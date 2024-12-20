// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "../logger.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PurviewMetadataPoliciesClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface PurviewMetadataPoliciesClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `PurviewMetadataPoliciesClient`
 * @param endpoint - The endpoint of your Purview account. Example: https://\{accountName\}.purview.azure.com.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export function createClient(
  endpoint: string,
  credentials: TokenCredential,
  { apiVersion = "2021-07-01-preview", ...options }: PurviewMetadataPoliciesClientOptions = {},
): PurviewMetadataPoliciesClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpoint}/policyStore`;
  const userAgentInfo = `azsdk-js-purview-administration-rest/1.0.0-beta.2`;
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
      scopes: ["https://purview.azure.net/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as PurviewMetadataPoliciesClient;

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
