// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { logger } from "./utils";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient";
import { CommunicationError, SipConfigurationPatch } from "./generated/src/siprouting/models";
import { SipTrunk, SipTrunkRoute } from "./models";
import { mapTrunks, mapTrunksToRestModel } from "./mappers";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { tracingClient } from "./generated/src/tracing";

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
  options && !isKeyCredential(options) && !isTokenCredential(options);

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
  }

  /**
   * Lists the SIP trunks.
   * @param options - The options parameters.
   */
  public async listTrunks(options: OperationOptions = {}): Promise<SipTrunk[]> {
    return tracingClient.withSpan(
      "SipRoutingClient-listTrunks",
      options,
      async (updatedOptions) => {
        const config = await this.client.getSipConfiguration(updatedOptions);
        return mapTrunks(config.trunks);
      }
    );
  }

  /**
   * Gets the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async getTrunk(fqdn: string, options: OperationOptions = {}): Promise<SipTrunk> {
    return tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
      const trunks = await this.listTrunks(updatedOptions);
      const trunk = trunks.find((value: SipTrunk) => value.fqdn === fqdn);
      if (trunk) {
        return Promise.resolve(trunk);
      }

      throw { code: "NotFound", message: "Not Found" } as CommunicationError;
    });
  }

  /**
   * Lists the SIP trunk routes.
   * @param options - The options parameters.
   */
  public async listRoutes(options: OperationOptions = {}): Promise<SipTrunkRoute[]> {
    return tracingClient.withSpan(
      "SipRoutingClient-listRoutes",
      options,
      async (updatedOptions) => {
        const config = await this.client.getSipConfiguration(updatedOptions);
        return config.routes || [];
      }
    );
  }

  /**
   * Sets the SIP trunks.
   * @param trunks - The SIP trunks to be set.
   * @param options - The options parameters.
   */
  public async setTrunks(trunks: SipTrunk[], options: OperationOptions = {}): Promise<SipTrunk[]> {
    return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
      const patch: SipConfigurationPatch = { trunks: mapTrunksToRestModel(trunks) };
      let config = await this.client.getSipConfiguration(updatedOptions);
      const storedFqdns = mapTrunks(config.trunks).map((trunk) => trunk.fqdn);
      const setFqdns = trunks.map((trunk) => trunk.fqdn);
      storedFqdns.forEach((storedFqdn) => {
        const shouldDeleteStoredTrunk = !setFqdns.find((value) => value === storedFqdn);
        if (shouldDeleteStoredTrunk) {
          patch.trunks![storedFqdn] = null;
        }
      });

      const isPatchNeeded = Object.keys(patch.trunks!).length > 0;
      if (isPatchNeeded) {
        const payload = {
          ...updatedOptions,
          ...patch,
        };
        config = await this.client.patchSipConfiguration(payload);
      }

      return mapTrunks(config.trunks);
    });
  }

  /**
   * Sets the SIP trunk.
   * @param trunk - The SIP trunk to be set.
   * @param options - The options parameters.
   */
  public async setTrunk(trunk: SipTrunk, options: OperationOptions = {}): Promise<SipTrunk> {
    return tracingClient.withSpan("SipRoutingClient-setTrunk", options, async (updatedOptions) => {
      const patch: SipConfigurationPatch = {
        trunks: mapTrunksToRestModel([trunk]),
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.patchSipConfiguration(payload);
      const storedTrunk = mapTrunks(config.trunks).find(
        (value: SipTrunk) => value.fqdn === trunk.fqdn
      );
      if (storedTrunk) {
        return Promise.resolve(storedTrunk);
      }

      throw { code: "NotFound", message: "Not Found" } as CommunicationError;
    });
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
    return tracingClient.withSpan("SipRoutingClient-setRoutes", options, async (updatedOptions) => {
      const patch: SipConfigurationPatch = {
        routes: routes,
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.patchSipConfiguration(payload);
      const storedRoutes = config.routes || (await this.listRoutes(updatedOptions));
      return storedRoutes;
    });
  }

  /**
   * Deletes the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async deleteTrunk(fqdn: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SipRoutingClient-deleteTrunk",
      options,
      async (updatedOptions) => {
        const trunks: any = {};
        trunks[fqdn] = null;
        const patch: SipConfigurationPatch = {
          trunks: trunks,
        };

        const payload = {
          ...updatedOptions,
          ...patch,
        };
        await this.client.patchSipConfiguration(payload);
      }
    );
  }
}
