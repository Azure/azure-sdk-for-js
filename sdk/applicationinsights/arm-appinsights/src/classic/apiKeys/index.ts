// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get, $delete, create, list } from "../../api/apiKeys/operations.js";
import {
  APIKeysGetOptionalParams,
  APIKeysDeleteOptionalParams,
  APIKeysCreateOptionalParams,
  APIKeysListOptionalParams,
} from "../../api/apiKeys/options.js";
import {
  ApplicationInsightsComponentAPIKey,
  APIKeyRequest,
} from "../../models/componentAPIs/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a APIKeys operations. */
export interface APIKeysOperations {
  /** Get the API Key for this key id. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    keyId: string,
    options?: APIKeysGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentAPIKey>;
  /** Delete an API Key of an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    keyId: string,
    options?: APIKeysDeleteOptionalParams,
  ) => Promise<ApplicationInsightsComponentAPIKey>;
  /** Create an API Key of an Application Insights component. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    apiKeyProperties: APIKeyRequest,
    options?: APIKeysCreateOptionalParams,
  ) => Promise<ApplicationInsightsComponentAPIKey>;
  /** Gets a list of API keys of an Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: APIKeysListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationInsightsComponentAPIKey>;
}

function _getAPIKeys(context: ApplicationInsightsManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      keyId: string,
      options?: APIKeysGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, keyId, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      keyId: string,
      options?: APIKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, keyId, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      apiKeyProperties: APIKeyRequest,
      options?: APIKeysCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, apiKeyProperties, options),
    list: (resourceGroupName: string, resourceName: string, options?: APIKeysListOptionalParams) =>
      list(context, resourceGroupName, resourceName, options),
  };
}

export function _getAPIKeysOperations(
  context: ApplicationInsightsManagementContext,
): APIKeysOperations {
  return {
    ..._getAPIKeys(context),
  };
}
