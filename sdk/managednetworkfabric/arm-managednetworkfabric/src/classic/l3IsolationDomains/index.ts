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
} from "../../api/l3IsolationDomains/operations.js";
import type {
  L3IsolationDomainsCommitConfigurationOptionalParams,
  L3IsolationDomainsValidateConfigurationOptionalParams,
  L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
  L3IsolationDomainsListBySubscriptionOptionalParams,
  L3IsolationDomainsListByResourceGroupOptionalParams,
  L3IsolationDomainsDeleteOptionalParams,
  L3IsolationDomainsUpdateOptionalParams,
  L3IsolationDomainsCreateOptionalParams,
  L3IsolationDomainsGetOptionalParams,
} from "../../api/l3IsolationDomains/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  CommonPostActionResponseForDeviceUpdate,
  L3IsolationDomain,
  L3IsolationDomainPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a L3IsolationDomains operations. */
export interface L3IsolationDomainsOperations {
  /** Commits the configuration of the given resources. */
  commitConfiguration: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Enables racks for this Isolation Domain. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** Displays L3IsolationDomains list by subscription GET method. */
  listBySubscription: (
    options?: L3IsolationDomainsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<L3IsolationDomain>;
  /** Displays L3IsolationDomains list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: L3IsolationDomainsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<L3IsolationDomain>;
  /** Deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the L3 Isolation Domain resource. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    properties: L3IsolationDomainPatch,
    options?: L3IsolationDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>;
  /** Create isolation domain resources for layer 3 connectivity between compute nodes and for communication with external services .This configuration is applied on the devices only after the creation of networks is completed and isolation domain is enabled. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    resource: L3IsolationDomain,
    options?: L3IsolationDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>;
  /** Retrieves details of this L3 Isolation Domain. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsGetOptionalParams,
  ) => Promise<L3IsolationDomain>;
}

function _getL3IsolationDomains(context: ManagedNetworkFabricContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, l3IsolationDomainName, options),
    validateConfiguration: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, l3IsolationDomainName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, l3IsolationDomainName, body, options),
    listBySubscription: (options?: L3IsolationDomainsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: L3IsolationDomainsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3IsolationDomainName, options),
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      properties: L3IsolationDomainPatch,
      options?: L3IsolationDomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, l3IsolationDomainName, properties, options),
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      resource: L3IsolationDomain,
      options?: L3IsolationDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, l3IsolationDomainName, resource, options),
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, options),
  };
}

export function _getL3IsolationDomainsOperations(
  context: ManagedNetworkFabricContext,
): L3IsolationDomainsOperations {
  return {
    ..._getL3IsolationDomains(context),
  };
}
