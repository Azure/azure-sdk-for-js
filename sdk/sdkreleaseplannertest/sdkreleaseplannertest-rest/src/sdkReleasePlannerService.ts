// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { SdkReleasePlannerServiceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class SdkReleasePlannerServiceClient class.
 * @param ledgerUri type: string
 * @param credentials type: TokenCredential
 */
export default function createClient(
  ledgerUri: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): SdkReleasePlannerServiceClient {
  const baseUrl = options.baseUrl ?? `${ledgerUri}`;
  options.apiVersion = options.apiVersion ?? "2022-08-13";
  options = {
    ...options,
    credentials: {
      scopes: ["https://confidential-ledger.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-sdkreleaseplannertest-rest/1.0.0-beta.1`;
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as SdkReleasePlannerServiceClient;

  return client;
}
