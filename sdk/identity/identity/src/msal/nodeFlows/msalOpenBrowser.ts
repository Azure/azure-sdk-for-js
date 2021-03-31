// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import { Socket } from "net";
import http from "http";
import open from "open";
import stoppable from "stoppable";
import { AccessToken, GetTokenOptions } from "@azure/core-http";
import { credentialLogger, formatError, formatSuccess } from "../../util/logging";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";
import { msalToPublic } from "../utils";

/**
 * Options that can be passed to configure MSAL to handle authentication through opening a browser window.
 * @internal
 */
export interface MSALOpenBrowserOptions extends MsalNodeOptions {
  redirectUri: string;
}

/**
 * This MSAL client sets up a web server to listen for redirect callbacks, then calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`
 * to trigger the authentication flow, and then respond based on the values obtained from the redirect callback
 * @internal
 */
export class MsalOpenBrowser extends MsalNode {
  private redirectUri: string;
  private port: number;
  private hostname: string;

  constructor(options: MSALOpenBrowserOptions) {
    super(options);
    this.logger = credentialLogger("NodeJS MSAL Open Browser");
    this.redirectUri = options.redirectUri;

    const url = new URL(this.redirectUri);
    this.port = parseInt(url.port);
    if (isNaN(this.port)) {
      this.port = 80;
    }
    this.hostname = url.hostname;
  }

  private async acquireTokenByCode(
    request: msalNode.AuthorizationCodeRequest
  ): Promise<msalNode.AuthenticationResult | null> {
    return this.publicApp!.acquireTokenByCode(request);
  }

  protected doGetToken(scopes: string[], options?: GetTokenOptions): Promise<AccessToken> {
    return new Promise<AccessToken>((resolve, reject) => {
      const socketToDestroy: Socket[] = [];

      const requestListener = (req: http.IncomingMessage, res: http.ServerResponse): void => {
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
        const tokenRequest: msalNode.AuthorizationCodeRequest = {
          code: url.searchParams.get("code")!,
          redirectUri: this.redirectUri,
          scopes: scopes
        };

        this.acquireTokenByCode(tokenRequest)
          .then((authResponse) => {
            if (authResponse?.account) {
              this.account = msalToPublic(authResponse.account);
            }
            const successMessage = `Authentication Complete. You can close the browser and return to the application.`;
            if (authResponse && authResponse.expiresOn) {
              const expiresOnTimestamp = authResponse?.expiresOn.valueOf();
              res.writeHead(200);
              res.end(successMessage);
              this.logger.getToken.info(formatSuccess(scopes));

              resolve({
                expiresOnTimestamp,
                token: authResponse.accessToken
              });
            } else {
              const errorMessage = formatError(
                scopes,
                `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`
              );
              res.writeHead(500);
              res.end(errorMessage);
              this.logger.getToken.info(errorMessage);

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
              scopes,
              `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`
            );
            res.writeHead(500);
            res.end(errorMessage);
            this.logger.getToken.info(errorMessage);

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
        this.logger.info(`InteractiveBrowserCredential listening on port ${this.port}!`)
      );
      app.on("connection", (socket) => socketToDestroy.push(socket));
      const server = stoppable(app);

      this.openAuthCodeUrl(scopes).catch((e) => {
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

      const abortSignal = options?.abortSignal;
      if (abortSignal) {
        abortSignal.addEventListener("abort", () => {
          cleanup();
          reject(new Error("Aborted"));
        });
      }
    });
  }

  private async openAuthCodeUrl(scopeArray: string[]): Promise<void> {
    const authCodeUrlParameters: msalNode.AuthorizationUrlRequest = {
      scopes: scopeArray,
      redirectUri: this.redirectUri
    };

    const response = await this.publicApp!.getAuthCodeUrl(authCodeUrlParameters);
    await open(response);
  }
}
