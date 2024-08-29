// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Document type info. */
export interface DocumentTypeDetails {
  /** Document model description. */
  description?: string;
  /**
   * Custom document model build mode.
   *
   * Possible values: "template", "neural", "generative"
   */
  buildMode?: DocumentBuildMode;
  /** Description of the document semantic schema using a JSON Schema style syntax. */
  fieldSchema?: Record<string, DocumentFieldSchema>;
  /** Estimated confidence for each field. */
  fieldConfidence?: Record<string, number>;
  /** Document model to use for analyzing documents with specified type. */
  modelId?: string;
  /** Only perform analysis if docType confidence is above threshold. */
  confidenceThreshold?: number;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /** Maximum number of documents of specified type to analyze.  Default=all. */
  maxDocumentsToAnalyze?: number;
}

/** Description of the field semantic schema using a JSON Schema style syntax. */
export interface DocumentFieldSchema {
  /**
   * Semantic data type of the field value.
   *
   * Possible values: "string", "date", "time", "phoneNumber", "number", "integer", "selectionMark", "countryRegion", "signature", "array", "object", "currency", "address", "boolean", "selectionGroup"
   */
  type: DocumentFieldType;
  /** Field description. */
  description?: string;
  /** Example field content. */
  example?: string;
  /** Field type schema of each array element. */
  items?: DocumentFieldSchema;
  /** Named sub-fields of the object field. */
  properties?: Record<string, DocumentFieldSchema>;
}

/** Classifier document type info. */
export interface ClassifierDocumentTypeDetails {
  /**
   * Type of training data source.
   *
   * Possible values: "url", "base64", "azureBlob", "azureBlobFileList"
   */
  sourceKind?: ContentSourceKind;
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

/** Batch document analysis parameters. */
export interface AnalyzeBatchDocumentsRequest {
  /**
   * Azure Blob Storage location containing the batch documents.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobSource?: AzureBlobContentSource;
  /**
   * Azure Blob Storage file list specifying the batch documents.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSource;
  /** Azure Blob Storage container URL where analyze result files will be stored. */
  resultContainerUrl: string;
  /** Blob name prefix of result files. */
  resultPrefix?: string;
  /** Overwrite existing analyze result files? */
  overwriteExisting?: boolean;
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
   * Possible values: "template", "neural", "generative"
   */
  buildMode: DocumentBuildMode;
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
  /** Max number of V100-equivalent GPU hours to use for model training.  Default=0.5. */
  maxTrainingHours?: number;
  /** Allow overwriting an existing model with the same name. */
  allowOverwrite?: boolean;
}

/** Request body to create a composed document model from component document models. */
export interface ComposeDocumentModelRequest {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** Custom classifier to split and classify the input file. */
  classifierId: string;
  /**
   * File splitting behavior.
   *
   * Possible values: "auto", "none", "perPage"
   */
  split?: SplitMode;
  /** Dictionary mapping supported docTypes to the corresponding document models. */
  docTypes: Record<string, DocumentTypeDetails>;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
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
  /** Allow overwriting an existing classifier with the same name. */
  allowOverwrite?: boolean;
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

/** Request body to authorize document classifier copy. */
export interface AuthorizeClassifierCopyRequest {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** List of key-value tag attributes associated with the document classifier. */
  tags?: Record<string, string>;
}

/**
 * Authorization to copy a document classifier to the specified target resource and
 * classifierId.
 */
export interface ClassifierCopyAuthorization {
  /** ID of the target Azure resource where the document classifier should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document classifier should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document classifier. */
  targetClassifierId: string;
  /** URL of the copied document classifier in the target account. */
  targetClassifierLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: Date | string;
}

/** Alias for DocumentBuildMode */
export type DocumentBuildMode = string;
/** Alias for SplitMode */
export type SplitMode = string;
/** Alias for DocumentFieldType */
export type DocumentFieldType = string;
/** Alias for DocumentAnalysisFeature */
export type DocumentAnalysisFeature = string;
/** Alias for ContentSourceKind */
export type ContentSourceKind = string;
/** Alias for StringIndexType */
export type StringIndexType = string;
/** Alias for ContentFormat */
export type ContentFormat = string;
/** Alias for AnalyzeOutputOption */
export type AnalyzeOutputOption = string;
