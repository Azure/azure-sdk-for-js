// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WidgetAnalyticsContext } from "../../api/widgetAnalyticsContext.js";
import {
  listWidgets,
  deleteWidget,
  createOrUpdateWidget,
  getWidgetOperationStatus,
  getWidget,
} from "../../api/widgets/operations.js";
import {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "../../api/widgets/options.js";
import {
  WidgetSuite,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Widgets operations. */
export interface WidgetsOperations {
  /** List Widget resources */
  listWidgets: (
    options?: WidgetsListWidgetsOptionalParams,
  ) => PagedAsyncIterableIterator<WidgetSuite>;
  /** Delete a Widget asynchronously. */
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
  /** Gets status of a Widget operation. */
  getWidgetOperationStatus: (
    widgetName: string,
    operationId: string,
    options?: WidgetsGetWidgetOperationStatusOptionalParams,
  ) => Promise<ResourceOperationStatusWidgetSuiteWidgetSuiteError>;
  /** Fetch a Widget by name. */
  getWidget: (widgetName: string, options?: WidgetsGetWidgetOptionalParams) => Promise<WidgetSuite>;
}

function _getWidgets(context: WidgetAnalyticsContext) {
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

export function _getWidgetsOperations(context: WidgetAnalyticsContext): WidgetsOperations {
  return {
    ..._getWidgets(context),
  };
}
