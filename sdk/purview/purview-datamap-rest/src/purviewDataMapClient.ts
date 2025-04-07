// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PurviewDataMapClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface PurviewDataMapClientOptions extends ClientOptions {}

/**
 * Initialize a new instance of `PurviewDataMapClient`
 * @param endpointParam - Represent a URL string as described by https://url.spec.whatwg.org/
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential,
  options: PurviewDataMapClientOptions = {},
): PurviewDataMapClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}/datamap/api`;
  const userAgentInfo = `azsdk-js-purview-datamap-rest/1.0.0-beta.1`;
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
      scopes: options.credentials?.scopes ?? ["https://purview.azure.net/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as PurviewDataMapClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }

  return client;
}
