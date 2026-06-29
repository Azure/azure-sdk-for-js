// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/deployments/operations.js";
import type {
  DeploymentsListOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsHeadOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import type { Deployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** Returns a collection of API deployments. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    options?: DeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Deletes API deployment. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing API deployment. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    deploymentName: string,
    payload: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<Deployment>;
  /** Checks if specified API deployment exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    deploymentName: string,
    options?: DeploymentsHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the API deployment. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<Deployment>;
}

function _getDeployments(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      options?: DeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceName, apiName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        deploymentName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      deploymentName: string,
      payload: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        deploymentName,
        payload,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      deploymentName: string,
      options?: DeploymentsHeadOptionalParams,
    ) =>
      head(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        deploymentName,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      deploymentName: string,
      options?: DeploymentsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, serviceName, workspaceName, apiName, deploymentName, options),
  };
}

export function _getDeploymentsOperations(context: ApiCenterContext): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
