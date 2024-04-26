// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AuthenticationError, CredentialUnavailableError } from "../../errors";
import { MSIConfiguration } from "./models";
import { credentialLogger, formatError } from "../../util/logging";

import { DeveloperSignOnClientId } from "../../constants";
import { TokenCredentialOptions } from "../../tokenCredentialOptions";
import { setLogLevel } from "@azure/logger";
import { tracingClient } from "../../util/tracing";
import { MsalClient, createMsalClient } from "../../msal/nodeFlows/msalClient";
import { resolveTenantId } from "../../util/tenantIdUtils";

setLogLevel("verbose");
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
 * https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential implements TokenCredential {
  private clientId: string | undefined;
  private resourceId: string | undefined;
  private msiRetryConfig: MSIConfiguration["retryConfig"] = {
    maxRetries: 5,
    startDelayInMs: 800,
    intervalIncrement: 2,
  };
  private msalClient: MsalClient;

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
    options?: TokenCredentialOptions,
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
        `${ManagedIdentityCredential.name} - Client Id and Resource Id can't be provided at the same time.`,
      );
    }
    if (_options?.retryOptions?.maxRetries !== undefined) {
      this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
    }

    logger.info("Initializing ManagedIdentityCredential");
    logger.info(
      `ManagedIdentityCredential clientId: ${this.clientId}, resourceId: ${this.resourceId}`,
    );
    logger.info(
      `ManagedIdentityCredential tenantId: ${resolveTenantId(logger, undefined, this.clientId)}`,
    );
    logger.info(`ManagedIdentityCredential options: ${JSON.stringify(_options)}`);

    this.msalClient = createMsalClient(
      this.clientId ?? DeveloperSignOnClientId,
      resolveTenantId(logger, undefined, this.clientId),
      _options,
    );
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    const { span, updatedOptions } = tracingClient.startSpan(
      `${ManagedIdentityCredential.name}.getToken`,
      options,
    );

    try {
      // isEndpointAvailable can be true, false, or null,
      // If it's null, it means we don't yet know whether
      // the endpoint is available and need to check for it.
      logger.info(`${ManagedIdentityCredential.name} - getToken called with scopes: ${scopes}`);
      logger.info("First, trying with MSAL");
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      const token = await this.msalClient.getTokenByManagedIdentity(
        arrayScopes,
        this.clientId,
        updatedOptions,
      );

      logger.info("MSAL getTokenByManagedIdentity succeeded");
      return token;
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
          `${ManagedIdentityCredential.name}: Unavailable. Network unreachable. Message: ${err.message}`,
        );

        logger.getToken.info(formatError(scopes, error));
        throw error;
      }

      // If either the host was unreachable,
      // we can safely assume the credential is unavailable.
      if (err.code === "EHOSTUNREACH") {
        const error = new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: Unavailable. No managed identity endpoint found. Message: ${err.message}`,
        );

        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
      // If err.statusCode has a value of 400, it comes from sendTokenRequest,
      // and it means that the endpoint is working, but that no identity is available.
      if (err.statusCode === 400) {
        throw new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: The managed identity endpoint is indicating there's no available identity. Message: ${err.message}`,
        );
      }

      // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
      // rather than just timing out, as expected.
      if (err.statusCode === 403 || err.code === 403) {
        if (err.message.includes("unreachable")) {
          const error = new CredentialUnavailableError(
            `${ManagedIdentityCredential.name}: Unavailable. Network unreachable. Message: ${err.message}`,
          );

          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
      }

      // If the error has no status code, we can assume there was no available identity.
      // This will throw silently during any ChainedTokenCredential.
      if (err.statusCode === undefined) {
        throw new CredentialUnavailableError(
          `${ManagedIdentityCredential.name}: Authentication failed. Message ${err.message}`,
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
