// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { DeviceUpdateClient } from "./clientDefinitions";

export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): DeviceUpdateClient {
  const baseUrl = options.baseUrl ?? `https://${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2022-07-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://api.adu.microsoft.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-iot-device-update-rest/1.0.0-beta.2`;
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

  const client = getClient(baseUrl, credentials, options) as DeviceUpdateClient;

  return client;
}
