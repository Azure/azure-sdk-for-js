// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  CommunicationNetworkTraversal,
  NetworkRelayRestClient,
} from "./generated/src/networkRelayRestClient";

import { SDK_VERSION } from "./constants";
import { logger } from "./common/logger";
import { createSpan } from "./common/tracing";
import { CommunicationRelayClientOptions, GetRelayConfigurationOptions } from "./models";
import {
  CommunicationRelayConfiguration,
  CommunicationNetworkTraversalIssueRelayConfigurationOptionalParams,
} from "./generated/src/models";

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
  private readonly client: CommunicationNetworkTraversal;

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
    const libInfo = `azsdk-js-communication-network-traversal/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new NetworkRelayRestClient(url, pipeline).communicationNetworkTraversal;
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
      requestOptions.body = { id: options.id, routeType: options.routeType, ttl: options.ttl };
    }

    const { span, updatedOptions } = createSpan(
      "CommunicationNetworkTraversal_IssueRelayConfiguration",
      requestOptions
    );

    try {
      const { ...result } = await this.client.issueRelayConfiguration(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
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
