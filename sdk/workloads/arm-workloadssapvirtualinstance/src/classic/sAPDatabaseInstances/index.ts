// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext } from "../../api/workloadsContext.js";
import {
  sAPDatabaseInstancesGet,
  sAPDatabaseInstancesCreate,
  sAPDatabaseInstancesUpdate,
  sAPDatabaseInstancesDelete,
  sAPDatabaseInstancesList,
  sAPDatabaseInstancesStart,
  sAPDatabaseInstancesStop,
} from "../../api/sAPDatabaseInstances/index.js";
import {
  OperationStatusResult,
  SAPDatabaseInstance,
  UpdateSAPDatabaseInstanceRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SAPDatabaseInstancesGetOptionalParams,
  SAPDatabaseInstancesCreateOptionalParams,
  SAPDatabaseInstancesUpdateOptionalParams,
  SAPDatabaseInstancesDeleteOptionalParams,
  SAPDatabaseInstancesListOptionalParams,
  SAPDatabaseInstancesStartOptionalParams,
  SAPDatabaseInstancesStopOptionalParams,
} from "../../api/options.js";

/** Interface representing a SAPDatabaseInstances operations. */
export interface SAPDatabaseInstancesOperations {
  /** Gets the SAP Database Instance resource. */
  get: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    options?: SAPDatabaseInstancesGetOptionalParams,
  ) => Promise<SAPDatabaseInstance>;
  /** Creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
  create: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    resource: SAPDatabaseInstance,
    options?: SAPDatabaseInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<SAPDatabaseInstance>, SAPDatabaseInstance>;
  /** Updates the Database resource. */
  update: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    properties: UpdateSAPDatabaseInstanceRequest,
    options?: SAPDatabaseInstancesUpdateOptionalParams,
  ) => Promise<SAPDatabaseInstance>;
  /** Deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error. */
  delete: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    options?: SAPDatabaseInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists the Database resources associated with a Virtual Instance for SAP solutions resource. */
  list: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPDatabaseInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SAPDatabaseInstance>;
  /** Starts the database instance of the SAP system. */
  start: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    options?: SAPDatabaseInstancesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Stops the database instance of the SAP system. */
  stop: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    databaseInstanceName: string,
    options?: SAPDatabaseInstancesStopOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function getSAPDatabaseInstances(
  context: WorkloadsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      options?: SAPDatabaseInstancesGetOptionalParams,
    ) =>
      sAPDatabaseInstancesGet(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        options,
      ),
    create: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      resource: SAPDatabaseInstance,
      options?: SAPDatabaseInstancesCreateOptionalParams,
    ) =>
      sAPDatabaseInstancesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      properties: UpdateSAPDatabaseInstanceRequest,
      options?: SAPDatabaseInstancesUpdateOptionalParams,
    ) =>
      sAPDatabaseInstancesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      options?: SAPDatabaseInstancesDeleteOptionalParams,
    ) =>
      sAPDatabaseInstancesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        options,
      ),
    list: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPDatabaseInstancesListOptionalParams,
    ) =>
      sAPDatabaseInstancesList(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    start: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      options?: SAPDatabaseInstancesStartOptionalParams,
    ) =>
      sAPDatabaseInstancesStart(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        options,
      ),
    stop: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      databaseInstanceName: string,
      options?: SAPDatabaseInstancesStopOptionalParams,
    ) =>
      sAPDatabaseInstancesStop(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        databaseInstanceName,
        options,
      ),
  };
}

export function getSAPDatabaseInstancesOperations(
  context: WorkloadsContext,
  subscriptionId: string,
): SAPDatabaseInstancesOperations {
  return {
    ...getSAPDatabaseInstances(context, subscriptionId),
  };
}
