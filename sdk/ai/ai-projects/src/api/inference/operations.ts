// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable tsdoc/syntax */

import type { TokenCredential } from "@azure/core-auth";
import { getBearerTokenProvider } from "@azure/identity";
import type { AIProjectContext as Client } from "../index.js";
import { AzureOpenAI } from "openai";
import { ApiKeyCredentials } from "../../models/models.js";
import { ConnectionsOperations } from "../../classic/index.js";
import type { AzureOpenAIClientOptions } from "./options.js";

/**
 * Converts an input URL in the format:
 * https://<host-name>/<some-path>
 * to:
 * https://<host-name>
 *
 * @param url - The input endpoint URL used to construct AIProjectClient.
 * @returns The endpoint URL required to construct an AzureOpenAI client.
 * @throws Error if the input URL format is invalid.
 */
function _getAoaiInferenceUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" || !parsedUrl.hostname) {
      throw new Error("Invalid endpoint URL format. Must be an https URL with a host.");
    }
    return `https://${parsedUrl.hostname}`;
  } catch (e) {
    // Catches errors from URL constructor (e.g., invalid URL)
    throw new Error(
      `Invalid endpoint URL format: ${url}. ${e instanceof Error ? e.message : String(e)}`,
    );
  }
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
  if (options?.connectionName === "") {
    throw new Error("Connection name cannot be empty");
  }

  const connectionName = options?.connectionName;

  if (connectionName) {
    // Get the specific connection
    const connection = await connections.getWithCredentials(
      connectionName,
      options?.connectionOptions,
    );

    if (connection.type !== "AzureOpenAI") {
      throw new Error(`Connection '${connectionName}' is not of type Azure OpenAI.`);
    }

    // Format the endpoint URL
    const targetUrl = new URL(connection.target);
    const azureEndpoint = targetUrl.href.endsWith("/")
      ? targetUrl.href.slice(0, -1)
      : targetUrl.href;
    if (connection.credentials.type === "ApiKey") {
      const apiKeyCredential = connection.credentials as ApiKeyCredentials;
      return new AzureOpenAI({
        apiKey: apiKeyCredential.apiKey,
        endpoint: azureEndpoint,
        apiVersion: options?.apiVersion,
      });
    } else if (connection.credentials.type === "AAD") {
      const tokenCredential = context.getCredential() as TokenCredential;
      return new AzureOpenAI({
        azureADTokenProvider: async () => {
          const getAccessToken = getBearerTokenProvider(
            tokenCredential,
            "https://cognitiveservices.azure.com/.default",
          );
          const token = await getAccessToken();
          return token;
        },
        endpoint: azureEndpoint,
        apiVersion: options?.apiVersion,
      });
    } else {
      throw new Error(
        `Unsupported authentication type '${connection.credentials.type || "unknown"}' for connection '${connectionName}'.`,
      );
    }
  } else {
    const azureEndpoint = _getAoaiInferenceUrl(context.getEndpointUrl());
    const tokenCredential = context.getCredential() as TokenCredential;
    return new AzureOpenAI({
      azureADTokenProvider: async () => {
        const getAccessToken = getBearerTokenProvider(
          tokenCredential,
          "https://cognitiveservices.azure.com/.default",
        );
        const token = await getAccessToken();
        return token;
      },
      endpoint: azureEndpoint,
      apiVersion: options?.apiVersion,
    });
  }
}
