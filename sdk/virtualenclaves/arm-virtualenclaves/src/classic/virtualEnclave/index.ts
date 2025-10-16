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
} from "../../api/virtualEnclave/operations.js";
import type {
  VirtualEnclaveHandleApprovalDeletionOptionalParams,
  VirtualEnclaveHandleApprovalCreationOptionalParams,
  VirtualEnclaveListBySubscriptionOptionalParams,
  VirtualEnclaveListByResourceGroupOptionalParams,
  VirtualEnclaveDeleteOptionalParams,
  VirtualEnclaveUpdateOptionalParams,
  VirtualEnclaveCreateOrUpdateOptionalParams,
  VirtualEnclaveGetOptionalParams,
} from "../../api/virtualEnclave/options.js";
import type {
  EnclaveResource,
  VirtualEnclavePatchModel,
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualEnclave operations. */
export interface VirtualEnclaveOperations {
  /** Callback that triggers on approval deletion state change. */
  handleApprovalDeletion: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    body: ApprovalDeletionCallbackRequest,
    options?: VirtualEnclaveHandleApprovalDeletionOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** Callback that triggers on approval state change. */
  handleApprovalCreation: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    body: ApprovalCallbackRequest,
    options?: VirtualEnclaveHandleApprovalCreationOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** List EnclaveResource resources by subscription ID */
  listBySubscription: (
    options?: VirtualEnclaveListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveResource>;
  /** List EnclaveResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualEnclaveListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveResource>;
  /** Delete a EnclaveResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    options?: VirtualEnclaveDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EnclaveResource */
  update: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    properties: VirtualEnclavePatchModel,
    options?: VirtualEnclaveUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveResource>, EnclaveResource>;
  /** Create a EnclaveResource */
  createOrUpdate: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    resource: EnclaveResource,
    options?: VirtualEnclaveCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveResource>, EnclaveResource>;
  /** Get a EnclaveResource */
  get: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    options?: VirtualEnclaveGetOptionalParams,
  ) => Promise<EnclaveResource>;
}

function _getVirtualEnclave(context: MissionContext) {
  return {
    handleApprovalDeletion: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      body: ApprovalDeletionCallbackRequest,
      options?: VirtualEnclaveHandleApprovalDeletionOptionalParams,
    ) => handleApprovalDeletion(context, resourceGroupName, virtualEnclaveName, body, options),
    handleApprovalCreation: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      body: ApprovalCallbackRequest,
      options?: VirtualEnclaveHandleApprovalCreationOptionalParams,
    ) => handleApprovalCreation(context, resourceGroupName, virtualEnclaveName, body, options),
    listBySubscription: (options?: VirtualEnclaveListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualEnclaveListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      options?: VirtualEnclaveDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualEnclaveName, options),
    update: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      properties: VirtualEnclavePatchModel,
      options?: VirtualEnclaveUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualEnclaveName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      resource: EnclaveResource,
      options?: VirtualEnclaveCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualEnclaveName, resource, options),
    get: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      options?: VirtualEnclaveGetOptionalParams,
    ) => get(context, resourceGroupName, virtualEnclaveName, options),
  };
}

export function _getVirtualEnclaveOperations(context: MissionContext): VirtualEnclaveOperations {
  return {
    ..._getVirtualEnclave(context),
  };
}
