// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificateObjectGlobalRulestackListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificateObjectGlobalRulestackDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateObjectGlobalRulestackGetOptionalParams extends OperationOptions {}
