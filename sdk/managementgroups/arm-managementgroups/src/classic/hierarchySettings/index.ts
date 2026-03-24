// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext } from "../../api/managementGroupsAPIContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  list,
} from "../../api/hierarchySettings/operations.js";
import type {
  HierarchySettingsDeleteOptionalParams,
  HierarchySettingsUpdateOptionalParams,
  HierarchySettingsCreateOrUpdateOptionalParams,
  HierarchySettingsGetOptionalParams,
  HierarchySettingsListOptionalParams,
} from "../../api/hierarchySettings/options.js";
import type {
  HierarchySettingsList,
  HierarchySettings,
  CreateOrUpdateSettingsRequest,
} from "../../models/models.js";

/** Interface representing a HierarchySettings operations. */
export interface HierarchySettingsOperations {
  /** Deletes the hierarchy settings defined at the Management Group level. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (groupId: string, options?: HierarchySettingsDeleteOptionalParams) => Promise<void>;
  /** Updates the hierarchy settings defined at the Management Group level. */
  update: (
    groupId: string,
    createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
    options?: HierarchySettingsUpdateOptionalParams,
  ) => Promise<HierarchySettings>;
  /** Creates or updates the hierarchy settings defined at the Management Group level. */
  createOrUpdate: (
    groupId: string,
    createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
    options?: HierarchySettingsCreateOrUpdateOptionalParams,
  ) => Promise<HierarchySettings>;
  /** Gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. */
  get: (
    groupId: string,
    options?: HierarchySettingsGetOptionalParams,
  ) => Promise<HierarchySettings>;
  /** Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. */
  list: (
    groupId: string,
    options?: HierarchySettingsListOptionalParams,
  ) => Promise<HierarchySettingsList>;
}

function _getHierarchySettings(context: ManagementGroupsAPIContext) {
  return {
    delete: (groupId: string, options?: HierarchySettingsDeleteOptionalParams) =>
      $delete(context, groupId, options),
    update: (
      groupId: string,
      createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
      options?: HierarchySettingsUpdateOptionalParams,
    ) => update(context, groupId, createTenantSettingsRequest, options),
    createOrUpdate: (
      groupId: string,
      createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
      options?: HierarchySettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, groupId, createTenantSettingsRequest, options),
    get: (groupId: string, options?: HierarchySettingsGetOptionalParams) =>
      get(context, groupId, options),
    list: (groupId: string, options?: HierarchySettingsListOptionalParams) =>
      list(context, groupId, options),
  };
}

export function _getHierarchySettingsOperations(
  context: ManagementGroupsAPIContext,
): HierarchySettingsOperations {
  return {
    ..._getHierarchySettings(context),
  };
}
