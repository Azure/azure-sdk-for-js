// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions as OpenAIClientOptions } from "openai";

interface AzureAgentConfig {
  allowPreview: boolean;
  agentName: string;
}

interface OpenAIClientOptionsWithAzureAgent extends OpenAIClientOptions {
  azureConfig?: AzureAgentConfig;
}

export type { AzureAgentConfig, OpenAIClientOptionsWithAzureAgent };
