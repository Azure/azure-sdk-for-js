// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The options for configuring the Azure OpenAI client. */
export interface AzureOpenAIClientOptions {
  /** The API version to use for requests. */
  apiVersion?: string;
  /** The connection name to use for the Azure OpenAI client. */
  connectionName?: string;
}
