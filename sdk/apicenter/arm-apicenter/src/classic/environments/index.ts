// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/environments/operations.js";
import type {
  EnvironmentsListOptionalParams,
  EnvironmentsDeleteOptionalParams,
  EnvironmentsCreateOrUpdateOptionalParams,
  EnvironmentsHeadOptionalParams,
  EnvironmentsGetOptionalParams,
} from "../../api/environments/options.js";
import type { Environment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Environments operations. */
export interface EnvironmentsOperations {
  /** Returns a collection of environments. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: EnvironmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Environment>;
  /** Deletes the environment. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    environmentName: string,
    options?: EnvironmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing environment. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    environmentName: string,
    payload: Environment,
    options?: EnvironmentsCreateOrUpdateOptionalParams,
  ) => Promise<Environment>;
  /** Checks if specified environment exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    environmentName: string,
    options?: EnvironmentsHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the environment. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    environmentName: string,
    options?: EnvironmentsGetOptionalParams,
  ) => Promise<Environment>;
}

function _getEnvironments(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: EnvironmentsListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      environmentName: string,
      options?: EnvironmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceName, environmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      environmentName: string,
      payload: Environment,
      options?: EnvironmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        environmentName,
        payload,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      environmentName: string,
      options?: EnvironmentsHeadOptionalParams,
    ) => head(context, resourceGroupName, serviceName, workspaceName, environmentName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      environmentName: string,
      options?: EnvironmentsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceName, environmentName, options),
  };
}

export function _getEnvironmentsOperations(context: ApiCenterContext): EnvironmentsOperations {
  return {
    ..._getEnvironments(context),
  };
}
