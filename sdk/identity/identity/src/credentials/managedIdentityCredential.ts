// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
import {
  AuthenticationErrorName,
  AuthenticationError,
  CredentialUnavailable
} from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";

const DefaultScopeSuffix = "/.default";
export const ImdsEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
export const ImdsApiVersion = "2018-02-01";
export const AppServiceMsiApiVersion = "2017-09-01";
const logger = credentialLogger("ManagedIdentityCredential");

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
        throw new Error(
          "To convert to a resource string the specified array must be exactly length 1"
        );
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
    clientId?: string,
    version?: "2019-08-01" | "2017-09-01"
  ): RequestPrepareOptions {
    const queryParameters: any = {
      resource,
      "api-version": AppServiceMsiApiVersion
    };

    if (version === "2019-08-01") {
      if (clientId) {
        queryParameters.client_id = clientId;
      }

      return {
        url: process.env.IDENTITY_ENDPOINT,
        method: "GET",
        queryParameters,
        headers: {
          Accept: "application/json",
          "X-IDENTITY-HEADER": process.env.IDENTITY_HEADER
        }
      };
    } else if (version === "2017-09-01") {
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
    } else {
      throw new Error(
        `Unsupported version ${version}. The supported versions are "2019-08-01" and "2017-09-01"`
      );
    }
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
        logger.info(`Pinging IMDS endpoint`);
        await this.identityClient.sendRequest(webResource);
      } catch (err) {
        if (
          (err instanceof RestError && err.code === RestError.REQUEST_SEND_ERROR) ||
          err.name === "AbortError" ||
          err.code === "ECONNREFUSED" || // connection refused
          err.code === "EHOSTDOWN" // host is down
        ) {
          // If the request failed, or NodeJS was unable to establish a connection,
          // or the host was down, we'll assume the IMDS endpoint isn't available.
          logger.info(`IMDS endpoint unavailable`);
          span.setStatus({
            code: CanonicalCode.UNAVAILABLE,
            message: err.message
          });
          return false;
        }
      }

      // If we received any response, the endpoint is available
      logger.info(`IMDS endpoint is available`);
      return true;
    } catch (err) {
      // createWebResource failed.
      // This error should bubble up to the user.
      logger.info(
        formatError(`Error when creating the WebResource for the IMDS endpoint: ${err.message}`)
      );
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
      if (process.env.IDENTITY_ENDPOINT && process.env.IDENTITY_HEADER) {
        // Running in App Service 2019-08-01
        authRequestOptions = this.createAppServiceMsiAuthRequest(resource, clientId, "2019-08-01");
        expiresInParser = (requestBody: any) => {
          // Parses a string representation of the seconds since epoch into a number value
          return Number(requestBody.expires_on);
        };
        logger.info(
          `Using the endpoint and the secret coming form the environment variables: IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT} and IDENTITY_HEADER=[REDACTED].`
        );
      } else if (process.env.MSI_ENDPOINT) {
        if (process.env.MSI_SECRET) {
          // Running in App Service
          authRequestOptions = this.createAppServiceMsiAuthRequest(
            resource,
            clientId,
            "2017-09-01"
          );
          expiresInParser = (requestBody: any) => {
            // Parse a date format like "06/20/2019 02:57:58 +00:00" and
            // convert it into a JavaScript-formatted date
            return Date.parse(requestBody.expires_on);
          };
          logger.info(
            `Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`
          );
        } else {
          logger.info(
            `Using the endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
          );
          // Running in Cloud Shell
          authRequestOptions = this.createCloudShellMsiAuthRequest(resource, clientId);
        }
      } else {
        expiresInParser = (requestBody: any) => {
          if (requestBody.expires_on) {
            // Use the expires_on timestamp if it's available
            const expires = +requestBody.expires_on * 1000;
            logger.info(
              `IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`
            );
            return expires;
          } else {
            // If these aren't possible, use expires_in and calculate a timestamp
            const expires = Date.now() + requestBody.expires_in * 1000;
            logger.info(
              `IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`
            );
            return expires;
          }
        };
        logger.info(
          `Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
        );
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
      // Expected errors to reach this point:
      // - When we try call createWebResource and it fails (at any point).
      // - When identityClient.sendTokenRequest throws.
      //   If the status code was 400, it means that the endpoint is working,
      //   but no identity is available.
      //
      // Errors that might reach this point, but shouldn't:
      // - When createAppServiceMsiAuthRequest is called with an unsupported version.
      //   We shouldn't see this happening, because we specify the version in the parameters.
      //
      // Errors that shouldn't reach this point at all:
      // - If we tried to reach to the IMDS endpoint and it ends up being unavailable, we simply don't call to createImdsAuthRequest, so we return null.

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
      // If it's null, it means we don't yet know whether
      // the endpoint is available and need to check for it.
      if (this.isEndpointUnavailable !== true) {
        result = await this.authenticateManagedIdentity(
          scopes,
          this.isEndpointUnavailable === null,
          this.clientId,
          newOptions
        );

        if (result === null) {
          // If authenticateManagedIdentity returns null,
          // it means no MSI endpoints are available.
          // If so, we avoid trying to reach to them in future requests.
          this.isEndpointUnavailable = true;

          // It also means that the endpoint answered with either 200 or 201 (see the sendTokenRequest method),
          // yet we had no access token. For this reason, we'll throw once with a specific message:
          const error = new CredentialUnavailable(
            "The managed identity endpoint was reached, yet no tokens were received."
          );
          logger.getToken.info(formatError(error));
          throw error;
        }

        // Since `authenticateManagedIdentity` didn't throw, and the result was not null,
        // We will assume that this endpoint is reachable from this point forward,
        // and avoid pinging again to it.
        // Details:
        // - If `isEndpointUnavailable` is not true, `authenticateManagedIdentity` is called.
        // - If `isEndpointUnavailable` is only set to false if `authenticateManagedIdentity` returns null.
        // - If `isEndpointUnavailable` is null, `authenticateManagedIdentity` wil be called with "true" as the second parameter.
        // - When `authenticateManagedIdentity` is called with `checkIfImdsEndpointAvailable` set to "true", `pingImdsEndpoint` is called.
        // - If `pingImdsEndpoint` returns false, `authenticateManagedIdentity` returns null, which sets `isEndpointUnavailable` to false.
        // - If `pingImdsEndpoint` returns true, `authenticateManagedIdentity` tries to authenticate with the IMDS endpoint.
        // - If `authenticateManagedIdentity` tries to authenticate, and throws, we move to the catch section of this function.
        // - If `authenticateManagedIdentity` manages to authenticate, `result` won't be null.
        // - If `result` isn't null at this point, the endpoint was in fact available at first.
        // - To avoid calling again to `pingImdsEndpoint`, we need to set `isEndpointUnavailable` to false,
        //   so that `authenticateManagedIdentity` gets to be called with `checkIfImdsEndpointAvailable` set to "false",
        //   thus skipping any further call to `pingImdsEndpoint`.
        this.isEndpointUnavailable = false;
      } else {
        // We've previously determined that the endpoint was unavailable,
        // either because it was unreachable or permanently unable to authenticate.
        const error = new CredentialUnavailable(
          "The managed identity endpoint is not currently available"
        );
        logger.getToken.info(formatError(error));
        throw error;
      }

      logger.getToken.info(formatSuccess(scopes));
      return result;
    } catch (err) {
      // CredentialUnavailable errors are expected to reach here.
      // We intend them to bubble up, so that DefaultAzureCredential can catch them.
      if (err instanceof CredentialUnavailable) {
        throw err;
      }

      // Expected errors to reach this point:
      // - Errors coming from a method unexpectedly breaking.
      // - When identityClient.sendTokenRequest throws, in which case
      //   if the status code was 400, it means that the endpoint is working,
      //   but no identity is available.

      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });

      if (err.code === "ENETUNREACH") {
        const error = new CredentialUnavailable(
          "ManagedIdentityCredential is unavailable. No managed identity endpoint found."
        );

        logger.getToken.info(formatError(error));
        throw error;
      }

      // If err.statusCode has a value of 400, it comes from sendTokenRequest,
      // and it means that the endpoint is working, but that no identity is available.
      if (err.statusCode === 400) {
        throw new CredentialUnavailable(
          "The managed identity endpoint is indicating there's no available identity"
        );
      }

      throw new AuthenticationError(err.statusCode, {
        error: "ManagedIdentityCredential authentication failed.",
        error_description: err.message
      });
    } finally {
      // Finally is always called, both if we return and if we throw in the above try/catch.
      span.end();
    }
  }
}
