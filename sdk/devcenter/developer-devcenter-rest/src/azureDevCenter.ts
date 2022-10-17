// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureDevCenterClient } from "./clientDefinitions";

export default function createClient(
  tenantId: string,
  devCenter: string,
  credentials: TokenCredential,
  devCenterDnsSuffix: string = "devcenter.azure.com",
  options: ClientOptions = {}
): AzureDevCenterClient {
  const baseUrl = options.baseUrl ?? `https://${tenantId}-${devCenter}.${devCenterDnsSuffix}`;
  options.apiVersion = options.apiVersion ?? "2022-03-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://devcenter.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-developer-devcenter-rest/1.0.0`;
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

  const client = getClient(baseUrl, credentials, options) as AzureDevCenterClient;

  return client;
}
