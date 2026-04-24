// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, update, create, get } from "../../api/workspaceSettings/operations.js";
import type {
  WorkspaceSettingsListOptionalParams,
  WorkspaceSettingsDeleteOptionalParams,
  WorkspaceSettingsUpdateOptionalParams,
  WorkspaceSettingsCreateOptionalParams,
  WorkspaceSettingsGetOptionalParams,
} from "../../api/workspaceSettings/options.js";
import type { LegacySettingsAPIWorkspaceSetting } from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceSettings operations. */
export interface WorkspaceSettingsOperations {
  /** Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set */
  list: (
    options?: WorkspaceSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<LegacySettingsAPIWorkspaceSetting>;
  /** Deletes the custom workspace settings for this subscription. new VMs will report to the default workspace */
  delete: (
    workspaceSettingName: string,
    options?: WorkspaceSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Settings about where we should store your security data and logs */
  update: (
    workspaceSettingName: string,
    workspaceSetting: LegacySettingsAPIWorkspaceSetting,
    options?: WorkspaceSettingsUpdateOptionalParams,
  ) => Promise<LegacySettingsAPIWorkspaceSetting>;
  /** creating settings about where we should store your security data and logs */
  create: (
    workspaceSettingName: string,
    workspaceSetting: LegacySettingsAPIWorkspaceSetting,
    options?: WorkspaceSettingsCreateOptionalParams,
  ) => Promise<LegacySettingsAPIWorkspaceSetting>;
  /** Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set */
  get: (
    workspaceSettingName: string,
    options?: WorkspaceSettingsGetOptionalParams,
  ) => Promise<LegacySettingsAPIWorkspaceSetting>;
}

function _getWorkspaceSettings(context: SecurityCenterContext) {
  return {
    list: (options?: WorkspaceSettingsListOptionalParams) => list(context, options),
    delete: (workspaceSettingName: string, options?: WorkspaceSettingsDeleteOptionalParams) =>
      $delete(context, workspaceSettingName, options),
    update: (
      workspaceSettingName: string,
      workspaceSetting: LegacySettingsAPIWorkspaceSetting,
      options?: WorkspaceSettingsUpdateOptionalParams,
    ) => update(context, workspaceSettingName, workspaceSetting, options),
    create: (
      workspaceSettingName: string,
      workspaceSetting: LegacySettingsAPIWorkspaceSetting,
      options?: WorkspaceSettingsCreateOptionalParams,
    ) => create(context, workspaceSettingName, workspaceSetting, options),
    get: (workspaceSettingName: string, options?: WorkspaceSettingsGetOptionalParams) =>
      get(context, workspaceSettingName, options),
  };
}

export function _getWorkspaceSettingsOperations(
  context: SecurityCenterContext,
): WorkspaceSettingsOperations {
  return {
    ..._getWorkspaceSettings(context),
  };
}
