// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions as OpenAIClientOptions } from "openai";

/**
 * Configuration options for agent endpoint of getOpenAIClient method. Mainly used for hosted agents.
 */

interface AzureAgentConfig {
  allowPreview: boolean;
  agentName: string;
}

/**
 * Extended OpenAI client options to include Azure Agent endpoint configuration.
 */
interface OpenAIClientOptionsWithAzureAgent extends OpenAIClientOptions {
  /**
   * Azure Agent endpoint configuration.
   */
  azureConfig?: AzureAgentConfig;
}

export type { AzureAgentConfig, OpenAIClientOptionsWithAzureAgent };
