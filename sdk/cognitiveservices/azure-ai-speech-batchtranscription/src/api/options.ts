// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListTranscriptionFilesOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** Filter the result list using the given expression. */
  filter?: string;
}

/** Optional parameters. */
export interface ListTranscriptionsOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** Filter the result list using the given expression. */
  filter?: string;
}

/** Optional parameters. */
export interface DeleteTranscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTranscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StartTranscriptionOptionalParams extends OperationOptions {}
