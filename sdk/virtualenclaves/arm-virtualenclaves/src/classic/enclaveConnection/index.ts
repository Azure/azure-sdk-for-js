// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  handleApprovalDeletion,
  handleApprovalCreation,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/enclaveConnection/operations.js";
import type {
  EnclaveConnectionHandleApprovalDeletionOptionalParams,
  EnclaveConnectionHandleApprovalCreationOptionalParams,
  EnclaveConnectionListBySubscriptionOptionalParams,
  EnclaveConnectionListByResourceGroupOptionalParams,
  EnclaveConnectionDeleteOptionalParams,
  EnclaveConnectionUpdateOptionalParams,
  EnclaveConnectionCreateOrUpdateOptionalParams,
  EnclaveConnectionGetOptionalParams,
} from "../../api/enclaveConnection/options.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  EnclaveConnectionResource,
  EnclaveConnectionPatchModel,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnclaveConnection operations. */
export interface EnclaveConnectionOperations {
  /** Callback that triggers on approval deletion state change. */
  handleApprovalDeletion: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    body: ApprovalDeletionCallbackRequest,
    options?: EnclaveConnectionHandleApprovalDeletionOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** Callback that triggers on approval state change. */
  handleApprovalCreation: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    body: ApprovalCallbackRequest,
    options?: EnclaveConnectionHandleApprovalCreationOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** List EnclaveConnectionResource resources by subscription ID */
  listBySubscription: (
    options?: EnclaveConnectionListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveConnectionResource>;
  /** List EnclaveConnectionResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EnclaveConnectionListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveConnectionResource>;
  /** Delete a EnclaveConnectionResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    options?: EnclaveConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EnclaveConnectionResource */
  update: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    properties: EnclaveConnectionPatchModel,
    options?: EnclaveConnectionUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource>;
  /** Create a EnclaveConnectionResource */
  createOrUpdate: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    resource: EnclaveConnectionResource,
    options?: EnclaveConnectionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource>;
  /** Get a EnclaveConnectionResource */
  get: (
    resourceGroupName: string,
    enclaveConnectionName: string,
    options?: EnclaveConnectionGetOptionalParams,
  ) => Promise<EnclaveConnectionResource>;
}

function _getEnclaveConnection(context: MissionContext) {
  return {
    handleApprovalDeletion: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      body: ApprovalDeletionCallbackRequest,
      options?: EnclaveConnectionHandleApprovalDeletionOptionalParams,
    ) => handleApprovalDeletion(context, resourceGroupName, enclaveConnectionName, body, options),
    handleApprovalCreation: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      body: ApprovalCallbackRequest,
      options?: EnclaveConnectionHandleApprovalCreationOptionalParams,
    ) => handleApprovalCreation(context, resourceGroupName, enclaveConnectionName, body, options),
    listBySubscription: (options?: EnclaveConnectionListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EnclaveConnectionListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      options?: EnclaveConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, enclaveConnectionName, options),
    update: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      properties: EnclaveConnectionPatchModel,
      options?: EnclaveConnectionUpdateOptionalParams,
    ) => update(context, resourceGroupName, enclaveConnectionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      resource: EnclaveConnectionResource,
      options?: EnclaveConnectionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, enclaveConnectionName, resource, options),
    get: (
      resourceGroupName: string,
      enclaveConnectionName: string,
      options?: EnclaveConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, enclaveConnectionName, options),
  };
}

export function _getEnclaveConnectionOperations(
  context: MissionContext,
): EnclaveConnectionOperations {
  return {
    ..._getEnclaveConnection(context),
  };
}
