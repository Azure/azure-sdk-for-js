// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { _certificateListResultDeserializer, keyVaultErrorDeserializer, deletedCertificateBundleDeserializer, certificatePolicySerializer, certificatePolicyDeserializer, contactsSerializer, contactsDeserializer, _certificateIssuerListResultDeserializer, certificateIssuerSetParametersSerializer, issuerBundleDeserializer, certificateIssuerUpdateParametersSerializer, certificateCreateParametersSerializer, certificateOperationDeserializer, certificateImportParametersSerializer, certificateBundleDeserializer, certificateUpdateParametersSerializer, certificateOperationUpdateParameterSerializer, certificateMergeParametersSerializer, backupCertificateResultDeserializer, certificateRestoreParametersSerializer, _deletedCertificateListResultDeserializer, } from "../models/models.js";
import { buildPagedAsyncIterator, } from "../static-helpers/pagingHelpers.js";
import { createRestError, operationOptionsToRequestParameters, } from "@azure-rest/core-client";
export function _recoverDeletedCertificateSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedcertificates/{certificate-name}/recover", certificateName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _recoverDeletedCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
export async function recoverDeletedCertificate(context, certificateName, options = { requestOptions: {} }) {
    const result = await _recoverDeletedCertificateSend(context, certificateName, options);
    return _recoverDeletedCertificateDeserialize(result);
}
export function _purgeDeletedCertificateSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedcertificates/{certificate-name}", certificateName)
        .delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _purgeDeletedCertificateDeserialize(result) {
    const expectedStatuses = ["204"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return;
}
/** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
export async function purgeDeletedCertificate(context, certificateName, options = { requestOptions: {} }) {
    const result = await _purgeDeletedCertificateSend(context, certificateName, options);
    return _purgeDeletedCertificateDeserialize(result);
}
export function _getDeletedCertificateSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedcertificates/{certificate-name}", certificateName)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getDeletedCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return deletedCertificateBundleDeserializer(result.body);
}
/** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
export async function getDeletedCertificate(context, certificateName, options = { requestOptions: {} }) {
    const result = await _getDeletedCertificateSend(context, certificateName, options);
    return _getDeletedCertificateDeserialize(result);
}
export function _getDeletedCertificatesSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/deletedcertificates")
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
            includePending: options === null || options === void 0 ? void 0 : options.includePending,
        } }));
}
export async function _getDeletedCertificatesDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return _deletedCertificateListResultDeserializer(result.body);
}
/** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
export function getDeletedCertificates(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _getDeletedCertificatesSend(context, options), _getDeletedCertificatesDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _restoreCertificateSend(context, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/restore")
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateRestoreParametersSerializer(parameters) }));
}
export async function _restoreCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
export async function restoreCertificate(context, parameters, options = { requestOptions: {} }) {
    const result = await _restoreCertificateSend(context, parameters, options);
    return _restoreCertificateDeserialize(result);
}
export function _backupCertificateSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/backup", certificateName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _backupCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return backupCertificateResultDeserializer(result.body);
}
/** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
export async function backupCertificate(context, certificateName, options = { requestOptions: {} }) {
    const result = await _backupCertificateSend(context, certificateName, options);
    return _backupCertificateDeserialize(result);
}
export function _mergeCertificateSend(context, certificateName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/pending/merge", certificateName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateMergeParametersSerializer(parameters) }));
}
export async function _mergeCertificateDeserialize(result) {
    const expectedStatuses = ["201"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
export async function mergeCertificate(context, certificateName, parameters, options = { requestOptions: {} }) {
    const result = await _mergeCertificateSend(context, certificateName, parameters, options);
    return _mergeCertificateDeserialize(result);
}
export function _deleteCertificateOperationSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/pending", certificateName)
        .delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _deleteCertificateOperationDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateOperationDeserializer(result.body);
}
/** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
export async function deleteCertificateOperation(context, certificateName, options = { requestOptions: {} }) {
    const result = await _deleteCertificateOperationSend(context, certificateName, options);
    return _deleteCertificateOperationDeserialize(result);
}
export function _getCertificateOperationSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/pending", certificateName)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getCertificateOperationDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateOperationDeserializer(result.body);
}
/** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
export async function getCertificateOperation(context, certificateName, options = { requestOptions: {} }) {
    const result = await _getCertificateOperationSend(context, certificateName, options);
    return _getCertificateOperationDeserialize(result);
}
export function _updateCertificateOperationSend(context, certificateName, certificateOperation, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/pending", certificateName)
        .patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateOperationUpdateParameterSerializer(certificateOperation) }));
}
export async function _updateCertificateOperationDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateOperationDeserializer(result.body);
}
/** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
export async function updateCertificateOperation(context, certificateName, certificateOperation, options = { requestOptions: {} }) {
    const result = await _updateCertificateOperationSend(context, certificateName, certificateOperation, options);
    return _updateCertificateOperationDeserialize(result);
}
export function _getCertificateSend(context, certificateName, certificateVersion, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/{certificate-version}", certificateName, certificateVersion)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** Gets information about a specific certificate. This operation requires the certificates/get permission. */
export async function getCertificate(context, certificateName, certificateVersion, options = { requestOptions: {} }) {
    const result = await _getCertificateSend(context, certificateName, certificateVersion, options);
    return _getCertificateDeserialize(result);
}
export function _updateCertificateSend(context, certificateName, certificateVersion, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/{certificate-version}", certificateName, certificateVersion)
        .patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateUpdateParametersSerializer(parameters) }));
}
export async function _updateCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
export async function updateCertificate(context, certificateName, certificateVersion, parameters, options = { requestOptions: {} }) {
    const result = await _updateCertificateSend(context, certificateName, certificateVersion, parameters, options);
    return _updateCertificateDeserialize(result);
}
export function _updateCertificatePolicySend(context, certificateName, certificatePolicy, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/policy", certificateName)
        .patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificatePolicySerializer(certificatePolicy) }));
}
export async function _updateCertificatePolicyDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificatePolicyDeserializer(result.body);
}
/** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
export async function updateCertificatePolicy(context, certificateName, certificatePolicy, options = { requestOptions: {} }) {
    const result = await _updateCertificatePolicySend(context, certificateName, certificatePolicy, options);
    return _updateCertificatePolicyDeserialize(result);
}
export function _getCertificatePolicySend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/policy", certificateName)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getCertificatePolicyDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificatePolicyDeserializer(result.body);
}
/** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
export async function getCertificatePolicy(context, certificateName, options = { requestOptions: {} }) {
    const result = await _getCertificatePolicySend(context, certificateName, options);
    return _getCertificatePolicyDeserialize(result);
}
export function _getCertificateVersionsSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/versions", certificateName)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
        } }));
}
export async function _getCertificateVersionsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return _certificateListResultDeserializer(result.body);
}
/** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
export function getCertificateVersions(context, certificateName, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _getCertificateVersionsSend(context, certificateName, options), _getCertificateVersionsDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _importCertificateSend(context, certificateName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/import", certificateName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateImportParametersSerializer(parameters) }));
}
export async function _importCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateBundleDeserializer(result.body);
}
/** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
export async function importCertificate(context, certificateName, parameters, options = { requestOptions: {} }) {
    const result = await _importCertificateSend(context, certificateName, parameters, options);
    return _importCertificateDeserialize(result);
}
export function _createCertificateSend(context, certificateName, parameters, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}/create", certificateName)
        .post(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateCreateParametersSerializer(parameters) }));
}
export async function _createCertificateDeserialize(result) {
    const expectedStatuses = ["202"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return certificateOperationDeserializer(result.body);
}
/** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
export async function createCertificate(context, certificateName, parameters, options = { requestOptions: {} }) {
    const result = await _createCertificateSend(context, certificateName, parameters, options);
    return _createCertificateDeserialize(result);
}
export function _deleteCertificateIssuerSend(context, issuerName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/issuers/{issuer-name}", issuerName)
        .delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _deleteCertificateIssuerDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return issuerBundleDeserializer(result.body);
}
/** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
export async function deleteCertificateIssuer(context, issuerName, options = { requestOptions: {} }) {
    const result = await _deleteCertificateIssuerSend(context, issuerName, options);
    return _deleteCertificateIssuerDeserialize(result);
}
export function _getCertificateIssuerSend(context, issuerName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/issuers/{issuer-name}", issuerName)
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getCertificateIssuerDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return issuerBundleDeserializer(result.body);
}
/** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export async function getCertificateIssuer(context, issuerName, options = { requestOptions: {} }) {
    const result = await _getCertificateIssuerSend(context, issuerName, options);
    return _getCertificateIssuerDeserialize(result);
}
export function _updateCertificateIssuerSend(context, issuerName, parameter, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/issuers/{issuer-name}", issuerName)
        .patch(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateIssuerUpdateParametersSerializer(parameter) }));
}
export async function _updateCertificateIssuerDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return issuerBundleDeserializer(result.body);
}
/** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
export async function updateCertificateIssuer(context, issuerName, parameter, options = { requestOptions: {} }) {
    const result = await _updateCertificateIssuerSend(context, issuerName, parameter, options);
    return _updateCertificateIssuerDeserialize(result);
}
export function _setCertificateIssuerSend(context, issuerName, parameter, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/issuers/{issuer-name}", issuerName)
        .put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: certificateIssuerSetParametersSerializer(parameter) }));
}
export async function _setCertificateIssuerDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return issuerBundleDeserializer(result.body);
}
/** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
export async function setCertificateIssuer(context, issuerName, parameter, options = { requestOptions: {} }) {
    const result = await _setCertificateIssuerSend(context, issuerName, parameter, options);
    return _setCertificateIssuerDeserialize(result);
}
export function _getCertificateIssuersSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/issuers")
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
        } }));
}
export async function _getCertificateIssuersDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return _certificateIssuerListResultDeserializer(result.body);
}
/** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export function getCertificateIssuers(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _getCertificateIssuersSend(context, options), _getCertificateIssuersDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
export function _deleteCertificateContactsSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/contacts")
        .delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _deleteCertificateContactsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return contactsDeserializer(result.body);
}
/** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
export async function deleteCertificateContacts(context, options = { requestOptions: {} }) {
    const result = await _deleteCertificateContactsSend(context, options);
    return _deleteCertificateContactsDeserialize(result);
}
export function _getCertificateContactsSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/contacts")
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _getCertificateContactsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return contactsDeserializer(result.body);
}
/** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
export async function getCertificateContacts(context, options = { requestOptions: {} }) {
    const result = await _getCertificateContactsSend(context, options);
    return _getCertificateContactsDeserialize(result);
}
export function _setCertificateContactsSend(context, contacts, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/contacts")
        .put(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { contentType: "application/json", headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion }, body: contactsSerializer(contacts) }));
}
export async function _setCertificateContactsDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return contactsDeserializer(result.body);
}
/** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
export async function setCertificateContacts(context, contacts, options = { requestOptions: {} }) {
    const result = await _setCertificateContactsSend(context, contacts, options);
    return _setCertificateContactsDeserialize(result);
}
export function _deleteCertificateSend(context, certificateName, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates/{certificate-name}", certificateName)
        .delete(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: { "api-version": context.apiVersion } }));
}
export async function _deleteCertificateDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return deletedCertificateBundleDeserializer(result.body);
}
/** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
export async function deleteCertificate(context, certificateName, options = { requestOptions: {} }) {
    const result = await _deleteCertificateSend(context, certificateName, options);
    return _deleteCertificateDeserialize(result);
}
export function _getCertificatesSend(context, options = { requestOptions: {} }) {
    var _a;
    return context
        .path("/certificates")
        .get(Object.assign(Object.assign({}, operationOptionsToRequestParameters(options)), { headers: Object.assign({ accept: "application/json" }, (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.headers), queryParameters: {
            "api-version": context.apiVersion,
            maxresults: options === null || options === void 0 ? void 0 : options.maxresults,
            includePending: options === null || options === void 0 ? void 0 : options.includePending,
        } }));
}
export async function _getCertificatesDeserialize(result) {
    const expectedStatuses = ["200"];
    if (!expectedStatuses.includes(result.status)) {
        const error = createRestError(result);
        error.details = keyVaultErrorDeserializer(result.body);
        throw error;
    }
    return _certificateListResultDeserializer(result.body);
}
/** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
export function getCertificates(context, options = { requestOptions: {} }) {
    return buildPagedAsyncIterator(context, () => _getCertificatesSend(context, options), _getCertificatesDeserialize, ["200"], { itemName: "value", nextLinkName: "nextLink" });
}
//# sourceMappingURL=operations.js.map