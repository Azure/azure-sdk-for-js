// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HelpRP } from "./helpRP.js";
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
  DiagnosticResource,
  DiagnosticResourceProperties,
  DiagnosticInvocation,
  DiagnosticProvisioningState,
  Diagnostic,
  Status,
  Insight,
  ImportanceLevel,
  ErrorModel,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  SolutionResource,
  SolutionResourceProperties,
  TriggerCriterion,
  Name,
  SolutionProvisioningState,
  ReplacementMaps,
  WebResult,
  SearchResult,
  Confidence,
  ResultType,
  SolutionsDiagnostic,
  SolutionsTroubleshooters,
  MetricsBasedChart,
  AggregationType,
  FilterGroup,
  Filter,
  Video,
  VideoGroup,
  VideoGroupVideo,
  Section,
  SolutionPatchRequestBody,
  SolutionWarmUpRequestBody,
  SimplifiedSolutionsResource,
  SimplifiedSolutionsResourceProperties,
  TroubleshooterResource,
  TroubleshooterInstanceProperties,
  TroubleshooterProvisioningState,
  Step,
  ExecutionStatus,
  Type,
  StepInput,
  QuestionType,
  QuestionContentType,
  ResponseValidationProperties,
  ValidationScope,
  ResponseOption,
  AutomatedCheckResult,
  AutomatedCheckResultType,
  ContinueRequestBody,
  TroubleshooterResponse,
  RestartTroubleshooterResponse,
  SolutionResourceSelfHelp,
  SolutionsResourcePropertiesSelfHelp,
  ReplacementMapsSelfHelp,
  SectionSelfHelp,
  ProxyResource,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  SolutionMetadataResource,
  Solutions,
  SolutionMetadataProperties,
  SolutionType,
  DiscoveryNlpRequest,
  DiscoveryNlpResponse,
  SolutionNlpMetadataResource,
  NlpSolutions,
  ClassificationService,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownDiagnosticProvisioningState,
  KnownStatus,
  KnownImportanceLevel,
  KnownCreatedByType,
  KnownName,
  KnownSolutionProvisioningState,
  KnownConfidence,
  KnownResultType,
  KnownAggregationType,
  KnownTroubleshooterProvisioningState,
  KnownExecutionStatus,
  KnownType,
  KnownQuestionType,
  KnownQuestionContentType,
  KnownValidationScope,
  KnownAutomatedCheckResultType,
  KnownSolutionType,
  KnownVersions,
} from "./models/index.js";
export type { HelpRPOptionalParams } from "./api/index.js";
export type { CheckNameAvailabilityCheckAvailabilityOptionalParams } from "./api/checkNameAvailability/index.js";
export type {
  DiagnosticsCreateOptionalParams,
  DiagnosticsGetOptionalParams,
} from "./api/diagnostics/index.js";
export type { DiscoverySolutionListOptionalParams } from "./api/discoverySolution/index.js";
export type {
  DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
} from "./api/discoverySolutionNLP/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SimplifiedSolutionsCreateOptionalParams,
  SimplifiedSolutionsGetOptionalParams,
} from "./api/simplifiedSolutions/index.js";
export type {
  SolutionWarmUpOptionalParams,
  SolutionUpdateOptionalParams,
  SolutionCreateOptionalParams,
  SolutionGetOptionalParams,
} from "./api/solution/index.js";
export type { SolutionSelfHelpGetOptionalParams } from "./api/solutionSelfHelp/index.js";
export type {
  TroubleshootersRestartOptionalParams,
  TroubleshootersEndOptionalParams,
  TroubleshootersContinueOptionalParams,
  TroubleshootersCreateOptionalParams,
  TroubleshootersGetOptionalParams,
} from "./api/troubleshooters/index.js";
export type {
  CheckNameAvailabilityOperations,
  DiagnosticsOperations,
  DiscoverySolutionOperations,
  DiscoverySolutionNLPOperations,
  OperationsOperations,
  SimplifiedSolutionsOperations,
  SolutionOperations,
  SolutionSelfHelpOperations,
  TroubleshootersOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
