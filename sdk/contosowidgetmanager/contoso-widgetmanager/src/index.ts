// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WidgetManagerClient } from "./widgetManagerClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  WidgetSuite,
  FakedSharedModel,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
  OperationState,
  KnownVersions,
} from "./models/index.js";
export { WidgetManagerClientOptionalParams } from "./api/index.js";
export {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "./api/widgets/index.js";
export { WidgetsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
