// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { AuthenticationRecord, AuthenticationRequired } from "../client/msalClient";
import { DeviceCodeCredentialOptions } from "./deviceCodeCredentialOptions";
import { createSpan } from "../util/tracing";
import { credentialLogger } from "../util/logging";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";

import { PublicClientApplication, DeviceCodeRequest, TokenCache } from "@azure/msal-node";

/**
 * Provides the user code and verification URI where the code must be
 * entered.  Also provides a message to display to the user which
 * contains an instruction with these details.
 */
export interface DeviceCodeInfo {
  /**
   * The device code that the user must enter into the verification page.
   */
  userCode: string;

  /**
   * The verification URI to which the user must navigate to enter the device
   * code.
   */
  verificationUri: string;

  /**
   * A message that may be shown to the user to instruct them on how to enter
   * the device code in the page specified by the verification URI.
   */
  message: string;
}

/**
 * Defines the signature of a callback which will be passed to
 * DeviceCodeCredential for the purpose of displaying authentication
 * details to the user.
 */
export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;

const logger = credentialLogger("DeviceCodeCredential");

/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo The device code.
 */
export function defaultDeviceCodePromptCallback(deviceCodeInfo: DeviceCodeInfo): void {
  console.log(deviceCodeInfo.message);
}

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
  private pca: PublicClientApplication;
  private tenantId: string;
  private clientId: string;
  private userPromptCallback: DeviceCodePromptCallback;
  private authorityHost: string;
  private persistenceEnabled: boolean;
  private authenticationRecord: AuthenticationRecord | undefined;
  private msalCacheManager: TokenCache;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name. 
   *                 'organizations' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param userPromptCallback A callback function that will be invoked to show
                               {@link DeviceCodeInfo} to the user. If left unassigned, we will automatically log the device code information and the authentication instructions in the console.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string | "organizations",
    clientId: string,
    userPromptCallback: DeviceCodePromptCallback = defaultDeviceCodePromptCallback,
    options?: DeviceCodeCredentialOptions
  ) {
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.userPromptCallback = userPromptCallback;

    this.persistenceEnabled = this.persistenceEnabled = options?.cacheOptions !== undefined;
    this.authenticationRecord = options?.authenticationRecord;

    if (options && options.authorityHost) {
      if (options.authorityHost.endsWith("/")) {
        this.authorityHost = options.authorityHost + this.tenantId;
      } else {
        this.authorityHost = options.authorityHost + "/" + this.tenantId;
      }
    } else {
      this.authorityHost = "https://login.microsoftonline.com/" + this.tenantId;
    }

    const knownAuthorities = this.tenantId === "adfs" ? [this.authorityHost] : [];

    const publicClientConfig = {
      auth: {
        clientId: this.clientId,
        authority: this.authorityHost,
        knownAuthorities: knownAuthorities
      },
      cache: options?.cacheOptions
    };

    this.pca = new PublicClientApplication(publicClientConfig);
    this.msalCacheManager = this.pca.getTokenCache();
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    const { span } = createSpan("DeviceCodeCredential-getToken", options);

    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    const deviceCodeRequest = {
      deviceCodeCallback: this.userPromptCallback,
      scopes: scopeArray
    };

    logger.info("Sending devicecode request");

    if (this.authenticationRecord && this.persistenceEnabled) {
      return this.acquireTokenFromCache().catch((e) => {
        if (e instanceof AuthenticationRequired) {
          try {
            return this.acquireTokenByDeviceCode(deviceCodeRequest);
          } catch (err) {
            const code =
              err.name === AuthenticationErrorName
                ? CanonicalCode.UNAUTHENTICATED
                : CanonicalCode.UNKNOWN;
            span.setStatus({
              code,
              message: err.message
            });
            logger.getToken.info(err);
            throw err;
          } finally {
            span.end();
          }
        } else {
          throw e;
        }
      });
    } else {
      try {
        return this.acquireTokenByDeviceCode(deviceCodeRequest);
      } catch (err) {
        const code =
          err.name === AuthenticationErrorName
            ? CanonicalCode.UNAUTHENTICATED
            : CanonicalCode.UNKNOWN;
        span.setStatus({
          code,
          message: err.message
        });
        logger.getToken.info(err);
        throw err;
      } finally {
        span.end();
      }
    }
  }

  private async acquireTokenFromCache(): Promise<AccessToken | null> {
    await this.msalCacheManager.readFromPersistence();

    const silentRequest = {
      account: this.authenticationRecord!,
      scopes: ["https://vault.azure.net/user_impersonation", "https://vault.azure.net/.default"]
    };

    try {
      const response = await this.pca.acquireTokenSilent(silentRequest);
      logger.info("Successful silent token acquisition");
      return {
        expiresOnTimestamp: response.expiresOn.getTime(),
        token: response.accessToken
      };
    } catch (e) {
      throw new AuthenticationRequired("Could not authenticate silently using the cache");
    }
  }

  private async acquireTokenByDeviceCode(
    deviceCodeRequest: DeviceCodeRequest
  ): Promise<AccessToken | null> {
    if (this.persistenceEnabled) {
      await this.msalCacheManager.readFromPersistence();
    }
    try {
      const deviceResponse = await this.pca.acquireTokenByDeviceCode(deviceCodeRequest);
      if (this.persistenceEnabled) {
        await this.msalCacheManager.writeToPersistence();
      }
      return {
        expiresOnTimestamp: deviceResponse.expiresOn.getTime(),
        token: deviceResponse.accessToken
      };
    } catch (error) {
      throw new Error(`Device Authentication Error "${JSON.stringify(error)}"`);
    }
  }
}
