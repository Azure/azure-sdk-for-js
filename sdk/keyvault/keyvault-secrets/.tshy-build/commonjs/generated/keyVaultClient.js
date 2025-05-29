"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultClient = void 0;
const index_js_1 = require("./api/index.js");
class KeyVaultClient {
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam, credential, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = (0, index_js_1.createKeyVault)(endpointParam, credential, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
    }
    /** Restores a backed up secret, and all its versions, to a vault. This operation requires the secrets/restore permission. */
    restoreSecret(parameters, options = { requestOptions: {} }) {
        return (0, index_js_1.restoreSecret)(this._client, parameters, options);
    }
    /** Requests that a backup of the specified secret be downloaded to the client. All versions of the secret will be downloaded. This operation requires the secrets/backup permission. */
    backupSecret(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.backupSecret)(this._client, secretName, options);
    }
    /** Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission. */
    recoverDeletedSecret(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.recoverDeletedSecret)(this._client, secretName, options);
    }
    /** The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission. */
    purgeDeletedSecret(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.purgeDeletedSecret)(this._client, secretName, options);
    }
    /** The Get Deleted Secret operation returns the specified deleted secret along with its attributes. This operation requires the secrets/get permission. */
    getDeletedSecret(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.getDeletedSecret)(this._client, secretName, options);
    }
    /** The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled for soft-delete. This operation requires the secrets/list permission. */
    getDeletedSecrets(options = { requestOptions: {} }) {
        return (0, index_js_1.getDeletedSecrets)(this._client, options);
    }
    /** The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission. */
    getSecretVersions(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.getSecretVersions)(this._client, secretName, options);
    }
    /** The Get Secrets operation is applicable to the entire vault. However, only the base secret identifier and its attributes are provided in the response. Individual secret versions are not listed in the response. This operation requires the secrets/list permission. */
    getSecrets(options = { requestOptions: {} }) {
        return (0, index_js_1.getSecrets)(this._client, options);
    }
    /** The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires the secrets/get permission. */
    getSecret(secretName, secretVersion, options = { requestOptions: {} }) {
        return (0, index_js_1.getSecret)(this._client, secretName, secretVersion, options);
    }
    /** The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission. */
    updateSecret(secretName, secretVersion, parameters, options = { requestOptions: {} }) {
        return (0, index_js_1.updateSecret)(this._client, secretName, secretVersion, parameters, options);
    }
    /** The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied to an individual version of a secret. This operation requires the secrets/delete permission. */
    deleteSecret(secretName, options = { requestOptions: {} }) {
        return (0, index_js_1.deleteSecret)(this._client, secretName, options);
    }
    /** The SET operation adds a secret to the Azure Key Vault. If the named secret already exists, Azure Key Vault creates a new version of that secret. This operation requires the secrets/set permission. */
    setSecret(secretName, parameters, options = { requestOptions: {} }) {
        return (0, index_js_1.setSecret)(this._client, secretName, parameters, options);
    }
}
exports.KeyVaultClient = KeyVaultClient;
//# sourceMappingURL=keyVaultClient.js.map