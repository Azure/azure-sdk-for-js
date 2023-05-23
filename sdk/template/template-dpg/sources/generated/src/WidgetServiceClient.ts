// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "./common/interfaces.js";
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
} from "./api/index.js";

export class WidgetServiceClient {
  private _client: WidgetServiceContext;

  /** */
  constructor(endpoint: string, options: ClientOptions = {}) {
    this._client = createWidgetService(endpoint, options);
  }

  listWidgets(
    options: ListWidgetsOptions = { requestOptions: {} }
  ): Promise<Widget[]> {
    return listWidgets(this._client, options);
  }

  getWidget(
    id: string,
    options: GetWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return getWidget(this._client, id, options);
  }

  createWidget(
    weight: number,
    color: ColorType,
    options: CreateWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return createWidget(this._client, weight, color, options);
  }

  updateWidget(
    id: string,
    options: UpdateWidgetOptions = { requestOptions: {} }
  ): Promise<Widget> {
    return updateWidget(this._client, id, options);
  }

  deleteWidget(
    id: string,
    options: DeleteWidgetOptions = { requestOptions: {} }
  ): Promise<void> {
    return deleteWidget(this._client, id, options);
  }

  analyzeWidget(
    id: string,
    options: AnalyzeWidgetOptions = { requestOptions: {} }
  ): Promise<AnalyzeResult> {
    return analyzeWidget(this._client, id, options);
  }
}
