// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
export function secretSetParametersSerializer(item) {
    return {
        value: item["value"],
        tags: item["tags"],
        contentType: item["contentType"],
        attributes: !item["secretAttributes"]
            ? item["secretAttributes"]
            : secretAttributesSerializer(item["secretAttributes"]),
    };
}
export function secretAttributesSerializer(item) {
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
export function secretAttributesDeserializer(item) {
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
export var KnownDeletionRecoveryLevel;
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
})(KnownDeletionRecoveryLevel || (KnownDeletionRecoveryLevel = {}));
export function secretBundleDeserializer(item) {
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
export function keyVaultErrorDeserializer(item) {
    return {
        error: !item["error"]
            ? item["error"]
            : _keyVaultErrorErrorDeserializer(item["error"]),
    };
}
export function _keyVaultErrorErrorDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        innerError: !item["innererror"]
            ? item["innererror"]
            : _keyVaultErrorErrorDeserializer(item["innererror"]),
    };
}
export function deletedSecretBundleDeserializer(item) {
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
export function secretUpdateParametersSerializer(item) {
    return {
        contentType: item["contentType"],
        attributes: !item["secretAttributes"]
            ? item["secretAttributes"]
            : secretAttributesSerializer(item["secretAttributes"]),
        tags: item["tags"],
    };
}
export function _secretListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : secretItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function secretItemArrayDeserializer(result) {
    return result.map((item) => {
        return secretItemDeserializer(item);
    });
}
export function secretItemDeserializer(item) {
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
export function _deletedSecretListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : deletedSecretItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function deletedSecretItemArrayDeserializer(result) {
    return result.map((item) => {
        return deletedSecretItemDeserializer(item);
    });
}
export function deletedSecretItemDeserializer(item) {
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
export function backupSecretResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : typeof item["value"] === "string"
                ? stringToUint8Array(item["value"], "base64url")
                : item["value"],
    };
}
export function secretRestoreParametersSerializer(item) {
    return { value: uint8ArrayToString(item["secretBundleBackup"], "base64url") };
}
/** The available API versions. */
export var KnownVersions;
(function (KnownVersions) {
    /** The 7.5 API version. */
    KnownVersions["v7.5"] = "7.5";
    /** The 7.6-preview.2 API version. */
    KnownVersions["v7.6_preview.2"] = "7.6-preview.2";
})(KnownVersions || (KnownVersions = {}));
//# sourceMappingURL=models.js.map