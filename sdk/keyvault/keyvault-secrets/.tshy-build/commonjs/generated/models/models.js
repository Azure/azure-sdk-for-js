"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownVersions = exports.KnownDeletionRecoveryLevel = void 0;
exports.secretSetParametersSerializer = secretSetParametersSerializer;
exports.secretAttributesSerializer = secretAttributesSerializer;
exports.secretAttributesDeserializer = secretAttributesDeserializer;
exports.secretBundleDeserializer = secretBundleDeserializer;
exports.keyVaultErrorDeserializer = keyVaultErrorDeserializer;
exports._keyVaultErrorErrorDeserializer = _keyVaultErrorErrorDeserializer;
exports.deletedSecretBundleDeserializer = deletedSecretBundleDeserializer;
exports.secretUpdateParametersSerializer = secretUpdateParametersSerializer;
exports._secretListResultDeserializer = _secretListResultDeserializer;
exports.secretItemArrayDeserializer = secretItemArrayDeserializer;
exports.secretItemDeserializer = secretItemDeserializer;
exports._deletedSecretListResultDeserializer = _deletedSecretListResultDeserializer;
exports.deletedSecretItemArrayDeserializer = deletedSecretItemArrayDeserializer;
exports.deletedSecretItemDeserializer = deletedSecretItemDeserializer;
exports.backupSecretResultDeserializer = backupSecretResultDeserializer;
exports.secretRestoreParametersSerializer = secretRestoreParametersSerializer;
const core_util_1 = require("@azure/core-util");
function secretSetParametersSerializer(item) {
    return {
        value: item["value"],
        tags: item["tags"],
        contentType: item["contentType"],
        attributes: !item["secretAttributes"]
            ? item["secretAttributes"]
            : secretAttributesSerializer(item["secretAttributes"]),
    };
}
function secretAttributesSerializer(item) {
    return {
        enabled: item["enabled"],
        nbf: !item["notBefore"]
            ? item["notBefore"]
            : (item["notBefore"].getTime() / 1000) | 0,
        exp: !item["expires"]
            ? item["expires"]
            : (item["expires"].getTime() / 1000) | 0,
    };
}
function secretAttributesDeserializer(item) {
    return {
        enabled: item["enabled"],
        notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
        expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
        created: !item["created"]
            ? item["created"]
            : new Date(item["created"] * 1000),
        updated: !item["updated"]
            ? item["updated"]
            : new Date(item["updated"] * 1000),
        recoverableDays: item["recoverableDays"],
        recoveryLevel: item["recoveryLevel"],
    };
}
/** Reflects the deletion recovery level currently in effect for secrets in the current vault. If it contains 'Purgeable', the secret can be permanently deleted by a privileged user; otherwise, only the system can purge the secret, at the end of the retention interval. */
var KnownDeletionRecoveryLevel;
(function (KnownDeletionRecoveryLevel) {
    /** Denotes a vault state in which deletion is an irreversible operation, without the possibility for recovery. This level corresponds to no protection being available against a Delete operation; the data is irretrievably lost upon accepting a Delete operation at the entity level or higher (vault, resource group, subscription etc.) */
    KnownDeletionRecoveryLevel["Purgeable"] = "Purgeable";
    /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days), unless a Purge operation is requested, or the subscription is cancelled. System wil permanently delete it after 90 days, if not recovered */
    KnownDeletionRecoveryLevel["RecoverablePurgeable"] = "Recoverable+Purgeable";
    /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days) and while the subscription is still available. System wil permanently delete it after 90 days, if not recovered */
    KnownDeletionRecoveryLevel["Recoverable"] = "Recoverable";
    /** Denotes a vault and subscription state in which deletion is recoverable within retention interval (90 days), immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself  cannot be permanently canceled. System wil permanently delete it after 90 days, if not recovered */
    KnownDeletionRecoveryLevel["RecoverableProtectedSubscription"] = "Recoverable+ProtectedSubscription";
    /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90). This level guarantees the recoverability of the deleted entity during the retention interval, unless a Purge operation is requested, or the subscription is cancelled. */
    KnownDeletionRecoveryLevel["CustomizedRecoverablePurgeable"] = "CustomizedRecoverable+Purgeable";
    /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90).This level guarantees the recoverability of the deleted entity during the retention interval and while the subscription is still available. */
    KnownDeletionRecoveryLevel["CustomizedRecoverable"] = "CustomizedRecoverable";
    /** Denotes a vault and subscription state in which deletion is recoverable, immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself cannot be permanently canceled when 7 <= SoftDeleteRetentionInDays < 90. This level guarantees the recoverability of the deleted entity during the retention interval, and also reflects the fact that the subscription itself cannot be cancelled. */
    KnownDeletionRecoveryLevel["CustomizedRecoverableProtectedSubscription"] = "CustomizedRecoverable+ProtectedSubscription";
})(KnownDeletionRecoveryLevel || (exports.KnownDeletionRecoveryLevel = KnownDeletionRecoveryLevel = {}));
function secretBundleDeserializer(item) {
    return {
        value: item["value"],
        id: item["id"],
        contentType: item["contentType"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : secretAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        kid: item["kid"],
        managed: item["managed"],
    };
}
function keyVaultErrorDeserializer(item) {
    return {
        error: !item["error"]
            ? item["error"]
            : _keyVaultErrorErrorDeserializer(item["error"]),
    };
}
function _keyVaultErrorErrorDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        innerError: !item["innererror"]
            ? item["innererror"]
            : _keyVaultErrorErrorDeserializer(item["innererror"]),
    };
}
function deletedSecretBundleDeserializer(item) {
    return {
        value: item["value"],
        id: item["id"],
        contentType: item["contentType"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : secretAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        kid: item["kid"],
        managed: item["managed"],
        recoveryId: item["recoveryId"],
        scheduledPurgeDate: !item["scheduledPurgeDate"]
            ? item["scheduledPurgeDate"]
            : new Date(item["scheduledPurgeDate"] * 1000),
        deletedDate: !item["deletedDate"]
            ? item["deletedDate"]
            : new Date(item["deletedDate"] * 1000),
    };
}
function secretUpdateParametersSerializer(item) {
    return {
        contentType: item["contentType"],
        attributes: !item["secretAttributes"]
            ? item["secretAttributes"]
            : secretAttributesSerializer(item["secretAttributes"]),
        tags: item["tags"],
    };
}
function _secretListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : secretItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function secretItemArrayDeserializer(result) {
    return result.map((item) => {
        return secretItemDeserializer(item);
    });
}
function secretItemDeserializer(item) {
    return {
        id: item["id"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : secretAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        contentType: item["contentType"],
        managed: item["managed"],
    };
}
function _deletedSecretListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : deletedSecretItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function deletedSecretItemArrayDeserializer(result) {
    return result.map((item) => {
        return deletedSecretItemDeserializer(item);
    });
}
function deletedSecretItemDeserializer(item) {
    return {
        id: item["id"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : secretAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        contentType: item["contentType"],
        managed: item["managed"],
        recoveryId: item["recoveryId"],
        scheduledPurgeDate: !item["scheduledPurgeDate"]
            ? item["scheduledPurgeDate"]
            : new Date(item["scheduledPurgeDate"] * 1000),
        deletedDate: !item["deletedDate"]
            ? item["deletedDate"]
            : new Date(item["deletedDate"] * 1000),
    };
}
function backupSecretResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : typeof item["value"] === "string"
                ? (0, core_util_1.stringToUint8Array)(item["value"], "base64url")
                : item["value"],
    };
}
function secretRestoreParametersSerializer(item) {
    return { value: (0, core_util_1.uint8ArrayToString)(item["secretBundleBackup"], "base64url") };
}
/** The available API versions. */
var KnownVersions;
(function (KnownVersions) {
    /** The 7.5 API version. */
    KnownVersions["v7.5"] = "7.5";
    /** The 7.6-preview.2 API version. */
    KnownVersions["v7.6_preview.2"] = "7.6-preview.2";
})(KnownVersions || (exports.KnownVersions = KnownVersions = {}));
//# sourceMappingURL=models.js.map