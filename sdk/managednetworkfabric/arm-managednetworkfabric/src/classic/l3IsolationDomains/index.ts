// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
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
  UpdateAdministrativeStateResponse,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  L3IsolationDomain,
  L3IsolationDomainPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use commitConfiguration instead */
  beginCommitConfiguration: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsCommitConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfigurationAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsCommitConfigurationOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Updates the administrative state of the L3 Isolation Domain resource. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the L3 Isolation Domain resource. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomainPatch,
    options?: L3IsolationDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomainPatch,
    options?: L3IsolationDomainsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomainPatch,
    options?: L3IsolationDomainsUpdateOptionalParams,
  ) => Promise<L3IsolationDomain>;
  /** Create isolation domain resources for layer 3 connectivity between compute nodes and for communication with external services .This configuration is applied on the devices only after the creation of networks is completed and isolation domain is enabled. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomain,
    options?: L3IsolationDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomain,
    options?: L3IsolationDomainsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<L3IsolationDomain>, L3IsolationDomain>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    body: L3IsolationDomain,
    options?: L3IsolationDomainsCreateOptionalParams,
  ) => Promise<L3IsolationDomain>;
  /** Retrieves details of this L3 Isolation Domain. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: L3IsolationDomainsGetOptionalParams,
  ) => Promise<L3IsolationDomain>;
}

function _getL3IsolationDomains(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, l3IsolationDomainName, options),
    beginCommitConfiguration: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsCommitConfigurationOptionalParams,
    ) => {
      const poller = commitConfiguration(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitConfigurationAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsCommitConfigurationOptionalParams,
    ) => {
      return await commitConfiguration(context, resourceGroupName, l3IsolationDomainName, options);
    },
    validateConfiguration: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, l3IsolationDomainName, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        options,
      );
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, l3IsolationDomainName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L3IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        body,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, l3IsolationDomainName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, l3IsolationDomainName, options);
    },
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomainPatch,
      options?: L3IsolationDomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, l3IsolationDomainName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomainPatch,
      options?: L3IsolationDomainsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, l3IsolationDomainName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomainPatch,
      options?: L3IsolationDomainsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, l3IsolationDomainName, body, options);
    },
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomain,
      options?: L3IsolationDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, l3IsolationDomainName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomain,
      options?: L3IsolationDomainsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, l3IsolationDomainName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      body: L3IsolationDomain,
      options?: L3IsolationDomainsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, l3IsolationDomainName, body, options);
    },
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: L3IsolationDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, options),
  };
}

export function _getL3IsolationDomainsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): L3IsolationDomainsOperations {
  return {
    ..._getL3IsolationDomains(context),
  };
}
