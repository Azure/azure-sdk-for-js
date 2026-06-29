// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/apiVersions/operations.js";
import type {
  ApiVersionsListOptionalParams,
  ApiVersionsDeleteOptionalParams,
  ApiVersionsCreateOrUpdateOptionalParams,
  ApiVersionsHeadOptionalParams,
  ApiVersionsGetOptionalParams,
} from "../../api/apiVersions/options.js";
import type { ApiVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiVersions operations. */
export interface ApiVersionsOperations {
  /** Returns a collection of API versions. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    options?: ApiVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiVersion>;
  /** Deletes specified API version */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    options?: ApiVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing API version. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    payload: ApiVersion,
    options?: ApiVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ApiVersion>;
  /** Checks if specified API version exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    options?: ApiVersionsHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the API version. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    options?: ApiVersionsGetOptionalParams,
  ) => Promise<ApiVersion>;
}

function _getApiVersions(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      options?: ApiVersionsListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceName, apiName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      options?: ApiVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      payload: ApiVersion,
      options?: ApiVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        payload,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      options?: ApiVersionsHeadOptionalParams,
    ) =>
      head(context, resourceGroupName, serviceName, workspaceName, apiName, versionName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      options?: ApiVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceName, apiName, versionName, options),
  };
}

export function _getApiVersionsOperations(context: ApiCenterContext): ApiVersionsOperations {
  return {
    ..._getApiVersions(context),
  };
}
