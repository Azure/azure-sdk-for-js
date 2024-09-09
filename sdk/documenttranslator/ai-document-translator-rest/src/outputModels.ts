// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Contains unified error information used for HTTP responses across any Cognitive Service. Instances
 * can be created either through Microsoft.CloudAI.Containers.HttpStatusExceptionV2 or by returning it directly from
 * a controller.
 */
export interface TranslationErrorResponseOutput {
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationErrorOutput;
}

/** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
export interface TranslationErrorOutput {
  /** Enums containing high level error codes. */
  code:
    | "InvalidRequest"
    | "InvalidArgument"
    | "InternalServerError"
    | "ServiceUnavailable"
    | "ResourceNotFound"
    | "Unauthorized"
    | "RequestRateTooHigh";
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or "document id" in case of invalid document.
   */
  readonly target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines which is available at https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This contains required properties ErrorCode, message and optional properties target, details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationErrorOutput;
}

/**
 * New Inner Error format which conforms to Cognitive Services API Guidelines which is available at https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
 * This contains required properties ErrorCode, message and optional properties target, details(key value pair), inner error(this can be nested).
 */
export interface InnerTranslationErrorOutput {
  /** Gets code error string. */
  code: string;
  /** Gets high level error message. */
  message: string;
  /**
   * Gets the source of the error.
   * For example it would be "documents" or "document id" in case of invalid document.
   */
  readonly target?: string;
  /**
   * New Inner Error format which conforms to Cognitive Services API Guidelines which is available at https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
   * This contains required properties ErrorCode, message and optional properties target, details(key value pair), inner error(this can be nested).
   */
  innerError?: InnerTranslationErrorOutput;
}

/** Translation job Status Response */
export interface TranslationsStatusOutput {
  /** The summary status of individual operation */
  value: Array<TranslationStatusOutput>;
  /** Url for the next page.  Null if no more pages available */
  "@nextLink"?: string;
}

/** Translation job status response */
export interface TranslationStatusOutput {
  /**
   * Id of the operation.
   *
   * Value may contain a UUID
   */
  id: string;
  /** Operation created date time */
  createdDateTimeUtc: string;
  /** Date time in which the operation's status has been updated */
  lastActionDateTimeUtc: string;
  /** List of possible statuses for job or document */
  status:
    | "NotStarted"
    | "Running"
    | "Succeeded"
    | "Failed"
    | "Cancelled"
    | "Cancelling"
    | "ValidationFailed";
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationErrorOutput;
  summary: StatusSummaryOutput;
}

export interface StatusSummaryOutput {
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

/** Document Status Response */
export interface DocumentStatusOutput {
  /** Location of the document or folder */
  path?: string;
  /** Location of the source document */
  sourcePath: string;
  /** Operation created date time */
  createdDateTimeUtc: string;
  /** Date time in which the operation's status has been updated */
  lastActionDateTimeUtc: string;
  /** List of possible statuses for job or document */
  status:
    | "NotStarted"
    | "Running"
    | "Succeeded"
    | "Failed"
    | "Cancelled"
    | "Cancelling"
    | "ValidationFailed";
  /** To language */
  to: string;
  /** This contains an outer error with error code, message, details, target and an inner error with more descriptive details. */
  error?: TranslationErrorOutput;
  /** Progress of the translation if available */
  progress: number;
  /**
   * Document Id
   *
   * Value may contain a UUID
   */
  id: string;
  /** Character charged by the API */
  characterCharged?: number;
}

/** Documents Status Response */
export interface DocumentsStatusOutput {
  /** The detail status of individual documents */
  value: Array<DocumentStatusOutput>;
  /** Url for the next page.  Null if no more pages available */
  "@nextLink"?: string;
}

/** Base type for List return in our api */
export interface SupportedFileFormatsOutput {
  /** list of objects */
  value: Array<FileFormatOutput>;
}

export interface FileFormatOutput {
  /** Name of the format */
  format: string;
  /** Supported file extension for this format */
  fileExtensions: Array<string>;
  /** Supported Content-Types for this format */
  contentTypes: Array<string>;
  /** Default version if none is specified */
  defaultVersion?: string;
  /** Supported Version */
  versions?: Array<string>;
}

/** Base type for List return in our api */
export interface SupportedStorageSourcesOutput {
  /** list of objects */
  value: Array<"AzureBlob">;
}
