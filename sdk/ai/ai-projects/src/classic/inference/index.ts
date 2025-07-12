// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureOpenAI } from "openai";
import { _getAzureOpenAIClient } from "../../api/inference/operations.js";
import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { ConnectionsOperations } from "../connections/index.js";
import type { AzureOpenAIClientOptions } from "../../api/inference/options.js";

/** Inference operations interface for AI projects. */
export interface InferenceOperations {
  /** Get Azure OpenAI client for making Azure OpenAI requests. */
  azureOpenAI: (options?: AzureOpenAIClientOptions) => Promise<AzureOpenAI>;
}

function _getInference(
  context: AIProjectContext,
  connections: ConnectionsOperations,
): InferenceOperations {
  return {
    azureOpenAI: (options?: AzureOpenAIClientOptions) =>
      _getAzureOpenAIClient(context, connections, options),
  };
}

export function _getInferenceOperations(
  context: AIProjectContext,
  connections: ConnectionsOperations,
): InferenceOperations {
  return {
    ..._getInference(context, connections),
  };
}
