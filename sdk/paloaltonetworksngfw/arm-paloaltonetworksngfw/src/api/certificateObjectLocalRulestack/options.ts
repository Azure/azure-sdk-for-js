// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificateObjectLocalRulestackListByLocalRulestacksOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface CertificateObjectLocalRulestackDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateObjectLocalRulestackCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateObjectLocalRulestackGetOptionalParams extends OperationOptions {}
