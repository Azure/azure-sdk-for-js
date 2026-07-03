// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MicrosoftDatadogClient } from "./microsoftDatadogClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationResult,
  OperationDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  LatestLinkedSaaSResponse,
  SaaSData,
  DatadogMonitorResource,
  MonitorProperties,
  ProvisioningState,
  MonitoringStatus,
  MarketplaceSubscriptionStatus,
  DatadogOrganizationProperties,
  UserInfo,
  LiftrResourceCategories,
  SreAgentConfiguration,
  MarketplaceOfferDetails,
  ResourceSku,
  IdentityProperties,
  ManagedIdentityTypes,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  MonitoringTagRules,
  MonitoringTagRulesProperties,
  LogRules,
  FilteringTag,
  TagAction,
  MetricRules,
  AgentRules,
  ProxyResource,
  MonitoredSubscriptionProperties,
  SubscriptionList,
  Operation,
  MonitoredSubscription,
  Status,
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
  DatadogMonitorResourceUpdateParameters,
  MonitorUpdateProperties,
  SreAgentConnectorRequest,
  ConnectorAction,
  SreAgentConfigurationListResponse,
  DatadogApplicationKey,
  DatadogApiKey,
  DatadogHost,
  DatadogHostMetadata,
  DatadogInstallMethod,
  DatadogLogsAgent,
  LinkedResource,
  MonitoredResource,
  DatadogSetPasswordLink,
  BillingInfoResponse,
  MarketplaceSaaSInfo,
  PartnerBillingEntity,
  ResubscribeProperties,
  DatadogSingleSignOnResource,
  DatadogSingleSignOnProperties,
  SingleSignOnStates,
  DatadogAgreementResource,
  DatadogAgreementProperties,
  CreateResourceSupportedResponse,
  CreateResourceSupportedProperties,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownMonitoringStatus,
  KnownMarketplaceSubscriptionStatus,
  KnownLiftrResourceCategories,
  KnownManagedIdentityTypes,
  KnownCreatedByType,
  KnownTagAction,
  KnownOperation,
  KnownStatus,
  KnownConnectorAction,
  KnownSingleSignOnStates,
  KnownVersions,
} from "./models/index.js";
export type { MicrosoftDatadogClientOptionalParams } from "./api/index.js";
export type { BillingInfoGetOptionalParams } from "./api/billingInfo/index.js";
export type {
  CreationSupportedGetOptionalParams,
  CreationSupportedListOptionalParams,
} from "./api/creationSupported/index.js";
export type {
  DatadogMonitorResourcesLinkSaaSOptionalParams,
  DatadogMonitorResourcesLatestLinkedSaaSOptionalParams,
} from "./api/datadogMonitorResources/index.js";
export type {
  MarketplaceAgreementsCreateOrUpdateOptionalParams,
  MarketplaceAgreementsListOptionalParams,
} from "./api/marketplaceAgreements/index.js";
export type {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "./api/monitoredSubscriptions/index.js";
export type {
  MonitorsRefreshSetPasswordLinkOptionalParams,
  MonitorsListMonitoredResourcesOptionalParams,
  MonitorsListLinkedResourcesOptionalParams,
  MonitorsListHostsOptionalParams,
  MonitorsSetDefaultKeyOptionalParams,
  MonitorsGetDefaultKeyOptionalParams,
  MonitorsListApiKeysOptionalParams,
  MonitorsGetDefaultApplicationKeyOptionalParams,
  MonitorsManageSreAgentConnectorsOptionalParams,
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOptionalParams,
  MonitorsGetOptionalParams,
} from "./api/monitors/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { OrganizationsResubscribeOptionalParams } from "./api/organizations/index.js";
export type { SaaSOperationGroupActivateResourceOptionalParams } from "./api/saaSOperationGroup/index.js";
export type {
  SingleSignOnConfigurationsListOptionalParams,
  SingleSignOnConfigurationsCreateOrUpdateOptionalParams,
  SingleSignOnConfigurationsGetOptionalParams,
} from "./api/singleSignOnConfigurations/index.js";
export type {
  TagRulesListOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "./api/tagRules/index.js";
export type {
  BillingInfoOperations,
  CreationSupportedOperations,
  DatadogMonitorResourcesOperations,
  MarketplaceAgreementsOperations,
  MonitoredSubscriptionsOperations,
  MonitorsOperations,
  OperationsOperations,
  OrganizationsOperations,
  SaaSOperationGroupOperations,
  SingleSignOnConfigurationsOperations,
  TagRulesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
