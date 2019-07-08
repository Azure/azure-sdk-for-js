// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccessToken,
  ServiceClient,
  ServiceClientOptions,
  WebResource,
  RequestPrepareOptions
} from "@azure/core-http";
import { AuthenticationError } from "./errors";

const DefaultAuthorityHost = "https://login.microsoftonline.com";

export class IdentityClient extends ServiceClient {
  public authorityHost: string;

  constructor(options?: IdentityClientOptions) {
    options = options || IdentityClient.getDefaultOptions();
    super(undefined, options);

    this.baseUri = this.authorityHost = options.authorityHost;
  }

  createWebResource(requestOptions: RequestPrepareOptions): WebResource {
    const webResource = new WebResource();
    webResource.prepare(requestOptions);
    return webResource;
  }

  async sendTokenRequest(
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

  static getDefaultOptions(): IdentityClientOptions {
    return {
      authorityHost: DefaultAuthorityHost
    };
  }
}

export interface IdentityClientOptions extends ServiceClientOptions {
  authorityHost: string;
}
