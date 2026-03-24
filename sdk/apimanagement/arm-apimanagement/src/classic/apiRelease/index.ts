// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiRelease/operations.js";
import type {
  ApiReleaseListByServiceOptionalParams,
  ApiReleaseDeleteOptionalParams,
  ApiReleaseUpdateOptionalParams,
  ApiReleaseCreateOrUpdateOptionalParams,
  ApiReleaseGetEntityTagOptionalParams,
  ApiReleaseGetOptionalParams,
} from "../../api/apiRelease/options.js";
import type { ApiReleaseContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiRelease operations. */
export interface ApiReleaseOperations {
  /** Lists all releases of an API. An API release is created when making an API Revision current. Releases are also used to rollback to previous revisions. Results will be paged and can be constrained by the $top and $skip parameters. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiReleaseListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiReleaseContract>;
  /** Deletes the specified release in the API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    releaseId: string,
    ifMatch: string,
    options?: ApiReleaseDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the release of the API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    releaseId: string,
    ifMatch: string,
    parameters: ApiReleaseContract,
    options?: ApiReleaseUpdateOptionalParams,
  ) => Promise<ApiReleaseContract>;
  /** Creates a new Release for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    releaseId: string,
    parameters: ApiReleaseContract,
    options?: ApiReleaseCreateOrUpdateOptionalParams,
  ) => Promise<ApiReleaseContract>;
  /** Returns the etag of an API release. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    releaseId: string,
    options?: ApiReleaseGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Returns the details of an API release. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    releaseId: string,
    options?: ApiReleaseGetOptionalParams,
  ) => Promise<ApiReleaseContract>;
}

function _getApiRelease(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiReleaseListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      releaseId: string,
      ifMatch: string,
      options?: ApiReleaseDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, releaseId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      releaseId: string,
      ifMatch: string,
      parameters: ApiReleaseContract,
      options?: ApiReleaseUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        releaseId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      releaseId: string,
      parameters: ApiReleaseContract,
      options?: ApiReleaseCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        releaseId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      releaseId: string,
      options?: ApiReleaseGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, releaseId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      releaseId: string,
      options?: ApiReleaseGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, releaseId, options),
  };
}

export function _getApiReleaseOperations(context: ApiManagementContext): ApiReleaseOperations {
  return {
    ..._getApiRelease(context),
  };
}
