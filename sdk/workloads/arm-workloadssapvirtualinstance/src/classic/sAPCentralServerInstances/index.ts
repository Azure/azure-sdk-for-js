// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext } from "../../api/workloadsContext.js";
import {
  sAPCentralServerInstancesGet,
  sAPCentralServerInstancesCreate,
  sAPCentralServerInstancesUpdate,
  sAPCentralServerInstancesDelete,
  sAPCentralServerInstancesList,
  sAPCentralServerInstancesStart,
  sAPCentralServerInstancesStop,
} from "../../api/sAPCentralServerInstances/index.js";
import {
  OperationStatusResult,
  SAPCentralServerInstance,
  UpdateSAPCentralInstanceRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SAPCentralServerInstancesGetOptionalParams,
  SAPCentralServerInstancesCreateOptionalParams,
  SAPCentralServerInstancesUpdateOptionalParams,
  SAPCentralServerInstancesDeleteOptionalParams,
  SAPCentralServerInstancesListOptionalParams,
  SAPCentralServerInstancesStartOptionalParams,
  SAPCentralServerInstancesStopOptionalParams,
} from "../../api/options.js";

/** Interface representing a SAPCentralServerInstances operations. */
export interface SAPCentralServerInstancesOperations {
  /** Gets the SAP Central Services Instance resource. */
  get: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    options?: SAPCentralServerInstancesGetOptionalParams,
  ) => Promise<SAPCentralServerInstance>;
  /** Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. */
  create: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    resource: SAPCentralServerInstance,
    options?: SAPCentralServerInstancesCreateOptionalParams,
  ) => PollerLike<
    OperationState<SAPCentralServerInstance>,
    SAPCentralServerInstance
  >;
  /** Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource. */
  update: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    properties: UpdateSAPCentralInstanceRequest,
    options?: SAPCentralServerInstancesUpdateOptionalParams,
  ) => Promise<SAPCentralServerInstance>;
  /** Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it. */
  delete: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    options?: SAPCentralServerInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource. */
  list: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPCentralServerInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SAPCentralServerInstance>;
  /** Starts the SAP Central Services Instance. */
  start: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    options?: SAPCentralServerInstancesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Stops the SAP Central Services Instance. */
  stop: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    centralInstanceName: string,
    options?: SAPCentralServerInstancesStopOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function getSAPCentralServerInstances(
  context: WorkloadsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      options?: SAPCentralServerInstancesGetOptionalParams,
    ) =>
      sAPCentralServerInstancesGet(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        options,
      ),
    create: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      resource: SAPCentralServerInstance,
      options?: SAPCentralServerInstancesCreateOptionalParams,
    ) =>
      sAPCentralServerInstancesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      properties: UpdateSAPCentralInstanceRequest,
      options?: SAPCentralServerInstancesUpdateOptionalParams,
    ) =>
      sAPCentralServerInstancesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      options?: SAPCentralServerInstancesDeleteOptionalParams,
    ) =>
      sAPCentralServerInstancesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        options,
      ),
    list: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPCentralServerInstancesListOptionalParams,
    ) =>
      sAPCentralServerInstancesList(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    start: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      options?: SAPCentralServerInstancesStartOptionalParams,
    ) =>
      sAPCentralServerInstancesStart(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        options,
      ),
    stop: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      centralInstanceName: string,
      options?: SAPCentralServerInstancesStopOptionalParams,
    ) =>
      sAPCentralServerInstancesStop(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        centralInstanceName,
        options,
      ),
  };
}

export function getSAPCentralServerInstancesOperations(
  context: WorkloadsContext,
  subscriptionId: string,
): SAPCentralServerInstancesOperations {
  return {
    ...getSAPCentralServerInstances(context, subscriptionId),
  };
}
