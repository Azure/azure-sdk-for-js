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
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./common/tracing";
import { logger } from "./common/logger";

const isCommunicationRelayClientOptions = (
  options: any
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
    options?: CommunicationRelayClientOptions
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
    options?: CommunicationRelayClientOptions
  );

  /**
   * Initializes a new instance of the CommunicationRelayClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    connectionStringOrEndpoint: string,
    credentialOrOptions?: KeyCredential | CommunicationRelayClientOptions | TokenCredential,
    maybeOptions: CommunicationRelayClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(
      connectionStringOrEndpoint,
      credentialOrOptions
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
  public async getRelayConfiguration(
    options?: GetRelayConfigurationOptions
  ): Promise<CommunicationRelayConfiguration>;

  /**
   * Gets a TURN credential for a user
   *
   * @param user - The user for whom to issue a token
   * @param routeType - The specified routeType for the relay request
   * @param ttl - The specified time to live for the relay credential in seconds
   * @param options - Additional options for the request.
   */
  public async getRelayConfiguration(
    options: GetRelayConfigurationOptions = {}
  ): Promise<CommunicationRelayConfiguration> {
    const requestOptions: CommunicationNetworkTraversalIssueRelayConfigurationOptionalParams =
      options;

    if (options !== "undefined") {
      requestOptions.id = options.id;
      requestOptions.routeType = options.routeType;
      requestOptions.ttl = options.ttl;
    }

    const { span, updatedOptions } = createSpan(
      "CommunicationNetworkTraversal_IssueRelayConfiguration",
      requestOptions
    );

    try {
      return await this.client.communicationNetworkTraversal.issueRelayConfiguration(
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
