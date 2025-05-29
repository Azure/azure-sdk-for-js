"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._restoreSecretSend = _restoreSecretSend;
exports._restoreSecretDeserialize = _restoreSecretDeserialize;
exports.restoreSecret = restoreSecret;
exports._backupSecretSend = _backupSecretSend;
exports._backupSecretDeserialize = _backupSecretDeserialize;
exports.backupSecret = backupSecret;
exports._recoverDeletedSecretSend = _recoverDeletedSecretSend;
exports._recoverDeletedSecretDeserialize = _recoverDeletedSecretDeserialize;
exports.recoverDeletedSecret = recoverDeletedSecret;
exports._purgeDeletedSecretSend = _purgeDeletedSecretSend;
exports._purgeDeletedSecretDeserialize = _purgeDeletedSecretDeserialize;
exports.purgeDeletedSecret = purgeDeletedSecret;
exports._getDeletedSecretSend = _getDeletedSecretSend;
exports._getDeletedSecretDeserialize = _getDeletedSecretDeserialize;
exports.getDeletedSecret = getDeletedSecret;
exports._getDeletedSecretsSend = _getDeletedSecretsSend;
exports._getDeletedSecretsDeserialize = _getDeletedSecretsDeserialize;
exports.getDeletedSecrets = getDeletedSecrets;
exports._getSecretVersionsSend = _getSecretVersionsSend;
exports._getSecretVersionsDeserialize = _getSecretVersionsDeserialize;
exports.getSecretVersions = getSecretVersions;
exports._getSecretsSend = _getSecretsSend;
exports._getSecretsDeserialize = _getSecretsDeserialize;
exports.getSecrets = getSecrets;
exports._getSecretSend = _getSecretSend;
exports._getSecretDeserialize = _getSecretDeserialize;
exports.getSecret = getSecret;
exports._updateSecretSend = _updateSecretSend;
exports._updateSecretDeserialize = _updateSecretDeserialize;
exports.updateSecret = updateSecret;
exports._deleteSecretSend = _deleteSecretSend;
exports._deleteSecretDeserialize = _deleteSecretDeserialize;
exports.deleteSecret = deleteSecret;
exports._setSecretSend = _setSecretSend;
exports._setSecretDeserialize = _setSecretDeserialize;
exports.setSecret = setSecret;
const models_js_1 = require("../models/models.js");
const pagingHelpers_js_1 = require("../static-helpers/pagingHelpers.js");
const core_client_1 = require("@azure-rest/core-client");
function _restoreSecretSend(context, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/restore")
        .post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.secretRestoreParametersSerializer)(parameters) }));
}
async function _restoreSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.secretBundleDeserializer)(result.body);
}
/** Restores a backed up secret, and all its versions, to a vault. This operation requires the secrets/restore permission. */
async function restoreSecret(context, parameters, options = { requestOptions: {} }) {
    const result = await _restoreSecretSend(context, parameters, options);
    return _restoreSecretDeserialize(result);
}
function _backupSecretSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}/backup", secretName)
        .post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _backupSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.backupSecretResultDeserializer)(result.body);
}
/** Requests that a backup of the specified secret be downloaded to the client. All versions of the secret will be downloaded. This operation requires the secrets/backup permission. */
async function backupSecret(context, secretName, options = { requestOptions: {} }) {
    const result = await _backupSecretSend(context, secretName, options);
    return _backupSecretDeserialize(result);
}
function _recoverDeletedSecretSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedsecrets/{secret-name}/recover", secretName)
        .post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _recoverDeletedSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.secretBundleDeserializer)(result.body);
}
/** Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission. */
async function recoverDeletedSecret(context, secretName, options = { requestOptions: {} }) {
    const result = await _recoverDeletedSecretSend(context, secretName, options);
    return _recoverDeletedSecretDeserialize(result);
}
function _purgeDeletedSecretSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedsecrets/{secret-name}", secretName)
        .delete(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _purgeDeletedSecretDeserialize(result) {
    const expectedStatuses = ["204"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return;
}
/** The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission. */
async function purgeDeletedSecret(context, secretName, options = { requestOptions: {} }) {
    const result = await _purgeDeletedSecretSend(context, secretName, options);
    return _purgeDeletedSecretDeserialize(result);
}
function _getDeletedSecretSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedsecrets/{secret-name}", secretName)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getDeletedSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.deletedSecretBundleDeserializer)(result.body);
}
/** The Get Deleted Secret operation returns the specified deleted secret along with its attributes. This operation requires the secrets/get permission. */
async function getDeletedSecret(context, secretName, options = { requestOptions: {} }) {
    const result = await _getDeletedSecretSend(context, secretName, options);
    return _getDeletedSecretDeserialize(result);
}
function _getDeletedSecretsSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedsecrets")
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
        } }));
}
async function _getDeletedSecretsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._deletedSecretListResultDeserializer)(result.body);
}
/** The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled for soft-delete. This operation requires the secrets/list permission. */
function getDeletedSecrets(context, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _getDeletedSecretsSend(context, options), _getDeletedSecretsDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _getSecretVersionsSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}/versions", secretName)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
        } }));
}
async function _getSecretVersionsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._secretListResultDeserializer)(result.body);
}
/** The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission. */
function getSecretVersions(context, secretName, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _getSecretVersionsSend(context, secretName, options), _getSecretVersionsDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _getSecretsSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets")
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
        } }));
}
async function _getSecretsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1._secretListResultDeserializer)(result.body);
}
/** The Get Secrets operation is applicable to the entire vault. However, only the base secret identifier and its attributes are provided in the response. Individual secret versions are not listed in the response. This operation requires the secrets/list permission. */
function getSecrets(context, options = { requestOptions: {} }) {
    return (0, pagingHelpers_js_1.buildPagedAsyncIterator)(context, () => _getSecretsSend(context, options), _getSecretsDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
function _getSecretSend(context, secretName, secretVersion, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}/{secret-version}", secretName, secretVersion)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.secretBundleDeserializer)(result.body);
}
/** The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires the secrets/get permission. */
async function getSecret(context, secretName, secretVersion, options = { requestOptions: {} }) {
    const result = await _getSecretSend(context, secretName, secretVersion, options);
    return _getSecretDeserialize(result);
}
function _updateSecretSend(context, secretName, secretVersion, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}/{secret-version}", secretName, secretVersion)
        .patch(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.secretUpdateParametersSerializer)(parameters) }));
}
async function _updateSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.secretBundleDeserializer)(result.body);
}
/** The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission. */
async function updateSecret(context, secretName, secretVersion, parameters, options = { requestOptions: {} }) {
    const result = await _updateSecretSend(context, secretName, secretVersion, parameters, options);
    return _updateSecretDeserialize(result);
}
function _deleteSecretSend(context, secretName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}", secretName)
        .delete(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _deleteSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.deletedSecretBundleDeserializer)(result.body);
}
/** The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied to an individual version of a secret. This operation requires the secrets/delete permission. */
async function deleteSecret(context, secretName, options = { requestOptions: {} }) {
    const result = await _deleteSecretSend(context, secretName, options);
    return _deleteSecretDeserialize(result);
}
function _setSecretSend(context, secretName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/secrets/{secret-name}", secretName)
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.secretSetParametersSerializer)(parameters) }));
}
async function _setSecretDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.secretBundleDeserializer)(result.body);
}
/** The SET operation adds a secret to the Azure Key Vault. If the named secret already exists, Azure Key Vault creates a new version of that secret. This operation requires the secrets/set permission. */
async function setSecret(context, secretName, parameters, options = { requestOptions: {} }) {
    const result = await _setSecretSend(context, secretName, parameters, options);
    return _setSecretDeserialize(result);
}
//# sourceMappingURL=operations.js.map