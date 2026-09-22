// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/apiKeys/operations.js";
import type {
  ApiKeysListOptionalParams,
  ApiKeysDeleteOptionalParams,
  ApiKeysCreateOrUpdateOptionalParams,
  ApiKeysGetOptionalParams,
} from "../../api/apiKeys/options.js";
import type { NginxDeploymentApiKeyResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiKeys operations. */
export interface ApiKeysOperations {
  /** List all API Keys of the given Nginx deployment */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: ApiKeysListOptionalParams,
  ) => PagedAsyncIterableIterator<NginxDeploymentApiKeyResponse>;
  /** Delete API key for Nginx deployment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    apiKeyName: string,
    options?: ApiKeysDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    apiKeyName: string,
    options?: ApiKeysCreateOrUpdateOptionalParams,
  ) => Promise<NginxDeploymentApiKeyResponse>;
  /** Get the specified API Key of the given Nginx deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    apiKeyName: string,
    options?: ApiKeysGetOptionalParams,
  ) => Promise<NginxDeploymentApiKeyResponse>;
}

function _getApiKeys(context: NginxManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: ApiKeysListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      apiKeyName: string,
      options?: ApiKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, apiKeyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      apiKeyName: string,
      options?: ApiKeysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, apiKeyName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      apiKeyName: string,
      options?: ApiKeysGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, apiKeyName, options),
  };
}

export function _getApiKeysOperations(context: NginxManagementContext): ApiKeysOperations {
  return {
    ..._getApiKeys(context),
  };
}
