// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/globalParameters/operations.js";
import type {
  GlobalParametersListByFactoryOptionalParams,
  GlobalParametersDeleteOptionalParams,
  GlobalParametersCreateOrUpdateOptionalParams,
  GlobalParametersGetOptionalParams,
} from "../../api/globalParameters/options.js";
import type { GlobalParameterResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GlobalParameters operations. */
export interface GlobalParametersOperations {
  /** Lists Global parameters */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: GlobalParametersListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<GlobalParameterResource>;
  /** Deletes a Global parameter */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    globalParameterName: string,
    options?: GlobalParametersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Global parameter */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    globalParameterName: string,
    defaultParam: GlobalParameterResource,
    options?: GlobalParametersCreateOrUpdateOptionalParams,
  ) => Promise<GlobalParameterResource>;
  /** Gets a Global parameter */
  get: (
    resourceGroupName: string,
    factoryName: string,
    globalParameterName: string,
    options?: GlobalParametersGetOptionalParams,
  ) => Promise<GlobalParameterResource>;
}

function _getGlobalParameters(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: GlobalParametersListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      globalParameterName: string,
      options?: GlobalParametersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, globalParameterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      globalParameterName: string,
      defaultParam: GlobalParameterResource,
      options?: GlobalParametersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        globalParameterName,
        defaultParam,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      globalParameterName: string,
      options?: GlobalParametersGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, globalParameterName, options),
  };
}

export function _getGlobalParametersOperations(
  context: DataFactoryManagementContext,
): GlobalParametersOperations {
  return {
    ..._getGlobalParameters(context),
  };
}
