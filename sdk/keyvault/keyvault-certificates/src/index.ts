// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// The eslint plugin mentioned below doesn't follow through the extended types.
/* eslint-disable @azure/azure-sdk/ts-apisurface-supportcancellation */

// This file makes more sense if ordered based on how meaningful are some methods in relation to others.
/* eslint-disable @typescript-eslint/member-ordering */

/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  signingPolicy,
  RequestOptionsBase,
  PipelineOptions,
  createPipelineFromOptions
} from "@azure/core-http";

import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { logger } from "./log";
import { PollerLike, PollOperationState } from "@azure/core-lro";

import {
  KeyVaultCertificate,
  KeyVaultCertificateWithPolicy,
  AdministratorContact,
  BackupCertificateOptions,
  BeginCreateCertificateOptions,
  BeginDeleteCertificateOptions,
  BeginRecoverDeletedCertificateOptions,
  CancelCertificateOperationOptions,
  CertificateIssuer,
  CertificateContact,
  CertificateContentType,
  CertificatePolicy,
  CertificateProperties,
  CreateCertificateOptions,
  DeleteCertificateOperationOptions,
  DeleteCertificateOptions,
  DeleteContactsOptions,
  DeleteIssuerOptions,
  DeletedCertificate,
  GetContactsOptions,
  GetIssuerOptions,
  GetCertificateOperationOptions,
  GetPlainCertificateOperationOptions,
  GetCertificateOptions,
  GetCertificatePolicyOptions,
  GetCertificateVersionOptions,
  GetDeletedCertificateOptions,
  CertificateTags,
  ImportCertificateOptions,
  CertificateKeyType,
  CertificateKeyCurveName,
  ListPropertiesOfCertificatesOptions,
  ListPropertiesOfCertificateVersionsOptions,
  ListPropertiesOfIssuersOptions,
  ListDeletedCertificatesOptions,
  MergeCertificateOptions,
  PurgeDeletedCertificateOptions,
  RecoverDeletedCertificateOptions,
  RestoreCertificateBackupOptions,
  SetContactsOptions,
  CreateIssuerOptions,
  CertificateOperation,
  CertificateOperationError,
  SubjectAlternativeNames,
  UpdateIssuerOptions,
  UpdateCertificatePropertiesOptions,
  UpdateCertificatePolicyOptions,
  WellKnownIssuerNames,
  CertificateClientInterface,
  CertificatePollerOptions,
  IssuerProperties,
  CertificateContactAll,
  CertificatePolicyAction,
  LifetimeAction,
  RequireAtLeastOne,
  ArrayOneOrMore,
  SubjectAlternativeNamesAll,
  CertificatePolicyProperties,
  PolicySubjectProperties,
  DefaultCertificatePolicy,
  CertificateClientOptions,
  LATEST_API_VERSION
} from "./certificatesModels";

import {
  CertificateBundle,
  KeyVaultClientGetCertificatesOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  CertificateOperation as CoreCertificateOperation,
  CertificateAttributes as CoreCertificateAttributes,
  CertificatePolicy as CoreCertificatePolicy,
  BackupCertificateResult,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  DeletedCertificateItem,
  DeletedCertificateBundle,
  ErrorModel,
  IssuerParameters,
  IssuerCredentials,
  IssuerAttributes,
  KeyUsageType,
  X509CertificateProperties,
  DeleteCertificateResponse,
  DeleteCertificateContactsResponse,
  SetCertificateContactsResponse,
  GetCertificateContactsResponse,
  SetCertificateIssuerResponse,
  UpdateCertificateIssuerResponse,
  GetCertificateIssuerResponse,
  DeleteCertificateIssuerResponse,
  CreateCertificateResponse,
  GetCertificateResponse,
  ImportCertificateResponse,
  GetCertificatePolicyResponse,
  UpdateCertificatePolicyResponse,
  UpdateCertificateResponse,
  UpdateCertificateOperationResponse,
  GetCertificateOperationResponse,
  DeleteCertificateOperationResponse,
  MergeCertificateResponse,
  BackupCertificateResponse,
  RestoreCertificateResponse,
  GetDeletedCertificateResponse,
  RecoverDeletedCertificateResponse,
  SubjectAlternativeNames as CoreSubjectAlternativeNames,
  ActionType,
  DeletionRecoveryLevel,
  CertificateAttributes,
  Contacts as CoreContacts,
  IssuerBundle
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { SDK_VERSION } from "./core/utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { CreateCertificatePoller } from "./lro/create/poller";
import { CertificateOperationPoller } from "./lro/operation/poller";
import { DeleteCertificatePoller } from "./lro/delete/poller";
import { RecoverDeletedCertificatePoller } from "./lro/recover/poller";
import { CertificateOperationState } from "./lro/operation/operation";
import { DeleteCertificateState } from "./lro/delete/operation";
import { CreateCertificateState } from "./lro/create/operation";
import { RecoverDeletedCertificateState } from "./lro/recover/operation";
import { parseCertificateBytes } from "./utils";

export {
  CertificateClientOptions,
  ActionType,
  AdministratorContact,
  ArrayOneOrMore,
  BackupCertificateResult,
  BeginCreateCertificateOptions,
  BeginDeleteCertificateOptions,
  BeginRecoverDeletedCertificateOptions,
  KeyVaultCertificate,
  KeyVaultCertificateWithPolicy,
  BackupCertificateOptions,
  CertificateContentType,
  CertificateProperties,
  CertificateIssuer,
  CertificateOperation,
  CertificateOperationError,
  CertificatePolicy,
  CertificatePolicyAction,
  CertificatePolicyProperties,
  PolicySubjectProperties,
  CertificateTags,
  CreateCertificateOptions,
  CertificatePollerOptions,
  PollerLike,
  CreateCertificateState,
  DeleteCertificateState,
  RecoverDeletedCertificateState,
  CertificateOperationState,
  CoreSubjectAlternativeNames,
  RequireAtLeastOne,
  CertificateContactAll,
  CertificateContact,
  DeleteCertificateOperationOptions,
  DeleteContactsOptions,
  DeleteIssuerOptions,
  DeletedCertificate,
  DeletionRecoveryLevel,
  DefaultCertificatePolicy,
  ErrorModel,
  GetContactsOptions,
  GetIssuerOptions,
  GetCertificateOperationOptions,
  GetPlainCertificateOperationOptions,
  GetCertificateOptions,
  GetCertificatePolicyOptions,
  GetCertificateVersionOptions,
  GetDeletedCertificateOptions,
  ImportCertificateOptions,
  IssuerAttributes,
  IssuerCredentials,
  IssuerParameters,
  IssuerProperties,
  CertificateKeyType,
  CertificateKeyCurveName,
  KeyUsageType,
  LifetimeAction,
  ListPropertiesOfCertificatesOptions,
  ListPropertiesOfCertificateVersionsOptions,
  ListPropertiesOfIssuersOptions,
  ListDeletedCertificatesOptions,
  MergeCertificateOptions,
  PipelineOptions,
  PurgeDeletedCertificateOptions,
  RestoreCertificateBackupOptions,
  SetContactsOptions,
  SubjectAlternativeNamesAll,
  CreateIssuerOptions,
  SubjectAlternativeNames,
  UpdateIssuerOptions,
  UpdateCertificatePropertiesOptions as UpdateCertificateOptions,
  UpdateCertificatePolicyOptions,
  WellKnownIssuerNames as WellKnownIssuer,
  X509CertificateProperties,
  logger
};

/**
 * Deprecated KeyVault copy of core-lro's PollerLike.
 */
export type KVPollerLike<TState extends PollOperationState<TResult>, TResult> = PollerLike<
  TState,
  TResult
>;

function toCoreAttributes(properties: CertificateProperties): CoreCertificateAttributes {
  return {
    recoveryLevel: properties.recoveryLevel,
    enabled: properties.enabled,
    notBefore: properties.notBefore,
    expires: properties.expiresOn,
    created: properties.createdOn,
    updated: properties.updatedOn
  };
}

function toCorePolicy(
  id: string | undefined,
  policy: CertificatePolicy,
  attributes: CertificateAttributes = {}
): CoreCertificatePolicy {
  let subjectAlternativeNames: CoreSubjectAlternativeNames = {};
  if (policy.subjectAlternativeNames) {
    subjectAlternativeNames = {
      emails: policy.subjectAlternativeNames.emails,
      dnsNames: policy.subjectAlternativeNames.dnsNames,
      upns: policy.subjectAlternativeNames.userPrincipalNames
    };
  }

  return {
    id,
    lifetimeActions: policy.lifetimeActions
      ? policy.lifetimeActions.map((action) => ({
          action: { actionType: action.action },
          trigger: {
            lifetimePercentage: action.lifetimePercentage,
            daysBeforeExpiry: action.daysBeforeExpiry
          }
        }))
      : undefined,
    keyProperties: {
      keyType: policy.keyType,
      keySize: policy.keySize,
      reuseKey: policy.reuseKey,
      curve: policy.keyCurveName,
      exportable: policy.exportable
    },
    secretProperties: {
      contentType: policy.contentType
    },
    x509CertificateProperties: {
      subject: policy.subject,
      ekus: policy.enhancedKeyUsage,
      subjectAlternativeNames,
      keyUsage: policy.keyUsage,
      validityInMonths: policy.validityInMonths
    },
    issuerParameters: {
      name: policy.issuerName,
      certificateType: policy.certificateType,
      certificateTransparency: policy.certificateTransparency
    },
    attributes
  };
}

function toPublicPolicy(policy: CoreCertificatePolicy = {}): CertificatePolicy {
  let subjectAlternativeNames: SubjectAlternativeNames | undefined;
  const x509Properties: X509CertificateProperties = policy.x509CertificateProperties || {};

  if (policy.x509CertificateProperties) {
    if (x509Properties.subjectAlternativeNames) {
      const names = x509Properties.subjectAlternativeNames;
      if (names.emails && names.emails.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          emails: names.emails as ArrayOneOrMore<string>
        };
      }
      if (names.dnsNames && names.dnsNames.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          dnsNames: names.dnsNames as ArrayOneOrMore<string>
        };
      }
      if (names.upns && names.upns.length) {
        subjectAlternativeNames = {
          ...subjectAlternativeNames,
          userPrincipalNames: names.upns as ArrayOneOrMore<string>
        };
      }
    }
  }

  const certificatePolicy: CertificatePolicy = {
    lifetimeActions: policy.lifetimeActions
      ? policy.lifetimeActions.map((action) => ({
          action: action.action ? action.action.actionType : undefined,
          daysBeforeExpiry: action.trigger ? action.trigger.daysBeforeExpiry : undefined,
          lifetimePercentage: action.trigger ? action.trigger.lifetimePercentage : undefined
        }))
      : undefined,
    contentType: policy.secretProperties
      ? (policy.secretProperties.contentType as CertificateContentType)
      : undefined,
    enhancedKeyUsage: x509Properties.ekus,
    keyUsage: x509Properties.keyUsage,
    validityInMonths: x509Properties.validityInMonths,
    subject: x509Properties.subject,
    subjectAlternativeNames: subjectAlternativeNames!
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

function toPublicIssuer(issuer: IssuerBundle = {}): CertificateIssuer {
  const parsedId = parseKeyvaultEntityIdentifier("certificates", issuer.id);
  const attributes: IssuerAttributes = issuer.attributes || {};

  const publicIssuer: CertificateIssuer = {
    id: issuer.id,
    name: parsedId.name,
    provider: issuer.provider,
    accountId: issuer.credentials && issuer.credentials.accountId,
    password: issuer.credentials && issuer.credentials.password,
    enabled: attributes.enabled,
    createdOn: attributes.created,
    updatedOn: attributes.updated
  };

  if (issuer.organizationDetails) {
    publicIssuer.organizationId = issuer.organizationDetails.id;
    publicIssuer.administratorContacts = issuer.organizationDetails.adminDetails
      ? issuer.organizationDetails.adminDetails.map((x) => ({
          email: x.emailAddress,
          phone: x.phone,
          firstName: x.firstName,
          lastName: x.lastName
        }))
      : undefined;
  }
  return publicIssuer;
}

/**
 * The client to interact with the KeyVault certificates functionality
 */
export class CertificateClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  private readonly client: KeyVaultClient;

  /**
   * @internal
   * @ignore
   * A self reference that bypasses private methods, for the pollers.
   */
  private readonly pollerClient: CertificateClientInterface = {
    createCertificate: this.createCertificate.bind(this),
    getPlainCertificateOperation: this.getPlainCertificateOperation.bind(this),
    recoverDeletedCertificate: this.recoverDeletedCertificate.bind(this),
    cancelCertificateOperation: this.cancelCertificateOperation.bind(this),
    getCertificate: this.getCertificate.bind(this),
    deleteCertificate: this.deleteCertificate.bind(this),
    getDeletedCertificate: this.getDeletedCertificate.bind(this)
  };

  /**
   * Creates an instance of CertificateClient.
   * @param {string} vaultUrl the base URL to the vault.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions={}] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof CertificateClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: CertificateClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-certificates/${SDK_VERSION}`;
    if (pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions.userAgentPrefix =
        pipelineOptions.userAgentOptions.userAgentPrefix !== undefined
          ? `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo;
    } else {
      pipelineOptions.userAgentOptions = {
        userAgentPrefix: libInfo
      };
    }

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          logPolicyOptions: {
            allowedHeaderNames: [
              "x-ms-keyvault-region",
              "x-ms-keyvault-network-info",
              "x-ms-keyvault-service-version"
            ]
          }
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new KeyVaultClient(
      pipelineOptions.apiVersion || LATEST_API_VERSION,
      pipeline
    );
  }

  private async *listPropertiesOfCertificatesPage(
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<CertificateProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificates(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getPropertiesFromCertificateBundle);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificates(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getPropertiesFromCertificateBundle);
      } else {
        break;
      }
    }
  }

  private async *listPropertiesOfCertificatesAll(
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<CertificateProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfCertificatesPage(f, options)) {
      for (const certificate of page) {
        yield certificate;
      }
    }
  }

  /**
   * Iterates the latest version of all certificates in the vault.  The full certificate identifier and attributes are provided
   * in the response. No values are returned for the certificates. This operations requires the certificates/list permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * // All in one call
   * for await (const certificateProperties of client.listPropertiesOfCertificates()) {
   *   console.log(certificateProperties);
   * }
   * // By pages
   * for await (const page of client.listPropertiesOfCertificates().byPage()) {
   *   for (const certificateProperties of page) {
   *     console.log(certificateProperties);
   *   }
   * }
   * ```
   * @summary List all versions of the specified certificate.
   * @param {ListPropertiesOfCertificatesOptions} [options] The optional parameters
   */
  public listPropertiesOfCertificates(
    options: ListPropertiesOfCertificatesOptions = {}
  ): PagedAsyncIterableIterator<CertificateProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("listPropertiesOfCertificates", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listPropertiesOfCertificatesAll(updatedOptions);

    span.end();
    const result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfCertificatesPage(settings, updatedOptions)
    };

    return result;
  }

  private async *listPropertiesOfCertificateVersionsPage(
    certificateName: string,
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<CertificateProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateVersionsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificateVersions(
        this.vaultUrl,
        certificateName,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getPropertiesFromCertificateBundle);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificateVersions(
        continuationState.continuationToken,
        certificateName,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getPropertiesFromCertificateBundle);
      } else {
        break;
      }
    }
  }

  private async *listPropertiesOfCertificateVersionsAll(
    certificateName: string,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<CertificateProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfCertificateVersionsPage(
      certificateName,
      f,
      options
    )) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Returns the versions of a certificate in the specified key
   * vault. This operation requires the certificates/list permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * for await (const certificateProperties of client.listPropertiesOfCertificateVersions("MyCertificate")) {
   *   console.log(certificateProperties.version!);
   * }
   * ```
   * @summary List the versions of a certificate.
   * @param certificateName The name of the certificate.
   * @param {ListPropertiesOfCertificateVersionsOptions} [options] The optional parameters
   */
  public listPropertiesOfCertificateVersions(
    certificateName: string,
    options: ListPropertiesOfCertificateVersionsOptions = {}
  ): PagedAsyncIterableIterator<CertificateProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfCertificateVersions", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listPropertiesOfCertificateVersionsAll(certificateName, updatedOptions);

    span.end();
    const result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfCertificateVersionsPage(certificateName, settings, updatedOptions)
    };

    return result;
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate.
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
   *
   * This operation requires the certificates/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const createPoller = await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * await createPoller.pollUntilDone();
   *
   * const deletePoller = await client.beginDeleteCertificate("MyCertificate");
   *
   * // Serializing the poller
   * const serialized = deletePoller.toString();
   *
   * // A new poller can be created with:
   * // const newPoller = await client.beginDeleteCertificate("MyCertificate", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const deletedCertificate = await deletePoller.pollUntilDone();
   * console.log(deletedCertificate);
   * ```
   * @summary Deletes a certificate from a specified key vault.
   * @param certificateName The name of the certificate.
   * @param {DeleteCertificateOptions} [options] The optional parameters
   */
  public async beginDeleteCertificate(
    certificateName: string,
    options: BeginDeleteCertificateOptions = {}
  ): Promise<PollerLike<DeleteCertificateState, DeletedCertificate>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new DeleteCertificatePoller({
      certificateName,
      client: this.pollerClient,
      ...options,
      requestOptions
    });
    // This will initialize the poller's operation (the deletion of the secret).
    await poller.poll();
    return poller;
  }

  /**
   * Deletes all of the certificate contacts. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setContacts([{
   *   email: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * await client.deleteContacts();
   * ```
   * @summary Deletes all of the certificate contacts
   * @param {DeleteContactsOptions} [options] The optional parameters
   */
  public async deleteContacts(
    options: DeleteContactsOptions = {}
  ): Promise<CertificateContact[] | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("deleteContacts", requestOptions);

    let result: DeleteCertificateContactsResponse;

    try {
      result = await this.client.deleteCertificateContacts(
        this.vaultUrl,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.coreContactsToCertificateContacts(result._response.parsedBody);
  }

  /**
   * Sets the certificate contacts for the key vault. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setContacts([{
   *   email: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * ```
   * @summary Sets the certificate contacts.
   * @param contacts The contacts to use
   * @param {SetContactsOptions} [options] The optional parameters
   */
  public async setContacts(
    contacts: CertificateContact[],
    options: SetContactsOptions = {}
  ): Promise<CertificateContact[] | undefined> {
    const coreContacts = contacts.map((x) => ({
      emailAddress: x ? x.email : undefined,
      name: x ? x.name : undefined,
      phone: x ? x.phone : undefined
    }));
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("setCertificateContacts", requestOptions);

    let result: SetCertificateContactsResponse;

    try {
      result = await this.client.setCertificateContacts(
        this.vaultUrl,
        { contactList: coreContacts },
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return this.coreContactsToCertificateContacts(result._response.parsedBody);
  }

  /**
   * Returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setContacts([{
   *   email: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * const contacts = await client.getContacts();
   * console.log(contacts);
   * ```
   * @summary Sets the certificate contacts.
   * @param {GetContactsOptions} [options] The optional parameters
   */
  public async getContacts(
    options: GetContactsOptions = {}
  ): Promise<CertificateContact[] | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificateContacts", requestOptions);

    let result: GetCertificateContactsResponse;
    try {
      result = await this.client.getCertificateContacts(
        this.vaultUrl,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.coreContactsToCertificateContacts(result);
  }

  private async *listPropertiesOfIssuersPage(
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<IssuerProperties[]> {
    if (continuationState.continuationToken == null) {
      const requestOptionsComplete: KeyVaultClientGetCertificateIssuersOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificateIssuers(
        this.vaultUrl,
        requestOptionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificateIssuers(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listPropertiesOfIssuersAll(
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<IssuerProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfIssuersPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createIssuer("IssuerName", "Test");
   * // All in one call
   * for await (const issuerProperties of client.listPropertiesOfIssuers()) {
   *   console.log(issuerProperties);
   * }
   * // By pages
   * for await (const page of client.listPropertiesOfIssuers().byPage()) {
   *   for (const issuerProperties of page) {
   *     console.log(issuerProperties);
   *   }
   * }
   * ```
   * @summary List the certificate issuers.
   * @param {ListPropertiesOfIssuersOptions} [options] The optional parameters
   */
  public listPropertiesOfIssuers(
    options: ListPropertiesOfIssuersOptions = {}
  ): PagedAsyncIterableIterator<IssuerProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listIssuers", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listPropertiesOfIssuersAll(updatedOptions);

    span.end();
    const result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfIssuersPage(settings, updatedOptions)
    };

    return result;
  }

  /**
   * The createIssuer operation adds or updates the specified certificate issuer. This
   * operation requires the certificates/setissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createIssuer("IssuerName", "Test");
   * ```
   * @summary Sets the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param provider The issuer provider.
   * @param {CreateIssuerOptions} [options] The optional parameters
   */
  public async createIssuer(
    issuerName: string,
    provider: string,
    options: CreateIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    // Unflatten issuer credentials
    const unflattenedOptions = {
      ...options,
      credentials: { accountId: options.accountId, password: options.password }
    };

    const requestOptions = operationOptionsToRequestOptionsBase(unflattenedOptions);
    const span = this.createSpan("createIssuer", requestOptions);
    const properties: IssuerProperties = requestOptions.properties || {};
    const credentials: IssuerCredentials = requestOptions.credentials || {};

    const generatedOptions: KeyVaultClientSetCertificateIssuerOptionalParams = {
      ...requestOptions,
      id: properties.id || requestOptions.id,
      provider: properties.provider || requestOptions.provider
    };

    generatedOptions.credentials = {
      accountId: credentials.accountId || requestOptions.accountId,
      password: credentials.password || requestOptions.password
    };

    if (
      options.organizationId ||
      (options.administratorContacts && options.administratorContacts.length)
    ) {
      generatedOptions.organizationDetails = {
        id: options.organizationId,
        adminDetails: options.administratorContacts
          ? options.administratorContacts.map((x) => ({
              emailAddress: x.email,
              phone: x.phone,
              firstName: x.firstName,
              lastName: x.lastName
            }))
          : undefined
      };
    }

    if (options.enabled !== undefined) {
      generatedOptions.attributes = {
        enabled: options.enabled
      };
    }

    let result: SetCertificateIssuerResponse;

    try {
      result = await this.client.setCertificateIssuer(
        this.vaultUrl,
        issuerName,
        provider,
        this.setParentSpan(span, generatedOptions)
      );
    } finally {
      span.end();
    }
    return toPublicIssuer(result._response.parsedBody);
  }

  /**
   * The updateIssuer operation performs an update on the specified certificate issuer
   * entity. This operation requires the certificates/setissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createIssuer("IssuerName", "Test");
   * await client.updateIssuer("IssuerName", {
   *   provider: "Provider2"
   * });
   * ```
   * @summary Updates the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param {UpdateIssuerOptions} [options] The optional parameters
   */
  public async updateIssuer(
    issuerName: string,
    options: UpdateIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateIssuer", requestOptions);
    const properties: IssuerProperties = requestOptions.properties || {};
    const credentials: IssuerCredentials = requestOptions.credentials || {};

    const generatedOptions: KeyVaultClientSetCertificateIssuerOptionalParams = {
      ...requestOptions,
      id: properties.id || requestOptions.id,
      provider: properties.provider || requestOptions.provider
    };

    generatedOptions.credentials = {
      accountId: credentials.accountId || requestOptions.accountId,
      password: credentials.password || requestOptions.password
    };

    if (
      options.organizationId ||
      (options.administratorContacts && options.administratorContacts.length)
    ) {
      generatedOptions.organizationDetails = {
        id: options.organizationId,
        adminDetails: options.administratorContacts
          ? options.administratorContacts.map((x) => ({
              emailAddress: x.email,
              phone: x.phone,
              firstName: x.firstName,
              lastName: x.lastName
            }))
          : undefined
      };
    }

    if (options.enabled) {
      generatedOptions.attributes = {
        enabled: options.enabled
      };
    }

    let result: UpdateCertificateIssuerResponse;

    try {
      result = await this.client.updateCertificateIssuer(
        this.vaultUrl,
        issuerName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return toPublicIssuer(result._response.parsedBody);
  }

  /**
   * The getIssuer operation returns the specified certificate issuer resources in the
   * specified key vault. This operation requires the certificates/manageissuers/getissuers
   * permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createIssuer("IssuerName", "Test");
   * const certificateIssuer = await client.getIssuer("IssuerName");
   * console.log(certificateIssuer);
   * ```
   * @summary Gets he specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param {GetIssuerOptions} [options] The optional parameters
   */
  public async getIssuer(
    issuerName: string,
    options: GetIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificateIssuer", requestOptions);

    let result: GetCertificateIssuerResponse;

    try {
      result = await this.client.getCertificateIssuer(
        this.vaultUrl,
        issuerName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return toPublicIssuer(result._response.parsedBody);
  }

  /**
   * The deleteIssuer operation permanently removes the specified certificate issuer from
   * the vault. This operation requires the certificates/manageissuers/deleteissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createIssuer("IssuerName", "Provider");
   * await client.deleteIssuer("IssuerName");
   * ```
   * @summary Deletes the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param {DeleteIssuerOptions} [options] The optional parameters
   */
  public async deleteIssuer(
    issuerName: string,
    options: DeleteIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("deleteCertificateIssuer", requestOptions);

    let result: DeleteCertificateIssuerResponse;

    try {
      result = await this.client.deleteCertificateIssuer(
        this.vaultUrl,
        issuerName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return toPublicIssuer(result._response.parsedBody);
  }

  /**
   * Creates a new certificate. If this is the first version, the certificate resource is created.
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
   *
   * **Note:** Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
   *
   * This operation requires the certificates/create permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const certificatePolicy = {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * };
   * const createPoller = await client.beginCreateCertificate("MyCertificate", certificatePolicy);
   *
   * // The pending certificate can be obtained by calling the following method:
   * const pendingCertificate = createPoller.getResult();
   *
   * // Serializing the poller
   * const serialized = createPoller.toString();
   *
   * // A new poller can be created with:
   * // const newPoller = await client.beginCreateCertificate("MyCertificate", certificatePolicy, { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const certificate = await createPoller.pollUntilDone();
   * console.log(certificate);
   * ```
   * @summary Creates a certificate
   * @param certificateName The name of the certificate
   * @param certificatePolicy The certificate's policy
   * @param {CreateCertificateOptions} [options] Optional parameters
   */
  public async beginCreateCertificate(
    certificateName: string,
    policy: CertificatePolicy,
    options: BeginCreateCertificateOptions = {}
  ): Promise<PollerLike<CreateCertificateState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new CreateCertificatePoller({
      certificateName,
      certificatePolicy: policy,
      createCertificateOptions: options,
      requestOptions,
      client: this.pollerClient,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom
    });
    // This will initialize the poller's operation (the creation of the secret).
    await poller.poll();
    return poller;
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const poller = await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * await poller.pollUntilDone();
   * const certificate = await client.getCertificate("MyCertificate");
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name (includes the certificate policy)
   * @param certificateName The name of the certificate
   * @param {GetCertificateOptions} [options] The optional parameters
   */
  public async getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificate", requestOptions);

    let result: GetCertificateResponse;

    try {
      result = await this.client.getCertificate(
        this.vaultUrl,
        certificateName,
        "",
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * Gets information about a specific certificate on a specific version. It won't return the certificate's policy. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const poller = await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * await poller.pollUntilDone();
   * const certificateWithPolicy = await client.getCertificate("MyCertificate");
   * const certificate = await client.getCertificateVersion("MyCertificate", certificateWithPolicy.properties.version!);
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name and a specified version
   * @param certificateName The name of the certificate
   * @param version The specific version of the certificate
   * @param options The optional parameters
   */
  public async getCertificateVersion(
    certificateName: string,
    version: string,
    options: GetCertificateVersionOptions = {}
  ): Promise<KeyVaultCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!version) {
      throw new Error("The 'version' cannot be empty.");
    }

    const span = this.createSpan("getCertificateVersion", requestOptions);

    let result: GetCertificateResponse;

    try {
      result = await this.client.getCertificate(
        this.vaultUrl,
        certificateName,
        version,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result);
  }

  /**
   * Imports an existing valid certificate, containing a private key, into Azure Key Vault. The certificate to be imported can be in either PFX or PEM format.
   * If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates. This operation requires the certificates/import permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * // See: @azure/keyvault-secrets
   * const certificateSecret = await secretClient.getSecret("MyCertificate");
   * const base64EncodedCertificate = certificateSecret.value!;
   * let buffer: Uint8Array;
   *
   * if (isNode) {
   *   buffer = Buffer.from(base64EncodedCertificate, "base64");
   * } else {
   *   buffer = Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
   * }
   *
   * await client.importCertificate("MyCertificate", buffer);
   * ```
   * @summary Imports a certificate from a certificate's secret value
   * @param certificateName The name of the certificate
   * @param certificateBytes The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
   * @param {ImportCertificateOptions} [options] The optional parameters
   */
  public async importCertificate(
    certificateName: string,
    certificateBytes: Uint8Array,
    options: ImportCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("importCertificate", requestOptions);

    const base64EncodedCertificate = parseCertificateBytes(
      certificateBytes,
      options.policy?.contentType
    );

    let result: ImportCertificateResponse;

    try {
      result = await this.client.importCertificate(
        this.vaultUrl,
        certificateName,
        base64EncodedCertificate,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * The getCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * const policy = await client.getCertificatePolicy("MyCertificate");
   * console.log(policy);
   * ```
   * @summary Gets a certificate's policy
   * @param certificateName The name of the certificate
   * @param {GetCertificatePolicyOptions} [options] The optional parameters
   */
  public async getCertificatePolicy(
    certificateName: string,
    options: GetCertificatePolicyOptions = {}
  ): Promise<CertificatePolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificatePolicy", requestOptions);

    let result: GetCertificatePolicyResponse;

    try {
      result = await this.client.getCertificatePolicy(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return toPublicPolicy(result._response.parsedBody);
  }

  /**
   * Updates the certificate policy for the specified certificate. This operation requires the certificates/update permission.
   * @summary Gets a certificate's policy
   * @param certificateName The name of the certificate
   * @param policy The certificate policy
   * @param {UpdateCertificatePolicyOptions} [options] The optional parameters
   */
  public async updateCertificatePolicy(
    certificateName: string,
    policy: CertificatePolicy,
    options: UpdateCertificatePolicyOptions = {}
  ): Promise<CertificatePolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateCertificatePolicy", requestOptions);

    const corePolicy = toCorePolicy(undefined, policy);

    let result: UpdateCertificatePolicyResponse;
    try {
      result = await this.client.updateCertificatePolicy(
        this.vaultUrl,
        certificateName,
        corePolicy,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return toPublicPolicy(result._response.parsedBody);
  }

  /**
   * Applies the specified update on the given certificate; the only elements updated are the
   * certificate's attributes. This operation requires the certificates/update permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * await client.updateCertificateProperties("MyCertificate", "", {
   *   tags: {
   *     customTag: "value"
   *   }
   * });
   * ```
   * @summary Updates a certificate
   * @param certificateName The name of the certificate
   * @param version The version of the certificate to update
   * @param options The options, including what to update
   */
  public async updateCertificateProperties(
    certificateName: string,
    version: string,
    options: UpdateCertificatePropertiesOptions = {}
  ): Promise<KeyVaultCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateCertificateProperties", requestOptions);

    let result: UpdateCertificateResponse;

    try {
      result = await this.client.updateCertificate(
        this.vaultUrl,
        certificateName,
        version,
        {
          ...this.setParentSpan(span, requestOptions),
          certificateAttributes: toCoreAttributes(options)
        }
      );
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  /**
   * @internal
   * @ignore
   * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   *
   * @summary Cancels a certificate's operation
   * @param certificateName The name of the certificate
   * @param cancel Whether to cancel the operation or not
   * @param {CancelCertificateOperationOptions} [options] The optional parameters
   */
  private async cancelCertificateOperation(
    certificateName: string,
    options: CancelCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("cancelCertificateOperation", requestOptions);

    let result: UpdateCertificateOperationResponse;
    try {
      result = await this.client.updateCertificateOperation(
        this.vaultUrl,
        certificateName,
        true,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  /**
   * Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission.
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const createPoller = await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   *
   * const poller = await client.getCertificateOperation("MyCertificate");
   * const pendingCertificate = poller.getResult();
   *
   * const certificateOperation = poller.getOperationState().certificateOperation;
   * console.log(certificateOperation);
   * ```
   * @summary Gets a certificate's poller operation
   * @param certificateName The name of the certificate
   * @param {GetCertificateOperationOptions} [options] The optional parameters
   */
  public async getCertificateOperation(
    certificateName: string,
    options: GetCertificateOperationOptions = {}
  ): Promise<PollerLike<CertificateOperationState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new CertificateOperationPoller({
      certificateName,
      client: this.pollerClient,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });
    // This will initialize the poller's operation, which pre-populates some necessary properties.
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the creation operation for a specified certificate that is in the process of being created.
   * The certificate is no longer created. This operation requires the certificates/update permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * await client.deleteCertificateOperation("MyCertificate");
   * await client.getCertificateOperation("MyCertificate"); // Throws error: Pending certificate not found: "MyCertificate"
   * ```
   * @summary Delete a certificate's operation
   * @param certificateName The name of the certificate
   * @param {DeleteCertificateOperationOptions} [options] The optional parameters
   */
  public async deleteCertificateOperation(
    certificateName: string,
    options: DeleteCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("deleteCertificateOperation", requestOptions);

    let result: DeleteCertificateOperationResponse;

    try {
      result = await this.client.deleteCertificateOperation(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  /**
   * Performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Unknown",
   *   subject: "cn=MyCert"
   * });
   * const poller = await client.getCertificateOperation("MyCertificate");
   * const { csr } = poller.getOperationState().certificateOperation!;
   * const base64Csr = Buffer.from(csr!).toString("base64");
   * const wrappedCsr = ["-----BEGIN CERTIFICATE REQUEST-----", base64Csr, "-----END CERTIFICATE REQUEST-----"].join("\n");
   *
   * const fs = require("fs");
   * fs.writeFileSync("test.csr", wrappedCsr);
   *
   * // Certificate available locally made using:
   * //   openssl genrsa -out ca.key 2048
   * //   openssl req -new -x509 -key ca.key -out ca.crt
   * // You can read more about how to create a fake certificate authority here: https://gist.github.com/Soarez/9688998
   *
   * const childProcess = require("child_process");
   * childProcess.execSync("openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt");
   * const base64Crt = fs.readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");
   *
   * await client.mergeCertificate("MyCertificate", [Buffer.from(base64Crt)]);
   * ```
   * @summary Merges a signed certificate request into a pending certificate
   * @param certificateName The name of the certificate
   * @param x509Certificates The certificate(s) to merge
   * @param {MergeCertificateOptions} [options] The optional parameters
   */
  public async mergeCertificate(
    certificateName: string,
    x509Certificates: Uint8Array[],
    options: MergeCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("mergeCertificate", requestOptions);

    let result: MergeCertificateResponse;
    try {
      result = await this.client.mergeCertificate(
        this.vaultUrl,
        certificateName,
        x509Certificates,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return this.getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
  }

  /**
   * Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded.
   * This operation requires the certificates/backup permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * ```
   * @summary Generates a backup of a certificate
   * @param certificateName The name of the certificate
   * @param {BackupCertificateOptions} [options] The optional parameters
   */
  public async backupCertificate(
    certificateName: string,
    options: BackupCertificateOptions = {}
  ): Promise<Uint8Array | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("backupCertificate", requestOptions);

    let result: BackupCertificateResponse;
    try {
      result = await this.client.backupCertificate(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return result._response.parsedBody.value;
  }

  /**
   * Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.beginCreateCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subject: "cn=MyCert"
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * const poller = await client.beginDeleteCertificate("MyCertificate");
   * await poller.pollUntilDone();
   * // Some time is required before we're able to restore the certificate
   * await client.restoreCertificateBackup(backup!);
   * ```
   * @summary Restores a certificate from a backup
   * @param backup The back-up certificate to restore from
   * @param {RestoreCertificateBackupOptions} [options] The optional parameters
   */
  public async restoreCertificateBackup(
    backup: Uint8Array,
    options: RestoreCertificateBackupOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("restoreCertificate", requestOptions);

    let result: RestoreCertificateResponse;

    try {
      result = await this.client.restoreCertificate(
        this.vaultUrl,
        backup,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
  }

  private async *listDeletedCertificatesPage(
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<DeletedCertificate[]> {
    if (continuationState.continuationToken == null) {
      const requestOptionsComplete: KeyVaultClientGetDeletedCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getDeletedCertificates(
        this.vaultUrl,
        requestOptionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getDeletedCertificateFromItem);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedCertificates(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getDeletedCertificateFromItem);
      } else {
        break;
      }
    }
  }

  private async *listDeletedCertificatesAll(
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<DeletedCertificate> {
    const f = {};

    for await (const page of this.listDeletedCertificatesPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific
   * information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * for await (const deletedCertificate of client.listDeletedCertificates()) {
   *   console.log(deletedCertificate);
   * }
   * for await (const page of client.listDeletedCertificates().byPage()) {
   *   for (const deletedCertificate of page) {
   *     console.log(deletedCertificate);
   *   }
   * }
   * ```
   * @summary Lists deleted certificates
   * @param {ListDeletedCertificatesOptions} [options] The optional parameters
   */
  public listDeletedCertificates(
    options: ListDeletedCertificatesOptions = {}
  ): PagedAsyncIterableIterator<DeletedCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfDeletedCertificates", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listDeletedCertificatesAll(updatedOptions);

    span.end();
    const result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listDeletedCertificatesPage(settings, updatedOptions)
    };

    return result;
  }

  /**
   * retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
   * current deletion recovery level. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const deletedCertificate = await client.getDeletedCertificate("MyDeletedCertificate");
   * console.log("Deleted certificate:", deletedCertificate);
   * ```
   * @summary Gets a deleted certificate
   * @param certificateName The name of the certificate
   * @param {GetDeletedCertificateOptions} [options] The optional parameters
   */
  public async getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptions = {}
  ): Promise<DeletedCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getDeletedCertificate", requestOptions);

    let result: GetDeletedCertificateResponse;
    try {
      result = await this.client.getDeletedCertificate(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getDeletedCertificateFromDeletedCertificateBundle(result._response.parsedBody);
  }

  /**
   * Performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the
   * recovery level does not specify 'Purgeable'. This operation requires the certificate/purge permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * const deletePoller = await client.beginDeleteCertificate("MyCertificate");
   * await deletePoller.pollUntilDone();
   * // Deleting a certificate takes time, make sure to wait before purging it
   * client.purgeDeletedCertificate("MyCertificate");
   * ```
   * @summary Gets a deleted certificate
   * @param certificateName The name of the deleted certificate to purge
   * @param {PurgeDeletedCertificateOptions} [options] The optional parameters
   */
  public async purgeDeletedCertificate(
    certificateName: string,
    options: PurgeDeletedCertificateOptions = {}
  ): Promise<null> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("purgeDeletedCertificate", requestOptions);

    try {
      await this.client.purgeDeletedCertificate(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return null;
  }

  /**
   * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the certificate is fully recovered.
   *
   * This operation requires the certificates/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   *
   * const deletePoller = await client.beginDeleteCertificate("MyCertificate");
   * await deletePoller.pollUntilDone();
   *
   * const recoverPoller = await client.beginRecoverDeletedCertificate("MyCertificate");
   *
   * // Serializing the poller
   * const serialized = deletePoller.toString();
   *
   * // A new poller can be created with:
   * // const newPoller = await client.beginRecoverDeletedCertificate("MyCertificate", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const certificate = await recoverPoller.pollUntilDone();
   * console.log(certificate);
   * ```
   * @summary Recovers a deleted certificate
   * @param certificateName The name of the deleted certificate
   * @param {RecoverDeletedCertificateOptions} [options] The optional parameters
   */
  public async beginRecoverDeletedCertificate(
    certificateName: string,
    options: BeginRecoverDeletedCertificateOptions = {}
  ): Promise<PollerLike<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new RecoverDeletedCertificatePoller({
      certificateName,
      client: this.pollerClient,
      ...options,
      requestOptions
    });
    // This will initialize the poller's operation (the recovery of the deleted secret).
    await poller.poll();
    return poller;
  }

  /**
   * @internal
   * @ignore
   * Creates a new certificate. If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.
   * @summary Creates a certificate
   * @param certificateName The name of the certificate
   * @param certificatePolicy The certificate's policy
   * @param {CreateCertificateOptions} [options] Optional parameters
   */
  private async createCertificate(
    certificateName: string,
    certificatePolicy: CertificatePolicy,
    options: CreateCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("createCertificate", requestOptions);

    const id = options.id;
    const certificateAttributes = toCoreAttributes(options);
    const corePolicy = toCorePolicy(id, certificatePolicy, certificateAttributes);

    const updatedOptions = {
      ...this.setParentSpan(span, requestOptions),
      certificatePolicy: corePolicy,
      certificateAttributes
    };

    let result: CreateCertificateResponse;

    try {
      result = await this.client.createCertificate(this.vaultUrl, certificateName, updatedOptions);
    } finally {
      span.end();
    }

    return this.getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * @internal
   * @ignore
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   * @summary Deletes a certificate from a specified key vault.
   * @param certificateName The name of the certificate.
   * @param {DeleteCertificateOptions} [options] The optional parameters
   */
  private async deleteCertificate(
    certificateName: string,
    options: DeleteCertificateOptions = {}
  ): Promise<DeletedCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("deleteCertificate", requestOptions);

    let response: DeleteCertificateResponse;
    try {
      response = await this.client.deleteCertificate(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getDeletedCertificateFromDeletedCertificateBundle(response);
  }

  /**
   * @internal
   * @ignore
   * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
   * requires the certificate/recover permission.
   * @summary Recovers a deleted certificate
   * @param certificateName The name of the deleted certificate
   * @param {RecoverDeletedCertificateOptions} [options] The optional parameters
   */
  private async recoverDeletedCertificate(
    certificateName: string,
    options: RecoverDeletedCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("recoverDeletedCertificate", requestOptions);

    let result: RecoverDeletedCertificateResponse;

    try {
      result = await this.client.recoverDeletedCertificate(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
  }

  private getPropertiesFromCertificateBundle(
    certificateBundle: CertificateBundle
  ): CertificateProperties {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);
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
      recoverableDays: attributes.recoverableDays
    };

    return abstractProperties;
  }

  /**
   * @internal
   * @ignore
   * Gets the certificate operation.
   * @summary Gets the certificate operation
   * @param certificateName The name of the certificate
   * @param {GetPlainCertificateOperationOptions} [options] The optional parameters
   */
  private async getPlainCertificateOperation(
    certificateName: string,
    options?: GetPlainCertificateOperationOptions
  ): Promise<CertificateOperation> {
    const span = this.createSpan("getPlainCertificateOperation", options);

    let result: GetCertificateOperationResponse;

    try {
      result = await this.client.getCertificateOperation(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  private getCertificateFromCertificateBundle(
    certificateBundle: CertificateBundle
  ): KeyVaultCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

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
      recoverableDays: attributes.recoverableDays
    };

    return {
      keyId: certificateBundle.kid,
      secretId: certificateBundle.sid,
      name: parsedId.name,
      cer: certificateBundle.cer,
      properties: abstractProperties
    };
  }

  private getCertificateWithPolicyFromCertificateBundle(
    certificateBundle: CertificateBundle
  ): KeyVaultCertificateWithPolicy {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    const attributes: CertificateAttributes = certificateBundle.attributes || {};
    const policy = toPublicPolicy(certificateBundle.policy || {});

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
      recoverableDays: attributes.recoverableDays
    };

    return {
      keyId: certificateBundle.kid,
      secretId: certificateBundle.sid,
      name: parsedId.name,
      cer: certificateBundle.cer,
      policy,
      properties: abstractProperties
    };
  }

  private getDeletedCertificateFromDeletedCertificateBundle(
    certificateBundle: DeletedCertificateBundle
  ): DeletedCertificate {
    const certificate: KeyVaultCertificateWithPolicy = this.getCertificateWithPolicyFromCertificateBundle(
      certificateBundle
    );

    return {
      ...certificate,
      recoveryId: certificateBundle.recoveryId,
      scheduledPurgeDate: certificateBundle.scheduledPurgeDate,
      deletedOn: certificateBundle.deletedDate
    };
  }

  private getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", item.id);

    const attributes: any = item.attributes || {};

    const abstractProperties: any = {
      createdOn: attributes.created,
      updatedOn: attributes.updated,
      expiresOn: attributes.expires,
      ...parsedId,
      ...item,
      ...item.attributes
    };

    if (abstractProperties.deletedDate) {
      delete abstractProperties.deletedDate;
    }

    if (abstractProperties.expires) {
      delete abstractProperties.expires;
    }
    if (abstractProperties.created) {
      delete abstractProperties.created;
    }
    if (abstractProperties.updated) {
      delete abstractProperties.updated;
    }

    return {
      name: parsedId.name,
      properties: abstractProperties
    };
  }

  private getCertificateOperationFromCoreOperation(
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
      error: operation.error,
      id: operation.id,
      requestId: operation.requestId,
      status: operation.status,
      statusDetails: operation.statusDetails,
      target: operation.target,
      vaultUrl: vaultUrl
    };
  }

  private coreContactsToCertificateContacts(contacts: CoreContacts): CertificateContact[] {
    return contacts.contactList
      ? contacts.contactList.map(
          (x) => ({ email: x.emailAddress, phone: x.phone, name: x.name } as CertificateContact)
        )
      : [];
  }

  /**
   * Creates a span using the tracer that was set by the user
   * @param methodName The name of the method for which the span is being created.
   * @param requestOptions The options for the underlying http request.
   */
  private createSpan(methodName: string, requestOptions: RequestOptionsBase = {}): Span {
    const tracer = getTracer();
    const span = tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
    span.setAttribute("az.namespace", "Microsoft.KeyVault");
    return span;
  }

  /**
   * Returns updated HTTP options with the given span as the parent of future spans,
   * if applicable.
   * @param span The span for the current operation
   * @param options The options for the underlying http request
   */
  private setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
    if (span.isRecording()) {
      const spanOptions = options.spanOptions || {};
      return {
        ...options,
        spanOptions: {
          ...spanOptions,
          parent: span.context(),
          attributes: {
            ...spanOptions.attributes,
            "az.namespace": "Microsoft.KeyVault"
          }
        }
      };
    } else {
      return options;
    }
  }
}
