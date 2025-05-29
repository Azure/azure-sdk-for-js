import { KeyVaultClientOptionalParams, RecoverDeletedCertificateOptionalParams, PurgeDeletedCertificateOptionalParams, GetDeletedCertificateOptionalParams, GetDeletedCertificatesOptionalParams, RestoreCertificateOptionalParams, BackupCertificateOptionalParams, MergeCertificateOptionalParams, DeleteCertificateOperationOptionalParams, GetCertificateOperationOptionalParams, UpdateCertificateOperationOptionalParams, GetCertificateOptionalParams, UpdateCertificateOptionalParams, UpdateCertificatePolicyOptionalParams, GetCertificatePolicyOptionalParams, GetCertificateVersionsOptionalParams, ImportCertificateOptionalParams, CreateCertificateOptionalParams, DeleteCertificateIssuerOptionalParams, GetCertificateIssuerOptionalParams, UpdateCertificateIssuerOptionalParams, SetCertificateIssuerOptionalParams, GetCertificateIssuersOptionalParams, DeleteCertificateContactsOptionalParams, GetCertificateContactsOptionalParams, SetCertificateContactsOptionalParams, DeleteCertificateOptionalParams, GetCertificatesOptionalParams } from "./api/index.js";
import { CertificateItem, DeletedCertificateBundle, CertificatePolicy, Contacts, CertificateIssuerItem, CertificateIssuerSetParameters, IssuerBundle, CertificateIssuerUpdateParameters, CertificateCreateParameters, CertificateOperation, CertificateImportParameters, CertificateBundle, CertificateUpdateParameters, CertificateOperationUpdateParameter, CertificateMergeParameters, BackupCertificateResult, CertificateRestoreParameters, DeletedCertificateItem } from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";
export declare class KeyVaultClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam: string, credential: TokenCredential, options?: KeyVaultClientOptionalParams);
    /** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
    recoverDeletedCertificate(certificateName: string, options?: RecoverDeletedCertificateOptionalParams): Promise<CertificateBundle>;
    /** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
    purgeDeletedCertificate(certificateName: string, options?: PurgeDeletedCertificateOptionalParams): Promise<void>;
    /** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
    getDeletedCertificate(certificateName: string, options?: GetDeletedCertificateOptionalParams): Promise<DeletedCertificateBundle>;
    /** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
    getDeletedCertificates(options?: GetDeletedCertificatesOptionalParams): PagedAsyncIterableIterator<DeletedCertificateItem>;
    /** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
    restoreCertificate(parameters: CertificateRestoreParameters, options?: RestoreCertificateOptionalParams): Promise<CertificateBundle>;
    /** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
    backupCertificate(certificateName: string, options?: BackupCertificateOptionalParams): Promise<BackupCertificateResult>;
    /** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
    mergeCertificate(certificateName: string, parameters: CertificateMergeParameters, options?: MergeCertificateOptionalParams): Promise<CertificateBundle>;
    /** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
    deleteCertificateOperation(certificateName: string, options?: DeleteCertificateOperationOptionalParams): Promise<CertificateOperation>;
    /** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
    getCertificateOperation(certificateName: string, options?: GetCertificateOperationOptionalParams): Promise<CertificateOperation>;
    /** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
    updateCertificateOperation(certificateName: string, certificateOperation: CertificateOperationUpdateParameter, options?: UpdateCertificateOperationOptionalParams): Promise<CertificateOperation>;
    /** Gets information about a specific certificate. This operation requires the certificates/get permission. */
    getCertificate(certificateName: string, certificateVersion: string, options?: GetCertificateOptionalParams): Promise<CertificateBundle>;
    /** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
    updateCertificate(certificateName: string, certificateVersion: string, parameters: CertificateUpdateParameters, options?: UpdateCertificateOptionalParams): Promise<CertificateBundle>;
    /** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
    updateCertificatePolicy(certificateName: string, certificatePolicy: CertificatePolicy, options?: UpdateCertificatePolicyOptionalParams): Promise<CertificatePolicy>;
    /** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
    getCertificatePolicy(certificateName: string, options?: GetCertificatePolicyOptionalParams): Promise<CertificatePolicy>;
    /** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
    getCertificateVersions(certificateName: string, options?: GetCertificateVersionsOptionalParams): PagedAsyncIterableIterator<CertificateItem>;
    /** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
    importCertificate(certificateName: string, parameters: CertificateImportParameters, options?: ImportCertificateOptionalParams): Promise<CertificateBundle>;
    /** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
    createCertificate(certificateName: string, parameters: CertificateCreateParameters, options?: CreateCertificateOptionalParams): Promise<CertificateOperation>;
    /** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
    deleteCertificateIssuer(issuerName: string, options?: DeleteCertificateIssuerOptionalParams): Promise<IssuerBundle>;
    /** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
    getCertificateIssuer(issuerName: string, options?: GetCertificateIssuerOptionalParams): Promise<IssuerBundle>;
    /** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
    updateCertificateIssuer(issuerName: string, parameter: CertificateIssuerUpdateParameters, options?: UpdateCertificateIssuerOptionalParams): Promise<IssuerBundle>;
    /** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
    setCertificateIssuer(issuerName: string, parameter: CertificateIssuerSetParameters, options?: SetCertificateIssuerOptionalParams): Promise<IssuerBundle>;
    /** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
    getCertificateIssuers(options?: GetCertificateIssuersOptionalParams): PagedAsyncIterableIterator<CertificateIssuerItem>;
    /** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
    deleteCertificateContacts(options?: DeleteCertificateContactsOptionalParams): Promise<Contacts>;
    /** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
    getCertificateContacts(options?: GetCertificateContactsOptionalParams): Promise<Contacts>;
    /** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
    setCertificateContacts(contacts: Contacts, options?: SetCertificateContactsOptionalParams): Promise<Contacts>;
    /** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
    deleteCertificate(certificateName: string, options?: DeleteCertificateOptionalParams): Promise<DeletedCertificateBundle>;
    /** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
    getCertificates(options?: GetCertificatesOptionalParams): PagedAsyncIterableIterator<CertificateItem>;
}
//# sourceMappingURL=keyVaultClient.d.ts.map