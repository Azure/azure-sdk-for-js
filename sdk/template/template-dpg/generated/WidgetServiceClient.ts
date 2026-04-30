// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Widget,
  ColorType,
  AnalyzeResult,
  listWidgets,
  getWidget,
  createWidget,
  updateWidget,
  deleteWidget,
  analyzeWidget,
  ListWidgetsOptions,
  GetWidgetOptions,
  CreateWidgetOptions,
  UpdateWidgetOptions,
  DeleteWidgetOptions,
  AnalyzeWidgetOptions,
  createWidgetService,
  WidgetServiceContext,
  WidgetServiceClientOptions,
} from "./api/index.js";

export { WidgetServiceClientOptions } from "./api/WidgetServiceContext.js";

export class WidgetServiceClient {
  private _client: WidgetServiceContext;

  /** */
  constructor(endpoint: string, options: WidgetServiceClientOptions = {}) {
    this._client = createWidgetService(endpoint, options);
  }

  /**
   * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
   *
   * It does not accept any options or parameters.
   */
  listWidgets(
    options: ListWidgetsOptions = { requestOptions: {} }
  ): Promise<Widget[]> {
    return listWidgets(this._client, options);
  }

  /** Get a widget by ID. */
  getWidget(
    id: string,
    options: GetWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return getWidget(this._client, id, options);
  }

  /**
   * Create a new widget.
   *
   * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
   * result in an error.
   */
  createWidget(
    weight: number,
    color: ColorType,
    options: CreateWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return createWidget(this._client, weight, color, options);
  }

  /**
   * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
   * are optional and will be updated within the widget if provided.
   */
  updateWidget(
    id: string,
    options: UpdateWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return updateWidget(this._client, id, options);
  }

  /** Delete a widget by ID. */
  deleteWidget(
    id: string,
    options: DeleteWidgetOptions = { requestOptions: {} }
  ): Promise<void> {
    return deleteWidget(this._client, id, options);
  }

  /** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
  analyzeWidget(
    id: string,
    options: AnalyzeWidgetOptions = { requestOptions: {} }
  ): Promise<AnalyzeResult> {
    return analyzeWidget(this._client, id, options);
  }
}
