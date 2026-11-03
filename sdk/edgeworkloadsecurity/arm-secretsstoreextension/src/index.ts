// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SecretsStoreExtensionManagementClient } from "./secretsStoreExtensionManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  AzureKeyVaultSecretProviderClass,
  AzureKeyVaultSecretProviderClassProperties,
  AzureCloudName,
  ProvisioningState,
  ExtendedLocation,
  ExtendedLocationType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  AzureKeyVaultSecretProviderClassUpdate,
  AzureKeyVaultSecretProviderClassUpdateProperties,
  SecretSync,
  SecretSyncProperties,
  KubernetesSecretType,
  KubernetesSecretObjectMapping,
  SecretSyncStatus,
  SecretSyncCondition,
  StatusConditionType,
  SecretSyncUpdate,
  SecretSyncUpdateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAzureCloudName,
  KnownProvisioningState,
  KnownExtendedLocationType,
  KnownCreatedByType,
  KnownKubernetesSecretType,
  KnownStatusConditionType,
  KnownVersions,
} from "./models/index.js";
export type { SecretsStoreExtensionManagementClientOptionalParams } from "./api/index.js";
export type {
  AzureKeyVaultSecretProviderClassesListBySubscriptionOptionalParams,
  AzureKeyVaultSecretProviderClassesListByResourceGroupOptionalParams,
  AzureKeyVaultSecretProviderClassesDeleteOptionalParams,
  AzureKeyVaultSecretProviderClassesUpdateOptionalParams,
  AzureKeyVaultSecretProviderClassesCreateOrUpdateOptionalParams,
  AzureKeyVaultSecretProviderClassesGetOptionalParams,
} from "./api/azureKeyVaultSecretProviderClasses/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SecretSyncsListBySubscriptionOptionalParams,
  SecretSyncsListByResourceGroupOptionalParams,
  SecretSyncsDeleteOptionalParams,
  SecretSyncsUpdateOptionalParams,
  SecretSyncsCreateOrUpdateOptionalParams,
  SecretSyncsGetOptionalParams,
} from "./api/secretSyncs/index.js";
export type {
  AzureKeyVaultSecretProviderClassesOperations,
  OperationsOperations,
  SecretSyncsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
