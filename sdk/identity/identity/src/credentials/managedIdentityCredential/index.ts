// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { IdentityClient } from "../../client/identityClient";
import { TokenCredentialOptions } from "../../tokenCredentialOptions";
import { AuthenticationError, CredentialUnavailableError } from "../../errors";
import { credentialLogger, formatSuccess, formatError } from "../../util/logging";
import { appServiceMsi2017 } from "./appServiceMsi2017";
import { tracingClient } from "../../util/tracing";
import { cloudShellMsi } from "./cloudShellMsi";
import { imdsMsi } from "./imdsMsi";
import { MSI } from "./models";
import { arcMsi } from "./arcMsi";
import { tokenExchangeMsi } from "./tokenExchangeMsi";
import { fabricMsi } from "./fabricMsi";
import { appServiceMsi2019 } from "./appServiceMsi2019";

const logger = credentialLogger("ManagedIdentityCredential");

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * This variation supports `clientId` and not `resourceId`, since only one of both is supported.
 */
export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
  /**
   * The client ID of the user - assigned identity, or app registration(when working with AKS pod - identity).
   */
  clientId?: string;
}

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * This variation supports `resourceId` and not `clientId`, since only one of both is supported.
 */
export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a custom resource Id.
   * In scenarios such as when user assigned identities are created using an ARM template,
   * where the resource Id of the identity is known but the client Id can't be known ahead of time,
   * this parameter allows programs to use these user assigned identities
   * without having to first determine the client Id of the created identity.
   */
  resourceId: string;
}

/**
 * Attempts authentication using a managed identity available at the deployment environment.
 * This authentication type works in Azure VMs, App Service instances, Azure Functions applications,
 * Azure Kubernetes Services, Azure Service Fabric instances and inside of the Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private clientId: string | undefined;
  private resourceId: string | undefined;
  private isEndpointUnavailable: boolean | null = null;
  private isAvailableIdentityClient: IdentityClient;

  /**
   * Creates an instance of ManagedIdentityCredential with the client ID of a
   * user-assigned identity, or app registration (when working with AKS pod-identity).
   *
   * @param clientId - The client ID of the user-assigned identity, or app registration (when working with AKS pod-identity).
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(clientId: string, options?: TokenCredentialOptions);
  /**
   * Creates an instance of ManagedIdentityCredential with clientId
   *
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(options?: ManagedIdentityCredentialClientIdOptions);
  /**
   * Creates an instance of ManagedIdentityCredential with Resource Id
   *
   * @param options - Options for configuring the resource which makes the access token request.
   */
  constructor(options?: ManagedIdentityCredentialResourceIdOptions);
  /**
   * @internal
   * @hidden
   */
  constructor(
    clientIdOrOptions?:
      | string
      | ManagedIdentityCredentialClientIdOptions
      | ManagedIdentityCredentialResourceIdOptions,
    options?: TokenCredentialOptions
  ) {
    let _options: TokenCredentialOptions | undefined;
    if (typeof clientIdOrOptions === "string") {
      this.clientId = clientIdOrOptions;
      _options = options;
    } else {
      this.clientId = (clientIdOrOptions as ManagedIdentityCredentialClientIdOptions)?.clientId;
      _options = clientIdOrOptions;
    }
    this.resourceId = (_options as ManagedIdentityCredentialResourceIdOptions)?.resourceId;
    // For JavaScript users.
    if (this.clientId && this.resourceId) {
      throw new Error(
        `${ManagedIdentityCredential.name} - Client Id and Resource Id can't be provided at the same time.`
      );
    }
    this.identityClient = new IdentityClient(_options);
    this.isAvailableIdentityClient = new IdentityClient({
      ..._options,
      retryOptions: {
        maxRetries: 0,
      },
    });
  }

  private cachedMSI: MSI | undefined;

  private async cachedAvailableMSI(
    scopes: string | string[],
    getTokenOptions?: GetTokenOptions
  ): Promise<MSI> {
    if (this.cachedMSI) {
      return this.cachedMSI;
    }

    const MSIs = [
      arcMsi,
      fabricMsi,
      appServiceMsi2019,
      appServiceMsi2017,
      cloudShellMsi,
      tokenExchangeMsi(),
      imdsMsi,
    ];

    for (const msi of MSIs) {
      if (
        await msi.isAvailable({
          scopes,
          identityClient: this.isAvailableIdentityClient,
          clientId: this.clientId,
          resourceId: this.resourceId,
          getTokenOptions,
        })
      ) {
        this.cachedMSI = msi;
        return msi;
      }
    }

    throw new CredentialUnavailableError(
      `${ManagedIdentityCredential.name} - No MSI credential available`
    );
  }

  private async authenticateManagedIdentity(
    scopes: string | string[],
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, updatedOptions } = tracingClient.startSpan(
      `${ManagedIdentityCredential.name}.authenticateManagedIdentity`,
      getTokenOptions
    );

    try {
      // Determining the available MSI, and avoiding checking for other MSIs while the program is running.
      const availableMSI = await this.cachedAvailableMSI(scopes, updatedOptions);

      return availableMSI.getToken(
        {
          identityClient: this.identityClient,
          scopes,
          clientId: this.clientId,
          resourceId: this.resourceId,
        },
        updatedOptions
      );
    } catch (err: any) {
      span.setStatus({
        status: "error",
        error: err,
      });
      throw err;
    } finally {
      span.end();
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken> {
    let result: AccessToken | null = null;

    const { span, updatedOptions } = tracingClient.startSpan(
      `${ManagedIdentityCredential.name}.getToken`,
      options
    );

    try {
      // isEndpointAvailable can be true, false, or null,
      // If it's null, it means we don't yet know whether
      // the endpoint is available and need to check for it.
      if (this.isEndpointUnavailable !== true) {
        result = await this.authenticateManagedIdentity(scopes, updatedOptions);

        if (result === null) {
          // If authenticateManagedIdentity returns null,
          // it means no MSI endpoints are available.
          // If so, we avoid trying to reach to them in future requests.
          this.isEndpointUnavailable = true;

          // It also means that the endpoint answered with either 200 or 201 (see the sendTokenRequest method),
          // yet we had no access token. For this reason, we'll throw once with a specific message:
          const error = new CredentialUnavailableError(
            "The managed identity endpoint was reached, yet no tokens were received."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }

        // Since `authenticateManagedIdentity` didn't throw, and the result was not null,
        // We will assume that this endpoint is reachable from this point forward,
        // and avoid pinging again to it.
        this.isEndpointUnavailable = false;
      } else {
        // We've previously determined that the endpoint was unavailable,
        // either because it was unreachable or permanently unable to authenticate.
        const error = new CredentialUnavailableError(
          "The managed identity endpoint is not currently available"
        );
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }

      logger.getToken.info(formatSuccess(scopes));
      return result;
    } catch (err: any) {
      // CredentialUnavailable errors are expected to reach here.
      // We intend them to bubble up, so that DefaultAzureCredential can catch them.
      if (err.name === "AuthenticationRequiredError") {
        throw err;
      }

      // Expected errors to reach this point:
      // - Errors coming from a method unexpectedly breaking.
      // - When identityClient.sendTokenRequest throws, in which case
      //   if the status code was 400, it means that the endpoint is working,
      //   but no identity is available.

      span.setStatus({
        status: "error",
        error: err,
      });

      // If either the network is unreachable,
      // we can safely assume the credential is unavailable.
      if (err.code === "ENETUNREACH") {
        const error = new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: Unavailable. Network unreachable. Message: ${err.message}`
        );

        logger.getToken.info(formatError(scopes, error));
        throw error;
      }

      // If either the host was unreachable,
      // we can safely assume the credential is unavailable.
      if (err.code === "EHOSTUNREACH") {
        const error = new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: Unavailable. No managed identity endpoint found. Message: ${err.message}`
        );

        logger.getToken.info(formatError(scopes, error));
        throw error;
      }

      // If err.statusCode has a value of 400, it comes from sendTokenRequest,
      // and it means that the endpoint is working, but that no identity is available.
      if (err.statusCode === 400) {
        throw new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: The managed identity endpoint is indicating there's no available identity. Message: ${err.message}`
        );
      }

      // If the error has no status code, we can assume there was no available identity.
      // This will throw silently during any ChainedTokenCredential.
      if (err.statusCode === undefined) {
        throw new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: Authentication failed. Message ${err.message}`
        );
      }

      // Any other error should break the chain.
      throw new AuthenticationError(err.statusCode, {
        error: `${ManagedIdentityCredential.name} authentication failed.`,
        error_description: err.message,
      });
    } finally {
      // Finally is always called, both if we return and if we throw in the above try/catch.
      span.end();
    }
  }
}
