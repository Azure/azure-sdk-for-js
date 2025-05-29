"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._listSend = _listSend;
exports._listDeserialize = _listDeserialize;
exports.list = list;
exports._getSend = _getSend;
exports._getDeserialize = _getDeserialize;
exports.get = get;
exports._createOrUpdateSend = _createOrUpdateSend;
exports._createOrUpdateDeserialize = _createOrUpdateDeserialize;
exports.createOrUpdate = createOrUpdate;
exports._$deleteSend = _$deleteSend;
exports._$deleteDeserialize = _$deleteDeserialize;
exports.$delete = $delete;
const models_js_1 = require("../../models/models.js");
const pagingHelpers_js_1 = require("../../static-helpers/pagingHelpers.js");
const core_client_1 = require("@azure-rest/core-client");
function _listSend(context, scope, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleDefinitions", {
        value: scope,
        allowReserved: true,
    })
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            $filter: options === null || options === void 0 ? void 0 : options.$filter,
        } }));
}
async function _listDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._roleDefinitionListResultDeserializer)(result.body);
}
/** Get all role definitions that are applicable at scope and above. */
function list(context, scope, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _listSend(context, scope, options), _listDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _getSend(context, scope, roleDefinitionName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}", { value: scope, allowReserved: true }, roleDefinitionName)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleDefinitionDeserializer)(result.body);
}
/** Get the specified role definition. */
async function get(context, scope, roleDefinitionName, options = { requestOptions: {} }) {
    const result = await _getSend(context, scope, roleDefinitionName, options);
    return _getDeserialize(result);
}
function _createOrUpdateSend(context, scope, roleDefinitionName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}", { value: scope, allowReserved: true }, roleDefinitionName)
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.roleDefinitionCreateParametersSerializer)(parameters) }));
}
async function _createOrUpdateDeserialize(result) {
    const expectedStatuses = ["201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleDefinitionDeserializer)(result.body);
}
/** Creates or updates a custom role definition. */
async function createOrUpdate(context, scope, roleDefinitionName, parameters, options = { requestOptions: {} }) {
    const result = await _createOrUpdateSend(context, scope, roleDefinitionName, parameters, options);
    return _createOrUpdateDeserialize(result);
}
function _$deleteSend(context, scope, roleDefinitionName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}", { value: scope, allowReserved: true }, roleDefinitionName)
        .delete(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _$deleteDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.roleDefinitionDeserializer)(result.body);
}
/** Deletes a custom role definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
async function $delete(context, scope, roleDefinitionName, options = { requestOptions: {} }) {
    const result = await _$deleteSend(context, scope, roleDefinitionName, options);
    return _$deleteDeserialize(result);
}
//# sourceMappingURL=index.js.map