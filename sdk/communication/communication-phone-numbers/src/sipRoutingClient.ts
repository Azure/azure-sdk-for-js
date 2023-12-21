// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient";
import {
  SipConfigurationUpdate,
  SipRoutingError,
  SipRoutingGetOptionalParams,
} from "./generated/src/siprouting/models";
import {
  GetSipTrunkOptions,
  ListSipRoutesOptions,
  ListSipTrunksOptions,
  ListSipDomainsOptions,
  SipDomain,
  SipTrunk,
  SipTrunkRoute,
  SipRoutingTestRoutesWithNumberOperationParams,
} from "./models";
import {
  transformFromRestModel,
  transformIntoRestModel,
  transformDomainsFromRestModel,
  transformDomainsIntoRestModel,
} from "./mappers";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export * from "./models";

/**
 * Client options used to configure the SipRoutingClient API requests.
 */
export interface SipRoutingClientOptions extends CommonClientOptions {}
const getErrorTargetField = (error: any): string => {
  const errorCodeToFieldName: Record<SipRoutingError["code"], string> = {
    InvalidRouteName: "name",
    InvalidRouteNumberPattern: "numberPattern",
    RouteWithDuplicatedTrunk: "trunks",
    InvalidRouteTrunk: "trunks",
    MissingTrunk: "trunks",
    InvalidTrunkSipSignalingPort: "port",
    DuplicatedRoute: "routes",
    InvalidTrunkFqdn: "fqdn",
    InvalidDomain: "fqdn",
  };
  if (error && error.details && error.details.error && error.details.error.innerError) {
    return errorCodeToFieldName[error.details.error.innerError.code];
  } else {
    return "unknown";
  }
};

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
  public async getTrunk(fqdn: string, options: GetSipTrunkOptions = {}): Promise<SipTrunk> {
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
   * Gets the SIP domains.
   * @param options - The options parameters.
   */
  public listDomains(options: ListSipDomainsOptions = {}): PagedAsyncIterableIterator<SipDomain> {
    const iter = this.listDomainsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listDomainsPagingPage(options);
      },
    };
  }

  /**
   * Gets the SIP domain.
   * @param domainName - The domain's name (ex: contoso.com).
   * @param options - The options parameters.
   */
  public async getDomain(domainName: string, options: OperationOptions = {}): Promise<SipDomain> {
    return tracingClient.withSpan(
      "SipRoutingClient-listDomains",
      options,
      async (updatedOptions) => {
        const domains = await this.getDomainsInternal(updatedOptions);
        const domain = domains.find((value: SipDomain) => value.domainName === domainName);
        if (domain) {
          return domain;
        }

        throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
      },
    );
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
   * Sets the SIP domains.
   * @param domains - The SIP domains to be set.
   * @param options - The options parameters.
   */
  public async setDomains(
    domains: SipDomain[],
    options: OperationOptions = {},
  ): Promise<SipDomain[]> {
    return tracingClient.withSpan(
      "SipRoutingClient-setDomains",
      options,
      async (updatedOptions) => {
        const update: SipConfigurationUpdate = { domains: transformDomainsIntoRestModel(domains) };
        let config = await this.client.sipRouting.get(updatedOptions);
        const storedDomains = transformDomainsFromRestModel(config.domains).map(
          (domain) => domain.domainName,
        );
        const setDomains = domains.map((domain) => domain.domainName);
        storedDomains.forEach((storedDomain) => {
          const shouldDeleteStoredDomain = !setDomains.find((value) => value === storedDomain);
          if (shouldDeleteStoredDomain) {
            update.domains![storedDomain] = null;
          }
        });

        const isPatchNeeded = Object.keys(update.domains!).length > 0;
        if (isPatchNeeded) {
          const payload = {
            ...updatedOptions,
            ...update,
          };
          config = await this.client.sipRouting.update(payload);
        }

        return transformDomainsFromRestModel(config.domains);
      },
    );
  }

  /**
   * Sets the SIP domain.
   * @param domain - The SIP domain to be set.
   * @param options - The options parameters.
   */
  public async setDomain(domain: SipDomain, options: OperationOptions = {}): Promise<SipDomain> {
    return tracingClient.withSpan("SipRoutingClient-setDomain", options, async (updatedOptions) => {
      const update: SipConfigurationUpdate = {
        domains: transformDomainsIntoRestModel([domain]),
      };
      const payload = {
        ...updatedOptions,
        ...update,
      };
      const config = await this.client.sipRouting.update(payload);
      const storedDomains = transformDomainsFromRestModel(config.domains).find(
        (value: SipDomain) => value.domainName === domain.domainName,
      );
      if (storedDomains) {
        return storedDomains;
      }

      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Sets the SIP trunks.
   * @param trunks - The SIP trunks to be set.
   * @param options - The options parameters.
   */
  public async setTrunks(trunks: SipTrunk[], options: OperationOptions = {}): Promise<SipTrunk[]> {
    return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
      const update: SipConfigurationUpdate = { trunks: transformIntoRestModel(trunks) };
      let config = await this.client.sipRouting.get(updatedOptions);
      const storedFqdns = transformFromRestModel(config.trunks).map((trunk) => trunk.fqdn);
      const setFqdns = trunks.map((trunk) => trunk.fqdn);
      storedFqdns.forEach((storedFqdn) => {
        const shouldDeleteStoredTrunk = !setFqdns.find((value) => value === storedFqdn);
        if (shouldDeleteStoredTrunk) {
          update.trunks![storedFqdn] = null;
        }
      });

      const isPatchNeeded = Object.keys(update.trunks!).length > 0;
      if (isPatchNeeded) {
        const payload = {
          ...updatedOptions,
          ...update,
        };
        try {
          config = await this.client.sipRouting.update(payload);
        } catch (error: any) {
          if (error.code === "UnprocessableConfiguration") {
            throw Object.assign(error as SipRoutingError, { target: getErrorTargetField(error) });
          } else {
            throw error;
          }
        }
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
      const update: SipConfigurationUpdate = {
        trunks: transformIntoRestModel([trunk]),
      };
      const payload = {
        ...updatedOptions,
        ...update,
      };

      try {
        const config = await this.client.sipRouting.update(payload);
        const storedTrunk = transformFromRestModel(config.trunks).find(
            (value: SipTrunk) => value.fqdn === trunk.fqdn,
        );

        if (storedTrunk) {
          return storedTrunk;
        }
      } catch (error: any) {
        if (error.code === "UnprocessableConfiguration") {
          throw Object.assign(error as SipRoutingError, { target: getErrorTargetField(error) });
        } else {
          throw error;
        }
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
      const update: SipConfigurationUpdate = {
        routes: routes,
      };
      const payload = {
        ...updatedOptions,
        ...update,
      };

      try {
        const config = await this.client.sipRouting.update(payload);
        const storedRoutes = config.routes || (await this.getRoutesInternal(updatedOptions));

        return storedRoutes;
      } catch (error: any) {
        if (error.code === "UnprocessableConfiguration") {
          throw Object.assign(error as SipRoutingError, { target: getErrorTargetField(error) });
        } else {
          throw error;
        }
      }
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
        const update: SipConfigurationUpdate = {
          trunks: trunks,
        };

        const payload = {
          ...updatedOptions,
          ...update,
        };
        await this.client.sipRouting.update(payload);
      },
    );
  }

  /**
   * Deletes the SIP domain.
   * @param domainName - The domain's name (ex: contoso.com).
   * @param options - The options parameters.
   */
  public async deleteDomain(domainName: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SipRoutingClient-deleteDomain",
      options,
      async (updatedOptions) => {
        const domains: any = {};
        domains[domainName] = null;
        const update: SipConfigurationUpdate = {
          domains: domains,
        };

        const payload = {
          ...updatedOptions,
          ...update,
        };
        await this.client.sipRouting.update(payload);
      },
    );
  }

  public async matchNumberToRoutes(
    phoneNumber: string,
    options: SipRoutingTestRoutesWithNumberOperationParams,
  ): Promise<SipTrunkRoute[]> {
    const config = await this.client.sipRouting.get(options);
    const apiResult = await this.client.sipRouting.testRoutesWithNumber(phoneNumber, config);

    return apiResult.matchingRoutes ?? [];
  }

  private async getRoutesInternal(options: OperationOptions): Promise<SipTrunkRoute[]> {
    const config = await this.client.sipRouting.get(options);
    return config.routes || [];
  }

  private async getTrunksInternal(options: GetSipTrunkOptions): Promise<SipTrunk[]> {
    const { includeHealth, ...requestOptions } = options;
    let updatedOptions = requestOptions;

    if (includeHealth) {
      updatedOptions = {
        ...requestOptions,
        expand: "trunks/health",
      } as SipRoutingGetOptionalParams;
    }

    const config = await this.client.sipRouting.get(updatedOptions);
    return transformFromRestModel(config.trunks);
  }

  private async getDomainsInternal(options: OperationOptions = {}): Promise<SipDomain[]> {
    const config = await this.client.sipRouting.get(options);
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

  private async *listDomainsPagingAll(
    options?: ListSipDomainsOptions,
  ): AsyncIterableIterator<SipDomain> {
    for await (const page of this.listDomainsPagingPage(options)) {
      yield* page;
    }
  }

  private async *listTrunksPagingPage(
    options: ListSipTrunksOptions = {},
  ): AsyncIterableIterator<SipTrunk[]> {
    const apiResult = await this.getTrunksInternal(options as GetSipTrunkOptions);
    yield apiResult;
  }

  private async *listDomainsPagingPage(
    options: ListSipDomainsOptions = {},
  ): AsyncIterableIterator<SipDomain[]> {
    const apiResult = await this.getDomainsInternal(options as OperationOptions);
    yield apiResult;
  }

  private async *listRoutesPagingPage(
    options: ListSipRoutesOptions = {},
  ): AsyncIterableIterator<SipTrunkRoute[]> {
    const apiResult = await this.getRoutesInternal(options as OperationOptions);
    yield apiResult;
  }
}
