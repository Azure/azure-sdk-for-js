// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppConfigurationClient } from "./appConfigurationClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Key,
  ErrorModel,
  KeyValue,
  FeatureFlag,
  FeatureFlagConditions,
  RequirementType,
  FeatureFlagFilter,
  FeatureFlagVariantDefinition,
  StatusOverride,
  FeatureFlagAllocation,
  PercentileAllocation,
  UserAllocation,
  GroupAllocation,
  FeatureFlagTelemetryConfiguration,
  ConfigurationSnapshot,
  SnapshotStatus,
  ConfigurationSettingsFilter,
  CompositionType,
  OperationDetails,
  OperationState,
  SnapshotUpdateParameters,
  Label,
  KeyValueFields,
  FeatureFlagFields,
  SnapshotFields,
  LabelFields,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  AppConfigurationClientOptionalParams,
  CheckRevisionsOptionalParams,
  GetRevisionsOptionalParams,
  DeleteLockOptionalParams,
  PutLockOptionalParams,
  CheckLabelsOptionalParams,
  GetLabelsOptionalParams,
  CheckSnapshotOptionalParams,
  UpdateSnapshotOptionalParams,
  CreateSnapshotOptionalParams,
  GetOperationDetailsOptionalParams,
  GetSnapshotOptionalParams,
  CheckSnapshotsOptionalParams,
  GetSnapshotsOptionalParams,
  CheckFeatureFlagRevisionsOptionalParams,
  GetFeatureFlagRevisionsOptionalParams,
  DeleteFeatureFlagOptionalParams,
  PutFeatureFlagOptionalParams,
  CheckFeatureFlagOptionalParams,
  GetFeatureFlagOptionalParams,
  CheckFeatureFlagsOptionalParams,
  GetFeatureFlagsOptionalParams,
  CheckKeyValueOptionalParams,
  DeleteKeyValueOptionalParams,
  PutKeyValueOptionalParams,
  GetKeyValueOptionalParams,
  CheckKeyValuesOptionalParams,
  GetKeyValuesOptionalParams,
  CheckKeysOptionalParams,
  GetKeysOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
