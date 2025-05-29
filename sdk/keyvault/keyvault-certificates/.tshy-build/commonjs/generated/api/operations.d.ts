import { BackupCertificateOptionalParams, KeyVaultContext as Client, CreateCertificateOptionalParams, DeleteCertificateContactsOptionalParams, DeleteCertificateIssuerOptionalParams, DeleteCertificateOperationOptionalParams, DeleteCertificateOptionalParams, GetCertificateContactsOptionalParams, GetCertificateIssuerOptionalParams, GetCertificateIssuersOptionalParams, GetCertificateOperationOptionalParams, GetCertificateOptionalParams, GetCertificatePolicyOptionalParams, GetCertificatesOptionalParams, GetCertificateVersionsOptionalParams, GetDeletedCertificateOptionalParams, GetDeletedCertificatesOptionalParams, ImportCertificateOptionalParams, MergeCertificateOptionalParams, PurgeDeletedCertificateOptionalParams, RecoverDeletedCertificateOptionalParams, RestoreCertificateOptionalParams, SetCertificateContactsOptionalParams, SetCertificateIssuerOptionalParams, UpdateCertificateIssuerOptionalParams, UpdateCertificateOperationOptionalParams, UpdateCertificateOptionalParams, UpdateCertificatePolicyOptionalParams } from "./index.js";
import { _CertificateListResult, CertificateItem, DeletedCertificateBundle, CertificatePolicy, Contacts, _CertificateIssuerListResult, CertificateIssuerItem, CertificateIssuerSetParameters, IssuerBundle, CertificateIssuerUpdateParameters, CertificateCreateParameters, CertificateOperation, CertificateImportParameters, CertificateBundle, CertificateUpdateParameters, CertificateOperationUpdateParameter, CertificateMergeParameters, BackupCertificateResult, CertificateRestoreParameters, _DeletedCertificateListResult, DeletedCertificateItem } from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
export declare function _recoverDeletedCertificateSend(context: Client, certificateName: string, options?: RecoverDeletedCertificateOptionalParams): StreamableMethod;
export declare function _recoverDeletedCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
export declare function recoverDeletedCertificate(context: Client, certificateName: string, options?: RecoverDeletedCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _purgeDeletedCertificateSend(context: Client, certificateName: string, options?: PurgeDeletedCertificateOptionalParams): StreamableMethod;
export declare function _purgeDeletedCertificateDeserialize(result: PathUncheckedResponse): Promise<void>;
/** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
export declare function purgeDeletedCertificate(context: Client, certificateName: string, options?: PurgeDeletedCertificateOptionalParams): Promise<void>;
export declare function _getDeletedCertificateSend(context: Client, certificateName: string, options?: GetDeletedCertificateOptionalParams): StreamableMethod;
export declare function _getDeletedCertificateDeserialize(result: PathUncheckedResponse): Promise<DeletedCertificateBundle>;
/** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
export declare function getDeletedCertificate(context: Client, certificateName: string, options?: GetDeletedCertificateOptionalParams): Promise<DeletedCertificateBundle>;
export declare function _getDeletedCertificatesSend(context: Client, options?: GetDeletedCertificatesOptionalParams): StreamableMethod;
export declare function _getDeletedCertificatesDeserialize(result: PathUncheckedResponse): Promise<_DeletedCertificateListResult>;
/** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
export declare function getDeletedCertificates(context: Client, options?: GetDeletedCertificatesOptionalParams): PagedAsyncIterableIterator<DeletedCertificateItem>;
export declare function _restoreCertificateSend(context: Client, parameters: CertificateRestoreParameters, options?: RestoreCertificateOptionalParams): StreamableMethod;
export declare function _restoreCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
export declare function restoreCertificate(context: Client, parameters: CertificateRestoreParameters, options?: RestoreCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _backupCertificateSend(context: Client, certificateName: string, options?: BackupCertificateOptionalParams): StreamableMethod;
export declare function _backupCertificateDeserialize(result: PathUncheckedResponse): Promise<BackupCertificateResult>;
/** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
export declare function backupCertificate(context: Client, certificateName: string, options?: BackupCertificateOptionalParams): Promise<BackupCertificateResult>;
export declare function _mergeCertificateSend(context: Client, certificateName: string, parameters: CertificateMergeParameters, options?: MergeCertificateOptionalParams): StreamableMethod;
export declare function _mergeCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
export declare function mergeCertificate(context: Client, certificateName: string, parameters: CertificateMergeParameters, options?: MergeCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _deleteCertificateOperationSend(context: Client, certificateName: string, options?: DeleteCertificateOperationOptionalParams): StreamableMethod;
export declare function _deleteCertificateOperationDeserialize(result: PathUncheckedResponse): Promise<CertificateOperation>;
/** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
export declare function deleteCertificateOperation(context: Client, certificateName: string, options?: DeleteCertificateOperationOptionalParams): Promise<CertificateOperation>;
export declare function _getCertificateOperationSend(context: Client, certificateName: string, options?: GetCertificateOperationOptionalParams): StreamableMethod;
export declare function _getCertificateOperationDeserialize(result: PathUncheckedResponse): Promise<CertificateOperation>;
/** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
export declare function getCertificateOperation(context: Client, certificateName: string, options?: GetCertificateOperationOptionalParams): Promise<CertificateOperation>;
export declare function _updateCertificateOperationSend(context: Client, certificateName: string, certificateOperation: CertificateOperationUpdateParameter, options?: UpdateCertificateOperationOptionalParams): StreamableMethod;
export declare function _updateCertificateOperationDeserialize(result: PathUncheckedResponse): Promise<CertificateOperation>;
/** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
export declare function updateCertificateOperation(context: Client, certificateName: string, certificateOperation: CertificateOperationUpdateParameter, options?: UpdateCertificateOperationOptionalParams): Promise<CertificateOperation>;
export declare function _getCertificateSend(context: Client, certificateName: string, certificateVersion: string, options?: GetCertificateOptionalParams): StreamableMethod;
export declare function _getCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** Gets information about a specific certificate. This operation requires the certificates/get permission. */
export declare function getCertificate(context: Client, certificateName: string, certificateVersion: string, options?: GetCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _updateCertificateSend(context: Client, certificateName: string, certificateVersion: string, parameters: CertificateUpdateParameters, options?: UpdateCertificateOptionalParams): StreamableMethod;
export declare function _updateCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
export declare function updateCertificate(context: Client, certificateName: string, certificateVersion: string, parameters: CertificateUpdateParameters, options?: UpdateCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _updateCertificatePolicySend(context: Client, certificateName: string, certificatePolicy: CertificatePolicy, options?: UpdateCertificatePolicyOptionalParams): StreamableMethod;
export declare function _updateCertificatePolicyDeserialize(result: PathUncheckedResponse): Promise<CertificatePolicy>;
/** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
export declare function updateCertificatePolicy(context: Client, certificateName: string, certificatePolicy: CertificatePolicy, options?: UpdateCertificatePolicyOptionalParams): Promise<CertificatePolicy>;
export declare function _getCertificatePolicySend(context: Client, certificateName: string, options?: GetCertificatePolicyOptionalParams): StreamableMethod;
export declare function _getCertificatePolicyDeserialize(result: PathUncheckedResponse): Promise<CertificatePolicy>;
/** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
export declare function getCertificatePolicy(context: Client, certificateName: string, options?: GetCertificatePolicyOptionalParams): Promise<CertificatePolicy>;
export declare function _getCertificateVersionsSend(context: Client, certificateName: string, options?: GetCertificateVersionsOptionalParams): StreamableMethod;
export declare function _getCertificateVersionsDeserialize(result: PathUncheckedResponse): Promise<_CertificateListResult>;
/** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
export declare function getCertificateVersions(context: Client, certificateName: string, options?: GetCertificateVersionsOptionalParams): PagedAsyncIterableIterator<CertificateItem>;
export declare function _importCertificateSend(context: Client, certificateName: string, parameters: CertificateImportParameters, options?: ImportCertificateOptionalParams): StreamableMethod;
export declare function _importCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateBundle>;
/** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
export declare function importCertificate(context: Client, certificateName: string, parameters: CertificateImportParameters, options?: ImportCertificateOptionalParams): Promise<CertificateBundle>;
export declare function _createCertificateSend(context: Client, certificateName: string, parameters: CertificateCreateParameters, options?: CreateCertificateOptionalParams): StreamableMethod;
export declare function _createCertificateDeserialize(result: PathUncheckedResponse): Promise<CertificateOperation>;
/** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
export declare function createCertificate(context: Client, certificateName: string, parameters: CertificateCreateParameters, options?: CreateCertificateOptionalParams): Promise<CertificateOperation>;
export declare function _deleteCertificateIssuerSend(context: Client, issuerName: string, options?: DeleteCertificateIssuerOptionalParams): StreamableMethod;
export declare function _deleteCertificateIssuerDeserialize(result: PathUncheckedResponse): Promise<IssuerBundle>;
/** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
export declare function deleteCertificateIssuer(context: Client, issuerName: string, options?: DeleteCertificateIssuerOptionalParams): Promise<IssuerBundle>;
export declare function _getCertificateIssuerSend(context: Client, issuerName: string, options?: GetCertificateIssuerOptionalParams): StreamableMethod;
export declare function _getCertificateIssuerDeserialize(result: PathUncheckedResponse): Promise<IssuerBundle>;
/** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export declare function getCertificateIssuer(context: Client, issuerName: string, options?: GetCertificateIssuerOptionalParams): Promise<IssuerBundle>;
export declare function _updateCertificateIssuerSend(context: Client, issuerName: string, parameter: CertificateIssuerUpdateParameters, options?: UpdateCertificateIssuerOptionalParams): StreamableMethod;
export declare function _updateCertificateIssuerDeserialize(result: PathUncheckedResponse): Promise<IssuerBundle>;
/** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
export declare function updateCertificateIssuer(context: Client, issuerName: string, parameter: CertificateIssuerUpdateParameters, options?: UpdateCertificateIssuerOptionalParams): Promise<IssuerBundle>;
export declare function _setCertificateIssuerSend(context: Client, issuerName: string, parameter: CertificateIssuerSetParameters, options?: SetCertificateIssuerOptionalParams): StreamableMethod;
export declare function _setCertificateIssuerDeserialize(result: PathUncheckedResponse): Promise<IssuerBundle>;
/** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
export declare function setCertificateIssuer(context: Client, issuerName: string, parameter: CertificateIssuerSetParameters, options?: SetCertificateIssuerOptionalParams): Promise<IssuerBundle>;
export declare function _getCertificateIssuersSend(context: Client, options?: GetCertificateIssuersOptionalParams): StreamableMethod;
export declare function _getCertificateIssuersDeserialize(result: PathUncheckedResponse): Promise<_CertificateIssuerListResult>;
/** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export declare function getCertificateIssuers(context: Client, options?: GetCertificateIssuersOptionalParams): PagedAsyncIterableIterator<CertificateIssuerItem>;
export declare function _deleteCertificateContactsSend(context: Client, options?: DeleteCertificateContactsOptionalParams): StreamableMethod;
export declare function _deleteCertificateContactsDeserialize(result: PathUncheckedResponse): Promise<Contacts>;
/** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
export declare function deleteCertificateContacts(context: Client, options?: DeleteCertificateContactsOptionalParams): Promise<Contacts>;
export declare function _getCertificateContactsSend(context: Client, options?: GetCertificateContactsOptionalParams): StreamableMethod;
export declare function _getCertificateContactsDeserialize(result: PathUncheckedResponse): Promise<Contacts>;
/** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
export declare function getCertificateContacts(context: Client, options?: GetCertificateContactsOptionalParams): Promise<Contacts>;
export declare function _setCertificateContactsSend(context: Client, contacts: Contacts, options?: SetCertificateContactsOptionalParams): StreamableMethod;
export declare function _setCertificateContactsDeserialize(result: PathUncheckedResponse): Promise<Contacts>;
/** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
export declare function setCertificateContacts(context: Client, contacts: Contacts, options?: SetCertificateContactsOptionalParams): Promise<Contacts>;
export declare function _deleteCertificateSend(context: Client, certificateName: string, options?: DeleteCertificateOptionalParams): StreamableMethod;
export declare function _deleteCertificateDeserialize(result: PathUncheckedResponse): Promise<DeletedCertificateBundle>;
/** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
export declare function deleteCertificate(context: Client, certificateName: string, options?: DeleteCertificateOptionalParams): Promise<DeletedCertificateBundle>;
export declare function _getCertificatesSend(context: Client, options?: GetCertificatesOptionalParams): StreamableMethod;
export declare function _getCertificatesDeserialize(result: PathUncheckedResponse): Promise<_CertificateListResult>;
/** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
export declare function getCertificates(context: Client, options?: GetCertificatesOptionalParams): PagedAsyncIterableIterator<CertificateItem>;
//# sourceMappingURL=operations.d.ts.map