// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClient, TokenResponse, TokenCredentialOptions } from "../client/identityClient";
import { AuthenticationError, AuthenticationErrorName } from "../client/errors";
import { createSpan } from "../util/tracing";
import { delay } from "../util/delay";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from "../util/logging";

/**
 * An internal interface that contains the verbatim devicecode response.
 * This interface does not get exported from the public interface of the
 * library.
 */
export interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
  message: string;
}

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

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private clientId: string;
  private userPromptCallback: DeviceCodePromptCallback;
  private lastTokenResponse: TokenResponse | null = null;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name. 
   *                 'organizations' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param userPromptCallback A callback function that will be invoked to show
                               {@link DeviceCodeInfo} to the user.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string | "organizations",
    clientId: string,
    userPromptCallback: DeviceCodePromptCallback,
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.userPromptCallback = userPromptCallback;
  }

  private async sendDeviceCodeRequest(
    scope: string,
    options?: GetTokenOptions
  ): Promise<DeviceCodeResponse> {
    const { span, options: newOptions } = createSpan(
      "DeviceCodeCredential-sendDeviceCodeRequest",
      options
    );
    try {
      const webResource = this.identityClient.createWebResource({
        url: `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/devicecode`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify({
          client_id: this.clientId,
          scope
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        abortSignal: options && options.abortSignal,
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
      });

      logger.info("DeviceCodeCredential: sending devicecode request");

      const response = await this.identityClient.sendRequest(webResource);
      if (!(response.status === 200 || response.status === 201)) {
        throw new AuthenticationError(response.status, response.bodyAsText);
      }

      return response.parsedBody as DeviceCodeResponse;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;

      if (err.name === AuthenticationErrorName) {
        logger.warning(
          `DeviceCodeCredential: failed to authenticate ${
            (err as AuthenticationError).errorResponse.errorDescription
          }`
        );
      } else {
        logger.warning(`DeviceCodeCredential: failed to authenticate ${err}`);
      }

      span.setStatus({
        code,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }

  private async pollForToken(
    deviceCodeResponse: DeviceCodeResponse,
    options?: GetTokenOptions
  ): Promise<TokenResponse | null> {
    let tokenResponse: TokenResponse | null = null;
    const { span, options: newOptions } = createSpan("DeviceCodeCredential-pollForToken", options);

    try {
      const webResource = this.identityClient.createWebResource({
        url: `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/token`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          client_id: this.clientId,
          device_code: deviceCodeResponse.device_code
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        abortSignal: options && options.abortSignal,
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
      });

      while (tokenResponse === null) {
        try {
          await delay(deviceCodeResponse.interval * 1000);

          // Check the abort signal before sending the request
          if (options && options.abortSignal && options.abortSignal.aborted) {
            return null;
          }

          tokenResponse = await this.identityClient.sendTokenRequest(webResource);
        } catch (err) {
          if (err.name === AuthenticationErrorName) {
            switch (err.errorResponse.error) {
              case "authorization_pending":
                break;
              case "authorization_declined":
                return null;
              case "expired_token":
                throw err;
              case "bad_verification_code":
                throw err;
              default:
                // Any other error should be rethrown
                throw err;
            }
          } else {
            throw err;
          }
        }
      }

      return tokenResponse;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
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
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, options: newOptions } = createSpan("DeviceCodeCredential-getToken", options);
    try {
      let tokenResponse: TokenResponse | null = null;
      let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
      if (scopeString.indexOf("offline_access") < 0) {
        scopeString += " offline_access";
      }

      // Try to use the refresh token first
      if (this.lastTokenResponse && this.lastTokenResponse.refreshToken) {
        tokenResponse = await this.identityClient.refreshAccessToken(
          this.tenantId,
          this.clientId,
          scopeString,
          this.lastTokenResponse.refreshToken,
          undefined, // clientSecret not needed for device code auth
          undefined,
          newOptions
        );
      }

      if (tokenResponse === null) {
        const deviceCodeResponse = await this.sendDeviceCodeRequest(scopeString, newOptions);

        this.userPromptCallback({
          userCode: deviceCodeResponse.user_code,
          verificationUri: deviceCodeResponse.verification_uri,
          message: deviceCodeResponse.message
        });

        tokenResponse = await this.pollForToken(deviceCodeResponse, newOptions);
      }

      this.lastTokenResponse = tokenResponse;
      return (tokenResponse && tokenResponse.accessToken) || null;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }
}
