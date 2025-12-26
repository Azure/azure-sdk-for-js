// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  upgrade,
  listByArcSetting,
  $delete,
  update,
  create,
  get,
} from "../../api/extensions/operations.js";
import type {
  ExtensionsUpgradeOptionalParams,
  ExtensionsListByArcSettingOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsUpdateOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsGetOptionalParams,
} from "../../api/extensions/options.js";
import type { Extension, ExtensionPatch, ExtensionUpgradeParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Extensions operations. */
export interface ExtensionsOperations {
  /** Upgrade a particular Arc Extension of HCI Cluster. */
  upgrade: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    extensionName: string,
    extensionUpgradeParameters: ExtensionUpgradeParameters,
    options?: ExtensionsUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all Extensions under ArcSetting resource. */
  listByArcSetting: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ExtensionsListByArcSettingOptionalParams,
  ) => PagedAsyncIterableIterator<Extension>;
  /** Delete particular Arc Extension of HCI Cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Extension for HCI cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    extensionName: string,
    extension: ExtensionPatch,
    options?: ExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<Extension>, Extension>;
  /** Create Extension for HCI cluster. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    extensionName: string,
    extension: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => PollerLike<OperationState<Extension>, Extension>;
  /** Get particular Arc Extension of HCI Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    extensionName: string,
    options?: ExtensionsGetOptionalParams,
  ) => Promise<Extension>;
}

function _getExtensions(context: AzureStackHCIContext) {
  return {
    upgrade: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      extensionName: string,
      extensionUpgradeParameters: ExtensionUpgradeParameters,
      options?: ExtensionsUpgradeOptionalParams,
    ) =>
      upgrade(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extensionUpgradeParameters,
        options,
      ),
    listByArcSetting: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ExtensionsListByArcSettingOptionalParams,
    ) => listByArcSetting(context, resourceGroupName, clusterName, arcSettingName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, arcSettingName, extensionName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      extensionName: string,
      extension: ExtensionPatch,
      options?: ExtensionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extension,
        options,
      ),
    create: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      extensionName: string,
      extension: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extension,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      extensionName: string,
      options?: ExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, arcSettingName, extensionName, options),
  };
}

export function _getExtensionsOperations(context: AzureStackHCIContext): ExtensionsOperations {
  return {
    ..._getExtensions(context),
  };
}
