// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { TokenCredentialOptions } from "../../tokenCredentialOptions";
import { credentialLogger, formatError, formatSuccess } from "../../util/logging";
import { tracingClient } from "../../util/tracing";
import { IdentityClient } from "../../client/identityClient";
import { ManagedIdentityApplication } from "@azure/msal-node";
import { defaultLoggerCallback, getMSALLogLevel } from "../../msal/utils";
import { getLogLevel } from "@azure/logger";
import { mapScopesToResource } from "./utils";
import { MsalToken, ValidMsalToken } from "../../msal/types";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../errors";
import { MSIConfiguration } from "./models";
import { tokenExchangeMsi } from "./tokenExchangeMsi";
import { imdsMsi } from "./imdsMsi";
import { imdsRetryPolicy } from "./imdsRetryPolicy";

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
  private clientId?: string;
  private resourceId?: string;
  private msiRetryConfig: MSIConfiguration["retryConfig"] = {
    maxRetries: 5,
    startDelayInMs: 800,
    intervalIncrement: 2,
  };
  private isAvailableIdentityClient: IdentityClient;

  constructor(
    clientIdOrOptions?: string | ManagedIdentityCredentialOptions,
    options: ManagedIdentityCredentialOptions = {},
  ) {
    // TODO: disambiguate this like we did in keyvault
    let _options: ManagedIdentityCredentialOptions = {};
    if (typeof clientIdOrOptions === "string") {
      this.clientId = clientIdOrOptions;
      _options = options;
    } else {
      this.clientId = clientIdOrOptions?.clientId;
      _options = clientIdOrOptions ?? {};
    }
    this.resourceId = _options?.resourceId;

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

    this.identityClient = new IdentityClient({
      ..._options,
      additionalPolicies: [{ policy: imdsRetryPolicy(this.msiRetryConfig), position: "perCall" }],
    });
    this.managedIdentityApp = new ManagedIdentityApplication({
      managedIdentityIdParams: {
        userAssignedClientId: this.clientId,
        userAssignedResourceId: this.resourceId,
      },
      system: {
        // todo: proxyUrl?
        disableInternalRetries: true,
        networkClient: this.identityClient,
        loggerOptions: {
          logLevel: getMSALLogLevel(getLogLevel()),
          piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
          loggerCallback: defaultLoggerCallback(logger),
        },
      },
    });

    this.isAvailableIdentityClient = new IdentityClient({
      ..._options,
      retryOptions: {
        maxRetries: 0,
      },
    });
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
    logger.getToken.info("Using the MSAL provider for Managed Identity.");
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      throw new CredentialUnavailableError(
        `ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(scopes)}`,
      );
    }

    return tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async () => {
      try {
        const isTokenExchangeMsi = await tokenExchangeMsi.isAvailable({
          scopes,
          clientId: this.clientId,
          getTokenOptions: options,
          identityClient: this.identityClient,
          resourceId: this.resourceId,
        });

        const identitySource = this.managedIdentityApp.getManagedIdentitySource();
        const isImdsMsi = identitySource === "Imds" || identitySource === "DefaultToImds";

        if (isTokenExchangeMsi) {
          logger.getToken.info("Using the token exchange managed identity.");
          const result = await tokenExchangeMsi.getToken({
            scopes,
            clientId: this.clientId,
            identityClient: this.identityClient,
            retryConfig: this.msiRetryConfig,
            resourceId: this.resourceId,
          });

          if (result === null) {
            throw new CredentialUnavailableError(
              "The managed identity endpoint was reached, yet no tokens were received.",
            );
          }

          return result;
        } else if (isImdsMsi) {
          logger.getToken.info("Using the IMDS endpoint to probe for availability.");
          // first probe, if we're in a DAC scenario, then get the token
          const isAvailable = await imdsMsi.isAvailable({
            scopes,
            clientId: this.clientId,
            getTokenOptions: options,
            identityClient: this.isAvailableIdentityClient,
            resourceId: this.resourceId,
          });

          if (!isAvailable) {
            throw new CredentialUnavailableError(
              `ManagedIdentityCredential: The managed identity endpoint is not available.`,
            );
          }
        }

        // At this point we know that:
        // - This is not a tokenExchangeMsi,
        // - We already probed for IMDS endpoint availability if it's an IMDS MSI.
        // We can proceed normally
        logger.getToken.info("Calling into MSAL for managed identity token.");
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
        logger.getToken.error(formatError(scopes, err));

        // AuthenticationRequiredError described as Error to enforce authentication after trying to retrieve a token silently.
        // TODO: why would this _ever_ happen considering we're not trying the silent request in this flow?
        if (err.name === "AuthenticationRequiredError") {
          throw err;
        }

        if (isNetworkError(err)) {
          throw new CredentialUnavailableError(
            `ManagedIdentityCredential: Network unreachable. Message: ${err.message}`,
          );
        }

        throw new CredentialUnavailableError(
          `ManagedIdentityCredential: Authentication failed. Message ${err.message}`,
        );
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

function isNetworkError(err: any): boolean {
  if (err.errorCode === "network_error") {
    return true;
  }

  // TODO: validate this is still needed or delete
  // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
  // rather than just timing out, as expected.
  if (err.statusCode === 403 || err.code === 403) {
    if (err.message.includes("unreachable")) {
      return true;
    }
  }

  return false;
}
