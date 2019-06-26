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
  RequestPrepareOptions
} from "@azure/core-http";
import { AuthenticationError } from "./errors";

const SelfSignedJwtLifetimeMins = 10;
const DefaultAuthorityHost = "https://login.microsoftonline.com";
const ImdsEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
const MsiApiVersion = "2018-02-01";
const DefaultScopeSuffix = "/.default";

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
    requestOptions: RequestPrepareOptions
  ): Promise<AccessToken | null> {
    const response = await this.sendRequest(requestOptions);
    if (response.status === 200 || response.status === 201) {
      return {
        token: response.parsedBody.access_token,
        expiresOnTimestamp: Date.now() + response.parsedBody.expires_in * 1000
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

  authenticateManagedIdentity(
    scopes: string | string[],
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const queryParameters: any = {
      resource: this.mapScopesToResource(scopes),
      "api-version": MsiApiVersion
    };

    if (clientId) {
      queryParameters.client_id = clientId;
    }

    const webResource = this.createWebResource({
      url: ImdsEndpoint,
      method: "GET",
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      queryParameters,
      headers: {
        Accept: "application/json",
        Metadata: true
      },
      abortSignal: getTokenOptions && getTokenOptions.abortSignal
    });

    return this.sendTokenRequest(webResource);
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
