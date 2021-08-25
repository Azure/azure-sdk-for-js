// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  OperationOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { extractOperationOptions } from "./extractOperationOptions";
import {
  AzureCommunicationSIPRoutingService as SIPRoutingService
} from "./generated/src/azureCommunicationSIPRoutingService"
import {
  GetSipConfigurationResponse,
  PatchSipConfigurationResponse,
  SipConfigurationPatch,
} from "./models";


export * from "./models";

/**
 * Client options used to configure SIP Client API requests.
 */
export interface SipRoutingClientOptions extends PipelineOptions {}

/**
 * Checks whether the type of a value is SipClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSipClientOptions = (options: any): options is SipRoutingClientOptions =>
  !!options && !isKeyCredential(options);


export class SipRoutingClient {
  private readonly api: SIPRoutingService;

  /**
   * Initializes a new instance of the SipClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: SipRoutingClientOptions);

  /**
   * Initializes a new instance of the SipClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: SipRoutingClientOptions);

  /**
   * Initializes a new instance of the SipClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: SipRoutingClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | SipRoutingClientOptions,
    maybeOptions: SipRoutingClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isSipClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
    const libInfo = `azsdk-js-communication-sip/${SDK_VERSION}`;

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
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.api = new SIPRoutingService(url, pipeline);
  }

  /**
   * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
   */
  public async getSipConfiguration(
    options: SipConfigurationOptions = {}
  ): Promise<GetSipConfigurationResponse> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetSipConfiguration", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      return await this.api.getSipConfiguration(reqOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the the SIP routing configuration.
   * @param request The updated properties which will be applied to the SIP routing configuration.
   * @param options The options parameters.
   */
  public async updateSipConfiguration(
    request: SipConfigurationPatch = {},
    options: OperationOptions = {}
  ): Promise<PatchSipConfigurationResponse> {        
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-UpdateSipConfiguration", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);      
      const payload = {
        ...reqOptions,
        body: request
      };

      const response = await this.api.patchSipConfiguration(payload);
      return response;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

export interface SipConfigurationOptions extends OperationOptions
{ }
