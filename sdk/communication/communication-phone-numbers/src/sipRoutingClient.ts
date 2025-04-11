// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { logger } from "./utils/index.js";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient.js";
import type {
  SipConfigurationUpdate,
  SipRoutingError,
} from "./generated/src/siprouting/models/index.js";
import type {
  GetSipTrunksOptions,
  GetSipDomainsOptions,
  ListSipDomainsOptions,
  ListSipRoutesOptions,
  ListSipTrunksOptions,
  SipTrunk,
  SipTrunkRoute,
  SipDomain,
  TestRoutesWithNumberResult,
} from "./models.js";
import {
  transformFromRestModel,
  transformDomainsFromRestModel,
  transformIntoRestModel,
  transformDomainsIntoRestModel,
} from "./mappers.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { tracingClient } from "./generated/src/tracing.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

export * from "./models.js";

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
    options?: SipRoutingClientOptions,
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
    options?: SipRoutingClientOptions,
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | SipRoutingClientOptions,
    maybeOptions: SipRoutingClientOptions = {},
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public listTrunks(options: ListSipTrunksOptions = {}): PagedAsyncIterableIterator<SipTrunk> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "SipRoutingClient-listTrunks",
      options,
    );

    try {
      const iter = this.listTrunksPagingAll({ ...updatedOptions });
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.listTrunksPagingPage({ ...updatedOptions });
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Lists the SIP domains.
   * @param options - The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public listDomains(options: ListSipDomainsOptions = {}): PagedAsyncIterableIterator<SipDomain> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "SipRoutingClient-listDomains",
      options,
    );

    try {
      const iter = this.listDomainsPagingAll({ ...updatedOptions });
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.listDomainsPagingPage({ ...updatedOptions });
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async getTrunk(fqdn: string, options: GetSipTrunksOptions = {}): Promise<SipTrunk> {
    return tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
      const trunks = await this.getTrunksInternal(updatedOptions);
      const trunk = trunks.find((value: SipTrunk) => value.fqdn === fqdn);
      if (trunk) {
        return trunk;
      }
      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Gets the SIP domain.
   * @param fqdn - The domain's FQDN.
   * @param options - The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async getDomain(fqdn: string, options: GetSipDomainsOptions = {}): Promise<SipDomain> {
    return tracingClient.withSpan("SipRoutingClient-getDomain", options, async (updatedOptions) => {
      const domains = await this.getDomainsInternal(updatedOptions);
      const domain = domains.find((value: SipDomain) => value.fqdn === fqdn);
      if (domain) {
        return domain;
      }
      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Lists the SIP trunk routes.
   * @param options - The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public listRoutes(options: ListSipRoutesOptions = {}): PagedAsyncIterableIterator<SipTrunkRoute> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "SipRoutingClient-listRoutes",
      options,
    );

    try {
      const iter = this.listRoutesPagingAll({ ...updatedOptions });
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.listRoutesPagingPage({ ...updatedOptions });
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
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
    return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
      const patch: SipConfigurationUpdate = { trunks: transformIntoRestModel(trunks) };
      let config = await this.client.sipRouting.get(updatedOptions);
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
        config = await this.client.sipRouting.update(payload);
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
      const patch: SipConfigurationUpdate = {
        trunks: transformIntoRestModel([trunk]),
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.sipRouting.update(payload);
      const storedTrunk = transformFromRestModel(config.trunks).find(
        (value: SipTrunk) => value.fqdn === trunk.fqdn,
      );
      if (storedTrunk) {
        return storedTrunk;
      }

      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Sets the SIP domains.
   * @param domains - The SIP domains to be set.
   * @param options - The options parameters.
   */
  public async setDomains(
    domains: SipDomain[],
    options: OperationOptions = {},
  ): Promise<SipDomain[]> {
    return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
      const patch: SipConfigurationUpdate = { domains: transformDomainsIntoRestModel(domains) };
      let config = await this.client.sipRouting.get(updatedOptions);
      const storedFqdns = transformDomainsFromRestModel(config.domains).map(
        (domain) => domain.fqdn,
      );
      const setFqdns = domains.map((domain) => domain.fqdn);
      storedFqdns.forEach((storedFqdn) => {
        const shouldDeleteStoredTrunk = !setFqdns.find((value) => value === storedFqdn);
        if (shouldDeleteStoredTrunk) {
          patch.domains![storedFqdn] = null;
        }
      });

      const isPatchNeeded = Object.keys(patch.domains!).length > 0;
      if (isPatchNeeded) {
        const payload = {
          ...updatedOptions,
          ...patch,
        };
        config = await this.client.sipRouting.update(payload);
      }

      return transformDomainsFromRestModel(config.domains);
    });
  }

  /**
   * Sets the SIP domain.
   * @param domain - The SIP domain to be set.
   * @param options - The options parameters.
   */
  public async setDomain(domain: SipDomain, options: OperationOptions = {}): Promise<SipDomain> {
    return tracingClient.withSpan("SipRoutingClient-setDomain", options, async (updatedOptions) => {
      const patch: SipConfigurationUpdate = {
        domains: transformDomainsIntoRestModel([domain]),
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.sipRouting.update(payload);
      const storedDomain = transformDomainsFromRestModel(config.domains).find(
        (value: SipDomain) => value.fqdn === domain.fqdn,
      );
      if (storedDomain) {
        return storedDomain;
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
    options: OperationOptions = {},
  ): Promise<SipTrunkRoute[]> {
    return tracingClient.withSpan("SipRoutingClient-setRoutes", options, async (updatedOptions) => {
      const patch: SipConfigurationUpdate = {
        routes: routes,
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.sipRouting.update(payload);
      const storedRoutes = config.routes || (await this.getRoutesInternal(updatedOptions));
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
        const patch: SipConfigurationUpdate = {
          trunks: trunks,
        };

        const payload = {
          ...updatedOptions,
          ...patch,
        };
        await this.client.sipRouting.update(payload);
      },
    );
  }

  /**
   * Deletes the SIP domain.
   * @param fqdn - The domain's FQDN.
   * @param options - The options parameters.
   */
  public async deleteDomain(fqdn: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SipRoutingClient-deleteDomain",
      options,
      async (updatedOptions) => {
        const domains: any = {};
        domains[fqdn] = null;
        const patch: SipConfigurationUpdate = {
          domains: domains,
        };

        const payload = {
          ...updatedOptions,
          ...patch,
        };
        await this.client.sipRouting.update(payload);
      },
    );
  }

  /**
   * Test routes with number.
   * @param targetPhoneNumber - target phone number to test routes.
   * @param routes - sip trunk routes.
   * @param options - The options parameters for routes.
   */
  public async testRoutesWithNumber(
    targetPhoneNumber: string,
    routes: SipTrunkRoute[],
    options: OperationOptions = {},
  ): Promise<TestRoutesWithNumberResult> {
    return tracingClient.withSpan(
      "SipRoutingClient-testRoutesWithNumber",
      options,
      async (updatedOptions) => {
        return this.testRoutesWithNumberInternal(targetPhoneNumber, routes, updatedOptions);
      },
    );
  }

  private async testRoutesWithNumberInternal(
    targetPhoneNumber: string,
    routes: SipTrunkRoute[],
    options?: OperationOptions,
  ): Promise<TestRoutesWithNumberResult> {
    const optionalParams = {
      routes: routes,
      ...options,
    };
    const response = await this.client.sipRouting.testRoutesWithNumber(
      targetPhoneNumber,
      optionalParams,
    );

    return { matchingRoutes: response.matchingRoutes };
  }

  private async getRoutesInternal(options: OperationOptions): Promise<SipTrunkRoute[]> {
    const config = await this.client.sipRouting.get(options);
    return config.routes || [];
  }

  private async getTrunksInternal(options: ListSipTrunksOptions): Promise<SipTrunk[]> {
    const optionalParams = {
      expand: options.includeHealth ? "trunks/health" : undefined,
      ...options,
    };
    const config = await this.client.sipRouting.get(optionalParams);
    return transformFromRestModel(config.trunks);
  }

  private async getDomainsInternal(options: ListSipDomainsOptions): Promise<SipDomain[]> {
    const optionalParams = {
      ...options,
    };
    const config = await this.client.sipRouting.get(optionalParams);
    return transformDomainsFromRestModel(config.domains);
  }

  private async *listRoutesPagingAll(
    options?: ListSipRoutesOptions,
  ): AsyncIterableIterator<SipTrunkRoute> {
    for await (const page of this.listRoutesPagingPage(options)) {
      yield* page;
    }
  }

  private async *listTrunksPagingAll(
    options?: ListSipTrunksOptions,
  ): AsyncIterableIterator<SipTrunk> {
    for await (const page of this.listTrunksPagingPage(options)) {
      yield* page;
    }
  }

  private async *listTrunksPagingPage(
    options: ListSipTrunksOptions = {},
  ): AsyncIterableIterator<SipTrunk[]> {
    const apiResult = await this.getTrunksInternal(options);
    yield apiResult;
  }

  private async *listDomainsPagingAll(
    options?: ListSipDomainsOptions,
  ): AsyncIterableIterator<SipDomain> {
    for await (const page of this.listDomainsPagingPage(options)) {
      yield* page;
    }
  }

  private async *listDomainsPagingPage(
    options: ListSipDomainsOptions = {},
  ): AsyncIterableIterator<SipDomain[]> {
    const apiResult = await this.getDomainsInternal(options);
    yield apiResult;
  }

  private async *listRoutesPagingPage(
    options: ListSipRoutesOptions = {},
  ): AsyncIterableIterator<SipTrunkRoute[]> {
    const apiResult = await this.getRoutesInternal(options as OperationOptions);
    yield apiResult;
  }
}
