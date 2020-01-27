// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClientCredentials, WebResource } from "@azure/core-http";

const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";

/**
 * This class is used to authenticate to Text Analytics using an API Key retrieved
 * from the Azure portal. Sometimes this is referred to as a "Subscription Key".
 */
export class TextAnalyticsApiKeyCredential implements ServiceClientCredentials {
  /**
   * Used to authenticate to Text Analytics
   */
  private apiKey!: string;

  /**
   * Creates a new apiKeyCredential object.
   *
   * @param {string} apiKey   The Text Analytics API key for authentication.
   */
  constructor(apiKey: string) {
    this.updateKey(apiKey);
  }

  /**
   * Updates the API Key used for authentication. Use this method to roll credentials.
   * @param apiKey The Text Analytics API key for authentication.
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
