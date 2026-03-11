// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AlertsManagementClient } from "./alertsManagementClient.js";
export type {
  AlertProcessingRule,
  AlertProcessingRuleProperties,
  Condition,
  Field,
  Operator,
  Schedule,
  Recurrence,
  RecurrenceUnion,
  RecurrenceType,
  DailyRecurrence,
  WeeklyRecurrence,
  DaysOfWeek,
  MonthlyRecurrence,
  Action,
  ActionUnion,
  ActionType,
  AddActionGroups,
  RemoveAllActionGroups,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorResponseBody,
  PatchObject,
  PatchProperties,
} from "./models/index.js";
export {
  KnownField,
  KnownOperator,
  KnownRecurrenceType,
  KnownDaysOfWeek,
  KnownActionType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { AlertsManagementClientOptionalParams } from "./api/index.js";
export type {
  AlertProcessingRulesListBySubscriptionOptionalParams,
  AlertProcessingRulesListByResourceGroupOptionalParams,
  AlertProcessingRulesDeleteOptionalParams,
  AlertProcessingRulesUpdateOptionalParams,
  AlertProcessingRulesCreateOrUpdateOptionalParams,
  AlertProcessingRulesGetByNameOptionalParams,
} from "./api/alertProcessingRules/index.js";
export type { AlertProcessingRulesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
