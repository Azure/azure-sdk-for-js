// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MicrosoftResourceHealth } from "./microsoftResourceHealth.js";
export type {
  OperationListResult,
  Operation,
  OperationDisplay,
  ErrorResponse,
  AvailabilityStatus,
  AvailabilityStatusProperties,
  AvailabilityStateValues,
  ReasonChronicityTypes,
  AvailabilityStatusPropertiesRecentlyResolved,
  RecommendedAction,
  ServiceImpactingEvent,
  ServiceImpactingEventStatus,
  ServiceImpactingEventIncidentProperties,
  CustomizedProxyResource,
  EventImpactedResource,
  EventImpactedResourceProperties,
  KeyValueItem,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  MetadataEntity,
  MetadataEntityProperties,
  Scenario,
  MetadataSupportedValueDetail,
  Event,
  EventProperties,
  EventTypeValues,
  EventSubTypeValues,
  EventSourceValues,
  EventStatusValues,
  LevelValues,
  EventLevelValues,
  EventPropertiesArticle,
  Link,
  LinkTypeValues,
  LinkDisplayText,
  Impact,
  ImpactedServiceRegion,
  Update,
  EventPropertiesRecommendedActions,
  EventPropertiesRecommendedActionsItem,
  Faq,
  EventPropertiesAdditionalInformation,
  EmergingIssuesGetResult,
  EmergingIssue,
  StatusBanner,
  StatusActiveEvent,
  SeverityValues,
  StageValues,
  EmergingIssueImpact,
  ImpactedRegion,
  IssueNameParameter,
} from "./models/index.js";
export {
  KnownAvailabilityStateValues,
  KnownReasonChronicityTypes,
  KnownCreatedByType,
  KnownScenario,
  KnownEventTypeValues,
  KnownEventSubTypeValues,
  KnownEventSourceValues,
  KnownEventStatusValues,
  KnownLevelValues,
  KnownEventLevelValues,
  KnownLinkTypeValues,
  KnownSeverityValues,
  KnownStageValues,
  KnownIssueNameParameter,
  KnownVersions,
} from "./models/index.js";
export type { MicrosoftResourceHealthOptionalParams } from "./api/index.js";
export type {
  AvailabilityStatusesListByResourceGroupOptionalParams,
  AvailabilityStatusesListOptionalParams,
  AvailabilityStatusesListBySubscriptionIdOptionalParams,
  AvailabilityStatusesGetByResourceOptionalParams,
} from "./api/availabilityStatuses/index.js";
export type {
  ChildAvailabilityStatusesListOptionalParams,
  ChildAvailabilityStatusesGetByResourceOptionalParams,
} from "./api/childAvailabilityStatuses/index.js";
export type { ChildResourcesListOptionalParams } from "./api/childResources/index.js";
export type {
  EmergingIssuesListOptionalParams,
  EmergingIssuesGetOptionalParams,
} from "./api/emergingIssues/index.js";
export type {
  EventFetchDetailsByTenantIdAndTrackingIdOptionalParams,
  EventGetByTenantIdAndTrackingIdOptionalParams,
  EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventGetBySubscriptionIdAndTrackingIdOptionalParams,
} from "./api/event/index.js";
export type {
  EventsListBySingleResourceOptionalParams,
  EventsListByTenantIdOptionalParams,
  EventsListBySubscriptionIdOptionalParams,
} from "./api/events/index.js";
export type {
  ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
  ImpactedResourcesGetOptionalParams,
  ImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  ImpactedResourcesGetByTenantIdOptionalParams,
} from "./api/impactedResources/index.js";
export type {
  MetadataListOptionalParams,
  MetadataGetEntityOptionalParams,
} from "./api/metadata/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
} from "./api/securityAdvisoryImpactedResources/index.js";
export type {
  AvailabilityStatusesOperations,
  ChildAvailabilityStatusesOperations,
  ChildResourcesOperations,
  EmergingIssuesOperations,
  EventOperations,
  EventsOperations,
  ImpactedResourcesOperations,
  MetadataOperations,
  OperationsOperations,
  SecurityAdvisoryImpactedResourcesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
