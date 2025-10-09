// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxDeploymentApiKeyRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiKeysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiKeysDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiKeysCreateOrUpdateOptionalParams extends OperationOptions {
  /** The API Key object containing fields (e.g. secret text, expiration date) to upsert the key. */
  body?: NginxDeploymentApiKeyRequest;
}

/** Optional parameters. */
export interface ApiKeysGetOptionalParams extends OperationOptions {}
