// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { isTokenCredential, TokenCredential, KeyCredential } from "@azure/core-auth";
import { AzureCommunicationMessagesServiceClient } from "./clientDefinitions";
import { 
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";

/**
 * Initialize a new instance of `AzureCommunicationMessagesServiceClient`
 * @param connectionString - The connectionString or url of your Communication Services resource.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  connectionString: string,
  options: ClientOptions,
): AzureCommunicationMessagesServiceClient;

/**
 * Initialize a new instance of `AzureCommunicationMessagesServiceClient`
 * @param endpoint - The endpoint of your Communication Services resource.
 * @param credentialOrOptions The key or token credential.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentialOrOptions?: KeyCredential | TokenCredential,
  options?: ClientOptions,
): AzureCommunicationMessagesServiceClient;

/**
 * Initialize a new instance of `AzureCommunicationMessagesServiceClient`
 * @param endpoint - The communication resource, for example https://my-resource.communication.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  arg1: string,
  arg2?: ClientOptions | (TokenCredential | KeyCredential),
  arg3?: ClientOptions,
): AzureCommunicationMessagesServiceClient {
  let credentialOrOptions: KeyCredential | TokenCredential | undefined;
  let options: ClientOptions | undefined;
  const connectionStringOrUrl = arg1;

  // Determine which constructor is being called based on the types of the arguments
  if (isTokenCredential(arg2) || isKeyCredential(arg2)) {
    credentialOrOptions = arg2 as KeyCredential | TokenCredential;
    options = arg3 as ClientOptions;
  } else {
    options = arg2 as ClientOptions;
  }
  if (options === undefined) {
    options = {};
  }

  const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
  const baseUrl = options.baseUrl ?? `${url}`;
  options.apiVersion = options.apiVersion ?? "2024-02-01";

  const userAgentInfo = `azsdk-js-communication-messages-rest/1.0.0-beta.2`;
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
        "https://communication.azure.com/.default",
      ],
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "Authorization",
    },
  };

  const client = getClient(baseUrl, options) as AzureCommunicationMessagesServiceClient;
  const authPolicy = createCommunicationAuthPolicy(credential);
  client.pipeline.addPolicy(authPolicy);

  return client;
}
