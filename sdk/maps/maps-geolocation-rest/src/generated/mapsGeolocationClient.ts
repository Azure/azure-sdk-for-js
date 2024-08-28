// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential } from "@azure/core-auth";
import { MapsGeolocationClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class MapsGeolocationClient class.
 * @param credentials type: KeyCredential
 */
export default function createClient(
  credentials: KeyCredential,
  options: ClientOptions = {}
): MapsGeolocationClient {
  const baseUrl = options.baseUrl ?? `https://atlas.microsoft.com`;
  options.apiVersion = options.apiVersion ?? "1.0";
  options = {
    ...options,
    credentials: {
      apiKeyHeaderName: "subscription-key"
    }
  };

  const userAgentInfo = `azsdk-js-maps-geolocation-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as MapsGeolocationClient;

  return client;
}
