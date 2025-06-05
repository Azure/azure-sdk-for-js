// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

/** A job containing a batch of documents to de-identify. */
export interface DeidentificationJobOutput {
  /** The name of a job. */
  readonly name: string;
  /**
   * Operation to perform on the input documents.
   *
   * Possible values: "Redact", "Surrogate", "Tag"
   */
  operation?: DeidentificationOperationTypeOutput;
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocationOutput;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocationOutput;
  /** Customization parameters to override default service behaviors. */
  customizations?: DeidentificationJobCustomizationOptionsOutput;
  /**
   * Current status of a job.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  readonly status: OperationStateOutput;
  /** Error when job fails in it's entirety. */
  readonly error?: ErrorModel;
  /**
   * Date and time when the job was completed.
   *
   * If the job is canceled, this is the time when the job was canceled.
   *
   * If the job failed, this is the time when the job failed.
   */
  readonly lastUpdatedAt: string;
  /** Date and time when the job was created. */
  readonly createdAt: string;
  /** Date and time when the job was started. */
  readonly startedAt?: string;
  /** Summary of a job. Exists only when the job is completed. */
  readonly summary?: DeidentificationJobSummaryOutput;
}

/** Storage location. */
export interface SourceStorageLocationOutput {
  /** URL to storage location. */
  location: string;
  /** Prefix to filter path by. */
  prefix: string;
  /** List of extensions to filter path by. */
  extensions?: string[];
}

/** Storage location. */
export interface TargetStorageLocationOutput {
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
export interface DeidentificationJobCustomizationOptionsOutput {
  /**
   * Format of the redacted output. Only valid when Operation is Redact.
   * Please refer to https://learn.microsoft.com/en-us/azure/healthcare-apis/deidentification/redaction-format for more details.
   */
  redactionFormat?: string;
  /** Locale in which the output surrogates are written. */
  surrogateLocale?: string;
}

/** Summary metrics of a job. */
export interface DeidentificationJobSummaryOutput {
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

/** Paged collection of DeidentificationJob items */
export interface PagedDeidentificationJobOutput {
  /** The DeidentificationJob items on this page */
  value: Array<DeidentificationJobOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of DeidentificationDocumentDetails items */
export interface PagedDeidentificationDocumentDetailsOutput {
  /** The DeidentificationDocumentDetails items on this page */
  value: Array<DeidentificationDocumentDetailsOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Details of a single document in a job. */
export interface DeidentificationDocumentDetailsOutput {
  /** Id of the document details. */
  readonly id: string;
  /** Location for the input. */
  input: DeidentificationDocumentLocationOutput;
  /** Location for the output. */
  output?: DeidentificationDocumentLocationOutput;
  /**
   * Status of the document.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error when document fails. */
  error?: ErrorModel;
}

/** Location of a document. */
export interface DeidentificationDocumentLocationOutput {
  /** Location of document in storage. */
  location: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

/** Response body for de-identification operation. */
export interface DeidentificationResultOutput {
  /** Output text after de-identification. Not available for "Tag" operation. */
  outputText?: string;
  /** Result of the "Tag" operation. Only available for "Tag" Operation. */
  taggerResult?: PhiTaggerResultOutput;
}

/** Result of the "Tag" operation. */
export interface PhiTaggerResultOutput {
  /** List of entities detected in the input. */
  entities: Array<PhiEntityOutput>;
}

/** PHI Entity tag in the input. */
export interface PhiEntityOutput {
  /**
   * PHI Category of the entity.
   *
   * Possible values: "Unknown", "Account", "Age", "BioID", "City", "CountryOrRegion", "Date", "Device", "Doctor", "Email", "Fax", "HealthPlan", "Hospital", "IDNum", "IPAddress", "License", "LocationOther", "MedicalRecord", "Organization", "Patient", "Phone", "Profession", "SocialSecurity", "State", "Street", "Url", "Username", "Vehicle", "Zip"
   */
  category: PhiCategoryOutput;
  /** Starting index of the location from within the input text. */
  offset: StringIndexOutput;
  /** Length of the input text. */
  length: StringIndexOutput;
  /** Text of the entity. */
  text?: string;
  /** Confidence score of the category match. */
  confidenceScore?: number;
}

/** String index encoding model. */
export interface StringIndexOutput {
  /** The offset or length of the substring in UTF-8 encoding */
  utf8: number;
  /**
   * The offset or length of the substring in UTF-16 encoding.
   *
   * Primary encoding used by .NET, Java, and JavaScript.
   */
  utf16: number;
  /**
   * The offset or length of the substring in CodePoint encoding.
   *
   * Primary encoding used by Python.
   */
  codePoint: number;
}

/** Alias for DeidentificationOperationTypeOutput */
export type DeidentificationOperationTypeOutput = string;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Alias for PhiCategoryOutput */
export type PhiCategoryOutput = string;
