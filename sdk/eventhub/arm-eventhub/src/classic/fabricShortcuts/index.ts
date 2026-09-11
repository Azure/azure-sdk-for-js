// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  reject,
  approve,
  $delete,
  listByEventHub,
  createOrUpdate,
  get,
} from "../../api/fabricShortcuts/operations.js";
import type {
  FabricShortcutsRejectOptionalParams,
  FabricShortcutsApproveOptionalParams,
  FabricShortcutsDeleteOptionalParams,
  FabricShortcutsListByEventHubOptionalParams,
  FabricShortcutsCreateOrUpdateOptionalParams,
  FabricShortcutsGetOptionalParams,
} from "../../api/fabricShortcuts/options.js";
import type { FabricShortcut } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FabricShortcuts operations. */
export interface FabricShortcutsOperations {
  /** Rejects a Microsoft Fabric shortcut. */
  reject: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    fabricShortcutName: string,
    options?: FabricShortcutsRejectOptionalParams,
  ) => Promise<FabricShortcut>;
  /** Approves a Microsoft Fabric shortcut. */
  approve: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    fabricShortcutName: string,
    options?: FabricShortcutsApproveOptionalParams,
  ) => Promise<FabricShortcut>;
  /** Deletes a Microsoft Fabric shortcut. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    fabricShortcutName: string,
    options?: FabricShortcutsDeleteOptionalParams,
  ) => Promise<void>;
  /** Lists Microsoft Fabric shortcuts for an Event Hub. */
  listByEventHub: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: FabricShortcutsListByEventHubOptionalParams,
  ) => PagedAsyncIterableIterator<FabricShortcut>;
  /** Creates or updates a Microsoft Fabric shortcut. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    fabricShortcutName: string,
    resource: FabricShortcut,
    options?: FabricShortcutsCreateOrUpdateOptionalParams,
  ) => Promise<FabricShortcut>;
  /** Gets a Microsoft Fabric shortcut. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    fabricShortcutName: string,
    options?: FabricShortcutsGetOptionalParams,
  ) => Promise<FabricShortcut>;
}
function _getFabricShortcuts(context: EventHubManagementContext) {
  return {
    reject: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      fabricShortcutName: string,
      options?: FabricShortcutsRejectOptionalParams,
    ) =>
      reject(context, resourceGroupName, namespaceName, eventHubName, fabricShortcutName, options),
    approve: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      fabricShortcutName: string,
      options?: FabricShortcutsApproveOptionalParams,
    ) =>
      approve(context, resourceGroupName, namespaceName, eventHubName, fabricShortcutName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      fabricShortcutName: string,
      options?: FabricShortcutsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, namespaceName, eventHubName, fabricShortcutName, options),
    listByEventHub: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      options?: FabricShortcutsListByEventHubOptionalParams,
    ) => listByEventHub(context, resourceGroupName, namespaceName, eventHubName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      fabricShortcutName: string,
      resource: FabricShortcut,
      options?: FabricShortcutsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        fabricShortcutName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      fabricShortcutName: string,
      options?: FabricShortcutsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, eventHubName, fabricShortcutName, options),
  };
}
export function _getFabricShortcutsOperations(
  context: EventHubManagementContext,
): FabricShortcutsOperations {
  return {
    ..._getFabricShortcuts(context),
  };
}
