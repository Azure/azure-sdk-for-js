// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { DeviceUpdateClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `DeviceUpdateClient`
 * @param endpoint - The Device Update for IoT Hub account endpoint (hostname only, no protocol).
 * @param instanceId - The Device Update for IoT Hub account instance identifier.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  instanceId: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): DeviceUpdateClient {
  const baseUrl =
    options.baseUrl ?? `https://${endpoint}/deviceUpdate/${instanceId}`;
  options.apiVersion = options.apiVersion ?? "2023-10-01-preview";
  const userAgentInfo = `azsdk-js-iot-device-update-rest/1.0.0-beta.1`;
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
        "https://api.adu.microsoft.com/.default",
      ],
    },
  };

  const client = getClient(baseUrl, credentials, options) as DeviceUpdateClient;

  return client;
}
