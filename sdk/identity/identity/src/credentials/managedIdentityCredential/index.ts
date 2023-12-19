// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { IdentityClient } from "../../client/identityClient";
import { TokenCredentialOptions } from "../../tokenCredentialOptions";
import {
  AuthenticationError,
  AuthenticationRequiredError,
  CredentialUnavailableError,
} from "../../errors";
import { credentialLogger, formatError, formatSuccess } from "../../util/logging";
import { appServiceMsi2017 } from "./appServiceMsi2017";
import { tracingClient } from "../../util/tracing";
import { cloudShellMsi } from "./cloudShellMsi";
import { imdsMsi } from "./imdsMsi";
import { MSI, MSIToken } from "./models";
import { arcMsi } from "./arcMsi";
import { tokenExchangeMsi } from "./tokenExchangeMsi";
import { fabricMsi } from "./fabricMsi";
import { appServiceMsi2019 } from "./appServiceMsi2019";
import { AppTokenProviderParameters, ConfidentialClientApplication } from "@azure/msal-node";
import { DeveloperSignOnClientId } from "../../constants";
import { MsalResult, MsalToken } from "../../msal/types";
import { getMSALLogLevel } from "../../msal/utils";
import { getLogLevel } from "@azure/logger";

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
  private identityClient: IdentityClient;
  private clientId: string | undefined;
  private resourceId: string | undefined;
  private isEndpointUnavailable: boolean | null = null;
  private isAvailableIdentityClient: IdentityClient;
  private confidentialApp: ConfidentialClientApplication;
  private isAppTokenProviderInitialized: boolean = false;

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

    /**  authority host validation and metadata discovery to be skipped in managed identity
     * since this wasn't done previously before adding token cache support
     */
    this.confidentialApp = new ConfidentialClientApplication({
      auth: {
        authority: "https://login.microsoftonline.com/managed_identity",
        clientId: this.clientId ?? DeveloperSignOnClientId,
        clientSecret: "dummy-secret",
        cloudDiscoveryMetadata:
          '{"tenant_discovery_endpoint":"https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}',
        authorityMetadata:
          '{"token_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/common/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/{tenantid}/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/common/kerberos","tenant_region_scope":null,"cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}',
        clientCapabilities: [],
      },
      system: {
        loggerOptions: {
          logLevel: getMSALLogLevel(getLogLevel()),
        },
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
  ): Promise<MSIToken | null> {
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
        const availableMSI = await this.cachedAvailableMSI(scopes, updatedOptions);
        if (availableMSI.name === "tokenExchangeMsi") {
          result = await this.authenticateManagedIdentity(scopes, updatedOptions);
        } else {
          const appTokenParameters: AppTokenProviderParameters = {
            correlationId: this.identityClient.getCorrelationId(),
            tenantId: options?.tenantId || "managed_identity",
            scopes: Array.isArray(scopes) ? scopes : [scopes],
            claims: options?.claims,
          };

          // Added a check to see if SetAppTokenProvider was already defined.
          this.initializeSetAppTokenProvider();
          const authenticationResult = await this.confidentialApp.acquireTokenByClientCredential({
            ...appTokenParameters,
          });
          result = this.handleResult(scopes, authenticationResult || undefined);
        }
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

      // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network"
      // rather than just timing out, as expected.
      if (err.statusCode === 403 || err.code === 403) {
        if (err.message.includes("A socket operation was attempted to an unreachable network")) {
          const error = new CredentialUnavailableError(
            `${ManagedIdentityCredential.name}: Unavailable. Network unreachable. Message: ${err.message}`
          );

          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
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

  /**
   * Handles the MSAL authentication result.
   * If the result has an account, we update the local account reference.
   * If the token received is invalid, an error will be thrown depending on what's missing.
   */
  private handleResult(
    scopes: string | string[],
    result?: MsalResult,
    getTokenOptions?: GetTokenOptions
  ): AccessToken {
    this.ensureValidMsalToken(scopes, result, getTokenOptions);
    logger.getToken.info(formatSuccess(scopes));
    return {
      token: result!.accessToken!,
      expiresOnTimestamp: result!.expiresOn!.getTime(),
    };
  }

  /**
   * Ensures the validity of the MSAL token
   * @internal
   */
  private ensureValidMsalToken(
    scopes: string | string[],
    msalToken?: MsalToken,
    getTokenOptions?: GetTokenOptions
  ): void {
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

  private initializeSetAppTokenProvider(): void {
    if (!this.isAppTokenProviderInitialized) {
      this.confidentialApp.SetAppTokenProvider(async (appTokenProviderParameters) => {
        logger.info(
          `SetAppTokenProvider invoked with parameters- ${JSON.stringify(
            appTokenProviderParameters
          )}`
        );
        const getTokenOptions: GetTokenOptions = {
          ...appTokenProviderParameters,
        };
        logger.info(
          `authenticateManagedIdentity invoked with scopes- ${JSON.stringify(
            appTokenProviderParameters.scopes
          )} and getTokenOptions - ${JSON.stringify(getTokenOptions)}`
        );
        const resultToken = await this.authenticateManagedIdentity(
          appTokenProviderParameters.scopes,
          getTokenOptions
        );

        if (resultToken) {
          logger.info(`SetAppTokenProvider will save the token in cache`);

          const expiresInSeconds = resultToken?.expiresOnTimestamp
            ? Math.floor((resultToken.expiresOnTimestamp - Date.now()) / 1000)
            : 0;
          return {
            accessToken: resultToken?.token,
            expiresInSeconds,
          };
        } else {
          logger.info(
            `SetAppTokenProvider token has "no_access_token_returned" as the saved token`
          );
          return {
            accessToken: "no_access_token_returned",
            expiresInSeconds: 0,
          };
        }
      });
      this.isAppTokenProviderInitialized = true;
    }
  }
}
