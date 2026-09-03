// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type WidgetSuite,
  type FakedSharedModel,
  type ResourceOperationStatusWidgetSuiteWidgetSuiteError,
  KnownOperationState,
  type OperationState,
  KnownVersions,
} from "./models/index.js";
export type { WidgetAnalyticsClientOptionalParams } from "./api/index.js";
export type {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "./api/widgets/index.js";
export type { WidgetsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
