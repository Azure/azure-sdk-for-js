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
import type { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import type { AIProjectContext as Client } from "../index.js";
import { AzureOpenAI } from "openai";
import { ApiKeyCredentials, Connection } from "../../models/models.js";
import { ConnectionsOperations } from "../../classic/index.js";
import type { AzureOpenAIClientOptions } from "./options.js";

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

/**
 * Get an authenticated AzureOpenAI client (from the `openai` package) for the default
 * Azure OpenAI connection (if `connectionName` is not specified), or from the Azure OpenAI
 * resource given by its connection name.
 *
 * @param context - The AIProjectContext used to construct the client.
 * @param connections - The ConnectionsOperations used to manage connections.
 * @param options - Optional parameters.
 * @returns An authenticated AzureOpenAI client.
 * @throws ResourceNotFoundError if an Azure OpenAI connection does not exist.
 * @throws Error if the connection name is an empty string.
 * @throws HttpResponseError for other HTTP-related errors.
 */
export async function _getAzureOpenAIClient(
  context: Client,
  connections: ConnectionsOperations,
  options?: AzureOpenAIClientOptions,
): Promise<AzureOpenAI> {
  // Validate connection name if provided
  if (options?.connectionName !== undefined && options.connectionName === "") {
    throw new Error("Connection name cannot be empty");
  }

  let connection: Connection;
  let connectionName = options?.connectionName;

  if (connectionName) {
    // Get the specific connection
    connection = await connections.get(connectionName, options?.connectionOptions);

    if (connection.type !== "AzureOpenAI") {
      throw new Error(`Connection '${connectionName}' is not of type Azure OpenAI.`);
    }
  } else {
    // If connection name was not specified, get the default Azure OpenAI connection
    const _connections: Connection[] = [];
    for await (const conn of connections.list({
      connectionType: "AzureOpenAI",
      defaultConnection: true,
    })) {
      _connections.push(conn);
    }

    if (_connections.length === 0) {
      throw new Error("No default Azure OpenAI connection found.");
    }

    connection = _connections[0];
    connectionName = connection.name;
  }

  // If the connection uses API key authentication, get connection with API key populated
  if (connection.credentials.authType === "ApiKey") {
    connection = await connections.getWithCredentials(
      connectionName,
      options?.connectionSecretOptions,
    );
  }

  // Format the endpoint URL
  const targetUrl = new URL(connection.target);
  const azureEndpoint = targetUrl.href.endsWith("/") ? targetUrl.href.slice(0, -1) : targetUrl.href;

  if (connection.credentials.authType === "ApiKey") {
    // Create client with API key authentication
    return new AzureOpenAI({
      apiKey: (connection.credentials as ApiKeyCredentials).apiKey,
      endpoint: azureEndpoint,
      apiVersion: options?.apiVersion,
    });
  } else if (connection.credentials.authType === "AAD") {
    // Create client with Entra ID authentication
    try {
      // Get token provider from the context credential
      return new AzureOpenAI({
        azureADTokenProvider: async () => {
          const token = await (context.getCredential() as TokenCredential).getToken(
            "https://cognitiveservices.azure.com/.default",
          );

          if (!token) {
            throw new Error("Failed to get token");
          }
          return token.token;
        },
        endpoint: azureEndpoint,
        apiVersion: options?.apiVersion,
      });
    } catch (e) {
      throw new Error(
        "Azure identity package not available or credential issue: " + JSON.stringify(e),
      );
    }
  } else {
    throw new Error(`Unsupported authentication type: ${connection.credentials.authType}`);
  }
}
