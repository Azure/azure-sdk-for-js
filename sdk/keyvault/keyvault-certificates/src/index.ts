import {
  ServiceClientCredentials,
  TokenCredential,
  isTokenCredential,
  RequestPolicyFactory,
  deserializationPolicy,
  bearerTokenAuthenticationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  isNode,
  userAgentPolicy
} from "@azure/core-http";

import { RequestOptions, CertificateAttributes, Certificate, DeletedCertificate, CertificateIssuer } from "./certificatesModels";
import { getDefaultUserAgentValue } from "@azure/core-http";
import { NewPipelineOptions, isNewPipelineOptions, Pipeline } from "./core/keyVaultBase";
import { TelemetryOptions } from "./core/clientOptions";
import {
  CertificateBundle, Contacts, KeyVaultClientCreateCertificateOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams, KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientUpdateCertificateOptionalParams,
  CertificateOperation,
  CertificatePolicy,
  BackupCertificateResult,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  DeletedCertificateItem,
  DeletedCertificateBundle,
  Contact
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

export class CertificatesClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials | TokenCredential} The credential to use for API requests.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof CertificatesClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CertificatesClient.getUserAgentString(pipelineOptions.telemetry);

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
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
        ? bearerTokenAuthenticationPolicy(credential, "https://vault.azure.net/.default")
        : signingPolicy(credential)
    ]);

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  public readonly vaultBaseUrl: string;

  public readonly pipeline: Pipeline;

  protected readonly credential: ServiceClientCredentials | TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of CertificatesClient.
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials | TokenCredential} The credential to use for API requests.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof CertificatesClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CertificatesClient.getDefaultPipeline(
        credential,
        pipelineOrOptions
      );
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
    options?: RequestOptions
  ): AsyncIterableIterator<CertificateAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
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
    options?: RequestOptions
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
   * @summary List all versions of the specified certificate.
   * @param [options] The optional parameters
   * @returns PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]>
   */
  public listCertificates(options?: RequestOptions): PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]> {
    const iter = this.listCertificatesAll(options);
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listCertificatesPage(settings, options)
    };

    return result;
  }

  private async *listCertificateVersionsPage(
    name: string,
    continuationState: PageSettings,
    options?: RequestOptions
  ): AsyncIterableIterator<CertificateAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateVersionsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
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
    options?: RequestOptions
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
   * @summary List the versions of a certificate.
   * @param name The name of the certificate.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCertificateVersionsResponse>
   */
  public listCertificateVersions(name: string, options?: RequestOptions): PagedAsyncIterableIterator<CertificateAttributes, CertificateAttributes[]> {
    const iter = this.listCertificateVersionsAll(name, options);
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listCertificateVersionsPage(name, settings, options)
    };

    return result;
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   * @summary Deletes a certificate from a specified key vault.
   * @param certificateName The name of the c.
   * @param [options] The optional parameters
   * @returns Promise<DeletedCertificate>
   */
  public async deleteCertificate(
    certificateName: string,
    options?: RequestOptions
  ): Promise<DeletedCertificate> {
    const response = await this.client.deleteCertificate(this.vaultBaseUrl, certificateName, options);
    return this.getCertificateFromCertificateBundle(response);
  }

  public async deleteCertificateContacts(options?: RequestOptions): Promise<Contacts> {
    let result = await this.client.deleteCertificateContacts(this.vaultBaseUrl, options);

    return result._response.parsedBody;
  }

  public async setCertificateContacts(contacts: Contact[], options?: RequestOptions): Promise<Contacts> {
    let result = await this.client.setCertificateContacts(this.vaultBaseUrl, { contactList: contacts }, options);
    return result._response.parsedBody;
  }

  public async getCertificateContacts(options?: RequestOptions): Promise<Contacts> {
    let result = await this.client.getCertificateContacts(this.vaultBaseUrl, options);

    return result._response.parsedBody;
  }

  private async *listCertificateIssuersPage(
    continuationState: PageSettings,
    options?: KeyVaultClientGetCertificateIssuersOptionalParams
  ): AsyncIterableIterator<CertificateIssuer[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetCertificateIssuersOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
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

  public listCertificateIssuers(options?: KeyVaultClientGetCertificateIssuersOptionalParams): PagedAsyncIterableIterator<CertificateIssuer, CertificateIssuer[]> {
    const iter = this.listCertificateIssuersAll(options);
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listCertificateIssuersPage(settings, options)
    };

    return result;
  }

  /**
   * The SetCertificateIssuer operation adds or updates the specified certificate issuer. This
   * operation requires the certificates/setissuers permission.
   * @summary Sets the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param provider The issuer provider.
   * @param [options] The optional parameters
   * @returns Promise<Models.SetCertificateIssuerResponse>
   */
  public async setCertificateIssuer(issuerName: string, provider: string, options?: KeyVaultClientSetCertificateIssuerOptionalParams): Promise<CertificateIssuer> {
    let result = await this.client.setCertificateIssuer(this.vaultBaseUrl, issuerName, provider, options);

    return result._response.parsedBody;
  }

  /**
   * The UpdateCertificateIssuer operation performs an update on the specified certificate issuer
   * entity. This operation requires the certificates/setissuers permission.
   * @summary Updates the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateCertificateIssuerResponse>
   */
  public async updateCertificateIssuer(issuerName: string, options?: KeyVaultClientUpdateCertificateIssuerOptionalParams): Promise<CertificateIssuer> {
    let result = await this.client.updateCertificateIssuer(this.vaultBaseUrl, issuerName, options);

    return result._response.parsedBody;
  }

  /**
   * The GetCertificateIssuer operation returns the specified certificate issuer resources in the
   * specified key vault. This operation requires the certificates/manageissuers/getissuers
   * permission.
   * @summary Lists the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCertificateIssuerResponse>
   */
  public async getCertificateIssuer(issuerName: string, options?: RequestOptions): Promise<CertificateIssuer> {
    let result = await this.client.getCertificateIssuer(this.vaultBaseUrl, issuerName, options);

    return result._response.parsedBody;
  }

  /**
   * The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from
   * the vault. This operation requires the certificates/manageissuers/deleteissuers permission.
   * @summary Deletes the specified certificate issuer.
   * @param issuerName The name of the issuer.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeleteCertificateIssuerResponse>
   */
  public async deleteCertificateIssuer(issuerName: string, options?: RequestOptions): Promise<CertificateIssuer> {
    let result = await this.client.deleteCertificateIssuer(this.vaultBaseUrl, issuerName, options);

    return result._response.parsedBody;

  }

  public async createCertificate(name: string, options?: KeyVaultClientCreateCertificateOptionalParams): Promise<Certificate> {
    let result = await this.client.createCertificate(this.vaultBaseUrl, name, options);

    return this.getCertificateFromCertificateBundle(result);
  }

  public async getCertificate(name: string, version: string, options?: RequestOptions): Promise<Certificate> {
    let result = await this.client.getCertificate(this.vaultBaseUrl, name, version, options);

    return this.getCertificateFromCertificateBundle(result);
  }

  public async importCertificate(name: string, base64EncodedCertificate: string, options?: KeyVaultClientImportCertificateOptionalParams): Promise<Certificate> {
    let result = await this.client.importCertificate(this.vaultBaseUrl, name, base64EncodedCertificate, options);

    return this.getCertificateFromCertificateBundle(result);
  }

  public async getCertificatePolicy(name: string, options?: RequestOptions): Promise<CertificatePolicy> {
    let result = await this.client.getCertificatePolicy(this.vaultBaseUrl, name, options);

    return result._response.parsedBody;
  }

  public async updateCertificatePolicy(name: string, policy: CertificatePolicy, options?: RequestOptions): Promise<CertificatePolicy> {
    let result = await this.client.updateCertificatePolicy(this.vaultBaseUrl, name, policy, options);

    return result._response.parsedBody;
  }

  public async updateCertificate(name: string, version: string, options?: KeyVaultClientUpdateCertificateOptionalParams): Promise<Certificate> {
    let result = await this.client.updateCertificate(this.vaultBaseUrl, name, version, options);

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  public async updateCertificateOperation(name: string, cancel: boolean, options: RequestOptions): Promise<CertificateOperation> {
    let result = await this.client.updateCertificateOperation(this.vaultBaseUrl, name, cancel, options);

    return result._response.parsedBody;
  }

  public async getCertificateOperation(name: string, options: RequestOptions): Promise<CertificateOperation> {
    let result = await this.client.getCertificateOperation(this.vaultBaseUrl, name, options);

    return result._response.parsedBody;
  }

  public async deleteCertificateOperation(name: string, options: RequestOptions): Promise<CertificateOperation> {
    let result = await this.client.deleteCertificateOperation(this.vaultBaseUrl, name, options);

    return result._response.parsedBody;
  }

  public async mergeCertificate(name: string, x509Certificates: Uint8Array[], options: RequestOptions): Promise<Certificate> {
    let result = await this.client.mergeCertificate(this.vaultBaseUrl, name, x509Certificates, options);

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  public async backupCertificate(name: string, options: RequestOptions): Promise<BackupCertificateResult> {
    let result = await this.client.backupCertificate(this.vaultBaseUrl, name, options);

    return result._response.parsedBody;
  }

  public async restoreCertificate(certificateBackup: Uint8Array, options: RequestOptions): Promise<Certificate> {
    let result = await this.client.restoreCertificate(this.vaultBaseUrl, certificateBackup, options);

    return this.getCertificateFromCertificateBundle(result._response.parsedBody);
  }

  private async *listDeletedCertificatesPage(
    continuationState: PageSettings,
    options?: KeyVaultClientGetDeletedCertificatesOptionalParams
  ): AsyncIterableIterator<DeletedCertificate[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetDeletedCertificatesOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getDeletedCertificates(
        this.vaultBaseUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedCertificatesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getCertificateFromCertificateBundle);
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

  public listDeletedCertificates(options?: KeyVaultClientGetDeletedCertificatesOptionalParams): PagedAsyncIterableIterator<DeletedCertificate, DeletedCertificate[]> {
    const iter = this.listDeletedCertificatesAll(options);
    let result = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedCertificatesPage(settings, options)
    };

    return result;
  }

  public async getDeletedCertificate(name: string, options?: RequestOptions): Promise<DeletedCertificate> {
    let result = await this.client.getDeletedCertificate(this.vaultBaseUrl, name, options);

    return this.getDeletedCertificateFromDeletedCertificateBundle(result._response.parsedBody);
  }

  public async purgeDeletedCertificate(name: string, options?: RequestOptions): Promise<null> {
    await this.client.purgeDeletedCertificate(this.vaultBaseUrl, name, options);

    return null;
  }

  public async recoverDeletedCertificate(name: string, options?: RequestOptions): Promise<Certificate> {
    let result = await this.client.recoverDeletedCertificate(this.vaultBaseUrl, name, options);

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
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        ...certificateBundle,
        ...parsedId
      }
    }

    return resultObject;
  }

  private getDeletedCertificateFromDeletedCertificateBundle(certificateBundle: DeletedCertificateBundle): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    let resultObject;
    if (certificateBundle.attributes) {
      resultObject = {
        ...certificateBundle,
        ...parsedId,
        ...certificateBundle.attributes
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        ...certificateBundle,
        ...parsedId
      }
    }

    return resultObject;
  }

  private getDeletedCertificateFromItem(item: DeletedCertificateItem): DeletedCertificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", item.id);

    let resultObject;
    if (item.attributes) {
      resultObject = {
        ...item,
        ...parsedId,
        ...item.attributes
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        ...item,
        ...parsedId
      }
    }

    return resultObject;
  }
}
