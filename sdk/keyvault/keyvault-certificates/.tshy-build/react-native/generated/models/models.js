// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
export function _certificateListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : certificateItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function certificateItemArrayDeserializer(result) {
    return result.map((item) => {
        return certificateItemDeserializer(item);
    });
}
export function certificateItemDeserializer(item) {
    return {
        id: item["id"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        x509Thumbprint: !item["x5t"]
            ? item["x5t"]
            : typeof item["x5t"] === "string"
                ? stringToUint8Array(item["x5t"], "base64url")
                : item["x5t"],
    };
}
export function certificateAttributesSerializer(item) {
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
export function certificateAttributesDeserializer(item) {
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
export function deletedCertificateBundleDeserializer(item) {
    return {
        id: item["id"],
        kid: item["kid"],
        sid: item["sid"],
        x509Thumbprint: !item["x5t"]
            ? item["x5t"]
            : typeof item["x5t"] === "string"
                ? stringToUint8Array(item["x5t"], "base64url")
                : item["x5t"],
        policy: !item["policy"]
            ? item["policy"]
            : certificatePolicyDeserializer(item["policy"]),
        cer: !item["cer"]
            ? item["cer"]
            : typeof item["cer"] === "string"
                ? stringToUint8Array(item["cer"], "base64")
                : item["cer"],
        contentType: item["contentType"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        preserveCertOrder: item["preserveCertOrder"],
        recoveryId: item["recoveryId"],
        scheduledPurgeDate: !item["scheduledPurgeDate"]
            ? item["scheduledPurgeDate"]
            : new Date(item["scheduledPurgeDate"] * 1000),
        deletedDate: !item["deletedDate"]
            ? item["deletedDate"]
            : new Date(item["deletedDate"] * 1000),
    };
}
export function certificatePolicySerializer(item) {
    return {
        key_props: !item["keyProperties"]
            ? item["keyProperties"]
            : keyPropertiesSerializer(item["keyProperties"]),
        secret_props: !item["secretProperties"]
            ? item["secretProperties"]
            : secretPropertiesSerializer(item["secretProperties"]),
        x509_props: !item["x509CertificateProperties"]
            ? item["x509CertificateProperties"]
            : x509CertificatePropertiesSerializer(item["x509CertificateProperties"]),
        lifetime_actions: !item["lifetimeActions"]
            ? item["lifetimeActions"]
            : lifetimeActionArraySerializer(item["lifetimeActions"]),
        issuer: !item["issuerParameters"]
            ? item["issuerParameters"]
            : issuerParametersSerializer(item["issuerParameters"]),
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesSerializer(item["attributes"]),
    };
}
export function certificatePolicyDeserializer(item) {
    return {
        id: item["id"],
        keyProperties: !item["key_props"]
            ? item["key_props"]
            : keyPropertiesDeserializer(item["key_props"]),
        secretProperties: !item["secret_props"]
            ? item["secret_props"]
            : secretPropertiesDeserializer(item["secret_props"]),
        x509CertificateProperties: !item["x509_props"]
            ? item["x509_props"]
            : x509CertificatePropertiesDeserializer(item["x509_props"]),
        lifetimeActions: !item["lifetime_actions"]
            ? item["lifetime_actions"]
            : lifetimeActionArrayDeserializer(item["lifetime_actions"]),
        issuerParameters: !item["issuer"]
            ? item["issuer"]
            : issuerParametersDeserializer(item["issuer"]),
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesDeserializer(item["attributes"]),
    };
}
export function keyPropertiesSerializer(item) {
    return {
        exportable: item["exportable"],
        kty: item["keyType"],
        key_size: item["keySize"],
        reuse_key: item["reuseKey"],
        crv: item["curve"],
    };
}
export function keyPropertiesDeserializer(item) {
    return {
        exportable: item["exportable"],
        keyType: item["kty"],
        keySize: item["key_size"],
        reuseKey: item["reuse_key"],
        curve: item["crv"],
    };
}
/** The type of key pair to be used for the certificate. */
export var KnownJsonWebKeyType;
(function (KnownJsonWebKeyType) {
    /** Elliptic Curve. */
    KnownJsonWebKeyType["EC"] = "EC";
    /** Elliptic Curve with a private key which is not exportable from the HSM. */
    KnownJsonWebKeyType["EC_HSM"] = "EC-HSM";
    /** RSA (https://tools.ietf.org/html/rfc3447). */
    KnownJsonWebKeyType["RSA"] = "RSA";
    /** RSA with a private key which is not exportable from the HSM. */
    KnownJsonWebKeyType["RSA_HSM"] = "RSA-HSM";
    /** Octet sequence (used to represent symmetric keys). */
    KnownJsonWebKeyType["oct"] = "oct";
    /** Octet sequence with a private key which is not exportable from the HSM. */
    KnownJsonWebKeyType["oct_HSM"] = "oct-HSM";
})(KnownJsonWebKeyType || (KnownJsonWebKeyType = {}));
/** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
export var KnownJsonWebKeyCurveName;
(function (KnownJsonWebKeyCurveName) {
    /** The NIST P-256 elliptic curve, AKA SECG curve SECP256R1. */
    KnownJsonWebKeyCurveName["P_256"] = "P-256";
    /** The NIST P-384 elliptic curve, AKA SECG curve SECP384R1. */
    KnownJsonWebKeyCurveName["P_384"] = "P-384";
    /** The NIST P-521 elliptic curve, AKA SECG curve SECP521R1. */
    KnownJsonWebKeyCurveName["P_521"] = "P-521";
    /** The SECG SECP256K1 elliptic curve. */
    KnownJsonWebKeyCurveName["P_256K"] = "P-256K";
})(KnownJsonWebKeyCurveName || (KnownJsonWebKeyCurveName = {}));
export function secretPropertiesSerializer(item) {
    return { contentType: item["contentType"] };
}
export function secretPropertiesDeserializer(item) {
    return {
        contentType: item["contentType"],
    };
}
export function x509CertificatePropertiesSerializer(item) {
    return {
        subject: item["subject"],
        ekus: !item["ekus"]
            ? item["ekus"]
            : item["ekus"].map((p) => {
                return p;
            }),
        sans: !item["subjectAlternativeNames"]
            ? item["subjectAlternativeNames"]
            : subjectAlternativeNamesSerializer(item["subjectAlternativeNames"]),
        key_usage: !item["keyUsage"]
            ? item["keyUsage"]
            : item["keyUsage"].map((p) => {
                return p;
            }),
        validity_months: item["validityInMonths"],
    };
}
export function x509CertificatePropertiesDeserializer(item) {
    return {
        subject: item["subject"],
        ekus: !item["ekus"]
            ? item["ekus"]
            : item["ekus"].map((p) => {
                return p;
            }),
        subjectAlternativeNames: !item["sans"]
            ? item["sans"]
            : subjectAlternativeNamesDeserializer(item["sans"]),
        keyUsage: !item["key_usage"]
            ? item["key_usage"]
            : item["key_usage"].map((p) => {
                return p;
            }),
        validityInMonths: item["validity_months"],
    };
}
export function subjectAlternativeNamesSerializer(item) {
    return {
        emails: !item["emails"]
            ? item["emails"]
            : item["emails"].map((p) => {
                return p;
            }),
        dns_names: !item["dnsNames"]
            ? item["dnsNames"]
            : item["dnsNames"].map((p) => {
                return p;
            }),
        upns: !item["upns"]
            ? item["upns"]
            : item["upns"].map((p) => {
                return p;
            }),
    };
}
export function subjectAlternativeNamesDeserializer(item) {
    return {
        emails: !item["emails"]
            ? item["emails"]
            : item["emails"].map((p) => {
                return p;
            }),
        dnsNames: !item["dns_names"]
            ? item["dns_names"]
            : item["dns_names"].map((p) => {
                return p;
            }),
        upns: !item["upns"]
            ? item["upns"]
            : item["upns"].map((p) => {
                return p;
            }),
    };
}
/** Supported usages of a certificate key. */
export var KnownKeyUsageType;
(function (KnownKeyUsageType) {
    /** Indicates that the certificate key can be used as a digital signature. */
    KnownKeyUsageType["digitalSignature"] = "digitalSignature";
    /** Indicates that the certificate key can be used for authentication. */
    KnownKeyUsageType["nonRepudiation"] = "nonRepudiation";
    /** Indicates that the certificate key can be used for key encryption. */
    KnownKeyUsageType["keyEncipherment"] = "keyEncipherment";
    /** Indicates that the certificate key can be used for data encryption. */
    KnownKeyUsageType["dataEncipherment"] = "dataEncipherment";
    /** Indicates that the certificate key can be used to determine key agreement, such as a key created using the Diffie-Hellman key agreement algorithm. */
    KnownKeyUsageType["keyAgreement"] = "keyAgreement";
    /** Indicates that the certificate key can be used to sign certificates. */
    KnownKeyUsageType["keyCertSign"] = "keyCertSign";
    /** Indicates that the certificate key can be used to sign a certificate revocation list. */
    KnownKeyUsageType["cRLSign"] = "cRLSign";
    /** Indicates that the certificate key can be used for encryption only. */
    KnownKeyUsageType["encipherOnly"] = "encipherOnly";
    /** Indicates that the certificate key can be used for decryption only. */
    KnownKeyUsageType["decipherOnly"] = "decipherOnly";
})(KnownKeyUsageType || (KnownKeyUsageType = {}));
export function lifetimeActionArraySerializer(result) {
    return result.map((item) => {
        return lifetimeActionSerializer(item);
    });
}
export function lifetimeActionArrayDeserializer(result) {
    return result.map((item) => {
        return lifetimeActionDeserializer(item);
    });
}
export function lifetimeActionSerializer(item) {
    return {
        trigger: !item["trigger"]
            ? item["trigger"]
            : triggerSerializer(item["trigger"]),
        action: !item["action"] ? item["action"] : actionSerializer(item["action"]),
    };
}
export function lifetimeActionDeserializer(item) {
    return {
        trigger: !item["trigger"]
            ? item["trigger"]
            : triggerDeserializer(item["trigger"]),
        action: !item["action"]
            ? item["action"]
            : actionDeserializer(item["action"]),
    };
}
export function triggerSerializer(item) {
    return {
        lifetime_percentage: item["lifetimePercentage"],
        days_before_expiry: item["daysBeforeExpiry"],
    };
}
export function triggerDeserializer(item) {
    return {
        lifetimePercentage: item["lifetime_percentage"],
        daysBeforeExpiry: item["days_before_expiry"],
    };
}
export function actionSerializer(item) {
    return { action_type: item["actionType"] };
}
export function actionDeserializer(item) {
    return {
        actionType: item["action_type"],
    };
}
export function issuerParametersSerializer(item) {
    return {
        name: item["name"],
        cty: item["certificateType"],
        cert_transparency: item["certificateTransparency"],
    };
}
export function issuerParametersDeserializer(item) {
    return {
        name: item["name"],
        certificateType: item["cty"],
        certificateTransparency: item["cert_transparency"],
    };
}
export function contactsSerializer(item) {
    return {
        contacts: !item["contactList"]
            ? item["contactList"]
            : contactArraySerializer(item["contactList"]),
    };
}
export function contactsDeserializer(item) {
    return {
        id: item["id"],
        contactList: !item["contacts"]
            ? item["contacts"]
            : contactArrayDeserializer(item["contacts"]),
    };
}
export function contactArraySerializer(result) {
    return result.map((item) => {
        return contactSerializer(item);
    });
}
export function contactArrayDeserializer(result) {
    return result.map((item) => {
        return contactDeserializer(item);
    });
}
export function contactSerializer(item) {
    return {
        email: item["emailAddress"],
        name: item["name"],
        phone: item["phone"],
    };
}
export function contactDeserializer(item) {
    return {
        emailAddress: item["email"],
        name: item["name"],
        phone: item["phone"],
    };
}
export function _certificateIssuerListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : certificateIssuerItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function certificateIssuerItemArrayDeserializer(result) {
    return result.map((item) => {
        return certificateIssuerItemDeserializer(item);
    });
}
export function certificateIssuerItemDeserializer(item) {
    return {
        id: item["id"],
        provider: item["provider"],
    };
}
export function certificateIssuerSetParametersSerializer(item) {
    return {
        provider: item["provider"],
        credentials: !item["credentials"]
            ? item["credentials"]
            : issuerCredentialsSerializer(item["credentials"]),
        org_details: !item["organizationDetails"]
            ? item["organizationDetails"]
            : organizationDetailsSerializer(item["organizationDetails"]),
        attributes: !item["attributes"]
            ? item["attributes"]
            : issuerAttributesSerializer(item["attributes"]),
    };
}
export function issuerCredentialsSerializer(item) {
    return { account_id: item["accountId"], pwd: item["password"] };
}
export function issuerCredentialsDeserializer(item) {
    return {
        accountId: item["account_id"],
        password: item["pwd"],
    };
}
export function organizationDetailsSerializer(item) {
    return {
        id: item["id"],
        admin_details: !item["adminDetails"]
            ? item["adminDetails"]
            : administratorDetailsArraySerializer(item["adminDetails"]),
    };
}
export function organizationDetailsDeserializer(item) {
    return {
        id: item["id"],
        adminDetails: !item["admin_details"]
            ? item["admin_details"]
            : administratorDetailsArrayDeserializer(item["admin_details"]),
    };
}
export function administratorDetailsArraySerializer(result) {
    return result.map((item) => {
        return administratorDetailsSerializer(item);
    });
}
export function administratorDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return administratorDetailsDeserializer(item);
    });
}
export function administratorDetailsSerializer(item) {
    return {
        first_name: item["firstName"],
        last_name: item["lastName"],
        email: item["emailAddress"],
        phone: item["phone"],
    };
}
export function administratorDetailsDeserializer(item) {
    return {
        firstName: item["first_name"],
        lastName: item["last_name"],
        emailAddress: item["email"],
        phone: item["phone"],
    };
}
export function issuerAttributesSerializer(item) {
    return { enabled: item["enabled"] };
}
export function issuerAttributesDeserializer(item) {
    return {
        enabled: item["enabled"],
        created: !item["created"]
            ? item["created"]
            : new Date(item["created"] * 1000),
        updated: !item["updated"]
            ? item["updated"]
            : new Date(item["updated"] * 1000),
    };
}
export function issuerBundleDeserializer(item) {
    return {
        id: item["id"],
        provider: item["provider"],
        credentials: !item["credentials"]
            ? item["credentials"]
            : issuerCredentialsDeserializer(item["credentials"]),
        organizationDetails: !item["org_details"]
            ? item["org_details"]
            : organizationDetailsDeserializer(item["org_details"]),
        attributes: !item["attributes"]
            ? item["attributes"]
            : issuerAttributesDeserializer(item["attributes"]),
    };
}
export function certificateIssuerUpdateParametersSerializer(item) {
    return {
        provider: item["provider"],
        credentials: !item["credentials"]
            ? item["credentials"]
            : issuerCredentialsSerializer(item["credentials"]),
        org_details: !item["organizationDetails"]
            ? item["organizationDetails"]
            : organizationDetailsSerializer(item["organizationDetails"]),
        attributes: !item["attributes"]
            ? item["attributes"]
            : issuerAttributesSerializer(item["attributes"]),
    };
}
export function certificateCreateParametersSerializer(item) {
    return {
        policy: !item["certificatePolicy"]
            ? item["certificatePolicy"]
            : certificatePolicySerializer(item["certificatePolicy"]),
        attributes: !item["certificateAttributes"]
            ? item["certificateAttributes"]
            : certificateAttributesSerializer(item["certificateAttributes"]),
        tags: item["tags"],
        preserveCertOrder: item["preserveCertOrder"],
    };
}
export function certificateOperationDeserializer(item) {
    return {
        id: item["id"],
        issuerParameters: !item["issuer"]
            ? item["issuer"]
            : issuerParametersDeserializer(item["issuer"]),
        csr: !item["csr"]
            ? item["csr"]
            : typeof item["csr"] === "string"
                ? stringToUint8Array(item["csr"], "base64")
                : item["csr"],
        cancellationRequested: item["cancellation_requested"],
        status: item["status"],
        statusDetails: item["status_details"],
        error: !item["error"]
            ? item["error"]
            : _keyVaultErrorErrorDeserializer(item["error"]),
        target: item["target"],
        preserveCertOrder: item["preserveCertOrder"],
        requestId: item["request_id"],
    };
}
export function certificateImportParametersSerializer(item) {
    return {
        value: item["base64EncodedCertificate"],
        pwd: item["password"],
        policy: !item["certificatePolicy"]
            ? item["certificatePolicy"]
            : certificatePolicySerializer(item["certificatePolicy"]),
        attributes: !item["certificateAttributes"]
            ? item["certificateAttributes"]
            : certificateAttributesSerializer(item["certificateAttributes"]),
        tags: item["tags"],
        preserveCertOrder: item["preserveCertOrder"],
    };
}
export function certificateBundleDeserializer(item) {
    return {
        id: item["id"],
        kid: item["kid"],
        sid: item["sid"],
        x509Thumbprint: !item["x5t"]
            ? item["x5t"]
            : typeof item["x5t"] === "string"
                ? stringToUint8Array(item["x5t"], "base64url")
                : item["x5t"],
        policy: !item["policy"]
            ? item["policy"]
            : certificatePolicyDeserializer(item["policy"]),
        cer: !item["cer"]
            ? item["cer"]
            : typeof item["cer"] === "string"
                ? stringToUint8Array(item["cer"], "base64")
                : item["cer"],
        contentType: item["contentType"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        preserveCertOrder: item["preserveCertOrder"],
    };
}
export function certificateUpdateParametersSerializer(item) {
    return {
        policy: !item["certificatePolicy"]
            ? item["certificatePolicy"]
            : certificatePolicySerializer(item["certificatePolicy"]),
        attributes: !item["certificateAttributes"]
            ? item["certificateAttributes"]
            : certificateAttributesSerializer(item["certificateAttributes"]),
        tags: item["tags"],
    };
}
export function certificateOperationUpdateParameterSerializer(item) {
    return { cancellation_requested: item["cancellationRequested"] };
}
export function certificateMergeParametersSerializer(item) {
    return {
        x5c: item["x509Certificates"].map((p) => {
            return uint8ArrayToString(p, "base64");
        }),
        attributes: !item["certificateAttributes"]
            ? item["certificateAttributes"]
            : certificateAttributesSerializer(item["certificateAttributes"]),
        tags: item["tags"],
    };
}
export function backupCertificateResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : typeof item["value"] === "string"
                ? stringToUint8Array(item["value"], "base64url")
                : item["value"],
    };
}
export function certificateRestoreParametersSerializer(item) {
    return {
        value: uint8ArrayToString(item["certificateBundleBackup"], "base64url"),
    };
}
export function _deletedCertificateListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : deletedCertificateItemArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function deletedCertificateItemArrayDeserializer(result) {
    return result.map((item) => {
        return deletedCertificateItemDeserializer(item);
    });
}
export function deletedCertificateItemDeserializer(item) {
    return {
        id: item["id"],
        attributes: !item["attributes"]
            ? item["attributes"]
            : certificateAttributesDeserializer(item["attributes"]),
        tags: item["tags"],
        x509Thumbprint: !item["x5t"]
            ? item["x5t"]
            : typeof item["x5t"] === "string"
                ? stringToUint8Array(item["x5t"], "base64url")
                : item["x5t"],
        recoveryId: item["recoveryId"],
        scheduledPurgeDate: !item["scheduledPurgeDate"]
            ? item["scheduledPurgeDate"]
            : new Date(item["scheduledPurgeDate"] * 1000),
        deletedDate: !item["deletedDate"]
            ? item["deletedDate"]
            : new Date(item["deletedDate"] * 1000),
    };
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