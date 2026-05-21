// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, update, get } from "../../api/productSettings/operations.js";
import {
  ProductSettingsListOptionalParams,
  ProductSettingsDeleteOptionalParams,
  ProductSettingsUpdateOptionalParams,
  ProductSettingsGetOptionalParams,
} from "../../api/productSettings/options.js";
import { SettingsUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductSettings operations. */
export interface ProductSettingsOperations {
  /** List of all the settings */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ProductSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<SettingsUnion>;
  /** Delete setting of the product. */
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
