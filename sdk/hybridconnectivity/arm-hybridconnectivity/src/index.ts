// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HybridConnectivityManagementAPI } from "./hybridConnectivityManagementAPI.js";
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
  EndpointResource,
  EndpointProperties,
  Type,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  ListCredentialsRequest,
  ServiceName,
  EndpointAccessResource,
  RelayNamespaceAccessProperties,
  ListIngressGatewayCredentialsRequest,
  IngressGatewayResource,
  IngressProfileProperties,
  AADProfileProperties,
  ManagedProxyRequest,
  ManagedProxyResource,
  ServiceConfigurationResource,
  ServiceConfigurationProperties,
  ProvisioningState,
  ServiceConfigurationResourcePatch,
  ServiceConfigurationPropertiesPatch,
  GenerateAwsTemplateRequest,
  SolutionTypeSettings,
  SolutionSettings,
  GenerateAwsTemplateResponse,
  PublicCloudConnector,
  PublicCloudConnectorProperties,
  AwsCloudProfile,
  HostType,
  ResourceProvisioningState,
  TrackedResource,
  PublicCloudConnectorUpdate,
  PublicCloudConnectorPropertiesUpdate,
  AwsCloudProfileUpdate,
  TrackedResourceUpdate,
  OperationStatusResult,
  SolutionConfiguration,
  SolutionConfigurationProperties,
  SolutionConfigurationStatus,
  SolutionConfigurationUpdate,
  SolutionConfigurationPropertiesUpdate,
  ProxyResource,
  InventoryResource,
  InventoryProperties,
  CloudNativeType,
  SolutionTypeResource,
  SolutionTypeProperties,
  SolutionTypeSettingsProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownType,
  KnownCreatedByType,
  KnownServiceName,
  KnownProvisioningState,
  KnownHostType,
  KnownResourceProvisioningState,
  KnownSolutionConfigurationStatus,
  KnownCloudNativeType,
  KnownVersions,
} from "./models/index.js";
export type { HybridConnectivityManagementAPIOptionalParams } from "./api/index.js";
export type {
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export type { GenerateAwsTemplatePostOptionalParams } from "./api/generateAwsTemplate/index.js";
export type {
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
} from "./api/inventory/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
} from "./api/publicCloudConnectors/index.js";
export type {
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
} from "./api/serviceConfigurations/index.js";
export type {
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
} from "./api/solutionConfigurations/index.js";
export type {
  SolutionTypesListBySubscriptionOptionalParams,
  SolutionTypesListByResourceGroupOptionalParams,
  SolutionTypesGetOptionalParams,
} from "./api/solutionTypes/index.js";
export type {
  EndpointsOperations,
  GenerateAwsTemplateOperations,
  InventoryOperations,
  OperationsOperations,
  PublicCloudConnectorsOperations,
  ServiceConfigurationsOperations,
  SolutionConfigurationsOperations,
  SolutionTypesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
