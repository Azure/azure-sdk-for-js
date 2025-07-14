// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext } from "../../api/workloadsContext.js";
import {
  OperationStatusResult,
  SAPApplicationServerInstance,
  UpdateSAPApplicationInstanceRequest,
} from "../../models/models.js";
import {
  SAPApplicationServerInstancesStopOptionalParams,
  SAPApplicationServerInstancesStartOptionalParams,
  SAPApplicationServerInstancesListOptionalParams,
  SAPApplicationServerInstancesDeleteOptionalParams,
  SAPApplicationServerInstancesUpdateOptionalParams,
  SAPApplicationServerInstancesCreateOptionalParams,
  SAPApplicationServerInstancesGetOptionalParams,
} from "../../api/sapApplicationServerInstances/options.js";
import {
  stop,
  start,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/sapApplicationServerInstances/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SAPApplicationServerInstances operations. */
export interface SAPApplicationServerInstancesOperations {
  /** Stops the SAP Application Server Instance. */
  stop: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesStopOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Starts the SAP Application Server Instance. */
  start: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource. */
  list: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPApplicationServerInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SAPApplicationServerInstance>;
  /** Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Puts the SAP Application Server Instance resource. */
  update: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    properties: UpdateSAPApplicationInstanceRequest,
    options?: SAPApplicationServerInstancesUpdateOptionalParams,
  ) => Promise<SAPApplicationServerInstance>;
  /** Puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
  create: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    resource: SAPApplicationServerInstance,
    options?: SAPApplicationServerInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<SAPApplicationServerInstance>, SAPApplicationServerInstance>;
  /** Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource. */
  get: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    applicationInstanceName: string,
    options?: SAPApplicationServerInstancesGetOptionalParams,
  ) => Promise<SAPApplicationServerInstance>;
}

function _getSAPApplicationServerInstances(context: WorkloadsContext) {
  return {
    stop: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesStopOptionalParams,
    ) => stop(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
    start: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesStartOptionalParams,
    ) =>
      start(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
    list: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPApplicationServerInstancesListOptionalParams,
    ) => list(context, resourceGroupName, sapVirtualInstanceName, options),
    delete: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
    update: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      properties: UpdateSAPApplicationInstanceRequest,
      options?: SAPApplicationServerInstancesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      resource: SAPApplicationServerInstance,
      options?: SAPApplicationServerInstancesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      applicationInstanceName: string,
      options?: SAPApplicationServerInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
  };
}

export function _getSAPApplicationServerInstancesOperations(
  context: WorkloadsContext,
): SAPApplicationServerInstancesOperations {
  return {
    ..._getSAPApplicationServerInstances(context),
  };
}
