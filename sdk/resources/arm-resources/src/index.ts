// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ResourceManagementClient } from "./resourceManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  CloudError,
  ErrorResponse,
  ErrorAdditionalInfo,
  ResourceGroup,
  ResourceGroupProperties,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourceGroupPatchable,
  ErrorDetail,
  ExportTemplateRequest,
  ExportTemplateOutputFormat,
  ResourceGroupExportResult,
  GenericResourceExpanded,
  GenericResource,
  Plan,
  Sku,
  Identity,
  ResourceIdentityType,
  IdentityUserAssignedIdentitiesValue,
  ExtendedLocation,
  ExtendedLocationType,
  ResourcesMoveInfo,
  TagsResource,
  Tags,
  ExtensionResource,
  TagsPatchResource,
  TagsPatchOperation,
  TagValue,
  TagCount,
  TagDetails,
  Provider,
  ProviderResourceType,
  ProviderExtendedLocation,
  Alias,
  AliasPath,
  AliasPattern,
  AliasPatternType,
  AliasPathMetadata,
  AliasPathTokenType,
  AliasPathAttributes,
  AliasType,
  ZoneMapping,
  ApiProfile,
  ProviderAuthorizationConsentState,
  ProviderPermissionListResult,
  ProviderPermission,
  RoleDefinition,
  Permission,
  ProviderRegistrationRequest,
  ProviderConsentDefinition,
  ProviderResourceTypeListResult,
  ResourcesCheckExistenceResponse,
  ResourcesCheckExistenceByIdResponse,
  ResourceGroupsCheckExistenceResponse,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownExportTemplateOutputFormat,
  KnownExtendedLocationType,
  KnownTagsPatchOperation,
  KnownAliasPathTokenType,
  KnownAliasPathAttributes,
  KnownProviderAuthorizationConsentState,
  KnownVersions,
} from "./models/index.js";
export type { ResourceManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ProviderResourceTypesListOptionalParams } from "./api/providerResourceTypes/index.js";
export type {
  ProvidersGetAtTenantScopeOptionalParams,
  ProvidersGetOptionalParams,
  ProvidersListOptionalParams,
  ProvidersRegisterOptionalParams,
  ProvidersProviderPermissionsOptionalParams,
  ProvidersRegisterAtManagementGroupScopeOptionalParams,
  ProvidersUnregisterOptionalParams,
  ProvidersListAtTenantScopeOptionalParams,
} from "./api/providers/index.js";
export type {
  ResourceGroupsExportTemplateOptionalParams,
  ResourceGroupsListOptionalParams,
  ResourceGroupsDeleteOptionalParams,
  ResourceGroupsUpdateOptionalParams,
  ResourceGroupsCreateOrUpdateOptionalParams,
  ResourceGroupsCheckExistenceOptionalParams,
  ResourceGroupsGetOptionalParams,
} from "./api/resourceGroups/index.js";
export type {
  ResourcesListOptionalParams,
  ResourcesDeleteOptionalParams,
  ResourcesUpdateOptionalParams,
  ResourcesCreateOrUpdateOptionalParams,
  ResourcesGetOptionalParams,
  ResourcesCheckExistenceOptionalParams,
  ResourcesDeleteByIdOptionalParams,
  ResourcesUpdateByIdOptionalParams,
  ResourcesCreateOrUpdateByIdOptionalParams,
  ResourcesGetByIdOptionalParams,
  ResourcesCheckExistenceByIdOptionalParams,
  ResourcesValidateMoveResourcesOptionalParams,
  ResourcesMoveResourcesOptionalParams,
  ResourcesListByResourceGroupOptionalParams,
} from "./api/resources/index.js";
export type {
  TagsOperationsListOptionalParams,
  TagsOperationsDeleteOptionalParams,
  TagsOperationsCreateOrUpdateOptionalParams,
  TagsOperationsCreateOrUpdateValueOptionalParams,
  TagsOperationsDeleteValueOptionalParams,
  TagsOperationsDeleteAtScopeOptionalParams,
  TagsOperationsUpdateAtScopeOptionalParams,
  TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  TagsOperationsGetAtScopeOptionalParams,
} from "./api/tagsOperations/index.js";
export type {
  OperationsOperations,
  ProviderResourceTypesOperations,
  ProvidersOperations,
  ResourceGroupsOperations,
  ResourcesOperations,
  TagsOperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
