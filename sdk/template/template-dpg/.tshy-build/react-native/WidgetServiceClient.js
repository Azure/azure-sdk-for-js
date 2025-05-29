// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isTokenCredential } from "@azure/core-auth";
import { createWidgetService } from "./api/WidgetServiceContext.js";
import { analyzeWidget, createWidget, deleteWidget, getWidget, listWidgets, updateWidget, } from "./api/index.js";
export class WidgetServiceClient {
    constructor(endpoint, credentialOrOptions, options = {}) {
        if (isTokenCredential(credentialOrOptions)) {
            this._client = createWidgetService(endpoint, credentialOrOptions, options);
        }
        else {
            this._client = createWidgetService(endpoint, credentialOrOptions);
        }
    }
    /**
     * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
     *
     * It does not accept any options or parameters.
     */
    listWidgets(options = { requestOptions: {} }) {
        return listWidgets(this._client, options);
    }
    /** Get a widget by ID. */
    getWidget(id, options = { requestOptions: {} }) {
        return getWidget(this._client, id, options);
    }
    /**
     * Create a new widget.
     *
     * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
     * result in an error.
     */
    createWidget(weight, color, options = { requestOptions: {} }) {
        return createWidget(this._client, weight, color, options);
    }
    /**
     * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
     * are optional and will be updated within the widget if provided.
     */
    updateWidget(id, options = { requestOptions: {} }) {
        return updateWidget(this._client, id, options);
    }
    /** Delete a widget by ID. */
    deleteWidget(id, options = { requestOptions: {} }) {
        return deleteWidget(this._client, id, options);
    }
    /** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
    analyzeWidget(id, options = { requestOptions: {} }) {
        return analyzeWidget(this._client, id, options);
    }
}
//# sourceMappingURL=WidgetServiceClient.js.map