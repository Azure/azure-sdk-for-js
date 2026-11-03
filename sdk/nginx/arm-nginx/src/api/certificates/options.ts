// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxCertificate } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The certificate */
  body?: NginxCertificate;
}

/** Optional parameters. */
export interface CertificatesGetOptionalParams extends OperationOptions {}
