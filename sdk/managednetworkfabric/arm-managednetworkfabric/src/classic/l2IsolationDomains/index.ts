// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  commitConfiguration,
  validateConfiguration,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/l2IsolationDomains/operations.js";
import type {
  L2IsolationDomainsCommitConfigurationOptionalParams,
  L2IsolationDomainsValidateConfigurationOptionalParams,
  L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  L2IsolationDomainsListBySubscriptionOptionalParams,
  L2IsolationDomainsListByResourceGroupOptionalParams,
  L2IsolationDomainsDeleteOptionalParams,
  L2IsolationDomainsUpdateOptionalParams,
  L2IsolationDomainsCreateOptionalParams,
  L2IsolationDomainsGetOptionalParams,
} from "../../api/l2IsolationDomains/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  L2IsolationDomain,
  L2IsolationDomainPatch,
  CommonPostActionResponseForDeviceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a L2IsolationDomains operations. */
export interface L2IsolationDomainsOperations {
  /** Commits the configuration of the given resources. */
  commitConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Enables isolation domain across the fabric or on specified racks. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** Displays L2IsolationDomains list by subscription GET method. */
  listBySubscription: (
    options?: L2IsolationDomainsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<L2IsolationDomain>;
  /** Displays L2IsolationDomains list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: L2IsolationDomainsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<L2IsolationDomain>;
  /** Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the L2 Isolation Domain resource. */
  update: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    properties: L2IsolationDomainPatch,
    options?: L2IsolationDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
  /** Creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled. */
  create: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    resource: L2IsolationDomain,
    options?: L2IsolationDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
  /** Implements L2 Isolation Domain GET method. */
  get: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsGetOptionalParams,
  ) => Promise<L2IsolationDomain>;
}

function _getL2IsolationDomains(context: ManagedNetworkFabricContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, l2IsolationDomainName, options),
    validateConfiguration: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, l2IsolationDomainName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, l2IsolationDomainName, body, options),
    listBySubscription: (options?: L2IsolationDomainsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: L2IsolationDomainsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l2IsolationDomainName, options),
    update: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      properties: L2IsolationDomainPatch,
      options?: L2IsolationDomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, l2IsolationDomainName, properties, options),
    create: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      resource: L2IsolationDomain,
      options?: L2IsolationDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, l2IsolationDomainName, resource, options),
    get: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, l2IsolationDomainName, options),
  };
}

export function _getL2IsolationDomainsOperations(
  context: ManagedNetworkFabricContext,
): L2IsolationDomainsOperations {
  return {
    ..._getL2IsolationDomains(context),
  };
}
