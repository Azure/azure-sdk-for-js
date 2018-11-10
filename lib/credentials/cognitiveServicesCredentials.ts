// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ApiKeyCredentials } from "@azure/ms-rest-js";

/**
 * Creates a new CognitiveServicesCredentials object.
 *
 * @constructor
 * @param {string} subscriptionKey   The CognitiveServices subscription key
 */
export class CognitiveServicesCredentials extends ApiKeyCredentials {
  constructor(subscriptionKey: string) {
    if (!subscriptionKey || (subscriptionKey && typeof subscriptionKey.valueOf() !== "string")) {
      throw new Error("subscriptionKey cannot be null or undefined and must be of type string.");
    }

    const options = {
      inHeader: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "X-BingApis-SDK-Client": "node-SDK"
      }
    };
    super(options);
  }
}
