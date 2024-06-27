// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";
import { ErrorModel } from "@azure-rest/core-client";

/** A job containing a batch of documents to deidentify. */
export interface DeidentificationJobOutput {
  /** The name of a job. */
  readonly name: string;
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocationOutput;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocationOutput;
  /** Operation to perform on the input documents. */
  operation: OperationTypeOutput;
  /** Data type of the input documents. */
  dataType: DocumentDataTypeOutput;
  /** Format of the redacted output. Only valid when Operation is Redact. */
  redactionFormat?: string;
  /** Current status of a job. */
  readonly status: JobStatusOutput;
  /** Error when job fails in it's entirety. */
  readonly error?: ErrorModel;
  /** Date and time when the job was created. */
  readonly createdAt: string;
  /** Date and time when the job was started. */
  readonly startedAt?: string;
  /**
   * Date and time when the job was completed.
   *
   * If the job is canceled, this is the time when the job was canceled.
   *
   * If the job failed, this is the time when the job failed.
   */
  readonly lastUpdatedAt?: string;
  /** Summary of a job. Exists only when the job is completed. */
  readonly summary?: JobSummaryOutput;
}

/** Storage location. */
export interface SourceStorageLocationOutput {
  /** URL to storage location. Must be a valid Azure Storage SAS URI. */
  location: string;
  /** Prefix to filter blobs by. */
  prefix: string;
  /** List of extensions to filter blobs by. */
  extensions: string[];
}

/** Storage location. */
export interface TargetStorageLocationOutput {
  /** URL to storage location. Must be a valid Azure Storage SAS URI. */
  location: string;
  /** Prefix to filter blobs by. */
  prefix: string;
}

/** Summary metrics the documents pertaining to a job. */
export interface JobSummaryOutput {
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

/** File report once job has completed. */
export interface HealthFileDetailsOutput {
  /** Id of the file report. */
  readonly id: string;
  /** File Location for the input. */
  input: FileLocationOutput;
  /** File Location for the output. */
  output?: FileLocationOutput;
  /** Status of the file. */
  status: OperationStateOutput;
  /** Error when file fails. */
  error?: ErrorModel;
}

/** Location of a file. */
export interface FileLocationOutput {
  /** Absolute path to the file in storage. */
  path: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

/** Response for synchronous De-Identify operation. */
export interface DeidentificationResultOutput {
  /** Output text after de-identifying. Not available for Tag Operation. */
  outputText?: string;
  /** Result of the tag operation. Only available for Tag Operation. */
  taggerResult?: PhiTaggerResultOutput;
}

/** Result of the tag operation. */
export interface PhiTaggerResultOutput {
  /** List of entities detected in the input. */
  entities: Array<PhiEntityOutput>;
  /** Requested Encoding of the tag response indices. */
  stringIndexType: StringIndexTypeOutput;
  /** Path to the file in the storage container. */
  path?: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

/** Phi Entity tag in the input. */
export interface PhiEntityOutput {
  /** Phi Category of the entity. */
  category: PhiCategoryOutput;
  /** Starting index of the location from within the input text. */
  offset: number;
  /** Length of the input text. */
  length: number;
  /** Text of the entity. */
  text?: string;
  /** Confidence score of the text/type pairing. */
  confidenceScore?: number;
}

/** Alias for OperationTypeOutput */
export type OperationTypeOutput = "Redact" | "Surrogate" | "Tag" | string;
/** Alias for DocumentDataTypeOutput */
export type DocumentDataTypeOutput = "Plaintext" | string;
/** Alias for JobStatusOutput */
export type JobStatusOutput =
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "PartialFailed"
  | "Failed"
  | "Canceled"
  | string;
/** Paged collection of DeidentificationJob items */
export type PagedDeidentificationJobOutput = Paged<DeidentificationJobOutput>;
/** Paged collection of HealthFileDetails items */
export type PagedHealthFileDetailsOutput = Paged<HealthFileDetailsOutput>;
/** Enum describing allowed operation states. */
export type OperationStateOutput = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";
/** Alias for StringIndexTypeOutput */
export type StringIndexTypeOutput =
  | "TextElement_v8"
  | "UnicodeCodePoint"
  | "Utf16CodeUnit"
  | string;
/** Alias for PhiCategoryOutput */
export type PhiCategoryOutput =
  | "Unknown"
  | "Account"
  | "Age"
  | "BioID"
  | "City"
  | "CountryOrRegion"
  | "Date"
  | "Device"
  | "Doctor"
  | "Email"
  | "Fax"
  | "HealthPlan"
  | "Hospital"
  | "IDNum"
  | "IPAddress"
  | "License"
  | "LocationOther"
  | "MedicalRecord"
  | "Organization"
  | "Patient"
  | "Phone"
  | "Profession"
  | "SocialSecurity"
  | "State"
  | "Street"
  | "Url"
  | "Username"
  | "Vehicle"
  | "Zip"
  | string;
