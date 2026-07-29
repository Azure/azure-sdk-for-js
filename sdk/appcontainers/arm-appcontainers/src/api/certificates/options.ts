// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Certificate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Certificate to be created or updated */
  certificateEnvelope?: Certificate;
}

/** Optional parameters. */
export interface CertificatesGetOptionalParams extends OperationOptions {}
