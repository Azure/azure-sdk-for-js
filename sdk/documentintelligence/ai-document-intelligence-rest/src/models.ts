// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Azure Blob Storage content. */
export interface AzureBlobContentSource {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Blob name prefix. */
  prefix?: string;
}

/** File list in Azure Blob Storage. */
export interface AzureBlobFileListContentSource {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Path to a JSONL file within the container specifying a subset of documents. */
  fileList: string;
}

/** Classifier document type info. */
export interface ClassifierDocumentTypeDetails {
  /**
   * Type of training data source.
   *
   * Possible values: "url", "base64", "azureBlob", "azureBlobFileList"
   */
  sourceKind?: string;
  /**
   * Azure Blob Storage location containing the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
}

/** Document analysis parameters. */
export interface AnalyzeDocumentRequest {
  /** Document URL to analyze.  Either urlSource or base64Source must be specified. */
  urlSource?: string;
  /**
   * Base64 encoding of the document to analyze.  Either urlSource or base64Source
   * must be specified.
   */
  base64Source?: string;
}

/** Request body to build a new custom document model. */
export interface BuildDocumentModelRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /**
   * Custom document model build mode.
   *
   * Possible values: "template", "neural"
   */
  buildMode: string;
  /**
   * Azure Blob Storage location containing the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
}

/** Request body to create a composed document model from component document models. */
export interface ComposeDocumentModelRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** List of component document models to compose. */
  componentModels: Array<ComponentDocumentModelDetails>;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
}

/** A component of a composed document model. */
export interface ComponentDocumentModelDetails {
  /** Unique document model name. */
  modelId: string;
}

/** Request body to authorize document model copy. */
export interface AuthorizeCopyRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
}

/**
 * Authorization to copy a document model to the specified target resource and
 * modelId.
 */
export interface CopyAuthorization {
  /** ID of the target Azure resource where the document model should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document model should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document model. */
  targetModelId: string;
  /** URL of the copied document model in the target account. */
  targetModelLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: Date | string;
}

/** Request body to build a new custom document classifier. */
export interface BuildDocumentClassifierRequest {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** Base classifierId on top of which to train the classifier. */
  baseClassifierId?: string;
  /** List of document types to classify against. */
  docTypes: Record<string, ClassifierDocumentTypeDetails>;
}

/** Document classification parameters. */
export interface ClassifyDocumentRequest {
  /** Document URL to classify.  Either urlSource or base64Source must be specified. */
  urlSource?: string;
  /**
   * Base64 encoding of the document to classify.  Either urlSource or base64Source
   * must be specified.
   */
  base64Source?: string;
}
