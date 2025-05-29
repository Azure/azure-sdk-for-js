"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getRoleDefinitionsOperations = _getRoleDefinitionsOperations;
const index_js_1 = require("../../api/roleDefinitions/index.js");
function _getRoleDefinitions(context) {
    return {
        list: (scope, options) => (0, index_js_1.list)(context, scope, options),
        get: (scope, roleDefinitionName, options) => (0, index_js_1.get)(context, scope, roleDefinitionName, options),
        createOrUpdate: (scope, roleDefinitionName, parameters, options) => (0, index_js_1.createOrUpdate)(context, scope, roleDefinitionName, parameters, options),
        delete: (scope, roleDefinitionName, options) => (0, index_js_1.$delete)(context, scope, roleDefinitionName, options),
    };
}
function _getRoleDefinitionsOperations(context) {
    return Object.assign({}, _getRoleDefinitions(context));
}
//# sourceMappingURL=index.js.map