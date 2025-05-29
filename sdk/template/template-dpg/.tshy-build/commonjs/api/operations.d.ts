/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
import type { StreamableMethod } from "@azure-rest/core-client";
import type { RequestOptions } from "../common/interfaces.js";
import type { WidgetServiceContext as Client } from "../rest/clientDefinitions.js";
import type { AnalyzeWidget200Response, AnalyzeWidgetDefaultResponse, CreateWidget201Response, CreateWidgetDefaultResponse, DeleteWidget204Response, DeleteWidgetDefaultResponse, GetWidget200Response, GetWidgetDefaultResponse, ListWidgets200Response, ListWidgetsDefaultResponse, UpdateWidget200Response, UpdateWidgetDefaultResponse } from "../rest/index.js";
import type { AnalyzeResult, ColorType, Widget } from "./models.js";
export interface ListWidgetsOptions extends RequestOptions {
}
export interface GetWidgetOptions extends RequestOptions {
}
export interface CreateWidgetOptions extends RequestOptions {
}
export interface UpdateWidgetOptions extends RequestOptions {
    /** The weight of the widget. This is an int32, but must be greater than zero. */
    weight?: number;
    /** The color of the widget. */
    color?: ColorType;
}
export interface DeleteWidgetOptions extends RequestOptions {
}
export interface AnalyzeWidgetOptions extends RequestOptions {
}
export declare function _listWidgetsSend(context: Client, options?: ListWidgetsOptions): StreamableMethod<ListWidgets200Response | ListWidgetsDefaultResponse>;
export declare function _listWidgetsDeserialize(result: ListWidgets200Response | ListWidgetsDefaultResponse): Promise<Widget[]>;
/**
 * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
 *
 * It does not accept any options or parameters.
 */
export declare function listWidgets(context: Client, options?: ListWidgetsOptions): Promise<Widget[]>;
export declare function _getWidgetSend(context: Client, id: string, options?: GetWidgetOptions): StreamableMethod<GetWidget200Response | GetWidgetDefaultResponse>;
export declare function _getWidgetDeserialize(result: GetWidget200Response | GetWidgetDefaultResponse): Promise<Widget>;
/** Get a widget by ID. */
export declare function getWidget(context: Client, id: string, options?: GetWidgetOptions): Promise<Widget>;
export declare function _createWidgetSend(context: Client, weight: number, color: ColorType, options?: CreateWidgetOptions): StreamableMethod<CreateWidget201Response | CreateWidgetDefaultResponse>;
export declare function _createWidgetDeserialize(result: CreateWidget201Response | CreateWidgetDefaultResponse): Promise<Widget>;
/**
 * Create a new widget.
 *
 * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
 * result in an error.
 */
export declare function createWidget(context: Client, weight: number, color: ColorType, options?: CreateWidgetOptions): Promise<Widget>;
export declare function _updateWidgetSend(context: Client, id: string, options?: UpdateWidgetOptions): StreamableMethod<UpdateWidget200Response | UpdateWidgetDefaultResponse>;
export declare function _updateWidgetDeserialize(result: UpdateWidget200Response | UpdateWidgetDefaultResponse): Promise<Widget>;
/**
 * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
 * are optional and will be updated within the widget if provided.
 */
export declare function updateWidget(context: Client, id: string, options?: UpdateWidgetOptions): Promise<Widget>;
export declare function _deleteWidgetSend(context: Client, id: string, options?: DeleteWidgetOptions): StreamableMethod<DeleteWidget204Response | DeleteWidgetDefaultResponse>;
export declare function _deleteWidgetDeserialize(result: DeleteWidget204Response | DeleteWidgetDefaultResponse): Promise<void>;
/** Delete a widget by ID. */
export declare function deleteWidget(context: Client, id: string, options?: DeleteWidgetOptions): Promise<void>;
export declare function _analyzeWidgetSend(context: Client, id: string, options?: AnalyzeWidgetOptions): StreamableMethod<AnalyzeWidget200Response | AnalyzeWidgetDefaultResponse>;
export declare function _analyzeWidgetDeserialize(result: AnalyzeWidget200Response | AnalyzeWidgetDefaultResponse): Promise<AnalyzeResult>;
/**
 * In this customization we will perform the following tasks in addition to the generated:
 *  - We are going to add special error handling for demonstration purposes
 */
export declare function analyzeWidget(context: Client, id: string, options?: AnalyzeWidgetOptions): Promise<AnalyzeResult>;
//# sourceMappingURL=operations.d.ts.map