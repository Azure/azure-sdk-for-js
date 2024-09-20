// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface StartTranslationDetails {
  /** The input list of documents or folders containing documents */
  inputs: BatchRequest[];
}

export interface BatchRequest {
  /** Source of the input documents */
  source: SourceInput;
  /** Location of the destination for the output */
  targets: TargetInput[];
  /** Storage type of the input documents source string */
  storageType?: StorageInputType;
}

export interface SourceInput {
  /** Location of the folder / container or single file with your documents */
  sourceUrl: string;
  /** */
  filter?: DocumentFilter;
  /**
   * Language code
   * If none is specified, we will perform auto detect on the document
   */
  language?: string;
  /** Storage Source */
  storageSource?: StorageSource;
}

export interface DocumentFilter {
  /**
   * A case-sensitive prefix string to filter documents in the source path for translation.
   * For example, when using a Azure storage blob Uri, use the prefix to restrict sub folders for translation.
   */
  prefix?: string;
  /**
   * A case-sensitive suffix string to filter documents in the source path for translation.
   * This is most often use for file extensions
   */
  suffix?: string;
}

export interface TargetInput {
  /** Location of the folder / container with your documents */
  targetUrl: string;
  /** Category / custom system for translation request */
  category?: string;
  /** Target Language */
  language: string;
  /** List of Glossary */
  glossaries?: Glossary[];
  /** Storage Source */
  storageSource?: StorageSource;
}

export interface Glossary {
  /**
   * Location of the glossary.
   * We will use the file extension to extract the formatting if the format parameter is not supplied.
   *
   * If the translation language pair is not present in the glossary, it will not be applied
   */
  glossaryUrl: string;
  /** Format */
  format: string;
  /** Optional Version.  If not specified, default is used. */
  version?: string;
  /** Storage Source */
  storageSource?: StorageSource;
}

export interface TranslationErrorResponse {
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationError;
}

export interface TranslationError {
  /** Enums containing high level error codes. */
  code: TranslationErrorCode;
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or "document id" in case of invalid document.
   */
  target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines which is available at https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This contains required properties ErrorCode, message and optional properties target, details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationError;
}

export interface InnerTranslationError {
  /** Gets code error string. */
  code: string;
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or "document id" in case of invalid document.
   */
  target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines which is available at https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This contains required properties ErrorCode, message and optional properties target, details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationError;
}

export interface TranslationsStatus {
  /** The summary status of individual operation */
  value: TranslationStatus[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export interface TranslationStatus {
  /** Id of the operation. */
  id: string;
  /** Operation created date time */
  createdDateTimeUtc: Date;
  /** Date time in which the operation's status has been updated */
  lastActionDateTimeUtc: Date;
  /** List of possible statuses for job or document */
  status: Status;
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationError;
  /** */
  summary: StatusSummary;
}

export interface StatusSummary {
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
}

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
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationError;
  /** Progress of the translation if available */
  progress: number;
  /** Document Id */
  id: string;
  /** Character charged by the API */
  characterCharged?: number;
}

export interface DocumentsStatus {
  /** The detail status of individual documents */
  value: DocumentStatus[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export interface SupportedFileFormats {
  /** list of objects */
  value: FileFormat[];
}

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
}

export interface SupportedStorageSources {
  /** list of objects */
  value: "AzureBlob"[];
}

export type StorageSource = "AzureBlob";
export type StorageInputType = "Folder" | "File";
export type TranslationErrorCode =
  | "InvalidRequest"
  | "InvalidArgument"
  | "InternalServerError"
  | "ServiceUnavailable"
  | "ResourceNotFound"
  | "Unauthorized"
  | "RequestRateTooHigh";
export type Status =
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | "Cancelling"
  | "ValidationFailed";
