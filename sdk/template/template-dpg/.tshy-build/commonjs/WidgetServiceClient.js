"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetServiceClient = void 0;
const core_auth_1 = require("@azure/core-auth");
const WidgetServiceContext_js_1 = require("./api/WidgetServiceContext.js");
const index_js_1 = require("./api/index.js");
class WidgetServiceClient {
    constructor(endpoint, credentialOrOptions, options = {}) {
        if ((0, core_auth_1.isTokenCredential)(credentialOrOptions)) {
            this._client = (0, WidgetServiceContext_js_1.createWidgetService)(endpoint, credentialOrOptions, options);
        }
        else {
            this._client = (0, WidgetServiceContext_js_1.createWidgetService)(endpoint, credentialOrOptions);
        }
    }
    /**
     * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
     *
     * It does not accept any options or parameters.
     */
    listWidgets(options = { requestOptions: {} }) {
        return (0, index_js_1.listWidgets)(this._client, options);
    }
    /** Get a widget by ID. */
    getWidget(id, options = { requestOptions: {} }) {
        return (0, index_js_1.getWidget)(this._client, id, options);
    }
    /**
     * Create a new widget.
     *
     * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
     * result in an error.
     */
    createWidget(weight, color, options = { requestOptions: {} }) {
        return (0, index_js_1.createWidget)(this._client, weight, color, options);
    }
    /**
     * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
     * are optional and will be updated within the widget if provided.
     */
    updateWidget(id, options = { requestOptions: {} }) {
        return (0, index_js_1.updateWidget)(this._client, id, options);
    }
    /** Delete a widget by ID. */
    deleteWidget(id, options = { requestOptions: {} }) {
        return (0, index_js_1.deleteWidget)(this._client, id, options);
    }
    /** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
    analyzeWidget(id, options = { requestOptions: {} }) {
        return (0, index_js_1.analyzeWidget)(this._client, id, options);
    }
}
exports.WidgetServiceClient = WidgetServiceClient;
//# sourceMappingURL=WidgetServiceClient.js.map