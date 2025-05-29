"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSettingsSend = _getSettingsSend;
exports._getSettingsDeserialize = _getSettingsDeserialize;
exports.getSettings = getSettings;
exports._getSettingSend = _getSettingSend;
exports._getSettingDeserialize = _getSettingDeserialize;
exports.getSetting = getSetting;
exports._updateSettingSend = _updateSettingSend;
exports._updateSettingDeserialize = _updateSettingDeserialize;
exports.updateSetting = updateSetting;
exports._selectiveKeyRestoreOperationSend = _selectiveKeyRestoreOperationSend;
exports._selectiveKeyRestoreOperationDeserialize = _selectiveKeyRestoreOperationDeserialize;
exports.selectiveKeyRestoreOperation = selectiveKeyRestoreOperation;
exports._selectiveKeyRestoreStatusSend = _selectiveKeyRestoreStatusSend;
exports._selectiveKeyRestoreStatusDeserialize = _selectiveKeyRestoreStatusDeserialize;
exports.selectiveKeyRestoreStatus = selectiveKeyRestoreStatus;
exports._fullRestoreOperationSend = _fullRestoreOperationSend;
exports._fullRestoreOperationDeserialize = _fullRestoreOperationDeserialize;
exports.fullRestoreOperation = fullRestoreOperation;
exports._preFullRestoreOperationSend = _preFullRestoreOperationSend;
exports._preFullRestoreOperationDeserialize = _preFullRestoreOperationDeserialize;
exports.preFullRestoreOperation = preFullRestoreOperation;
exports._restoreStatusSend = _restoreStatusSend;
exports._restoreStatusDeserialize = _restoreStatusDeserialize;
exports.restoreStatus = restoreStatus;
exports._preFullBackupSend = _preFullBackupSend;
exports._preFullBackupDeserialize = _preFullBackupDeserialize;
exports.preFullBackup = preFullBackup;
exports._fullBackupSend = _fullBackupSend;
exports._fullBackupDeserialize = _fullBackupDeserialize;
exports.fullBackup = fullBackup;
exports._fullBackupStatusSend = _fullBackupStatusSend;
exports._fullBackupStatusDeserialize = _fullBackupStatusDeserialize;
exports.fullBackupStatus = fullBackupStatus;
const models_js_1 = require("../models/models.js");
const pollingHelpers_js_1 = require("../static-helpers/pollingHelpers.js");
const core_client_1 = require("@azure-rest/core-client");
function _getSettingsSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/settings")
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getSettingsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.settingsListResultDeserializer)(result.body);
}
/** Retrieves a list of all the available account settings that can be configured. */
async function getSettings(context, options = { requestOptions: {} }) {
    const result = await _getSettingsSend(context, options);
    return _getSettingsDeserialize(result);
}
function _getSettingSend(context, settingName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/settings/{setting-name}", settingName)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _getSettingDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.settingDeserializer)(result.body);
}
/** Retrieves the setting object of a specified setting name. */
async function getSetting(context, settingName, options = { requestOptions: {} }) {
    const result = await _getSettingSend(context, settingName, options);
    return _getSettingDeserialize(result);
}
function _updateSettingSend(context, settingName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/settings/{setting-name}", settingName)
        .patch(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.updateSettingRequestSerializer)(parameters) }));
}
async function _updateSettingDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.settingDeserializer)(result.body);
}
/** Description of the pool setting to be updated */
async function updateSetting(context, settingName, parameters, options = { requestOptions: {} }) {
    const result = await _updateSettingSend(context, settingName, parameters, options);
    return _updateSettingDeserialize(result);
}
function _selectiveKeyRestoreOperationSend(context, keyName, restoreBlobDetails, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/keys/{keyName}/restore", keyName)
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.selectiveKeyRestoreOperationParametersSerializer)(restoreBlobDetails) }));
}
async function _selectiveKeyRestoreOperationDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.selectiveKeyRestoreOperationDeserializer)(result.body);
}
/** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
function selectiveKeyRestoreOperation(context, keyName, restoreBlobDetails, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _selectiveKeyRestoreOperationDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _selectiveKeyRestoreOperationSend(context, keyName, restoreBlobDetails, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _selectiveKeyRestoreStatusSend(context, jobId, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/restore/{jobId}/pending", jobId)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _selectiveKeyRestoreStatusDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.selectiveKeyRestoreOperationDeserializer)(result.body);
}
/** Returns the status of the selective key restore operation */
async function selectiveKeyRestoreStatus(context, jobId, options = { requestOptions: {} }) {
    const result = await _selectiveKeyRestoreStatusSend(context, jobId, options);
    return _selectiveKeyRestoreStatusDeserialize(result);
}
function _fullRestoreOperationSend(context, restoreBlobDetails, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/restore")
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.restoreOperationParametersSerializer)(restoreBlobDetails) }));
}
async function _fullRestoreOperationDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.restoreOperationDeserializer)(result.body);
}
/** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
function fullRestoreOperation(context, restoreBlobDetails, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _fullRestoreOperationDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _fullRestoreOperationSend(context, restoreBlobDetails, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _preFullRestoreOperationSend(context, preRestoreOperationParameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/prerestore")
        .put(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.preRestoreOperationParametersSerializer)(preRestoreOperationParameters) }));
}
async function _preFullRestoreOperationDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.restoreOperationDeserializer)(result.body);
}
/** Pre-restore operation for checking whether the customer can perform a full restore operation. */
function preFullRestoreOperation(context, preRestoreOperationParameters, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _preFullRestoreOperationDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _preFullRestoreOperationSend(context, preRestoreOperationParameters, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _restoreStatusSend(context, jobId, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/restore/{jobId}/pending", jobId)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _restoreStatusDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.restoreOperationDeserializer)(result.body);
}
/** Returns the status of restore operation */
async function restoreStatus(context, jobId, options = { requestOptions: {} }) {
    const result = await _restoreStatusSend(context, jobId, options);
    return _restoreStatusDeserialize(result);
}
function _preFullBackupSend(context, preBackupOperationParameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/prebackup")
        .post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.preBackupOperationParametersSerializer)(preBackupOperationParameters) }));
}
async function _preFullBackupDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.fullBackupOperationDeserializer)(result.body);
}
/** Pre-backup operation for checking whether the customer can perform a full backup operation. */
function preFullBackup(context, preBackupOperationParameters, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _preFullBackupDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _preFullBackupSend(context, preBackupOperationParameters, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _fullBackupSend(context, azureStorageBlobContainerUri, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/backup")
        .post(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: (0, models_js_1.sASTokenParameterSerializer)(azureStorageBlobContainerUri) }));
}
async function _fullBackupDeserialize(result) {
    const expectedStatuses = ["202", "200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.fullBackupOperationDeserializer)(result.body);
}
/** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
function fullBackup(context, azureStorageBlobContainerUri, options = { requestOptions: {} }) {
    return (0, pollingHelpers_js_1.getLongRunningPoller)(context, _fullBackupDeserialize, ["202", "200"], {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        getInitialResponse: () => _fullBackupSend(context, azureStorageBlobContainerUri, options),
        resourceLocationConfig: "azure-async-operation",
    });
}
function _fullBackupStatusSend(context, jobId, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/backup/{jobId}/pending", jobId)
        .get(Object.assign(Object.assign({}, (0, core_client_1.operationOptionsToRequestParameters)(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
async function _fullBackupStatusDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = (0, core_client_1.createRestError)(result);
        error.details = (0, models_js_1.keyVaultErrorDeserializer)(result.body);
        throw error;
    }
    return (0, models_js_1.fullBackupOperationDeserializer)(result.body);
}
/** Returns the status of full backup operation */
async function fullBackupStatus(context, jobId, options = { requestOptions: {} }) {
    const result = await _fullBackupStatusSend(context, jobId, options);
    return _fullBackupStatusDeserialize(result);
}
//# sourceMappingURL=operations.js.map