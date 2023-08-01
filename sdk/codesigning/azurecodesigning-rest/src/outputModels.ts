// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";
import { ErrorModel } from "@azure-rest/core-client";

/** The sign status model. */
export interface CodeSignResultOutput {
  /** Response Id of the codesign operation. */
  operationId: string;
  /** Digital signature of the requested content digest. */
  signature?: string;
  /**
   * Signing certificate corresponding to the private key used to codesign the requested
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
  result?: CodeSignResultOutput;
}

/** Extended key usage object identifier that are allowed. */
export interface ExtendedKeyUsageOutput {
  /** An element of ekus. */
  ekus: string[];
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
  error?: ErrorModel;
  /** The result of the operation. */
  result?: CodeSignOperationStatusOutput;
}

/** The codesign operation status response. */
export interface CodeSignOperationStatusOutput {
  /** Unique Id of the operation. */
  id: string;
  /** The result of the codesign operation including the signature and signing certificate. */
  signResult?: CodeSignResultOutput;
}

/** Paged collection of ExtendedKeyUsage items */
export type ExtendedKeyUsageListOutput = Paged<ExtendedKeyUsageOutput>;
