"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getOperationsOperations = _getOperationsOperations;
const operations_js_1 = require("../../api/operations/operations.js");
function _getOperations(context) {
    return {
        list: (options) => (0, operations_js_1.list)(context, options),
    };
}
function _getOperationsOperations(context) {
    return Object.assign({}, _getOperations(context));
}
//# sourceMappingURL=index.js.map