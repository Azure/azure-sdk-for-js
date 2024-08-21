// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createKeyVault, KeyVaultClientOptions, KeyVaultContext } from "./keyVaultContext";
export {
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
} from "./operations";
