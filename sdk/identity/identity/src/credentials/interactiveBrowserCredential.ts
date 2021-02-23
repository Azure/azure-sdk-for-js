// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { InteractiveBrowserCredentialOptions } from "./interactiveBrowserCredentialOptions";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { Socket } from "net";
import { AuthenticationRequired, MsalClient } from "../client/msalClient";
import { AuthorizationCodeRequest } from "@azure/msal-node";

import open from "open";
import http from "http";
import stoppable from "stoppable";

import { checkTenantId } from "../util/checkTenantId";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private redirectUri: string;
  private port: number;
  private hostname: string;
  private msalClient: MsalClient;

  constructor(options: InteractiveBrowserCredentialOptions = {}) {
    const tenantId = options.tenantId || DefaultTenantId;
    const clientId = options.clientId || DeveloperSignOnClientId;

    checkTenantId(logger, tenantId);

    // const persistenceEnabled = options?.persistenceEnabled ? options?.persistenceEnabled : false;
    // const authenticationRecord = options?.authenticationRecord;

    if (options.redirectUri) {
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

    this.hostname = url.hostname;

    let authorityHost;
    if (options.authorityHost) {
      if (options.authorityHost.endsWith("/")) {
        authorityHost = options.authorityHost + tenantId;
      } else {
        authorityHost = options.authorityHost + "/" + tenantId;
      }
    } else {
      authorityHost = "https://login.microsoftonline.com/" + tenantId;
    }

    this.msalClient = new MsalClient(
      {
        clientId,
        authority: authorityHost,
        knownAuthorities: tenantId === "adfs" ? (authorityHost ? [authorityHost] : []) : []
      },
      false,
      undefined,
      options
    );
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  public getToken(
    scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    return this.msalClient.acquireTokenFromCache(scopeArray).catch((e) => {
      if (e instanceof AuthenticationRequired) {
        return this.acquireTokenFromBrowser(scopeArray);
      } else {
        logger.getToken.info(formatError(scopes, e));
        throw e;
      }
    });
  }

  private async openAuthCodeUrl(scopeArray: string[]): Promise<void> {
    const authCodeUrlParameters = {
      scopes: scopeArray,
      redirectUri: this.redirectUri
    };

    const response = await this.msalClient.getAuthCodeUrl(authCodeUrlParameters);
    await open(response);
  }

  private acquireTokenFromBrowser(scopeArray: string[]): Promise<AccessToken | null> {
    return new Promise<AccessToken | null>((resolve, reject) => {
      const socketToDestroy: Socket[] = [];

      const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (!req.url) {
          reject(
            new Error(
              `Interactive Browser Authentication Error "Did not receive token with a valid expiration"`
            )
          );
          return;
        }
        let url: URL;
        try {
          url = new URL(req.url, this.redirectUri);
        } catch (e) {
          reject(
            new Error(
              `Interactive Browser Authentication Error "Did not receive token with a valid expiration"`
            )
          );
          return;
        }
        const tokenRequest: AuthorizationCodeRequest = {
          code: url.searchParams.get("code")!,
          redirectUri: this.redirectUri,
          scopes: scopeArray
        };

        this.msalClient
          .acquireTokenByCode(tokenRequest)
          .then((authResponse) => {
            const successMessage = `Authentication Complete. You can close the browser and return to the application.`;
            if (authResponse && authResponse.expiresOn) {
              const expiresOnTimestamp = authResponse?.expiresOn.valueOf();
              res.writeHead(200);
              res.end(successMessage);
              logger.getToken.info(formatSuccess(scopeArray));

              resolve({
                expiresOnTimestamp,
                token: authResponse.accessToken
              });
            } else {
              const errorMessage = formatError(
                scopeArray,
                `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`
              );
              res.writeHead(500);
              res.end(errorMessage);
              logger.getToken.info(errorMessage);

              reject(
                new Error(
                  `Interactive Browser Authentication Error "Did not receive token with a valid expiration"`
                )
              );
            }
            cleanup();
            return;
          })
          .catch(() => {
            const errorMessage = formatError(
              scopeArray,
              `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`
            );
            res.writeHead(500);
            res.end(errorMessage);
            logger.getToken.info(errorMessage);

            reject(
              new Error(
                `Interactive Browser Authentication Error "Did not receive token with a valid expiration"`
              )
            );
            cleanup();
          });
      };
      const app = http.createServer(requestListener);

      const listen = app.listen(this.port, this.hostname, () =>
        logger.info(`InteractiveBrowerCredential listening on port ${this.port}!`)
      );
      app.on("connection", (socket) => socketToDestroy.push(socket));
      const server = stoppable(app);

      this.openAuthCodeUrl(scopeArray).catch((e) => {
        cleanup();
        reject(e);
      });

      function cleanup(): void {
        if (listen) {
          listen.close();
        }

        for (const socket of socketToDestroy) {
          socket.destroy();
        }

        if (server) {
          server.close();
          server.stop();
        }
      }
    });
  }
}
