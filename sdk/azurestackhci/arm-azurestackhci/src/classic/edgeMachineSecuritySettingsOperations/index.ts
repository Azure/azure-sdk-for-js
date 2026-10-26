// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByEdgeMachine,
  $delete,
  createOrUpdate,
  get,
} from "../../api/edgeMachineSecuritySettingsOperations/operations.js";
import type {
  EdgeMachineSecuritySettingsOperationsListByEdgeMachineOptionalParams,
  EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
  EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
  EdgeMachineSecuritySettingsOperationsGetOptionalParams,
} from "../../api/edgeMachineSecuritySettingsOperations/options.js";
import type { EdgeMachineSecuritySettings } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineSecuritySettingsOperations operations. */
export interface EdgeMachineSecuritySettingsOperationsOperations {
  /** List EdgeMachineSecuritySettings by EdgeMachine */
  listByEdgeMachine: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineSecuritySettingsOperationsListByEdgeMachineOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineSecuritySettings>;
  /** Delete an EdgeMachineSecuritySettings */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an EdgeMachineSecuritySettings */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    resource: EdgeMachineSecuritySettings,
    options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineSecuritySettings>, EdgeMachineSecuritySettings>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    resource: EdgeMachineSecuritySettings,
    options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EdgeMachineSecuritySettings>, EdgeMachineSecuritySettings>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    resource: EdgeMachineSecuritySettings,
    options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineSecuritySettings>;
  /** Get an EdgeMachineSecuritySettings */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    securitySettingsName: string,
    options?: EdgeMachineSecuritySettingsOperationsGetOptionalParams,
  ) => Promise<EdgeMachineSecuritySettings>;
}

function _getEdgeMachineSecuritySettingsOperations(context: AzureStackHCIContext) {
  return {
    listByEdgeMachine: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineSecuritySettingsOperationsListByEdgeMachineOptionalParams,
    ) => listByEdgeMachine(context, resourceGroupName, edgeMachineName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, securitySettingsName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        securitySettingsName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      options?: EdgeMachineSecuritySettingsOperationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        securitySettingsName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      resource: EdgeMachineSecuritySettings,
      options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        securitySettingsName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      resource: EdgeMachineSecuritySettings,
      options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        securitySettingsName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      resource: EdgeMachineSecuritySettings,
      options?: EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        securitySettingsName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      securitySettingsName: string,
      options?: EdgeMachineSecuritySettingsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, securitySettingsName, options),
  };
}

export function _getEdgeMachineSecuritySettingsOperationsOperations(
  context: AzureStackHCIContext,
): EdgeMachineSecuritySettingsOperationsOperations {
  return {
    ..._getEdgeMachineSecuritySettingsOperations(context),
  };
}
