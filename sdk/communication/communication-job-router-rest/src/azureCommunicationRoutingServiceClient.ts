// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { AzureCommunicationRoutingServiceClient } from "./clientDefinitions";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import createClient from "../generated/azureCommunicationRoutingServiceClient"

/**
 * Initialize a new instance of `AzureCommunicationRoutingServiceClient`
 * @param connectionString - The connectionString or url of your Communication Services resource.
 * @param options - the parameter for all optional parameters
 */
export default function createCustomizedClient(
  connectionString: string,
  options: ClientOptions,
): AzureCommunicationRoutingServiceClient;

/**
 * Initialize a new instance of `AzureCommunicationRoutingServiceClient`
 * @param endpoint - Uri of your Communication resource
 * @param credentialOrOptions The key or token credential.
 * @param options - the parameter for all optional parameters
 */
export default function createCustomizedClient(
  endpoint: string,
  credentialOrOptions?: KeyCredential | TokenCredential,
  options?: ClientOptions,
): AzureCommunicationRoutingServiceClient;

// Implementation
export default function createCustomizedClient(
  arg1: string,
  arg2?: ClientOptions | (KeyCredential | TokenCredential),
  arg3?: ClientOptions,
): AzureCommunicationRoutingServiceClient {
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

  // Rest of the function remains the same, using connectionStringOrUrl or endpoint as needed
  const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
  const client = createClient(url);
  const authPolicy = createCommunicationAuthPolicy(credential);
  client.pipeline.addPolicy(authPolicy);

  return client;
}
