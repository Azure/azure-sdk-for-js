// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WidgetServiceContext as Client,
  isUnexpected,
  AnalyzeWidget200Response,
  AnalyzeWidgetDefaultResponse,
  CreateWidget201Response,
  CreateWidgetDefaultResponse,
  DeleteWidget204Response,
  DeleteWidgetDefaultResponse,
  GetWidget200Response,
  GetWidgetDefaultResponse,
  ListWidgets200Response,
  ListWidgetsDefaultResponse,
  UpdateWidget200Response,
  UpdateWidgetDefaultResponse,
} from "../rest/index.js";
import { StreamableMethod } from "@azure-rest/core-client";
import { Widget, ColorType, AnalyzeResult } from "./models.js";
import { RequestOptions } from "../common/interfaces.js";

export interface ListWidgetsOptions extends RequestOptions {}

export function _listWidgetsSend(
  context: Client,
  options: ListWidgetsOptions = { requestOptions: {} }
): StreamableMethod<ListWidgets200Response | ListWidgetsDefaultResponse> {
  return context
    .path("/widgets")
    .get({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _listWidgetsDeserialize(
  result: ListWidgets200Response | ListWidgetsDefaultResponse
): Promise<Widget[]> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return (result.body ?? []).map((p) => ({
    id: p["id"],
    weight: p["weight"],
    color: p["color"],
  }));
}

/**
 * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
 *
 * It does not accept any options or parameters.
 */
export async function listWidgets(
  context: Client,
  options: ListWidgetsOptions = { requestOptions: {} }
): Promise<Widget[]> {
  const result = await _listWidgetsSend(context, options);
  return _listWidgetsDeserialize(result);
}

export interface GetWidgetOptions extends RequestOptions {}

export function _getWidgetSend(
  context: Client,
  id: string,
  options: GetWidgetOptions = { requestOptions: {} }
): StreamableMethod<GetWidget200Response | GetWidgetDefaultResponse> {
  return context
    .path("/widgets/{id}", id)
    .get({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _getWidgetDeserialize(
  result: GetWidget200Response | GetWidgetDefaultResponse
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

/** Get a widget by ID. */
export async function getWidget(
  context: Client,
  id: string,
  options: GetWidgetOptions = { requestOptions: {} }
): Promise<Widget> {
  const result = await _getWidgetSend(context, id, options);
  return _getWidgetDeserialize(result);
}

export interface CreateWidgetOptions extends RequestOptions {}

export function _createWidgetSend(
  context: Client,
  weight: number,
  color: ColorType,
  options: CreateWidgetOptions = { requestOptions: {} }
): StreamableMethod<CreateWidget201Response | CreateWidgetDefaultResponse> {
  return context
    .path("/widgets")
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
      body: { weight: weight, color: color },
    });
}

export async function _createWidgetDeserialize(
  result: CreateWidget201Response | CreateWidgetDefaultResponse
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

/**
 * Create a new widget.
 *
 * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
 * result in an error.
 */
export async function createWidget(
  context: Client,
  weight: number,
  color: ColorType,
  options: CreateWidgetOptions = { requestOptions: {} }
): Promise<Widget> {
  const result = await _createWidgetSend(context, weight, color, options);
  return _createWidgetDeserialize(result);
}

export interface UpdateWidgetOptions extends RequestOptions {
  /** The weight of the widget. This is an int32, but must be greater than zero. */
  weight?: number;
  /** The color of the widget. */
  color?: ColorType;
}

export function _updateWidgetSend(
  context: Client,
  id: string,
  options: UpdateWidgetOptions = { requestOptions: {} }
): StreamableMethod<UpdateWidget200Response | UpdateWidgetDefaultResponse> {
  return context
    .path("/widgets/{id}", id)
    .patch({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
      body: { weight: options?.weight, color: options?.color },
    });
}

export async function _updateWidgetDeserialize(
  result: UpdateWidget200Response | UpdateWidgetDefaultResponse
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

/**
 * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
 * are optional and will be updated within the widget if provided.
 */
export async function updateWidget(
  context: Client,
  id: string,
  options: UpdateWidgetOptions = { requestOptions: {} }
): Promise<Widget> {
  const result = await _updateWidgetSend(context, id, options);
  return _updateWidgetDeserialize(result);
}

export interface DeleteWidgetOptions extends RequestOptions {}

export function _deleteWidgetSend(
  context: Client,
  id: string,
  options: DeleteWidgetOptions = { requestOptions: {} }
): StreamableMethod<DeleteWidget204Response | DeleteWidgetDefaultResponse> {
  return context
    .path("/widgets/{id}", id)
    .delete({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _deleteWidgetDeserialize(
  result: DeleteWidget204Response | DeleteWidgetDefaultResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

/** Delete a widget by ID. */
export async function deleteWidget(
  context: Client,
  id: string,
  options: DeleteWidgetOptions = { requestOptions: {} }
): Promise<void> {
  const result = await _deleteWidgetSend(context, id, options);
  return _deleteWidgetDeserialize(result);
}

export interface AnalyzeWidgetOptions extends RequestOptions {}

export function _analyzeWidgetSend(
  context: Client,
  id: string,
  options: AnalyzeWidgetOptions = { requestOptions: {} }
): StreamableMethod<AnalyzeWidget200Response | AnalyzeWidgetDefaultResponse> {
  return context
    .path("/widgets/{id}/analyze", id)
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _analyzeWidgetDeserialize(
  result: AnalyzeWidget200Response | AnalyzeWidgetDefaultResponse
): Promise<AnalyzeResult> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    summary: result.body["summary"],
  };
}

/** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
export async function analyzeWidget(
  context: Client,
  id: string,
  options: AnalyzeWidgetOptions = { requestOptions: {} }
): Promise<AnalyzeResult> {
  const result = await _analyzeWidgetSend(context, id, options);
  return _analyzeWidgetDeserialize(result);
}
