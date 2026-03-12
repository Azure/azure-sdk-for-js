// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  WidgetSuite,
  FakedSharedModel,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
  KnownOperationState,
  OperationState,
  KnownVersions,
} from "./models/index.js";
export { WidgetAnalyticsClientOptionalParams } from "./api/index.js";
export {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "./api/widgets/index.js";
export { WidgetsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
