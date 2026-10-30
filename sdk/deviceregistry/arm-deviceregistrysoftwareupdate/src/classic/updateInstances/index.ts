// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceUpdateContext } from "../../api/deviceUpdateContext.js";
import {
  linkUpdate,
  linkNotify,
  linkInitiate,
  linkPreflight,
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/updateInstances/operations.js";
import type {
  UpdateInstancesLinkUpdateOptionalParams,
  UpdateInstancesLinkNotifyOptionalParams,
  UpdateInstancesLinkInitiateOptionalParams,
  UpdateInstancesLinkPreflightOptionalParams,
  UpdateInstancesCheckNameAvailabilityOptionalParams,
  UpdateInstancesListBySubscriptionOptionalParams,
  UpdateInstancesListByResourceGroupOptionalParams,
  UpdateInstancesDeleteOptionalParams,
  UpdateInstancesUpdateOptionalParams,
  UpdateInstancesCreateOptionalParams,
  UpdateInstancesGetOptionalParams,
} from "../../api/updateInstances/options.js";
import type {
  UpdateInstance,
  UpdateInstanceUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  LinkPreflightRequest,
  LinkPreflightResponse,
  LinkInitiateRequest,
  LinkNotifyRequest,
  LinkUpdateRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UpdateInstances operations. */
export interface UpdateInstancesOperations {
  /** Update linking properties (e.g., identity rotation). */
  linkUpdate: (
    resourceGroupName: string,
    updateInstanceName: string,
    body: LinkUpdateRequest,
    options?: UpdateInstancesLinkUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Notify linking state change (commit, fail, or namespaceDeleted). */
  linkNotify: (
    resourceGroupName: string,
    updateInstanceName: string,
    body: LinkNotifyRequest,
    options?: UpdateInstancesLinkNotifyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Initiate account linking. Validates and persists binding, sets linkingState=InProgress. */
  linkInitiate: (
    resourceGroupName: string,
    updateInstanceName: string,
    body: LinkInitiateRequest,
    options?: UpdateInstancesLinkInitiateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Preflight check for account linking readiness. No state change. */
  linkPreflight: (
    resourceGroupName: string,
    updateInstanceName: string,
    body: LinkPreflightRequest,
    options?: UpdateInstancesLinkPreflightOptionalParams,
  ) => Promise<LinkPreflightResponse>;
  /** Check if the Update Instance name is available. */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: UpdateInstancesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Returns list of Update Instances. */
  listBySubscription: (
    options?: UpdateInstancesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateInstance>;
  /** Returns list of Update Instances. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: UpdateInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateInstance>;
  /** Deletes an update instance. */
  delete: (
    resourceGroupName: string,
    updateInstanceName: string,
    options?: UpdateInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates update instance's patchable properties. */
  update: (
    resourceGroupName: string,
    updateInstanceName: string,
    properties: UpdateInstanceUpdate,
    options?: UpdateInstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<UpdateInstance>, UpdateInstance>;
  /** Creates or updates an Update Instance. */
  create: (
    resourceGroupName: string,
    updateInstanceName: string,
    resource: UpdateInstance,
    options?: UpdateInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<UpdateInstance>, UpdateInstance>;
  /** Returns update instance details for the given update instance name. */
  get: (
    resourceGroupName: string,
    updateInstanceName: string,
    options?: UpdateInstancesGetOptionalParams,
  ) => Promise<UpdateInstance>;
}

function _getUpdateInstances(context: DeviceUpdateContext) {
  return {
    linkUpdate: (
      resourceGroupName: string,
      updateInstanceName: string,
      body: LinkUpdateRequest,
      options?: UpdateInstancesLinkUpdateOptionalParams,
    ) => linkUpdate(context, resourceGroupName, updateInstanceName, body, options),
    linkNotify: (
      resourceGroupName: string,
      updateInstanceName: string,
      body: LinkNotifyRequest,
      options?: UpdateInstancesLinkNotifyOptionalParams,
    ) => linkNotify(context, resourceGroupName, updateInstanceName, body, options),
    linkInitiate: (
      resourceGroupName: string,
      updateInstanceName: string,
      body: LinkInitiateRequest,
      options?: UpdateInstancesLinkInitiateOptionalParams,
    ) => linkInitiate(context, resourceGroupName, updateInstanceName, body, options),
    linkPreflight: (
      resourceGroupName: string,
      updateInstanceName: string,
      body: LinkPreflightRequest,
      options?: UpdateInstancesLinkPreflightOptionalParams,
    ) => linkPreflight(context, resourceGroupName, updateInstanceName, body, options),
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: UpdateInstancesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listBySubscription: (options?: UpdateInstancesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: UpdateInstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      updateInstanceName: string,
      options?: UpdateInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, updateInstanceName, options),
    update: (
      resourceGroupName: string,
      updateInstanceName: string,
      properties: UpdateInstanceUpdate,
      options?: UpdateInstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, updateInstanceName, properties, options),
    create: (
      resourceGroupName: string,
      updateInstanceName: string,
      resource: UpdateInstance,
      options?: UpdateInstancesCreateOptionalParams,
    ) => create(context, resourceGroupName, updateInstanceName, resource, options),
    get: (
      resourceGroupName: string,
      updateInstanceName: string,
      options?: UpdateInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, updateInstanceName, options),
  };
}

export function _getUpdateInstancesOperations(
  context: DeviceUpdateContext,
): UpdateInstancesOperations {
  return {
    ..._getUpdateInstances(context),
  };
}
