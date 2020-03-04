// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClientCredentials, WebResource } from "@azure/core-http";

const API_KEY_HEADER_NAME = "api-key";

/**
 * This class is used to authenticate to Search using an API Key retrieved
 * from the Azure portal.
 */
export class SearchApiKeyCredential implements ServiceClientCredentials {
  /**
   * Used to authenticate to Search
   */
  private apiKey!: string;

  /**
   * Creates a new SearchApiKeyCredential object.
   *
   * @param {string} apiKey   The Search API key for authentication.
   */
  constructor(apiKey: string) {
    this.updateKey(apiKey);
  }

  /**
   * Updates the API Key used for authentication. Use this method to roll credentials.
   * @param apiKey The Search API key for authentication.
   */
  public updateKey(apiKey: string): void {
    if (!apiKey || typeof apiKey !== "string") {
      throw new Error("apiKey must be a non-empty string");
    }

    this.apiKey = apiKey;
  }

  /* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */
  /**
   * Signs a request with the provided API Key.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  public async signRequest(webResource: WebResource): Promise<WebResource> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined.");
    }

    webResource.headers.set(API_KEY_HEADER_NAME, this.apiKey);
    return webResource;
  }
}
/* eslint-enable @azure/azure-sdk/ts-use-interface-parameters */
