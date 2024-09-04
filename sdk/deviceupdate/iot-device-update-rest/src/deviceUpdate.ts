// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { DeviceUpdateClient } from "./clientDefinitions";

/** The optional parameters for the client */
export interface DeviceUpdateClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `DeviceUpdateClient`
 * @param endpoint - The Device Update for IoT Hub account endpoint (hostname only, no protocol).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  { apiVersion = "2022-10-01", ...options }: DeviceUpdateClientOptions = {},
): DeviceUpdateClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `https://${endpoint}`;
  const userAgentInfo = `azsdk-js-iot-device-update-rest/1.0.1`;
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
      scopes: options.credentials?.scopes ?? ["https://api.adu.microsoft.com/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as DeviceUpdateClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
          }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });

  return client;
}
