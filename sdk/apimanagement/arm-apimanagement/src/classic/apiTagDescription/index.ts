// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiTagDescription/operations.js";
import type {
  ApiTagDescriptionListByServiceOptionalParams,
  ApiTagDescriptionDeleteOptionalParams,
  ApiTagDescriptionCreateOrUpdateOptionalParams,
  ApiTagDescriptionGetEntityTagOptionalParams,
  ApiTagDescriptionGetOptionalParams,
} from "../../api/apiTagDescription/options.js";
import type {
  TagDescriptionContract,
  TagDescriptionCreateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiTagDescription operations. */
export interface ApiTagDescriptionOperations {
  /** Lists all Tags descriptions in scope of API. Model similar to swagger - tagDescription is defined on API level but tag may be assigned to the Operations */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<TagDescriptionContract>;
  /** Delete tag description for the Api. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    ifMatch: string,
    options?: ApiTagDescriptionDeleteOptionalParams,
  ) => Promise<void>;
  /** Create/Update tag description in scope of the Api. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    parameters: TagDescriptionCreateParameters,
    options?: ApiTagDescriptionCreateOrUpdateOptionalParams,
  ) => Promise<TagDescriptionContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: ApiTagDescriptionGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get Tag description in scope of API */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: ApiTagDescriptionGetOptionalParams,
  ) => Promise<TagDescriptionContract>;
}

function _getApiTagDescription(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiTagDescriptionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagDescriptionId: string,
      ifMatch: string,
      options?: ApiTagDescriptionDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, apiId, tagDescriptionId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagDescriptionId: string,
      parameters: TagDescriptionCreateParameters,
      options?: ApiTagDescriptionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagDescriptionId: string,
      options?: ApiTagDescriptionGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, tagDescriptionId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagDescriptionId: string,
      options?: ApiTagDescriptionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, tagDescriptionId, options),
  };
}

export function _getApiTagDescriptionOperations(
  context: ApiManagementContext,
): ApiTagDescriptionOperations {
  return {
    ..._getApiTagDescription(context),
  };
}
