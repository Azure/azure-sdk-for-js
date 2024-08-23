// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { FarmBeatsClient } from "./clientDefinitions";

/** The optional parameters for the client */
export interface FarmBeatsClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `FarmBeatsClient`
 * @param $host - server parameter
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  $host: string,
  credentials: TokenCredential,
  {
    apiVersion = "2022-11-01-preview",
    ...options
  }: FarmBeatsClientOptions = {},
): FarmBeatsClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${$host}`;
  const userAgentInfo = `azsdk-js-agrifood-farming-rest/1.0.0-beta.3`;
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
      scopes: options.credentials?.scopes ?? [
        "https://farmbeats.azure.net/.default",
      ],
    },
  };
  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as FarmBeatsClient;

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
