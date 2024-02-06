// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { uint8ArrayToString } from "@azure/core-util";
import {
  ArrayOneOrMore,
  CertificateContentType,
  CertificateOperation,
  CertificateIssuer,
  CertificatePolicy,
  CertificateProperties,
  DeletedCertificate,
  KeyVaultCertificate,
  KeyVaultCertificateWithPolicy,
  SubjectAlternativeNames,
  CertificateContact,
  CertificateOperationError,
} from "./certificatesModels";
import {
  CertificateAttributes,
  CertificateBundle,
  CertificatePolicy as CoreCertificatePolicy,
  DeletedCertificateBundle,
  DeletedCertificateItem,
  IssuerAttributes,
  IssuerBundle,
  SubjectAlternativeNames as CoreSubjectAlternativeNames,
  X509CertificateProperties,
  CertificateOperation as CoreCertificateOperation,
  Contacts as CoreContacts,
  JsonWebKeyType as CertificateKeyType,
  ErrorModel,
} from "./generated/models";
import { parseKeyVaultCertificateIdentifier } from "./identifier";

export function toCoreAttributes(properties: CertificateProperties): CertificateAttributes {
  return {
    recoveryLevel: properties.recoveryLevel,
    enabled: properties.enabled,
    notBefore: properties.notBefore,
    expires: properties.expiresOn,
    created: properties.createdOn,
    updated: properties.updatedOn,
  };
}

export function toCorePolicy(
  id: string | undefined,
  policy: CertificatePolicy,
  attributes: CertificateAttributes = {}
): CoreCertificatePolicy {
  let subjectAlternativeNames: CoreSubjectAlternativeNames = {};
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

export function toPublicPolicy(policy: CoreCertificatePolicy = {}): CertificatePolicy {
  let subjectAlternativeNames: SubjectAlternativeNames | undefined;
  const x509Properties: X509CertificateProperties = policy.x509CertificateProperties || {};

  if (policy.x509CertificateProperties) {
    if (x509Properties.subjectAlternativeNames) {
      const names = x509Properties.subjectAlternativeNames;
      if (names.emails && names.emails.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          emails: names.emails as ArrayOneOrMore<string>,
        };
      }
      if (names.dnsNames && names.dnsNames.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          dnsNames: names.dnsNames as ArrayOneOrMore<string>,
        };
      }
      if (names.upns && names.upns.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          userPrincipalNames: names.upns as ArrayOneOrMore<string>,
        };
      }
    }
  }

  const certificatePolicy: CertificatePolicy = {
    lifetimeActions: policy.lifetimeActions
      ? policy.lifetimeActions.map((action) => ({
          action: action.action ? action.action.actionType : undefined,
          daysBeforeExpiry: action.trigger ? action.trigger.daysBeforeExpiry : undefined,
          lifetimePercentage: action.trigger ? action.trigger.lifetimePercentage : undefined,
        }))
      : undefined,
    contentType: policy.secretProperties
      ? (policy.secretProperties.contentType as CertificateContentType)
      : undefined,
    enhancedKeyUsage: x509Properties.ekus,
    keyUsage: x509Properties.keyUsage,
    validityInMonths: x509Properties.validityInMonths,
    subject: x509Properties.subject,
    subjectAlternativeNames: subjectAlternativeNames!,
  };

  if (policy.attributes) {
    certificatePolicy.enabled = policy.attributes.enabled;
  }

  if (policy.keyProperties) {
    certificatePolicy.keyType = policy.keyProperties.keyType as CertificateKeyType;
    certificatePolicy.keySize = policy.keyProperties.keySize;
    certificatePolicy.reuseKey = policy.keyProperties.reuseKey;
    certificatePolicy.keyCurveName = policy.keyProperties.curve;
    certificatePolicy.exportable = policy.keyProperties.exportable;
  }

  if (policy.issuerParameters) {
    certificatePolicy.issuerName = policy.issuerParameters && policy.issuerParameters.name;
    certificatePolicy.certificateType = policy.issuerParameters
      .certificateType as CertificateContentType;
    certificatePolicy.certificateTransparency = policy.issuerParameters.certificateTransparency;
  }

  return certificatePolicy;
}

export function toPublicIssuer(issuer: IssuerBundle = {}): CertificateIssuer {
  const parsedId = parseKeyVaultCertificateIdentifier(issuer.id!);
  const attributes: IssuerAttributes = issuer.attributes || {};

  const publicIssuer: CertificateIssuer = {
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

export function getCertificateFromCertificateBundle(
  certificateBundle: CertificateBundle
): KeyVaultCertificate {
  const parsedId = parseKeyVaultCertificateIdentifier(certificateBundle.id!);

  const attributes: CertificateAttributes = certificateBundle.attributes || {};

  const abstractProperties: CertificateProperties = {
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
    x509ThumbprintString:
      certificateBundle.x509Thumbprint &&
      uint8ArrayToString(certificateBundle.x509Thumbprint, "hex"),
    recoverableDays: attributes.recoverableDays,
  };

  return {
    keyId: certificateBundle.kid,
    secretId: certificateBundle.sid,
    name: parsedId.name,
    cer: certificateBundle.cer,
    properties: abstractProperties,
  };
}

export function getCertificateWithPolicyFromCertificateBundle(
  certificateBundle: CertificateBundle
): KeyVaultCertificateWithPolicy {
  const parsedId = parseKeyVaultCertificateIdentifier(certificateBundle.id!);

  const attributes: CertificateAttributes = certificateBundle.attributes || {};
  const policy = toPublicPolicy(certificateBundle.policy || {});

  const abstractProperties: CertificateProperties = {
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
    x509ThumbprintString:
      certificateBundle.x509Thumbprint &&
      uint8ArrayToString(certificateBundle.x509Thumbprint, "hex"),
    recoverableDays: attributes.recoverableDays,
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

export function getDeletedCertificateFromDeletedCertificateBundle(
  certificateBundle: DeletedCertificateBundle
): DeletedCertificate {
  const certificate: KeyVaultCertificateWithPolicy =
    getCertificateWithPolicyFromCertificateBundle(certificateBundle);

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

export function getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate {
  const parsedId = parseKeyVaultCertificateIdentifier(item.id!);

  const attributes: any = item.attributes || {};

  const abstractProperties: CertificateProperties = {
    createdOn: attributes.created,
    updatedOn: attributes.updated,
    expiresOn: attributes.expires,

    vaultUrl: parsedId.vaultUrl,
    version: parsedId.version,
    name: parsedId.name,

    id: item.id,
    tags: item.tags,
    x509Thumbprint: item.x509Thumbprint,
    x509ThumbprintString: item.x509Thumbprint && uint8ArrayToString(item.x509Thumbprint, "hex"),

    recoverableDays: item.attributes?.recoverableDays,
    recoveryLevel: item.attributes?.recoveryLevel,
  };

  return {
    deletedOn: item.deletedDate,
    recoveryId: item.recoveryId,
    scheduledPurgeDate: item.scheduledPurgeDate,
    name: parsedId.name,
    properties: abstractProperties,
  };
}

function getCertificateOperationErrorFromErrorModel(
  error?: ErrorModel | null
): CertificateOperationError | undefined {
  if (error) {
    return {
      code: error.code,
      innerError: getCertificateOperationErrorFromErrorModel(error.innerError),
      message: error.message,
    };
  }
  return undefined;
}

export function getCertificateOperationFromCoreOperation(
  certificateName: string,
  vaultUrl: string,
  operation: CoreCertificateOperation
): CertificateOperation {
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
    vaultUrl: vaultUrl,
  };
}

export function coreContactsToCertificateContacts(contacts: CoreContacts): CertificateContact[] {
  return contacts.contactList
    ? contacts.contactList.map(
        (x) => ({ email: x.emailAddress, phone: x.phone, name: x.name } as CertificateContact)
      )
    : [];
}

export function getPropertiesFromCertificateBundle(
  certificateBundle: CertificateBundle
): CertificateProperties {
  const parsedId = parseKeyVaultCertificateIdentifier(certificateBundle.id!);
  const attributes: CertificateAttributes = certificateBundle.attributes || {};

  const abstractProperties: CertificateProperties = {
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
    x509ThumbprintString:
      certificateBundle.x509Thumbprint &&
      uint8ArrayToString(certificateBundle.x509Thumbprint, "hex"),
    recoverableDays: attributes.recoverableDays,
  };

  return abstractProperties;
}
