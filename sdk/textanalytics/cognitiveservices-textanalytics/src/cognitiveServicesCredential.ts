// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ApiKeyCredentials } from "@azure/core-http";

/**
 * Creates a new CognitiveServicesCredential object.
 *
 * @param {string} subscriptionKey   The CognitiveServices subscription key
 */
export class CognitiveServicesCredential extends ApiKeyCredentials {
  constructor(subscriptionKey: string) {
    if (!subscriptionKey || (subscriptionKey && typeof subscriptionKey.valueOf() !== "string")) {
      throw new Error("subscriptionKey cannot be null or undefined and must be of type string.");
    }

    const options = {
      inHeader: {
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    super(options);
  }
}
