import {
  ServiceClientCredentials,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  RequestOptionsBase,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy
} from "@azure/ms-rest-js";

import { GetAllCertificatesOptions, CertificateAttributes, Certificate, DeletedCertificate, CertificateIssuer } from "./certificatesModels";
import { getDefaultUserAgentValue } from "@azure/ms-rest-azure-js";
import { NewPipelineOptions, isNewPipelineOptions, Pipeline } from "../keyVaultBase";
import { TelemetryOptions } from "..";
import {
  CertificateBundle, Contacts, KeyVaultClientCreateCertificateOptionalParams,
  KeyVaultClientGetCertificateVersionsOptionalParams, KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams
} from "../models";
import { KeyVaultClient } from "../keyVaultClient";
import { RetryConstants, SDK_VERSION } from "../utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "../utils";

export class CertificatesClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials} credential that implements signRequet().
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof CertificatesClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CertificatesClient.getUserAgentString(pipelineOptions.telemetry);

    const requestPolicyFactories: RequestPolicyFactory[] = [
      proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings)),
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
      signingPolicy(credential)
    ];

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  public readonly vaultBaseUrl: string;

  public readonly pipeline: Pipeline;

  protected readonly credential: ServiceClientCredentials;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of CertificatesClient.
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials} credential credential.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof CertificatesClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CertificatesClient.getDefaultPipeline(
        credential as ServiceClientCredentials,
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

  /**
   * Iterates the latest version of all certificates in the vault.  The full certificate identifier and attributes are provided
   * in the response. No values are returned for the certificates. This operations requires the certificates/list permission.
   * @summary List all versions of the specified certificate.
   * @param [options] The optional parameters
   * @returns AsyncIterableIterator<Certificate>
   */
  public async *getAllCertificates(options?: GetAllCertificatesOptions): AsyncIterableIterator<CertificateAttributes> {
    let currentSetResponse = await this.client.getCertificates(
      this.vaultBaseUrl,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getCertificatesNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
  }

  /**
   * The GetCertificateVersions operation returns the versions of a certificate in the specified key
   * vault. This operation requires the certificates/list permission.
   * @summary List the versions of a certificate.
   * @param certificateName The name of the certificate.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCertificateVersionsResponse>
   */
  public async *getAllCertificateVersions(certificateName: string, options?: KeyVaultClientGetCertificateVersionsOptionalParams): AsyncIterableIterator<CertificateAttributes> {
    let currentSetResponse = await this.client.getCertificateVersions(
      this.vaultBaseUrl,
      certificateName,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getCertificatesNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
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
    options?: RequestOptionsBase
  ): Promise<DeletedCertificate> {
    const response = await this.client.deleteCertificate(this.vaultBaseUrl, certificateName, options);
    return this.getCertificateFromCertificateBundle(response);
  }

  public async deleteCertificateContacts(options?: RequestOptionsBase): Promise<Contacts> {
    let result = await this.client.deleteCertificateContacts(this.vaultBaseUrl, options);

    return result._response.parsedBody;
  }

  public async setCertificateContacts(contacts: Contacts, options?: RequestOptionsBase): Promise<Contacts> {
    let result = await this.client.setCertificateContacts(this.vaultBaseUrl, contacts, options);
    return result._response.parsedBody;
  }

  public async *getCertificateIssuers(options?: KeyVaultClientGetCertificateIssuersOptionalParams): AsyncIterableIterator<CertificateIssuer> {
    let currentSetResponse = await this.client.getCertificateIssuers(
      this.vaultBaseUrl,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse;

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getCertificatesNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse;
    }
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
  public async getCertificateIssuer(issuerName: string, options?: RequestOptionsBase): Promise<CertificateIssuer> {
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
  public async deleteCertificateIssuer(issuerName: string, options?: RequestOptionsBase): Promise<CertificateIssuer> {
    let result = await this.client.deleteCertificateIssuer(this.vaultBaseUrl, issuerName, options);

    return result._response.parsedBody;

  }

  public async createCertificate(name: string, options?: KeyVaultClientCreateCertificateOptionalParams): Promise<Certificate> {
    let result = await this.client.createCertificate(this.vaultBaseUrl, name, options);

    return this.getCertificateFromCertificateBundle(result);
  }

  public async getCertificate(name: string, version: string, options?: RequestOptionsBase): Promise<Certificate> {
    let result = await this.client.getCertificate(this.vaultBaseUrl, name, version, options);

    return this.getCertificateFromCertificateBundle(result);
  }

  private getCertificateFromCertificateBundle(certificateBundle: CertificateBundle): Certificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    console.log("bundle:", certificateBundle);

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
}
