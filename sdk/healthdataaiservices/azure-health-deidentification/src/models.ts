// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A job containing a batch of documents to de-identify. */
export interface DeidentificationJob {
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocation;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocation;
  /** Operation to perform on the input documents. */
  operation?: OperationType;
  /** Data type of the input documents. */
  dataType?: DocumentDataType;
  /** Format of the redacted output. Only valid when Operation is Redact. */
  redactionFormat?: string;
}

/** Storage location. */
export interface SourceStorageLocation {
  /** URL to storage location. */
  location: string;
  /** Prefix to filter path by. */
  prefix: string;
  /** List of extensions to filter path by. */
  extensions?: string[];
}

/** Storage location. */
export interface TargetStorageLocation {
  /** URL to storage location. */
  location: string;
  /** Prefix to filter path by. */
  prefix: string;
}

/** Summary metrics of a job. */
export interface JobSummary {
  /** Number of documents that have completed. */
  successful: number;
  /** Number of documents that have failed. */
  failed: number;
  /** Number of documents that have been canceled. */
  canceled: number;
  /** Number of documents total. */
  total: number;
  /** Number of bytes processed. */
  bytesProcessed: number;
}

/** Request body for de-identification operation. */
export interface DeidentificationContent {
  /** Input text to de-identify. */
  inputText: string;
  /** Operation to perform on the input. */
  operation?: OperationType;
  /** Data type of the input. */
  dataType?: DocumentDataType;
  /** Format of the redacted output. Only valid when OperationType is "Redact". */
  redactionFormat?: string;
}

/** Alias for OperationType */
export type OperationType = string;
/** Alias for DocumentDataType */
export type DocumentDataType = string;
/** Alias for JobStatus */
export type JobStatus = string;
