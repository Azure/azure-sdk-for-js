// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { KnowledgeSourceReference } from "./models/azure/search/documents/indexes/index.js";
import type { KnowledgeBaseModel, SearchResourceEncryptionKey } from "./serviceModels.js";

export interface RetrieveOptions extends OperationOptions {}

export interface KnowledgeBase {
  /**
   * The name of the knowledge base.
   */
  name: string;
  /**
   * Knowledge sources referenced by this knowledge base.
   */
  knowledgeSources: KnowledgeSourceReference[];
  /**
   * Contains configuration options on how to connect to AI models.
   */
  models?: KnowledgeBaseModel[];
  /**
   * The ETag of the knowledge base.
   */
  etag?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your knowledge base definition when you want full assurance that no one, not even Microsoft, can decrypt them. Once you have encrypted your knowledge base definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your knowledge base definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The description of the knowledge base.
   */
  description?: string;
}
