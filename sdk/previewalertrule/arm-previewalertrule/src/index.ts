// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";

export { AlertsManagementClient } from "./alertsManagementClient.js";
export type {
  PreviewAlertRuleRequest,
  PreviewAlertRuleRequestProperties,
  LogAlertRuleResource,
  Kind,
  LogAlertRuleProperties,
  AlertSeverity,
  LogAlertRuleCriteria,
  LogAlertRuleCondition,
  CriterionType,
  TimeAggregation,
  LogAlertRuleDimension,
  DimensionOperator,
  ConditionOperator,
  LogAlertRuleConditionFailingPeriods,
  PreviewAlertRuleResponse,
  RulePreviewResult,
  DimensionNameAndValue,
  Evaluation,
  AlertState,
  EvaluatedPeriod,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
} from "./models/index.js";
export {
  KnownKind,
  KnownAlertSeverity,
  KnownCriterionType,
  KnownTimeAggregation,
  KnownDimensionOperator,
  KnownConditionOperator,
  KnownAlertState,
  KnownVersions,
} from "./models/index.js";
export type {
  AlertsManagementClientOptionalParams,
  PreviewAlertRuleOptionalParams,
} from "./api/index.js";
export { AzureClouds };
export type { AzureSupportedClouds };
