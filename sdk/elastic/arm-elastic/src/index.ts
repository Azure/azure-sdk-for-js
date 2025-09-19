// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MicrosoftElastic } from "./microsoftElastic.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  OperationResult,
  OperationDisplay,
  ResourceProviderDefaultErrorResponse,
  ErrorResponseBody,
  MonitoredSubscriptionProperties,
  SubscriptionList,
  KnownOperation,
  Operation,
  MonitoredSubscription,
  KnownStatus,
  Status,
  MonitoringTagRulesProperties,
  KnownProvisioningState,
  ProvisioningState,
  LogRules,
  FilteringTag,
  KnownTagAction,
  TagAction,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  MonitoringTagRules,
  ElasticMonitorResource,
  MonitorProperties,
  KnownMonitoringStatus,
  MonitoringStatus,
  ElasticProperties,
  ElasticCloudUser,
  ElasticCloudDeployment,
  UserInfo,
  CompanyInfo,
  PlanDetails,
  KnownLiftrResourceCategories,
  LiftrResourceCategories,
  KnownHostingType,
  HostingType,
  ProjectDetails,
  KnownProjectType,
  ProjectType,
  KnownConfigurationType,
  ConfigurationType,
  ResourceSku,
  IdentityProperties,
  KnownManagedIdentityTypes,
  ManagedIdentityTypes,
  TrackedResource,
  ElasticMonitorResourceUpdateParameters,
  MonitoredResource,
  KnownSendingLogs,
  SendingLogs,
  DeploymentInfoResponse,
  KnownElasticDeploymentStatus,
  ElasticDeploymentStatus,
  MarketplaceSaaSInfo,
  MarketplaceSaaSInfoMarketplaceSubscription,
  ExternalUserInfo,
  ExternalUserCreationResponse,
  BillingInfoResponse,
  PartnerBillingEntity,
  ConnectedPartnerResourcesListFormat,
  ConnectedPartnerResourceProperties,
  VMResources,
  VMIngestionDetailsResponse,
  VMCollectionUpdate,
  KnownOperationName,
  OperationName,
  UpgradableVersionsList,
  ElasticMonitorUpgrade,
  ElasticTrafficFilterResponse,
  ElasticTrafficFilter,
  KnownType,
  Type,
  ElasticTrafficFilterRule,
  ResubscribeProperties,
  UserEmailId,
  UserApiKeyResponse,
  UserApiKeyResponseProperties,
  ElasticOrganizationToAzureSubscriptionMappingResponse,
  ElasticOrganizationToAzureSubscriptionMappingResponseProperties,
  OpenAIIntegrationRPModel,
  OpenAIIntegrationProperties,
  OpenAIIntegrationStatusResponse,
  OpenAIIntegrationStatusResponseProperties,
  ElasticVersionListFormat,
  ElasticVersionListProperties,
  KnownVersions,
} from "./models/index.js";
export { MicrosoftElasticOptionalParams } from "./api/index.js";
export { AllTrafficFiltersListOptionalParams } from "./api/allTrafficFilters/index.js";
export { AssociateTrafficFilterAssociateOptionalParams } from "./api/associateTrafficFilter/index.js";
export { BillingInfoGetOptionalParams } from "./api/billingInfo/index.js";
export { ConnectedPartnerResourcesListOptionalParams } from "./api/connectedPartnerResources/index.js";
export { CreateAndAssociateIPFilterCreateOptionalParams } from "./api/createAndAssociateIPFilter/index.js";
export { CreateAndAssociatePLFilterCreateOptionalParams } from "./api/createAndAssociatePLFilter/index.js";
export { DeploymentInfoListOptionalParams } from "./api/deploymentInfo/index.js";
export { DetachAndDeleteTrafficFilterDeleteOptionalParams } from "./api/detachAndDeleteTrafficFilter/index.js";
export { DetachTrafficFilterUpdateOptionalParams } from "./api/detachTrafficFilter/index.js";
export { ElasticVersionsListOptionalParams } from "./api/elasticVersions/index.js";
export { ExternalUserCreateOrUpdateOptionalParams } from "./api/externalUser/index.js";
export { ListAssociatedTrafficFiltersListOptionalParams } from "./api/listAssociatedTrafficFilters/index.js";
export { MonitorUpgradeOptionalParams } from "./api/monitor/index.js";
export { MonitoredResourcesListOptionalParams } from "./api/monitoredResources/index.js";
export {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "./api/monitoredSubscriptions/index.js";
export {
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOptionalParams,
  MonitorsGetOptionalParams,
} from "./api/monitors/index.js";
export {
  OpenAIGetStatusOptionalParams,
  OpenAIListOptionalParams,
  OpenAIDeleteOptionalParams,
  OpenAICreateOrUpdateOptionalParams,
  OpenAIGetOptionalParams,
} from "./api/openAI/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
  OrganizationsGetApiKeyOptionalParams,
  OrganizationsResubscribeOptionalParams,
} from "./api/organizations/index.js";
export {
  TagRulesListOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "./api/tagRules/index.js";
export { TrafficFiltersDeleteOptionalParams } from "./api/trafficFilters/index.js";
export { UpgradableVersionsDetailsOptionalParams } from "./api/upgradableVersions/index.js";
export { VMCollectionUpdateOptionalParams } from "./api/vmCollection/index.js";
export { VMHostListOptionalParams } from "./api/vmHost/index.js";
export { VMIngestionDetailsOptionalParams } from "./api/vmIngestion/index.js";
export {
  AllTrafficFiltersOperations,
  AssociateTrafficFilterOperations,
  BillingInfoOperations,
  ConnectedPartnerResourcesOperations,
  CreateAndAssociateIPFilterOperations,
  CreateAndAssociatePLFilterOperations,
  DeploymentInfoOperations,
  DetachAndDeleteTrafficFilterOperations,
  DetachTrafficFilterOperations,
  ElasticVersionsOperations,
  ExternalUserOperations,
  ListAssociatedTrafficFiltersOperations,
  MonitorOperations,
  MonitoredResourcesOperations,
  MonitoredSubscriptionsOperations,
  MonitorsOperations,
  OpenAIOperations,
  OperationsOperations,
  OrganizationsOperations,
  TagRulesOperations,
  TrafficFiltersOperations,
  UpgradableVersionsOperations,
  VMCollectionOperations,
  VMHostOperations,
  VMIngestionOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
