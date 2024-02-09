// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  CommunicationNetworkTraversalIssueRelayConfigurationOptionalParams,
  CommunicationRelayConfiguration,
} from "./generated/src/models";
import { CommunicationRelayClientOptions, GetRelayConfigurationOptions } from "./models";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { NetworkRelayRestClient } from "./generated/src/networkRelayRestClient";
import { logger } from "./common/logger";
import { tracingClient } from "./generated/src/tracing";

const isCommunicationRelayClientOptions = (
  options: any,
): options is CommunicationRelayClientOptions =>
  options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * Client class for the Azure Communication Services Relay client.
 */
export class CommunicationRelayClient {
  /**
   * A reference to the auto-generated UserToken HTTP client.
   */
  private readonly client: NetworkRelayRestClient;

  /**
   * Initializes a new instance of the CommunicationRelayClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: CommunicationRelayClientOptions);

  /**
   * Initializes a new instance of the CommunicationRelayClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: CommunicationRelayClientOptions,
  );
  /**
   * Initializes a new instance of the CommunicationRelayClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net)
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: CommunicationRelayClientOptions,
  );

  /**
   * Initializes a new instance of the CommunicationRelayClient class.
   * @param connectionStringOrEndpoint - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param credentialOrOptions - TokenCredential that is used to authenticate requests to the service or options to configure the HTTP pipeline.
   * @param maybeOptions - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    connectionStringOrEndpoint: string,
    credentialOrOptions?: KeyCredential | CommunicationRelayClientOptions | TokenCredential,
    maybeOptions: CommunicationRelayClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(
      connectionStringOrEndpoint,
      credentialOrOptions,
    );
    const options = isCommunicationRelayClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new NetworkRelayRestClient(url, {
      endpoint: url,
      ...internalPipelineOptions,
    });

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Gets a TURN credential for a user
   *
   * @param options - Additional options for the request.
   */
  public getRelayConfiguration(
    options?: GetRelayConfigurationOptions,
  ): Promise<CommunicationRelayConfiguration>;

  /**
   * Gets a TURN credential for a user
   *
   * @param options - Additional options for the request.
   */
  public getRelayConfiguration(
    options: GetRelayConfigurationOptions = {},
  ): Promise<CommunicationRelayConfiguration> {
    const { id, routeType, ttl } = options;
    const requestOptions: CommunicationNetworkTraversalIssueRelayConfigurationOptionalParams = {
      ...options,
      id,
      routeType,
      ttl,
    };

    return tracingClient.withSpan(
      "CommunicationNetworkTraversal_IssueRelayConfiguration",
      requestOptions,
      (updatedOptions) => {
        return this.client.communicationNetworkTraversal.issueRelayConfiguration(updatedOptions);
      },
    );
  }
}
