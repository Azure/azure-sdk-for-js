// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { BillingTrustClient } from "./billingTrustClient.js";
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
  Assessment,
  AssessmentProperties,
  AssessmentType,
  AssessmentState,
  InitialRuleValueBase,
  InitialRuleValueBaseUnion,
  RuleKind,
  EduInitialValue,
  DomainEntry,
  DomainEntryState,
  ProvisioningState,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  GenerateUploadTokenResponse,
  Rule,
  RuleProperties,
  RulePropertiesUnion,
  RuleState,
  EduQualificationRuleProperties,
  BusinessVerificationRuleProperties,
  SoldTo,
  RegistrationNumber,
  RegistrationRequirement,
  TaxId,
  TaxIdStatus,
  ExternalId,
  ProxyResource,
  RulePatchProperties,
  RulePatchPropertiesUnion,
  EduQualificationRulePatchProperties,
  BusinessVerificationRulePatchProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAssessmentType,
  KnownAssessmentState,
  KnownRuleKind,
  KnownDomainEntryState,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownRuleState,
  KnownRegistrationRequirement,
  KnownTaxIdStatus,
  KnownVersions,
} from "./models/index.js";
export type { BillingTrustClientOptionalParams } from "./api/index.js";
export type {
  AssessmentsListUploadTokenOptionalParams,
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "./api/assessments/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  RulesUpdateOptionalParams,
  RulesCreateOrUpdateOptionalParams,
  RulesListOptionalParams,
  RulesGetOptionalParams,
} from "./api/rules/index.js";
export type {
  AssessmentsOperations,
  OperationsOperations,
  RulesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
