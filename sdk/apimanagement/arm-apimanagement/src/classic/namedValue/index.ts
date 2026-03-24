// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listValue,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/namedValue/operations.js";
import type {
  NamedValueRefreshSecretOptionalParams,
  NamedValueListValueOptionalParams,
  NamedValueListByServiceOptionalParams,
  NamedValueDeleteOptionalParams,
  NamedValueUpdateOptionalParams,
  NamedValueCreateOrUpdateOptionalParams,
  NamedValueGetEntityTagOptionalParams,
  NamedValueGetOptionalParams,
} from "../../api/namedValue/options.js";
import type {
  NamedValueContract,
  NamedValueCreateContract,
  NamedValueUpdateParameters,
  NamedValueSecretContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamedValue operations. */
export interface NamedValueOperations {
  /** Refresh the secret of the named value specified by its identifier. */
  refreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueRefreshSecretOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Gets the secret of the named value specified by its identifier. */
  listValue: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueListValueOptionalParams,
  ) => Promise<NamedValueSecretContract>;
  /** Lists a collection of named values defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<NamedValueContract>;
  /** Deletes specific named value from the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    options?: NamedValueDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specific named value. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: NamedValueUpdateOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Creates or updates named value. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: NamedValueCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Gets the entity state (Etag) version of the named value specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the named value specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetOptionalParams,
  ) => Promise<NamedValueContract>;
}

function _getNamedValue(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      options?: NamedValueRefreshSecretOptionalParams,
    ) => refreshSecret(context, resourceGroupName, serviceName, namedValueId, options),
    listValue: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      options?: NamedValueListValueOptionalParams,
    ) => listValue(context, resourceGroupName, serviceName, namedValueId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: NamedValueListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      ifMatch: string,
      options?: NamedValueDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, namedValueId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      ifMatch: string,
      parameters: NamedValueUpdateParameters,
      options?: NamedValueUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, namedValueId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      parameters: NamedValueCreateContract,
      options?: NamedValueCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, namedValueId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      options?: NamedValueGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, namedValueId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      namedValueId: string,
      options?: NamedValueGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, namedValueId, options),
  };
}

export function _getNamedValueOperations(context: ApiManagementContext): NamedValueOperations {
  return {
    ..._getNamedValue(context),
  };
}
