// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Certificate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedEnvironmentsCertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsCertificatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsCertificatesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Certificate to be created or updated */
  certificateEnvelope?: Certificate;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsCertificatesGetOptionalParams extends OperationOptions {}
