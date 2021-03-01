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
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";

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
  CertificateIssuer,
  CertificateContact,
  CertificateContentType,
  CertificatePolicy,
  CertificateProperties,
  CreateCertificateOptions,
  DeleteCertificateOperationOptions,
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
  ListPropertiesOfCertificatesOptions,
  ListPropertiesOfCertificateVersionsOptions,
  ListPropertiesOfIssuersOptions,
  ListDeletedCertificatesOptions,
  MergeCertificateOptions,
  PurgeDeletedCertificateOptions,
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
  LATEST_API_VERSION,
  CancelCertificateOperationOptions,
  ImportCertificatePolicy
} from "./certificatesModels";

import {
  KeyVaultClientGetCertificatesOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  BackupCertificateResult,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  ErrorModel,
  IssuerParameters,
  IssuerCredentials,
  IssuerAttributes,
  X509CertificateProperties,
  KeyVaultClientDeleteCertificateContactsResponse,
  KeyVaultClientSetCertificateContactsResponse,
  KeyVaultClientGetCertificateContactsResponse,
  KeyVaultClientSetCertificateIssuerResponse,
  KeyVaultClientUpdateCertificateIssuerResponse,
  KeyVaultClientGetCertificateIssuerResponse,
  KeyVaultClientDeleteCertificateIssuerResponse,
  KeyVaultClientGetCertificateResponse,
  KeyVaultClientImportCertificateResponse,
  KeyVaultClientGetCertificatePolicyResponse,
  KeyVaultClientUpdateCertificatePolicyResponse,
  KeyVaultClientUpdateCertificateResponse,
  KeyVaultClientDeleteCertificateOperationResponse,
  KeyVaultClientMergeCertificateResponse,
  KeyVaultClientBackupCertificateResponse,
  KeyVaultClientRestoreCertificateResponse,
  KeyVaultClientGetDeletedCertificateResponse,
  SubjectAlternativeNames as CoreSubjectAlternativeNames,
  ActionType,
  DeletionRecoveryLevel,
  JsonWebKeyType as CertificateKeyType,
  KnownJsonWebKeyType as KnownCertificateKeyTypes,
  JsonWebKeyCurveName as CertificateKeyCurveName,
  KnownJsonWebKeyCurveName as KnownCertificateKeyCurveNames,
  KnownDeletionRecoveryLevel as KnownDeletionRecoveryLevels,
  KeyUsageType,
  KnownKeyUsageType as KnownKeyUsageTypes
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { SDK_VERSION } from "./constants";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { createSpan } from "./tracing";
import { CreateCertificatePoller } from "./lro/create/poller";
import { CertificateOperationPoller } from "./lro/operation/poller";
import { DeleteCertificatePoller } from "./lro/delete/poller";
import { RecoverDeletedCertificatePoller } from "./lro/recover/poller";
import { CertificateOperationState } from "./lro/operation/operation";
import { DeleteCertificateState } from "./lro/delete/operation";
import { CreateCertificateState } from "./lro/create/operation";
import { RecoverDeletedCertificateState } from "./lro/recover/operation";
import { parseCertificateBytes } from "./utils";
import { KeyVaultCertificateId } from "./identifier";
import {
  coreContactsToCertificateContacts,
  getCertificateFromCertificateBundle,
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
  getDeletedCertificateFromDeletedCertificateBundle,
  getDeletedCertificateFromItem,
  getPropertiesFromCertificateBundle,
  toCoreAttributes,
  toCorePolicy,
  toPublicIssuer,
  toPublicPolicy
} from "./transformations";
import { KeyVaultCertificatePollOperationState } from "./lro/keyVaultCertificatePoller";

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
  ImportCertificatePolicy,
  CertificatePolicyAction,
  CertificatePolicyProperties,
  PolicySubjectProperties,
  CertificateTags,
  CreateCertificateOptions,
  CertificatePollerOptions,
  KeyVaultCertificateId,
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
  logger,
  CancelCertificateOperationOptions,
  KeyVaultCertificatePollOperationState,
  KnownCertificateKeyCurveNames,
  KnownDeletionRecoveryLevels,
  KnownCertificateKeyTypes,
  KnownKeyUsageTypes
};

/**
 * Deprecated KeyVault copy of core-lro's PollerLike.
 */
// eslint-disable-next-line no-use-before-define
export type KVPollerLike<TState extends PollOperationState<TResult>, TResult> = PollerLike<
  TState,
  TResult
>;

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
   * Creates an instance of CertificateClient.
   * @param vaultUrl - the base URL to the vault.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests.
   *                          Omit this parameter to use the default pipeline configuration.
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

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version"
        ]
      }
    };

    this.client = new KeyVaultClient(
      pipelineOptions.serviceVersion || LATEST_API_VERSION,
      createPipelineFromOptions(internalPipelineOptions, authPolicy)
    );
  }

  private async *listPropertiesOfCertificatesPage(
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<CertificateProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        includePending: options.includePending,
        ...options
      };
      const currentSetResponse = await this.client.getCertificates(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getPropertiesFromCertificateBundle, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificates(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getPropertiesFromCertificateBundle, this);
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
   * List all versions of the specified certificate.
   * @param options - The optional parameters
   */
  public listPropertiesOfCertificates(
    options: ListPropertiesOfCertificatesOptions = {}
  ): PagedAsyncIterableIterator<CertificateProperties> {
    const { span, updatedOptions } = createSpan("listPropertiesOfCertificates", options);
    const iter = this.listPropertiesOfCertificatesAll(
      operationOptionsToRequestOptionsBase(updatedOptions)
    );

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
        yield currentSetResponse.value.map(getPropertiesFromCertificateBundle, this);
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
        yield currentSetResponse.value.map(getPropertiesFromCertificateBundle, this);
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
   * List the versions of a certificate.
   * @param certificateName - The name of the certificate.
   * @param options - The optional parameters
   */
  public listPropertiesOfCertificateVersions(
    certificateName: string,
    options: ListPropertiesOfCertificateVersionsOptions = {}
  ): PagedAsyncIterableIterator<CertificateProperties> {
    const { span, updatedOptions } = createSpan("listPropertiesOfCertificateVersions", options);
    const iter = this.listPropertiesOfCertificateVersionsAll(
      certificateName,
      operationOptionsToRequestOptionsBase(updatedOptions)
    );

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
   * Deletes a certificate from a specified key vault.
   * @param certificateName - The name of the certificate.
   * @param options - The optional parameters
   */
  public async beginDeleteCertificate(
    certificateName: string,
    options: BeginDeleteCertificateOptions = {}
  ): Promise<PollerLike<DeleteCertificateState, DeletedCertificate>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new DeleteCertificatePoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
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
   * Deletes all of the certificate contacts
   * @param options - The optional parameters
   */
  public async deleteContacts(
    options: DeleteContactsOptions = {}
  ): Promise<CertificateContact[] | undefined> {
    const { span, updatedOptions } = createSpan("deleteContacts", options);

    let result: KeyVaultClientDeleteCertificateContactsResponse;

    try {
      result = await this.client.deleteCertificateContacts(this.vaultUrl, updatedOptions);
    } finally {
      span.end();
    }

    return coreContactsToCertificateContacts(result._response.parsedBody);
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
   * Sets the certificate contacts.
   * @param contacts - The contacts to use
   * @param options - The optional parameters
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

    const { span, updatedOptions } = createSpan("setCertificateContacts", options);

    let result: KeyVaultClientSetCertificateContactsResponse;

    try {
      result = await this.client.setCertificateContacts(
        this.vaultUrl,
        { contactList: coreContacts },
        updatedOptions
      );
    } finally {
      span.end();
    }
    return coreContactsToCertificateContacts(result._response.parsedBody);
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
   * Sets the certificate contacts.
   * @param options - The optional parameters
   */
  public async getContacts(
    options: GetContactsOptions = {}
  ): Promise<CertificateContact[] | undefined> {
    const { span, updatedOptions } = createSpan("getCertificateContacts", options);

    let result: KeyVaultClientGetCertificateContactsResponse;
    try {
      result = await this.client.getCertificateContacts(this.vaultUrl, updatedOptions);
    } finally {
      span.end();
    }

    return coreContactsToCertificateContacts(result);
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
   * List the certificate issuers.
   * @param options - The optional parameters
   */
  public listPropertiesOfIssuers(
    options: ListPropertiesOfIssuersOptions = {}
  ): PagedAsyncIterableIterator<IssuerProperties> {
    const { span, updatedOptions } = createSpan("listIssuers", options);
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
   * Sets the specified certificate issuer.
   * @param issuerName - The name of the issuer.
   * @param provider - The issuer provider.
   * @param options - The optional parameters
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

    const { span, updatedOptions } = createSpan("createIssuer", unflattenedOptions);
    const credentials: IssuerCredentials = updatedOptions.credentials || {};

    const generatedOptions: KeyVaultClientSetCertificateIssuerOptionalParams = {
      ...updatedOptions
    };

    generatedOptions.credentials = {
      accountId: credentials.accountId || updatedOptions.accountId,
      password: credentials.password || updatedOptions.password
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

    let result: KeyVaultClientSetCertificateIssuerResponse;

    try {
      result = await this.client.setCertificateIssuer(
        this.vaultUrl,
        issuerName,
        provider,
        generatedOptions
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
   * Updates the specified certificate issuer.
   * @param issuerName - The name of the issuer.
   * @param options - The optional parameters
   */
  public async updateIssuer(
    issuerName: string,
    options: UpdateIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const { span, updatedOptions } = createSpan("updateIssuer", options);

    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const credentials: IssuerCredentials = requestOptions.credentials || {};

    const generatedOptions: KeyVaultClientSetCertificateIssuerOptionalParams = {
      ...updatedOptions
    };

    generatedOptions.credentials = {
      accountId: credentials.accountId || updatedOptions.accountId,
      password: credentials.password || updatedOptions.password
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

    let result: KeyVaultClientUpdateCertificateIssuerResponse;

    try {
      result = await this.client.updateCertificateIssuer(
        this.vaultUrl,
        issuerName,
        generatedOptions
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
   * Gets he specified certificate issuer.
   * @param issuerName - The name of the issuer.
   * @param options - The optional parameters
   */
  public async getIssuer(
    issuerName: string,
    options: GetIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const { span, updatedOptions } = createSpan("getCertificateIssuer", options);

    let result: KeyVaultClientGetCertificateIssuerResponse;

    try {
      result = await this.client.getCertificateIssuer(this.vaultUrl, issuerName, updatedOptions);
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
   * Deletes the specified certificate issuer.
   * @param issuerName - The name of the issuer.
   * @param options - The optional parameters
   */
  public async deleteIssuer(
    issuerName: string,
    options: DeleteIssuerOptions = {}
  ): Promise<CertificateIssuer> {
    const { span, updatedOptions } = createSpan("deleteCertificateIssuer", options);

    let result: KeyVaultClientDeleteCertificateIssuerResponse;

    try {
      result = await this.client.deleteCertificateIssuer(this.vaultUrl, issuerName, updatedOptions);
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
   * Creates a certificate
   * @param certificateName - The name of the certificate
   * @param certificatePolicy - The certificate's policy
   * @param options - Optional parameters
   */
  public async beginCreateCertificate(
    certificateName: string,
    policy: CertificatePolicy,
    options: BeginCreateCertificateOptions = {}
  ): Promise<PollerLike<CreateCertificateState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new CreateCertificatePoller({
      vaultUrl: this.vaultUrl,
      client: this.client,
      certificateName,
      certificatePolicy: policy,
      createCertificateOptions: options,
      requestOptions,
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
   * Retrieves a certificate from the certificate's name (includes the certificate policy)
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const { span, updatedOptions } = createSpan("getCertificate", options);

    let result: KeyVaultClientGetCertificateResponse;

    try {
      result = await this.client.getCertificate(this.vaultUrl, certificateName, "", updatedOptions);
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
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
   * Retrieves a certificate from the certificate's name and a specified version
   * @param certificateName - The name of the certificate
   * @param version - The specific version of the certificate
   * @param options - The optional parameters
   */
  public async getCertificateVersion(
    certificateName: string,
    version: string,
    options: GetCertificateVersionOptions = {}
  ): Promise<KeyVaultCertificate> {
    if (!version) {
      throw new Error("The 'version' cannot be empty.");
    }

    const { span, updatedOptions } = createSpan("getCertificateVersion", options);

    let result: KeyVaultClientGetCertificateResponse;

    try {
      result = await this.client.getCertificate(
        this.vaultUrl,
        certificateName,
        version,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getCertificateFromCertificateBundle(result);
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
   * Imports a certificate from a certificate's secret value
   * @param certificateName - The name of the certificate
   * @param certificateBytes - The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
   * @param options - The optional parameters
   */
  public async importCertificate(
    certificateName: string,
    certificateBytes: Uint8Array,
    options: ImportCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const { span, updatedOptions } = createSpan("importCertificate", options);

    const base64EncodedCertificate = parseCertificateBytes(
      certificateBytes,
      options.policy?.contentType
    );

    let result: KeyVaultClientImportCertificateResponse;

    try {
      result = await this.client.importCertificate(
        this.vaultUrl,
        certificateName,
        base64EncodedCertificate,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
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
   * Gets a certificate's policy
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async getCertificatePolicy(
    certificateName: string,
    options: GetCertificatePolicyOptions = {}
  ): Promise<CertificatePolicy> {
    const { span, updatedOptions } = createSpan("getCertificatePolicy", options);

    let result: KeyVaultClientGetCertificatePolicyResponse;

    try {
      result = await this.client.getCertificatePolicy(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return toPublicPolicy(result._response.parsedBody);
  }

  /**
   * Updates the certificate policy for the specified certificate. This operation requires the certificates/update permission.
   * Gets a certificate's policy
   * @param certificateName - The name of the certificate
   * @param policy - The certificate policy
   * @param options - The optional parameters
   */
  public async updateCertificatePolicy(
    certificateName: string,
    policy: CertificatePolicy,
    options: UpdateCertificatePolicyOptions = {}
  ): Promise<CertificatePolicy> {
    const { span, updatedOptions } = createSpan("updateCertificatePolicy", options);

    const corePolicy = toCorePolicy(undefined, policy);

    let result: KeyVaultClientUpdateCertificatePolicyResponse;
    try {
      result = await this.client.updateCertificatePolicy(
        this.vaultUrl,
        certificateName,
        corePolicy,
        updatedOptions
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
   * Updates a certificate
   * @param certificateName - The name of the certificate
   * @param version - The version of the certificate to update
   * @param options - The options, including what to update
   */
  public async updateCertificateProperties(
    certificateName: string,
    version: string,
    options: UpdateCertificatePropertiesOptions = {}
  ): Promise<KeyVaultCertificate> {
    const { span, updatedOptions } = createSpan("updateCertificateProperties", options);

    let result: KeyVaultClientUpdateCertificateResponse;

    try {
      result = await this.client.updateCertificate(this.vaultUrl, certificateName, version, {
        ...updatedOptions,
        certificateAttributes: toCoreAttributes(options)
      });
    } finally {
      span.end();
    }

    return getCertificateFromCertificateBundle(result._response.parsedBody);
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
   * Gets a certificate's poller operation
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async getCertificateOperation(
    certificateName: string,
    options: GetCertificateOperationOptions = {}
  ): Promise<PollerLike<CertificateOperationState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new CertificateOperationPoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
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
   * Delete a certificate's operation
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async deleteCertificateOperation(
    certificateName: string,
    options: DeleteCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    const { span, updatedOptions } = createSpan("deleteCertificateOperation", options);

    let result: KeyVaultClientDeleteCertificateOperationResponse;

    try {
      result = await this.client.deleteCertificateOperation(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getCertificateOperationFromCoreOperation(
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
   * Merges a signed certificate request into a pending certificate
   * @param certificateName - The name of the certificate
   * @param x509Certificates - The certificate(s) to merge
   * @param options - The optional parameters
   */
  public async mergeCertificate(
    certificateName: string,
    x509Certificates: Uint8Array[],
    options: MergeCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const { span, updatedOptions } = createSpan("mergeCertificate", options);

    let result: KeyVaultClientMergeCertificateResponse;
    try {
      result = await this.client.mergeCertificate(
        this.vaultUrl,
        certificateName,
        x509Certificates,
        updatedOptions
      );
    } finally {
      span.end();
    }
    return getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
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
   * Generates a backup of a certificate
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async backupCertificate(
    certificateName: string,
    options: BackupCertificateOptions = {}
  ): Promise<Uint8Array | undefined> {
    const { span, updatedOptions } = createSpan("backupCertificate", options);

    let result: KeyVaultClientBackupCertificateResponse;
    try {
      result = await this.client.backupCertificate(this.vaultUrl, certificateName, updatedOptions);
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
   * Restores a certificate from a backup
   * @param backup - The back-up certificate to restore from
   * @param options - The optional parameters
   */
  public async restoreCertificateBackup(
    backup: Uint8Array,
    options: RestoreCertificateBackupOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const { span, updatedOptions } = createSpan("restoreCertificate", options);

    let result: KeyVaultClientRestoreCertificateResponse;

    try {
      result = await this.client.restoreCertificate(this.vaultUrl, backup, updatedOptions);
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
  }

  private async *listDeletedCertificatesPage(
    continuationState: PageSettings,
    options: RequestOptionsBase = {}
  ): AsyncIterableIterator<DeletedCertificate[]> {
    if (continuationState.continuationToken == null) {
      const requestOptionsComplete: KeyVaultClientGetDeletedCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        includePending: options.includePending,
        ...options
      };
      const currentSetResponse = await this.client.getDeletedCertificates(
        this.vaultUrl,
        requestOptionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getDeletedCertificateFromItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedCertificates(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getDeletedCertificateFromItem, this);
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
   * Lists deleted certificates
   * @param options - The optional parameters
   */
  public listDeletedCertificates(
    options: ListDeletedCertificatesOptions = {}
  ): PagedAsyncIterableIterator<DeletedCertificate> {
    const { span, updatedOptions } = createSpan("listPropertiesOfDeletedCertificates", options);

    const requestOptions = operationOptionsToRequestOptionsBase(updatedOptions);
    const iter = this.listDeletedCertificatesAll(requestOptions);

    span.end();
    const result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listDeletedCertificatesPage(settings, requestOptions)
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
   * Gets a deleted certificate
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptions = {}
  ): Promise<DeletedCertificate> {
    const { span, updatedOptions } = createSpan("getDeletedCertificate", options);

    let result: KeyVaultClientGetDeletedCertificateResponse;
    try {
      result = await this.client.getDeletedCertificate(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getDeletedCertificateFromDeletedCertificateBundle(result._response.parsedBody);
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
   * Gets a deleted certificate
   * @param certificateName - The name of the deleted certificate to purge
   * @param options - The optional parameters
   */
  public async purgeDeletedCertificate(
    certificateName: string,
    options: PurgeDeletedCertificateOptions = {}
  ): Promise<null> {
    const { span, updatedOptions } = createSpan("purgeDeletedCertificate", options);

    try {
      await this.client.purgeDeletedCertificate(this.vaultUrl, certificateName, updatedOptions);
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
   * Recovers a deleted certificate
   * @param certificateName - The name of the deleted certificate
   * @param options - The optional parameters
   */
  public async beginRecoverDeletedCertificate(
    certificateName: string,
    options: BeginRecoverDeletedCertificateOptions = {}
  ): Promise<PollerLike<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new RecoverDeletedCertificatePoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      ...options,
      requestOptions
    });
    // This will initialize the poller's operation (the recovery of the deleted secret).
    await poller.poll();
    return poller;
  }
}
