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
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

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

  constructor(clientId?: string, options?: IdentityClientOptions) {
    this.identityClient = new IdentityClient(options);
    this.clientId = clientId;
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
      queryParameters.client_id = clientId;
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
    timeout?: number
  ): Promise<boolean> {
    const request = this.createImdsAuthRequest(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (request.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      delete request.headers.Metadata;
    }

    // Create a request with a timeout since we expect that
    // not having a "Metadata" header should cause an error to be
    // returned quickly from the endpoint, proving its availability.
    const webResource = this.identityClient.createWebResource(request);
    if (timeout) {
      webResource.timeout = timeout;
    } else {
      webResource.timeout = 500;
    }

    try {
      await this.identityClient.sendRequest(webResource);
    } catch (err) {
      if (
        err instanceof RestError &&
        (err.code === RestError.REQUEST_SEND_ERROR || err.code === RestError.REQUEST_ABORTED_ERROR)
      ) {
        // Either request failed or IMDS endpoint isn't available
        return false;
      }
    }

    // If we received any response, the endpoint is available
    return true;
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

    // Detect which type of environment we are running in
    if (process.env.MSI_ENDPOINT) {
      if (process.env.MSI_SECRET) {
        // Running in App Service
        authRequestOptions = this.createAppServiceMsiAuthRequest(resource, clientId);
        expiresInParser = (requestBody: any) => {
          // Parse a date format like "06/20/2019 02:57:58 +00:00" and
          // convert it into a JavaScript-formatted date
          const m = requestBody.expires_on.match(
            /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d):(\d\d) (\+|-)(\d\d):(\d\d)/
          );
          return Date.parse(
            `${m[3]}-${m[1]}-${m[2]}T${m[4]}:${m[5]}:${m[6]}${m[7]}${m[8]}:${m[9]}`
          );
        };
      } else {
        // Running in Cloud Shell
        authRequestOptions = this.createCloudShellMsiAuthRequest(resource, clientId);
      }
    } else {
      // Ping the IMDS endpoint to see if it's available
      if (
        !checkIfImdsEndpointAvailable ||
        (await this.pingImdsEndpoint(
          resource,
          clientId,
          getTokenOptions ? getTokenOptions.timeout : undefined
        ))
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
      abortSignal: getTokenOptions && getTokenOptions.abortSignal,
      ...authRequestOptions
    });

    const tokenResponse = await this.identityClient.sendTokenRequest(webResource, expiresInParser);
    return (tokenResponse && tokenResponse.accessToken) || null;
  }

  /**
   * Authenticates with Azure Active Directory and returns an {@link AccessToken} if
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

    // isEndpointAvailable can be true, false, or null,
    // the latter indicating that we don't yet know whether
    // the endpoint is available and need to check for it.
    if (this.isEndpointUnavailable !== true) {
      result = await this.authenticateManagedIdentity(
        scopes,
        this.isEndpointUnavailable === null,
        this.clientId,
        options
      );

      // If authenticateManagedIdentity returns null, it means no MSI
      // endpoints are available.  In this case, don't try them in future
      // requests.
      this.isEndpointUnavailable = result === null;
    }

    return result;
  }
}
