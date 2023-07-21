// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BuildDocumentClassifierRequest,
  BuildDocumentModelRequest,
  ClassifierDocumentTypeDetails,
  AzureBlobContentSource,
  AzureBlobFileListContentSource,
} from "../generated";

export { AzureBlobContentSource, AzureBlobFileListContentSource };

/**
 * A content source that may be used to build a document model.
 *
 * One of:
 * - AzureBlobContentSource
 * - AzureBlobFileListContentSource
 */
export type DocumentModelContentSource = AzureBlobContentSource | AzureBlobFileListContentSource;

/**
 * A content source that may be used to build a document classifier.
 *
 * One of:
 * - AzureBlobContentSource
 * - AzureBlobFileListContentSource
 */
export type DocumentClassifierContentSource =
  | AzureBlobContentSource
  | AzureBlobFileListContentSource;

/**
 * @param source - the content source to check
 * @returns - true if the source is a valid AzureBlobContentSource
 * @internal
 */
export function isAzureBlobContentSource(
  source: DocumentModelContentSource | DocumentClassifierContentSource
): source is AzureBlobContentSource {
  return (
    (source as AzureBlobContentSource).containerUrl !== undefined &&
    (source as any).fileList === undefined &&
    // also check that if 'prefix' is provided it is a string
    ((source as AzureBlobContentSource).prefix === undefined ||
      typeof (source as AzureBlobContentSource).prefix === "string")
  );
}

/**
 * @param source - the content source to check
 * @returns - true if the source is a valid AzureBlobFileListContentSource
 * @internal
 */
export function isAzureBlobFileListContentSource(
  source: DocumentModelContentSource | DocumentClassifierContentSource
): source is AzureBlobFileListContentSource {
  return (
    (source as AzureBlobFileListContentSource).containerUrl !== undefined &&
    (source as AzureBlobFileListContentSource).fileList !== undefined &&
    (source as AzureBlobContentSource).prefix === undefined
  );
}

/**
 * @param source - a valid document model source
 * @returns an object that can be used to provide the source when calling the document model build method
 * @internal
 */
export function toBuildOptions(
  source: DocumentModelContentSource
): Pick<
  BuildDocumentModelRequest & BuildDocumentClassifierRequest,
  "azureBlobFileListSource" | "azureBlobSource"
> {
  if (isAzureBlobFileListContentSource(source)) {
    return {
      azureBlobFileListSource: source,
    };
  } else if (isAzureBlobContentSource(source)) {
    return {
      azureBlobSource: source,
    };
  } else {
    throw new Error(
      "Invalid document model content source: expected one of AzureBlobContentSource or AzureBlobFileListContentSource"
    );
  }
}

/**
 * @param source - a valid classifier source
 * @returns a valid ClassifierDocumentTypeDetails object for use when calling the build classifier method
 * @internal
 */
export function toClassifierDetails(
  source: DocumentClassifierContentSource
): ClassifierDocumentTypeDetails {
  if (isAzureBlobFileListContentSource(source)) {
    return {
      azureBlobFileListSource: source,
    };
  } else if (isAzureBlobContentSource(source)) {
    return {
      azureBlobSource: source,
    };
  } else {
    throw new Error(
      "Invalid classifier content source: expected one of AzureBlobContentSource or AzureBlobFileListContentSource"
    );
  }
}
