// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  $delete,
  update,
  createAndUpdate,
  get,
} from "../../api/componentLinkedStorageAccounts/operations.js";
import {
  ComponentLinkedStorageAccountsDeleteOptionalParams,
  ComponentLinkedStorageAccountsUpdateOptionalParams,
  ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ComponentLinkedStorageAccountsGetOptionalParams,
} from "../../api/componentLinkedStorageAccounts/options.js";
import {
  ComponentLinkedStorageAccounts,
  StorageType,
  ComponentLinkedStorageAccountsPatch,
} from "../../models/componentLinkedStorageAccountApi/models.js";

/** Interface representing a ComponentLinkedStorageAccounts operations. */
export interface ComponentLinkedStorageAccountsOperations {
  /** Delete linked storage accounts for an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    options?: ComponentLinkedStorageAccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update linked storage accounts for an Application Insights component. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    linkedStorageAccountsProperties: ComponentLinkedStorageAccountsPatch,
    options?: ComponentLinkedStorageAccountsUpdateOptionalParams,
  ) => Promise<ComponentLinkedStorageAccounts>;
  /** Replace current linked storage account for an Application Insights component. */
  createAndUpdate: (
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    linkedStorageAccountsProperties: ComponentLinkedStorageAccounts,
    options?: ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ) => Promise<ComponentLinkedStorageAccounts>;
  /** Returns the current linked storage settings for an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    storageType: StorageType,
    options?: ComponentLinkedStorageAccountsGetOptionalParams,
  ) => Promise<ComponentLinkedStorageAccounts>;
}

function _getComponentLinkedStorageAccounts(context: ApplicationInsightsManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      resourceName: string,
      storageType: StorageType,
      options?: ComponentLinkedStorageAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, storageType, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      storageType: StorageType,
      linkedStorageAccountsProperties: ComponentLinkedStorageAccountsPatch,
      options?: ComponentLinkedStorageAccountsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        storageType,
        linkedStorageAccountsProperties,
        options,
      ),
    createAndUpdate: (
      resourceGroupName: string,
      resourceName: string,
      storageType: StorageType,
      linkedStorageAccountsProperties: ComponentLinkedStorageAccounts,
      options?: ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
    ) =>
      createAndUpdate(
        context,
        resourceGroupName,
        resourceName,
        storageType,
        linkedStorageAccountsProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      storageType: StorageType,
      options?: ComponentLinkedStorageAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, storageType, options),
  };
}

export function _getComponentLinkedStorageAccountsOperations(
  context: ApplicationInsightsManagementContext,
): ComponentLinkedStorageAccountsOperations {
  return {
    ..._getComponentLinkedStorageAccounts(context),
  };
}
