// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This file makes more sense if ordered based on how meaningful are some methods in relation to others.

/// <reference lib="esnext.asynciterable" />

import { InternalClientPipelineOptions } from "@azure/core-client";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

import { TokenCredential } from "@azure/core-auth";

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
  ErrorModel,
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
  ImportCertificatePolicy,
  KnownCertificateKeyCurveNames,
  KnownCertificateKeyTypes,
  KnownKeyUsageTypes,
  PollerLikeWithCancellation,
} from "./certificatesModels";

import {
  BackupCertificateResult,
  IssuerParameters,
  IssuerCredentials,
  IssuerAttributes,
  X509CertificateProperties,
  SubjectAlternativeNames as CoreSubjectAlternativeNames,
  ActionType,
  DeletionRecoveryLevel,
  JsonWebKeyType as CertificateKeyType,
  JsonWebKeyCurveName as CertificateKeyCurveName,
  DeletionRecoveryLevel as KnownDeletionRecoveryLevels,
  KeyUsageType,
  CertificateIssuerSetParameters,
  CertificateIssuerUpdateParameters,
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { createKeyVaultChallengeCallbacks } from "@azure/keyvault-common";
import { CreateCertificatePoller } from "./lro/create/poller";
import { CertificateOperationPoller } from "./lro/operation/poller";
import { DeleteCertificatePoller } from "./lro/delete/poller";
import { RecoverDeletedCertificatePoller } from "./lro/recover/poller";
import { CertificateOperationState } from "./lro/operation/operation";
import { DeleteCertificateState } from "./lro/delete/operation";
import { CreateCertificateState } from "./lro/create/operation";
import { RecoverDeletedCertificateState } from "./lro/recover/operation";
import { mapPagedAsyncIterable, parseCertificateBytes } from "./utils";
import { KeyVaultCertificateIdentifier, parseKeyVaultCertificateIdentifier } from "./identifier";
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
  toPublicPolicy,
} from "./transformations";
import { KeyVaultCertificatePollOperationState } from "./lro/keyVaultCertificatePoller";
import { tracingClient } from "./tracing";

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
  KeyVaultCertificateIdentifier,
  parseKeyVaultCertificateIdentifier,
  PollerLike,
  PollerLikeWithCancellation,
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
  KnownKeyUsageTypes,
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
   * @param vaultUrl - the base URL to the vault. You should validate that this URL references a valid Key Vault resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param clientOptions - Pipeline options used to configure Key Vault API requests.
   *                          Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    clientOptions: CertificateClientOptions = {},
  ) {
    this.vaultUrl = vaultUrl;

    const authPolicy = bearerTokenAuthenticationPolicy({
      credential,
      scopes: [],
      challengeCallbacks: createKeyVaultChallengeCallbacks(clientOptions),
    });

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...clientOptions,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version",
        ],
      },
    };

    this.client = new KeyVaultClient(this.vaultUrl, credential, {
      ...internalClientPipelineOptions,
      apiVersion: clientOptions.serviceVersion || LATEST_API_VERSION,
    });
    this.client.pipeline.addPolicy(authPolicy);
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
    options: ListPropertiesOfCertificatesOptions = {},
  ): PagedAsyncIterableIterator<CertificateProperties> {
    return mapPagedAsyncIterable(
      this.client.getCertificates(options),
      getPropertiesFromCertificateBundle,
    );
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
    options: ListPropertiesOfCertificateVersionsOptions = {},
  ): PagedAsyncIterableIterator<CertificateProperties> {
    return mapPagedAsyncIterable(
      this.client.getCertificateVersions(certificateName, options),
      getPropertiesFromCertificateBundle,
    );
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
    options: BeginDeleteCertificateOptions = {},
  ): Promise<PollerLike<DeleteCertificateState, DeletedCertificate>> {
    const poller = new DeleteCertificatePoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      ...options,
      operationOptions: options,
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
  public deleteContacts(
    options: DeleteContactsOptions = {},
  ): Promise<CertificateContact[] | undefined> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.deleteContacts",
      options,
      async (updatedOptions) => {
        await this.client.deleteCertificateContacts({
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return coreContactsToCertificateContacts(parsedBody);
      },
    );
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
  public setContacts(
    contacts: CertificateContact[],
    options: SetContactsOptions = {},
  ): Promise<CertificateContact[] | undefined> {
    const coreContacts = contacts.map((x) => ({
      emailAddress: x ? x.email : undefined,
      name: x ? x.name : undefined,
      phone: x ? x.phone : undefined,
    }));

    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.setContacts",
      options,
      async (updatedOptions) => {
        await this.client.setCertificateContacts(
          { contactList: coreContacts },
          {
            ...updatedOptions,
            onResponse: (response) => {
              parsedBody = response.parsedBody;
            },
          },
        );
        return coreContactsToCertificateContacts(parsedBody);
      },
    );
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
  public getContacts(options: GetContactsOptions = {}): Promise<CertificateContact[] | undefined> {
    return tracingClient.withSpan(
      "CertificateClient.getContacts",
      options,
      async (updatedOptions) => {
        const result = await this.client.getCertificateContacts(updatedOptions);
        return coreContactsToCertificateContacts(result);
      },
    );
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
    options: ListPropertiesOfIssuersOptions = {},
  ): PagedAsyncIterableIterator<IssuerProperties> {
    return this.client.getCertificateIssuers(options);
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
  public createIssuer(
    issuerName: string,
    provider: string,
    options: CreateIssuerOptions = {},
  ): Promise<CertificateIssuer> {
    return tracingClient.withSpan(
      "CertificateClient.createIssuer",
      options,
      async (updatedOptions) => {
        const { accountId, password } = updatedOptions;

        const params: CertificateIssuerSetParameters = {
          credentials: {
            accountId,
            password,
          },
          provider,
        };

        if (
          updatedOptions.organizationId ||
          (updatedOptions.administratorContacts && updatedOptions.administratorContacts.length)
        ) {
          params.organizationDetails = {
            id: updatedOptions.organizationId,
            adminDetails: updatedOptions.administratorContacts
              ? updatedOptions.administratorContacts.map((x) => ({
                  emailAddress: x.email,
                  phone: x.phone,
                  firstName: x.firstName,
                  lastName: x.lastName,
                }))
              : undefined,
          };
        }

        if (updatedOptions.enabled !== undefined) {
          params.attributes = {
            enabled: updatedOptions.enabled,
          };
        }

        let parsedBody: any;
        await this.client.setCertificateIssuer(issuerName, params, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return toPublicIssuer(parsedBody);
      },
    );
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
    options: UpdateIssuerOptions = {},
  ): Promise<CertificateIssuer> {
    return tracingClient.withSpan(
      "CertificateClient.updateIssuer",
      options,
      async (updatedOptions) => {
        const { accountId, password } = options;

        const params: CertificateIssuerUpdateParameters = {
          credentials: {
            accountId,
            password,
          },
        };

        if (
          updatedOptions.organizationId ||
          (updatedOptions.administratorContacts && updatedOptions.administratorContacts.length)
        ) {
          params.organizationDetails = {
            id: updatedOptions.organizationId,
            adminDetails: updatedOptions.administratorContacts
              ? updatedOptions.administratorContacts.map((x) => ({
                  emailAddress: x.email,
                  phone: x.phone,
                  firstName: x.firstName,
                  lastName: x.lastName,
                }))
              : undefined,
          };
        }

        if (updatedOptions.enabled) {
          params.attributes = {
            enabled: updatedOptions.enabled,
          };
        }

        let parsedBody: any;
        await this.client.updateCertificateIssuer(issuerName, params, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });

        return toPublicIssuer(parsedBody);
      },
    );
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
  public getIssuer(issuerName: string, options: GetIssuerOptions = {}): Promise<CertificateIssuer> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.getIssuer",
      options,
      async (updatedOptions) => {
        await this.client.getCertificateIssuer(issuerName, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return toPublicIssuer(parsedBody);
      },
    );
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
  public deleteIssuer(
    issuerName: string,
    options: DeleteIssuerOptions = {},
  ): Promise<CertificateIssuer> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.deleteIssuer",
      options,
      async (updatedOptions) => {
        await this.client.deleteCertificateIssuer(issuerName, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return toPublicIssuer(parsedBody);
      },
    );
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
    options: BeginCreateCertificateOptions = {},
  ): Promise<PollerLikeWithCancellation<CreateCertificateState, KeyVaultCertificateWithPolicy>> {
    const poller = new CreateCertificatePoller({
      vaultUrl: this.vaultUrl,
      client: this.client,
      certificateName,
      certificatePolicy: policy,
      createCertificateOptions: options,
      operationOptions: options,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
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
  public getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {},
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "CertificateClient.getCertificate",
      options,
      async (updatedOptions) => {
        const result = await this.client.getCertificate(certificateName, "", updatedOptions);
        return getCertificateWithPolicyFromCertificateBundle(result);
      },
    );
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
  public getCertificateVersion(
    certificateName: string,
    version: string,
    options: GetCertificateVersionOptions = {},
  ): Promise<KeyVaultCertificate> {
    return tracingClient.withSpan(
      "CertificateClient.getCertificateVersion",
      options,
      async (updatedOptions) => {
        if (!version) {
          throw new Error("The 'version' cannot be empty.");
        }
        const result = await this.client.getCertificate(certificateName, version, updatedOptions);
        return getCertificateFromCertificateBundle(result);
      },
    );
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
  public importCertificate(
    certificateName: string,
    certificateBytes: Uint8Array,
    options: ImportCertificateOptions = {},
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "CertificateClient.importCertificate",
      options,
      async (updatedOptions) => {
        const base64EncodedCertificate = parseCertificateBytes(
          certificateBytes,
          updatedOptions.policy?.contentType,
        );
        const result = await this.client.importCertificate(
          certificateName,
          { base64EncodedCertificate },
          updatedOptions,
        );
        return getCertificateWithPolicyFromCertificateBundle(result);
      },
    );
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
  public getCertificatePolicy(
    certificateName: string,
    options: GetCertificatePolicyOptions = {},
  ): Promise<CertificatePolicy> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.getCertificatePolicy",
      options,
      async (updatedOptions) => {
        await this.client.getCertificatePolicy(certificateName, {
          ...updatedOptions,
          onResponse: (res) => {
            parsedBody = res.parsedBody;
          },
        });
        return toPublicPolicy(parsedBody);
      },
    );
  }

  /**
   * Updates the certificate policy for the specified certificate. This operation requires the certificates/update permission.
   * Gets a certificate's policy
   * @param certificateName - The name of the certificate
   * @param policy - The certificate policy
   * @param options - The optional parameters
   */
  public updateCertificatePolicy(
    certificateName: string,
    policy: CertificatePolicy,
    options: UpdateCertificatePolicyOptions = {},
  ): Promise<CertificatePolicy> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.updateCertificatePolicy",
      options,
      async (updatedOptions) => {
        const corePolicy = toCorePolicy(undefined, policy);
        await this.client.updateCertificatePolicy(certificateName, corePolicy, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return toPublicPolicy(parsedBody);
      },
    );
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
   *
   * // You may pass an empty string for version which will update
   * // the latest version of the certificate
   * await client.updateCertificateProperties("MyCertificate", "", {
   *   tags: {
   *     customTag: "value"
   *   }
   * });
   * ```
   * Updates a certificate
   * @param certificateName - The name of the certificate
   * @param version - The version of the certificate to update (an empty string will update the latest version)
   * @param options - The options, including what to update
   */
  public updateCertificateProperties(
    certificateName: string,
    version: string,
    options: UpdateCertificatePropertiesOptions = {},
  ): Promise<KeyVaultCertificate> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.updateCertificateProperties",
      options,
      async (updatedOptions) => {
        await this.client.updateCertificate(
          certificateName,
          version,
          {
            ...updatedOptions,
            certificateAttributes: toCoreAttributes(options),
          },
          {
            onResponse: (response) => {
              parsedBody = response.parsedBody;
            },
          },
        );
        return getCertificateFromCertificateBundle(parsedBody);
      },
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
   * Gets a certificate's poller operation
   * @param certificateName - The name of the certificate
   * @param options - The optional parameters
   */
  public async getCertificateOperation(
    certificateName: string,
    options: GetCertificateOperationOptions = {},
  ): Promise<PollerLikeWithCancellation<CertificateOperationState, KeyVaultCertificateWithPolicy>> {
    const poller = new CertificateOperationPoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      operationOptions: options,
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
  public deleteCertificateOperation(
    certificateName: string,
    options: DeleteCertificateOperationOptions = {},
  ): Promise<CertificateOperation> {
    return tracingClient.withSpan(
      "CertificateClient.deleteCertificateOperation",
      options,
      async (updatedOptions) => {
        let parsedBody: any;
        await this.client.deleteCertificateOperation(certificateName, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return getCertificateOperationFromCoreOperation(certificateName, this.vaultUrl, parsedBody);
      },
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
  public mergeCertificate(
    certificateName: string,
    x509Certificates: Uint8Array[],
    options: MergeCertificateOptions = {},
  ): Promise<KeyVaultCertificateWithPolicy> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.mergeCertificate",
      options,
      async (updatedOptions) => {
        await this.client.mergeCertificate(
          certificateName,
          { x509Certificates },
          {
            ...updatedOptions,
            onResponse: (response) => {
              parsedBody = response.parsedBody;
            },
          },
        );
        return getCertificateWithPolicyFromCertificateBundle(parsedBody);
      },
    );
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
  public backupCertificate(
    certificateName: string,
    options: BackupCertificateOptions = {},
  ): Promise<Uint8Array | undefined> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.backupCertificate",
      options,
      async (updatedOptions) => {
        await this.client.backupCertificate(certificateName, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return parsedBody.value;
      },
    );
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
  public restoreCertificateBackup(
    backup: Uint8Array,
    options: RestoreCertificateBackupOptions = {},
  ): Promise<KeyVaultCertificateWithPolicy> {
    let parsedBody: any;
    return tracingClient.withSpan(
      "CertificateClient.restoreCertificateBackup",
      options,
      async (updatedOptions) => {
        await this.client.restoreCertificate(
          { certificateBundleBackup: backup },
          {
            ...updatedOptions,
            onResponse: (response) => {
              parsedBody = response.parsedBody;
            },
          },
        );
        return getCertificateWithPolicyFromCertificateBundle(parsedBody);
      },
    );
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
    options: ListDeletedCertificatesOptions = {},
  ): PagedAsyncIterableIterator<DeletedCertificate> {
    return mapPagedAsyncIterable(
      this.client.getDeletedCertificates(options),
      getDeletedCertificateFromItem,
    );
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
  public getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptions = {},
  ): Promise<DeletedCertificate> {
    return tracingClient.withSpan(
      "CertificateClient.getDeletedCertificate",
      options,
      async (updatedOptions) => {
        let parsedBody: any;
        await this.client.getDeletedCertificate(certificateName, {
          ...updatedOptions,
          onResponse: (response) => {
            parsedBody = response.parsedBody;
          },
        });
        return getDeletedCertificateFromDeletedCertificateBundle(parsedBody);
      },
    );
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
    options: PurgeDeletedCertificateOptions = {},
  ): Promise<null> {
    return tracingClient.withSpan(
      "CertificateClient.purgeDeletedCertificate",
      options,
      async (updatedOptions) => {
        await this.client.purgeDeletedCertificate(certificateName, updatedOptions);
        return null;
      },
    );
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
    options: BeginRecoverDeletedCertificateOptions = {},
  ): Promise<PollerLike<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy>> {
    const poller = new RecoverDeletedCertificatePoller({
      certificateName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      ...options,
      operationOptions: options,
    });
    // This will initialize the poller's operation (the recovery of the deleted secret).
    await poller.poll();
    return poller;
  }
}
