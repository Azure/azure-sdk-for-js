// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  AnalyzeResult,
  AnalyzeWidgetOptions,
  ColorType,
  CreateWidgetOptions,
  DeleteWidgetOptions,
  GetWidgetOptions,
  ListWidgetsOptions,
  UpdateWidgetOptions,
  Widget,
  WidgetServiceClientOptions,
  WidgetServiceContext,
  analyzeWidget,
  createWidget,
  createWidgetService,
  deleteWidget,
  getWidget,
  listWidgets,
  updateWidget,
} from "./api/index.js";

export { WidgetServiceClientOptions } from "./api/WidgetServiceContext.js";

export class WidgetServiceClient {
  private _client: WidgetServiceContext;

  /** */
  constructor(endpoint: string, options?: WidgetServiceClientOptions);
  constructor(endpoint: string, credential: TokenCredential, options?: WidgetServiceClientOptions);
  constructor(
    endpoint: string,
    credentialOrOptions?: TokenCredential | WidgetServiceClientOptions,
    options: WidgetServiceClientOptions = {}
  ) {
    if (isTokenCredential(credentialOrOptions)) {
      this._client = createWidgetService(endpoint, credentialOrOptions, options);
    } else {
      this._client = createWidgetService(endpoint, credentialOrOptions);
    }
  }

  /**
   * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
   *
   * It does not accept any options or parameters.
   */
  listWidgets(options: ListWidgetsOptions = { requestOptions: {} }): Promise<Widget[]> {
    return listWidgets(this._client, options);
  }

  /** Get a widget by ID. */
  getWidget(id: string, options: GetWidgetOptions = { requestOptions: {} }): Promise<Widget> {
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
  updateWidget(id: string, options: UpdateWidgetOptions = { requestOptions: {} }): Promise<Widget> {
    return updateWidget(this._client, id, options);
  }

  /** Delete a widget by ID. */
  deleteWidget(id: string, options: DeleteWidgetOptions = { requestOptions: {} }): Promise<void> {
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
