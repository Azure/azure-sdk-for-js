// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsMgmtContext } from "../../api/disconnectedOperationsMgmtContext.js";
import {
  $delete,
  createOrUpdate,
  get,
  listByParent,
} from "../../api/hardwareSettings/operations.js";
import type {
  HardwareSettingsDeleteOptionalParams,
  HardwareSettingsCreateOrUpdateOptionalParams,
  HardwareSettingsGetOptionalParams,
  HardwareSettingsListByParentOptionalParams,
} from "../../api/hardwareSettings/options.js";
import type { HardwareSetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HardwareSettings operations. */
export interface HardwareSettingsOperations {
  /** Delete hardware settings */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    hardwareSettingName: string,
    options?: HardwareSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update hardware settings */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    hardwareSettingName: string,
    resource: HardwareSetting,
    options?: HardwareSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HardwareSetting>, HardwareSetting>;
  /** Get the hardware settings resource */
  get: (
    resourceGroupName: string,
    name: string,
    hardwareSettingName: string,
    options?: HardwareSettingsGetOptionalParams,
  ) => Promise<HardwareSetting>;
  /** List by parent */
  listByParent: (
    resourceGroupName: string,
    name: string,
    options?: HardwareSettingsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<HardwareSetting>;
}

function _getHardwareSettings(context: DisconnectedOperationsMgmtContext) {
  return {
    delete: (
      resourceGroupName: string,
      name: string,
      hardwareSettingName: string,
      options?: HardwareSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, hardwareSettingName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      hardwareSettingName: string,
      resource: HardwareSetting,
      options?: HardwareSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, hardwareSettingName, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      hardwareSettingName: string,
      options?: HardwareSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, name, hardwareSettingName, options),
    listByParent: (
      resourceGroupName: string,
      name: string,
      options?: HardwareSettingsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, name, options),
  };
}

export function _getHardwareSettingsOperations(
  context: DisconnectedOperationsMgmtContext,
): HardwareSettingsOperations {
  return {
    ..._getHardwareSettings(context),
  };
}
