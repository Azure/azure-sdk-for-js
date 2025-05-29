// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createKeyVault, recoverDeletedCertificate, purgeDeletedCertificate, getDeletedCertificate, getDeletedCertificates, restoreCertificate, backupCertificate, mergeCertificate, deleteCertificateOperation, getCertificateOperation, updateCertificateOperation, getCertificate, updateCertificate, updateCertificatePolicy, getCertificatePolicy, getCertificateVersions, importCertificate, createCertificate, deleteCertificateIssuer, getCertificateIssuer, updateCertificateIssuer, setCertificateIssuer, getCertificateIssuers, deleteCertificateContacts, getCertificateContacts, setCertificateContacts, deleteCertificate, getCertificates, } from "./api/index.js";
export class KeyVaultClient {
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam, credential, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = createKeyVault(endpointParam, credential, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
    }
    /** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
    recoverDeletedCertificate(certificateName, options = { requestOptions: {} }) {
        return recoverDeletedCertificate(this._client, certificateName, options);
    }
    /** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
    purgeDeletedCertificate(certificateName, options = { requestOptions: {} }) {
        return purgeDeletedCertificate(this._client, certificateName, options);
    }
    /** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
    getDeletedCertificate(certificateName, options = { requestOptions: {} }) {
        return getDeletedCertificate(this._client, certificateName, options);
    }
    /** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
    getDeletedCertificates(options = { requestOptions: {} }) {
        return getDeletedCertificates(this._client, options);
    }
    /** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
    restoreCertificate(parameters, options = { requestOptions: {} }) {
        return restoreCertificate(this._client, parameters, options);
    }
    /** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
    backupCertificate(certificateName, options = { requestOptions: {} }) {
        return backupCertificate(this._client, certificateName, options);
    }
    /** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
    mergeCertificate(certificateName, parameters, options = { requestOptions: {} }) {
        return mergeCertificate(this._client, certificateName, parameters, options);
    }
    /** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
    deleteCertificateOperation(certificateName, options = { requestOptions: {} }) {
        return deleteCertificateOperation(this._client, certificateName, options);
    }
    /** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
    getCertificateOperation(certificateName, options = { requestOptions: {} }) {
        return getCertificateOperation(this._client, certificateName, options);
    }
    /** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
    updateCertificateOperation(certificateName, certificateOperation, options = { requestOptions: {} }) {
        return updateCertificateOperation(this._client, certificateName, certificateOperation, options);
    }
    /** Gets information about a specific certificate. This operation requires the certificates/get permission. */
    getCertificate(certificateName, certificateVersion, options = { requestOptions: {} }) {
        return getCertificate(this._client, certificateName, certificateVersion, options);
    }
    /** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
    updateCertificate(certificateName, certificateVersion, parameters, options = { requestOptions: {} }) {
        return updateCertificate(this._client, certificateName, certificateVersion, parameters, options);
    }
    /** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
    updateCertificatePolicy(certificateName, certificatePolicy, options = { requestOptions: {} }) {
        return updateCertificatePolicy(this._client, certificateName, certificatePolicy, options);
    }
    /** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
    getCertificatePolicy(certificateName, options = { requestOptions: {} }) {
        return getCertificatePolicy(this._client, certificateName, options);
    }
    /** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
    getCertificateVersions(certificateName, options = { requestOptions: {} }) {
        return getCertificateVersions(this._client, certificateName, options);
    }
    /** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
    importCertificate(certificateName, parameters, options = { requestOptions: {} }) {
        return importCertificate(this._client, certificateName, parameters, options);
    }
    /** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
    createCertificate(certificateName, parameters, options = { requestOptions: {} }) {
        return createCertificate(this._client, certificateName, parameters, options);
    }
    /** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
    deleteCertificateIssuer(issuerName, options = { requestOptions: {} }) {
        return deleteCertificateIssuer(this._client, issuerName, options);
    }
    /** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
    getCertificateIssuer(issuerName, options = { requestOptions: {} }) {
        return getCertificateIssuer(this._client, issuerName, options);
    }
    /** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
    updateCertificateIssuer(issuerName, parameter, options = { requestOptions: {} }) {
        return updateCertificateIssuer(this._client, issuerName, parameter, options);
    }
    /** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
    setCertificateIssuer(issuerName, parameter, options = { requestOptions: {} }) {
        return setCertificateIssuer(this._client, issuerName, parameter, options);
    }
    /** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
    getCertificateIssuers(options = { requestOptions: {} }) {
        return getCertificateIssuers(this._client, options);
    }
    /** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
    deleteCertificateContacts(options = { requestOptions: {} }) {
        return deleteCertificateContacts(this._client, options);
    }
    /** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
    getCertificateContacts(options = { requestOptions: {} }) {
        return getCertificateContacts(this._client, options);
    }
    /** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
    setCertificateContacts(contacts, options = { requestOptions: {} }) {
        return setCertificateContacts(this._client, contacts, options);
    }
    /** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
    deleteCertificate(certificateName, options = { requestOptions: {} }) {
        return deleteCertificate(this._client, certificateName, options);
    }
    /** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
    getCertificates(options = { requestOptions: {} }) {
        return getCertificates(this._client, options);
    }
}
//# sourceMappingURL=keyVaultClient.js.map