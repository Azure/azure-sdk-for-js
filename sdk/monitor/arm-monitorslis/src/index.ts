// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MonitorClient } from "./monitorClient.js";
export type {
  Sli,
  SliResource,
  ProvisioningState,
  Category,
  EvaluationType,
  ExecutionState,
  AmwAccount,
  Metric,
  BaselineProperties,
  Baseline,
  EvaluationCalculationType,
  SliProperties,
  Signal,
  SignalSource,
  Condition,
  ScalarFunction,
  SamplingType,
  ConditionOperator,
  SpatialAggregation,
  SpatialAggregationType,
  TemporalAggregation,
  TemporalAggregationType,
  WindowUptimeCriteria,
  WindowUptimeCriteriaComparator,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SignalPreviewSliProperties,
  PreviewType,
  KqlmQueryResult,
  QueryState,
  TimeSeriesSet,
  ResultsMetadata,
  SamplingTypeProjection,
  TimeSeriesData,
  SamplingTypesDataDictionary,
  ExecutionMessage,
  MessageSeverity,
  StatementContextInformation,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCategory,
  KnownEvaluationType,
  KnownEvaluationCalculationType,
  KnownScalarFunction,
  KnownSamplingType,
  KnownConditionOperator,
  KnownSpatialAggregationType,
  KnownTemporalAggregationType,
  KnownWindowUptimeCriteriaComparator,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownPreviewType,
  KnownQueryState,
  KnownSamplingTypeProjection,
  KnownMessageSeverity,
  KnownVersions,
} from "./models/index.js";
export type { MonitorClientOptionalParams } from "./api/index.js";
export type {
  SlisListByParentOptionalParams,
  SlisDeleteOptionalParams,
  SlisCreateOrUpdateOptionalParams,
  SlisGetOptionalParams,
} from "./api/slis/index.js";
export type { SloViewSliSignalPreviewOptionalParams } from "./api/sloView/index.js";
export type { SlisOperations, SloViewOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
