// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel, ErrorResponse } from "@azure-rest/core-client";

/** Provides status details for long running operations. */
export interface OperationStatusSignResultErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: SignResultOutput;
}

/** The sign status model. */
export interface SignResultOutput {
  /** Digital signature of the requested content digest. */
  signature?: string;
  /**
   * Signing certificate corresponding to the private key used to sign the requested
   * digest.
   */
  signingCertificate?: string;
}

/** Paged collection of ExtendedKeyUsage items */
export interface PagedExtendedKeyUsageOutput {
  /** The ExtendedKeyUsage items on this page */
  value: Array<ExtendedKeyUsageOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Extended key usage object identifier that are allowable. */
export interface ExtendedKeyUsageOutput {
  /** An oid string that represents an eku. */
  readonly eku: string;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusCertificateProfileNameSignResultErrorResponseOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorResponse;
  /** The result of the operation. */
  result?: SignResultOutput;
}

/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
