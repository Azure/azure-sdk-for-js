// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HybridConnectivityManagementAPI } from "./hybridConnectivityManagementAPI.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  SolutionTypeResource,
  SolutionTypeProperties,
  SolutionTypeSettingsProperties,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  InventoryResource,
  InventoryProperties,
  KnownCloudNativeType,
  CloudNativeType,
  KnownSolutionConfigurationStatus,
  SolutionConfigurationStatus,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  SolutionConfiguration,
  SolutionConfigurationProperties,
  SolutionSettings,
  ExtensionResource,
  SolutionConfigurationUpdate,
  SolutionConfigurationPropertiesUpdate,
  OperationStatusResult,
  PublicCloudConnector,
  PublicCloudConnectorProperties,
  AwsCloudProfile,
  KnownHostType,
  HostType,
  TrackedResource,
  PublicCloudConnectorUpdate,
  PublicCloudConnectorPropertiesUpdate,
  AwsCloudProfileUpdate,
  TrackedResourceUpdate,
  GenerateAwsTemplateRequest,
  SolutionTypeSettings,
  ServiceConfigurationResource,
  ServiceConfigurationProperties,
  KnownServiceName,
  ServiceName,
  KnownProvisioningState,
  ProvisioningState,
  ServiceConfigurationResourcePatch,
  ServiceConfigurationPropertiesPatch,
  EndpointResource,
  EndpointProperties,
  KnownType,
  Type,
  ListCredentialsRequest,
  EndpointAccessResource,
  RelayNamespaceAccessProperties,
  ListIngressGatewayCredentialsRequest,
  IngressGatewayResource,
  IngressProfileProperties,
  AADProfileProperties,
  ManagedProxyRequest,
  ManagedProxyResource,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
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
