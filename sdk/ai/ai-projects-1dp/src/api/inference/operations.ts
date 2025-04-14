// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable tsdoc/syntax */

import createModelClient from "@azure-rest/ai-inference";
import type {
  GetChatCompletions,
  GetEmbeddings,
  GetImageEmbeddings,
  ModelClient,
  ModelClientOptions,
} from "@azure-rest/ai-inference";
import type { AzureKeyCredential } from "@azure/core-auth";
import type { AIProjectContext as Client } from "../index.js";

/**
 * Converts an input URL in the format:
 * https://<host-name>/<some-path>
 * to:
 * https://<host-name>/api/models
 *
 * @param url - The input endpoint URL used to construct AIProjectClient.
 * @returns The endpoint URL required to construct inference clients from the @azure-rest/ai-inference package.
 * @throws Error if the URL is not a valid HTTPS URL with a host.
 */
export function _getInferenceURL(url: string): string {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:" || !parsedUrl.hostname) {
      throw new Error("Invalid endpoint URL format. Must be an https URL with a host.");
    }

    return `https://${parsedUrl.hostname}/api/models`;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Invalid URL format. Please provide a valid URL.");
    }
    throw error;
  }
}

/**
 * a generic function to get the inference client for making inference requests.
 * @param context - The AIProjectContext used to construct the client.
 * @param options - Optional parameters for the model client.
 * @returns The ModelClient instance for making inference requests.
 */
export function _getInferenceClient(context: Client, options?: ModelClientOptions): ModelClient {
  const url = _getInferenceURL(context.getEndpointUrl());
  const credential = context.getCredential() as AzureKeyCredential;
  const USER_AGENT_APP_ID = "AIProjectClient";
  const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix
    ? `${options.userAgentOptions.userAgentPrefix}-${USER_AGENT_APP_ID}`
    : USER_AGENT_APP_ID;
  const client = createModelClient(url, credential, {
    apiVersion: context.apiVersion,
    ...options,
    userAgentOptions: {
      ...options?.userAgentOptions,
      userAgentPrefix,
    },
  });
  return client;
}

/**
 * Get the chat completions client for making chat completion requests.
 * @param context - The AIProjectContext used to construct the client.
 * @param options - Optional parameters for the model client.
 * @returns The GetChatCompletions instance for making chat completion requests.
 */
export function _getChatCompletionsClient(
  context: Client,
  options?: ModelClientOptions,
): GetChatCompletions {
  const inferenceClient = _getInferenceClient(context, options);
  const chatCompletionsClient = inferenceClient.path("/chat/completions");
  return chatCompletionsClient;
}

/**
 * Get the embedding client for making embedding requests.
 * @param context - The AIProjectContext used to construct the client.
 * @param options - Optional parameters for the model client.
 * @returns The GetEmbeddings instance for making embedding requests.
 */
export function _getEmbeddingClient(context: Client, options?: ModelClientOptions): GetEmbeddings {
  const inferenceClient = _getInferenceClient(context, options);
  const embeddingClient = inferenceClient.path("/embeddings");
  return embeddingClient;
}

/**
 * Get the image embedding client for making image embedding requests.
 * @param context - The AIProjectContext used to construct the client.
 * @param options - Optional parameters for the model client.
 * @returns The GetImageEmbeddings instance for making image embedding requests.
 */
export function _getImageEmbeddingClient(
  context: Client,
  options?: ModelClientOptions,
): GetImageEmbeddings {
  const inferenceClient = _getInferenceClient(context, options);
  const imageEmbeddingClient = inferenceClient.path("/images/embeddings");
  return imageEmbeddingClient;
}
