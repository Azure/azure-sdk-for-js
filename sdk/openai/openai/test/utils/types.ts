// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Sku } from "@azure/arm-cognitiveservices";
import type { AzureClientOptions, OpenAI } from "openai";

export interface Metadata {
  foo: string;
}

export interface ModelCapabilities {
  readonly completion?: string;
  readonly chatCompletion?: string;
  readonly jsonObjectResponse?: string;
  readonly jsonSchemaResponse?: string;
  readonly assistants?: string;
  readonly audio?: string;
  readonly embeddings?: string;
  readonly area?: string;
  readonly realtime?: string;
  readonly search?: string;
  readonly imageGenerations?: string;
  readonly responses?: string;
  readonly maxContextToken?: string;
  readonly maxOutputToken?: string;
  readonly embeddingsMaxInputs?: string;
  readonly maxTotalTokens?: string;
}

export interface DeploymentInfo {
  readonly deploymentName: string;
  readonly model: ModelInfo;
  readonly sku: Sku;
  readonly capabilities: ModelCapabilities;
}
export interface ModelInfo {
  readonly name: string;
  readonly version: string;
}

export interface ResourceInfo {
  readonly deployments: DeploymentInfo[];
  readonly endpoint: string;
}

export interface ResourcesInfo {
  readonly resourcesInfo: ResourceInfo[];
  readonly count: number;
}

export interface ClientAndDeploymentsInfo {
  readonly client: OpenAI;
  readonly deployments: DeploymentInfo[];
}

export interface ClientsAndDeploymentsInfo {
  readonly clientsAndDeployments: ClientAndDeploymentsInfo[];
  readonly count: number;
}

export interface FilterDeploymentOptions {
  sku?: Partial<Sku>;
  deploymentsToSkip?: string[];
  modelsToSkip?: Partial<ModelInfo>[];
}

export interface CreateClientOptions extends FilterDeploymentOptions {
  clientOptions?: AzureClientOptions;
}

// Define the shape of an Azure Search resource entry.
export interface AzureSearchResource {
  readonly serviceName: string;
  readonly endpoint: string;
  readonly indexes: string[];
}

export interface AzureSearchResources {
  readonly resources: AzureSearchResource[];
}
