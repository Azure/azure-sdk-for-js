"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getRoleAssignmentsOperations = _getRoleAssignmentsOperations;
const index_js_1 = require("../../api/roleAssignments/index.js");
function _getRoleAssignments(context) {
    return {
        listForScope: (scope, options) => (0, index_js_1.listForScope)(context, scope, options),
        get: (scope, roleAssignmentName, options) => (0, index_js_1.get)(context, scope, roleAssignmentName, options),
        create: (scope, roleAssignmentName, parameters, options) => (0, index_js_1.create)(context, scope, roleAssignmentName, parameters, options),
        delete: (scope, roleAssignmentName, options) => (0, index_js_1.$delete)(context, scope, roleAssignmentName, options),
    };
}
function _getRoleAssignmentsOperations(context) {
    return Object.assign({}, _getRoleAssignments(context));
}
//# sourceMappingURL=index.js.map