// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase,
  PipelineOptions,
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  SipConfigurationPatch,
  GetSipConfigurationOptionalParams,
} from "./generated/src/siprouting/models";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient";
import { mapTrunks, mapExpandedTrunks, mapTrunksToRestModel } from "./mappers";
import { SipTrunk, SipTrunkExpanded, SipTrunkRoute } from "./models";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";

export * from "./models";

/**
 * Client options used to configure the SipRoutingClient API requests.
 */
export interface SipRoutingClientOptions extends PipelineOptions {}

/**
 * Checks whether the type of a value is SipClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSipClientOptions = (options: any): options is SipRoutingClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services SIP Routing Administration.
 */
export class SipRoutingClient {
  /**
   * A reference to the auto-generated SipRouting HTTP client.
   */
  private readonly client: SipRoutingGeneratedClient;

  /**
   * Initializes a new instance of the SipRoutingClient class using a connection string.
   *
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: SipRoutingClientOptions);

  /**
   * Initializes a new instance of the SipRoutingClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: SipRoutingClientOptions
  );

  /**
   * Initializes a new instance of the SipRoutingClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: SipRoutingClientOptions
  );

  public constructor(
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
          logger: logger.info,
        },
      },
    };

    this.client = new SipRoutingGeneratedClient(url, {
      endpoint: url,
      ...internalPipelineOptions,
    });

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);

    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const phoneNumbersPagingPolicy = createPhoneNumbersPagingPolicy(url);
    this.client.pipeline.addPolicy(phoneNumbersPagingPolicy);
  }

  /**
   * Gets the SIP trunks.
   * @param options - The options parameters.
   */
  public async getTrunks(options: OperationOptions = {}): Promise<SipTrunk[]> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetTrunks", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      return this.client.getSipConfiguration(reqOptions).then((config) => mapTrunks(config.trunks));
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async getTrunk(fqdn: string, options: OperationOptions = {}): Promise<SipTrunk | null> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetTrunk", operationOptions);

    try {
      return this.getTrunks(updatedOptions).then(
        (trunks) => trunks.find((value: SipTrunk) => value.fqdn === fqdn) || null
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the SIP trunk routes.
   * @param options - The options parameters.
   */
  public async getRoutes(options: OperationOptions = {}): Promise<SipTrunkRoute[]> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetRoutes", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      return this.client.getSipConfiguration(reqOptions).then((config) => config.routes || []);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the SIP trunks.
   * @param trunks - The SIP trunks to be set.
   * @param options - The options parameters.
   */
  public async setTrunks(trunks: SipTrunk[], options: OperationOptions = {}): Promise<SipTrunk[]> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetTrunks", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const patch: SipConfigurationPatch = { trunks: mapTrunksToRestModel(trunks) };
      const setFqdns = trunks.map((trunk) => trunk.fqdn);
      const storedFqdns = await this.client
        .getSipConfiguration(reqOptions)
        .then((config) => mapTrunks(config.trunks))
        .then((value) => value.map((trunk) => trunk.fqdn));
      storedFqdns.forEach((storedFqdn) => {
        if (!setFqdns.find((value) => value === storedFqdn)) {
          patch.trunks![storedFqdn] = null;
        }
      });

      const payload = {
        ...reqOptions,
        body: patch,
      };
      return this.client.patchSipConfiguration(payload).then((config) => mapTrunks(config.trunks));
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the SIP trunk.
   * @param trunk - The SIP trunk to be set.
   * @param options - The options parameters.
   */
  public async setTrunk(trunk: SipTrunk, options: OperationOptions = {}): Promise<SipTrunk> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetTrunk", operationOptions);

    try {
      const patch: SipConfigurationPatch = {
        trunks: mapTrunksToRestModel([trunk]),
      };
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const payload = {
        ...reqOptions,
        body: patch,
      };
      return this.client.patchSipConfiguration(payload).then((config) => {
        return (
          mapTrunks(config.trunks).find((value: SipTrunk) => value.fqdn === trunk.fqdn) || trunk
        );
      });
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the SIP trunk routes.
   * @param routes - The SIP trunk routes to be set.
   * @param options - The options parameters.
   */
  public async setRoutes(
    routes: SipTrunkRoute[],
    options: OperationOptions = {}
  ): Promise<SipTrunkRoute[]> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetRoutes", operationOptions);

    try {
      const patch: SipConfigurationPatch = {
        routes: routes,
      };
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const payload = {
        ...reqOptions,
        body: patch,
      };
      return this.client.patchSipConfiguration(payload).then((config) => config.routes || []);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async deleteTrunk(fqdn: string, options: OperationOptions = {}): Promise<void> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipRoutingClient-DeleteTrunk", operationOptions);

    try {
      const trunks: any = {};
      trunks[fqdn] = null;
      const patch: SipConfigurationPatch = {
        trunks: trunks,
      };

      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const payload = {
        ...reqOptions,
        body: patch,
      };
      return this.client.patchSipConfiguration(payload).then(() => {});
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns list of the statuses of configured SIP trunks.
   *
   * Status of all configured SIP trunks.
   *
   * @param options - The optional parameters.
   */
  public getExpandedTrunks(options: OperationOptions = {}): Promise<SipTrunkExpanded[]> {
    const { span, updatedOptions } = createSpan("SipRoutingClient-getTrunksStatuses", options);
    const expandedOptions: GetSipConfigurationOptionalParams = {
      ...updatedOptions,
      expand: "trunkHealth",
    };
    try {
      return this.client
        .getSipConfiguration(expandedOptions)
        .then((config) => mapExpandedTrunks(config.trunks));
    } catch (e: any) {
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
