// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HybridConnectivityManagementAPI } from "./hybridConnectivityManagementAPI.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  EndpointResource,
  EndpointProperties,
  KnownType,
  Type,
  ExtensionResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ListCredentialsRequest,
  KnownServiceName,
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
  KnownProvisioningState,
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
  KnownHostType,
  HostType,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  TrackedResource,
  PublicCloudConnectorUpdate,
  PublicCloudConnectorPropertiesUpdate,
  AwsCloudProfileUpdate,
  TrackedResourceUpdate,
  OperationStatusResult,
  SolutionConfiguration,
  SolutionConfigurationProperties,
  KnownSolutionConfigurationStatus,
  SolutionConfigurationStatus,
  SolutionConfigurationUpdate,
  SolutionConfigurationPropertiesUpdate,
  ProxyResource,
  InventoryResource,
  InventoryProperties,
  KnownCloudNativeType,
  CloudNativeType,
  SolutionTypeResource,
  SolutionTypeProperties,
  SolutionTypeSettingsProperties,
  KnownVersions,
} from "./models/index.js";
export { HybridConnectivityManagementAPIOptionalParams } from "./api/index.js";
export {
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export { GenerateAwsTemplatePostOptionalParams } from "./api/generateAwsTemplate/index.js";
export {
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
} from "./api/inventory/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
} from "./api/publicCloudConnectors/index.js";
export {
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
} from "./api/serviceConfigurations/index.js";
export {
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
} from "./api/solutionConfigurations/index.js";
export {
  SolutionTypesListBySubscriptionOptionalParams,
  SolutionTypesListByResourceGroupOptionalParams,
  SolutionTypesGetOptionalParams,
} from "./api/solutionTypes/index.js";
export {
  EndpointsOperations,
  GenerateAwsTemplateOperations,
  InventoryOperations,
  OperationsOperations,
  PublicCloudConnectorsOperations,
  ServiceConfigurationsOperations,
  SolutionConfigurationsOperations,
  SolutionTypesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
