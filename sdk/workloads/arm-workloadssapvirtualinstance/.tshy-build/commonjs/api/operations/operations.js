"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._listSend = _listSend;
exports._listDeserialize = _listDeserialize;
exports.list = list;
const models_js_1 = require("../../models/models.js");
const pagingHelpers_js_1 = require("../../static-helpers/pagingHelpers.js");
const urlTemplate_js_1 = require("../../static-helpers/urlTemplate.js");
const core_client_1 = require("@azure-rest/core-client");
function _listSend(context, options = { requestOptions: {} }) {
    var _a, _b;
    const path = (0, urlTemplate_js_1.expandUrlTemplate)("/providers/Microsoft.Workloads/operations{?api%2Dversion}", {
        "api%2Dversion": context.apiVersion,
    }, {
        allowReserved: (_a = options === null || options === void 0 ? void 0 : options.requestOptions) === null || _a === void 0 ? void 0 : _a.skipUrlEncoding,
    });
    return context.path(path).get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.headers) }));
}
async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.errorResponseDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._operationListResultDeserializer)(result.body);
}
/** List the operations for the provider */
function list(context, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listSend(context, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
//# sourceMappingURL=operations.js.map