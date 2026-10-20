// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WidgetOpenPrVerificationContext } from "../../api/widgetOpenPrVerificationContext.js";
import {
  listWidgets,
  deleteWidget,
  createOrUpdateWidget,
  getWidgetOperationStatus,
  getWidget,
} from "../../api/widgets/operations.js";
import type {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "../../api/widgets/options.js";
import type {
  WidgetSuite,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Widgets operations. */
export interface WidgetsOperations {
  /** Lists Widget resources. */
  listWidgets: (
    options?: WidgetsListWidgetsOptionalParams,
  ) => PagedAsyncIterableIterator<WidgetSuite>;
  /** Deletes a Widget asynchronously. */
  deleteWidget: (
    widgetName: string,
    options?: WidgetsDeleteWidgetOptionalParams,
  ) => PollerLike<OperationState<WidgetSuite>, WidgetSuite>;
  /** Creates or updates a Widget asynchronously. */
  createOrUpdateWidget: (
    widgetName: string,
    resource: WidgetSuite,
    options?: WidgetsCreateOrUpdateWidgetOptionalParams,
  ) => PollerLike<OperationState<WidgetSuite>, WidgetSuite>;
  /** Gets the status of a Widget operation. */
  getWidgetOperationStatus: (
    widgetName: string,
    operationId: string,
    options?: WidgetsGetWidgetOperationStatusOptionalParams,
  ) => Promise<ResourceOperationStatusWidgetSuiteWidgetSuiteError>;
  /** Fetches a Widget by name. */
  getWidget: (widgetName: string, options?: WidgetsGetWidgetOptionalParams) => Promise<WidgetSuite>;
}

function _getWidgets(context: WidgetOpenPrVerificationContext) {
  return {
    listWidgets: (options?: WidgetsListWidgetsOptionalParams) => listWidgets(context, options),
    deleteWidget: (widgetName: string, options?: WidgetsDeleteWidgetOptionalParams) =>
      deleteWidget(context, widgetName, options),
    createOrUpdateWidget: (
      widgetName: string,
      resource: WidgetSuite,
      options?: WidgetsCreateOrUpdateWidgetOptionalParams,
    ) => createOrUpdateWidget(context, widgetName, resource, options),
    getWidgetOperationStatus: (
      widgetName: string,
      operationId: string,
      options?: WidgetsGetWidgetOperationStatusOptionalParams,
    ) => getWidgetOperationStatus(context, widgetName, operationId, options),
    getWidget: (widgetName: string, options?: WidgetsGetWidgetOptionalParams) =>
      getWidget(context, widgetName, options),
  };
}

export function _getWidgetsOperations(context: WidgetOpenPrVerificationContext): WidgetsOperations {
  return {
    ..._getWidgets(context),
  };
}
