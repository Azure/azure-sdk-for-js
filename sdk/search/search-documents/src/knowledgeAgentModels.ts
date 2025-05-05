// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type {
  KnowledgeAgentModel as BaseKnowledgeAgentModel,
  KnowledgeAgentRequestLimits,
  KnowledgeAgentTargetIndex,
} from "./generated/service/index.js";
import type { AzureOpenAIParameters, SearchResourceEncryptionKey } from "./serviceModels.js";

export interface RetrieveKnowledgeOptions extends OperationOptions {
  /**
   * Token identifying the user for which the query is being executed. This token is used to enforce
   * security restrictions on documents.
   */
  xMsQuerySourceAuthorization?: string;
}

export interface KnowledgeAgent {
  /**
   * The name of the knowledge agent.
   */
  name: string;
  /**
   * Contains configuration options on how to connect to AI models.
   */
  models: KnowledgeAgentModel[];
  targetIndexes: KnowledgeAgentTargetIndex[];
  /**
   * Guardrails to limit how much resources are utilized for a single agent retrieval request.
   */
  requestLimits?: KnowledgeAgentRequestLimits;
  /**
   * The ETag of the agent.
   */
  etag?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your agent definition when you want full assurance that no one, not even Microsoft, can decrypt them. Once you have encrypted your agent definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your agent definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The description of the agent.
   */
  description?: string;
}

/**
 * Specifies the Azure OpenAI resource used to do query planning.
 */
export interface KnowledgeAgentAzureOpenAIModel extends BaseKnowledgeAgentModel {
  /**
   * Polymorphic discriminator, which specifies the different types this object can be
   */
  kind: "azureOpenAI";
  /**
   * Contains the parameters specific to Azure OpenAI model endpoint.
   */
  azureOpenAIParameters: AzureOpenAIParameters;
}
export type KnowledgeAgentModel = BaseKnowledgeAgentModel | KnowledgeAgentAzureOpenAIModel;
