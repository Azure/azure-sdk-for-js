// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  certificateAttributesSerializer,
  certificatePolicySerializer,
  keyPropertiesSerializer,
  secretPropertiesSerializer,
  x509CertificatePropertiesSerializer,
  lifetimeActionSerializer,
  issuerParametersSerializer,
  contactSerializer,
  issuerCredentialsSerializer,
  organizationDetailsSerializer,
  issuerAttributesSerializer,
  CertificateItem,
  DeletionRecoveryLevel,
  DeletedCertificateBundle,
  CertificatePolicy,
  JsonWebKeyType,
  JsonWebKeyCurveName,
  ActionType,
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
  _CertificateListResult,
  _PagedCertificateIssuerItem,
  _PagedCertificateItem,
  _PagedDeletedCertificateItem,
  KeyUsageType,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "./pagingHelpers.js";
import {
  BackupCertificate200Response,
  BackupCertificateDefaultResponse,
  CreateCertificate202Response,
  CreateCertificateDefaultResponse,
  DeleteCertificate200Response,
  DeleteCertificateContacts200Response,
  DeleteCertificateContactsDefaultResponse,
  DeleteCertificateDefaultResponse,
  DeleteCertificateIssuer200Response,
  DeleteCertificateIssuerDefaultResponse,
  DeleteCertificateOperation200Response,
  DeleteCertificateOperationDefaultResponse,
  GetCertificate200Response,
  GetCertificateContacts200Response,
  GetCertificateContactsDefaultResponse,
  GetCertificateDefaultResponse,
  GetCertificateIssuer200Response,
  GetCertificateIssuerDefaultResponse,
  GetCertificateIssuers200Response,
  GetCertificateIssuersDefaultResponse,
  GetCertificateOperation200Response,
  GetCertificateOperationDefaultResponse,
  GetCertificatePolicy200Response,
  GetCertificatePolicyDefaultResponse,
  GetCertificates200Response,
  GetCertificatesDefaultResponse,
  GetCertificateVersions200Response,
  GetCertificateVersionsDefaultResponse,
  GetDeletedCertificate200Response,
  GetDeletedCertificateDefaultResponse,
  GetDeletedCertificates200Response,
  GetDeletedCertificatesDefaultResponse,
  ImportCertificate200Response,
  ImportCertificateDefaultResponse,
  isUnexpected,
  KeyVaultContext as Client,
  MergeCertificate201Response,
  MergeCertificateDefaultResponse,
  PurgeDeletedCertificate204Response,
  PurgeDeletedCertificateDefaultResponse,
  RecoverDeletedCertificate200Response,
  RecoverDeletedCertificateDefaultResponse,
  RestoreCertificate200Response,
  RestoreCertificateDefaultResponse,
  SetCertificateContacts200Response,
  SetCertificateContactsDefaultResponse,
  SetCertificateIssuer200Response,
  SetCertificateIssuerDefaultResponse,
  UpdateCertificate200Response,
  UpdateCertificateDefaultResponse,
  UpdateCertificateIssuer200Response,
  UpdateCertificateIssuerDefaultResponse,
  UpdateCertificateOperation200Response,
  UpdateCertificateOperationDefaultResponse,
  UpdateCertificatePolicy200Response,
  UpdateCertificatePolicyDefaultResponse,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import { serializeRecord } from "../helpers/serializerHelpers.js";
import {
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
} from "../models/options.js";

export function _getCertificatesSend(
  context: Client,
  options: GetCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod<
  GetCertificates200Response | GetCertificatesDefaultResponse
> {
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
  result: GetCertificates200Response | GetCertificatesDefaultResponse,
): Promise<_PagedCertificateItem> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      attributes: !p.attributes
        ? undefined
        : {
          enabled: p.attributes?.["enabled"],
          notBefore:
            p.attributes?.["nbf"] !== undefined
              ? new Date(p.attributes?.["nbf"])
              : undefined,
          expires:
            p.attributes?.["expires"] !== undefined
              ? new Date(p.attributes?.["expires"])
              : undefined,
          created:
            p.attributes?.["created"] !== undefined
              ? new Date(p.attributes?.["created"])
              : undefined,
          updated:
            p.attributes?.["updated"] !== undefined
              ? new Date(p.attributes?.["updated"])
              : undefined,
          recoverableDays: p.attributes?.["recoverableDays"],
          recoveryLevel: p.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
      tags: p["tags"],
      x509Thumbprint:
        typeof p["x5t"] === "string"
          ? stringToUint8Array(p["x5t"], "base64")
          : p["x5t"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The GetCertificates operation returns the set of certificates resources in the
 * specified key vault. This operation requires the certificates/list permission.
 */
export function getCertificates(
  context: Client,
  options: GetCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificatesSend(context, options),
    _getCertificatesDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteCertificateSend(
  context: Client,
  certificateName: string,
  options: DeleteCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  DeleteCertificate200Response | DeleteCertificateDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateDeserialize(
  result: DeleteCertificate200Response | DeleteCertificateDefaultResponse,
): Promise<DeletedCertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as KeyUsageType[],
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
    recoveryId: result.body["recoveryId"],
    scheduledPurgeDate:
      result.body["scheduledPurgeDate"] !== undefined
        ? new Date(result.body["scheduledPurgeDate"])
        : undefined,
    deletedDate:
      result.body["deletedDate"] !== undefined
        ? new Date(result.body["deletedDate"])
        : undefined,
  };
}

/**
 * Deletes all versions of a certificate object along with its associated policy.
 * Delete certificate cannot be used to remove individual versions of a
 * certificate object. This operation requires the certificates/delete permission.
 */
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
): StreamableMethod<
  SetCertificateContacts200Response | SetCertificateContactsDefaultResponse
> {
  return context
    .path("/certificates/contacts")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        contacts:
          contacts["contactList"] === undefined
            ? contacts["contactList"]
            : contacts["contactList"].map(contactSerializer),
      },
    });
}

export async function _setCertificateContactsDeserialize(
  result:
    | SetCertificateContacts200Response
    | SetCertificateContactsDefaultResponse,
): Promise<Contacts> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    contactList:
      result.body["contacts"] === undefined
        ? result.body["contacts"]
        : result.body["contacts"].map((p) => ({
          emailAddress: p["email"],
          name: p["name"],
          phone: p["phone"],
        })),
  };
}

/**
 * Sets the certificate contacts for the specified key vault. This operation
 * requires the certificates/managecontacts permission.
 */
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
): StreamableMethod<
  GetCertificateContacts200Response | GetCertificateContactsDefaultResponse
> {
  return context
    .path("/certificates/contacts")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateContactsDeserialize(
  result:
    | GetCertificateContacts200Response
    | GetCertificateContactsDefaultResponse,
): Promise<Contacts> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    contactList:
      result.body["contacts"] === undefined
        ? result.body["contacts"]
        : result.body["contacts"].map((p) => ({
          emailAddress: p["email"],
          name: p["name"],
          phone: p["phone"],
        })),
  };
}

/**
 * The GetCertificateContacts operation returns the set of certificate contact
 * resources in the specified key vault. This operation requires the
 * certificates/managecontacts permission.
 */
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
): StreamableMethod<
  | DeleteCertificateContacts200Response
  | DeleteCertificateContactsDefaultResponse
> {
  return context
    .path("/certificates/contacts")
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateContactsDeserialize(
  result:
    | DeleteCertificateContacts200Response
    | DeleteCertificateContactsDefaultResponse,
): Promise<Contacts> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    contactList:
      result.body["contacts"] === undefined
        ? result.body["contacts"]
        : result.body["contacts"].map((p) => ({
          emailAddress: p["email"],
          name: p["name"],
          phone: p["phone"],
        })),
  };
}

/**
 * Deletes the certificate contacts for a specified key vault certificate. This
 * operation requires the certificates/managecontacts permission.
 */
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
): StreamableMethod<
  GetCertificateIssuers200Response | GetCertificateIssuersDefaultResponse
> {
  return context
    .path("/certificates/issuers")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getCertificateIssuersDeserialize(
  result:
    | GetCertificateIssuers200Response
    | GetCertificateIssuersDefaultResponse,
): Promise<_PagedCertificateIssuerItem> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      provider: p["provider"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The GetCertificateIssuers operation returns the set of certificate issuer
 * resources in the specified key vault. This operation requires the
 * certificates/manageissuers/getissuers permission.
 */
export function getCertificateIssuers(
  context: Client,
  options: GetCertificateIssuersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateIssuerItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificateIssuersSend(context, options),
    _getCertificateIssuersDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _setCertificateIssuerSend(
  context: Client,
  issuerName: string,
  parameter: CertificateIssuerSetParameters,
  options: SetCertificateIssuerOptionalParams = { requestOptions: {} },
): StreamableMethod<
  SetCertificateIssuer200Response | SetCertificateIssuerDefaultResponse
> {
  return context
    .path("/certificates/issuers/{issuerName}", issuerName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        provider: parameter["provider"],
        credentials: !parameter.credentials
          ? parameter.credentials
          : issuerCredentialsSerializer(parameter.credentials),
        org_details: !parameter.organizationDetails
          ? parameter.organizationDetails
          : organizationDetailsSerializer(parameter.organizationDetails),
        attributes: !parameter.attributes
          ? parameter.attributes
          : issuerAttributesSerializer(parameter.attributes),
      },
    });
}

export async function _setCertificateIssuerDeserialize(
  result: SetCertificateIssuer200Response | SetCertificateIssuerDefaultResponse,
): Promise<IssuerBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    provider: result.body["provider"],
    credentials: !result.body.credentials
      ? undefined
      : {
        accountId: result.body.credentials?.["account_id"],
        password: result.body.credentials?.["pwd"],
      },
    organizationDetails: !result.body.org_details
      ? undefined
      : {
        id: result.body.org_details?.["id"],
        adminDetails:
          result.body.org_details?.["admin_details"] === undefined
            ? result.body.org_details?.["admin_details"]
            : result.body.org_details?.["admin_details"].map((p) => ({
              firstName: p["first_name"],
              lastName: p["last_name"],
              emailAddress: p["email"],
              phone: p["phone"],
            })),
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
      },
  };
}

/**
 * The SetCertificateIssuer operation adds or updates the specified certificate
 * issuer. This operation requires the certificates/setissuers permission.
 */
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
): StreamableMethod<
  UpdateCertificateIssuer200Response | UpdateCertificateIssuerDefaultResponse
> {
  return context
    .path("/certificates/issuers/{issuerName}", issuerName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        provider: parameter["provider"],
        credentials: !parameter.credentials
          ? parameter.credentials
          : issuerCredentialsSerializer(parameter.credentials),
        org_details: !parameter.organizationDetails
          ? parameter.organizationDetails
          : organizationDetailsSerializer(parameter.organizationDetails),
        attributes: !parameter.attributes
          ? parameter.attributes
          : issuerAttributesSerializer(parameter.attributes),
      },
    });
}

export async function _updateCertificateIssuerDeserialize(
  result:
    | UpdateCertificateIssuer200Response
    | UpdateCertificateIssuerDefaultResponse,
): Promise<IssuerBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    provider: result.body["provider"],
    credentials: !result.body.credentials
      ? undefined
      : {
        accountId: result.body.credentials?.["account_id"],
        password: result.body.credentials?.["pwd"],
      },
    organizationDetails: !result.body.org_details
      ? undefined
      : {
        id: result.body.org_details?.["id"],
        adminDetails:
          result.body.org_details?.["admin_details"] === undefined
            ? result.body.org_details?.["admin_details"]
            : result.body.org_details?.["admin_details"].map((p) => ({
              firstName: p["first_name"],
              lastName: p["last_name"],
              emailAddress: p["email"],
              phone: p["phone"],
            })),
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
      },
  };
}

/**
 * The UpdateCertificateIssuer operation performs an update on the specified
 * certificate issuer entity. This operation requires the certificates/setissuers
 * permission.
 */
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
): StreamableMethod<
  GetCertificateIssuer200Response | GetCertificateIssuerDefaultResponse
> {
  return context
    .path("/certificates/issuers/{issuerName}", issuerName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateIssuerDeserialize(
  result: GetCertificateIssuer200Response | GetCertificateIssuerDefaultResponse,
): Promise<IssuerBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    provider: result.body["provider"],
    credentials: !result.body.credentials
      ? undefined
      : {
        accountId: result.body.credentials?.["account_id"],
        password: result.body.credentials?.["pwd"],
      },
    organizationDetails: !result.body.org_details
      ? undefined
      : {
        id: result.body.org_details?.["id"],
        adminDetails:
          result.body.org_details?.["admin_details"] === undefined
            ? result.body.org_details?.["admin_details"]
            : result.body.org_details?.["admin_details"].map((p) => ({
              firstName: p["first_name"],
              lastName: p["last_name"],
              emailAddress: p["email"],
              phone: p["phone"],
            })),
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
      },
  };
}

/**
 * The GetCertificateIssuer operation returns the specified certificate issuer
 * resources in the specified key vault. This operation requires the
 * certificates/manageissuers/getissuers permission.
 */
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
): StreamableMethod<
  DeleteCertificateIssuer200Response | DeleteCertificateIssuerDefaultResponse
> {
  return context
    .path("/certificates/issuers/{issuerName}", issuerName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateIssuerDeserialize(
  result:
    | DeleteCertificateIssuer200Response
    | DeleteCertificateIssuerDefaultResponse,
): Promise<IssuerBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    provider: result.body["provider"],
    credentials: !result.body.credentials
      ? undefined
      : {
        accountId: result.body.credentials?.["account_id"],
        password: result.body.credentials?.["pwd"],
      },
    organizationDetails: !result.body.org_details
      ? undefined
      : {
        id: result.body.org_details?.["id"],
        adminDetails:
          result.body.org_details?.["admin_details"] === undefined
            ? result.body.org_details?.["admin_details"]
            : result.body.org_details?.["admin_details"].map((p) => ({
              firstName: p["first_name"],
              lastName: p["last_name"],
              emailAddress: p["email"],
              phone: p["phone"],
            })),
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
      },
  };
}

/**
 * The DeleteCertificateIssuer operation permanently removes the specified
 * certificate issuer from the vault. This operation requires the
 * certificates/manageissuers/deleteissuers permission.
 */
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
): StreamableMethod<
  CreateCertificate202Response | CreateCertificateDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/create", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        policy: !parameters.certificatePolicy
          ? parameters.certificatePolicy
          : certificatePolicySerializer(parameters.certificatePolicy),
        attributes: !parameters.certificateAttributes
          ? parameters.certificateAttributes
          : certificateAttributesSerializer(parameters.certificateAttributes),
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
      },
    });
}

export async function _createCertificateDeserialize(
  result: CreateCertificate202Response | CreateCertificateDefaultResponse,
): Promise<CertificateOperation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    csr:
      typeof result.body["csr"] === "string"
        ? stringToUint8Array(result.body["csr"], "base64")
        : result.body["csr"],
    cancellationRequested: result.body["cancellation_requested"],
    status: result.body["status"],
    statusDetails: result.body["status_details"],
    error: !result.body.error
      ? undefined
      : {
        code: result.body.error?.["code"],
        message: result.body.error?.["message"],
        innerError: !result.body.error?.innererror
          ? undefined
          : result.body.error?.innererror,
      },
    target: result.body["target"],
    requestId: result.body["request_id"],
  };
}

/**
 * If this is the first version, the certificate resource is created. This
 * operation requires the certificates/create permission.
 */
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
): StreamableMethod<
  ImportCertificate200Response | ImportCertificateDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/import", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        value: parameters["base64EncodedCertificate"],
        pwd: parameters["password"],
        policy: !parameters.certificatePolicy
          ? parameters.certificatePolicy
          : certificatePolicySerializer(parameters.certificatePolicy),
        attributes: !parameters.certificateAttributes
          ? parameters.certificateAttributes
          : certificateAttributesSerializer(parameters.certificateAttributes),
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
      },
    });
}

export async function _importCertificateDeserialize(
  result: ImportCertificate200Response | ImportCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as KeyUsageType[],
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * Imports an existing valid certificate, containing a private key, into Azure Key
 * Vault. This operation requires the certificates/import permission. The
 * certificate to be imported can be in either PFX or PEM format. If the
 * certificate is in PEM format the PEM file must contain the key as well as x509
 * certificates. Key Vault will only accept a key in PKCS#8 format.
 */
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
): StreamableMethod<
  GetCertificateVersions200Response | GetCertificateVersionsDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/versions", certificateName)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getCertificateVersionsDeserialize(
  result:
    | GetCertificateVersions200Response
    | GetCertificateVersionsDefaultResponse,
): Promise<_CertificateListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      attributes: !p.attributes
        ? undefined
        : {
          enabled: p.attributes?.["enabled"],
          notBefore:
            p.attributes?.["nbf"] !== undefined
              ? new Date(p.attributes?.["nbf"])
              : undefined,
          expires:
            p.attributes?.["expires"] !== undefined
              ? new Date(p.attributes?.["expires"])
              : undefined,
          created:
            p.attributes?.["created"] !== undefined
              ? new Date(p.attributes?.["created"])
              : undefined,
          updated:
            p.attributes?.["updated"] !== undefined
              ? new Date(p.attributes?.["updated"])
              : undefined,
          recoverableDays: p.attributes?.["recoverableDays"],
          recoveryLevel: p.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
      tags: p["tags"],
      x509Thumbprint:
        typeof p["x5t"] === "string"
          ? stringToUint8Array(p["x5t"], "base64")
          : p["x5t"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The GetCertificateVersions operation returns the versions of a certificate in
 * the specified key vault. This operation requires the certificates/list
 * permission.
 */
export function getCertificateVersions(
  context: Client,
  certificateName: string,
  options: GetCertificateVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getCertificateVersionsSend(context, certificateName, options),
    _getCertificateVersionsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getCertificatePolicySend(
  context: Client,
  certificateName: string,
  options: GetCertificatePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod<
  GetCertificatePolicy200Response | GetCertificatePolicyDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/policy", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificatePolicyDeserialize(
  result: GetCertificatePolicy200Response | GetCertificatePolicyDefaultResponse,
): Promise<CertificatePolicy> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    keyProperties: !result.body.key_props
      ? undefined
      : {
        exportable: result.body.key_props?.["exportable"],
        keyType: result.body.key_props?.["kty"] as JsonWebKeyType,
        keySize: result.body.key_props?.["key_size"],
        reuseKey: result.body.key_props?.["reuse_key"],
        curve: result.body.key_props?.["crv"] as JsonWebKeyCurveName,
      },
    secretProperties: !result.body.secret_props
      ? undefined
      : { contentType: result.body.secret_props?.["contentType"] },
    x509CertificateProperties: !result.body.x509_props
      ? undefined
      : {
        subject: result.body.x509_props?.["subject"],
        ekus: result.body.x509_props?.["ekus"],
        subjectAlternativeNames: !result.body.x509_props?.sans
          ? undefined
          : {
            emails: result.body.x509_props?.sans?.["emails"],
            dnsNames: result.body.x509_props?.sans?.["dns_names"],
            upns: result.body.x509_props?.sans?.["upns"],
          },
        keyUsage: result.body.x509_props?.["key_usage"] as KeyUsageType[] | undefined,
        validityInMonths: result.body.x509_props?.["validity_months"],
      },
    lifetimeActions:
      result.body["lifetime_actions"] === undefined
        ? result.body["lifetime_actions"]
        : result.body["lifetime_actions"].map((p) => ({
          trigger: !p.trigger
            ? undefined
            : {
              lifetimePercentage: p.trigger?.["lifetime_percentage"],
              daysBeforeExpiry: p.trigger?.["days_before_expiry"],
            },
          action: !p.action
            ? undefined
            : { actionType: p.action?.["action_type"] as ActionType },
        })),
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
  };
}

/**
 * The GetCertificatePolicy operation returns the specified certificate policy
 * resources in the specified key vault. This operation requires the
 * certificates/get permission.
 */
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
): StreamableMethod<
  UpdateCertificatePolicy200Response | UpdateCertificatePolicyDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/policy", certificateName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        key_props: !certificatePolicy.keyProperties
          ? certificatePolicy.keyProperties
          : keyPropertiesSerializer(certificatePolicy.keyProperties),
        secret_props: !certificatePolicy.secretProperties
          ? certificatePolicy.secretProperties
          : secretPropertiesSerializer(certificatePolicy.secretProperties),
        x509_props: !certificatePolicy.x509CertificateProperties
          ? certificatePolicy.x509CertificateProperties
          : x509CertificatePropertiesSerializer(
            certificatePolicy.x509CertificateProperties,
          ),
        lifetime_actions:
          certificatePolicy["lifetimeActions"] === undefined
            ? certificatePolicy["lifetimeActions"]
            : certificatePolicy["lifetimeActions"].map(
              lifetimeActionSerializer,
            ),
        issuer: !certificatePolicy.issuerParameters
          ? certificatePolicy.issuerParameters
          : issuerParametersSerializer(certificatePolicy.issuerParameters),
        attributes: !certificatePolicy.attributes
          ? certificatePolicy.attributes
          : certificateAttributesSerializer(certificatePolicy.attributes),
      },
    });
}

export async function _updateCertificatePolicyDeserialize(
  result:
    | UpdateCertificatePolicy200Response
    | UpdateCertificatePolicyDefaultResponse,
): Promise<CertificatePolicy> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    keyProperties: !result.body.key_props
      ? undefined
      : {
        exportable: result.body.key_props?.["exportable"],
        keyType: result.body.key_props?.["kty"] as JsonWebKeyType,
        keySize: result.body.key_props?.["key_size"],
        reuseKey: result.body.key_props?.["reuse_key"],
        curve: result.body.key_props?.["crv"] as JsonWebKeyCurveName,
      },
    secretProperties: !result.body.secret_props
      ? undefined
      : { contentType: result.body.secret_props?.["contentType"] },
    x509CertificateProperties: !result.body.x509_props
      ? undefined
      : {
        subject: result.body.x509_props?.["subject"],
        ekus: result.body.x509_props?.["ekus"],
        subjectAlternativeNames: !result.body.x509_props?.sans
          ? undefined
          : {
            emails: result.body.x509_props?.sans?.["emails"],
            dnsNames: result.body.x509_props?.sans?.["dns_names"],
            upns: result.body.x509_props?.sans?.["upns"],
          },
        keyUsage: result.body.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
        validityInMonths: result.body.x509_props?.["validity_months"],
      },
    lifetimeActions:
      result.body["lifetime_actions"] === undefined
        ? result.body["lifetime_actions"]
        : result.body["lifetime_actions"].map((p) => ({
          trigger: !p.trigger
            ? undefined
            : {
              lifetimePercentage: p.trigger?.["lifetime_percentage"],
              daysBeforeExpiry: p.trigger?.["days_before_expiry"],
            },
          action: !p.action
            ? undefined
            : { actionType: p.action?.["action_type"] as ActionType },
        })),
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
  };
}

/**
 * Set specified members in the certificate policy. Leave others as null. This
 * operation requires the certificates/update permission.
 */
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
): StreamableMethod<
  UpdateCertificate200Response | UpdateCertificateDefaultResponse
> {
  return context
    .path(
      "/certificates/{certificateName}/{certificateVersion}",
      certificateName,
      certificateVersion,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        policy: !parameters.certificatePolicy
          ? parameters.certificatePolicy
          : certificatePolicySerializer(parameters.certificatePolicy),
        attributes: !parameters.certificateAttributes
          ? parameters.certificateAttributes
          : certificateAttributesSerializer(parameters.certificateAttributes),
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
      },
    });
}

export async function _updateCertificateDeserialize(
  result: UpdateCertificate200Response | UpdateCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * The UpdateCertificate operation applies the specified update on the given
 * certificate; the only elements updated are the certificate's attributes. This
 * operation requires the certificates/update permission.
 */
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
): StreamableMethod<GetCertificate200Response | GetCertificateDefaultResponse> {
  return context
    .path(
      "/certificates/{certificateName}/{certificateVersion}",
      certificateName,
      certificateVersion,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateDeserialize(
  result: GetCertificate200Response | GetCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * Gets information about a specific certificate. This operation requires the
 * certificates/get permission.
 */
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
): StreamableMethod<
  | UpdateCertificateOperation200Response
  | UpdateCertificateOperationDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/pending", certificateName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        cancellation_requested: certificateOperation["cancellationRequested"],
      },
    });
}

export async function _updateCertificateOperationDeserialize(
  result:
    | UpdateCertificateOperation200Response
    | UpdateCertificateOperationDefaultResponse,
): Promise<CertificateOperation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    csr:
      typeof result.body["csr"] === "string"
        ? stringToUint8Array(result.body["csr"], "base64")
        : result.body["csr"],
    cancellationRequested: result.body["cancellation_requested"],
    status: result.body["status"],
    statusDetails: result.body["status_details"],
    error: !result.body.error
      ? undefined
      : {
        code: result.body.error?.["code"],
        message: result.body.error?.["message"],
        innerError: !result.body.error?.innererror
          ? undefined
          : result.body.error?.innererror,
      },
    target: result.body["target"],
    requestId: result.body["request_id"],
  };
}

/**
 * Updates a certificate creation operation that is already in progress. This
 * operation requires the certificates/update permission.
 */
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
): StreamableMethod<
  GetCertificateOperation200Response | GetCertificateOperationDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/pending", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCertificateOperationDeserialize(
  result:
    | GetCertificateOperation200Response
    | GetCertificateOperationDefaultResponse,
): Promise<CertificateOperation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    csr:
      typeof result.body["csr"] === "string"
        ? stringToUint8Array(result.body["csr"], "base64")
        : result.body["csr"],
    cancellationRequested: result.body["cancellation_requested"],
    status: result.body["status"],
    statusDetails: result.body["status_details"],
    error: !result.body.error
      ? undefined
      : {
        code: result.body.error?.["code"],
        message: result.body.error?.["message"],
        innerError: !result.body.error?.innererror
          ? undefined
          : result.body.error?.innererror,
      },
    target: result.body["target"],
    requestId: result.body["request_id"],
  };
}

/**
 * Gets the creation operation associated with a specified certificate. This
 * operation requires the certificates/get permission.
 */
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
): StreamableMethod<
  | DeleteCertificateOperation200Response
  | DeleteCertificateOperationDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/pending", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateOperationDeserialize(
  result:
    | DeleteCertificateOperation200Response
    | DeleteCertificateOperationDefaultResponse,
): Promise<CertificateOperation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    issuerParameters: !result.body.issuer
      ? undefined
      : {
        name: result.body.issuer?.["name"],
        certificateType: result.body.issuer?.["cty"],
        certificateTransparency: result.body.issuer?.["cert_transparency"],
      },
    csr:
      typeof result.body["csr"] === "string"
        ? stringToUint8Array(result.body["csr"], "base64")
        : result.body["csr"],
    cancellationRequested: result.body["cancellation_requested"],
    status: result.body["status"],
    statusDetails: result.body["status_details"],
    error: !result.body.error
      ? undefined
      : {
        code: result.body.error?.["code"],
        message: result.body.error?.["message"],
        innerError: !result.body.error?.innererror
          ? undefined
          : result.body.error?.innererror,
      },
    target: result.body["target"],
    requestId: result.body["request_id"],
  };
}

/**
 * Deletes the creation operation for a specified certificate that is in the
 * process of being created. The certificate is no longer created. This operation
 * requires the certificates/update permission.
 */
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
): StreamableMethod<
  MergeCertificate201Response | MergeCertificateDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/pending/merge", certificateName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        x5c: parameters["x509Certificates"].map((p) =>
          uint8ArrayToString(p, "base64"),
        ),
        attributes: !parameters.certificateAttributes
          ? parameters.certificateAttributes
          : certificateAttributesSerializer(parameters.certificateAttributes),
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
      },
    });
}

export async function _mergeCertificateDeserialize(
  result: MergeCertificate201Response | MergeCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * The MergeCertificate operation performs the merging of a certificate or
 * certificate chain with a key pair currently available in the service. This
 * operation requires the certificates/create permission.
 */
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
): StreamableMethod<
  BackupCertificate200Response | BackupCertificateDefaultResponse
> {
  return context
    .path("/certificates/{certificateName}/backup", certificateName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _backupCertificateDeserialize(
  result: BackupCertificate200Response | BackupCertificateDefaultResponse,
): Promise<BackupCertificateResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value:
      typeof result.body["value"] === "string"
        ? stringToUint8Array(result.body["value"], "base64")
        : result.body["value"],
  };
}

/**
 * Requests that a backup of the specified certificate be downloaded to the
 * client. All versions of the certificate will be downloaded. This operation
 * requires the certificates/backup permission.
 */
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
): StreamableMethod<
  RestoreCertificate200Response | RestoreCertificateDefaultResponse
> {
  return context
    .path("/certificates/restore")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        value: uint8ArrayToString(
          parameters["certificateBundleBackup"],
          "base64",
        ),
      },
    });
}

export async function _restoreCertificateDeserialize(
  result: RestoreCertificate200Response | RestoreCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * Restores a backed up certificate, and all its versions, to a vault. This
 * operation requires the certificates/restore permission.
 */
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
): StreamableMethod<
  GetDeletedCertificates200Response | GetDeletedCertificatesDefaultResponse
> {
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
  result:
    | GetDeletedCertificates200Response
    | GetDeletedCertificatesDefaultResponse,
): Promise<_PagedDeletedCertificateItem> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      attributes: !p.attributes
        ? undefined
        : {
          enabled: p.attributes?.["enabled"],
          notBefore:
            p.attributes?.["nbf"] !== undefined
              ? new Date(p.attributes?.["nbf"])
              : undefined,
          expires:
            p.attributes?.["expires"] !== undefined
              ? new Date(p.attributes?.["expires"])
              : undefined,
          created:
            p.attributes?.["created"] !== undefined
              ? new Date(p.attributes?.["created"])
              : undefined,
          updated:
            p.attributes?.["updated"] !== undefined
              ? new Date(p.attributes?.["updated"])
              : undefined,
          recoverableDays: p.attributes?.["recoverableDays"],
          recoveryLevel: p.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
      tags: p["tags"],
      x509Thumbprint:
        typeof p["x5t"] === "string"
          ? stringToUint8Array(p["x5t"], "base64")
          : p["x5t"],
      recoveryId: p["recoveryId"],
      scheduledPurgeDate:
        p["scheduledPurgeDate"] !== undefined
          ? new Date(p["scheduledPurgeDate"])
          : undefined,
      deletedDate:
        p["deletedDate"] !== undefined ? new Date(p["deletedDate"]) : undefined,
    })),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The GetDeletedCertificates operation retrieves the certificates in the current
 * vault which are in a deleted state and ready for recovery or purging. This
 * operation includes deletion-specific information. This operation requires the
 * certificates/get/list permission. This operation can only be enabled on
 * soft-delete enabled vaults.
 */
export function getDeletedCertificates(
  context: Client,
  options: GetDeletedCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedCertificateItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getDeletedCertificatesSend(context, options),
    _getDeletedCertificatesDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDeletedCertificateSend(
  context: Client,
  certificateName: string,
  options: GetDeletedCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  GetDeletedCertificate200Response | GetDeletedCertificateDefaultResponse
> {
  return context
    .path("/deletedcertificates/{certificateName}", certificateName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeletedCertificateDeserialize(
  result:
    | GetDeletedCertificate200Response
    | GetDeletedCertificateDefaultResponse,
): Promise<DeletedCertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
    recoveryId: result.body["recoveryId"],
    scheduledPurgeDate:
      result.body["scheduledPurgeDate"] !== undefined
        ? new Date(result.body["scheduledPurgeDate"])
        : undefined,
    deletedDate:
      result.body["deletedDate"] !== undefined
        ? new Date(result.body["deletedDate"])
        : undefined,
  };
}

/**
 * The GetDeletedCertificate operation retrieves the deleted certificate
 * information plus its attributes, such as retention interval, scheduled
 * permanent deletion and the current deletion recovery level. This operation
 * requires the certificates/get permission.
 */
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
): StreamableMethod<
  PurgeDeletedCertificate204Response | PurgeDeletedCertificateDefaultResponse
> {
  return context
    .path("/deletedcertificates/{certificateName}", certificateName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedCertificateDeserialize(
  result:
    | PurgeDeletedCertificate204Response
    | PurgeDeletedCertificateDefaultResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/**
 * The PurgeDeletedCertificate operation performs an irreversible deletion of the
 * specified certificate, without possibility for recovery. The operation is not
 * available if the recovery level does not specify 'Purgeable'. This operation
 * requires the certificate/purge permission.
 */
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
): StreamableMethod<
  | RecoverDeletedCertificate200Response
  | RecoverDeletedCertificateDefaultResponse
> {
  return context
    .path("/deletedcertificates/{certificateName}/recover", certificateName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverDeletedCertificateDeserialize(
  result:
    | RecoverDeletedCertificate200Response
    | RecoverDeletedCertificateDefaultResponse,
): Promise<CertificateBundle> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    kid: result.body["kid"],
    sid: result.body["sid"],
    x509Thumbprint:
      typeof result.body["x5t"] === "string"
        ? stringToUint8Array(result.body["x5t"], "base64")
        : result.body["x5t"],
    policy: !result.body.policy
      ? undefined
      : {
        id: result.body.policy?.["id"],
        keyProperties: !result.body.policy?.key_props
          ? undefined
          : {
            exportable: result.body.policy?.key_props?.["exportable"],
            keyType: result.body.policy?.key_props?.[
              "kty"
            ] as JsonWebKeyType,
            keySize: result.body.policy?.key_props?.["key_size"],
            reuseKey: result.body.policy?.key_props?.["reuse_key"],
            curve: result.body.policy?.key_props?.[
              "crv"
            ] as JsonWebKeyCurveName,
          },
        secretProperties: !result.body.policy?.secret_props
          ? undefined
          : {
            contentType: result.body.policy?.secret_props?.["contentType"],
          },
        x509CertificateProperties: !result.body.policy?.x509_props
          ? undefined
          : {
            subject: result.body.policy?.x509_props?.["subject"],
            ekus: result.body.policy?.x509_props?.["ekus"],
            subjectAlternativeNames: !result.body.policy?.x509_props?.sans
              ? undefined
              : {
                emails: result.body.policy?.x509_props?.sans?.["emails"],
                dnsNames:
                  result.body.policy?.x509_props?.sans?.["dns_names"],
                upns: result.body.policy?.x509_props?.sans?.["upns"],
              },
            keyUsage: result.body.policy?.x509_props?.["key_usage"] as (KeyUsageType[] | undefined),
            validityInMonths:
              result.body.policy?.x509_props?.["validity_months"],
          },
        lifetimeActions:
          result.body.policy?.["lifetime_actions"] === undefined
            ? result.body.policy?.["lifetime_actions"]
            : result.body.policy?.["lifetime_actions"].map((p) => ({
              trigger: !p.trigger
                ? undefined
                : {
                  lifetimePercentage: p.trigger?.["lifetime_percentage"],
                  daysBeforeExpiry: p.trigger?.["days_before_expiry"],
                },
              action: !p.action
                ? undefined
                : { actionType: p.action?.["action_type"] as ActionType },
            })),
        issuerParameters: !result.body.policy?.issuer
          ? undefined
          : {
            name: result.body.policy?.issuer?.["name"],
            certificateType: result.body.policy?.issuer?.["cty"],
            certificateTransparency:
              result.body.policy?.issuer?.["cert_transparency"],
          },
        attributes: !result.body.policy?.attributes
          ? undefined
          : {
            enabled: result.body.policy?.attributes?.["enabled"],
            notBefore:
              result.body.policy?.attributes?.["nbf"] !== undefined
                ? new Date(result.body.policy?.attributes?.["nbf"])
                : undefined,
            expires:
              result.body.policy?.attributes?.["expires"] !== undefined
                ? new Date(result.body.policy?.attributes?.["expires"])
                : undefined,
            created:
              result.body.policy?.attributes?.["created"] !== undefined
                ? new Date(result.body.policy?.attributes?.["created"])
                : undefined,
            updated:
              result.body.policy?.attributes?.["updated"] !== undefined
                ? new Date(result.body.policy?.attributes?.["updated"])
                : undefined,
            recoverableDays:
              result.body.policy?.attributes?.["recoverableDays"],
            recoveryLevel: result.body.policy?.attributes?.[
              "recoveryLevel"
            ] as DeletionRecoveryLevel,
          },
      },
    cer:
      typeof result.body["cer"] === "string"
        ? stringToUint8Array(result.body["cer"], "base64")
        : result.body["cer"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
        enabled: result.body.attributes?.["enabled"],
        notBefore:
          result.body.attributes?.["nbf"] !== undefined
            ? new Date(result.body.attributes?.["nbf"])
            : undefined,
        expires:
          result.body.attributes?.["expires"] !== undefined
            ? new Date(result.body.attributes?.["expires"])
            : undefined,
        created:
          result.body.attributes?.["created"] !== undefined
            ? new Date(result.body.attributes?.["created"])
            : undefined,
        updated:
          result.body.attributes?.["updated"] !== undefined
            ? new Date(result.body.attributes?.["updated"])
            : undefined,
        recoverableDays: result.body.attributes?.["recoverableDays"],
        recoveryLevel: result.body.attributes?.[
          "recoveryLevel"
        ] as DeletionRecoveryLevel,
      },
    tags: result.body["tags"],
  };
}

/**
 * The RecoverDeletedCertificate operation performs the reversal of the Delete
 * operation. The operation is applicable in vaults enabled for soft-delete, and
 * must be issued during the retention interval (available in the deleted
 * certificate's attributes). This operation requires the certificates/recover
 * permission.
 */
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
