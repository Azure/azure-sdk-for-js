// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedCertificate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedCertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedCertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedCertificatesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedCertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Managed Certificate to be created or updated */
  managedCertificateEnvelope?: ManagedCertificate;
}

/** Optional parameters. */
export interface ManagedCertificatesGetOptionalParams extends OperationOptions {}
