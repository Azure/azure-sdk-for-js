// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ServiceClientCredentials, WebResource } from "@azure/core-http";

const SUBSCRIPTION_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";

/**
 * This class is used to authenticate to Text Analytics using a Subscription Key retrieved
 * from the Azure portal.
 */
export class SubscriptionKeyCredential implements ServiceClientCredentials {
  /**
   * Used to authenticate to Text Analytics
   */
  private subscriptionKey!: string;

  /**
   * Creates a new SubscriptionKeyCredential object.
   *
   * @param {string} subscriptionKey   The Text Analytics subscription key for authentication.
   */
  constructor(subscriptionKey: string) {
    this.updateKey(subscriptionKey);
  }

  /**
   * Updates the Subscription Key used for authentication. Use this method to roll credentials.
   * @param subscriptionKey The Text Analytics subscription key for authentication.
   */
  public updateKey(subscriptionKey: string): void {
    if (!subscriptionKey || typeof subscriptionKey !== "string") {
      throw new Error("subscriptionKey must be a non-empty string");
    }

    this.subscriptionKey = subscriptionKey;
  }

  /**
   * Signs a request with the provided Subscription Key.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  public async signRequest(webResource: WebResource): Promise<WebResource> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined.");
    }

    webResource.headers.set(SUBSCRIPTION_KEY_HEADER_NAME, this.subscriptionKey);
    return webResource;
  }
}
