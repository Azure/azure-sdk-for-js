// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import qs from "qs";
import {
  AccessToken,
  ServiceClient,
  ServiceClientOptions,
  GetTokenOptions,
  WebResource,
  RequestPrepareOptions
} from "@azure/core-http";

export class IdentityClient extends ServiceClient {
  private static readonly DefaultAuthorityHost = "https://login.microsoftonline.com/";
  private static readonly ImdsEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
  private static readonly MsiApiVersion = "2018-02-01";
  private static readonly DefaultScopeSuffix = "/.default";

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
    }

    return null;
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

    if (!scope.endsWith(IdentityClient.DefaultScopeSuffix)) {
      return scope;
    }

    return scope.substr(0, scope.lastIndexOf(IdentityClient.DefaultScopeSuffix));
  }

  async authenticate(
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
      "api-version": IdentityClient.MsiApiVersion
    };

    if (clientId) {
      queryParameters.client_id = clientId;
    }

    const webResource = this.createWebResource({
      url: IdentityClient.ImdsEndpoint,
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

  static getDefaultOptions(): IdentityClientOptions {
    return {
      authorityHost: IdentityClient.DefaultAuthorityHost
    };
  }
}

export interface IdentityClientOptions extends ServiceClientOptions {
  authorityHost: string;
}
