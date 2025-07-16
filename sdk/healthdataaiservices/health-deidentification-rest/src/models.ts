// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A job containing a batch of documents to de-identify. */
export interface DeidentificationJob {
  /**
   * Operation to perform on the input documents.
   *
   * Possible values: "Redact", "Surrogate", "Tag"
   */
  operation?: DeidentificationOperationType;
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocation;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocation;
  /** Customization parameters to override default service behaviors. */
  customizations?: DeidentificationJobCustomizationOptions;
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
  /**
   * Replaces the input prefix of a file path with the output prefix, preserving the rest of the path structure.
   *
   * Example:
   * File full path: documents/user/note.txt
   * Input Prefix: "documents/user/"
   * Output Prefix: "output_docs/"
   *
   * Output file: "output_docs/note.txt"
   */
  prefix: string;
  /** When set to true during a job, the service will overwrite the output location if it already exists. */
  overwrite?: boolean;
}

/** Customizations options to override default service behaviors for job usage. */
export interface DeidentificationJobCustomizationOptions {
  /**
   * Format of the redacted output. Only valid when Operation is Redact.
   * Please refer to https://learn.microsoft.com/en-us/azure/healthcare-apis/deidentification/redaction-format for more details.
   */
  redactionFormat?: string;
  /** Locale in which the output surrogates are written. */
  surrogateLocale?: string;
}

/** Summary metrics of a job. */
export interface DeidentificationJobSummary {
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
  /**
   * Operation to perform on the input documents.
   *
   * Possible values: "Redact", "Surrogate", "Tag"
   */
  operation?: DeidentificationOperationType;
  /** Customization parameters to override default service behaviors. */
  customizations?: DeidentificationCustomizationOptions;
}

/** Customizations options to override default service behaviors for synchronous usage. */
export interface DeidentificationCustomizationOptions {
  /**
   * Format of the redacted output. Only valid when Operation is Redact.
   * Please refer to https://learn.microsoft.com/en-us/azure/healthcare-apis/deidentification/redaction-format for more details.
   */
  redactionFormat?: string;
  /** Locale in which the output surrogates are written. */
  surrogateLocale?: string;
}

/** Alias for DeidentificationOperationType */
export type DeidentificationOperationType = string;
/** Alias for OperationState */
export type OperationState = string;
