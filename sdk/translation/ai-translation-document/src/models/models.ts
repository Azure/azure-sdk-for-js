// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "#platform/static-helpers/platform-types";
import type { FileContents} from "../static-helpers/multipartHelpers.js";
import { createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Translation job submission batch request */
export interface StartTranslationDetails {
  /** The input list of documents or folders containing documents */
  inputs: BatchRequest[];
  /** The batch operation options */
  options?: BatchOptions;
}

export function startTranslationDetailsSerializer(item: StartTranslationDetails): any {
  return {
    inputs: batchRequestArraySerializer(item["inputs"]),
    options: !item["options"] ? item["options"] : batchOptionsSerializer(item["options"]),
  };
}

export function batchRequestArraySerializer(result: Array<BatchRequest>): any[] {
  return result.map((item) => {
    return batchRequestSerializer(item);
  });
}

/** Definition for the input batch translation request */
export interface BatchRequest {
  /** Source of the input documents */
  source: SourceInput;
  /** Location of the destination for the output */
  targets: TargetInput[];
  /** Storage type of the input documents source string */
  storageType?: StorageInputType;
}

export function batchRequestSerializer(item: BatchRequest): any {
  return {
    source: sourceInputSerializer(item["source"]),
    targets: targetInputArraySerializer(item["targets"]),
    storageType: item["storageType"],
  };
}

/** Source of the input documents */
export interface SourceInput {
  /** Location of the folder / container or single file with your documents */
  sourceUrl: string;
  /** Document filter */
  filter?: DocumentFilter;
  /**
   * Language code
   * If none is specified, we will perform auto detect on the document
   */
  language?: string;
  /** Storage Source */
  storageSource?: TranslationStorageSource;
}

export function sourceInputSerializer(item: SourceInput): any {
  return {
    sourceUrl: item["sourceUrl"],
    filter: !item["filter"] ? item["filter"] : documentFilterSerializer(item["filter"]),
    language: item["language"],
    storageSource: item["storageSource"],
  };
}

/** Document filter */
export interface DocumentFilter {
  /**
   * A case-sensitive prefix string to filter documents in the source path for
   * translation.
   * For example, when using a Azure storage blob Uri, use the prefix
   * to restrict sub folders for translation.
   */
  prefix?: string;
  /**
   * A case-sensitive suffix string to filter documents in the source path for
   * translation.
   * This is most often use for file extensions
   */
  suffix?: string;
}

export function documentFilterSerializer(item: DocumentFilter): any {
  return { prefix: item["prefix"], suffix: item["suffix"] };
}

/** Storage Source */
export type TranslationStorageSource = "AzureBlob";

export function targetInputArraySerializer(result: Array<TargetInput>): any[] {
  return result.map((item) => {
    return targetInputSerializer(item);
  });
}

/** Destination for the finished translated documents */
export interface TargetInput {
  /** Location of the folder / container with your documents */
  targetUrl: string;
  /** Category / custom system for translation request */
  category?: string;
  /** Deployment name of the custom translation model for the translation request. */
  deploymentName?: string;
  /** Target Language */
  language: string;
  /** List of Glossary */
  glossaries?: Glossary[];
  /** Storage Source */
  storageSource?: TranslationStorageSource;
}

export function targetInputSerializer(item: TargetInput): any {
  return {
    targetUrl: item["targetUrl"],
    category: item["category"],
    deploymentName: item["deploymentName"],
    language: item["language"],
    glossaries: !item["glossaries"]
      ? item["glossaries"]
      : glossaryArraySerializer(item["glossaries"]),
    storageSource: item["storageSource"],
  };
}

export function glossaryArraySerializer(result: Array<Glossary>): any[] {
  return result.map((item) => {
    return glossarySerializer(item);
  });
}

/** Glossary / translation memory for the request */
export interface Glossary {
  /**
   * Location of the glossary.
   * We will use the file extension to extract the
   * formatting if the format parameter is not supplied.
   *
   * If the translation
   * language pair is not present in the glossary, it will not be applied
   */
  glossaryUrl: string;
  /** Format */
  format: string;
  /** Optional Version.  If not specified, default is used. */
  version?: string;
  /** Storage Source */
  storageSource?: TranslationStorageSource;
}

export function glossarySerializer(item: Glossary): any {
  return {
    glossaryUrl: item["glossaryUrl"],
    format: item["format"],
    version: item["version"],
    storageSource: item["storageSource"],
  };
}

/** Storage type of the input documents source string */
export type StorageInputType = "Folder" | "File";

/** Translation batch request options */
export interface BatchOptions {
  /** Translation text within an image option */
  translateTextWithinImage?: boolean;
}

export function batchOptionsSerializer(item: BatchOptions): any {
  return { translateTextWithinImage: item["translateTextWithinImage"] };
}

/** Translation job status response */
export interface TranslationStatus {
  /** Id of the translation operation. */
  id: string;
  /** Operation created date time */
  createdDateTimeUtc: Date;
  /** Date time in which the operation's status has been updated */
  lastActionDateTimeUtc: Date;
  /** List of possible statuses for job or document */
  status: Status;
  /**
   * This contains an outer error with error code, message, details, target and an
   * inner error with more descriptive details.
   */
  error?: TranslationError;
  /** Status Summary */
  summary: TranslationStatusSummary;
}

export function translationStatusDeserializer(item: any): TranslationStatus {
  return {
    id: item["id"],
    createdDateTimeUtc: new Date(item["createdDateTimeUtc"]),
    lastActionDateTimeUtc: new Date(item["lastActionDateTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : translationErrorDeserializer(item["error"]),
    summary: translationStatusSummaryDeserializer(item["summary"]),
  };
}

/** List of possible statuses for job or document */
export type Status =
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | "Cancelling"
  | "ValidationFailed";

/**
 * This contains an outer error with error code, message, details, target and an
 * inner error with more descriptive details.
 */
export interface TranslationError {
  /** Enums containing high level error codes. */
  code: TranslationErrorCode;
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or
   * "document id" in case of invalid document.
   */
  readonly target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines
   * which is available at
   * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This
   * contains required properties ErrorCode, message and optional properties target,
   * details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationError;
}

export function translationErrorDeserializer(item: any): TranslationError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    innerError: !item["innerError"]
      ? item["innerError"]
      : innerTranslationErrorDeserializer(item["innerError"]),
  };
}

/** Enums containing high level error codes. */
export type TranslationErrorCode =
  | "InvalidRequest"
  | "InvalidArgument"
  | "InternalServerError"
  | "ServiceUnavailable"
  | "ResourceNotFound"
  | "Unauthorized"
  | "RequestRateTooHigh";

/**
 * New Inner Error format which conforms to Cognitive Services API Guidelines
 * which is available at
 * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
 * This
 * contains required properties ErrorCode, message and optional properties target,
 * details(key value pair), inner error(this can be nested).
 */
export interface InnerTranslationError {
  /** Gets code error string. */
  code: string;
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or
   * "document id" in case of invalid document.
   */
  readonly target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines
   * which is available at
   * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This
   * contains required properties ErrorCode, message and optional properties target,
   * details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationError;
}

export function innerTranslationErrorDeserializer(item: any): InnerTranslationError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    innerError: !item["innerError"]
      ? item["innerError"]
      : innerTranslationErrorDeserializer(item["innerError"]),
  };
}

/** Status Summary */
export interface TranslationStatusSummary {
  /** Total count */
  total: number;
  /** Failed count */
  failed: number;
  /** Number of Success */
  success: number;
  /** Number of in progress */
  inProgress: number;
  /** Count of not yet started */
  notYetStarted: number;
  /** Number of cancelled */
  cancelled: number;
  /** Total characters charged by the API */
  totalCharacterCharged: number;
  /** Total image scans charged by the API */
  totalImageScansSucceeded?: number;
  /** Total image scans failed */
  totalImageScansFailed?: number;
  /** Total images charged by the API */
  totalImageCharged?: number;
}

export function translationStatusSummaryDeserializer(item: any): TranslationStatusSummary {
  return {
    total: item["total"],
    failed: item["failed"],
    success: item["success"],
    inProgress: item["inProgress"],
    notYetStarted: item["notYetStarted"],
    cancelled: item["cancelled"],
    totalCharacterCharged: item["totalCharacterCharged"],
    totalImageScansSucceeded: item["totalImageScansSucceeded"],
    totalImageScansFailed: item["totalImageScansFailed"],
    totalImageCharged: item["totalImageCharged"],
  };
}

/** Translation job Status Response */
export interface _TranslationsStatus {
  /** The summary status of individual operation */
  value: TranslationStatus[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export function _translationsStatusDeserializer(item: any): _TranslationsStatus {
  return {
    value: translationStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function translationStatusArrayDeserializer(result: Array<TranslationStatus>): any[] {
  return result.map((item) => {
    return translationStatusDeserializer(item);
  });
}

/** Document Status Response */
export interface DocumentStatus {
  /** Location of the document or folder */
  path?: string;
  /** Location of the source document */
  sourcePath: string;
  /** Operation created date time */
  createdDateTimeUtc: Date;
  /** Date time in which the operation's status has been updated */
  lastActionDateTimeUtc: Date;
  /** List of possible statuses for job or document */
  status: Status;
  /** To language */
  to: string;
  /**
   * This contains an outer error with error code, message, details, target and an
   * inner error with more descriptive details.
   */
  error?: TranslationError;
  /** Progress of the translation if available */
  progress: number;
  /** Document Id */
  id: string;
  /** Character charged by the API */
  characterCharged?: number;
  /** Total image scans charged by the API */
  totalImageScansSucceeded?: number;
  /** Total image scans failed */
  totalImageScansFailed?: number;
  /** Images charged by the API */
  imageCharged?: number;
  /** Characters detected within images */
  imageCharacterDetected?: number;
  /** Deployment name of the custom translation model used for the translation */
  deploymentName?: string;
}

export function documentStatusDeserializer(item: any): DocumentStatus {
  return {
    path: item["path"],
    sourcePath: item["sourcePath"],
    createdDateTimeUtc: new Date(item["createdDateTimeUtc"]),
    lastActionDateTimeUtc: new Date(item["lastActionDateTimeUtc"]),
    status: item["status"],
    to: item["to"],
    error: !item["error"] ? item["error"] : translationErrorDeserializer(item["error"]),
    progress: item["progress"],
    id: item["id"],
    characterCharged: item["characterCharged"],
    totalImageScansSucceeded: item["totalImageScansSucceeded"],
    totalImageScansFailed: item["totalImageScansFailed"],
    imageCharged: item["imageCharged"],
    imageCharacterDetected: item["imageCharacterDetected"],
    deploymentName: item["deploymentName"],
  };
}

/** Documents Status Response */
export interface _DocumentsStatus {
  /** The detail status of individual documents */
  value: DocumentStatus[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export function _documentsStatusDeserializer(item: any): _DocumentsStatus {
  return {
    value: documentStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function documentStatusArrayDeserializer(result: Array<DocumentStatus>): any[] {
  return result.map((item) => {
    return documentStatusDeserializer(item);
  });
}

/** List of supported file formats */
export interface SupportedFileFormats {
  /** list of objects */
  value: FileFormat[];
}

export function supportedFileFormatsDeserializer(item: any): SupportedFileFormats {
  return {
    value: fileFormatArrayDeserializer(item["value"]),
  };
}

export function fileFormatArrayDeserializer(result: Array<FileFormat>): any[] {
  return result.map((item) => {
    return fileFormatDeserializer(item);
  });
}

/** File Format */
export interface FileFormat {
  /** Name of the format */
  format: string;
  /** Supported file extension for this format */
  fileExtensions: string[];
  /** Supported Content-Types for this format */
  contentTypes: string[];
  /** Default version if none is specified */
  defaultVersion?: string;
  /** Supported Version */
  versions?: string[];
  /** Supported Type for this format */
  type?: FileFormatType;
}

export function fileFormatDeserializer(item: any): FileFormat {
  return {
    format: item["format"],
    fileExtensions: item["fileExtensions"].map((p: any) => {
      return p;
    }),
    contentTypes: item["contentTypes"].map((p: any) => {
      return p;
    }),
    defaultVersion: item["defaultVersion"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

/** Format types */
export type FileFormatType = "document" | "glossary";

/** Document Translate Request Content */
export interface DocumentTranslateContent {
  /** Document to be translated in the form */
  document: FileContents | { contents: FileContents; contentType?: string; filename?: string };
  /** Glossary-translation memory will be used during translation in the form. */
  glossary?: Array<
    FileContents | { contents: FileContents; contentType?: string; filename?: string }
  >;
}

export function documentTranslateContentSerializer(item: DocumentTranslateContent): any {
  return [
    createFilePartDescriptor("document", item["document"], "application/octet-stream"),
    ...(item["glossary"] === undefined
      ? []
      : [createFilePartDescriptor("glossary", item["glossary"], "application/json")]),
  ];
}

/** Document Translation supported versions */
export enum KnownVersions {
  /** 2024-05-01 */
  V20240501 = "2024-05-01",
  /** 2026-03-01 */
  V20260301 = "2026-03-01",
}

export type TranslateResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
