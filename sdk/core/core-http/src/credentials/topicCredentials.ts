// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiKeyCredentials, ApiKeyCredentialOptions } from "./apiKeyCredentials";

export class TopicCredentials extends ApiKeyCredentials {
  /**
   * Creates a new EventGrid TopicCredentials object.
   *
   * @constructor
   * @param {string} topicKey   The EventGrid topic key
   */
  constructor(topicKey: string) {
    if (!topicKey || (topicKey && typeof topicKey !== "string")) {
      throw new Error("topicKey cannot be null or undefined and must be of type string.");
    }
    const options: ApiKeyCredentialOptions = {
      inHeader: {
        "aeg-sas-key": topicKey
      }
    };
    super(options);
  }
}
