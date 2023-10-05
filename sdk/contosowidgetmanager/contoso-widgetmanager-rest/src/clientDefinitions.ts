// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetWidgetParameters,
  NewWidgetParameters,
  EraseWidgetParameters,
  GetWidgetOperationStatusParameters,
  RetrieveAllWidgetsParameters,
} from "./parameters";
import {
  GetWidget200Response,
  GetWidgetDefaultResponse,
  NewWidget200Response,
  NewWidget201Response,
  NewWidgetDefaultResponse,
  EraseWidget202Response,
  EraseWidgetDefaultResponse,
  GetWidgetOperationStatus200Response,
  GetWidgetOperationStatusDefaultResponse,
  RetrieveAllWidgets200Response,
  RetrieveAllWidgetsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetWidget {
  /** Fetch a Widget by name. */
  get(
    options?: GetWidgetParameters
  ): StreamableMethod<GetWidget200Response | GetWidgetDefaultResponse>;
  /** Creates or updates a Widget asynchronously. */
  patch(
    options: NewWidgetParameters
  ): StreamableMethod<
    NewWidget200Response | NewWidget201Response | NewWidgetDefaultResponse
  >;
  /** Delete a Widget asynchronously. */
  delete(
    options?: EraseWidgetParameters
  ): StreamableMethod<EraseWidget202Response | EraseWidgetDefaultResponse>;
}

export interface GetWidgetOperationStatus {
  /** Gets status of a Widget operation. */
  get(
    options?: GetWidgetOperationStatusParameters
  ): StreamableMethod<
    | GetWidgetOperationStatus200Response
    | GetWidgetOperationStatusDefaultResponse
  >;
}

export interface RetrieveAllWidgets {
  /** List Widget resources */
  get(
    options?: RetrieveAllWidgetsParameters
  ): StreamableMethod<
    RetrieveAllWidgets200Response | RetrieveAllWidgetsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/widgets/\{widgetName\}' has methods for the following verbs: get, patch, delete */
  (path: "/widgets/{widgetName}", widgetName: string): GetWidget;
  /** Resource for '/widgets/\{widgetName\}/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/widgets/{widgetName}/operations/{operationId}",
    widgetName: string,
    operationId: string
  ): GetWidgetOperationStatus;
  /** Resource for '/widgets' has methods for the following verbs: get */
  (path: "/widgets"): RetrieveAllWidgets;
}

export type ContosoWidgetManagerClient = Client & {
  path: Routes;
};
