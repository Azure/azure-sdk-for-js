// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetCertificatesParameters,
  DeleteCertificateParameters,
  SetCertificateContactsParameters,
  GetCertificateContactsParameters,
  DeleteCertificateContactsParameters,
  GetCertificateIssuersParameters,
  SetCertificateIssuerParameters,
  UpdateCertificateIssuerParameters,
  GetCertificateIssuerParameters,
  DeleteCertificateIssuerParameters,
  CreateCertificateParameters,
  ImportCertificateParameters,
  GetCertificateVersionsParameters,
  GetCertificatePolicyParameters,
  UpdateCertificatePolicyParameters,
  UpdateCertificateParameters,
  GetCertificateParameters,
  UpdateCertificateOperationParameters,
  GetCertificateOperationParameters,
  DeleteCertificateOperationParameters,
  MergeCertificateParameters,
  BackupCertificateParameters,
  RestoreCertificateParameters,
  GetDeletedCertificatesParameters,
  GetDeletedCertificateParameters,
  PurgeDeletedCertificateParameters,
  RecoverDeletedCertificateParameters,
} from "./parameters";
import {
  GetCertificates200Response,
  GetCertificatesDefaultResponse,
  DeleteCertificate200Response,
  DeleteCertificateDefaultResponse,
  SetCertificateContacts200Response,
  SetCertificateContactsDefaultResponse,
  GetCertificateContacts200Response,
  GetCertificateContactsDefaultResponse,
  DeleteCertificateContacts200Response,
  DeleteCertificateContactsDefaultResponse,
  GetCertificateIssuers200Response,
  GetCertificateIssuersDefaultResponse,
  SetCertificateIssuer200Response,
  SetCertificateIssuerDefaultResponse,
  UpdateCertificateIssuer200Response,
  UpdateCertificateIssuerDefaultResponse,
  GetCertificateIssuer200Response,
  GetCertificateIssuerDefaultResponse,
  DeleteCertificateIssuer200Response,
  DeleteCertificateIssuerDefaultResponse,
  CreateCertificate202Response,
  CreateCertificateDefaultResponse,
  ImportCertificate200Response,
  ImportCertificateDefaultResponse,
  GetCertificateVersions200Response,
  GetCertificateVersionsDefaultResponse,
  GetCertificatePolicy200Response,
  GetCertificatePolicyDefaultResponse,
  UpdateCertificatePolicy200Response,
  UpdateCertificatePolicyDefaultResponse,
  UpdateCertificate200Response,
  UpdateCertificateDefaultResponse,
  GetCertificate200Response,
  GetCertificateDefaultResponse,
  UpdateCertificateOperation200Response,
  UpdateCertificateOperationDefaultResponse,
  GetCertificateOperation200Response,
  GetCertificateOperationDefaultResponse,
  DeleteCertificateOperation200Response,
  DeleteCertificateOperationDefaultResponse,
  MergeCertificate201Response,
  MergeCertificateDefaultResponse,
  BackupCertificate200Response,
  BackupCertificateDefaultResponse,
  RestoreCertificate200Response,
  RestoreCertificateDefaultResponse,
  GetDeletedCertificates200Response,
  GetDeletedCertificatesDefaultResponse,
  GetDeletedCertificate200Response,
  GetDeletedCertificateDefaultResponse,
  PurgeDeletedCertificate204Response,
  PurgeDeletedCertificateDefaultResponse,
  RecoverDeletedCertificate200Response,
  RecoverDeletedCertificateDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetCertificates {
  /**
   * The GetCertificates operation returns the set of certificates resources in the
   * specified key vault. This operation requires the certificates/list permission.
   */
  get(
    options?: GetCertificatesParameters
  ): StreamableMethod<GetCertificates200Response | GetCertificatesDefaultResponse>;
}

export interface DeleteCertificate {
  /**
   * Deletes all versions of a certificate object along with its associated policy.
   * Delete certificate cannot be used to remove individual versions of a
   * certificate object. This operation requires the certificates/delete permission.
   */
  delete(
    options?: DeleteCertificateParameters
  ): StreamableMethod<DeleteCertificate200Response | DeleteCertificateDefaultResponse>;
}

export interface SetCertificateContacts {
  /**
   * Sets the certificate contacts for the specified key vault. This operation
   * requires the certificates/managecontacts permission.
   */
  put(
    options: SetCertificateContactsParameters
  ): StreamableMethod<SetCertificateContacts200Response | SetCertificateContactsDefaultResponse>;
  /**
   * The GetCertificateContacts operation returns the set of certificate contact
   * resources in the specified key vault. This operation requires the
   * certificates/managecontacts permission.
   */
  get(
    options?: GetCertificateContactsParameters
  ): StreamableMethod<GetCertificateContacts200Response | GetCertificateContactsDefaultResponse>;
  /**
   * Deletes the certificate contacts for a specified key vault certificate. This
   * operation requires the certificates/managecontacts permission.
   */
  delete(
    options?: DeleteCertificateContactsParameters
  ): StreamableMethod<
    DeleteCertificateContacts200Response | DeleteCertificateContactsDefaultResponse
  >;
}

export interface GetCertificateIssuers {
  /**
   * The GetCertificateIssuers operation returns the set of certificate issuer
   * resources in the specified key vault. This operation requires the
   * certificates/manageissuers/getissuers permission.
   */
  get(
    options?: GetCertificateIssuersParameters
  ): StreamableMethod<GetCertificateIssuers200Response | GetCertificateIssuersDefaultResponse>;
}

export interface SetCertificateIssuer {
  /**
   * The SetCertificateIssuer operation adds or updates the specified certificate
   * issuer. This operation requires the certificates/setissuers permission.
   */
  put(
    options: SetCertificateIssuerParameters
  ): StreamableMethod<SetCertificateIssuer200Response | SetCertificateIssuerDefaultResponse>;
  /**
   * The UpdateCertificateIssuer operation performs an update on the specified
   * certificate issuer entity. This operation requires the certificates/setissuers
   * permission.
   */
  patch(
    options: UpdateCertificateIssuerParameters
  ): StreamableMethod<UpdateCertificateIssuer200Response | UpdateCertificateIssuerDefaultResponse>;
  /**
   * The GetCertificateIssuer operation returns the specified certificate issuer
   * resources in the specified key vault. This operation requires the
   * certificates/manageissuers/getissuers permission.
   */
  get(
    options?: GetCertificateIssuerParameters
  ): StreamableMethod<GetCertificateIssuer200Response | GetCertificateIssuerDefaultResponse>;
  /**
   * The DeleteCertificateIssuer operation permanently removes the specified
   * certificate issuer from the vault. This operation requires the
   * certificates/manageissuers/deleteissuers permission.
   */
  delete(
    options?: DeleteCertificateIssuerParameters
  ): StreamableMethod<DeleteCertificateIssuer200Response | DeleteCertificateIssuerDefaultResponse>;
}

export interface CreateCertificate {
  /**
   * If this is the first version, the certificate resource is created. This
   * operation requires the certificates/create permission.
   */
  post(
    options: CreateCertificateParameters
  ): StreamableMethod<CreateCertificate202Response | CreateCertificateDefaultResponse>;
}

export interface ImportCertificate {
  /**
   * Imports an existing valid certificate, containing a private key, into Azure Key
   * Vault. This operation requires the certificates/import permission. The
   * certificate to be imported can be in either PFX or PEM format. If the
   * certificate is in PEM format the PEM file must contain the key as well as x509
   * certificates. Key Vault will only accept a key in PKCS#8 format.
   */
  post(
    options: ImportCertificateParameters
  ): StreamableMethod<ImportCertificate200Response | ImportCertificateDefaultResponse>;
}

export interface GetCertificateVersions {
  /**
   * The GetCertificateVersions operation returns the versions of a certificate in
   * the specified key vault. This operation requires the certificates/list
   * permission.
   */
  get(
    options?: GetCertificateVersionsParameters
  ): StreamableMethod<GetCertificateVersions200Response | GetCertificateVersionsDefaultResponse>;
}

export interface GetCertificatePolicy {
  /**
   * The GetCertificatePolicy operation returns the specified certificate policy
   * resources in the specified key vault. This operation requires the
   * certificates/get permission.
   */
  get(
    options?: GetCertificatePolicyParameters
  ): StreamableMethod<GetCertificatePolicy200Response | GetCertificatePolicyDefaultResponse>;
  /**
   * Set specified members in the certificate policy. Leave others as null. This
   * operation requires the certificates/update permission.
   */
  patch(
    options: UpdateCertificatePolicyParameters
  ): StreamableMethod<UpdateCertificatePolicy200Response | UpdateCertificatePolicyDefaultResponse>;
}

export interface UpdateCertificate {
  /**
   * The UpdateCertificate operation applies the specified update on the given
   * certificate; the only elements updated are the certificate's attributes. This
   * operation requires the certificates/update permission.
   */
  patch(
    options: UpdateCertificateParameters
  ): StreamableMethod<UpdateCertificate200Response | UpdateCertificateDefaultResponse>;
  /**
   * Gets information about a specific certificate. This operation requires the
   * certificates/get permission.
   */
  get(
    options?: GetCertificateParameters
  ): StreamableMethod<GetCertificate200Response | GetCertificateDefaultResponse>;
}

export interface UpdateCertificateOperation {
  /**
   * Updates a certificate creation operation that is already in progress. This
   * operation requires the certificates/update permission.
   */
  patch(
    options: UpdateCertificateOperationParameters
  ): StreamableMethod<
    UpdateCertificateOperation200Response | UpdateCertificateOperationDefaultResponse
  >;
  /**
   * Gets the creation operation associated with a specified certificate. This
   * operation requires the certificates/get permission.
   */
  get(
    options?: GetCertificateOperationParameters
  ): StreamableMethod<GetCertificateOperation200Response | GetCertificateOperationDefaultResponse>;
  /**
   * Deletes the creation operation for a specified certificate that is in the
   * process of being created. The certificate is no longer created. This operation
   * requires the certificates/update permission.
   */
  delete(
    options?: DeleteCertificateOperationParameters
  ): StreamableMethod<
    DeleteCertificateOperation200Response | DeleteCertificateOperationDefaultResponse
  >;
}

export interface MergeCertificate {
  /**
   * The MergeCertificate operation performs the merging of a certificate or
   * certificate chain with a key pair currently available in the service. This
   * operation requires the certificates/create permission.
   */
  post(
    options: MergeCertificateParameters
  ): StreamableMethod<MergeCertificate201Response | MergeCertificateDefaultResponse>;
}

export interface BackupCertificate {
  /**
   * Requests that a backup of the specified certificate be downloaded to the
   * client. All versions of the certificate will be downloaded. This operation
   * requires the certificates/backup permission.
   */
  post(
    options?: BackupCertificateParameters
  ): StreamableMethod<BackupCertificate200Response | BackupCertificateDefaultResponse>;
}

export interface RestoreCertificate {
  /**
   * Restores a backed up certificate, and all its versions, to a vault. This
   * operation requires the certificates/restore permission.
   */
  post(
    options: RestoreCertificateParameters
  ): StreamableMethod<RestoreCertificate200Response | RestoreCertificateDefaultResponse>;
}

export interface GetDeletedCertificates {
  /**
   * The GetDeletedCertificates operation retrieves the certificates in the current
   * vault which are in a deleted state and ready for recovery or purging. This
   * operation includes deletion-specific information. This operation requires the
   * certificates/get/list permission. This operation can only be enabled on
   * soft-delete enabled vaults.
   */
  get(
    options?: GetDeletedCertificatesParameters
  ): StreamableMethod<GetDeletedCertificates200Response | GetDeletedCertificatesDefaultResponse>;
}

export interface GetDeletedCertificate {
  /**
   * The GetDeletedCertificate operation retrieves the deleted certificate
   * information plus its attributes, such as retention interval, scheduled
   * permanent deletion and the current deletion recovery level. This operation
   * requires the certificates/get permission.
   */
  get(
    options?: GetDeletedCertificateParameters
  ): StreamableMethod<GetDeletedCertificate200Response | GetDeletedCertificateDefaultResponse>;
  /**
   * The PurgeDeletedCertificate operation performs an irreversible deletion of the
   * specified certificate, without possibility for recovery. The operation is not
   * available if the recovery level does not specify 'Purgeable'. This operation
   * requires the certificate/purge permission.
   */
  delete(
    options?: PurgeDeletedCertificateParameters
  ): StreamableMethod<PurgeDeletedCertificate204Response | PurgeDeletedCertificateDefaultResponse>;
}

export interface RecoverDeletedCertificate {
  /**
   * The RecoverDeletedCertificate operation performs the reversal of the Delete
   * operation. The operation is applicable in vaults enabled for soft-delete, and
   * must be issued during the retention interval (available in the deleted
   * certificate's attributes). This operation requires the certificates/recover
   * permission.
   */
  post(
    options?: RecoverDeletedCertificateParameters
  ): StreamableMethod<
    RecoverDeletedCertificate200Response | RecoverDeletedCertificateDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/certificates' has methods for the following verbs: get */
  (path: "/certificates"): GetCertificates;
  /** Resource for '/certificates/\{certificateName\}' has methods for the following verbs: delete */
  (path: "/certificates/{certificateName}", certificateName: string): DeleteCertificate;
  /** Resource for '/certificates/contacts' has methods for the following verbs: put, get, delete */
  (path: "/certificates/contacts"): SetCertificateContacts;
  /** Resource for '/certificates/issuers' has methods for the following verbs: get */
  (path: "/certificates/issuers"): GetCertificateIssuers;
  /** Resource for '/certificates/issuers/\{issuerName\}' has methods for the following verbs: put, patch, get, delete */
  (path: "/certificates/issuers/{issuerName}", issuerName: string): SetCertificateIssuer;
  /** Resource for '/certificates/\{certificateName\}/create' has methods for the following verbs: post */
  (path: "/certificates/{certificateName}/create", certificateName: string): CreateCertificate;
  /** Resource for '/certificates/\{certificateName\}/import' has methods for the following verbs: post */
  (path: "/certificates/{certificateName}/import", certificateName: string): ImportCertificate;
  /** Resource for '/certificates/\{certificateName\}/versions' has methods for the following verbs: get */
  (
    path: "/certificates/{certificateName}/versions",
    certificateName: string
  ): GetCertificateVersions;
  /** Resource for '/certificates/\{certificateName\}/policy' has methods for the following verbs: get, patch */
  (path: "/certificates/{certificateName}/policy", certificateName: string): GetCertificatePolicy;
  /** Resource for '/certificates/\{certificateName\}/\{certificateVersion\}' has methods for the following verbs: patch, get */
  (
    path: "/certificates/{certificateName}/{certificateVersion}",
    certificateName: string,
    certificateVersion: string
  ): UpdateCertificate;
  /** Resource for '/certificates/\{certificateName\}/pending' has methods for the following verbs: patch, get, delete */
  (
    path: "/certificates/{certificateName}/pending",
    certificateName: string
  ): UpdateCertificateOperation;
  /** Resource for '/certificates/\{certificateName\}/pending/merge' has methods for the following verbs: post */
  (
    path: "/certificates/{certificateName}/pending/merge",
    certificateName: string
  ): MergeCertificate;
  /** Resource for '/certificates/\{certificateName\}/backup' has methods for the following verbs: post */
  (path: "/certificates/{certificateName}/backup", certificateName: string): BackupCertificate;
  /** Resource for '/certificates/restore' has methods for the following verbs: post */
  (path: "/certificates/restore"): RestoreCertificate;
  /** Resource for '/deletedcertificates' has methods for the following verbs: get */
  (path: "/deletedcertificates"): GetDeletedCertificates;
  /** Resource for '/deletedcertificates/\{certificateName\}' has methods for the following verbs: get, delete */
  (path: "/deletedcertificates/{certificateName}", certificateName: string): GetDeletedCertificate;
  /** Resource for '/deletedcertificates/\{certificateName\}/recover' has methods for the following verbs: post */
  (
    path: "/deletedcertificates/{certificateName}/recover",
    certificateName: string
  ): RecoverDeletedCertificate;
}

export type KeyVaultContext = Client & {
  path: Routes;
};
