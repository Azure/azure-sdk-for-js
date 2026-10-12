// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecretsStoreExtensionManagementContext } from "../../api/secretsStoreExtensionManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/azureKeyVaultSecretProviderClasses/operations.js";
import type {
  AzureKeyVaultSecretProviderClassesListBySubscriptionOptionalParams,
  AzureKeyVaultSecretProviderClassesListByResourceGroupOptionalParams,
  AzureKeyVaultSecretProviderClassesDeleteOptionalParams,
  AzureKeyVaultSecretProviderClassesUpdateOptionalParams,
  AzureKeyVaultSecretProviderClassesCreateOrUpdateOptionalParams,
  AzureKeyVaultSecretProviderClassesGetOptionalParams,
} from "../../api/azureKeyVaultSecretProviderClasses/options.js";
import type {
  AzureKeyVaultSecretProviderClass,
  AzureKeyVaultSecretProviderClassUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureKeyVaultSecretProviderClasses operations. */
export interface AzureKeyVaultSecretProviderClassesOperations {
  /** Lists the AzureKeyVaultSecretProviderClass instances within an Azure subscription. */
  listBySubscription: (
    options?: AzureKeyVaultSecretProviderClassesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AzureKeyVaultSecretProviderClass>;
  /** Lists the AzureKeyVaultSecretProviderClass instances within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AzureKeyVaultSecretProviderClassesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AzureKeyVaultSecretProviderClass>;
  /** Deletes an AzureKeyVaultSecretProviderClass instance. */
  delete: (
    resourceGroupName: string,
    azureKeyVaultSecretProviderClassName: string,
    options?: AzureKeyVaultSecretProviderClassesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an AzureKeyVaultSecretProviderClass instance. */
  update: (
    resourceGroupName: string,
    azureKeyVaultSecretProviderClassName: string,
    properties: AzureKeyVaultSecretProviderClassUpdate,
    options?: AzureKeyVaultSecretProviderClassesUpdateOptionalParams,
  ) => PollerLike<
    OperationState<AzureKeyVaultSecretProviderClass>,
    AzureKeyVaultSecretProviderClass
  >;
  /** Creates, or updates, an AzureKeyVaultSecretProviderClass instance. */
  createOrUpdate: (
    resourceGroupName: string,
    azureKeyVaultSecretProviderClassName: string,
    resource: AzureKeyVaultSecretProviderClass,
    options?: AzureKeyVaultSecretProviderClassesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<AzureKeyVaultSecretProviderClass>,
    AzureKeyVaultSecretProviderClass
  >;
  /** Gets the properties of an AzureKeyVaultSecretProviderClass instance. */
  get: (
    resourceGroupName: string,
    azureKeyVaultSecretProviderClassName: string,
    options?: AzureKeyVaultSecretProviderClassesGetOptionalParams,
  ) => Promise<AzureKeyVaultSecretProviderClass>;
}

function _getAzureKeyVaultSecretProviderClasses(context: SecretsStoreExtensionManagementContext) {
  return {
    listBySubscription: (
      options?: AzureKeyVaultSecretProviderClassesListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AzureKeyVaultSecretProviderClassesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      azureKeyVaultSecretProviderClassName: string,
      options?: AzureKeyVaultSecretProviderClassesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureKeyVaultSecretProviderClassName, options),
    update: (
      resourceGroupName: string,
      azureKeyVaultSecretProviderClassName: string,
      properties: AzureKeyVaultSecretProviderClassUpdate,
      options?: AzureKeyVaultSecretProviderClassesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, azureKeyVaultSecretProviderClassName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureKeyVaultSecretProviderClassName: string,
      resource: AzureKeyVaultSecretProviderClass,
      options?: AzureKeyVaultSecretProviderClassesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        azureKeyVaultSecretProviderClassName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureKeyVaultSecretProviderClassName: string,
      options?: AzureKeyVaultSecretProviderClassesGetOptionalParams,
    ) => get(context, resourceGroupName, azureKeyVaultSecretProviderClassName, options),
  };
}

export function _getAzureKeyVaultSecretProviderClassesOperations(
  context: SecretsStoreExtensionManagementContext,
): AzureKeyVaultSecretProviderClassesOperations {
  return {
    ..._getAzureKeyVaultSecretProviderClasses(context),
  };
}
