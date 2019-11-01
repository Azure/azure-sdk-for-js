import {
  TokenCredential,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  signingPolicy,
  RequestOptionsBase,
  PipelineOptions,
  createPipelineFromOptions,
} from "@azure/core-http";

import { getTracer, Span } from "@azure/core-tracing";
import { logger } from "./log";

import {
  KeyVaultCertificate,
  BackupCertificateOptions,
  CancelCertificateOperationOptions,
  CertificateIssuer,
  CertificateContentType,
  CertificatePolicy,
  CertificateProperties,
  CreateCertificateOptions,
  DeleteCertificateOperationOptions,
	DeleteCertificateOptions,
	DeleteCertificateContactsOptions,
  DeleteCertificateIssuerOptions,
  DeletedCertificate,
  GetCertificateContactsOptions,
  GetCertificateIssuerOptions,
  GetCertificateOperationOptions,
  GetCertificateOptions,
  GetCertificatePolicyOptions,
  GetCertificateWithPolicyOptions,
  GetDeletedCertificateOptions,
  CertificateTags,
	ListCertificatesOptions,
	ListCertificateVersionsOptions,
	ListCertificateIssuersOptions,
  ListDeletedCertificatesOptions,
  MergeCertificateOptions,
  PurgeDeletedCertificateOptions,
  RecoverDeletedCertificateOptions,
  RestoreCertificateOptions,
  SetCertificateContactsOptions,
  SetCertificateIssuerOptions,
  SubjectAlternativeNames,
  UpdateCertificateIssuerOptions,
  UpdateCertificateOptions,
  UpdateCertificatePolicyOptions
} from "./certificatesModels";
import {
  CertificateBundle,
  Contacts,
  KeyVaultClientCreateCertificateOptionalParams,
  KeyVaultClientGetCertificatesOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientUpdateCertificateOptionalParams,
  CertificateOperation,
  CertificatePolicy as CoreCertificatePolicy,
  BackupCertificateResult,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  DeletedCertificateItem,
  DeletedCertificateBundle,
  Contact,
  ErrorModel,
  IssuerParameters,
  IssuerCredentials,
  IssuerAttributes,
  JsonWebKeyType as KeyType,
  JsonWebKeyCurveName as KeyCurveName,
  KeyProperties,
  KeyUsageType,
  LifetimeAction,
  OrganizationDetails,
  SecretProperties,
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
  CertificateAttributes,
  Action,
  Trigger,
  AdministratorDetails,
  ActionType,
  Attributes,
  DeletionRecoveryLevel
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { SDK_VERSION } from "./core/utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";

export {
  Action,
  ActionType,
  AdministratorDetails,
  Attributes,
  BackupCertificateResult,
  KeyVaultCertificate,
  BackupCertificateOptions,
  CancelCertificateOperationOptions,
  CertificateAttributes,
  CertificateContentType,
  CertificateProperties,
  CertificateIssuer,
  CertificateOperation,
  CertificatePolicy,
  CertificateTags,
  CoreCertificatePolicy,
  CoreSubjectAlternativeNames,
  Contact,
  Contacts,
  CreateCertificateOptions,
  DeleteCertificateOperationOptions,
	DeleteCertificateOptions,
	DeleteCertificateContactsOptions,
  DeleteCertificateIssuerOptions,
  DeletedCertificate,
  DeletionRecoveryLevel,
  ErrorModel,
  GetCertificateContactsOptions,
  GetCertificateIssuerOptions,
  GetCertificateOperationOptions,
  GetCertificateOptions,
  GetCertificatePolicyOptions,
  GetCertificateWithPolicyOptions,
  GetDeletedCertificateOptions,
  IssuerAttributes,
  IssuerCredentials,
  IssuerParameters,
  KeyType,
  KeyCurveName,
  KeyProperties,
  KeyUsageType,
  KeyVaultClientCreateCertificateOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateOptionalParams,
  LifetimeAction,
	ListCertificatesOptions,
	ListCertificateVersionsOptions,
	ListCertificateIssuersOptions,
  ListDeletedCertificatesOptions,
  MergeCertificateOptions,
  OrganizationDetails,
  PipelineOptions,
  RecoverDeletedCertificateOptions,
  RestoreCertificateOptions,
  SecretProperties,
  SetCertificateContactsOptions,
  SetCertificateIssuerOptions,
  SubjectAlternativeNames,
  Trigger,
  UpdateCertificateIssuerOptions,
  UpdateCertificateOptions,
  UpdateCertificatePolicyOptions,
  X509CertificateProperties,
  logger
};

// This is part of constructing the autogenerated client. In the future, it should not
// be required. See also: https://github.com/Azure/azure-sdk-for-js/issues/5508
const SERVICE_API_VERSION = "7.0";

function toCorePolicy(p: CertificatePolicy = {}): CoreCertificatePolicy {
  let subjectAlternativeNames: CoreSubjectAlternativeNames = {};
  if (p.subjectAlternativeNames) {
    const propertyName = p.subjectAlternativeNames.subjectType;
    subjectAlternativeNames = {
      [propertyName]: p.subjectAlternativeNames.subjectValues
    };
  }

  return {
    id: p.id,
    lifetimeActions: p.lifetimeActions,
    keyProperties: {
      exportable: p.exportable,
      keyType: p.keyType,
      keySize: p.keySize,
      reuseKey: p.reuseKey,
      curve: p.keyCurveType
    },
    secretProperties: {
      contentType: p.contentType
    },
    x509CertificateProperties: {
      subject: p.subjectName,
      ekus: p.ekus,
      subjectAlternativeNames,
      keyUsage: p.keyUsage,
      validityInMonths: p.validityInMonths
    },
    issuerParameters: {
      name: p.issuerName,
      certificateType: p.certificateType,
      certificateTransparency: p.certificateTransparency
    },
    attributes: {
      recoveryLevel: p.recoveryLevel
    }
  };
}

function toPublicPolicy(p: CoreCertificatePolicy = {}): CertificatePolicy {
  let optionalProperties: CertificatePolicy = {};
  if (p.keyProperties && p.keyProperties.curve) {
    optionalProperties.keyCurveType = p.keyProperties.curve;
  }
  if (p.issuerParameters && p.issuerParameters.name) {
    optionalProperties.issuerName = p.issuerParameters && p.issuerParameters.name;
  }
  if (p.x509CertificateProperties) {
    const x509Properties: X509CertificateProperties = p.x509CertificateProperties || {};
    let subjectAlternativeNames: SubjectAlternativeNames | undefined;
    if (x509Properties.subjectAlternativeNames) {
      const names = x509Properties.subjectAlternativeNames;
      subjectAlternativeNames = {
        subjectType: names.emails ? "emails" : names.dnsNames ? "dnsNames" : "upns",
        subjectValues: names.emails || names.dnsNames || names.upns || []
      };
    }
    optionalProperties = {
      ...optionalProperties,
      subjectName: x509Properties.subject,
      ekus: x509Properties.ekus,
      subjectAlternativeNames,
      keyUsage: x509Properties.keyUsage,
      validityInMonths: x509Properties.validityInMonths
    };
  }

  return {
    id: p.id,
    lifetimeActions: p.lifetimeActions,
    ...optionalProperties,
    ...p.keyProperties,
    ...p.secretProperties,
    ...p.issuerParameters,
    ...p.attributes
  };
}

/**
 * The client to interact with the KeyVault certificates functionality
 */
export class CertificateClient {
  /**
   * The base URL to the vault
   */
  private readonly vaultUrl: string;

  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of CertificateClient.
   * @param vaultUrl the base URL to the vault.
   * @param credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param [pipelineOptions={}] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof CertificateClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: PipelineOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-certificates/${SDK_VERSION}`;
    if (pipelineOptions.userAgentOptions) {
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
    this.client = new KeyVaultClient(credential, SERVICE_API_VERSION, pipeline);
  }

  private async *listCertificatesPage(
    continuationState: PageSettings,
    options: ListCertificatesOptions = {},
  ): AsyncIterableIterator<KeyVaultCertificate[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...requestOptions
      };
      const currentSetResponse = await this.client.getCertificates(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getCertificateFromCertificateBundle);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificates(
        continuationState.continuationToken,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getCertificateFromCertificateBundle);
      } else {
        break;
      }
    }
  }

  private async *listCertificatesAll(
    options: ListCertificatesOptions = {}
  ): AsyncIterableIterator<KeyVaultCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const f = {};

    for await (const page of this.listCertificatesPage(f, requestOptions)) {
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
   * for await (const certificate of client.listCertificates()) {
   *   console.log(certificate);
   * }
   * // By pages
   * for await (const page of client.listCertificates().byPage()) {
   *   for (const certificate of page) {
   *     console.log(certificate);
   *   }
   * }
   * ```
   * @summary List all versions of the specified certificate.
   * @param [options] The optional parameters
   */
  public listCertificates(
    options: ListCertificatesOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultCertificate, KeyVaultCertificate[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("listCertificates", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listCertificatesAll(updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listCertificatesPage(settings, updatedOptions)
    };

    return result;
  }

  private async *listCertificateVersionsPage(
    certificateName: string,
    continuationState: PageSettings,
    options: ListCertificateVersionsOptions = {}
  ): AsyncIterableIterator<KeyVaultCertificate[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateVersionsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...requestOptions
      };
      const currentSetResponse = await this.client.getCertificateVersions(
        this.vaultUrl,
        certificateName,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getCertificateFromCertificateBundle);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificateVersions(
        continuationState.continuationToken,
        certificateName,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getCertificateFromCertificateBundle);
      } else {
        break;
      }
    }
  }

  private async *listCertificateVersionsAll(
    certificateName: string,
    options: ListCertificateVersionsOptions = {}
  ): AsyncIterableIterator<KeyVaultCertificate> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const f = {};

    for await (const page of this.listCertificateVersionsPage(certificateName, f, requestOptions)) {
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
   * for await (const item of client.listCertificateVersions("MyCertificate")) {
   *   console.log(item.properties.version!);
   * }
   * ```
   * @summary List the versions of a certificate.
   * @param certificateName The name of the certificate.
   * @param [options] The optional parameters
   */
  public listCertificateVersions(
    certificateName: string,
    options: ListCertificateVersionsOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultCertificate, KeyVaultCertificate[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listCertificateVersions", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listCertificateVersionsAll(certificateName, updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listCertificateVersionsPage(certificateName, settings, updatedOptions)
    };

    return result;
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * await client.deleteCertificate("MyCertificate");
   * ```
   * @summary Deletes a certificate from a specified key vault.
   * @param certificateName The name of the certificate.
   * @param [options] The optional parameters
   */
  public async deleteCertificate(
    certificateName: string,
    options: DeleteCertificateOptions = {},
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
   * Deletes all of the certificate contacts. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setCertificateContacts([{
   *   emailAddress: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * await client.deleteCertificateContacts();
   * ```
   * @summary Deletes all of the certificate contacts
   * @param options The optional parameters
   */
  public async deleteCertificateContacts(options: DeleteCertificateContactsOptions = {}): Promise<Contacts> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("deleteCertificateContacts", requestOptions);

    let result: DeleteCertificateContactsResponse;

    try {
      result = await this.client.deleteCertificateContacts(
        this.vaultUrl,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return result._response.parsedBody;
  }

  /**
   * Sets the certificate contacts for the key vault. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setCertificateContacts([{
   *   emailAddress: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * ```
   * @summary Sets the certificate contacts.
   * @param contacts The contacts to use
   * @param options The optional parameters
   */
  public async setCertificateContacts(
    contacts: Contact[],
    options: SetCertificateContactsOptions = {}
  ): Promise<Contacts> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const span = this.createSpan("setCertificateContacts", requestOptions);

    let result: SetCertificateContactsResponse;

    try {
      result = await this.client.setCertificateContacts(
        this.vaultUrl,
        { contactList: contacts },
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return result._response.parsedBody;
  }

  /**
   * Returns the set of certificate contact resources in the specified key vault. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificateClient(url, credentials);
   * await client.setCertificateContacts([{
   *   emailAddress: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * const getResponse = await client.getCertificateContacts();
   * console.log(getResponse.contactList!);
   * ```
   * @summary Sets the certificate contacts.
   * @param options The optional parameters
   */
  public async getCertificateContacts(options: GetCertificateContactsOptions = {}): Promise<Contacts> {
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

    return result._response.parsedBody;
  }

  private async *listCertificateIssuersPage(
    continuationState: PageSettings,
    options: ListCertificateIssuersOptions = {}
  ): AsyncIterableIterator<CertificateIssuer[]> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (continuationState.continuationToken == null) {
      const requestOptionsComplete: KeyVaultClientGetCertificateIssuersOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...requestOptions
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
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listCertificateIssuersAll(
    options: ListCertificateIssuersOptions = {}
  ): AsyncIterableIterator<CertificateIssuer> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const f = {};

    for await (const page of this.listCertificateIssuersPage(f, requestOptions)) {
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
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * // All in one call
   * for await (const issuer of client.listCertificateIssuers()) {
   *   console.log(issuer);
   * }
   * // By pages
   * for await (const page of client.listCertificateIssuers().byPage()) {
   *   for (const issuer of page) {
   *     console.log(issuer);
   *   }
   * }
   * ```
   * @summary List the certificate issuers.
   * @param options The optional parameters
   */
  public listCertificateIssuers(
    options: ListCertificateIssuersOptions = {}
  ): PagedAsyncIterableIterator<CertificateIssuer, CertificateIssuer[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listCertificateIssuers", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listCertificateIssuersAll(updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listCertificateIssuersPage(settings, updatedOptions)
    };

    return result;
  }

  /**
   * The SetCertificateIssuer operation adds or updates the specified certificate issuer. This
   * operation requires the certificates/setissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * ```
   * @summary Sets the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param provider The issuer provider.
   * @param [options] The optional parameters
   */
  public async setCertificateIssuer(
    issuerName: string,
    provider: string,
    options: SetCertificateIssuerOptions = {}
  ): Promise<CertificateIssuer> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("setCertificateIssuer", requestOptions);

    let result: SetCertificateIssuerResponse;

    try {
      result = await this.client.setCertificateIssuer(
        this.vaultUrl,
        issuerName,
        provider,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return result._response.parsedBody;
  }

  /**
   * The UpdateCertificateIssuer operation performs an update on the specified certificate issuer
   * entity. This operation requires the certificates/setissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * await client.updateCertificateIssuer("IssuerName", {
   *   provider: "Provider2"
   * });
   * ```
   * @summary Updates the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   */
  public async updateCertificateIssuer(
    issuerName: string,
    options: UpdateCertificateIssuerOptions = {},
  ): Promise<CertificateIssuer> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateCertificateIssuer", requestOptions);

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

    return result._response.parsedBody;
  }

  /**
   * The GetCertificateIssuer operation returns the specified certificate issuer resources in the
   * specified key vault. This operation requires the certificates/manageissuers/getissuers
   * permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * const certificateIssuer = await client.getCertificateIssuer("IssuerName");
   * console.log(certificateIssuer);
   * ```
   * @summary Gets he specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   */
  public async getCertificateIssuer(
    issuerName: string,
    options: GetCertificateIssuerOptions = {}
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
    return result._response.parsedBody;
  }

  /**
   * The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from
   * the vault. This operation requires the certificates/manageissuers/deleteissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * await client.deleteCertificateIssuer("IssuerName");
   * ```
   * @summary Deletes the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   */
  public async deleteCertificateIssuer(
    issuerName: string,
    options: DeleteCertificateIssuerOptions = {}
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

    return result._response.parsedBody;
  }

  /**
   * Creates a new certificate. If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * ```
   * @summary Creates a certificate
   * @param certificateName The name of the certificate
   * @param certificatePolicy The certificate's policy
   * @param [options] Optional parameters
   */
  public async createCertificate(
    certificateName: string,
    certificatePolicy: CertificatePolicy,
    options: CreateCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("createCertificate", requestOptions);

    let result: CreateCertificateResponse;

    try {
      result = await this.client.createCertificate(this.vaultUrl, certificateName, {
        ...this.setParentSpan(span, requestOptions.requestrequestOptions || {}),
        certificateAttributes: {
          ...requestOptions.certificateAttributes,
          enabled: requestOptions.enabled
        },
        tags: requestOptions.tags,
        certificatePolicy: toCorePolicy(certificatePolicy)
      });
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result);
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const certificate = await client.getCertificateWithPolicy("MyCertificate");
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name (includes the certificate policy)
   * @param certificateName The name of the certificate
   * @param options The optional parameters
   */
  public async getCertificateWithPolicy(
    certificateName: string,
    options: GetCertificateWithPolicyOptions = {}
  ): Promise<KeyVaultCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificateWithPolicy", requestOptions);

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

    return this.getCertificateFromCertificateBundle(result);
  }

  /**
   * Gets information about a specific certificate on a specific version. It won't return the certificate's policy. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const certificateWithPolicy = await client.getCertificateWithPolicy("MyCertificate");
   * const certificate = await client.getCertificate("MyCertificate", certificateWithPolicy.properties.version!);
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name and a specified version
   * @param certificateName The name of the certificate
   * @param version The specific version of the certificate
   * @param requestOptions The optional parameters
   */
  public async getCertificate(
    certificateName: string,
    version: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!version) {
      throw new Error("The 'version' cannot be empty.");
    }

    const span = this.createSpan("getCertificate", requestOptions);

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
   * const certificateSecret = await secretClient.getSecret("MyCertificate");
   * const base64EncodedCertificate = certificateSecret.value!;
   * await client.importCertificate("MyCertificate", base64EncodedCertificate);
   * ```
   * @summary Imports a certificate from a certificate's secret value
   * @param certificateName The name of the certificate
   * @param base64EncodedCertificate The base64 encoded certificate to import
   * @param options The optional parameters
   */
  public async importCertificate(
    certificateName: string,
    base64EncodedCertificate: string,
    options: KeyVaultClientImportCertificateOptionalParams = {}
  ): Promise<KeyVaultCertificate> {
    const span = this.createSpan("importCertificate", options);

    let result: ImportCertificateResponse;

    try {
      result = await this.client.importCertificate(
        this.vaultUrl,
        certificateName,
        base64EncodedCertificate,
        this.setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result);
  }

  /**
   * The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const policy = await client.getCertificatePolicy("MyCertificate");
   * console.log(policy);
   * ```
   * @summary Gets a certificate's policy
   * @param certificateName The name of the certificate
   * @param options The optional parameters
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
   * Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission.
   * @summary Gets a certificate's policy
   * @param certificateName The name of the certificate
   * @param policy The certificate policy
   * @param options The optional parameters
   */
  public async updateCertificatePolicy(
    certificateName: string,
    policy: CertificatePolicy,
    options: UpdateCertificatePolicyOptions = {}
  ): Promise<CertificatePolicy> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateCertificatePolicy", requestOptions);

    let result: UpdateCertificatePolicyResponse;
    try {
      result = await this.client.updateCertificatePolicy(
        this.vaultUrl,
        certificateName,
        toCorePolicy(policy),
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
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * await client.updateCertificate("MyCertificate", "", {
   *   tags: {
   *     customTag: "value"
   *   }
   * });
   * ```
   * @summary Updates a certificate
   * @param certificateName The name of the ceritificate
   * @param version The version of the certificate to update
   * @param options The options, including what to update
   */
  public async updateCertificate(
    certificateName: string,
    version: string,
    options: UpdateCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("updateCertificate", requestOptions);

    let result: UpdateCertificateResponse;

    try {
      result = await this.client.updateCertificate(
        this.vaultUrl,
        certificateName,
        version,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  /**
   * Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * await client.cancelCertificateOperation("MyCertificate");
   * ```
   * @summary Cancels a certificate's operation
   * @param certificateName The name of the certificate
   * @param cancel Whether to cancel the operation or not
   * @param options The optional parameters
   */
  public async cancelCertificateOperation(
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

    return result._response.parsedBody;
  }

  /**
   * Gets the creation operation associated with a specified certificate. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const operation = await client.getCertificateOperation("MyCertificate");
   * console.log(operation);
   * ```
   * @summary Gets a certificate's operation
   * @param certificateName The name of the certificate
   * @param options The optional parameters
   */
  public async getCertificateOperation(
    certificateName: string,
    options: GetCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getCertificateOperation", requestOptions);

    let result: GetCertificateOperationResponse;

    try {
      result = await this.client.getCertificateOperation(
        this.vaultUrl,
        certificateName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return result._response.parsedBody;
  }

  /**
   * Deletes the creation operation for a specified certificate that is in the process of being created.
   * The certificate is no longer created. This operation requires the certificates/update permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * await client.deleteCertificateOperation("MyCertificate");
   * await client.getCertificateOperation("MyCertificate"); // Throws error: Pending certificate not found: "MyCertificate"
   * ```
   * @summary Delete a certificate's operation
   * @param certificateName The name of the certificate
   * @param options The optional parameters
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

    return result._response.parsedBody;
  }

  /**
   * Performs the merging of a certificate or certificate chain with a key pair currently available in the service. This operation requires the certificates/create permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Unknown",
   *   subjectName: "cn=MyCert"
   * });
   * const { csr } = await client.getCertificateOperation(certificateName);
   * const base64Csr = Buffer.from(csr!).toString("base64");
   * const wrappedCsr = ["-----BEGIN CERTIFICATE REQUEST-----", base64Csr, "-----END CERTIFICATE REQUEST-----"].join("\n");
   * fs.writeFileSync("test.csr", wrappedCsr);
   *
   * // Certificate available locally made using:
   * //   openssl genrsa -out ca.key 2048
   * //   openssl req -new -x509 -key ca.key -out ca.crt
   * // You can read more about how to create a fake certificate authority here: https://gist.github.com/Soarez/9688998
   * childProcess.execSync("openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt");
   * const base64Crt = fs.readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");
   *
   * await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
   * ```
   * @summary Merges a signed certificate request into a pending certificate
   * @param certificateName The name of the certificate
   * @param x509Certificates The certificate(s) to merge
   * @param options The optional parameters
   */
  public async mergeCertificate(
    certificateName: string,
    x509Certificates: Uint8Array[],
    options: MergeCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
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
    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  /**
   * Requests that a backup of the specified certificate be downloaded to the client. All versions of the certificate will be downloaded.
   * This operation requires the certificates/backup permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * ```
   * @summary Generates a backup of a certificate
   * @param certificateName The name of the certificate
   * @param options The optional parameters
   */
  public async backupCertificate(
    certificateName: string,
    options: BackupCertificateOptions = {}
  ): Promise<BackupCertificateResult> {
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

    return result._response.parsedBody;
  }

  /**
   * Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerName: "Self",
   *   subjectName: "cn=MyCert"
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * await client.deleteCertificate("MyCertificate");
   * // Some time is required before we're able to restore the certificate
   * await client.restoreCertificate(backup.value!);
   * ```
   * @summary Restores a certificate from a backup
   * @param certificateBackup The back-up certificate to restore from
   * @param options The optional parameters
   */
  public async restoreCertificate(
    certificateBackup: Uint8Array,
    options: RestoreCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("restoreCertificate", requestOptions);

    let result: RestoreCertificateResponse;

    try {
      result = await this.client.restoreCertificate(
        this.vaultUrl,
        certificateBackup,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  private async *listDeletedCertificatesPage(
    continuationState: PageSettings,
    options: ListDeletedCertificatesOptions = {}
  ): AsyncIterableIterator<DeletedCertificate[]> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (continuationState.continuationToken == null) {
      const requestOptionsComplete: KeyVaultClientGetDeletedCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...requestOptions
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
        requestOptions
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
    options: ListDeletedCertificatesOptions = {}
  ): AsyncIterableIterator<DeletedCertificate> {
		const requestOptions = operationOptionsToRequestOptionsBase(options);
    const f = {};

    for await (const page of this.listDeletedCertificatesPage(f, requestOptions)) {
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
   * for await (const certificate of client.listDeletedCertificates()) {
   *   console.log(certificate);
   * }
   * for await (const page of client.listDeletedCertificates().byPage()) {
   *   for (const certificate of page) {
   *     console.log(certificate);
   *   }
   * }
   * ```
   * @summary Lists deleted certificates
   * @param options The optional parameters
   */
  public listDeletedCertificates(
    options: ListDeletedCertificatesOptions = {}
  ): PagedAsyncIterableIterator<DeletedCertificate, DeletedCertificate[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listDeletedCertificates", requestOptions);
    const updatedOptions = this.setParentSpan(span, requestOptions);

    const iter = this.listDeletedCertificatesAll(updatedOptions);

    span.end();
    let result = {
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
   * client.getDeletedCertificate("MyDeletedCertificate");
   * ```
   * @summary Gets a deleted certificate
   * @param certificateName The name of the certificate
   * @param options The optional parameters
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
   * await client.deleteCertificate("MyCertificate");
   * // Deleting a certificate takes time, make sure to wait before purging it
   * client.purgeDeletedCertificate("MyCertificate");
   * ```
   * @summary Gets a deleted certificate
   * @param certificateName The name of the deleted certificate to purge
   * @param options The optional parameters
   */
  public async purgeDeletedCertificate(certificateName: string, options: PurgeDeletedCertificateOptions = {}): Promise<null> {
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
   * requires the certificate/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificateClient(url, credentials);
   * await client.deleteCertificate("MyCertificate");
   * // Deleting a certificate takes time, make sure to wait before recovering it
   * await client.recoverDeletedCertificate("MyCertificate");
   * ```
   * @summary Recovers a deleted cerificate
   * @param certificateName The name of the deleted certificate
   * @param options The optional parameters
   */
  public async recoverDeletedCertificate(
    certificateName: string,
    options: RecoverDeletedCertificateOptions = {}
  ): Promise<KeyVaultCertificate> {
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

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  private getCertificateFromCertificateBundle(certificateBundle: CertificateBundle): KeyVaultCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    const policy = toPublicPolicy(certificateBundle.policy || {});

    const properties = {
      ...parsedId,
      ...certificateBundle,
      ...certificateBundle.attributes
    };
    delete properties.policy;

    return {
      contentType: certificateBundle.contentType as CertificateContentType,
      policy,
      properties
    };
  }

  private getDeletedCertificateFromDeletedCertificateBundle(
    certificateBundle: DeletedCertificateBundle
  ): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    return {
      contentType: certificateBundle.contentType as CertificateContentType,
      recoveryId: certificateBundle.recoveryId,
      scheduledPurgeDate: certificateBundle.scheduledPurgeDate,
      deletedDate: certificateBundle.deletedDate,
      properties: {
        ...parsedId,
        ...certificateBundle,
        ...certificateBundle.attributes
      }
    };
  }

  private getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", item.id);

    return {
      properties: {
        ...item,
        ...parsedId,
        ...item.attributes
      }
    };
  }

  /**
   * Creates a span using the tracer that was set by the user
   * @param methodName The name of the method for which the span is being created.
   * @param requestOptions The options for the underlying http request.
   */
  private createSpan(methodName: string, requestOptions: RequestOptionsBase = {}): Span {
    const tracer = getTracer();
    return tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
  }

  /**
   * Returns updated HTTP options with the given span as the parent of future spans,
   * if applicable.
   * @param span The span for the current operation
   * @param options The options for the underlying http request
   */
  private setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
    if (span.isRecordingEvents()) {
      return {
        ...options,
        spanOptions: {
          ...options.spanOptions,
          parent: span
        }
      };
    } else {
      return options;
    }
  }
}
