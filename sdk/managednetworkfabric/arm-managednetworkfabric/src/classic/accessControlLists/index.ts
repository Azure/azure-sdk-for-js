// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  validateConfiguration,
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/accessControlLists/operations.js";
import type {
  AccessControlListsValidateConfigurationOptionalParams,
  AccessControlListsResyncOptionalParams,
  AccessControlListsUpdateAdministrativeStateOptionalParams,
  AccessControlListsListBySubscriptionOptionalParams,
  AccessControlListsListByResourceGroupOptionalParams,
  AccessControlListsDeleteOptionalParams,
  AccessControlListsUpdateOptionalParams,
  AccessControlListsCreateOptionalParams,
  AccessControlListsGetOptionalParams,
} from "../../api/accessControlLists/options.js";
import type {
  AccessControlList,
  AccessControlListPatch,
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessControlLists operations. */
export interface AccessControlListsOperations {
  /** Implements the operation to the underlying resources. */
  validateConfiguration: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsResyncOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    accessControlListName: string,
    body: UpdateAdministrativeState,
    options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements AccessControlLists list by subscription GET method. */
  listBySubscription: (
    options?: AccessControlListsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AccessControlList>;
  /** Implements AccessControlLists list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccessControlListsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AccessControlList>;
  /** Implements Access Control List DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the Access Control List resource. */
  update: (
    resourceGroupName: string,
    accessControlListName: string,
    properties: AccessControlListPatch,
    options?: AccessControlListsUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessControlList>, AccessControlList>;
  /** Implements Access Control List PUT method. */
  create: (
    resourceGroupName: string,
    accessControlListName: string,
    resource: AccessControlList,
    options?: AccessControlListsCreateOptionalParams,
  ) => PollerLike<OperationState<AccessControlList>, AccessControlList>;
  /** Implements Access Control List GET method. */
  get: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsGetOptionalParams,
  ) => Promise<AccessControlList>;
}

function _getAccessControlLists(context: ManagedNetworkFabricContext) {
  return {
    validateConfiguration: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, accessControlListName, options),
    resync: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsResyncOptionalParams,
    ) => resync(context, resourceGroupName, accessControlListName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      accessControlListName: string,
      body: UpdateAdministrativeState,
      options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, accessControlListName, body, options),
    listBySubscription: (options?: AccessControlListsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccessControlListsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accessControlListName, options),
    update: (
      resourceGroupName: string,
      accessControlListName: string,
      properties: AccessControlListPatch,
      options?: AccessControlListsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accessControlListName, properties, options),
    create: (
      resourceGroupName: string,
      accessControlListName: string,
      resource: AccessControlList,
      options?: AccessControlListsCreateOptionalParams,
    ) => create(context, resourceGroupName, accessControlListName, resource, options),
    get: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsGetOptionalParams,
    ) => get(context, resourceGroupName, accessControlListName, options),
  };
}

export function _getAccessControlListsOperations(
  context: ManagedNetworkFabricContext,
): AccessControlListsOperations {
  return {
    ..._getAccessControlLists(context),
  };
}
