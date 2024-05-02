// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";
import { ErrorModel, ErrorResponse } from "@azure-rest/core-client";

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

/** Provides status details for long running operations. */
export interface OperationStatusOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: SignResultOutput;
}

/** Extended key usage object identifier that are allowable. */
export interface ExtendedKeyUsageOutput {
  /** An oid string that represents an eku. */
  readonly eku: string;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorResponse;
  /** The result of the operation. */
  result?: SignResultOutput;
}

/** Paged collection of ExtendedKeyUsage items */
export type PagedExtendedKeyUsageOutput = Paged<ExtendedKeyUsageOutput>;
