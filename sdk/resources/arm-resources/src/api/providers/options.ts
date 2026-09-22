// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderRegistrationRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProvidersGetAtTenantScopeOptionalParams extends OperationOptions {
  /** The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases. */
  expand?: string;
}

/** Optional parameters. */
export interface ProvidersGetOptionalParams extends OperationOptions {
  /** The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases. */
  expand?: string;
}

/** Optional parameters. */
export interface ProvidersListOptionalParams extends OperationOptions {
  /** The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases. */
  expand?: string;
}

/** Optional parameters. */
export interface ProvidersRegisterOptionalParams extends OperationOptions {
  /** The third party consent for S2S. */
  properties?: ProviderRegistrationRequest;
}

/** Optional parameters. */
export interface ProvidersProviderPermissionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProvidersRegisterAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProvidersUnregisterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProvidersListAtTenantScopeOptionalParams extends OperationOptions {
  /** The properties to include in the results. */
  expand?: string;
}
