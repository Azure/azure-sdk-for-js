import {
  getDefaultUserAgentValue,
  TokenCredential,
  isTokenCredential,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  isNode,
  userAgentPolicy,
  RequestOptionsBase,
  tracingPolicy,
  getTracer,
  Span
} from "@azure/core-http";

import {
  CertificateAttributes,
  Certificate,
  CertificateWithPolicy,
  CertificateTags,
  DeletedCertificate,
  CertificateIssuer,
  CertificateContentType
} from "./certificatesModels";
import {
  NewPipelineOptions,
  isNewPipelineOptions,
  ParsedKeyVaultEntityIdentifier,
  Pipeline
} from "./core/keyVaultBase";
import { TelemetryOptions } from "./core/clientOptions";
import {
  CertificateBundle,
  Contacts,
  KeyVaultClientGetCertificatesOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientUpdateCertificateOptionalParams,
  CertificateAttributes as BaseCertificateAttributes,
  CertificateOperation,
  CertificatePolicy,
  BackupCertificateResult,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  DeletedCertificateItem,
  DeletedCertificateBundle,
  Contact,
  ErrorModel,
  IssuerParameters,
  IssuerCredentials,
  IssuerAttributes,
  KeyProperties,
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
  RecoverDeletedCertificateResponse
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { ProxyOptions, RetryOptions } from "./core";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";

export {
  BaseCertificateAttributes,
  CertificateAttributes,
  CertificateIssuer,
  CertificateOperation,
  CertificatePolicy,
  Contact,
  Contacts,
  DeletedCertificate,
  ErrorModel,
  IssuerAttributes,
  IssuerCredentials,
  IssuerParameters,
  KeyProperties,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateOptionalParams,
  LifetimeAction,
  NewPipelineOptions,
  OrganizationDetails,
  ParsedKeyVaultEntityIdentifier,
  SecretProperties,
  X509CertificateProperties
};

export { ProxyOptions, RetryOptions, TelemetryOptions };

/**
 * The client to interact with the KeyVault certificates functionality
 */

export class CertificatesClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {TokenCredential} The credential to use for API requests.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof CertificatesClient
   */
  public static getDefaultPipeline(
    credential: TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CertificatesClient.getUserAgentString(
      pipelineOptions.telemetry
    );

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
      tracingPolicy(),
      userAgentPolicy({ value: userAgentString }),
      generateClientRequestIdPolicy(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      throttlingRetryPolicy(),
      systemErrorRetryPolicy(),
      exponentialRetryPolicy(
        retryOptions.retryCount,
        retryOptions.retryIntervalInMS,
        RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
        retryOptions.maxRetryDelayInMs
      ),
      redirectPolicy(),
      isTokenCredential(credential)
        ? challengeBasedAuthenticationPolicy(credential)
        : signingPolicy(credential)
    ]);

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultBaseUrl: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of CertificatesClient.
   * @param {string} url the base url to the key vault.
   * @param {TokenCredential} The credential to use for API requests.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof CertificatesClient
   */
  constructor(
    url: string,
    credential: TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CertificatesClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, this.pipeline);
  }

  private static getUserAgentString(telemetry?: TelemetryOptions) {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `Azure-KeyVault-Certificates/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  private async *listCertificatesPage(
    continuationState: PageSettings,
    options?: RequestOptionsBase
  ): AsyncIterableIterator<CertificateAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificates(
        this.vaultBaseUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificatesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
  }

  private async *listCertificatesAll(
    options?: RequestOptionsBase
  ): AsyncIterableIterator<CertificateAttributes> {
    const f = {};

    for await (const page of this.listCertificatesPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all certificates in the vault.  The full certificate identifier and attributes are provided
   * in the response. No values are returned for the certificates. This operations requires the certificates/list permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
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
   * @returns PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]>
   */
  public listCertificates(
    options?: RequestOptionsBase
  ): PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]> {
    const span = this.createSpan("listCertificates", options);
    const updatedOptions = this.setParentSpan(span, options);

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
    name: string,
    continuationState: PageSettings,
    options?: RequestOptionsBase
  ): AsyncIterableIterator<CertificateAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateVersionsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificateVersions(
        this.vaultBaseUrl,
        name,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificateVersionsNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
  }

  private async *listCertificateVersionsAll(
    name: string,
    options?: RequestOptionsBase
  ): AsyncIterableIterator<CertificateAttributes> {
    const f = {};

    for await (const page of this.listCertificateVersionsPage(name, f, options)) {
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
   * const client = new CertificatesClient(url, credentials);
   * for await (const item of client.listCertificateVersions("MyCertificate")) {
   *   console.log(item.version!);
   * }
   * ```
   * @summary List the versions of a certificate.
   * @param name The name of the certificate.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCertificateVersionsResponse>
   */
  public listCertificateVersions(
    name: string,
    options?: RequestOptionsBase
  ): PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]> {
    const span = this.createSpan("listCertificateVersions", options);
    const updatedOptions = this.setParentSpan(span, options);

    const iter = this.listCertificateVersionsAll(name, updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listCertificateVersionsPage(name, settings, updatedOptions)
    };

    return result;
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * await client.deleteCertificate("MyCertificate");
   * ```
   * @summary Deletes a certificate from a specified key vault.
   * @param certificateName The name of the certificate.
   * @param [options] The optional parameters
   * @returns Promise<DeletedCertificate>
   */
  public async deleteCertificate(
    certificateName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedCertificate> {
    const span = this.createSpan("deleteCertificate", options);

    let response: DeleteCertificateResponse;
    try {
      response = await this.client
        .deleteCertificate(this.vaultBaseUrl, certificateName, this.setParentSpan(span, options));
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(response);
  }

  /**
   * Deletes all of the certificate contacts. This operation requires the certificates/managecontacts permission.
   *
   * Example usage:
   * ```ts
   * let client = new CertificatesClient(url, credentials);
   * await client.setCertificateContacts([{
   *   emailAddress: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * await client.deleteCertificateContacts();
   * ```
   * @summary Deletes all of the certificate contacts
   * @param options The optional parameters
   * @returns Promise<Contacts>
   */
  public async deleteCertificateContacts(options?: RequestOptionsBase): Promise<Contacts> {
    const span = this.createSpan("deleteCertificateContacts", options);

    let result: DeleteCertificateContactsResponse;

    try {
      result = await this.client
        .deleteCertificateContacts(this.vaultBaseUrl, this.setParentSpan(span, options));
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
   * let client = new CertificatesClient(url, credentials);
   * await client.setCertificateContacts([{
   *   emailAddress: "b@b.com",
   *   name: "b",
   *   phone: "222222222222"
   * }]);
   * ```
   * @summary Sets the certificate contacts.
   * @param contacts The contacts to use
   * @param options The optional parameters
   * @returns Promise<Contacts>
   */
  public async setCertificateContacts(
    contacts: Contact[],
    options?: RequestOptionsBase
  ): Promise<Contacts> {
    const span = this.createSpan("setCertificateContacts", options);

    let result: SetCertificateContactsResponse;

    try {
      result = await this.client
        .setCertificateContacts(this.vaultBaseUrl, { contactList: contacts }, this.setParentSpan(span, options));
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
   * let client = new CertificatesClient(url, credentials);
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
   * @returns Promise<Contacts>
   */
  public async getCertificateContacts(options?: RequestOptionsBase): Promise<Contacts> {
    const span = this.createSpan("getCertificateContacts", options);

    let result: GetCertificateContactsResponse;
    try {
      result = await this.client
        .getCertificateContacts(this.vaultBaseUrl, this.setParentSpan(span, options));
    } finally {
      span.end();
    }

    return result._response.parsedBody;
  }

  private async *listCertificateIssuersPage(
    continuationState: PageSettings,
    options?: KeyVaultClientGetCertificateIssuersOptionalParams
  ): AsyncIterableIterator<CertificateIssuer[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateIssuersOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getCertificateIssuers(
        this.vaultBaseUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse;
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getCertificateIssuersNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse;
    }
  }

  private async *listCertificateIssuersAll(
    options?: KeyVaultClientGetCertificateIssuersOptionalParams
  ): AsyncIterableIterator<CertificateIssuer> {
    const f = {};

    for await (const page of this.listCertificateIssuersPage(f, options)) {
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
   * const client = new CertificatesClient(url, credentials);
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
   * @returns PagedAsyncIterableIterator<CertificateIssuer, CertificateIssuer[]>
   */
  public listCertificateIssuers(
    options?: KeyVaultClientGetCertificateIssuersOptionalParams
  ): PagedAsyncIterableIterator<CertificateIssuer, CertificateIssuer[]> {
    const span = this.createSpan("listCertificateIssuers", options);
    const updatedOptions = this.setParentSpan(span, options);

    const iter = this.listCertificateIssuersAll(updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listCertificateIssuersPage(settings, updatedOptions)
    };

    return result;
  }

  /**
   * The SetCertificateIssuer operation adds or updates the specified certificate issuer. This
   * operation requires the certificates/setissuers permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * ```
   * @summary Sets the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param provider The issuer provider.
   * @param [options] The optional parameters
   * @returns Promise<Models.SetCertificateIssuerResponse>
   */
  public async setCertificateIssuer(
    issuerName: string,
    provider: string,
    options?: KeyVaultClientSetCertificateIssuerOptionalParams
  ): Promise<CertificateIssuer> {
    const span = this.createSpan("setCertificateIssuer", options);

    let result: SetCertificateIssuerResponse;

    try {
      result = await this.client
        .setCertificateIssuer(this.vaultBaseUrl, issuerName, provider, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * await client.updateCertificateIssuer("IssuerName", {
   *   provider: "Provider2"
   * });
   * ```
   * @summary Updates the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateCertificateIssuerResponse>
   */
  public async updateCertificateIssuer(
    issuerName: string,
    options?: KeyVaultClientUpdateCertificateIssuerOptionalParams
  ): Promise<CertificateIssuer> {
    const span = this.createSpan("updateCertificateIssuer", options);

    let result: UpdateCertificateIssuerResponse;

    try {
      result = await this.client
        .updateCertificateIssuer(this.vaultBaseUrl, issuerName, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * const certificateIssuer = await client.getCertificateIssuer("IssuerName");
   * console.log(certificateIssuer);
   * ```
   * @summary Gets he specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCertificateIssuerResponse>
   */
  public async getCertificateIssuer(
    issuerName: string,
    options?: RequestOptionsBase
  ): Promise<CertificateIssuer> {
    const span = this.createSpan("getCertificateIssuer", options);

    let result: GetCertificateIssuerResponse;

    try {
      result = await this.client
        .getCertificateIssuer(this.vaultBaseUrl, issuerName, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.setCertificateIssuer("IssuerName", "Provider");
   * await client.deleteCertificateIssuer("IssuerName");
   * ```
   * @summary Deletes the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeleteCertificateIssuerResponse>
   */
  public async deleteCertificateIssuer(
    issuerName: string,
    options?: RequestOptionsBase
  ): Promise<CertificateIssuer> {
    const span = this.createSpan("deleteCertificateIssuer", options);

    let result: DeleteCertificateIssuerResponse;

    try {
      result = await this.client
        .deleteCertificateIssuer(this.vaultBaseUrl, issuerName, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * ```
   * @summary Creates a certificate
   * @param name The name of the certificate
   * @param certificatePolicy The certificate's policy
   * @param enabled Whether this certificate is enabled or not
   * @param tags Tags for this certificate
   * @param [options] Optional request parameters
   * @returns Promise<Certificate>
   */
  public async createCertificate(
    name: string,
    certificatePolicy: CertificatePolicy,
    enabled?: boolean,
    tags?: CertificateTags,
    options?: RequestOptionsBase
  ): Promise<Certificate> {
    const span = this.createSpan("createCertificate", options);

    let result: CreateCertificateResponse;

    try {
      result = await this.client
        .createCertificate(this.vaultBaseUrl, name, {
          ...this.setParentSpan(span, options),
          certificateAttributes: {
            enabled
          },
          tags,
          certificatePolicy
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const certificate = await client.getCertificateWithPolicy("MyCertificate");
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name (includes the certificate policy)
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<Certificate>
   */
  public async getCertificateWithPolicy(
    name: string,
    options?: RequestOptionsBase
  ): Promise<CertificateWithPolicy> {
    const span = this.createSpan("getCertificateWithPolicy", options);

    let result: GetCertificateResponse;

    try {
      result = await this.client
        .getCertificate(this.vaultBaseUrl, name, "", this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const certificateWithPolicy = await client.getCertificateWithPolicy("MyCertificate");
   * const certificate = await client.getCertificate("MyCertificate", certificateWithPolicy.version!);
   * console.log(certificate);
   * ```
   * @summary Retrieves a certificate from the certificate's name and a specified version
   * @param name The name of the certificate
   * @param version The specific version of the certificate
   * @param requestOptions The optional parameters
   * @returns Promise<Certificate>
   */
  public async getCertificate(
    name: string,
    version: string,
    options?: RequestOptionsBase
  ): Promise<Certificate> {
    if (!version) {
      throw new Error("The 'version' cannot be empty.");
    }

    const span = this.createSpan("getCertificate", options);

    let result: GetCertificateResponse;

    try {
      result = await this.client
        .getCertificate(this.vaultBaseUrl, name, version, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * const certificateSecret = await secretsClient.getSecret("MyCertificate");
   * const base64EncodedCertificate = certificateSecret.value!;
   * await client.importCertificate("MyCertificate", base64EncodedCertificate);
   * ```
   * @summary Imports a certificate from a certificate's secret value
   * @param name The name of the certificate
   * @param base64EncodedCertificate The base64 encoded certificate to import
   * @param options The optional parameters
   * @returns Promise<Certificate>
   */
  public async importCertificate(
    name: string,
    base64EncodedCertificate: string,
    options?: KeyVaultClientImportCertificateOptionalParams
  ): Promise<Certificate> {
    const span = this.createSpan("importCertificate", options);

    let result: ImportCertificateResponse;

    try {
      result = await this.client
        .importCertificate(this.vaultBaseUrl, name, base64EncodedCertificate, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const policy = await client.getCertificatePolicy("MyCertificate");
   * console.log(policy);
   * ```
   * @summary Gets a certificate's policy
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<CertificatePolicy>
   */
  public async getCertificatePolicy(
    name: string,
    options?: RequestOptionsBase
  ): Promise<CertificatePolicy> {
    const span = this.createSpan("getCertificatePolicy", options);

    let result: GetCertificatePolicyResponse;

    try {
      result = await this.client
        .getCertificatePolicy(this.vaultBaseUrl, name, this.setParentSpan(span, options));
    } finally {
      span.end();
    }

    return result._response.parsedBody;
  }

  /**
   * Set specified members in the certificate policy. Leave others as null. This operation requires the certificates/update permission.
   * @summary Gets a certificate's policy
   * @param name The name of the certificate
   * @param policy The certificate policy
   * @param options The optional parameters
   * @returns Promise<CertificatePolicy>
   */
  public async updateCertificatePolicy(
    name: string,
    policy: CertificatePolicy,
    options?: RequestOptionsBase
  ): Promise<CertificatePolicy> {
    const span = this.createSpan("updateCertificatePolicy", options);

    let result: UpdateCertificatePolicyResponse;
    try {
      result = await this.client
        .updateCertificatePolicy(this.vaultBaseUrl, name, policy, this.setParentSpan(span, options));
    } finally {
      span.end();
    }
    return result._response.parsedBody;
  }

  /**
   * Applies the specified update on the given certificate; the only elements updated are the
   * certificate's attributes. This operation requires the certificates/update permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * await client.updateCertificate("MyCertificate", "", {
   *   tags: {
   *     customTag: "value"
   *   }
   * });
   * ```
   * @summary Updates a certificate
   * @param name The name of the ceritificate
   * @param version The version of the certificate to update
   * @param options The options, including what to update
   * @returns Promise<Certificate>
   */
  public async updateCertificate(
    name: string,
    version: string,
    options?: KeyVaultClientUpdateCertificateOptionalParams
  ): Promise<Certificate> {
    const span = this.createSpan("updateCertificate", options);

    let result: UpdateCertificateResponse;

    try {
      result = await this.client
        .updateCertificate(this.vaultBaseUrl, name, version, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * await client.cancelCertificateOperation("MyCertificate");
   * ```
   * @summary Cancels a certificate's operation
   * @param name The name of the certificate
   * @param cancel Whether to cancel the operation or not
   * @param options The optional parameters
   * @returns Promise<CertificateOperation>
   */
  public async cancelCertificateOperation(
    name: string,
    options?: RequestOptionsBase
  ): Promise<CertificateOperation> {
    const span = this.createSpan("cancelCertificateOperation", options);

    let result: UpdateCertificateOperationResponse;
    try {
      result = await this.client
        .updateCertificateOperation(this.vaultBaseUrl, name, true, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const operation = await client.getCertificateOperation("MyCertificate");
   * console.log(operation);
   * ```
   * @summary Gets a certificate's operation
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<CertificateOperation>
   */
  public async getCertificateOperation(
    name: string,
    options?: RequestOptionsBase
  ): Promise<CertificateOperation> {
    const span = this.createSpan("getCertificateOperation", options);

    let result: GetCertificateOperationResponse;

    try {
      result = await this.client
        .getCertificateOperation(this.vaultBaseUrl, name, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * await client.deleteCertificateOperation("MyCertificate");
   * await client.getCertificateOperation("MyCertificate"); // Throws error: Pending certificate not found: "MyCertificate"
   * ```
   * @summary Delete a certificate's operation
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<CertificateOperation>
   */
  public async deleteCertificateOperation(
    name: string,
    options?: RequestOptionsBase
  ): Promise<CertificateOperation> {
    const span = this.createSpan("deleteCertificateOperation", options);

    let result: DeleteCertificateOperationResponse;

    try {
      result = await this.client
        .deleteCertificateOperation(this.vaultBaseUrl, name, this.setParentSpan(span, options))
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: {
   *     name: "Unknown",
   *     certificateTransparency: false
   *   },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
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
   * @param name The name of the certificate
   * @param x509Certificates The certificate(s) to merge
   * @param options The optional parameters
   * @returns Promise<Certificate>
   */
  public async mergeCertificate(
    name: string,
    x509Certificates: Uint8Array[],
    options?: RequestOptionsBase
  ): Promise<Certificate> {
    const span = this.createSpan("mergeCertificate", options);

    let result: MergeCertificateResponse;
    try {
      result = await this.client
        .mergeCertificate(this.vaultBaseUrl, name, x509Certificates, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * ```
   * @summary Generates a backup of a certificate
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<BackupCertificateResult>
   */
  public async backupCertificate(
    name: string,
    options?: RequestOptionsBase
  ): Promise<BackupCertificateResult> {
    const span = this.createSpan("backupCertificate", options);

    let result: BackupCertificateResponse;
    try {
      result = await this.client
        .backupCertificate(this.vaultBaseUrl, name, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.createCertificate("MyCertificate", {
   *   issuerParameters: { name: "Self" },
   *   x509CertificateProperties: { subject: "cn=MyCert" }
   * });
   * const backup = await client.backupCertificate("MyCertificate");
   * await client.deleteCertificate("MyCertificate");
   * // Some time is required before we're able to restore the certificate
   * await client.restoreCertificate(backup.value!);
   * ```
   * @summary Restores a certificate from a backup
   * @param certificateBackup The back-up certificate to restore from
   * @param options The optional parameters
   * @returns Promise<Certificate>
   */
  public async restoreCertificate(
    certificateBackup: Uint8Array,
    options?: RequestOptionsBase
  ): Promise<Certificate> {
    const span = this.createSpan("restoreCertificate", options);

    let result: RestoreCertificateResponse;

    try {
      result = await this.client
        .restoreCertificate(this.vaultBaseUrl, certificateBackup, this.setParentSpan(span, options));
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  private async *listDeletedCertificatesPage(
    continuationState: PageSettings,
    options?: KeyVaultClientGetDeletedCertificatesOptionalParams
  ): AsyncIterableIterator<DeletedCertificate[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetDeletedCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getDeletedCertificates(
        this.vaultBaseUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getDeletedCertificateFromItem);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedCertificatesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getDeletedCertificateFromItem);
    }
  }

  private async *listDeletedCertificatesAll(
    options?: KeyVaultClientGetDeletedCertificatesOptionalParams
  ): AsyncIterableIterator<DeletedCertificate> {
    const f = {};

    for await (const page of this.listDeletedCertificatesPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Rretrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific
   * information. This operation requires the certificates/get/list permission. This operation can only be enabled on soft-delete enabled vaults.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
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
   * @returns PagedAsyncIterableIterator<DeletedCertificate, DeletedCertificate[]>
   */
  public listDeletedCertificates(
    options?: KeyVaultClientGetDeletedCertificatesOptionalParams
  ): PagedAsyncIterableIterator<DeletedCertificate, DeletedCertificate[]> {
    const span = this.createSpan("listDeletedCertificates", options);
    const updatedOptions = this.setParentSpan(span, options);

    const iter = this.listDeletedCertificatesAll(updatedOptions);

    span.end();
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedCertificatesPage(settings, updatedOptions)
    };

    return result;
  }

  /**
   * retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
   * current deletion recovery level. This operation requires the certificates/get permission.
   *
   * Example usage:
   * ```ts
   * const client = new CertificatesClient(url, credentials);
   * client.getDeletedCertificate("MyDeletedCertificate");
   * ```
   * @summary Gets a deleted certificate
   * @param name The name of the certificate
   * @param options The optional parameters
   * @returns Promise<DeletedCertificate>
   */
  public async getDeletedCertificate(
    name: string,
    options?: RequestOptionsBase
  ): Promise<DeletedCertificate> {
    const span = this.createSpan("getDeletedCertificate", options);

    let result: GetDeletedCertificateResponse;
    try {
      result = await this.client
        .getDeletedCertificate(this.vaultBaseUrl, name, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.deleteCertificate("MyCertificate");
   * // Deleting a certificate takes time, make sure to wait before purging it
   * client.purgeDeletedCertificate("MyCertificate");
   * ```
   * @summary Gets a deleted certificate
   * @param name The name of the deleted certificate to purge
   * @param options The optional parameters
   */
  public async purgeDeletedCertificate(name: string, options?: RequestOptionsBase): Promise<null> {
    const span = this.createSpan("purgeDeletedCertificate", options);

    try {
      await this.client.purgeDeletedCertificate(this.vaultBaseUrl, name, this.setParentSpan(span, options));
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
   * const client = new CertificatesClient(url, credentials);
   * await client.deleteCertificate("MyCertificate");
   * // Deleting a certificate takes time, make sure to wait before recovering it
   * await client.recoverDeletedCertificate("MyCertificate");
   * ```
   * @summary Recovers a deleted cerificate
   * @param name The name of the deleted certificate
   * @param options The optional parameters
   * @returns Promise<Certificate>
   */
  public async recoverDeletedCertificate(
    name: string,
    options?: RequestOptionsBase
  ): Promise<Certificate> {
    const span = this.createSpan("recoverDeletedCertificate", options);

    let result: RecoverDeletedCertificateResponse;

    try {
      result = await this.client
        .recoverDeletedCertificate(this.vaultBaseUrl, name, this.setParentSpan(span, options));
    } finally {
      span.end();
    }

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  private getCertificateFromCertificateBundle(certificateBundle: CertificateBundle): Certificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    let resultObject;
    if (certificateBundle.attributes) {
      resultObject = {
        ...certificateBundle,
        ...parsedId,
        ...certificateBundle.attributes
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...certificateBundle,
        ...parsedId
      };
    }

    return {
      ...resultObject,
      contentType: resultObject.contentType as CertificateContentType
    };
  }

  private getDeletedCertificateFromDeletedCertificateBundle(
    certificateBundle: DeletedCertificateBundle
  ): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    let resultObject;
    if (certificateBundle.attributes) {
      resultObject = {
        ...certificateBundle,
        ...parsedId,
        ...certificateBundle.attributes
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...certificateBundle,
        ...parsedId
      };
    }

    return {
      ...resultObject,
      contentType: resultObject.contentType as CertificateContentType
    };
  }

  private getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", item.id);

    let resultObject;
    if (item.attributes) {
      resultObject = {
        ...item,
        ...parsedId,
        ...item.attributes
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...item,
        ...parsedId
      };
    }

    return resultObject;
  }

  /**
   * Creates a span using the tracer that was set by the user
   * @param methodName The name of the method for which the span is being created.
   * @param requestOptions The options for the underlying http request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
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
          parent: span,
        }
      }
    } else {
      return options;
    }
  }
}
