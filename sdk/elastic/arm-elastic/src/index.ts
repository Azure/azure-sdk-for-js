// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MicrosoftElastic } from "./microsoftElastic.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationResult,
  OperationDisplay,
  ResourceProviderDefaultErrorResponse,
  ErrorResponseBody,
  MonitoredSubscriptionProperties,
  SubscriptionList,
  Operation,
  CustomMonitoredSubscription,
  Status,
  MonitoringTagRulesProperties,
  ProvisioningState,
  LogRules,
  FilteringTag,
  TagAction,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  MonitoringTagRules,
  ElasticMonitorResource,
  MonitorProperties,
  MonitoringStatus,
  ElasticProperties,
  ElasticCloudUser,
  ElasticCloudDeployment,
  UserInfo,
  CompanyInfo,
  PlanDetails,
  LiftrResourceCategories,
  HostingType,
  ProjectDetails,
  ProjectType,
  ConfigurationType,
  ResourceSku,
  IdentityProperties,
  ManagedIdentityTypes,
  TrackedResource,
  ElasticMonitorResourceUpdateParameters,
  MonitoredResource,
  SendingLogs,
  DeploymentInfoResponse,
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
  OperationName,
  UpgradableVersionsList,
  ElasticMonitorUpgrade,
  ElasticTrafficFilterResponse,
  ElasticTrafficFilter,
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
} from "./models/index.js";
export {
  KnownOperation,
  KnownStatus,
  KnownProvisioningState,
  KnownTagAction,
  KnownCreatedByType,
  KnownMonitoringStatus,
  KnownLiftrResourceCategories,
  KnownHostingType,
  KnownProjectType,
  KnownConfigurationType,
  KnownManagedIdentityTypes,
  KnownSendingLogs,
  KnownElasticDeploymentStatus,
  KnownOperationName,
  KnownType,
  KnownVersions,
} from "./models/index.js";
export type { MicrosoftElasticOptionalParams } from "./api/index.js";
export type { AllTrafficFiltersListOptionalParams } from "./api/allTrafficFilters/index.js";
export type { AssociateTrafficFilterAssociateOptionalParams } from "./api/associateTrafficFilter/index.js";
export type { BillingInfoGetOptionalParams } from "./api/billingInfo/index.js";
export type { ConnectedPartnerResourcesListOptionalParams } from "./api/connectedPartnerResources/index.js";
export type { CreateAndAssociateIPFilterCreateOptionalParams } from "./api/createAndAssociateIPFilter/index.js";
export type { CreateAndAssociatePLFilterCreateOptionalParams } from "./api/createAndAssociatePLFilter/index.js";
export type { DeploymentInfoListOptionalParams } from "./api/deploymentInfo/index.js";
export type { DetachAndDeleteTrafficFilterDeleteOptionalParams } from "./api/detachAndDeleteTrafficFilter/index.js";
export type { DetachTrafficFilterUpdateOptionalParams } from "./api/detachTrafficFilter/index.js";
export type { ElasticVersionsListOptionalParams } from "./api/elasticVersions/index.js";
export type { ExternalUserCreateOrUpdateOptionalParams } from "./api/externalUser/index.js";
export type { ListAssociatedTrafficFiltersListOptionalParams } from "./api/listAssociatedTrafficFilters/index.js";
export type { MonitorUpgradeOptionalParams } from "./api/monitor/index.js";
export type { MonitoredResourcesListOptionalParams } from "./api/monitoredResources/index.js";
export type {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "./api/monitoredSubscriptions/index.js";
export type {
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOptionalParams,
  MonitorsGetOptionalParams,
} from "./api/monitors/index.js";
export type {
  OpenAIGetStatusOptionalParams,
  OpenAIListOptionalParams,
  OpenAIDeleteOptionalParams,
  OpenAICreateOrUpdateOptionalParams,
  OpenAIGetOptionalParams,
} from "./api/openAI/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
  OrganizationsGetApiKeyOptionalParams,
  OrganizationsResubscribeOptionalParams,
} from "./api/organizations/index.js";
export type {
  TagRulesListOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "./api/tagRules/index.js";
export type { TrafficFiltersDeleteOptionalParams } from "./api/trafficFilters/index.js";
export type { UpgradableVersionsDetailsOptionalParams } from "./api/upgradableVersions/index.js";
export type { vMCollectionUpdateOptionalParams } from "./api/vMCollection/index.js";
export type { vMHostListOptionalParams } from "./api/vMHost/index.js";
export type { vMIngestionDetailsOptionalParams } from "./api/vMIngestion/index.js";
export type {
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
  vMCollectionOperations,
  vMHostOperations,
  vMIngestionOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
