// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/apiSources/operations.js";
import type {
  ApiSourcesListOptionalParams,
  ApiSourcesDeleteOptionalParams,
  ApiSourcesCreateOrUpdateOptionalParams,
  ApiSourcesHeadOptionalParams,
  ApiSourcesGetOptionalParams,
} from "../../api/apiSources/options.js";
import type { ApiSource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiSources operations. */
export interface ApiSourcesOperations {
  /** Returns a collection of API sources. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: ApiSourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiSource>;
  /** Deletes specified API source. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiSourceName: string,
    options?: ApiSourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing API source. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiSourceName: string,
    resource: ApiSource,
    options?: ApiSourcesCreateOrUpdateOptionalParams,
  ) => Promise<ApiSource>;
  /** Checks if specified API source exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiSourceName: string,
    options?: ApiSourcesHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the API source. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiSourceName: string,
    options?: ApiSourcesGetOptionalParams,
  ) => Promise<ApiSource>;
}

function _getApiSources(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: ApiSourcesListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiSourceName: string,
      options?: ApiSourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceName, apiSourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiSourceName: string,
      resource: ApiSource,
      options?: ApiSourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiSourceName,
        resource,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiSourceName: string,
      options?: ApiSourcesHeadOptionalParams,
    ) => head(context, resourceGroupName, serviceName, workspaceName, apiSourceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiSourceName: string,
      options?: ApiSourcesGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceName, apiSourceName, options),
  };
}

export function _getApiSourcesOperations(context: ApiCenterContext): ApiSourcesOperations {
  return {
    ..._getApiSources(context),
  };
}
