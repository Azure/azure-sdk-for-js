// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

/** A job containing a batch of documents to de-identify. */
export interface DeidentificationJob {
  /** The name of a job. */
  readonly name: string;
  /** Operation to perform on the input documents. */
  operation?: DeidentificationOperationType;
  /** Storage location to perform the operation on. */
  sourceLocation: SourceStorageLocation;
  /** Target location to store output of operation. */
  targetLocation: TargetStorageLocation;
  /** Customization parameters to override default service behaviors. */
  customizations?: DeidentificationJobCustomizationOptions;
  /** Current status of a job. */
  readonly status: OperationState;
  /** Error when job fails in it's entirety. */
  readonly error?: ErrorModel;
  /**
   * Date and time when the job was completed.
   *
   * If the job is canceled, this is the time when the job was canceled.
   *
   * If the job failed, this is the time when the job failed.
   */
  readonly lastUpdatedAt: Date;
  /** Date and time when the job was created. */
  readonly createdAt: Date;
  /** Date and time when the job was started. */
  readonly startedAt?: Date;
  /** Summary of a job. Exists only when the job is completed. */
  readonly summary?: DeidentificationJobSummary;
}

export function deidentificationJobSerializer(item: DeidentificationJob): any {
  return {
    operation: item["operation"],
    sourceLocation: sourceStorageLocationSerializer(item["sourceLocation"]),
    targetLocation: targetStorageLocationSerializer(item["targetLocation"]),
    customizations: !item["customizations"]
      ? item["customizations"]
      : deidentificationJobCustomizationOptionsSerializer(
          item["customizations"],
        ),
  };
}

export function deidentificationJobDeserializer(
  item: any,
): DeidentificationJob {
  return {
    name: item["name"],
    operation: item["operation"],
    sourceLocation: sourceStorageLocationDeserializer(item["sourceLocation"]),
    targetLocation: targetStorageLocationDeserializer(item["targetLocation"]),
    customizations: !item["customizations"]
      ? item["customizations"]
      : deidentificationJobCustomizationOptionsDeserializer(
          item["customizations"],
        ),
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    lastUpdatedAt: new Date(item["lastUpdatedAt"]),
    createdAt: new Date(item["createdAt"]),
    startedAt: !item["startedAt"]
      ? item["startedAt"]
      : new Date(item["startedAt"]),
    summary: !item["summary"]
      ? item["summary"]
      : deidentificationJobSummaryDeserializer(item["summary"]),
  };
}

/** Enum of supported Operation Types. */
export type DeidentificationOperationType =
  | "Redact"
  | "Surrogate"
  | "Tag"
  | "SurrogateOnly";

/** Storage location. */
export interface SourceStorageLocation {
  /** URL to storage location. */
  location: string;
  /** Prefix to filter path by. */
  prefix: string;
  /** List of extensions to filter path by. */
  extensions?: string[];
}

export function sourceStorageLocationSerializer(
  item: SourceStorageLocation,
): any {
  return {
    location: item["location"],
    prefix: item["prefix"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
  };
}

export function sourceStorageLocationDeserializer(
  item: any,
): SourceStorageLocation {
  return {
    location: item["location"],
    prefix: item["prefix"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
  };
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

export function targetStorageLocationSerializer(
  item: TargetStorageLocation,
): any {
  return {
    location: item["location"],
    prefix: item["prefix"],
    overwrite: item["overwrite"],
  };
}

export function targetStorageLocationDeserializer(
  item: any,
): TargetStorageLocation {
  return {
    location: item["location"],
    prefix: item["prefix"],
    overwrite: item["overwrite"],
  };
}

/** Customizations options to override default service behaviors for job usage. */
export interface DeidentificationJobCustomizationOptions {
  /**
   * Format of the redacted output. Only valid when Operation is Redact.
   * Please refer to https://learn.microsoft.com/azure/healthcare-apis/deidentification/redaction-format for more details.
   */
  redactionFormat?: string;
  /** Locale in which the output surrogates are written. */
  surrogateLocale?: string;
  /** Locale of the input text. Used for better PHI detection. Defaults to 'en-US'. */
  inputLocale?: string;
}

export function deidentificationJobCustomizationOptionsSerializer(
  item: DeidentificationJobCustomizationOptions,
): any {
  return {
    redactionFormat: item["redactionFormat"],
    surrogateLocale: item["surrogateLocale"],
    inputLocale: item["inputLocale"],
  };
}

export function deidentificationJobCustomizationOptionsDeserializer(
  item: any,
): DeidentificationJobCustomizationOptions {
  return {
    redactionFormat: item["redactionFormat"],
    surrogateLocale: item["surrogateLocale"],
    inputLocale: item["inputLocale"],
  };
}

/** Enum describing allowed operation states. */
export type OperationState =
  | "NotStarted"
  | "Running"
  | "Succeeded"
  | "Failed"
  | "Canceled";

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

export function deidentificationJobSummaryDeserializer(
  item: any,
): DeidentificationJobSummary {
  return {
    successful: item["successful"],
    failed: item["failed"],
    canceled: item["canceled"],
    total: item["total"],
    bytesProcessed: item["bytesProcessed"],
  };
}

/** Paged collection of DeidentificationJob items */
export interface _PagedDeidentificationJob {
  /** The DeidentificationJob items on this page */
  value: DeidentificationJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDeidentificationJobDeserializer(
  item: any,
): _PagedDeidentificationJob {
  return {
    value: deidentificationJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deidentificationJobArraySerializer(
  result: Array<DeidentificationJob>,
): any[] {
  return result.map((item) => {
    return deidentificationJobSerializer(item);
  });
}

export function deidentificationJobArrayDeserializer(
  result: Array<DeidentificationJob>,
): any[] {
  return result.map((item) => {
    return deidentificationJobDeserializer(item);
  });
}

/** Paged collection of DeidentificationDocumentDetails items */
export interface _PagedDeidentificationDocumentDetails {
  /** The DeidentificationDocumentDetails items on this page */
  value: DeidentificationDocumentDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDeidentificationDocumentDetailsDeserializer(
  item: any,
): _PagedDeidentificationDocumentDetails {
  return {
    value: deidentificationDocumentDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deidentificationDocumentDetailsArrayDeserializer(
  result: Array<DeidentificationDocumentDetails>,
): any[] {
  return result.map((item) => {
    return deidentificationDocumentDetailsDeserializer(item);
  });
}

/** Details of a single document in a job. */
export interface DeidentificationDocumentDetails {
  /** Id of the document details. */
  readonly id: string;
  /** Location for the input. */
  input: DeidentificationDocumentLocation;
  /** Location for the output. */
  output?: DeidentificationDocumentLocation;
  /** Status of the document. */
  status: OperationState;
  /** Error when document fails. */
  error?: ErrorModel;
}

export function deidentificationDocumentDetailsDeserializer(
  item: any,
): DeidentificationDocumentDetails {
  return {
    id: item["id"],
    input: deidentificationDocumentLocationDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : deidentificationDocumentLocationDeserializer(item["output"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** Location of a document. */
export interface DeidentificationDocumentLocation {
  /** Location of document in storage. */
  location: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function deidentificationDocumentLocationDeserializer(
  item: any,
): DeidentificationDocumentLocation {
  return {
    location: item["location"],
    etag: item["etag"],
  };
}

/** Request body for de-identification operation. */
export interface DeidentificationContent {
  /** Input text to de-identify. */
  inputText: string;
  /** Operation to perform on the input documents. */
  operation?: DeidentificationOperationType;
  /** Grouped PHI entities with single encoding specification for SurrogateOnly operation. */
  taggedEntities?: TaggedPhiEntities;
  /** Customization parameters to override default service behaviors. */
  customizations?: DeidentificationCustomizationOptions;
}

export function deidentificationContentSerializer(
  item: DeidentificationContent,
): any {
  return {
    inputText: item["inputText"],
    operation: item["operation"],
    taggedEntities: !item["taggedEntities"]
      ? item["taggedEntities"]
      : taggedPhiEntitiesSerializer(item["taggedEntities"]),
    customizations: !item["customizations"]
      ? item["customizations"]
      : deidentificationCustomizationOptionsSerializer(item["customizations"]),
  };
}

/** Grouped PHI entities with shared encoding specification. */
export interface TaggedPhiEntities {
  /** The encoding type used for all entities in this group. */
  encoding: TextEncodingType;
  /** List of PHI entities using the specified encoding. */
  entities: SimplePhiEntity[];
}

export function taggedPhiEntitiesSerializer(item: TaggedPhiEntities): any {
  return {
    encoding: item["encoding"],
    entities: simplePhiEntityArraySerializer(item["entities"]),
  };
}

/** Encoding type for text offset and length calculations. */
export type TextEncodingType = "Utf8" | "Utf16" | "CodePoint";

export function simplePhiEntityArraySerializer(
  result: Array<SimplePhiEntity>,
): any[] {
  return result.map((item) => {
    return simplePhiEntitySerializer(item);
  });
}

/** Simple PHI entity with encoding-specific offset and length values. */
export interface SimplePhiEntity {
  /** PHI Category of the entity. */
  category: PhiCategory;
  /** Starting index of the location from within the input text using the group's encoding. */
  offset: number;
  /** Length of the input text using the group's encoding. */
  length: number;
  /** Text of the entity (optional). */
  text?: string;
}

export function simplePhiEntitySerializer(item: SimplePhiEntity): any {
  return {
    category: item["category"],
    offset: item["offset"],
    length: item["length"],
    text: item["text"],
  };
}

/** List of PHI Entities. */
export type PhiCategory =
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
  | "Zip";

/** Customizations options to override default service behaviors for synchronous usage. */
export interface DeidentificationCustomizationOptions {
  /**
   * Format of the redacted output. Only valid when Operation is Redact.
   * Please refer to https://learn.microsoft.com/azure/healthcare-apis/deidentification/redaction-format for more details.
   */
  redactionFormat?: string;
  /** Locale in which the output surrogates are written. */
  surrogateLocale?: string;
  /** Locale of the input text. Used for better PHI detection. Defaults to 'en-US'. */
  inputLocale?: string;
}

export function deidentificationCustomizationOptionsSerializer(
  item: DeidentificationCustomizationOptions,
): any {
  return {
    redactionFormat: item["redactionFormat"],
    surrogateLocale: item["surrogateLocale"],
    inputLocale: item["inputLocale"],
  };
}

/** Response body for de-identification operation. */
export interface DeidentificationResult {
  /** Output text after de-identification. Not available for "Tag" operation. */
  outputText?: string;
  /** Result of the "Tag" operation. Only available for "Tag" Operation. */
  taggerResult?: PhiTaggerResult;
}

export function deidentificationResultDeserializer(
  item: any,
): DeidentificationResult {
  return {
    outputText: item["outputText"],
    taggerResult: !item["taggerResult"]
      ? item["taggerResult"]
      : phiTaggerResultDeserializer(item["taggerResult"]),
  };
}

/** Result of the "Tag" operation. */
export interface PhiTaggerResult {
  /** List of entities detected in the input. */
  entities: PhiEntity[];
}

export function phiTaggerResultDeserializer(item: any): PhiTaggerResult {
  return {
    entities: phiEntityArrayDeserializer(item["entities"]),
  };
}

export function phiEntityArrayDeserializer(result: Array<PhiEntity>): any[] {
  return result.map((item) => {
    return phiEntityDeserializer(item);
  });
}

/** PHI Entity tag in the input. */
export interface PhiEntity {
  /** PHI Category of the entity. */
  category: PhiCategory;
  /** Starting index of the location from within the input text. */
  offset: StringIndex;
  /** Length of the input text. */
  length: StringIndex;
  /** Text of the entity. */
  text?: string;
  /** Confidence score of the category match. */
  confidenceScore?: number;
}

export function phiEntityDeserializer(item: any): PhiEntity {
  return {
    category: item["category"],
    offset: stringIndexDeserializer(item["offset"]),
    length: stringIndexDeserializer(item["length"]),
    text: item["text"],
    confidenceScore: item["confidenceScore"],
  };
}

/** String index encoding model. */
export interface StringIndex {
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

export function stringIndexDeserializer(item: any): StringIndex {
  return {
    utf8: item["utf8"],
    utf16: item["utf16"],
    codePoint: item["codePoint"],
  };
}

/** Azure Health Data Services de-identification service versions. */
export enum KnownVersions {
  /** 2024-11-15 */
  V20241115 = "2024-11-15",
  /** 2025-07-15-preview */
  V20250715Preview = "2025-07-15-preview",
}
