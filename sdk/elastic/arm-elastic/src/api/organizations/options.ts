// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResubscribeProperties, UserEmailId } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationsGetApiKeyOptionalParams extends OperationOptions {
  /** The request body */
  body?: UserEmailId;
}

/** Optional parameters. */
export interface OrganizationsResubscribeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resubscribe Properties */
  body?: ResubscribeProperties;
}
