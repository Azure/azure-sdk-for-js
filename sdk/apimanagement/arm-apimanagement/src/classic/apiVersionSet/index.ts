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
} from "../../api/apiVersionSet/operations.js";
import type {
  ApiVersionSetListByServiceOptionalParams,
  ApiVersionSetDeleteOptionalParams,
  ApiVersionSetUpdateOptionalParams,
  ApiVersionSetCreateOrUpdateOptionalParams,
  ApiVersionSetGetEntityTagOptionalParams,
  ApiVersionSetGetOptionalParams,
} from "../../api/apiVersionSet/options.js";
import type { ApiVersionSetContract, ApiVersionSetUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiVersionSet operations. */
export interface ApiVersionSetOperations {
  /** Lists a collection of API Version Sets in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiVersionSetListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiVersionSetContract>;
  /** Deletes specific Api Version Set. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    versionSetId: string,
    ifMatch: string,
    options?: ApiVersionSetDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Api VersionSet specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    versionSetId: string,
    ifMatch: string,
    parameters: ApiVersionSetUpdateParameters,
    options?: ApiVersionSetUpdateOptionalParams,
  ) => Promise<ApiVersionSetContract>;
  /** Creates or Updates a Api Version Set. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    versionSetId: string,
    parameters: ApiVersionSetContract,
    options?: ApiVersionSetCreateOrUpdateOptionalParams,
  ) => Promise<ApiVersionSetContract>;
  /** Gets the entity state (Etag) version of the Api Version Set specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    versionSetId: string,
    options?: ApiVersionSetGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Api Version Set specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    versionSetId: string,
    options?: ApiVersionSetGetOptionalParams,
  ) => Promise<ApiVersionSetContract>;
}

function _getApiVersionSet(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiVersionSetListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      versionSetId: string,
      ifMatch: string,
      options?: ApiVersionSetDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, versionSetId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      versionSetId: string,
      ifMatch: string,
      parameters: ApiVersionSetUpdateParameters,
      options?: ApiVersionSetUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, versionSetId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      versionSetId: string,
      parameters: ApiVersionSetContract,
      options?: ApiVersionSetCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, versionSetId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      versionSetId: string,
      options?: ApiVersionSetGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, versionSetId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      versionSetId: string,
      options?: ApiVersionSetGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, versionSetId, options),
  };
}

export function _getApiVersionSetOperations(
  context: ApiManagementContext,
): ApiVersionSetOperations {
  return {
    ..._getApiVersionSet(context),
  };
}
