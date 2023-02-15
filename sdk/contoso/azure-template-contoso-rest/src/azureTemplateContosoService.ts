// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { AzureTemplateContosoServiceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class AzureTemplateContosoServiceClient class.
 * @param endpoint type: string
 */
export default function createClient(
  endpoint: string,
  options: ClientOptions = {}
): AzureTemplateContosoServiceClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;

  const userAgentInfo = `azsdk-js-azure-template-contoso-rest/1.0.0-beta.1`;
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
    options
  ) as AzureTemplateContosoServiceClient;

  return client;
}
