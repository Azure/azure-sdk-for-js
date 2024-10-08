// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TokenCredential,
  isTokenCredential,
  KeyCredential,
  isKeyCredential,
} from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { parseClientArguments, createCommunicationAuthPolicy } from "@azure/communication-common";
import { MessagesServiceClient } from "./generated/src/clientDefinitions";
import GeneratedAzureCommunicationMessageServiceClient from "./generated/src/messagesServiceClient";

/**
 * Initialize a new instance of `MessagesServiceClient`
 * @param connectionString - The connectionString or url of your Communication Services resource.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  connectionString: string,
  options?: ClientOptions,
): MessagesServiceClient;

/**
 * Initialize a new instance of `MessagesServiceClient`
 * @param endpoint - The endpoint of your Communication Services resource.
 * @param credential - The key or token credential.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options?: ClientOptions,
): MessagesServiceClient;

/**
 * Initialize a new instance of `MessagesServiceClient`
 * @param endpoint - The communication resource, for example https://my-resource.communication.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointOrConnectionString: string,
  credentialOrOptions?: ClientOptions | (TokenCredential | KeyCredential),
  options?: ClientOptions,
): MessagesServiceClient {
  if (!(isTokenCredential(credentialOrOptions) || isKeyCredential(credentialOrOptions))) {
    options = credentialOrOptions as ClientOptions;
  }

  if (options === undefined) {
    options = {};
  }

  const { url, credential } = parseClientArguments(endpointOrConnectionString, credentialOrOptions);
  const baseUrl = options.baseUrl ?? `${url}`;

  const client = GeneratedAzureCommunicationMessageServiceClient(baseUrl, credential, options);
  const authPolicy = createCommunicationAuthPolicy(credential);
  client.pipeline.addPolicy(authPolicy);

  return client;
}
