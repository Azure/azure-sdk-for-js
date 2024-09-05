// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Paged } from "@azure/core-paging";
import { ErrorModel } from "@azure-rest/core-client";

/** A job containing a batch of documents to de-identify. */
export interface DeidentificationJobOutput {
  /** The name of a job. */
  readonly name: string;
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocationOutput;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocationOutput;
  /**
   * Operation to perform on the input documents.
   *
   * Possible values: "Redact", "Surrogate", "Tag"
   */
  operation?: OperationTypeOutput;
  /**
   * Data type of the input documents.
   *
   * Possible values: "Plaintext"
   */
  dataType?: DocumentDataTypeOutput;
  /** Format of the redacted output. Only valid when Operation is Redact. */
  redactionFormat?: string;
  /**
   * Current status of a job.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "PartialFailed", "Failed", "Canceled"
   */
  readonly status: JobStatusOutput;
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
  readonly summary?: JobSummaryOutput;
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
  /** Prefix to filter path by. */
  prefix: string;
}

/** Summary metrics of a job. */
export interface JobSummaryOutput {
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

/** Details of a single document in a job. */
export interface DocumentDetailsOutput {
  /** Id of the document details. */
  readonly id: string;
  /** Location for the input. */
  input: DocumentLocationOutput;
  /** Location for the output. */
  output?: DocumentLocationOutput;
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
export interface DocumentLocationOutput {
  /** Path of document in storage. */
  path: string;
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
  /** Path to the document in storage. */
  path?: string;
  /** The entity tag for this resource. */
  etag?: string;
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

/** Alias for OperationTypeOutput */
export type OperationTypeOutput = string;
/** Alias for DocumentDataTypeOutput */
export type DocumentDataTypeOutput = string;
/** Alias for JobStatusOutput */
export type JobStatusOutput = string;
/** Paged collection of DeidentificationJob items */
export type PagedDeidentificationJobOutput = Paged<DeidentificationJobOutput>;
/** Paged collection of DocumentDetails items */
export type PagedDocumentDetailsOutput = Paged<DocumentDetailsOutput>;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Alias for PhiCategoryOutput */
export type PhiCategoryOutput = string;
