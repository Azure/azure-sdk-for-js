"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultClient = void 0;
const index_js_1 = require("./classic/roleAssignments/index.js");
const index_js_2 = require("./classic/roleDefinitions/index.js");
const index_js_3 = require("./api/index.js");
class KeyVaultClient {
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam, credential, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = (0, index_js_3.createKeyVault)(endpointParam, credential, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.roleAssignments = (0, index_js_1._getRoleAssignmentsOperations)(this._client);
        this.roleDefinitions = (0, index_js_2._getRoleDefinitionsOperations)(this._client);
    }
    /** Retrieves a list of all the available account settings that can be configured. */
    getSettings(options = { requestOptions: {} }) {
        return (0, index_js_3.getSettings)(this._client, options);
    }
    /** Retrieves the setting object of a specified setting name. */
    getSetting(settingName, options = { requestOptions: {} }) {
        return (0, index_js_3.getSetting)(this._client, settingName, options);
    }
    /** Description of the pool setting to be updated */
    updateSetting(settingName, parameters, options = { requestOptions: {} }) {
        return (0, index_js_3.updateSetting)(this._client, settingName, parameters, options);
    }
    /** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
    selectiveKeyRestoreOperation(keyName, restoreBlobDetails, options = {
        requestOptions: {},
    }) {
        return (0, index_js_3.selectiveKeyRestoreOperation)(this._client, keyName, restoreBlobDetails, options);
    }
    /** Returns the status of the selective key restore operation */
    selectiveKeyRestoreStatus(jobId, options = { requestOptions: {} }) {
        return (0, index_js_3.selectiveKeyRestoreStatus)(this._client, jobId, options);
    }
    /** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
    fullRestoreOperation(restoreBlobDetails, options = { requestOptions: {} }) {
        return (0, index_js_3.fullRestoreOperation)(this._client, restoreBlobDetails, options);
    }
    /** Pre-restore operation for checking whether the customer can perform a full restore operation. */
    preFullRestoreOperation(preRestoreOperationParameters, options = { requestOptions: {} }) {
        return (0, index_js_3.preFullRestoreOperation)(this._client, preRestoreOperationParameters, options);
    }
    /** Returns the status of restore operation */
    restoreStatus(jobId, options = { requestOptions: {} }) {
        return (0, index_js_3.restoreStatus)(this._client, jobId, options);
    }
    /** Pre-backup operation for checking whether the customer can perform a full backup operation. */
    preFullBackup(preBackupOperationParameters, options = { requestOptions: {} }) {
        return (0, index_js_3.preFullBackup)(this._client, preBackupOperationParameters, options);
    }
    /** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
    fullBackup(azureStorageBlobContainerUri, options = { requestOptions: {} }) {
        return (0, index_js_3.fullBackup)(this._client, azureStorageBlobContainerUri, options);
    }
    /** Returns the status of full backup operation */
    fullBackupStatus(jobId, options = { requestOptions: {} }) {
        return (0, index_js_3.fullBackupStatus)(this._client, jobId, options);
    }
}
exports.KeyVaultClient = KeyVaultClient;
//# sourceMappingURL=keyVaultClient.js.map