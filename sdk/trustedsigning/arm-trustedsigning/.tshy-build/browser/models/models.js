// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { serializeRecord } from "../helpers/serializerHelpers.js";
export function resourceSerializer(item) {
    return item;
}
/** Known values of {@link CreatedByType} that the service accepts. */
export var KnownCreatedByType;
(function (KnownCreatedByType) {
    /** User */
    KnownCreatedByType["User"] = "User";
    /** Application */
    KnownCreatedByType["Application"] = "Application";
    /** ManagedIdentity */
    KnownCreatedByType["ManagedIdentity"] = "ManagedIdentity";
    /** Key */
    KnownCreatedByType["Key"] = "Key";
})(KnownCreatedByType || (KnownCreatedByType = {}));
export function proxyResourceSerializer(item) {
    return item;
}
export function certificateProfileSerializer(item) {
    return {
        properties: !item.properties
            ? item.properties
            : certificateProfilePropertiesSerializer(item.properties),
    };
}
export function certificateProfilePropertiesSerializer(item) {
    return {
        profileType: item["profileType"],
        includeStreetAddress: item["includeStreetAddress"],
        includeCity: item["includeCity"],
        includeState: item["includeState"],
        includeCountry: item["includeCountry"],
        includePostalCode: item["includePostalCode"],
        identityValidationId: item["identityValidationId"],
    };
}
/** Known values of {@link ProfileType} that the service accepts. */
export var KnownProfileType;
(function (KnownProfileType) {
    /** PublicTrust */
    KnownProfileType["PublicTrust"] = "PublicTrust";
    /** PrivateTrust */
    KnownProfileType["PrivateTrust"] = "PrivateTrust";
    /** PrivateTrustCIPolicy */
    KnownProfileType["PrivateTrustCIPolicy"] = "PrivateTrustCIPolicy";
    /** VBSEnclave */
    KnownProfileType["VBSEnclave"] = "VBSEnclave";
    /** PublicTrustTest */
    KnownProfileType["PublicTrustTest"] = "PublicTrustTest";
})(KnownProfileType || (KnownProfileType = {}));
/** Known values of {@link ProvisioningState} that the service accepts. */
export var KnownProvisioningState;
(function (KnownProvisioningState) {
    /** Succeeded */
    KnownProvisioningState["Succeeded"] = "Succeeded";
    /** Failed */
    KnownProvisioningState["Failed"] = "Failed";
    /** Canceled */
    KnownProvisioningState["Canceled"] = "Canceled";
    /** Updating */
    KnownProvisioningState["Updating"] = "Updating";
    /** Deleting */
    KnownProvisioningState["Deleting"] = "Deleting";
    /** Accepted */
    KnownProvisioningState["Accepted"] = "Accepted";
})(KnownProvisioningState || (KnownProvisioningState = {}));
/** Known values of {@link CertificateProfileStatus} that the service accepts. */
export var KnownCertificateProfileStatus;
(function (KnownCertificateProfileStatus) {
    /** Active */
    KnownCertificateProfileStatus["Active"] = "Active";
    /** Disabled */
    KnownCertificateProfileStatus["Disabled"] = "Disabled";
    /** Suspended */
    KnownCertificateProfileStatus["Suspended"] = "Suspended";
})(KnownCertificateProfileStatus || (KnownCertificateProfileStatus = {}));
/** Known values of {@link CertificateStatus} that the service accepts. */
export var KnownCertificateStatus;
(function (KnownCertificateStatus) {
    /** Active */
    KnownCertificateStatus["Active"] = "Active";
    /** Expired */
    KnownCertificateStatus["Expired"] = "Expired";
    /** Revoked */
    KnownCertificateStatus["Revoked"] = "Revoked";
})(KnownCertificateStatus || (KnownCertificateStatus = {}));
/** Known values of {@link RevocationStatus} that the service accepts. */
export var KnownRevocationStatus;
(function (KnownRevocationStatus) {
    /** Succeeded */
    KnownRevocationStatus["Succeeded"] = "Succeeded";
    /** InProgress */
    KnownRevocationStatus["InProgress"] = "InProgress";
    /** Failed */
    KnownRevocationStatus["Failed"] = "Failed";
})(KnownRevocationStatus || (KnownRevocationStatus = {}));
export function revokeCertificateSerializer(item) {
    return {
        serialNumber: item["serialNumber"],
        thumbprint: item["thumbprint"],
        effectiveAt: item["effectiveAt"].toISOString(),
        reason: item["reason"],
        remarks: item["remarks"],
    };
}
export function trackedResourceSerializer(item) {
    return {
        tags: !item.tags ? item.tags : serializeRecord(item.tags),
        location: item["location"],
    };
}
export function codeSigningAccountSerializer(item) {
    return {
        tags: !item.tags ? item.tags : serializeRecord(item.tags),
        location: item["location"],
        properties: !item.properties
            ? item.properties
            : codeSigningAccountPropertiesSerializer(item.properties),
    };
}
export function codeSigningAccountPropertiesSerializer(item) {
    return {
        sku: !item.sku ? item.sku : accountSkuSerializer(item.sku),
    };
}
export function accountSkuSerializer(item) {
    return {
        name: item["name"],
    };
}
/** Known values of {@link SkuName} that the service accepts. */
export var KnownSkuName;
(function (KnownSkuName) {
    /** Basic */
    KnownSkuName["Basic"] = "Basic";
    /** Premium */
    KnownSkuName["Premium"] = "Premium";
})(KnownSkuName || (KnownSkuName = {}));
export function codeSigningAccountPatchSerializer(item) {
    return {
        tags: !item.tags ? item.tags : serializeRecord(item.tags),
        properties: !item.properties
            ? item.properties
            : codeSigningAccountPatchPropertiesSerializer(item.properties),
    };
}
export function codeSigningAccountPatchPropertiesSerializer(item) {
    return {
        sku: !item.sku ? item.sku : accountSkuSerializer(item.sku),
    };
}
export function checkNameAvailabilitySerializer(item) {
    return {
        name: item["name"],
    };
}
/** Known values of {@link NameUnavailabilityReason} that the service accepts. */
export var KnownNameUnavailabilityReason;
(function (KnownNameUnavailabilityReason) {
    /** AccountNameInvalid */
    KnownNameUnavailabilityReason["AccountNameInvalid"] = "AccountNameInvalid";
    /** AlreadyExists */
    KnownNameUnavailabilityReason["AlreadyExists"] = "AlreadyExists";
})(KnownNameUnavailabilityReason || (KnownNameUnavailabilityReason = {}));
/** Known values of {@link Origin} that the service accepts. */
export var KnownOrigin;
(function (KnownOrigin) {
    /** user */
    KnownOrigin["User"] = "user";
    /** system */
    KnownOrigin["System"] = "system";
    /** user,system */
    KnownOrigin["UserSystem"] = "user,system";
})(KnownOrigin || (KnownOrigin = {}));
/** Known values of {@link ActionType} that the service accepts. */
export var KnownActionType;
(function (KnownActionType) {
    /** Internal */
    KnownActionType["Internal"] = "Internal";
})(KnownActionType || (KnownActionType = {}));
//# sourceMappingURL=models.js.map