// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureAppConfigurationClient } from "./azureAppConfigurationClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Key,
  ErrorModel,
  KeyValue,
  Snapshot,
  SnapshotStatus,
  KeyValueFilter,
  CompositionType,
  OperationDetails,
  OperationState,
  SnapshotUpdateParameters,
  Label,
  KeyValueFields,
  SnapshotFields,
  LabelFields,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  AzureAppConfigurationClientOptionalParams,
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
