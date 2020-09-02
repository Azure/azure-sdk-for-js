// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { InteractiveBrowserCredentialOptions } from "./interactiveBrowserCredentialOptions";
import { credentialLogger, formatError } from "../util/logging";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { Socket } from "net";

const SERVER_PORT = process.env.PORT || 80;

import express from "express";
import msal from "@azure/msal-node";
import open from "open";
import path from "path";
import http from "http";

const BrowserNotSupportedError = new Error(
  "InteractiveBrowserCredential is not supported in Node.js."
);
const logger = credentialLogger("InteractiveBrowserCredential");

interface AuthenticationRecord {
  authority?: string,
  homeAccountId: string,
  environment: string,
  tenantId: string,
  username: string,
}

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.  This credential is not currently supported in Node.js.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private pca: msal.PublicClientApplication;
  private msalCacheManager: msal.TokenCache;
  private tenantId: string;
  private clientId: string;
  private persistenceEnabled: boolean;
  private authenticationRecord: AuthenticationRecord | undefined;

  constructor(options?: InteractiveBrowserCredentialOptions) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = (options && options.tenantId) || DefaultTenantId;
    this.clientId = (options && options.clientId) || DeveloperSignOnClientId;
    
    // Future update: this is for persistent caching
    this.persistenceEnabled = false;
    this.authenticationRecord = undefined;

    const publicClientConfig = {
      auth: {
        clientId: this.clientId,
        authority: "https://login.microsoftonline.com/" + this.tenantId,
        redirectUri: "http://localhost"
      },
      cache: undefined
    };
    this.pca = new msal.PublicClientApplication(publicClientConfig);
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
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    return this.acquireTokenFromBrowser(scopeArray);
  }

  private async openAuthCodeUrl(scopeArray: string[]): Promise<void> {
    const authCodeUrlParameters = {
      scopes: scopeArray,
      redirectUri: "http://localhost"
    };

    const response = await this.pca.getAuthCodeUrl(authCodeUrlParameters);
    await open(response);
  }

  private async acquireTokenFromBrowser(scopeArray: string[]): Promise<AccessToken | null> {
    return new Promise<AccessToken | null>(async (resolve, reject) => {
      let listen: http.Server | undefined;
      let socketToDestroy: Socket | undefined;

      function cleanup() {
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
        const tokenRequest: msal.AuthorizationCodeRequest = {
          code: req.query.code as string,
          redirectUri: "http://localhost",
          scopes: scopeArray
        };

        try {
          const authResponse = await this.pca.acquireTokenByCode(tokenRequest);
          res.sendStatus(200);
          logger.info(`authResponse: ${authResponse}`);
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

      listen = app.listen(SERVER_PORT, () =>
        logger.info(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`)
      );
      listen.on("connection", (socket) => (socketToDestroy = socket));

      try {
        await this.openAuthCodeUrl(scopeArray);
      } catch(e) {
        cleanup();
        throw e;
      }
    });
  }
}
