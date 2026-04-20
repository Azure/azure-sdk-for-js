// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WidgetManagerClient } from "./widgetManagerClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  WidgetSuite,
  FakedSharedModel,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
  OperationState,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type { WidgetManagerClientOptionalParams } from "./api/index.js";
export type {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "./api/widgets/index.js";
export type { WidgetsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
