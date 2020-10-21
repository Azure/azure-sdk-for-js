// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import {
  InteractiveBrowserCredentialOptions,
  AuthenticationRecord
} from "./interactiveBrowserCredentialOptions";
import { credentialLogger } from "../util/logging";
import { IdentityClient } from "../client/identityClient";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { Socket } from "net";

import express from "express";
import {
  PublicClientApplication,
  TokenCache,
  AuthorizationCodeRequest,
  Configuration
} from "@azure/msal-node";
import open from "open";
import http from "http";
import { CredentialUnavailable } from "../client/errors";

const logger = credentialLogger("InteractiveBrowserCredential");

class AuthenticationRequired extends CredentialUnavailable {}

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.  This credential is not currently supported in Node.js.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private pca: PublicClientApplication;
  private msalCacheManager: TokenCache;
  private tenantId: string;
  private clientId: string;
  private persistenceEnabled: boolean;
  private redirectUri: string;
  private authorityHost: string;
  private authenticationRecord: AuthenticationRecord | undefined;
  private port: number;

  constructor(options?: InteractiveBrowserCredentialOptions) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = (options && options.tenantId) || DefaultTenantId;
    this.clientId = (options && options.clientId) || DeveloperSignOnClientId;

    // Future update: this is for persistent caching
    this.persistenceEnabled = this.persistenceEnabled = options?.cacheOptions !== undefined;
    this.authenticationRecord = options?.authenticationRecord;

    if (options && options.redirectUri) {
      if (typeof options.redirectUri === "string") {
        this.redirectUri = options.redirectUri;
      } else {
        this.redirectUri = options.redirectUri();
      }
    } else {
      this.redirectUri = "http://localhost";
    }

    const url = new URL(this.redirectUri);
    this.port = parseInt(url.port);
    if (isNaN(this.port)) {
      this.port = 80;
    }

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

    const publicClientConfig: Configuration = {
      auth: {
        clientId: this.clientId,
        authority: this.authorityHost,
        knownAuthorities: knownAuthorities
      },
      cache: options?.cacheOptions,
      system: { networkClient: this.identityClient }
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
  public getToken(
    scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    if (this.authenticationRecord && this.persistenceEnabled) {
      return this.acquireTokenFromCache().catch((e) => {
        if (e instanceof AuthenticationRequired) {
          return this.acquireTokenFromBrowser(scopeArray);
        } else {
          throw e;
        }
      });
    } else {
      return this.acquireTokenFromBrowser(scopeArray);
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

  private async openAuthCodeUrl(scopeArray: string[]): Promise<void> {
    const authCodeUrlParameters = {
      scopes: scopeArray,
      redirectUri: this.redirectUri
    };

    const response = await this.pca.getAuthCodeUrl(authCodeUrlParameters);
    await open(response);

    if (this.persistenceEnabled) {
      await this.msalCacheManager.readFromPersistence();
    }
  }

  private async acquireTokenFromBrowser(scopeArray: string[]): Promise<AccessToken | null> {
    // eslint-disable-next-line
    return new Promise<AccessToken | null>(async (resolve, reject) => {
      // eslint-disable-next-line
      let listen: http.Server | undefined;
      let socketToDestroy: Socket | undefined;

      function cleanup(): void {
        if (listen) {
          listen.close();
        }
        if (socketToDestroy) {
          socketToDestroy.destroy();
        }
      }

      // Create Express App and Routes
      const app = express();

      app.get("/", async (req, res) => {
        const tokenRequest: AuthorizationCodeRequest = {
          code: req.query.code as string,
          redirectUri: this.redirectUri,
          scopes: scopeArray
        };

        try {
          const authResponse = await this.pca.acquireTokenByCode(tokenRequest);
          res.sendStatus(200);

          if (this.persistenceEnabled) {
            this.msalCacheManager.writeToPersistence();
          }

          resolve({
            expiresOnTimestamp: authResponse.expiresOn.valueOf(),
            token: authResponse.accessToken
          });
        } catch (error) {
          res.status(500).send(error);

          reject(
            new Error(
              `Authentication Error "${req.query["error"]}":\n\n${req.query["error_description"]}`
            )
          );
        } finally {
          cleanup();
        }
      });

      listen = app.listen(this.port, () =>
        logger.info(`Msal Node Auth Code Sample app listening on port ${this.port}!`)
      );
      listen.on("connection", (socket) => (socketToDestroy = socket));

      try {
        await this.openAuthCodeUrl(scopeArray);
      } catch (e) {
        cleanup();
        throw e;
      }
    });
  }
}
