// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { provisionManagedNetwork } from "../../api/managedNetworkProvisions/operations.js";
import type { ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams } from "../../api/managedNetworkProvisions/options.js";
import type { ManagedNetworkProvisionStatus } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNetworkProvisions operations. */
export interface ManagedNetworkProvisionsOperations {
  /** Provisions the managed network of a cognitive services account. */
  provisionManagedNetwork: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
  ) => PollerLike<OperationState<ManagedNetworkProvisionStatus>, ManagedNetworkProvisionStatus>;
  /** @deprecated use provisionManagedNetwork instead */
  beginProvisionManagedNetwork: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedNetworkProvisionStatus>, ManagedNetworkProvisionStatus>
  >;
  /** @deprecated use provisionManagedNetwork instead */
  beginProvisionManagedNetworkAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
  ) => Promise<ManagedNetworkProvisionStatus>;
}

function _getManagedNetworkProvisions(context: CognitiveServicesManagementContext) {
  return {
    provisionManagedNetwork: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
    ) =>
      provisionManagedNetwork(context, resourceGroupName, accountName, managedNetworkName, options),
    beginProvisionManagedNetwork: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
    ) => {
      const poller = provisionManagedNetwork(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginProvisionManagedNetworkAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
    ) => {
      return await provisionManagedNetwork(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        options,
      );
    },
  };
}

export function _getManagedNetworkProvisionsOperations(
  context: CognitiveServicesManagementContext,
): ManagedNetworkProvisionsOperations {
  return {
    ..._getManagedNetworkProvisions(context),
  };
}
