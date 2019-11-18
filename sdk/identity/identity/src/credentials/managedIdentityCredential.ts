// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import {
  AccessToken,
  GetTokenOptions,
  RequestPrepareOptions,
  RestError,
  TokenCredential
} from "@azure/core-http";
import { IdentityClient, TokenCredentialOptions } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from "../util/logging";

const DefaultScopeSuffix = "/.default";
export const ImdsEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
export const ImdsApiVersion = "2018-02-01";
export const AppServiceMsiApiVersion = "2017-09-01";

/**
 * Attempts authentication using a managed identity that has been assigned
 * to the deployment environment.  This authentication type works in Azure VMs,
 * App Service and Azure Functions applications, and inside of Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private clientId: string | undefined;
  private isEndpointUnavailable: boolean | null = null;

  /**
   * Creates an instance of ManagedIdentityCredential with the client ID of a
   * user-assigned identity.
   *
   * @param clientId The client ID of the user-assigned identity.
   * @param options Options for configuring the client which makes the access token request.
   */
  constructor(clientId: string, options?: TokenCredentialOptions);
  /**
   * Creates an instance of ManagedIdentityCredential
   *
   * @param options Options for configuring the client which makes the access token request.
   */
  constructor(options?: TokenCredentialOptions);
  /**
   * @internal
   * @ignore
   */
  constructor(
    clientIdOrOptions: string | TokenCredentialOptions | undefined,
    options?: TokenCredentialOptions
  ) {
    if (typeof clientIdOrOptions === "string") {
      // clientId, options constructor
      this.clientId = clientIdOrOptions;
      this.identityClient = new IdentityClient(options);
    } else {
      // options only constructor
      this.identityClient = new IdentityClient(clientIdOrOptions);
    }
  }

  private mapScopesToResource(scopes: string | string[]): string {
    let scope = "";
    if (Array.isArray(scopes)) {
      if (scopes.length !== 1) {
        throw "To convert to a resource string the specified array must be exactly length 1";
      }

      scope = scopes[0];
    } else if (typeof scopes === "string") {
      scope = scopes;
    }

    if (!scope.endsWith(DefaultScopeSuffix)) {
      return scope;
    }

    return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
  }

  private createImdsAuthRequest(resource: string, clientId?: string): RequestPrepareOptions {
    const queryParameters: any = {
      resource,
      "api-version": ImdsApiVersion
    };

    if (clientId) {
      queryParameters.client_id = clientId;
    }

    return {
      url: ImdsEndpoint,
      method: "GET",
      queryParameters,
      headers: {
        Accept: "application/json",
        Metadata: true
      }
    };
  }

  private createAppServiceMsiAuthRequest(
    resource: string,
    clientId?: string
  ): RequestPrepareOptions {
    const queryParameters: any = {
      resource,
      "api-version": AppServiceMsiApiVersion
    };

    if (clientId) {
      queryParameters.clientid = clientId;
    }

    return {
      url: process.env.MSI_ENDPOINT,
      method: "GET",
      queryParameters,
      headers: {
        Accept: "application/json",
        secret: process.env.MSI_SECRET
      }
    };
  }

  private createCloudShellMsiAuthRequest(
    resource: string,
    clientId?: string
  ): RequestPrepareOptions {
    const body: any = {
      resource
    };

    if (clientId) {
      body.client_id = clientId;
    }

    return {
      url: process.env.MSI_ENDPOINT,
      method: "POST",
      body: qs.stringify(body),
      headers: {
        Accept: "application/json",
        Metadata: true,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
  }

  private async pingImdsEndpoint(
    resource: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean> {
    const { span, options } = createSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions
    );
    const request = this.createImdsAuthRequest(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (request.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      delete request.headers.Metadata;
    }

    request.spanOptions = options.tracingOptions && options.tracingOptions.spanOptions;

    try {
      // Create a request with a timeout since we expect that
      // not having a "Metadata" header should cause an error to be
      // returned quickly from the endpoint, proving its availability.
      const webResource = this.identityClient.createWebResource(request);
      webResource.timeout = (options.requestOptions && options.requestOptions.timeout) || 500;

      try {
        logger.info(`ManagedIdentityCredential: pinging IMDS endpoint`);
        await this.identityClient.sendRequest(webResource);
      } catch (err) {
        if (
          (err instanceof RestError && err.code === RestError.REQUEST_SEND_ERROR) ||
          err.name === "AbortError"
        ) {
          // Either request failed or IMDS endpoint isn't available
          logger.info(`ManagedIdentityCredential: IMDS endpoint unavailable`);
          span.setStatus({
            code: CanonicalCode.UNAVAILABLE,
            message: err.message
          });
          return false;
        }
      }

      // If we received any response, the endpoint is available
      logger.info(`ManagedIdentityCredential: IMDS endpoint is available`);
      return true;
    } catch (err) {
      logger.warning(`ManagedIdentityCredential: error when accessing IMDS endpoint: ${err}`);
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }

  private async authenticateManagedIdentity(
    scopes: string | string[],
    checkIfImdsEndpointAvailable: boolean,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let authRequestOptions: RequestPrepareOptions;
    const resource = this.mapScopesToResource(scopes);
    let expiresInParser: ((requestBody: any) => number) | undefined;

    const { span, options } = createSpan(
      "ManagedIdentityCredential-authenticateManagedIdentity",
      getTokenOptions
    );

    try {
      // Detect which type of environment we are running in
      if (process.env.MSI_ENDPOINT) {
        if (process.env.MSI_SECRET) {
          // Running in App Service
          authRequestOptions = this.createAppServiceMsiAuthRequest(resource, clientId);
          expiresInParser = (requestBody: any) => {
            // Parse a date format like "06/20/2019 02:57:58 +00:00" and
            // convert it into a JavaScript-formatted date
            return Date.parse(requestBody.expires_on);
          };
        } else {
          // Running in Cloud Shell
          authRequestOptions = this.createCloudShellMsiAuthRequest(resource, clientId);
        }
      } else {
        // Ping the IMDS endpoint to see if it's available
        if (
          !checkIfImdsEndpointAvailable ||
          (await this.pingImdsEndpoint(resource, clientId, options))
        ) {
          // Running in an Azure VM
          authRequestOptions = this.createImdsAuthRequest(resource, clientId);
        } else {
          // Returning null tells the ManagedIdentityCredential that
          // no MSI authentication endpoints are available
          return null;
        }
      }

      const webResource = this.identityClient.createWebResource({
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        abortSignal: options.abortSignal,
        spanOptions: options.tracingOptions && options.tracingOptions.spanOptions,
        ...authRequestOptions
      });

      const tokenResponse = await this.identityClient.sendTokenRequest(
        webResource,
        expiresInParser
      );
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
    let result: AccessToken | null = null;

    const { span, options: newOptions } = createSpan("ManagedIdentityCredential-getToken", options);

    try {
      // isEndpointAvailable can be true, false, or null,
      // the latter indicating that we don't yet know whether
      // the endpoint is available and need to check for it.
      if (this.isEndpointUnavailable !== true) {
        result = await this.authenticateManagedIdentity(
          scopes,
          this.isEndpointUnavailable === null,
          this.clientId,
          newOptions
        );

        // If authenticateManagedIdentity returns null, it means no MSI
        // endpoints are available.  In this case, don't try them in future
        // requests.
        this.isEndpointUnavailable = result === null;
      }

      return result;
    } catch (err) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }
}
