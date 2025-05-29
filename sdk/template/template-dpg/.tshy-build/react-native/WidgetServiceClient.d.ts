/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
import type { TokenCredential } from "@azure/core-auth";
import type { WidgetServiceClientOptions } from "./api/WidgetServiceContext.js";
import type { AnalyzeResult, AnalyzeWidgetOptions, ColorType, CreateWidgetOptions, DeleteWidgetOptions, GetWidgetOptions, ListWidgetsOptions, UpdateWidgetOptions, Widget } from "./api/index.js";
export { WidgetServiceClientOptions } from "./api/WidgetServiceContext.js";
export declare class WidgetServiceClient {
    private _client;
    /** */
    constructor(endpoint: string, options?: WidgetServiceClientOptions);
    constructor(endpoint: string, credential: TokenCredential, options?: WidgetServiceClientOptions);
    /**
     * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
     *
     * It does not accept any options or parameters.
     */
    listWidgets(options?: ListWidgetsOptions): Promise<Widget[]>;
    /** Get a widget by ID. */
    getWidget(id: string, options?: GetWidgetOptions): Promise<Widget>;
    /**
     * Create a new widget.
     *
     * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
     * result in an error.
     */
    createWidget(weight: number, color: ColorType, options?: CreateWidgetOptions): Promise<Widget>;
    /**
     * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
     * are optional and will be updated within the widget if provided.
     */
    updateWidget(id: string, options?: UpdateWidgetOptions): Promise<Widget>;
    /** Delete a widget by ID. */
    deleteWidget(id: string, options?: DeleteWidgetOptions): Promise<void>;
    /** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
    analyzeWidget(id: string, options?: AnalyzeWidgetOptions): Promise<AnalyzeResult>;
}
//# sourceMappingURL=WidgetServiceClient.d.ts.map