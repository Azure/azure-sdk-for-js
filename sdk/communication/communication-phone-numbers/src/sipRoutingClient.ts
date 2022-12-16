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
import { SipDomain, SipTrunk, SipTrunkRoute } from "./models";
import { transformFromRestModel, transformIntoRestModel, transformDomainsFromRestModel, transformDomainsIntoRestModel } from "./mappers";
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
   * Gets the SIP domains.
   * @param options - The options parameters.
   */
    public async getDomains(options: OperationOptions = {}): Promise<SipDomain[]> {
      return tracingClient.withSpan("SipRoutingClient-getDomains", options, async (updatedOptions) => {
        const config = await this.client.sipRouting.get(updatedOptions);
        return transformDomainsFromRestModel(config.domains);
      });
    }

    /**
   * Gets the SIP domain.
   * @param domainUri - The domain's uri.
   * @param options - The options parameters.
   */
  public async getDomain(domainUri: string, options: OperationOptions = {}): Promise<SipDomain> {
    return tracingClient.withSpan("SipRoutingClient-getDomain", options, async (updatedOptions) => {
      const domains = await this.getDomains(updatedOptions);
      const domain = domains.find((value: SipDomain) => value.domainUri === domainUri);
      if (domain) {
        return domain;
      }

      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Gets the SIP trunks.
   * @param options - The options parameters.
   */
  public async getTrunks(options: OperationOptions = {}): Promise<SipTrunk[]> {
    return tracingClient.withSpan("SipRoutingClient-getTrunks", options, async (updatedOptions) => {
      const config = await this.client.sipRouting.get(updatedOptions);
      return transformFromRestModel(config.trunks);
    });
  }

  /**
   * Gets the SIP trunk.
   * @param fqdn - The trunk's FQDN.
   * @param options - The options parameters.
   */
  public async getTrunk(fqdn: string, options: OperationOptions = {}): Promise<SipTrunk> {
    return tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
      const trunks = await this.getTrunks(updatedOptions);
      const trunk = trunks.find((value: SipTrunk) => value.fqdn === fqdn);
      if (trunk) {
        return trunk;
      }

      throw { code: "NotFound", message: "Not Found" } as SipRoutingError;
    });
  }

  /**
   * Gets the SIP trunk routes.
   * @param options - The options parameters.
   */
  public async getRoutes(options: OperationOptions = {}): Promise<SipTrunkRoute[]> {
    return tracingClient.withSpan("SipRoutingClient-getRoutes", options, async (updatedOptions) => {
      const config = await this.client.sipRouting.get(updatedOptions);
      return config.routes || [];
    });
  }

  /**
   * Sets the SIP domains.
   * @param domains - The SIP domains to be set.
   * @param options - The options parameters.
   */
   public async setDomains(domains: SipDomain[], options: OperationOptions = {}): Promise<SipDomain[]> {
    return tracingClient.withSpan("SipRoutingClient-setDomains", options, async (updatedOptions) => {
      const patch: SipConfigurationPatch = { domains: transformDomainsIntoRestModel(domains) };
      let config = await this.client.sipRouting.get(updatedOptions);
      const storedDomains = transformDomainsFromRestModel(config.domains).map((domain) => domain.domainUri);
      const setDomains = domains.map((domain) => domain.domainUri);
      storedDomains.forEach((storedDomain) => {
        const shouldDeleteStoredDomain = !setDomains.find((value) => value === storedDomain);
        if (shouldDeleteStoredDomain) {
          patch.domains![storedDomain] = null;
        }
      });

      const isPatchNeeded = Object.keys(patch.domains!).length > 0;
      if (isPatchNeeded) {
        const payload = {
          ...updatedOptions,
          ...patch,
        };
        config = await this.client.sipRouting.patch(payload);
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
      const patch: SipConfigurationPatch = {
        domains: transformDomainsIntoRestModel([domain])
      };
      const payload = {
        ...updatedOptions,
        ...patch,
      };
      const config = await this.client.sipRouting.patch(payload);
      const storedDomains = transformDomainsFromRestModel(config.domains).find(
        (value: SipDomain) => value.domainUri === domain.domainUri
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
      const patch: SipConfigurationPatch = { trunks: transformIntoRestModel(trunks) };
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
        config = await this.client.sipRouting.patch(payload);
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
      const config = await this.client.sipRouting.patch(payload);
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
      const config = await this.client.sipRouting.patch(payload);
      const storedRoutes = config.routes || (await this.getRoutes(updatedOptions));
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
        await this.client.sipRouting.patch(payload);
      }
    );
  }

  /**
   * Deletes the SIP domain.
   * @param domainUri - The domain's rui.
   * @param options - The options parameters.
   */
   public async deleteDomain(domainUri: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SipRoutingClient-deleteDomain",
      options,
      async (updatedOptions) => {
        const domains: any = {};
        domains[domainUri] = null;
        const patch: SipConfigurationPatch = {
          domains: domains,
        };

        const payload = {
          ...updatedOptions,
          ...patch,
        };
        await this.client.sipRouting.patch(payload);
      }
    );
  }
}
