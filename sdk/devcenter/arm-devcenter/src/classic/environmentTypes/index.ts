// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByDevCenter,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/environmentTypes/operations.js";
import type {
  EnvironmentTypesListByDevCenterOptionalParams,
  EnvironmentTypesDeleteOptionalParams,
  EnvironmentTypesUpdateOptionalParams,
  EnvironmentTypesCreateOrUpdateOptionalParams,
  EnvironmentTypesGetOptionalParams,
} from "../../api/environmentTypes/options.js";
import type { EnvironmentType, EnvironmentTypeUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EnvironmentTypes operations. */
export interface EnvironmentTypesOperations {
  /** Lists environment types for the devcenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: EnvironmentTypesListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentType>;
  /** Deletes an environment type. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    environmentTypeName: string,
    options?: EnvironmentTypesDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates an environment type. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    environmentTypeName: string,
    body: EnvironmentTypeUpdate,
    options?: EnvironmentTypesUpdateOptionalParams,
  ) => Promise<EnvironmentType>;
  /** Creates or updates an environment type. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    environmentTypeName: string,
    body: EnvironmentType,
    options?: EnvironmentTypesCreateOrUpdateOptionalParams,
  ) => Promise<EnvironmentType>;
  /** Gets an environment type. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    environmentTypeName: string,
    options?: EnvironmentTypesGetOptionalParams,
  ) => Promise<EnvironmentType>;
}

function _getEnvironmentTypes(context: DevCenterContext) {
  return {
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: EnvironmentTypesListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      environmentTypeName: string,
      options?: EnvironmentTypesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, environmentTypeName, options),
    update: (
      resourceGroupName: string,
      devCenterName: string,
      environmentTypeName: string,
      body: EnvironmentTypeUpdate,
      options?: EnvironmentTypesUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, environmentTypeName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      environmentTypeName: string,
      body: EnvironmentType,
      options?: EnvironmentTypesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, devCenterName, environmentTypeName, body, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      environmentTypeName: string,
      options?: EnvironmentTypesGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, environmentTypeName, options),
  };
}

export function _getEnvironmentTypesOperations(
  context: DevCenterContext,
): EnvironmentTypesOperations {
  return {
    ..._getEnvironmentTypes(context),
  };
}
