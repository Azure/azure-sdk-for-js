// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/diagnostics/operations.js";
import {
  DiagnosticsListBySubscriptionOptionalParams,
  DiagnosticsListByResourceGroupOptionalParams,
  DiagnosticsDeleteOptionalParams,
  DiagnosticsUpdateOptionalParams,
  DiagnosticsCreateOrUpdateOptionalParams,
  DiagnosticsGetOptionalParams,
} from "../../api/diagnostics/options.js";
import { Diagnostic, DiagnosticUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Diagnostics operations. */
export interface DiagnosticsOperations {
  /** Lists Diagnostics resources within an Azure subscription. */
  listBySubscription: (
    options?: DiagnosticsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Diagnostic>;
  /** Returns a collection of Diagnostic resources within the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DiagnosticsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Diagnostic>;
  /** Deletes specified Diagnostic resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    diagnosticName: string,
    options?: DiagnosticsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates existing Diagnostic resource. */
  update: (
    resourceGroupName: string,
    diagnosticName: string,
    properties: DiagnosticUpdate,
    options?: DiagnosticsUpdateOptionalParams,
  ) => PollerLike<OperationState<Diagnostic>, Diagnostic>;
  /** Creates new or updates existing Diagnostic resource. */
  createOrUpdate: (
    resourceGroupName: string,
    diagnosticName: string,
    resource: Diagnostic,
    options?: DiagnosticsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Diagnostic>, Diagnostic>;
  /** Returns details of specified Diagnostic resource. */
  get: (
    resourceGroupName: string,
    diagnosticName: string,
    options?: DiagnosticsGetOptionalParams,
  ) => Promise<Diagnostic>;
}

function _getDiagnostics(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySubscription: (options?: DiagnosticsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DiagnosticsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      diagnosticName: string,
      options?: DiagnosticsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, diagnosticName, options),
    update: (
      resourceGroupName: string,
      diagnosticName: string,
      properties: DiagnosticUpdate,
      options?: DiagnosticsUpdateOptionalParams,
    ) => update(context, resourceGroupName, diagnosticName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      diagnosticName: string,
      resource: Diagnostic,
      options?: DiagnosticsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, diagnosticName, resource, options),
    get: (
      resourceGroupName: string,
      diagnosticName: string,
      options?: DiagnosticsGetOptionalParams,
    ) => get(context, resourceGroupName, diagnosticName, options),
  };
}

export function _getDiagnosticsOperations(
  context: WorkloadOrchestrationManagementContext,
): DiagnosticsOperations {
  return {
    ..._getDiagnostics(context),
  };
}
