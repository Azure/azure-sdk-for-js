// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  handleApprovalDeletion,
  handleApprovalCreation,
  listBySubscription,
  listByEnclaveResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/enclaveEndpoints/operations.js";
import type {
  EnclaveEndpointsHandleApprovalDeletionOptionalParams,
  EnclaveEndpointsHandleApprovalCreationOptionalParams,
  EnclaveEndpointsListBySubscriptionOptionalParams,
  EnclaveEndpointsListByEnclaveResourceOptionalParams,
  EnclaveEndpointsDeleteOptionalParams,
  EnclaveEndpointsUpdateOptionalParams,
  EnclaveEndpointsCreateOrUpdateOptionalParams,
  EnclaveEndpointsGetOptionalParams,
} from "../../api/enclaveEndpoints/options.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  EnclaveEndpointResource,
  EnclaveEndpointPatchModel,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnclaveEndpoints operations. */
export interface EnclaveEndpointsOperations {
  /** Callback that triggers on approval deletion state change. */
  handleApprovalDeletion: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    body: ApprovalDeletionCallbackRequest,
    options?: EnclaveEndpointsHandleApprovalDeletionOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** Callback that triggers on approval state change. */
  handleApprovalCreation: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    body: ApprovalCallbackRequest,
    options?: EnclaveEndpointsHandleApprovalCreationOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** List EnclaveEndpointResource resources by subscription ID */
  listBySubscription: (
    virtualEnclaveName: string,
    options?: EnclaveEndpointsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveEndpointResource>;
  /** List EnclaveEndpointResource resources by EnclaveResource */
  listByEnclaveResource: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    options?: EnclaveEndpointsListByEnclaveResourceOptionalParams,
  ) => PagedAsyncIterableIterator<EnclaveEndpointResource>;
  /** Delete a EnclaveEndpointResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    options?: EnclaveEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EnclaveEndpointResource */
  update: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    properties: EnclaveEndpointPatchModel,
    options?: EnclaveEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource>;
  /** Create a EnclaveEndpointResource */
  createOrUpdate: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    resource: EnclaveEndpointResource,
    options?: EnclaveEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource>;
  /** Get a EnclaveEndpointResource */
  get: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    enclaveEndpointName: string,
    options?: EnclaveEndpointsGetOptionalParams,
  ) => Promise<EnclaveEndpointResource>;
}

function _getEnclaveEndpoints(context: MissionContext) {
  return {
    handleApprovalDeletion: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      body: ApprovalDeletionCallbackRequest,
      options?: EnclaveEndpointsHandleApprovalDeletionOptionalParams,
    ) =>
      handleApprovalDeletion(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        body,
        options,
      ),
    handleApprovalCreation: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      body: ApprovalCallbackRequest,
      options?: EnclaveEndpointsHandleApprovalCreationOptionalParams,
    ) =>
      handleApprovalCreation(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        body,
        options,
      ),
    listBySubscription: (
      virtualEnclaveName: string,
      options?: EnclaveEndpointsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, virtualEnclaveName, options),
    listByEnclaveResource: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      options?: EnclaveEndpointsListByEnclaveResourceOptionalParams,
    ) => listByEnclaveResource(context, resourceGroupName, virtualEnclaveName, options),
    delete: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      options?: EnclaveEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualEnclaveName, enclaveEndpointName, options),
    update: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      properties: EnclaveEndpointPatchModel,
      options?: EnclaveEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      resource: EnclaveEndpointResource,
      options?: EnclaveEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      enclaveEndpointName: string,
      options?: EnclaveEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualEnclaveName, enclaveEndpointName, options),
  };
}

export function _getEnclaveEndpointsOperations(
  context: MissionContext,
): EnclaveEndpointsOperations {
  return {
    ..._getEnclaveEndpoints(context),
  };
}
