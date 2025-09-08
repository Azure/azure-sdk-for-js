// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConnectionsGetOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
} from "../connections/options.js";

/** The options for configuring the Azure OpenAI client. */
export interface AzureOpenAIClientOptions {
  /**
   * The Azure OpenAI api-version to use when creating the client.
   *  See "Data plane - Inference" row in the table at
   *  https://learn.microsoft.com/azure/ai-foundry/openai/reference#api-specs. If not provided,
   *  you must set the environment variable `OPENAI_API_VERSION` instead.
   */
  apiVersion?: string;
  /**  The name of a connection to an Azure OpenAI resource in your AI Foundry project. If not provided, the default Azure OpenAI connection will be used. */
  connectionName?: string;
  /** The connection options to use for the Azure OpenAI connection. */
  connectionOptions?: ConnectionsGetOptionalParams;
  /** The connection secret options to use for the Azure OpenAI client. */
  connectionSecretOptions?: ConnectionsGetWithCredentialsOptionalParams;
}

/** Options for getting the Azure OpenAI client. */
export interface GetAzureOpenAIClientOptions extends AzureOpenAIClientOptions {}
