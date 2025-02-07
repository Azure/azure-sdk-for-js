// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
  getCertificates,
  deleteCertificate,
  setCertificateContacts,
  getCertificateContacts,
  deleteCertificateContacts,
  getCertificateIssuers,
  setCertificateIssuer,
  updateCertificateIssuer,
  getCertificateIssuer,
  deleteCertificateIssuer,
  createCertificate,
  importCertificate,
  getCertificateVersions,
  getCertificatePolicy,
  updateCertificatePolicy,
  updateCertificate,
  getCertificate,
  updateCertificateOperation,
  getCertificateOperation,
  deleteCertificateOperation,
  mergeCertificate,
  backupCertificate,
  restoreCertificate,
  getDeletedCertificates,
  getDeletedCertificate,
  purgeDeletedCertificate,
  recoverDeletedCertificate,
  GetCertificatesOptionalParams,
  DeleteCertificateOptionalParams,
  SetCertificateContactsOptionalParams,
  GetCertificateContactsOptionalParams,
  DeleteCertificateContactsOptionalParams,
  GetCertificateIssuersOptionalParams,
  SetCertificateIssuerOptionalParams,
  UpdateCertificateIssuerOptionalParams,
  GetCertificateIssuerOptionalParams,
  DeleteCertificateIssuerOptionalParams,
  CreateCertificateOptionalParams,
  ImportCertificateOptionalParams,
  GetCertificateVersionsOptionalParams,
  GetCertificatePolicyOptionalParams,
  UpdateCertificatePolicyOptionalParams,
  UpdateCertificateOptionalParams,
  GetCertificateOptionalParams,
  UpdateCertificateOperationOptionalParams,
  GetCertificateOperationOptionalParams,
  DeleteCertificateOperationOptionalParams,
  MergeCertificateOptionalParams,
  BackupCertificateOptionalParams,
  RestoreCertificateOptionalParams,
  GetDeletedCertificatesOptionalParams,
  GetDeletedCertificateOptionalParams,
  PurgeDeletedCertificateOptionalParams,
  RecoverDeletedCertificateOptionalParams,
} from "./api/index.js";
import {
  CertificateItem,
  DeletedCertificateBundle,
  CertificatePolicy,
  Contacts,
  CertificateIssuerItem,
  CertificateIssuerSetParameters,
  IssuerBundle,
  CertificateIssuerUpdateParameters,
  CertificateCreateParameters,
  CertificateOperation,
  CertificateImportParameters,
  CertificateBundle,
  CertificateUpdateParameters,
  CertificateOperationUpdateParameter,
  CertificateMergeParameters,
  BackupCertificateResult,
  CertificateRestoreParameters,
  DeletedCertificateItem,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";

export class KeyVaultClient {
  private _client: KeyVaultContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
  constructor(
    vaultBaseUrl: string,
    credential: TokenCredential,
    options: KeyVaultClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKeyVault(vaultBaseUrl, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
  getCertificates(
    options: GetCertificatesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CertificateItem> {
    return getCertificates(this._client, options);
  }

  /** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
  deleteCertificate(
    certificateName: string,
    options: DeleteCertificateOptionalParams = { requestOptions: {} },
  ): Promise<DeletedCertificateBundle> {
    return deleteCertificate(this._client, certificateName, options);
  }

  /** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
  setCertificateContacts(
    contacts: Contacts,
    options: SetCertificateContactsOptionalParams = { requestOptions: {} },
  ): Promise<Contacts> {
    return setCertificateContacts(this._client, contacts, options);
  }

  /** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
  getCertificateContacts(
    options: GetCertificateContactsOptionalParams = { requestOptions: {} },
  ): Promise<Contacts> {
    return getCertificateContacts(this._client, options);
  }

  /** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
  deleteCertificateContacts(
    options: DeleteCertificateContactsOptionalParams = { requestOptions: {} },
  ): Promise<Contacts> {
    return deleteCertificateContacts(this._client, options);
  }

  /** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
  getCertificateIssuers(
    options: GetCertificateIssuersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CertificateIssuerItem> {
    return getCertificateIssuers(this._client, options);
  }

  /** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
  setCertificateIssuer(
    issuerName: string,
    parameter: CertificateIssuerSetParameters,
    options: SetCertificateIssuerOptionalParams = { requestOptions: {} },
  ): Promise<IssuerBundle> {
    return setCertificateIssuer(this._client, issuerName, parameter, options);
  }

  /** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
  updateCertificateIssuer(
    issuerName: string,
    parameter: CertificateIssuerUpdateParameters,
    options: UpdateCertificateIssuerOptionalParams = { requestOptions: {} },
  ): Promise<IssuerBundle> {
    return updateCertificateIssuer(
      this._client,
      issuerName,
      parameter,
      options,
    );
  }

  /** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
  getCertificateIssuer(
    issuerName: string,
    options: GetCertificateIssuerOptionalParams = { requestOptions: {} },
  ): Promise<IssuerBundle> {
    return getCertificateIssuer(this._client, issuerName, options);
  }

  /** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
  deleteCertificateIssuer(
    issuerName: string,
    options: DeleteCertificateIssuerOptionalParams = { requestOptions: {} },
  ): Promise<IssuerBundle> {
    return deleteCertificateIssuer(this._client, issuerName, options);
  }

  /** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
  createCertificate(
    certificateName: string,
    parameters: CertificateCreateParameters,
    options: CreateCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateOperation> {
    return createCertificate(
      this._client,
      certificateName,
      parameters,
      options,
    );
  }

  /** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
  importCertificate(
    certificateName: string,
    parameters: CertificateImportParameters,
    options: ImportCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return importCertificate(
      this._client,
      certificateName,
      parameters,
      options,
    );
  }

  /** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
  getCertificateVersions(
    certificateName: string,
    options: GetCertificateVersionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CertificateItem> {
    return getCertificateVersions(this._client, certificateName, options);
  }

  /** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
  getCertificatePolicy(
    certificateName: string,
    options: GetCertificatePolicyOptionalParams = { requestOptions: {} },
  ): Promise<CertificatePolicy> {
    return getCertificatePolicy(this._client, certificateName, options);
  }

  /** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
  updateCertificatePolicy(
    certificateName: string,
    certificatePolicy: CertificatePolicy,
    options: UpdateCertificatePolicyOptionalParams = { requestOptions: {} },
  ): Promise<CertificatePolicy> {
    return updateCertificatePolicy(
      this._client,
      certificateName,
      certificatePolicy,
      options,
    );
  }

  /** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
  updateCertificate(
    certificateName: string,
    certificateVersion: string,
    parameters: CertificateUpdateParameters,
    options: UpdateCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return updateCertificate(
      this._client,
      certificateName,
      certificateVersion,
      parameters,
      options,
    );
  }

  /** Gets information about a specific certificate. This operation requires the certificates/get permission. */
  getCertificate(
    certificateName: string,
    certificateVersion: string,
    options: GetCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return getCertificate(
      this._client,
      certificateName,
      certificateVersion,
      options,
    );
  }

  /** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
  updateCertificateOperation(
    certificateName: string,
    certificateOperation: CertificateOperationUpdateParameter,
    options: UpdateCertificateOperationOptionalParams = { requestOptions: {} },
  ): Promise<CertificateOperation> {
    return updateCertificateOperation(
      this._client,
      certificateName,
      certificateOperation,
      options,
    );
  }

  /** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
  getCertificateOperation(
    certificateName: string,
    options: GetCertificateOperationOptionalParams = { requestOptions: {} },
  ): Promise<CertificateOperation> {
    return getCertificateOperation(this._client, certificateName, options);
  }

  /** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
  deleteCertificateOperation(
    certificateName: string,
    options: DeleteCertificateOperationOptionalParams = { requestOptions: {} },
  ): Promise<CertificateOperation> {
    return deleteCertificateOperation(this._client, certificateName, options);
  }

  /** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
  mergeCertificate(
    certificateName: string,
    parameters: CertificateMergeParameters,
    options: MergeCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return mergeCertificate(this._client, certificateName, parameters, options);
  }

  /** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
  backupCertificate(
    certificateName: string,
    options: BackupCertificateOptionalParams = { requestOptions: {} },
  ): Promise<BackupCertificateResult> {
    return backupCertificate(this._client, certificateName, options);
  }

  /** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
  restoreCertificate(
    parameters: CertificateRestoreParameters,
    options: RestoreCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return restoreCertificate(this._client, parameters, options);
  }

  /** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
  getDeletedCertificates(
    options: GetDeletedCertificatesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DeletedCertificateItem> {
    return getDeletedCertificates(this._client, options);
  }

  /** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
  getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptionalParams = { requestOptions: {} },
  ): Promise<DeletedCertificateBundle> {
    return getDeletedCertificate(this._client, certificateName, options);
  }

  /** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
  purgeDeletedCertificate(
    certificateName: string,
    options: PurgeDeletedCertificateOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return purgeDeletedCertificate(this._client, certificateName, options);
  }

  /** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
  recoverDeletedCertificate(
    certificateName: string,
    options: RecoverDeletedCertificateOptionalParams = { requestOptions: {} },
  ): Promise<CertificateBundle> {
    return recoverDeletedCertificate(this._client, certificateName, options);
  }
}
