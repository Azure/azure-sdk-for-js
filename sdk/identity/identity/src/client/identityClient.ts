// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import jws from "jws";
import uuid from "uuid";
import {
  AccessToken,
  ServiceClient,
  ServiceClientOptions,
  GetTokenOptions,
  WebResource,
  RequestPrepareOptions,
  RestError
} from "@azure/core-http";
import { AuthenticationError } from "./errors";

const SelfSignedJwtLifetimeMins = 10;
const DefaultAuthorityHost = "https://login.microsoftonline.com";
const DefaultScopeSuffix = "/.default";
export const ImdsEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
export const ImdsApiVersion = "2018-02-01";
export const AppServiceMsiApiVersion = "2017-09-01";

export class IdentityClient extends ServiceClient {
  constructor(options?: IdentityClientOptions) {
    options = options || IdentityClient.getDefaultOptions();
    super(undefined, options);

    this.baseUri = options.authorityHost;
  }

  private createWebResource(requestOptions: RequestPrepareOptions): WebResource {
    const webResource = new WebResource();
    webResource.prepare(requestOptions);
    return webResource;
  }

  private async sendTokenRequest(
    webResource: WebResource,
    expiresOnParser?: (responseBody: any) => number,
  ): Promise<AccessToken | null> {
    const response = await this.sendRequest(webResource);

    expiresOnParser = expiresOnParser || ((responseBody: any) => {
      return Date.now() + responseBody.expires_in * 1000
    });

    if (response.status === 200 || response.status === 201) {
      return {
        token: response.parsedBody.access_token,
        expiresOnTimestamp: expiresOnParser(response.parsedBody)
      };
    } else {
      throw new AuthenticationError(response.status, response.bodyAsText);
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

  private dateInSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  private addMinutes(date: Date, minutes: number): Date {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
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

  private createAppServiceMsiAuthRequest(resource: string, clientId?: string): RequestPrepareOptions {
    const queryParameters: any = {
      resource,
      "api-version": AppServiceMsiApiVersion,
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

  private createCloudShellMsiAuthRequest(resource: string, clientId?: string): RequestPrepareOptions {
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

  private async pingImdsEndpoint(resource: string, clientId?: string): Promise<boolean> {
    const request = this.createImdsAuthRequest(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (request.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      delete request.headers.Metadata;
    }

    // Create a request with a 500 msec timeout since we expect that
    // not having a "Metadata" header should cause an error to be
    // returned quickly from the endpoint, proving its availability.
    const webResource = this.createWebResource(request);
    webResource.timeout = 500;

    try {
      await this.sendRequest(webResource);
    } catch (err) {
      if (err instanceof RestError && err.code === RestError.REQUEST_SEND_ERROR) {
        // Either request failed or IMDS endpoint isn't available
        return false;
      }
    }

    // If we received any response, the endpoint is available
    return true;
  }

  authenticateClientSecret(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    scopes: string | string[],
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const webResource = this.createWebResource({
      url: `${this.baseUri}/${tenantId}/oauth2/v2.0/token`,
      method: "POST",
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      body: qs.stringify({
        response_type: "token",
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      abortSignal: getTokenOptions && getTokenOptions.abortSignal
    });

    return this.sendTokenRequest(webResource);
  }

  async authenticateManagedIdentity(
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
          const m = requestBody.expires_on.match(/(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d):(\d\d) (\+|-)(\d\d):(\d\d)/)
          return Date.parse(`${m[3]}-${m[1]}-${m[2]}T${m[4]}:${m[5]}:${m[6]}${m[7]}${m[8]}:${m[9]}`)
        };
      } else {
        // Running in Cloud Shell
        authRequestOptions = this.createCloudShellMsiAuthRequest(resource, clientId);
      }
    } else {
      // Ping the IMDS endpoint to see if it's available
      if (!checkIfImdsEndpointAvailable || await this.pingImdsEndpoint(resource, clientId)) {
        // Running in an Azure VM
        authRequestOptions = this.createImdsAuthRequest(resource, clientId);
      } else {
        // Returning null tells the ManagedIdentityCredential that
        // no MSI authentication endpoints are available
        return null;
      }
    }

    const webResource = this.createWebResource({
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions && getTokenOptions.abortSignal,
      ...authRequestOptions
    });

    return this.sendTokenRequest(webResource, expiresInParser);
  }

  authenticateClientCertificate(
    tenantId: string,
    clientId: string,
    certificateString: string,
    certificateX5t: string,
    scopes: string | string[],
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const tokenId = uuid.v4();
    const audienceUrl = `${this.baseUri}/${tenantId}/oauth2/v2.0/token`;
    const header: jws.Header = {
      typ: "JWT",
      alg: "RS256",
      x5t: certificateX5t
    };

    const payload = {
      iss: clientId,
      sub: clientId,
      aud: audienceUrl,
      jti: tokenId,
      nbf: this.dateInSeconds(new Date()),
      exp: this.dateInSeconds(this.addMinutes(new Date(), SelfSignedJwtLifetimeMins))
    };

    const clientAssertion = jws.sign({
      header,
      payload,
      secret: certificateString
    });

    const webResource = this.createWebResource({
      url: audienceUrl,
      method: "POST",
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      body: qs.stringify({
        response_type: "token",
        grant_type: "client_credentials",
        client_id: clientId,
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: clientAssertion,
        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      abortSignal: getTokenOptions && getTokenOptions.abortSignal
    });

    return this.sendTokenRequest(webResource);
  }

  static getDefaultOptions(): IdentityClientOptions {
    return {
      authorityHost: DefaultAuthorityHost
    };
  }
}

export interface IdentityClientOptions extends ServiceClientOptions {
  authorityHost: string;
}
