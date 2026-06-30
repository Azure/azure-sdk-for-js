// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { InformaticaDataManagement } from "./informaticaDataManagement.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
  InformaticaOrganizationResource,
  OrganizationProperties,
  ProvisioningState,
  InformaticaProperties,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  UserDetails,
  CompanyDetails,
  LinkOrganization,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  InformaticaOrganizationResourceUpdate,
  OrganizationPropertiesCustomUpdate,
  MarketplaceDetailsUpdate,
  OfferDetailsUpdate,
  UserDetailsUpdate,
  CompanyDetailsUpdate,
  ServerlessMetadataResponse,
  RuntimeType,
  ServerlessConfigProperties,
  PlatformType,
  ApplicationTypeMetadata,
  ComputeUnitsMetadata,
  RegionsMetadata,
  ServerlessRuntimeConfigProperties,
  CdiConfigProps,
  ApplicationConfigs,
  InformaticaServerlessRuntimeResourceList,
  InfaRuntimeResourceFetchMetaData,
  InfaServerlessFetchConfigProperties,
  ServerlessRuntimeDataDisk,
  InformaticaServerlessRuntimeResource,
  InformaticaServerlessRuntimeProperties,
  ApplicationType,
  ServerlessRuntimeNetworkProfile,
  NetworkInterfaceConfiguration,
  AdvancedCustomProperties,
  ServerlessRuntimeTag,
  ServerlessRuntimeUserContextProperties,
  ProxyResource,
  InformaticaServerlessRuntimeResourceUpdate,
  ServerlessRuntimePropertiesCustomUpdate,
  ServerlessRuntimeNetworkProfileUpdate,
  NetworkInterfaceConfigurationUpdate,
  ServerlessRuntimeConfigPropertiesUpdate,
  ServerlessRuntimeUserContextPropertiesUpdate,
  CheckDependenciesResponse,
  ServerlessRuntimeDependency,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownMarketplaceSubscriptionStatus,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownRuntimeType,
  KnownPlatformType,
  KnownApplicationType,
  KnownVersions,
} from "./models/index.js";
export type { InformaticaDataManagementOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsGetAllServerlessRuntimesOptionalParams,
  OrganizationsGetServerlessMetadataOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type {
  ServerlessRuntimesServerlessResourceByIdOptionalParams,
  ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams,
  ServerlessRuntimesCheckDependenciesOptionalParams,
  ServerlessRuntimesUpdateOptionalParams,
  ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams,
  ServerlessRuntimesDeleteOptionalParams,
  ServerlessRuntimesCreateOrUpdateOptionalParams,
  ServerlessRuntimesGetOptionalParams,
} from "./api/serverlessRuntimes/index.js";
export type {
  OperationsOperations,
  OrganizationsOperations,
  ServerlessRuntimesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
