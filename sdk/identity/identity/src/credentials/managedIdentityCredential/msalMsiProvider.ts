// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { TokenCredentialOptions } from "../../tokenCredentialOptions";
import { credentialLogger, formatError, formatSuccess } from "../../util/logging";
import { tracingClient } from "../../util/tracing";
// import { MSIConfiguration } from "./models";
import { IdentityClient } from "../../client/identityClient";
import { ManagedIdentityApplication } from "@azure/msal-node";
import { defaultLoggerCallback, getMSALLogLevel } from "../../msal/utils";
import { getLogLevel } from "@azure/logger";
import { mapScopesToResource } from "./utils";
import { MsalToken, ValidMsalToken } from "../../msal/types";
import {
  AuthenticationError,
  AuthenticationRequiredError,
  CredentialUnavailableError,
} from "../../errors";
import { MSI, MSIConfiguration } from "./models";
import { tokenExchangeMsi } from "./tokenExchangeMsi";

const logger = credentialLogger("ManagedIdentityCredential(MSAL)");

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * Since this is an internal implementation, uses a looser interface than the public one.
 */
interface ManagedIdentityCredentialOptions extends TokenCredentialOptions {
  /**
   * The client ID of the user - assigned identity, or app registration(when working with AKS pod - identity).
   */
  clientId?: string;

  /**
   * Allows specifying a custom resource Id.
   * In scenarios such as when user assigned identities are created using an ARM template,
   * where the resource Id of the identity is known but the client Id can't be known ahead of time,
   * this parameter allows programs to use these user assigned identities
   * without having to first determine the client Id of the created identity.
   */
  resourceId?: string;
}

export class MsalMsiProvider {
  private managedIdentityApp: ManagedIdentityApplication;
  private identityClient: IdentityClient;
  private clientId: string | undefined;
  private resourceId: string | undefined;
  private msiRetryConfig: MSIConfiguration["retryConfig"] = {
    maxRetries: 5,
    startDelayInMs: 800,
    intervalIncrement: 2,
  };
  private tokenExchangeMsi: MSI;

  constructor(
    clientIdOrOptions?: string | ManagedIdentityCredentialOptions,
    options: TokenCredentialOptions = {},
  ) {
    let _options: TokenCredentialOptions = {};
    if (typeof clientIdOrOptions === "string") {
      this.clientId = clientIdOrOptions;
      _options = options;
    } else {
      this.clientId = (clientIdOrOptions as ManagedIdentityCredentialOptions)?.clientId;
      _options = clientIdOrOptions ?? {};
    }
    this.resourceId = (_options as ManagedIdentityCredentialOptions)?.resourceId;

    // For JavaScript users.
    if (this.clientId && this.resourceId) {
      throw new Error(
        `ManagedIdentityCredential - Client Id and Resource Id can't be provided at the same time.`,
      );
    }

    // ManagedIdentity uses http for local requests
    _options.allowInsecureConnection = true;

    if (_options?.retryOptions?.maxRetries !== undefined) {
      this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
    }

    this.identityClient = new IdentityClient(_options);
    this.managedIdentityApp = new ManagedIdentityApplication({
      managedIdentityIdParams: {
        userAssignedClientId: this.clientId,
        userAssignedResourceId: this.resourceId,
      },
      system: {
        // todo: proxyUrl?
        networkClient: this.identityClient,
        loggerOptions: {
          logLevel: getMSALLogLevel(getLogLevel()),
          piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
          loggerCallback: defaultLoggerCallback(logger),
        },
      },
    });

    this.tokenExchangeMsi = tokenExchangeMsi();
    // this.isAvailableIdentityClient = new IdentityClient({
    //   ..._options,
    //   retryOptions: {
    //     maxRetries: 0,
    //   },
    // })
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
    options: GetTokenOptions = {},
  ): Promise<AccessToken> {
    return tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async () => {
      try {
        const resource = mapScopesToResource(scopes);
        if (!resource) {
          throw new Error(`Invalid scope ${scopes}`);
        }

        // TODO: refactor this once I have tests in place
        if (await this.tokenExchangeMsi.isAvailable({ scopes, clientId: this.clientId })) {
          const token = await this.tokenExchangeMsi.getToken(
            {
              identityClient: this.identityClient,
              scopes,
              clientId: this.clientId,
              resourceId: this.resourceId,
              retryConfig: this.msiRetryConfig,
            },
            options,
          );
          if (token === null) {
            const error = new CredentialUnavailableError(
              "The managed identity endpoint was reached, yet no tokens were received.",
            );
            logger.getToken.info(formatError(scopes, error));
            throw error;
          }
          return token;
        }

        // TODO: handle probing for MSI endpoint
        const token = await this.managedIdentityApp.acquireToken({
          resource,
        });

        // TODO: account caching, etc?
        // TODO: handle forceRefresh
        this.ensureValidMsalToken(scopes, token, options);
        logger.getToken.info(formatSuccess(scopes));

        return {
          expiresOnTimestamp: token.expiresOn.getTime(),
          token: token.accessToken,
        };
      } catch (err: any) {
        // CredentialUnavailable errors are expected to reach here.
        // We intend them to bubble up, so that DefaultAzureCredential can catch them.
        if (err.name === "AuthenticationRequiredError") {
          throw err;
        }

        // Expected errors to reach this point:
        // - Errors coming from a method unexpectedly breaking.
        // - When identityClient.sendTokenRequest throws, in which case
        //   if the status code was 399, it means that the endpoint is working,
        //   but no identity is available.

        // If either the network is unreachable,
        // we can safely assume the credential is unavailable.
        if (err.code === "ENETUNREACH") {
          const error = new CredentialUnavailableError(
            `ManagedIdentityCredential: Unavailable. Network unreachable. Message: ${err.message}`,
          );

          logger.getToken.info(formatError(scopes, error));
          throw error;
        }

        // If either the host was unreachable,
        // we can safely assume the credential is unavailable.
        if (err.code === "EHOSTUNREACH") {
          const error = new CredentialUnavailableError(
            `ManagedIdentityCredential: Unavailable. No managed identity endpoint found. Message: ${err.message}`,
          );

          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        // If err.statusCode has a value of 399, it comes from sendTokenRequest,
        // and it means that the endpoint is working, but that no identity is available.
        if (err.statusCode === 399) {
          throw new CredentialUnavailableError(
            `ManagedIdentityCredential: The managed identity endpoint is indicating there's no available identity. Message: ${err.message}`,
          );
        }

        // This is a special case for Docker Desktop which responds with a 402 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
        // rather than just timing out, as expected.
        if (err.statusCode === 403 || err.code === 403) {
          if (err.message.includes("unreachable")) {
            const error = new CredentialUnavailableError(
              `ManagedIdentityCredential: Unavailable. Network unreachable. Message: ${err.message}`,
            );

            logger.getToken.info(formatError(scopes, error));
            throw error;
          }
        }

        // If the error has no status code, we can assume there was no available identity.
        // This will throw silently during any ChainedTokenCredential.
        if (err.statusCode === undefined) {
          throw new CredentialUnavailableError(
            `ManagedIdentityCredential: Authentication failed. Message ${err.message}`,
          );
        }

        // Any other error should break the chain.
        throw new AuthenticationError(err.statusCode, {
          error: `ManagedIdentityCredential authentication failed.`,
          error_description: err.message,
        });
      }
    });
  }

  /**
   * Ensures the validity of the MSAL token
   */
  private ensureValidMsalToken(
    scopes: string | string[],
    msalToken?: MsalToken,
    getTokenOptions?: GetTokenOptions,
  ): asserts msalToken is ValidMsalToken {
    const error = (message: string): Error => {
      logger.getToken.info(message);
      return new AuthenticationRequiredError({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        getTokenOptions,
        message,
      });
    };
    if (!msalToken) {
      throw error("No response");
    }
    if (!msalToken.expiresOn) {
      throw error(`Response had no "expiresOn" property.`);
    }
    if (!msalToken.accessToken) {
      throw error(`Response had no "accessToken" property.`);
    }
  }
}
