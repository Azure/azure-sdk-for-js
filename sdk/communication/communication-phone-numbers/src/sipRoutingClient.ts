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
import { SipConfigurationPatch, SipRoutingError } from "./generated/src/siprouting/models";
import { ListSipRoutesOptions, ListSipTrunksOptions, SipTrunk, SipTrunkRoute } from "./models";
import { transformFromRestModel, transformIntoRestModel } from "./mappers";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { tracingClient } from "./generated/src/tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

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
   * Gets the SIP trunks.
   * @param options - The options parameters.
   */
  public listTrunks(options: ListSipTrunksOptions = {}): PagedAsyncIterableIterator<SipTrunk> {
    const iter = this.listTrunksPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listTrunksPagingPage(options);
      },
    };
  }

  /**
   * Gets the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async getTrunk(fqdn: string, options: OperationOptions = {}): Promise<SipTrunk> {
    return tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
      for await(const trunk of this.listTrunks(updatedOptions))
      {
        if(trunk.fqdn === fqdn)
        {
          return trunk;
        }
      }
      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Lists the SIP trunk routes.
   * @param options - The options parameters.
   */
  public listRoutes(options: ListSipRoutesOptions = {}): PagedAsyncIterableIterator<SipTrunkRoute> {
    const iter = this.listRoutesPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listRoutesPagingPage(options);
      },
    };
  }

  /**
   * Sets the SIP trunks.
   * @param trunks - The SIP trunks to be set.
   * @param options - The options parameters.
   */
  public async setTrunks(trunks: SipTrunk[], options: OperationOptions = {}): Promise<SipTrunk[]> {
    return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
      const patch: SipConfigurationPatch = { trunks: transformIntoRestModel(trunks) };
      let config = await this.client.getSipConfiguration(updatedOptions);
      const storedFqdns = transformFromRestModel(config.trunks).map((trunk) => trunk.fqdn);
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

      return transformFromRestModel(config.trunks);
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
        trunks: transformIntoRestModel([trunk]),
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.patchSipConfiguration(payload);
      const storedTrunk = transformFromRestModel(config.trunks).find(
        (value: SipTrunk) => value.fqdn === trunk.fqdn
      );
      if (storedTrunk) {
        return storedTrunk;
      }

      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
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
      let storedRoutes = config.routes;

      if(!storedRoutes)
      {
        storedRoutes = [];
        for await(const route of this.listRoutes(updatedOptions))
        {
          storedRoutes.push(route);
        }
      }
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

  private async getRoutesInternal(options: OperationOptions) {
    return await tracingClient.withSpan(
      "SipRoutingClient-getRoutes",
      options,
      async (updatedOptions) => {
        const config = await this.client.getSipConfiguration(updatedOptions);
        return config.routes || [];
      }
    );
  }

  private async getTrunksInternal(options: OperationOptions) {
    return tracingClient.withSpan("SipRoutingClient-getTrunks", options, async (updatedOptions) => {
      const config = await this.client.getSipConfiguration(updatedOptions);
      return transformFromRestModel(config.trunks);
    });
  }

  private async *listRoutesPagingAll(
    options?: ListSipRoutesOptions
  ): AsyncIterableIterator<SipTrunkRoute> {
    for await (const page of this.listRoutesPagingPage(options)) {
      yield* page;
    }
  }

  private async *listTrunksPagingAll(
    options?: ListSipTrunksOptions
  ): AsyncIterableIterator<SipTrunk> {
    for await (const page of this.listTrunksPagingPage(options)) {
      yield* page;
    }
  }

  private async *listTrunksPagingPage(
    options: ListSipTrunksOptions = {}
  ): AsyncIterableIterator<SipTrunk[]> {
    let apiResult = await this.getTrunksInternal(options as OperationOptions);

    // const pageSize = options.maxPageSize ?? 100;
    // const offset = options.skip ?? 0;
    const pageSize = 256;
    const offset = 0;

    if (offset > apiResult.length) {
        yield [];
    }

    const pageCount = Math.ceil((apiResult.length - offset) / pageSize);

    for (let j = 0; j < pageCount; j++) {
      let page = [];
      for (let k = offset + j * pageSize; k < apiResult.length; k++) {
        page.push(apiResult[k]);
      }
      yield page;
    }
  }

  private async *listRoutesPagingPage(
    options: ListSipRoutesOptions = {}
  ): AsyncIterableIterator<SipTrunkRoute[]> {
    let apiResult = await this.getRoutesInternal(options as OperationOptions);

    // const pageSize = options.maxPageSize ?? 100;
    // const offset = options.skip ?? 0;
    const pageSize = 256;
    const offset = 0;

    if (offset > apiResult.length) {
      yield [];
    }

    const pageCount = Math.ceil((apiResult.length - offset) / pageSize);

    for (let j = 0; j < pageCount; j++) {
      let page = [];
      for (let k = offset + j * pageSize; k <= apiResult.length; k++) {
        page.push(apiResult[k]);
      }
      yield page;
    }
  }
}
