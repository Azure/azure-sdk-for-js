// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A job containing a batch of documents to deidentify. */
export interface DeidentificationJob {
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocation;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocation;
  /** Operation to perform on the input documents. */
  operation: OperationType;
  /** Data type of the input documents. */
  dataType: DocumentDataType;
  /** Format of the redacted output. Only valid when Operation is Redact. */
  redactionFormat?: string;
}

/** Storage location. */
export interface SourceStorageLocation {
  /** URL to storage location. Must be a valid Azure Storage SAS URI. */
  location: string;
  /** Prefix to filter blobs by. */
  prefix: string;
  /** List of extensions to filter blobs by. */
  extensions: string[];
}

/** Storage location. */
export interface TargetStorageLocation {
  /** URL to storage location. Must be a valid Azure Storage SAS URI. */
  location: string;
  /** Prefix to filter blobs by. */
  prefix: string;
}

/** Summary metrics the documents pertaining to a job. */
export interface JobSummary {
  /** Number of blobs that have completed. */
  successful: number;
  /** Number of blobs that have failed. */
  failed: number;
  /** Number of blobs that have been canceled. */
  canceled: number;
  /** Number of blobs total. */
  total: number;
  /** Number of bytes processed. */
  bytesProcessed: number;
}

/** Request for synchronous De-Identify operation. */
export interface DeidentificationContent {
  /** Input text to deidentify. */
  inputText: string;
  /** Operation to perform on the input. */
  operation: OperationType;
  /** Data type of the input. */
  dataType: DocumentDataType;
  /** Requested Encoding of the tag response indices. */
  stringIndexType?: StringIndexType;
  /** Format of the redacted output. Only valid when OperationType is Redact. */
  redactionFormat?: string;
}

/** Alias for OperationType */
export type OperationType = "Redact" | "Surrogate" | "Tag" | string;
/** Alias for DocumentDataType */
export type DocumentDataType = "Plaintext" | string;
/** Alias for JobStatus */
export type JobStatus =
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "PartialFailed"
  | "Failed"
  | "Canceled"
  | string;
/** Alias for StringIndexType */
export type StringIndexType = "TextElement_v8" | "UnicodeCodePoint" | "Utf16CodeUnit" | string;
