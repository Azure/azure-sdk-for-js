// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Sku } from "@azure/arm-cognitiveservices";
import type { AzureClientOptions, OpenAI } from "openai";

export interface Metadata {
  foo: string;
}

export type DeploymentType = "vision" | "audio" | "completions";

export interface ModelCapabilities {
  completion?: string;
  chatCompletion?: string;
  jsonObjectResponse?: string;
  assistants?: string;
  audio?: string;
  embeddings?: string;
  area?: string;
  realtime?: string;
  search?: string;
  imageGenerations?: string;
}

export interface DeploymentInfo {
  deploymentName: string;
  model: ModelInfo;
  sku: Sku;
  capabilities: ModelCapabilities;
}
export interface ModelInfo {
  name: string;
  version: string;
}

export interface ResourceInfo {
  deployments: DeploymentInfo[];
  endpoint: string;
}

export interface ResourcesInfo {
  resourcesInfo: ResourceInfo[];
  count: number;
}

export interface ClientAndDeploymentsInfo {
  client: OpenAI;
  deployments: DeploymentInfo[];
}

export interface ClientsAndDeploymentsInfo {
  clientsAndDeployments: ClientAndDeploymentsInfo[];
  count: number;
}

export interface CreateClientOptions {
  clientOptions?: AzureClientOptions;
  sku?: Partial<Sku>;
  deploymentsToSkip?: string[];
  modelsToSkip?: Partial<ModelInfo>[];
}
