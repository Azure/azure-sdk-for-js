// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext } from "../../api/workloadsContext.js";
import {
  SAPApplicationServerInstance,
  UpdateSAPApplicationInstanceRequest,
  StartRequest,
  OperationStatusResult,
  StopRequest,
} from "../../models/models.js";
import {
  sAPApplicationServerInstancesGet,
  sAPApplicationServerInstancesCreate,
  sAPApplicationServerInstancesUpdate,
  sAPApplicationServerInstancesDelete,
  sAPApplicationServerInstancesList,
  sAPApplicationServerInstancesStart,
  sAPApplicationServerInstancesStop,
} from "../../api/sAPApplicationServerInstances/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SAPApplicationServerInstancesGetOptionalParams,
  SAPApplicationServerInstancesCreateOptionalParams,
  SAPApplicationServerInstancesUpdateOptionalParams,
  SAPApplicationServerInstancesDeleteOptionalParams,
  SAPApplicationServerInstancesListOptionalParams,
  SAPApplicationServerInstancesStartOptionalParams,
  SAPApplicationServerInstancesStopOptionalParams,
} from "../../models/options.js";

/** Interface representing a SAPApplicationServerInstances operations. */
export interface SAPApplicationServerInstancesOperations {
  /** Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource. */
  get: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesGetOptionalParams,
  ) => Promise<SAPApplicationServerInstance>;
  /** Puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
  create: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    resource: SAPApplicationServerInstance,
    options?: SAPApplicationServerInstancesCreateOptionalParams,
  ) => PollerLike<
    OperationState<SAPApplicationServerInstance>,
    SAPApplicationServerInstance
  >;
  /** Puts the SAP Application Server Instance resource. */
  update: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    properties: UpdateSAPApplicationInstanceRequest,
    options?: SAPApplicationServerInstancesUpdateOptionalParams,
  ) => Promise<SAPApplicationServerInstance>;
  /** Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error. */
  delete: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource. */
  list: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPApplicationServerInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SAPApplicationServerInstance>;
  /** Starts the SAP Application Server Instance. */
  start: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    body?: StartRequest,
    options?: SAPApplicationServerInstancesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Stops the SAP Application Server Instance. */
  stop: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    body?: StopRequest,
    options?: SAPApplicationServerInstancesStopOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function getSAPApplicationServerInstances(
  context: WorkloadsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesGetOptionalParams,
    ) =>
      sAPApplicationServerInstancesGet(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        options,
      ),
    create: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      resource: SAPApplicationServerInstance,
      options?: SAPApplicationServerInstancesCreateOptionalParams,
    ) =>
      sAPApplicationServerInstancesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      properties: UpdateSAPApplicationInstanceRequest,
      options?: SAPApplicationServerInstancesUpdateOptionalParams,
    ) =>
      sAPApplicationServerInstancesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesDeleteOptionalParams,
    ) =>
      sAPApplicationServerInstancesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        options,
      ),
    list: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPApplicationServerInstancesListOptionalParams,
    ) =>
      sAPApplicationServerInstancesList(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    start: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      body?: StartRequest,
      options?: SAPApplicationServerInstancesStartOptionalParams,
    ) =>
      sAPApplicationServerInstancesStart(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        body,
        options,
      ),
    stop: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      body?: StopRequest,
      options?: SAPApplicationServerInstancesStopOptionalParams,
    ) =>
      sAPApplicationServerInstancesStop(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        body,
        options,
      ),
  };
}

export function getSAPApplicationServerInstancesOperations(
  context: WorkloadsContext,
  subscriptionId: string,
): SAPApplicationServerInstancesOperations {
  return {
    ...getSAPApplicationServerInstances(context, subscriptionId),
  };
}
