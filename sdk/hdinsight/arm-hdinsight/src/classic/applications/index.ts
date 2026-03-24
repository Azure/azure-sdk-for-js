// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  getAzureAsyncOperationStatus,
  listByCluster,
  $delete,
  create,
  get,
} from "../../api/applications/operations.js";
import type {
  ApplicationsGetAzureAsyncOperationStatusOptionalParams,
  ApplicationsListByClusterOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsCreateOptionalParams,
  ApplicationsGetOptionalParams,
} from "../../api/applications/options.js";
import type { Application, AsyncOperationResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
  /** Gets the async operation status. */
  getAzureAsyncOperationStatus: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    operationId: string,
    options?: ApplicationsGetAzureAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Lists all of the applications for the HDInsight cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ApplicationsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Application>;
  /** Deletes the specified application on the HDInsight cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates applications for the HDInsight cluster. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: Application,
    options?: ApplicationsCreateOptionalParams,
  ) => PollerLike<OperationState<Application>, Application>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: Application,
    options?: ApplicationsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Application>, Application>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: Application,
    options?: ApplicationsCreateOptionalParams,
  ) => Promise<Application>;
  /** Gets properties of the specified application. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsGetOptionalParams,
  ) => Promise<Application>;
}

function _getApplications(context: HDInsightManagementContext) {
  return {
    getAzureAsyncOperationStatus: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      operationId: string,
      options?: ApplicationsGetAzureAsyncOperationStatusOptionalParams,
    ) =>
      getAzureAsyncOperationStatus(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        operationId,
        options,
      ),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ApplicationsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, applicationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, applicationName, options);
    },
    create: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: Application,
      options?: ApplicationsCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, applicationName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: Application,
      options?: ApplicationsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: Application,
      options?: ApplicationsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationName, options),
  };
}

export function _getApplicationsOperations(
  context: HDInsightManagementContext,
): ApplicationsOperations {
  return {
    ..._getApplications(context),
  };
}
