// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential, KeyCredential, isKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { parseClientArguments,  createCommunicationAuthPolicy } from "@azure/communication-common";
import { MessagesServiceClient } from "./generated/src/clientDefinitions";
import GeneratedAzureCommunicationMessageServiceClient from "./generated/src/messagesServiceClient";


/**
 * Initialize a new instance of `MessagesServiceClient`
 * @param connectionString - The connectionString or url of your Communication Services resource.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
    connectionString: string,
    options: ClientOptions,
  ): MessagesServiceClient;
  
  /**
   * Initialize a new instance of `MessagesServiceClient`
   * @param endpoint - The endpoint of your Communication Services resource.
   * @param credentialOrOptions The key or token credential.
   * @param options - the parameter for all optional parameters
   */
  export default function createClient(
    endpoint: string,
    credentialOrOptions?: KeyCredential | TokenCredential,
    options?: ClientOptions,
  ): MessagesServiceClient;
  
  /**
   * Initialize a new instance of `MessagesServiceClient`
   * @param endpoint - The communication resource, for example https://my-resource.communication.azure.com
   * @param credentials - uniquely identify client credential
   * @param options - the parameter for all optional parameters
   */
  export default function createClient(
    arg1: string,
    arg2?: ClientOptions | (TokenCredential | KeyCredential),
    arg3?: ClientOptions,
  ): MessagesServiceClient {
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
  
    const client = GeneratedAzureCommunicationMessageServiceClient(baseUrl, credential, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
  
    return client;
  }