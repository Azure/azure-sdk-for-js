// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RestError } from "@azure/core-rest-pipeline";
import { isUnexpected } from "../rest/index.js";
import { foo } from "./foo.js";
export function _listWidgetsSend(context, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets").get({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
    });
}
export async function _listWidgetsDeserialize(result) {
    var _a;
    if (isUnexpected(result)) {
        throw result.body;
    }
    return ((_a = result.body) !== null && _a !== void 0 ? _a : []).map((p) => ({
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
export async function listWidgets(context, options = { requestOptions: {} }) {
    const result = await _listWidgetsSend(context, options);
    return _listWidgetsDeserialize(result);
}
export function _getWidgetSend(context, id, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets/{id}", id).get({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
    });
}
export async function _getWidgetDeserialize(result) {
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
export async function getWidget(context, id, options = { requestOptions: {} }) {
    const result = await _getWidgetSend(context, id, options);
    return _getWidgetDeserialize(result);
}
export function _createWidgetSend(context, weight, color, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets").post({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
        body: { weight: weight, color: color },
    });
}
export async function _createWidgetDeserialize(result) {
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
export async function createWidget(context, weight, color, options = { requestOptions: {} }) {
    const result = await _createWidgetSend(context, weight, color, options);
    return _createWidgetDeserialize(result);
}
export function _updateWidgetSend(context, id, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets/{id}", id).patch({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
        body: { weight: options === null || options === void 0 ? void 0 : options.weight, color: options === null || options === void 0 ? void 0 : options.color },
    });
}
export async function _updateWidgetDeserialize(result) {
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
export async function updateWidget(context, id, options = { requestOptions: {} }) {
    const result = await _updateWidgetSend(context, id, options);
    return _updateWidgetDeserialize(result);
}
export function _deleteWidgetSend(context, id, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets/{id}", id).delete({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
    });
}
export async function _deleteWidgetDeserialize(result) {
    if (isUnexpected(result)) {
        throw result.body;
    }
    return;
}
/** Delete a widget by ID. */
export async function deleteWidget(context, id, options = { requestOptions: {} }) {
    const result = await _deleteWidgetSend(context, id, options);
    return _deleteWidgetDeserialize(result);
}
export function _analyzeWidgetSend(context, id, options = { requestOptions: {} }) {
    var _a, _b, _c;
    return context.path("/widgets/{id}/analyze", id).post({
        allowInsecureConnection: (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.allowInsecureConnection,
        skipUrlEncoding: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.skipUrlEncoding,
        headers: Object.assign({}, (_c = options.requestOptions) === null || _c === void 0 ? void 0 : _c.headers),
    });
}
export async function _analyzeWidgetDeserialize(result) {
    if (isUnexpected(result)) {
        throw result.body;
    }
    return {
        summary: result.body["summary"],
    };
}
/**
 * In this customization we will perform the following tasks in addition to the generated:
 *  - We are going to add special error handling for demonstration purposes
 */
export async function analyzeWidget(context, id, options) {
    try {
        foo();
        const result = await _analyzeWidget(context, id, options);
        return result;
    }
    catch (error) {
        console.error("Error occurred while calling analyzeWidget:", error);
        if (error.message && error.statusCode) {
            throw new RestError(error.message, { code: error.statusCode });
        }
        throw new Error(error);
    }
}
/** Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis. */
async function _analyzeWidget(context, id, options = { requestOptions: {} }) {
    const result = await _analyzeWidgetSend(context, id, options);
    return _analyzeWidgetDeserialize(result);
}
//# sourceMappingURL=operations.js.map