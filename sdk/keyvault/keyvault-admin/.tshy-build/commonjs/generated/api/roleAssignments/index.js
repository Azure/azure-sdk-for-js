"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._listForScopeSend = _listForScopeSend;
exports._listForScopeDeserialize = _listForScopeDeserialize;
exports.listForScope = listForScope;
exports._getSend = _getSend;
exports._getDeserialize = _getDeserialize;
exports.get = get;
exports._createSend = _createSend;
exports._createDeserialize = _createDeserialize;
exports.create = create;
exports._$deleteSend = _$deleteSend;
exports._$deleteDeserialize = _$deleteDeserialize;
exports.$delete = $delete;
const models_js_1 = require("../../models/models.js");
const pagingHelpers_js_1 = require("../../static-helpers/pagingHelpers.js");
const core_client_1 = require("@azure-rest/core-client");
function _listForScopeSend(context, scope, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleAssignments", {
        value: scope,
        allowReserved: true,
    })
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            $filter: options === null || options === void 0 ? void 0 : options.$filter,
        } }));
}
async function _listForScopeDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._roleAssignmentListResultDeserializer)(result.body);
}
/** Gets role assignments for a scope. */
function listForScope(context, scope, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listForScopeSend(context, scope, options), _listForScopeDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _getSend(context, scope, roleAssignmentName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}", { value: scope, allowReserved: true }, roleAssignmentName)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleAssignmentDeserializer)(result.body);
}
/** Get the specified role assignment. */
async function get(context, scope, roleAssignmentName, options = { requestOptions: {} }) {
    const result = await _getSend(context, scope, roleAssignmentName, options);
    return _getDeserialize(result);
}
function _createSend(context, scope, roleAssignmentName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}", { value: scope, allowReserved: true }, roleAssignmentName)
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.roleAssignmentCreateParametersSerializer)(parameters) }));
}
async function _createDeserialize(result) {
    const expectedStatuses = ["201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleAssignmentDeserializer)(result.body);
}
/** Creates a role assignment. */
async function create(context, scope, roleAssignmentName, parameters, options = { requestOptions: {} }) {
    const result = await _createSend(context, scope, roleAssignmentName, parameters, options);
    return _createDeserialize(result);
}
function _$deleteSend(context, scope, roleAssignmentName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}", { value: scope, allowReserved: true }, roleAssignmentName)
        .delete(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _$deleteDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleAssignmentDeserializer)(result.body);
}
/** Deletes a role assignment. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
async function $delete(context, scope, roleAssignmentName, options = { requestOptions: {} }) {
    const result = await _$deleteSend(context, scope, roleAssignmentName, options);
    return _$deleteDeserialize(result);
}
//# sourceMappingURL=index.js.map