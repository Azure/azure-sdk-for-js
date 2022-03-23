// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ApiKeyCredentialOptions, ApiKeyCredentials } from "./apiKeyCredentials";

/**
 * A {@link TopicCredentials} object used for Azure Event Grid.
 */
export class TopicCredentials extends ApiKeyCredentials {
  /**
   * Creates a new EventGrid TopicCredentials object.
   *
   * @param topicKey - The EventGrid topic key
   */
  constructor(topicKey: string) {
    if (!topicKey || (topicKey && typeof topicKey !== "string")) {
      throw new Error("topicKey cannot be null or undefined and must be of type string.");
    }
    const options: ApiKeyCredentialOptions = {
      inHeader: {
        "aeg-sas-key": topicKey,
      },
    };
    super(options);
  }
}
