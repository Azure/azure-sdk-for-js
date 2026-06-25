// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebPubSubCustomCertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubCustomCertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubCustomCertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubCustomCertificatesGetOptionalParams extends OperationOptions {}
