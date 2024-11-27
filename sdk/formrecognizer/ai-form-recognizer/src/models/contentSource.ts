// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureBlobContentSource as AzureBlobSourceDetails,
  AzureBlobFileListContentSource as AzureBlobFileListSourceDetails,
} from "../generated";

export { AzureBlobSourceDetails, AzureBlobFileListSourceDetails };

/**
 * A training data source defined by an Azure Blob Container.
 */
export interface AzureBlobSource {
  /**
   * The underlying details of the Azure Blob Source.
   */
  azureBlobSource: AzureBlobSourceDetails;

  /**
   * Must be undefined for a Blob Source.
   */
  azureBlobFileListSource?: undefined;
}

/**
 * A training data source defined by an Azure Blob Container and a JSONL file list within the container.
 */
export interface AzureBlobFileListSource {
  /**
   * The underlying details of the Azure Blob File List Source.
   */
  azureBlobFileListSource: AzureBlobFileListSourceDetails;

  /**
   * Must be undefined for a Blob File List Source.
   */
  azureBlobSource?: undefined;
}

/**
 * A content source that may be used to build a document model.
 *
 * One of:
 * - BlobSource
 * - BlobFileListSource
 */
export type DocumentModelSource = AzureBlobSource | AzureBlobFileListSource;

/**
 * A content source that may be used to build a document classifier.
 *
 * One of:
 * - BlobSource
 * - BlobFileListSource
 */
export type DocumentClassifierSource = AzureBlobSource | AzureBlobFileListSource;

/**
 * A set of sources used to create a document classifier. This is a map of
 * document type names to sources that will be used to train the model to
 * classify documents of the corresponding source type.
 */
export interface DocumentClassifierDocumentTypeSources {
  /**
   * The training data source of a given document type name.
   */
  [docType: string]: DocumentClassifierSource;
}
