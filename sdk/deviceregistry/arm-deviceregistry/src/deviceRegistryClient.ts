// Licensed under the MIT license.

import { getClient, ClientOptions } from "@typespec/ts-http-runtime";
import { TokenCredential } from "@typespec/ts-http-runtime";
import { DeviceRegistryClient } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `DeviceRegistryClient`
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {},
): DeviceRegistryClient {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `https://management.azure.com`;
  options.apiVersion = options.apiVersion ?? "2023-11-01-preview";
  const userAgentInfo = `azsdk-js-MicrosoftDeviceRegistryManagementService-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? ["user_impersonation"],
    },
  };

  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as DeviceRegistryClient;

  return client;
}
