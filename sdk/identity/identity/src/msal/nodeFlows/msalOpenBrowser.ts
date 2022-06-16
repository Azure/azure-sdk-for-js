// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";

import { AccessToken } from "@azure/core-auth";

import { Socket } from "net";
import http from "http";
import open from "open";
import stoppable from "stoppable";

import { credentialLogger, formatError, formatSuccess } from "../../util/logging";
import { CredentialUnavailableError } from "../../errors";
import { MsalNodeOptions, MsalNode } from "./msalNodeCommon";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { msalToPublic } from "../utils";

/**
 * Options that can be passed to configure MSAL to handle authentication through opening a browser window.
 * @internal
 */
export interface MSALOpenBrowserOptions extends MsalNodeOptions {
  redirectUri: string;
  loginHint?: string;
}

/**
 * A call to open(), but mockable
 * @internal
 */
export const interactiveBrowserMockable = {
  open,
};

/**
 * This MSAL client sets up a web server to listen for redirect callbacks, then calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`
 * to trigger the authentication flow, and then respond based on the values obtained from the redirect callback
 * @internal
 */
export class MsalOpenBrowser extends MsalNode {
  private redirectUri: string;
  private port: number;
  private hostname: string;
  private loginHint?: string;

  constructor(options: MSALOpenBrowserOptions) {
    super(options);
    this.logger = credentialLogger("Node.js MSAL Open Browser");
    this.redirectUri = options.redirectUri;
    this.loginHint = options.loginHint;

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

  protected doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
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
        } catch (e: any) {
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
          scopes: scopes,
          authority: options?.authority,
          codeVerifier: this.pkceCodes?.verifier,
        };

        this.acquireTokenByCode(tokenRequest)
          .then((authResponse) => {
            if (authResponse?.account) {
              this.account = msalToPublic(this.clientId, authResponse.account);
            }
            const successMessage = `Authentication Complete. You can close the browser and return to the application.`;
            if (authResponse && authResponse.expiresOn) {
              const expiresOnTimestamp = authResponse?.expiresOn.valueOf();
              res.writeHead(200);
              res.end(successMessage);
              this.logger.getToken.info(formatSuccess(scopes));

              resolve({
                expiresOnTimestamp,
                token: authResponse.accessToken,
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
      const server = stoppable(app);

      const listen = app.listen(this.port, this.hostname, () =>
        this.logger.info(`InteractiveBrowserCredential listening on port ${this.port}!`)
      );

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

      app.on("connection", (socket) => socketToDestroy.push(socket));

      app.on("error", (err) => {
        cleanup();
        const code = (err as any).code;
        if (code === "EACCES" || code === "EADDRINUSE") {
          reject(
            new CredentialUnavailableError(
              [
                `InteractiveBrowserCredential: Access denied to port ${this.port}.`,
                `Try sending a redirect URI with a different port, as follows:`,
                '`new InteractiveBrowserCredential({ redirectUri: "http://localhost:1337" })`',
              ].join(" ")
            )
          );
        } else {
          reject(
            new CredentialUnavailableError(
              `InteractiveBrowserCredential: Failed to start the necessary web server. Error: ${err.message}`
            )
          );
        }
      });

      app.on("listening", () => {
        const openPromise = this.openAuthCodeUrl(scopes, options);

        const abortSignal = options?.abortSignal;
        if (abortSignal) {
          abortSignal.addEventListener("abort", () => {
            cleanup();
            reject(new Error("Aborted"));
          });
        }

        openPromise.then().catch((e) => {
          cleanup();
          reject(e);
        });
      });
    });
  }

  private pkceCodes?: {
    verifier: string;
    challenge: string;
  };

  private async openAuthCodeUrl(
    scopeArray: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<void> {
    // Initialize CryptoProvider instance
    const cryptoProvider = new msalNode.CryptoProvider();
    // Generate PKCE Codes before starting the authorization flow
    this.pkceCodes = await cryptoProvider.generatePkceCodes();

    const authCodeUrlParameters: msalNode.AuthorizationUrlRequest = {
      scopes: scopeArray,
      correlationId: options?.correlationId,
      redirectUri: this.redirectUri,
      authority: options?.authority,
      claims: options?.claims,
      loginHint: this.loginHint,
      codeChallenge: this.pkceCodes.challenge,
      codeChallengeMethod: "S256", // Use SHA256 Algorithm
    };

    const response = await this.publicApp!.getAuthCodeUrl(authCodeUrlParameters);

    try {
      // A new instance on macOS only which allows it to not hang, does not fix the issue on linux
      await interactiveBrowserMockable.open(response, { wait: true, newInstance: true });
    } catch (e: any) {
      throw new CredentialUnavailableError(
        `InteractiveBrowserCredential: Could not open a browser window. Error: ${e.message}`
      );
    }
  }
}
