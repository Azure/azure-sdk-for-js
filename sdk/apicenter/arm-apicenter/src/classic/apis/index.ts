// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/apis/operations.js";
import type {
  ApisListOptionalParams,
  ApisDeleteOptionalParams,
  ApisCreateOrUpdateOptionalParams,
  ApisHeadOptionalParams,
  ApisGetOptionalParams,
} from "../../api/apis/options.js";
import type { Api } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Apis operations. */
export interface ApisOperations {
  /** Returns a collection of APIs. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: ApisListOptionalParams,
  ) => PagedAsyncIterableIterator<Api>;
  /** Deletes specified API. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    options?: ApisDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    payload: Api,
    options?: ApisCreateOrUpdateOptionalParams,
  ) => Promise<Api>;
  /** Checks if specified API exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    options?: ApisHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the API. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    options?: ApisGetOptionalParams,
  ) => Promise<Api>;
}

function _getApis(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: ApisListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      options?: ApisDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceName, apiName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      payload: Api,
      options?: ApisCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        payload,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      options?: ApisHeadOptionalParams,
    ) => head(context, resourceGroupName, serviceName, workspaceName, apiName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      options?: ApisGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceName, apiName, options),
  };
}

export function _getApisOperations(context: ApiCenterContext): ApisOperations {
  return {
    ..._getApis(context),
  };
}
