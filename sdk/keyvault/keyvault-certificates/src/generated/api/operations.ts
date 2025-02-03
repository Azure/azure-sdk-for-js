// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BackupCertificateOptionalParams,
  KeyVaultContext as Client,
  CreateCertificateOptionalParams,
  DeleteCertificateContactsOptionalParams,
  DeleteCertificateIssuerOptionalParams,
  DeleteCertificateOperationOptionalParams,
  DeleteCertificateOptionalParams,
  GetCertificateContactsOptionalParams,
  GetCertificateIssuerOptionalParams,
  GetCertificateIssuersOptionalParams,
  GetCertificateOperationOptionalParams,
  GetCertificateOptionalParams,
  GetCertificatePolicyOptionalParams,
  GetCertificatesOptionalParams,
  GetCertificateVersionsOptionalParams,
  GetDeletedCertificateOptionalParams,
  GetDeletedCertificatesOptionalParams,
  ImportCertificateOptionalParams,
  MergeCertificateOptionalParams,
  PurgeDeletedCertificateOptionalParams,
  RecoverDeletedCertificateOptionalParams,
  RestoreCertificateOptionalParams,
  SetCertificateContactsOptionalParams,
  SetCertificateIssuerOptionalParams,
  UpdateCertificateIssuerOptionalParams,
  UpdateCertificateOperationOptionalParams,
  UpdateCertificateOptionalParams,
  UpdateCertificatePolicyOptionalParams,
} from "./index.js";
import {
  _CertificateListResult,
  _certificateListResultDeserializer,
  CertificateItem,
  DeletedCertificateBundle,
  deletedCertificateBundleDeserializer,
  CertificatePolicy,
  certificatePolicySerializer,
  certificatePolicyDeserializer,
  Contacts,
  contactsSerializer,
  contactsDeserializer,
  _CertificateIssuerListResult,
  _certificateIssuerListResultDeserializer,
  CertificateIssuerItem,
  CertificateIssuerSetParameters,
  certificateIssuerSetParametersSerializer,
  IssuerBundle,
  issuerBundleDeserializer,
  CertificateIssuerUpdateParameters,
  certificateIssuerUpdateParametersSerializer,
  CertificateCreateParameters,
  certificateCreateParametersSerializer,
  CertificateOperation,
  certificateOperationDeserializer,
  CertificateImportParameters,
  certificateImportParametersSerializer,
  CertificateBundle,
  certificateBundleDeserializer,
  CertificateUpdateParameters,
  certificateUpdateParametersSerializer,
  CertificateOperationUpdateParameter,
  certificateOperationUpdateParameterSerializer,
  CertificateMergeParameters,
  certificateMergeParametersSerializer,
  BackupCertificateResult,
  backupCertificateResultDeserializer,
  CertificateRestoreParameters,
  certificateRestoreParametersSerializer,
  _DeletedCertificateListResult,
  _deletedCertificateListResultDeserializer,
  DeletedCertificateItem,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getCertificatesSend(
  context: Client,
  options: GetCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        maxresults: options?.maxresults,
        includePending: options?.includePending,
      },
    });
}

export async function _getCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _certificateListResultDeserializer(result.body);
}

/** The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission. */
export function getCertificates(
  context: Client,
  options: GetCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificatesSend(context, options),
    _getCertificatesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteCertificateSend(
  context: Client,
  certificateName: string,
  options: DeleteCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedCertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deletedCertificateBundleDeserializer(result.body);
}

/** Deletes all versions of a certificate object along with its associated policy. Delete certificate cannot be used to remove individual versions of a certificate object. This operation requires the certificates/delete permission. */
export async function deleteCertificate(
  context: Client,
  certificateName: string,
  options: DeleteCertificateOptionalParams = { requestOptions: {} },
): Promise<DeletedCertificateBundle> {
  const result = await _deleteCertificateSend(
    context,
    certificateName,
    options,
  );
  return _deleteCertificateDeserialize(result);
}

export function _setCertificateContactsSend(
  context: Client,
  contacts: Contacts,
  options: SetCertificateContactsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/contacts")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: contactsSerializer(contacts),
    });
}

export async function _setCertificateContactsDeserialize(
  result: PathUncheckedResponse,
): Promise<Contacts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contactsDeserializer(result.body);
}

/** Sets the certificate contacts for the specified key vault. This operation requires the certificates/managecontacts permission. */
export async function setCertificateContacts(
  context: Client,
  contacts: Contacts,
  options: SetCertificateContactsOptionalParams = { requestOptions: {} },
): Promise<Contacts> {
  const result = await _setCertificateContactsSend(context, contacts, options);
  return _setCertificateContactsDeserialize(result);
}

export function _getCertificateContactsSend(
  context: Client,
  options: GetCertificateContactsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/contacts")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateContactsDeserialize(
  result: PathUncheckedResponse,
): Promise<Contacts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contactsDeserializer(result.body);
}

/** The GetCertificateContacts operation returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission. */
export async function getCertificateContacts(
  context: Client,
  options: GetCertificateContactsOptionalParams = { requestOptions: {} },
): Promise<Contacts> {
  const result = await _getCertificateContactsSend(context, options);
  return _getCertificateContactsDeserialize(result);
}

export function _deleteCertificateContactsSend(
  context: Client,
  options: DeleteCertificateContactsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/contacts")
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateContactsDeserialize(
  result: PathUncheckedResponse,
): Promise<Contacts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contactsDeserializer(result.body);
}

/** Deletes the certificate contacts for a specified key vault certificate. This operation requires the certificates/managecontacts permission. */
export async function deleteCertificateContacts(
  context: Client,
  options: DeleteCertificateContactsOptionalParams = { requestOptions: {} },
): Promise<Contacts> {
  const result = await _deleteCertificateContactsSend(context, options);
  return _deleteCertificateContactsDeserialize(result);
}

export function _getCertificateIssuersSend(
  context: Client,
  options: GetCertificateIssuersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/issuers")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getCertificateIssuersDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateIssuerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _certificateIssuerListResultDeserializer(result.body);
}

/** The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export function getCertificateIssuers(
  context: Client,
  options: GetCertificateIssuersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateIssuerItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificateIssuersSend(context, options),
    _getCertificateIssuersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _setCertificateIssuerSend(
  context: Client,
  issuerName: string,
  parameter: CertificateIssuerSetParameters,
  options: SetCertificateIssuerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/issuers/{issuer-name}", issuerName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: certificateIssuerSetParametersSerializer(parameter),
    });
}

export async function _setCertificateIssuerDeserialize(
  result: PathUncheckedResponse,
): Promise<IssuerBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return issuerBundleDeserializer(result.body);
}

/** The SetCertificateIssuer operation adds or updates the specified certificate issuer. This operation requires the certificates/setissuers permission. */
export async function setCertificateIssuer(
  context: Client,
  issuerName: string,
  parameter: CertificateIssuerSetParameters,
  options: SetCertificateIssuerOptionalParams = { requestOptions: {} },
): Promise<IssuerBundle> {
  const result = await _setCertificateIssuerSend(
    context,
    issuerName,
    parameter,
    options,
  );
  return _setCertificateIssuerDeserialize(result);
}

export function _updateCertificateIssuerSend(
  context: Client,
  issuerName: string,
  parameter: CertificateIssuerUpdateParameters,
  options: UpdateCertificateIssuerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/issuers/{issuer-name}", issuerName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: certificateIssuerUpdateParametersSerializer(parameter),
    });
}

export async function _updateCertificateIssuerDeserialize(
  result: PathUncheckedResponse,
): Promise<IssuerBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return issuerBundleDeserializer(result.body);
}

/** The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission. */
export async function updateCertificateIssuer(
  context: Client,
  issuerName: string,
  parameter: CertificateIssuerUpdateParameters,
  options: UpdateCertificateIssuerOptionalParams = { requestOptions: {} },
): Promise<IssuerBundle> {
  const result = await _updateCertificateIssuerSend(
    context,
    issuerName,
    parameter,
    options,
  );
  return _updateCertificateIssuerDeserialize(result);
}

export function _getCertificateIssuerSend(
  context: Client,
  issuerName: string,
  options: GetCertificateIssuerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/issuers/{issuer-name}", issuerName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateIssuerDeserialize(
  result: PathUncheckedResponse,
): Promise<IssuerBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return issuerBundleDeserializer(result.body);
}

/** The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission. */
export async function getCertificateIssuer(
  context: Client,
  issuerName: string,
  options: GetCertificateIssuerOptionalParams = { requestOptions: {} },
): Promise<IssuerBundle> {
  const result = await _getCertificateIssuerSend(context, issuerName, options);
  return _getCertificateIssuerDeserialize(result);
}

export function _deleteCertificateIssuerSend(
  context: Client,
  issuerName: string,
  options: DeleteCertificateIssuerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/issuers/{issuer-name}", issuerName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateIssuerDeserialize(
  result: PathUncheckedResponse,
): Promise<IssuerBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return issuerBundleDeserializer(result.body);
}

/** The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from the vault. This operation requires the certificates/manageissuers/deleteissuers permission. */
export async function deleteCertificateIssuer(
  context: Client,
  issuerName: string,
  options: DeleteCertificateIssuerOptionalParams = { requestOptions: {} },
): Promise<IssuerBundle> {
  const result = await _deleteCertificateIssuerSend(
    context,
    issuerName,
    options,
  );
  return _deleteCertificateIssuerDeserialize(result);
}

export function _createCertificateSend(
  context: Client,
  certificateName: string,
  parameters: CertificateCreateParameters,
  options: CreateCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/create", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: certificateCreateParametersSerializer(parameters),
    });
}

export async function _createCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateOperation> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateOperationDeserializer(result.body);
}

/** If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. */
export async function createCertificate(
  context: Client,
  certificateName: string,
  parameters: CertificateCreateParameters,
  options: CreateCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateOperation> {
  const result = await _createCertificateSend(
    context,
    certificateName,
    parameters,
    options,
  );
  return _createCertificateDeserialize(result);
}

export function _importCertificateSend(
  context: Client,
  certificateName: string,
  parameters: CertificateImportParameters,
  options: ImportCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/import", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: certificateImportParametersSerializer(parameters),
    });
}

export async function _importCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** Imports an existing valid certificate, containing a private key, into Azure Key Vault. This operation requires the certificates/import permission. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. Key Vault will only accept a key in PKCS#8 format. */
export async function importCertificate(
  context: Client,
  certificateName: string,
  parameters: CertificateImportParameters,
  options: ImportCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _importCertificateSend(
    context,
    certificateName,
    parameters,
    options,
  );
  return _importCertificateDeserialize(result);
}

export function _getCertificateVersionsSend(
  context: Client,
  certificateName: string,
  options: GetCertificateVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/versions", certificateName)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getCertificateVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _certificateListResultDeserializer(result.body);
}

/** The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission. */
export function getCertificateVersions(
  context: Client,
  certificateName: string,
  options: GetCertificateVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificateVersionsSend(context, certificateName, options),
    _getCertificateVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getCertificatePolicySend(
  context: Client,
  certificateName: string,
  options: GetCertificatePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/policy", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificatePolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificatePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificatePolicyDeserializer(result.body);
}

/** The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission. */
export async function getCertificatePolicy(
  context: Client,
  certificateName: string,
  options: GetCertificatePolicyOptionalParams = { requestOptions: {} },
): Promise<CertificatePolicy> {
  const result = await _getCertificatePolicySend(
    context,
    certificateName,
    options,
  );
  return _getCertificatePolicyDeserialize(result);
}

export function _updateCertificatePolicySend(
  context: Client,
  certificateName: string,
  certificatePolicy: CertificatePolicy,
  options: UpdateCertificatePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/policy", certificateName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: certificatePolicySerializer(certificatePolicy),
    });
}

export async function _updateCertificatePolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificatePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificatePolicyDeserializer(result.body);
}

/** Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission. */
export async function updateCertificatePolicy(
  context: Client,
  certificateName: string,
  certificatePolicy: CertificatePolicy,
  options: UpdateCertificatePolicyOptionalParams = { requestOptions: {} },
): Promise<CertificatePolicy> {
  const result = await _updateCertificatePolicySend(
    context,
    certificateName,
    certificatePolicy,
    options,
  );
  return _updateCertificatePolicyDeserialize(result);
}

export function _updateCertificateSend(
  context: Client,
  certificateName: string,
  certificateVersion: string,
  parameters: CertificateUpdateParameters,
  options: UpdateCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/certificates/{certificate-name}/{certificate-version}",
      certificateName,
      certificateVersion,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: certificateUpdateParametersSerializer(parameters),
    });
}

export async function _updateCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** The UpdateCertificate operation applies the specified update on the given certificate; the only elements updated are the certificate's attributes. This operation requires the certificates/update permission. */
export async function updateCertificate(
  context: Client,
  certificateName: string,
  certificateVersion: string,
  parameters: CertificateUpdateParameters,
  options: UpdateCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _updateCertificateSend(
    context,
    certificateName,
    certificateVersion,
    parameters,
    options,
  );
  return _updateCertificateDeserialize(result);
}

export function _getCertificateSend(
  context: Client,
  certificateName: string,
  certificateVersion: string,
  options: GetCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/certificates/{certificate-name}/{certificate-version}",
      certificateName,
      certificateVersion,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** Gets information about a specific certificate. This operation requires the certificates/get permission. */
export async function getCertificate(
  context: Client,
  certificateName: string,
  certificateVersion: string,
  options: GetCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _getCertificateSend(
    context,
    certificateName,
    certificateVersion,
    options,
  );
  return _getCertificateDeserialize(result);
}

export function _updateCertificateOperationSend(
  context: Client,
  certificateName: string,
  certificateOperation: CertificateOperationUpdateParameter,
  options: UpdateCertificateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/pending", certificateName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: certificateOperationUpdateParameterSerializer(certificateOperation),
    });
}

export async function _updateCertificateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateOperationDeserializer(result.body);
}

/** Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission. */
export async function updateCertificateOperation(
  context: Client,
  certificateName: string,
  certificateOperation: CertificateOperationUpdateParameter,
  options: UpdateCertificateOperationOptionalParams = { requestOptions: {} },
): Promise<CertificateOperation> {
  const result = await _updateCertificateOperationSend(
    context,
    certificateName,
    certificateOperation,
    options,
  );
  return _updateCertificateOperationDeserialize(result);
}

export function _getCertificateOperationSend(
  context: Client,
  certificateName: string,
  options: GetCertificateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/pending", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateOperationDeserializer(result.body);
}

/** Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission. */
export async function getCertificateOperation(
  context: Client,
  certificateName: string,
  options: GetCertificateOperationOptionalParams = { requestOptions: {} },
): Promise<CertificateOperation> {
  const result = await _getCertificateOperationSend(
    context,
    certificateName,
    options,
  );
  return _getCertificateOperationDeserialize(result);
}

export function _deleteCertificateOperationSend(
  context: Client,
  certificateName: string,
  options: DeleteCertificateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/pending", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateOperationDeserializer(result.body);
}

/** Deletes the creation operation for a specified certificate that is in the process of being created. The certificate is no longer created. This operation requires the certificates/update permission. */
export async function deleteCertificateOperation(
  context: Client,
  certificateName: string,
  options: DeleteCertificateOperationOptionalParams = { requestOptions: {} },
): Promise<CertificateOperation> {
  const result = await _deleteCertificateOperationSend(
    context,
    certificateName,
    options,
  );
  return _deleteCertificateOperationDeserialize(result);
}

export function _mergeCertificateSend(
  context: Client,
  certificateName: string,
  parameters: CertificateMergeParameters,
  options: MergeCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/pending/merge", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: certificateMergeParametersSerializer(parameters),
    });
}

export async function _mergeCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** The MergeCertificate operation performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission. */
export async function mergeCertificate(
  context: Client,
  certificateName: string,
  parameters: CertificateMergeParameters,
  options: MergeCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _mergeCertificateSend(
    context,
    certificateName,
    parameters,
    options,
  );
  return _mergeCertificateDeserialize(result);
}

export function _backupCertificateSend(
  context: Client,
  certificateName: string,
  options: BackupCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/{certificate-name}/backup", certificateName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _backupCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupCertificateResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return backupCertificateResultDeserializer(result.body);
}

/** Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded. This operation requires the certificates/backup permission. */
export async function backupCertificate(
  context: Client,
  certificateName: string,
  options: BackupCertificateOptionalParams = { requestOptions: {} },
): Promise<BackupCertificateResult> {
  const result = await _backupCertificateSend(
    context,
    certificateName,
    options,
  );
  return _backupCertificateDeserialize(result);
}

export function _restoreCertificateSend(
  context: Client,
  parameters: CertificateRestoreParameters,
  options: RestoreCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/certificates/restore")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: certificateRestoreParametersSerializer(parameters),
    });
}

export async function _restoreCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission. */
export async function restoreCertificate(
  context: Client,
  parameters: CertificateRestoreParameters,
  options: RestoreCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _restoreCertificateSend(context, parameters, options);
  return _restoreCertificateDeserialize(result);
}

export function _getDeletedCertificatesSend(
  context: Client,
  options: GetDeletedCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedcertificates")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        maxresults: options?.maxresults,
        includePending: options?.includePending,
      },
    });
}

export async function _getDeletedCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedCertificateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deletedCertificateListResultDeserializer(result.body);
}

/** The GetDeletedCertificates operation retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults. */
export function getDeletedCertificates(
  context: Client,
  options: GetDeletedCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedCertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getDeletedCertificatesSend(context, options),
    _getDeletedCertificatesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDeletedCertificateSend(
  context: Client,
  certificateName: string,
  options: GetDeletedCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedcertificates/{certificate-name}", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeletedCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedCertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deletedCertificateBundleDeserializer(result.body);
}

/** The GetDeletedCertificate operation retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the current deletion recovery level. This operation requires the certificates/get permission. */
export async function getDeletedCertificate(
  context: Client,
  certificateName: string,
  options: GetDeletedCertificateOptionalParams = { requestOptions: {} },
): Promise<DeletedCertificateBundle> {
  const result = await _getDeletedCertificateSend(
    context,
    certificateName,
    options,
  );
  return _getDeletedCertificateDeserialize(result);
}

export function _purgeDeletedCertificateSend(
  context: Client,
  certificateName: string,
  options: PurgeDeletedCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedcertificates/{certificate-name}", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The PurgeDeletedCertificate operation performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission. */
export async function purgeDeletedCertificate(
  context: Client,
  certificateName: string,
  options: PurgeDeletedCertificateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _purgeDeletedCertificateSend(
    context,
    certificateName,
    options,
  );
  return _purgeDeletedCertificateDeserialize(result);
}

export function _recoverDeletedCertificateSend(
  context: Client,
  certificateName: string,
  options: RecoverDeletedCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedcertificates/{certificate-name}/recover", certificateName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverDeletedCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return certificateBundleDeserializer(result.body);
}

/** The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The operation is applicable in vaults enabled for soft-delete, and must be issued during the retention interval (available in the deleted certificate's attributes). This operation requires the certificates/recover permission. */
export async function recoverDeletedCertificate(
  context: Client,
  certificateName: string,
  options: RecoverDeletedCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateBundle> {
  const result = await _recoverDeletedCertificateSend(
    context,
    certificateName,
    options,
  );
  return _recoverDeletedCertificateDeserialize(result);
}
