// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, update, get } from "../../api/productSettings/operations.js";
import type {
  ProductSettingsListOptionalParams,
  ProductSettingsDeleteOptionalParams,
  ProductSettingsUpdateOptionalParams,
  ProductSettingsGetOptionalParams,
} from "../../api/productSettings/options.js";
import type { SettingsUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductSettings operations. */
export interface ProductSettingsOperations {
  /** List of all the settings */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ProductSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<SettingsUnion>;
  /** Delete setting of the product. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    settingsName: string,
    options?: ProductSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates setting. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    settingsName: string,
    settings: SettingsUnion,
    options?: ProductSettingsUpdateOptionalParams,
  ) => Promise<SettingsUnion>;
  /** Gets a setting. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    settingsName: string,
    options?: ProductSettingsGetOptionalParams,
  ) => Promise<SettingsUnion>;
}

function _getProductSettings(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ProductSettingsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      settingsName: string,
      options?: ProductSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, settingsName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      settingsName: string,
      settings: SettingsUnion,
      options?: ProductSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, settingsName, settings, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      settingsName: string,
      options?: ProductSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, settingsName, options),
  };
}

export function _getProductSettingsOperations(
  context: SecurityInsightsContext,
): ProductSettingsOperations {
  return {
    ..._getProductSettings(context),
  };
}
