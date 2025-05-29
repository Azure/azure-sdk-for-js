"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCoreAttributes = toCoreAttributes;
exports.toCorePolicy = toCorePolicy;
exports.toPublicPolicy = toPublicPolicy;
exports.toPublicIssuer = toPublicIssuer;
exports.getCertificateFromCertificateBundle = getCertificateFromCertificateBundle;
exports.getCertificateWithPolicyFromCertificateBundle = getCertificateWithPolicyFromCertificateBundle;
exports.getDeletedCertificateFromDeletedCertificateBundle = getDeletedCertificateFromDeletedCertificateBundle;
exports.getDeletedCertificateFromItem = getDeletedCertificateFromItem;
exports.getCertificateOperationFromCoreOperation = getCertificateOperationFromCoreOperation;
exports.coreContactsToCertificateContacts = coreContactsToCertificateContacts;
exports.getPropertiesFromCertificateBundle = getPropertiesFromCertificateBundle;
exports.mapPagedAsyncIterable = mapPagedAsyncIterable;
const tslib_1 = require("tslib");
const core_util_1 = require("@azure/core-util");
const identifier_js_1 = require("./identifier.js");
function toCoreAttributes(properties) {
    return {
        recoveryLevel: properties.recoveryLevel,
        enabled: properties.enabled,
        notBefore: properties.notBefore,
        expires: properties.expiresOn,
        created: properties.createdOn,
        updated: properties.updatedOn,
    };
}
function toCorePolicy(id, policy, attributes = {}) {
    let subjectAlternativeNames = {};
    if (policy.subjectAlternativeNames) {
        subjectAlternativeNames = {
            emails: policy.subjectAlternativeNames.emails,
            dnsNames: policy.subjectAlternativeNames.dnsNames,
            upns: policy.subjectAlternativeNames.userPrincipalNames,
        };
    }
    return {
        id,
        lifetimeActions: policy.lifetimeActions
            ? policy.lifetimeActions.map((action) => ({
                action: { actionType: action.action },
                trigger: {
                    lifetimePercentage: action.lifetimePercentage,
                    daysBeforeExpiry: action.daysBeforeExpiry,
                },
            }))
            : undefined,
        keyProperties: {
            keyType: policy.keyType,
            keySize: policy.keySize,
            reuseKey: policy.reuseKey,
            curve: policy.keyCurveName,
            exportable: policy.exportable,
        },
        secretProperties: {
            contentType: policy.contentType,
        },
        x509CertificateProperties: {
            subject: policy.subject,
            ekus: policy.enhancedKeyUsage,
            subjectAlternativeNames,
            keyUsage: policy.keyUsage,
            validityInMonths: policy.validityInMonths,
        },
        issuerParameters: {
            name: policy.issuerName,
            certificateType: policy.certificateType,
            certificateTransparency: policy.certificateTransparency,
        },
        attributes,
    };
}
function toPublicPolicy(policy = {}) {
    let subjectAlternativeNames;
    const x509Properties = policy.x509CertificateProperties || {};
    if (policy.x509CertificateProperties) {
        if (x509Properties.subjectAlternativeNames) {
            const names = x509Properties.subjectAlternativeNames;
            if (names.emails && names.emails.length) {
                subjectAlternativeNames = Object.assign(Object.assign({}, subjectAlternativeNames), { emails: names.emails });
            }
            if (names.dnsNames && names.dnsNames.length) {
                subjectAlternativeNames = Object.assign(Object.assign({}, subjectAlternativeNames), { dnsNames: names.dnsNames });
            }
            if (names.upns && names.upns.length) {
                subjectAlternativeNames = Object.assign(Object.assign({}, subjectAlternativeNames), { userPrincipalNames: names.upns });
            }
        }
    }
    const certificatePolicy = {
        lifetimeActions: policy.lifetimeActions
            ? policy.lifetimeActions.map((action) => ({
                action: action.action ? action.action.actionType : undefined,
                daysBeforeExpiry: action.trigger ? action.trigger.daysBeforeExpiry : undefined,
                lifetimePercentage: action.trigger ? action.trigger.lifetimePercentage : undefined,
            }))
            : undefined,
        contentType: policy.secretProperties
            ? policy.secretProperties.contentType
            : undefined,
        enhancedKeyUsage: x509Properties.ekus,
        keyUsage: x509Properties.keyUsage,
        validityInMonths: x509Properties.validityInMonths,
        subject: x509Properties.subject,
        subjectAlternativeNames: subjectAlternativeNames,
    };
    if (policy.attributes) {
        certificatePolicy.enabled = policy.attributes.enabled;
    }
    if (policy.keyProperties) {
        certificatePolicy.keyType = policy.keyProperties.keyType;
        certificatePolicy.keySize = policy.keyProperties.keySize;
        certificatePolicy.reuseKey = policy.keyProperties.reuseKey;
        certificatePolicy.keyCurveName = policy.keyProperties.curve;
        certificatePolicy.exportable = policy.keyProperties.exportable;
    }
    if (policy.issuerParameters) {
        certificatePolicy.issuerName = policy.issuerParameters && policy.issuerParameters.name;
        certificatePolicy.certificateType = policy.issuerParameters
            .certificateType;
        certificatePolicy.certificateTransparency = policy.issuerParameters.certificateTransparency;
    }
    return certificatePolicy;
}
function toPublicIssuer(issuer = {}) {
    const parsedId = (0, identifier_js_1.parseKeyVaultCertificateIdentifier)(issuer.id);
    const attributes = issuer.attributes || {};
    const publicIssuer = {
        id: issuer.id,
        name: parsedId.name,
        provider: issuer.provider,
        accountId: issuer.credentials && issuer.credentials.accountId,
        password: issuer.credentials && issuer.credentials.password,
        enabled: attributes.enabled,
        createdOn: attributes.created,
        updatedOn: attributes.updated,
    };
    if (issuer.organizationDetails) {
        publicIssuer.organizationId = issuer.organizationDetails.id;
        publicIssuer.administratorContacts = issuer.organizationDetails.adminDetails
            ? issuer.organizationDetails.adminDetails.map((x) => ({
                email: x.emailAddress,
                phone: x.phone,
                firstName: x.firstName,
                lastName: x.lastName,
            }))
            : undefined;
    }
    return publicIssuer;
}
function getCertificateFromCertificateBundle(certificateBundle) {
    const parsedId = (0, identifier_js_1.parseKeyVaultCertificateIdentifier)(certificateBundle.id);
    const attributes = certificateBundle.attributes || {};
    const abstractProperties = {
        createdOn: attributes.created,
        updatedOn: attributes.updated,
        expiresOn: attributes.expires,
        id: certificateBundle.id,
        enabled: attributes.enabled,
        notBefore: attributes.notBefore,
        recoveryLevel: attributes.recoveryLevel,
        name: parsedId.name,
        vaultUrl: parsedId.vaultUrl,
        version: parsedId.version,
        tags: certificateBundle.tags,
        x509Thumbprint: certificateBundle.x509Thumbprint,
        x509ThumbprintString: certificateBundle.x509Thumbprint &&
            (0, core_util_1.uint8ArrayToString)(certificateBundle.x509Thumbprint, "hex"),
        recoverableDays: attributes.recoverableDays,
        preserveCertificateOrder: certificateBundle.preserveCertOrder,
    };
    return {
        keyId: certificateBundle.kid,
        secretId: certificateBundle.sid,
        name: parsedId.name,
        cer: certificateBundle.cer,
        properties: abstractProperties,
    };
}
function getCertificateWithPolicyFromCertificateBundle(certificateBundle) {
    const parsedId = (0, identifier_js_1.parseKeyVaultCertificateIdentifier)(certificateBundle.id);
    const attributes = certificateBundle.attributes || {};
    const policy = toPublicPolicy(certificateBundle.policy || {});
    const abstractProperties = {
        createdOn: attributes.created,
        updatedOn: attributes.updated,
        expiresOn: attributes.expires,
        id: certificateBundle.id,
        enabled: attributes.enabled,
        notBefore: attributes.notBefore,
        recoveryLevel: attributes.recoveryLevel,
        name: parsedId.name,
        vaultUrl: parsedId.vaultUrl,
        version: parsedId.version,
        tags: certificateBundle.tags,
        x509Thumbprint: certificateBundle.x509Thumbprint,
        x509ThumbprintString: certificateBundle.x509Thumbprint &&
            (0, core_util_1.uint8ArrayToString)(certificateBundle.x509Thumbprint, "hex"),
        recoverableDays: attributes.recoverableDays,
        preserveCertificateOrder: certificateBundle.preserveCertOrder,
    };
    return {
        keyId: certificateBundle.kid,
        secretId: certificateBundle.sid,
        name: parsedId.name,
        cer: certificateBundle.cer,
        policy,
        properties: abstractProperties,
    };
}
function getDeletedCertificateFromDeletedCertificateBundle(certificateBundle) {
    const certificate = getCertificateWithPolicyFromCertificateBundle(certificateBundle);
    return {
        policy: certificate.policy,
        cer: certificate.cer,
        id: certificate.id,
        keyId: certificate.keyId,
        secretId: certificate.secretId,
        name: certificate.name,
        properties: certificate.properties,
        recoveryId: certificateBundle.recoveryId,
        scheduledPurgeDate: certificateBundle.scheduledPurgeDate,
        deletedOn: certificateBundle.deletedDate,
    };
}
function getDeletedCertificateFromItem(item) {
    var _a, _b;
    const parsedId = (0, identifier_js_1.parseKeyVaultCertificateIdentifier)(item.id);
    const attributes = item.attributes || {};
    const abstractProperties = {
        createdOn: attributes.created,
        updatedOn: attributes.updated,
        expiresOn: attributes.expires,
        vaultUrl: parsedId.vaultUrl,
        version: parsedId.version,
        name: parsedId.name,
        id: item.id,
        tags: item.tags,
        x509Thumbprint: item.x509Thumbprint,
        x509ThumbprintString: item.x509Thumbprint && (0, core_util_1.uint8ArrayToString)(item.x509Thumbprint, "hex"),
        recoverableDays: (_a = item.attributes) === null || _a === void 0 ? void 0 : _a.recoverableDays,
        recoveryLevel: (_b = item.attributes) === null || _b === void 0 ? void 0 : _b.recoveryLevel,
    };
    return {
        deletedOn: item.deletedDate,
        recoveryId: item.recoveryId,
        scheduledPurgeDate: item.scheduledPurgeDate,
        name: parsedId.name,
        properties: abstractProperties,
    };
}
function getCertificateOperationErrorFromErrorModel(error) {
    if (error) {
        return {
            code: error.code,
            innerError: getCertificateOperationErrorFromErrorModel(error.innerError),
            message: error.message,
        };
    }
    return undefined;
}
function getCertificateOperationFromCoreOperation(certificateName, operation) {
    return {
        cancellationRequested: operation.cancellationRequested,
        name: certificateName,
        issuerName: operation.issuerParameters ? operation.issuerParameters.name : undefined,
        certificateTransparency: operation.issuerParameters
            ? operation.issuerParameters.certificateTransparency
            : undefined,
        certificateType: operation.issuerParameters
            ? operation.issuerParameters.certificateType
            : undefined,
        csr: operation.csr,
        error: getCertificateOperationErrorFromErrorModel(operation.error),
        id: operation.id,
        requestId: operation.requestId,
        status: operation.status,
        statusDetails: operation.statusDetails,
        target: operation.target,
    };
}
function coreContactsToCertificateContacts(contacts) {
    return contacts.contactList
        ? contacts.contactList.map((x) => ({ email: x.emailAddress, phone: x.phone, name: x.name }))
        : [];
}
function getPropertiesFromCertificateBundle(certificateBundle) {
    const parsedId = (0, identifier_js_1.parseKeyVaultCertificateIdentifier)(certificateBundle.id);
    const attributes = certificateBundle.attributes || {};
    const abstractProperties = {
        createdOn: attributes.created,
        updatedOn: attributes.updated,
        expiresOn: attributes.expires,
        id: certificateBundle.id,
        name: parsedId.name,
        enabled: attributes.enabled,
        notBefore: attributes.notBefore,
        recoveryLevel: attributes.recoveryLevel,
        vaultUrl: parsedId.vaultUrl,
        version: parsedId.version,
        tags: certificateBundle.tags,
        x509Thumbprint: certificateBundle.x509Thumbprint,
        x509ThumbprintString: certificateBundle.x509Thumbprint &&
            (0, core_util_1.uint8ArrayToString)(certificateBundle.x509Thumbprint, "hex"),
        recoverableDays: attributes.recoverableDays,
        preserveCertificateOrder: certificateBundle.preserveCertOrder,
    };
    return abstractProperties;
}
function mapPagedAsyncIterable(iter, mapper) {
    return {
        async next() {
            const result = await iter.next();
            return Object.assign(Object.assign({}, result), { value: result.value && mapper(result.value) });
        },
        [Symbol.asyncIterator]() {
            return this;
        },
        byPage(settings) {
            return tslib_1.__asyncGenerator(this, arguments, function* byPage_1() {
                var _a, e_1, _b, _c;
                const iteratorByPage = iter.byPage(settings);
                try {
                    for (var _d = true, iteratorByPage_1 = tslib_1.__asyncValues(iteratorByPage), iteratorByPage_1_1; iteratorByPage_1_1 = yield tslib_1.__await(iteratorByPage_1.next()), _a = iteratorByPage_1_1.done, !_a; _d = true) {
                        _c = iteratorByPage_1_1.value;
                        _d = false;
                        const page = _c;
                        yield yield tslib_1.__await(page.map(mapper));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = iteratorByPage_1.return)) yield tslib_1.__await(_b.call(iteratorByPage_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        },
    };
}
//# sourceMappingURL=transformations.js.map