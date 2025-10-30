// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedAccessSignatureRevokeTokenOptionalParams
  extends OperationOptions {
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  durationInMinutes?: number;
}

/** Optional parameters. */
export interface SharedAccessSignatureGetTokenOptionalParams
  extends OperationOptions {
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  durationInMinutes?: number;
}

/** Optional parameters. */
export interface SharedAccessSignatureGetSignOptionalParams
  extends OperationOptions {
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  durationInMinutes?: number;
}
