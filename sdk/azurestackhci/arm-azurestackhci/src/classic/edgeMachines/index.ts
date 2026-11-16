// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  refreshApplicableUpdates,
  refreshSecuritySettings,
  validate,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/edgeMachines/operations.js";
import type {
  EdgeMachinesRefreshApplicableUpdatesOptionalParams,
  EdgeMachinesRefreshSecuritySettingsOptionalParams,
  EdgeMachinesValidateOptionalParams,
  EdgeMachinesListBySubscriptionOptionalParams,
  EdgeMachinesListByResourceGroupOptionalParams,
  EdgeMachinesDeleteOptionalParams,
  EdgeMachinesUpdateOptionalParams,
  EdgeMachinesCreateOrUpdateOptionalParams,
  EdgeMachinesGetOptionalParams,
} from "../../api/edgeMachines/options.js";
import type {
  EdgeMachine,
  EdgeMachinePatch,
  EdgeMachineValidateRequest,
  EdgeMachineValidateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachines operations. */
export interface EdgeMachinesOperations {
  /**
   * Trigger an on-demand refresh of applicable updates for the edge machine.
   * Creates or updates the default EdgeMachineUpdate child resource with the latest set of applicable updates.
   */
  refreshApplicableUpdates: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshApplicableUpdates instead */
  beginRefreshApplicableUpdates: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshApplicableUpdates instead */
  beginRefreshApplicableUpdatesAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
  ) => Promise<void>;
  /**
   * Trigger an on-demand sync of edge machine security settings from Guest Configuration.
   * Creates the default security settings child resource if it does not already exist.
   */
  refreshSecuritySettings: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshSecuritySettings instead */
  beginRefreshSecuritySettings: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshSecuritySettings instead */
  beginRefreshSecuritySettingsAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
  ) => Promise<void>;
  /** A long-running resource action to validate the edge machine. */
  validate: (
    resourceGroupName: string,
    edgeMachineName: string,
    body: EdgeMachineValidateRequest,
    options?: EdgeMachinesValidateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineValidateResponse>, EdgeMachineValidateResponse>;
  /** @deprecated use validate instead */
  beginValidate: (
    resourceGroupName: string,
    edgeMachineName: string,
    body: EdgeMachineValidateRequest,
    options?: EdgeMachinesValidateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EdgeMachineValidateResponse>, EdgeMachineValidateResponse>
  >;
  /** @deprecated use validate instead */
  beginValidateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    body: EdgeMachineValidateRequest,
    options?: EdgeMachinesValidateOptionalParams,
  ) => Promise<EdgeMachineValidateResponse>;
  /** List all edge machines in a subscription. */
  listBySubscription: (
    options?: EdgeMachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachine>;
  /** List all edge machines in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EdgeMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachine>;
  /** Delete an edge machine. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an edge machine. */
  update: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachine>, EdgeMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => Promise<EdgeMachine>;
  /** Create or update an edge machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachine>, EdgeMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachine>;
  /** Get an edge machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesGetOptionalParams,
  ) => Promise<EdgeMachine>;
}

function _getEdgeMachines(context: AzureStackHCIContext) {
  return {
    refreshApplicableUpdates: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
    ) => refreshApplicableUpdates(context, resourceGroupName, edgeMachineName, options),
    beginRefreshApplicableUpdates: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
    ) => {
      const poller = refreshApplicableUpdates(context, resourceGroupName, edgeMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshApplicableUpdatesAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshApplicableUpdatesOptionalParams,
    ) => {
      return await refreshApplicableUpdates(context, resourceGroupName, edgeMachineName, options);
    },
    refreshSecuritySettings: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
    ) => refreshSecuritySettings(context, resourceGroupName, edgeMachineName, options),
    beginRefreshSecuritySettings: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
    ) => {
      const poller = refreshSecuritySettings(context, resourceGroupName, edgeMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshSecuritySettingsAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesRefreshSecuritySettingsOptionalParams,
    ) => {
      return await refreshSecuritySettings(context, resourceGroupName, edgeMachineName, options);
    },
    validate: (
      resourceGroupName: string,
      edgeMachineName: string,
      body: EdgeMachineValidateRequest,
      options?: EdgeMachinesValidateOptionalParams,
    ) => validate(context, resourceGroupName, edgeMachineName, body, options),
    beginValidate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      body: EdgeMachineValidateRequest,
      options?: EdgeMachinesValidateOptionalParams,
    ) => {
      const poller = validate(context, resourceGroupName, edgeMachineName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      body: EdgeMachineValidateRequest,
      options?: EdgeMachinesValidateOptionalParams,
    ) => {
      return await validate(context, resourceGroupName, edgeMachineName, body, options);
    },
    listBySubscription: (options?: EdgeMachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EdgeMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, options);
    },
    update: (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeMachineName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, edgeMachineName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, edgeMachineName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options);
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, options),
  };
}

export function _getEdgeMachinesOperations(context: AzureStackHCIContext): EdgeMachinesOperations {
  return {
    ..._getEdgeMachines(context),
  };
}
