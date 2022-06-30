// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { SipConfigurationPatch } from "./generated/src/siprouting/models";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient";
import { TrunkStatusClient as TrunkStatusGeneratedClient } from "./generated/src/trunkstatus/trunkStatusClient";
import { mapTrunks, mapTrunksToRestModel } from "./mappers";
import {
  SipTrunk,
  SipTrunkRoute,
  GetTrunkStatusOptions,
  GetTrunksStatusOptions,
  TrunkOverallStatus,
  TrunkStatus,
  TrunksStatus,
  TrunkStatusPing,
  TrunkStatusTls,
} from "./models";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { createPhoneNumbersPagingPolicy } from "./utils/customPipelinePolicies";

export * from "./models";

/**
 * Client options used to configure the SipRoutingClient API requests.
 */
export interface SipRoutingClientOptions extends CommonClientOptions {}

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
   * A reference to the auto-generated TrunkStatus HTTP client.
   */
  private readonly trunkStatusClient: TrunkStatusGeneratedClient;

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

    this.trunkStatusClient = new TrunkStatusGeneratedClient(url, {
      endpoint: url,
      ...internalPipelineOptions,
    });

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
    this.trunkStatusClient.pipeline.addPolicy(authPolicy);

    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const phoneNumbersPagingPolicy = createPhoneNumbersPagingPolicy(url);
    this.client.pipeline.addPolicy(phoneNumbersPagingPolicy);
    this.trunkStatusClient.pipeline.addPolicy(phoneNumbersPagingPolicy);
  }

  /**
   * Gets the SIP trunks.
   * @param options - The options parameters.
   */
  public async getTrunks(options: OperationOptions = {}): Promise<SipTrunk[]> {
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetTrunks", options);

    try {
      return this.client
        .getSipConfiguration(updatedOptions)
        .then((config) => mapTrunks(config.trunks));
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
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetTrunk", options);

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
    const { span, updatedOptions } = createSpan("SipRoutingClient-GetRoutes", options);

    try {
      return this.client.getSipConfiguration(updatedOptions).then((config) => config.routes || []);
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
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetTrunks", options);

    try {
      const patch: SipConfigurationPatch = { trunks: mapTrunksToRestModel(trunks) };
      const setFqdns = trunks.map((trunk) => trunk.fqdn);
      const storedFqdns = await this.client
        .getSipConfiguration(updatedOptions)
        .then((config) => mapTrunks(config.trunks))
        .then((value) => value.map((trunk) => trunk.fqdn));
      storedFqdns.forEach((storedFqdn) => {
        if (!setFqdns.find((value) => value === storedFqdn)) {
          patch.trunks![storedFqdn] = null;
        }
      });

      const payload = {
        ...updatedOptions,
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
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetTrunk", options);

    try {
      const patch: SipConfigurationPatch = {
        trunks: mapTrunksToRestModel([trunk]),
      };
      const payload = {
        ...updatedOptions,
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
    const { span, updatedOptions } = createSpan("SipRoutingClient-SetRoutes", options);

    try {
      const patch: SipConfigurationPatch = {
        routes: routes,
      };
      const payload = {
        ...updatedOptions,
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
    const { span, updatedOptions } = createSpan("SipRoutingClient-DeleteTrunk", options);

    try {
      const trunks: any = {};
      trunks[fqdn] = null;
      const patch: SipConfigurationPatch = {
        trunks: trunks,
      };

      const payload = {
        ...updatedOptions,
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
  public getTrunksStatus(options: GetTrunksStatusOptions = {}): Promise<TrunksStatus> {
    const { span, updatedOptions } = createSpan("SipRoutingClient-getTrunksStatus", options);
    const trunks = this.trunkStatusClient.getTrunksStatus(updatedOptions);
    span.end();
    return trunks as Promise<TrunksStatus>;
  }

  /**
   * Gets status of specified SIP trunk.
   *
   * @param fqdn - Fully qualified domain name of a SIP trunk.
   * @param options - Additional request options.
   */
  public async getTrunkStatus(
    fqdn: string,
    options: GetTrunkStatusOptions = {}
  ): Promise<TrunkStatus> {
    const { span, updatedOptions } = createSpan("SipRoutingClient-getTrunkStatus", options);
    try {
      const ret = await this.trunkStatusClient.getTrunkStatus(fqdn, updatedOptions);
      return {
        fqdn: ret.fqdn,
        tls: ret.tls as TrunkStatusTls,
        ping: ret.ping as TrunkStatusPing,
        trunkOverallStatus: ret.trunkOverallStatus as TrunkOverallStatus,
        lastUpdateTime: new Date(ret.lastUpdateTime),
      };
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
