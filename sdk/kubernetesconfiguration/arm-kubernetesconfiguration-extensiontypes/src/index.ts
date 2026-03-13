// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ExtensionTypesClient } from "./extensionTypesClient.js";
export type {
  ExtensionType,
  ExtensionTypeProperties,
  ExtensionTypePropertiesPlanInfo,
  ExtensionTypePropertiesSupportedScopes,
  ClusterScopeSettings,
  ClusterScopeSettingsProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ExtensionTypeVersionForReleaseTrain,
  ExtensionTypeVersionForReleaseTrainProperties,
  ExtensionTypeVersionForReleaseTrainPropertiesUnsupportedKubernetesVersions,
  ExtensionTypeVersionUnsupportedKubernetesMatrixItem,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { ExtensionTypesClientOptionalParams } from "./api/index.js";
export type {
  ExtensionTypesClusterListVersionsOptionalParams,
  ExtensionTypesClusterGetVersionOptionalParams,
  ExtensionTypesListVersionsOptionalParams,
  ExtensionTypesGetVersionOptionalParams,
  ExtensionTypesListOptionalParams,
  ExtensionTypesGetOptionalParams,
  ExtensionTypesLocationListOptionalParams,
  ExtensionTypesLocationGetOptionalParams,
} from "./api/extensionTypes/index.js";
export type { ExtensionTypesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
